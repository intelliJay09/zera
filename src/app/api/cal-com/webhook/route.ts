/**
 * ZERA Strategy Session - Cal.com Webhook Handler
 *
 * The real server-to-server trigger for a booking made in the live
 * /systems-audit/success Cal.com embed. Before this route existed, the
 * ONLY thing that recorded a booking, sent the customer confirmation, and
 * notified the team was a client-side Cal('on', { action:
 * 'bookingSuccessful' }) callback that fetch()'d
 * /api/book-strategy-session/mark-token-used from the visitor's own
 * browser (src/app/systems-audit/success/page.tsx). Cal.com's own widget
 * reports success to the visitor independently of that callback, so a
 * closed tab, a network blip, or a blocked script left ZERA with no
 * record and no notification even though the booking was completely real
 * on Cal.com's side — confirmed as the actual cause of a missed client
 * booking. This webhook is the fix: it's fired by Cal.com's own servers,
 * not the visitor's browser, so it can't be silently skipped that way.
 *
 * The client-side path is left in place as a (now redundant) fast path —
 * both this route and mark-token-used check team_notification_sent /
 * calendar_confirmation_email_sent before sending, so whichever fires
 * first wins and the other is a safe no-op, never a duplicate email.
 *
 * Events handled:
 * - BOOKING_CREATED: session booked on Cal.com
 * - BOOKING_CANCELLED: session canceled
 *
 * SECURITY: Verifies X-Cal-Signature-256 (HMAC-SHA256 of the raw body,
 * "sha256=<hex>", per Cal.com's own webhook signing scheme), same
 * timing-safe-compare discipline as the existing Calendly webhook route.
 */

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { query } from '@/lib/db';
import type { CalComWebhookEvent, RevenueRange, StrategySession } from '@/types/strategy-session';

// ============================================================
// SIGNATURE VERIFICATION
// ============================================================

function verifyCalComSignature(payload: string, signature: string): boolean {
  const secret = process.env.CAL_COM_WEBHOOK_SECRET;

  if (!secret) {
    console.error('[Cal.com Webhook] CAL_COM_WEBHOOK_SECRET not configured');
    return false;
  }

  try {
    const expected = `sha256=${crypto.createHmac('sha256', secret).update(payload).digest('hex')}`;

    if (expected.length !== signature.length) {
      return false;
    }

    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch (error) {
    console.error('[Cal.com Webhook] Signature verification error:', error);
    return false;
  }
}

// ============================================================
// EVENT HANDLERS
// ============================================================

/**
 * Handle BOOKING_CREATED — mirrors updateSessionWithCalendly's own
 * matching heuristic (no reliable internal identifier comes through
 * Cal.com's public booking widget today, same real constraint the
 * existing Calendly integration already works around): match the most
 * recent paid, not-yet-booked session for this attendee email.
 */
async function handleBookingCreated(event: CalComWebhookEvent): Promise<void> {
  const { payload } = event;
  const attendee = payload.attendees[0];
  if (!attendee?.email) {
    console.error('[Cal.com Webhook] No attendee email in payload for booking:', payload.uid);
    return;
  }

  const scheduledAt = new Date(payload.startTime);

  console.log(`[Cal.com Webhook] BOOKING_CREATED for ${attendee.email} at ${scheduledAt}`);

  const [rows] = await query<StrategySession>(
    `SELECT * FROM growth_audit
     WHERE business_email = ?
       AND payment_status = 'completed'
       AND calendly_status = 'not_booked'
     ORDER BY paid_at DESC
     LIMIT 1`,
    [attendee.email]
  );

  if (!rows || rows.length === 0) {
    console.error('[Cal.com Webhook] No matching session found for email:', attendee.email);
    return;
  }

  const session = rows[0];

  await query(
    `UPDATE growth_audit
     SET calendly_event_uri = ?,
         calendly_scheduled_at = ?,
         calendly_status = 'booked',
         booking_stage = 'calendar_booked',
         updated_at = NOW()
     WHERE id = ?`,
    [payload.uid, scheduledAt, session.id]
  );

  console.log(`[Cal.com Webhook] Session ${session.id} updated with booking details`);

  // Idempotent against the client-side mark-token-used path: only send if
  // that path hasn't already sent it (and vice versa — see the matching
  // guard added there). Re-reads the row's own flags rather than trusting
  // the pre-update `session` object, since either path could have written
  // in between.
  const [freshRows] = await query<Pick<StrategySession, 'calendar_confirmation_email_sent' | 'team_notification_sent'>>(
    `SELECT calendar_confirmation_email_sent, team_notification_sent FROM growth_audit WHERE id = ?`,
    [session.id]
  );
  const flags = freshRows[0];

  if (!flags?.calendar_confirmation_email_sent) {
    try {
      const { sendCalendarBookingConfirmation } = await import('@/lib/email-strategy-sessions');

      const dateStr = scheduledAt.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: attendee.timeZone,
      });
      const timeStr = scheduledAt.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        timeZone: attendee.timeZone,
      });

      await sendCalendarBookingConfirmation({
        fullName: session.full_name,
        businessEmail: session.business_email,
        companyName: session.company_name,
        scheduledDate: dateStr,
        scheduledTime: timeStr,
        timezone: attendee.timeZone,
        meetingLink: payload.location,
      });

      await query(
        `UPDATE growth_audit
         SET calendar_confirmation_email_sent = TRUE,
             calendar_confirmation_email_sent_at = NOW()
         WHERE id = ?`,
        [session.id]
      );

      console.log(`[Cal.com Webhook] Calendar confirmation email sent for session: ${session.id}`);
    } catch (emailError) {
      console.error('[Cal.com Webhook] Failed to send calendar confirmation email:', emailError);
    }
  }

  if (!flags?.team_notification_sent) {
    try {
      const { sendStrategySessionTeamNotification } = await import('@/lib/email-strategy-sessions');

      await sendStrategySessionTeamNotification(
        {
          sessionId: session.id,
          fullName: session.full_name,
          businessEmail: session.business_email,
          companyName: session.company_name,
          websiteUrl: session.website_url,
          phoneNumber: session.whatsapp_number,
          // Same untyped pass-through the pre-existing mark-token-used
          // route already does (its own `session` there is `any`) —
          // revenue_range is a free-text DB column but only ever
          // populated from the form's own RevenueRange-constrained
          // select, so this cast reflects a real invariant, not a hole.
          revenueRange: session.revenue_range as RevenueRange,
          customRevenue: session.custom_revenue ?? undefined,
          growthObstacle: session.growth_obstacle,
          hoursWasted: session.hours_wasted ?? undefined,
          magicWandOutcome: session.magic_wand_outcome,
          budgetRange: session.budget_range ?? undefined,
          paymentReference: session.payment_reference,
          paymentAmount: session.payment_amount,
          utmSource: session.utm_source ?? undefined,
          utmCampaign: session.utm_campaign ?? undefined,
        },
        session.id
      );

      await query(
        `UPDATE growth_audit
         SET team_notification_sent = TRUE,
             team_notification_sent_at = NOW()
         WHERE id = ?`,
        [session.id]
      );

      console.log(`[Cal.com Webhook] Team notification sent for session: ${session.id}`);
    } catch (teamEmailError) {
      console.error('[Cal.com Webhook] Failed to send team notification:', teamEmailError);
    }
  }

}

