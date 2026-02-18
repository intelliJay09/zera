/**
 * ZERA Strategy Session - Calendly Webhook Handler
 *
 * Events Handled:
 * - invitee.created: Session booked on Calendly
 * - invitee.canceled: Session canceled by invitee
 *
 * SECURITY: Verifies webhook signature with HMAC SHA256
 */

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { query } from '@/lib/db';
import type { CalendlyWebhookEvent } from '@/types/strategy-session';

// ============================================================
// SIGNATURE VERIFICATION
// ============================================================

/**
 * Verify Calendly webhook signature using HMAC SHA256
 */
function verifyCalendlySignature(payload: string, signature: string): boolean {
  const secret = process.env.CALENDLY_WEBHOOK_SECRET;

  if (!secret) {
    console.error('[Calendly Webhook] CALENDLY_WEBHOOK_SECRET not configured');
    return false;
  }

  try {
    const hash = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('base64');

    // Use timing-safe comparison
    if (hash.length !== signature.length) {
      return false;
    }

    return crypto.timingSafeEqual(
      Buffer.from(hash),
      Buffer.from(signature)
    );
  } catch (error) {
    console.error('[Calendly Webhook] Signature verification error:', error);
    return false;
  }
}

// ============================================================
// EVENT HANDLERS
// ============================================================

/**
 * Handle invitee.created event (session booked)
 */
async function handleInviteeCreated(event: CalendlyWebhookEvent): Promise<void> {
  const { payload } = event;
  const inviteeEmail = payload.invitee.email;
  const eventUri = payload.event.uri;
  const inviteeUri = payload.invitee.uri;
  const scheduledAt = new Date(payload.event.start_time);

  console.log(`[Calendly] invitee.created for ${inviteeEmail} at ${scheduledAt}`);

  try {
    // Find session by email (most reliable identifier)
    const sessionResult = await query(
      `SELECT id, full_name, company_name, payment_reference
       FROM strategy_sessions
       WHERE business_email = ?
         AND payment_status = 'completed'
         AND calendly_status = 'not_booked'
       ORDER BY paid_at DESC
       LIMIT 1`,
      [inviteeEmail]
    );

    const [rows] = sessionResult;

    if (!rows || rows.length === 0) {
      console.error('[Calendly] No matching session found for email:', inviteeEmail);

      // Try to find by payment reference in custom answers
      const paymentRef = payload.questions_and_answers?.find(
        (qa) => qa.question.toLowerCase().includes('payment') || qa.question.toLowerCase().includes('reference')
      )?.answer;

      if (paymentRef) {
        const [refRows] = await query<{ id: string; full_name: string; company_name: string }>(
          `SELECT id, full_name, company_name
           FROM strategy_sessions
           WHERE payment_reference = ?
             AND payment_status = 'completed'
           LIMIT 1`,
          [paymentRef]
        );

        if (refRows && refRows.length > 0) {
          const session = refRows[0];
          await updateSessionWithCalendly(
            session.id,
            eventUri,
            inviteeUri,
            scheduledAt,
            session.full_name,
            session.company_name
          );
          return;
        }
      }

      console.error('[Calendly] Could not match booking to any session');
      return;
    }

    const session = rows[0];

    await updateSessionWithCalendly(
      session.id,
      eventUri,
      inviteeUri,
      scheduledAt,
      session.full_name,
      session.company_name
    );
  } catch (error) {
    console.error('[Calendly] Error handling invitee.created:', error);
    throw error;
  }
}

/**
 * Update session with Calendly booking details
 */