/**
 * Handle BOOKING_CANCELLED.
 */
async function handleBookingCancelled(event: CalComWebhookEvent): Promise<void> {
  const { payload } = event;
  const attendee = payload.attendees[0];

  console.log(`[Cal.com Webhook] BOOKING_CANCELLED for ${attendee?.email ?? 'unknown'}`);

  const [rows] = await query<Pick<StrategySession, 'id'>>(
    `SELECT id FROM growth_audit
     WHERE calendly_event_uri = ?
        OR (business_email = ? AND calendly_status = 'booked')
     LIMIT 1`,
    [payload.uid, attendee?.email ?? '']
  );

  if (!rows || rows.length === 0) {
    console.error('[Cal.com Webhook] No matching session found for cancellation:', attendee?.email);
    return;
  }

  await query(
    `UPDATE growth_audit
     SET calendly_status = 'canceled',
         calendly_cancellation_reason = ?,
         updated_at = NOW()
     WHERE id = ?`,
    [payload.cancellationReason || 'No reason provided', rows[0].id]
  );

  console.log(`[Cal.com Webhook] Session ${rows[0].id} marked as canceled`);
}

// ============================================================
// POST HANDLER
// ============================================================

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-cal-signature-256');

    if (!signature) {
      console.error('[Cal.com Webhook] Missing webhook signature');
      return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
    }

    if (!verifyCalComSignature(rawBody, signature)) {
      console.error('[Cal.com Webhook] Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    let event: CalComWebhookEvent;
    try {
      event = JSON.parse(rawBody);
    } catch (parseError) {
      console.error('[Cal.com Webhook] JSON parse error:', parseError);
      return NextResponse.json({ message: 'Invalid JSON' }, { status: 200 });
    }

    console.log(`[Cal.com Webhook] Event received: ${event.triggerEvent}`);

    try {
      switch (event.triggerEvent) {
        case 'BOOKING_CREATED':
          await handleBookingCreated(event);
          break;

        case 'BOOKING_CANCELLED':
          await handleBookingCancelled(event);
          break;

        default:
          console.log(`[Cal.com Webhook] Unhandled event type: ${event.triggerEvent}`);
          break;
      }

      return NextResponse.json({ message: 'Webhook processed' }, { status: 200 });
    } catch (handlerError) {
      console.error('[Cal.com Webhook] Handler error:', handlerError);
      return NextResponse.json({ message: 'Webhook received but processing failed' }, { status: 200 });
    }
  } catch (error) {
    console.error('[Cal.com Webhook] Critical error:', error);
    return NextResponse.json({ message: 'Webhook received' }, { status: 200 });
  }
}

// ============================================================
// GET HANDLER (VERIFICATION)
// ============================================================

export async function GET() {
  return NextResponse.json(
    {
      message: 'ZERA Strategy Session - Cal.com Webhook Endpoint',
      status: 'active',
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}