async function updateSessionWithCalendly(
  sessionId: string,
  eventUri: string,
  inviteeUri: string,
  scheduledAt: Date,
  fullName: string,
  companyName: string
): Promise<void> {
  // Update database with Calendly details
  await query(
    `UPDATE strategy_sessions
     SET calendly_event_uri = ?,
         calendly_invitee_uri = ?,
         calendly_scheduled_at = ?,
         calendly_status = 'booked',
         booking_stage = 'calendar_booked',
         updated_at = NOW()
     WHERE id = ?`,
    [eventUri, inviteeUri, scheduledAt, sessionId]
  );

  console.log(`[Calendly] Session ${sessionId} updated with booking details`);

  // Send calendar confirmation email
  try {
    const { sendCalendarBookingConfirmation } = await import(
      '@/lib/email-strategy-sessions'
    );

    // Format date and time
    const dateStr = scheduledAt.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const timeStr = scheduledAt.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'UTC',
    });

    // Get businessEmail from session
    const [rows] = await query<{ business_email: string }>(
      `SELECT business_email FROM strategy_sessions WHERE id = ?`,
      [sessionId]
    );
    const businessEmail = rows && rows.length > 0
      ? rows[0].business_email
      : ''; // Fallback if not found (shouldn't happen)

    await sendCalendarBookingConfirmation({
      fullName,
      businessEmail,
      companyName,
      scheduledDate: dateStr,
      scheduledTime: timeStr,
      timezone: 'UTC', // Calendly provides UTC times
      meetingLink: eventUri,
      cancelLink: inviteeUri,
      rescheduleLink: inviteeUri,
    });

    // Update email tracking
    await query(
      `UPDATE strategy_sessions
       SET calendar_confirmation_email_sent = TRUE,
           calendar_confirmation_email_sent_at = NOW()
       WHERE id = ?`,
      [sessionId]
    );

    console.log(`[Calendly] Calendar confirmation email sent for session: ${sessionId}`);
  } catch (emailError) {
    console.error('[Calendly] Failed to send calendar confirmation email:', emailError);
  }

  // Update CRM with booking time
  try {
    const [rows] = await query(
      `SELECT * FROM strategy_sessions WHERE id = ?`,
      [sessionId]
    );

    if (rows && rows.length > 0) {
      const { sendToCRM } = await import('@/lib/crm-webhook');
      const session = rows[0];
      await sendToCRM(session);
    }
  } catch (crmError) {
    console.error('[Calendly] Failed to update CRM:', crmError);
  }
}

/**
 * Handle invitee.canceled event (session canceled)
 */
async function handleInviteeCanceled(event: CalendlyWebhookEvent): Promise<void> {
  const { payload } = event;
  const inviteeEmail = payload.invitee.email;
  const inviteeUri = payload.invitee.uri;
  const cancellationReason = payload.invitee.cancellation?.reason || 'No reason provided';

  console.log(`[Calendly] invitee.canceled for ${inviteeEmail}`);

  try {
    // Find session by invitee URI or email
    const [rows] = await query<{ id: string }>(
      `SELECT id
       FROM strategy_sessions
       WHERE calendly_invitee_uri = ?
          OR (business_email = ? AND calendly_status = 'booked')
       LIMIT 1`,
      [inviteeUri, inviteeEmail]
    );

    if (!rows || rows.length === 0) {
      console.error('[Calendly] No matching session found for cancellation:', inviteeEmail);
      return;
    }

    const session = rows[0];
    const sessionId = session.id;

    // Update database
    await query(
      `UPDATE strategy_sessions
       SET calendly_status = 'canceled',
           calendly_cancellation_reason = ?,
           updated_at = NOW()
       WHERE id = ?`,
      [cancellationReason, sessionId]
    );

    console.log(`[Calendly] Session ${sessionId} marked as canceled`);

    // Send team notification about cancellation
    // (Customer will receive cancellation email from Calendly directly)
    // TODO: Send internal team notification if needed
  } catch (error) {
    console.error('[Calendly] Error handling invitee.canceled:', error);
    throw error;
  }
}

// ============================================================
// POST HANDLER
// ============================================================

export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const rawBody = await request.text();

    // Verify signature
    const signature = request.headers.get('calendly-webhook-signature');

    if (!signature) {
      console.error('[Calendly] Missing webhook signature');
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 401 }
      );
    }

    const isValid = verifyCalendlySignature(rawBody, signature);

    if (!isValid) {
      console.error('[Calendly] Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Parse event
    let event: CalendlyWebhookEvent;
    try {
      event = JSON.parse(rawBody);
    } catch (parseError) {
      console.error('[Calendly] JSON parse error:', parseError);
      return NextResponse.json(
        { message: 'Invalid JSON' },
        { status: 200 }
      );
    }

    console.log(`[Calendly] Event received: ${event.event}`);

    // Route to handler
    try {
      switch (event.event) {
        case 'invitee.created':
          await handleInviteeCreated(event);
          break;

        case 'invitee.canceled':
          await handleInviteeCanceled(event);
          break;

        default:
          console.log(`[Calendly] Unhandled event type: ${event.event}`);
          break;
      }

      return NextResponse.json(
        { message: 'Webhook processed' },
        { status: 200 }
      );
    } catch (handlerError) {
      console.error('[Calendly] Handler error:', handlerError);
      return NextResponse.json(
        { message: 'Webhook received but processing failed' },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('[Calendly] Critical error:', error);
    return NextResponse.json(
      { message: 'Webhook received' },
      { status: 200 }
    );
  }
}

// ============================================================
// GET HANDLER (VERIFICATION)
// ============================================================

export async function GET() {
  return NextResponse.json(
    {
      message: 'ZERA Strategy Session - Calendly Webhook Endpoint',
      status: 'active',
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}
