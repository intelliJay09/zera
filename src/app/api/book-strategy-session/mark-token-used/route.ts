/**
 * Mark Booking Token as Used and Send Email 2
 *
 * Called when user successfully schedules Calendly event
 * 1. Marks token as consumed to prevent reuse
 * 2. Fetches real event details from Calendly API (date/time, meeting link, reschedule/cancel URLs)
 * 3. Updates database with Calendly booking details
 * 4. Sends customer calendar confirmation email with real data
 * 5. Sends team notification email
 */

import { NextRequest, NextResponse } from 'next/server';
import { markTokenAsUsed } from '@/lib/booking-token';
import { query } from '@/lib/db';
import { sendCalendarBookingConfirmation } from '@/lib/email-strategy-sessions';

// ============================================================
// CALENDLY API HELPERS
// ============================================================

interface CalendlyEventDetails {
  start_time: string;
  end_time: string;
  name: string;
  status: string;
  location?: {
    join_url?: string;
    type?: string;
  };
}

interface CalendlyInviteeDetails {
  reschedule_url: string;
  cancel_url: string;
  email: string;
  name: string;
  timezone: string;
}

async function fetchCalendlyEvent(eventUri: string): Promise<CalendlyEventDetails | null> {
  const pat = process.env.CALENDLY_PAT;
  if (!pat) {
    console.error('[Calendly API] CALENDLY_PAT not configured');
    return null;
  }

  try {
    const response = await fetch(eventUri, {
      headers: { Authorization: `Bearer ${pat}` },
    });

    if (!response.ok) {
      console.error(`[Calendly API] Event fetch failed: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return data.resource;
  } catch (error) {
    console.error('[Calendly API] Event fetch error:', error);
    return null;
  }
}

async function fetchCalendlyInvitee(inviteeUri: string): Promise<CalendlyInviteeDetails | null> {
  const pat = process.env.CALENDLY_PAT;
  if (!pat) return null;

  try {
    const response = await fetch(inviteeUri, {
      headers: { Authorization: `Bearer ${pat}` },
    });

    if (!response.ok) {
      console.error(`[Calendly API] Invitee fetch failed: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return data.resource;
  } catch (error) {
    console.error('[Calendly API] Invitee fetch error:', error);
    return null;
  }
}

// ============================================================
// POST HANDLER
// ============================================================

export async function POST(request: NextRequest) {
  try {
    const { sessionId, token, calendlyEvent } = await request.json();

    if (!sessionId || !token) {
      return NextResponse.json(
        { error: 'Missing sessionId or token' },
        { status: 400 }
      );
    }

    console.log(`[Mark Token] Calendly event received for session: ${sessionId}`);

    // Mark token as used (existing functionality)
    await markTokenAsUsed(sessionId, token);

    // If Calendly event details provided, update database and send confirmation
    if (calendlyEvent) {
      try {
        // Fetch session data and Calendly details in parallel
        const [sessionResult, eventDetails, inviteeDetails] = await Promise.all([
          query(`SELECT * FROM strategy_sessions WHERE id = ?`, [sessionId]),
          fetchCalendlyEvent(calendlyEvent.eventUri),
          fetchCalendlyInvitee(calendlyEvent.inviteeUri),
        ]);

        if (!sessionResult || !sessionResult[0] || (sessionResult[0] as any).length === 0) {
          console.error('[Mark Token] Session not found:', sessionId);
          return NextResponse.json(
            { error: 'Session not found' },
            { status: 404 }
          );
        }

        const session = (sessionResult[0] as any)[0];

        // Parse scheduled time from Calendly API
        const scheduledAt = eventDetails?.start_time ? new Date(eventDetails.start_time) : null;
        const inviteeTimezone = inviteeDetails?.timezone || 'UTC';

        // Format date and time in the invitee's timezone
        let scheduledDate: string | undefined;
        let scheduledTime: string | undefined;

        if (scheduledAt) {
          scheduledDate = scheduledAt.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: inviteeTimezone,
          });
          scheduledTime = scheduledAt.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            timeZone: inviteeTimezone,
          });
        }

        if (eventDetails) {
          console.log(`[Mark Token] Calendly API: scheduled at ${eventDetails.start_time}, timezone: ${inviteeTimezone}`);
        } else {
          console.warn('[Mark Token] Could not fetch Calendly event details — email will be sent without schedule data');
        }

        // Update database with Calendly booking details including scheduled time
        await query(
          `UPDATE strategy_sessions
           SET calendly_event_uri = ?,
               calendly_invitee_uri = ?,
               calendly_scheduled_at = ?,
               calendly_status = 'booked',
               booking_stage = 'calendar_booked',
               updated_at = NOW()
           WHERE id = ?`,
          [
            calendlyEvent.eventUri,
            calendlyEvent.inviteeUri,
            scheduledAt,
            sessionId
          ]
        );

        console.log(`[Mark Token] Updated session with booking details`);

        // ========================================
        // SEND EMAIL: CUSTOMER CONFIRMATION
        // ========================================
        console.log(`[Mark Token] Attempting to send customer confirmation email...`);
        try {
          await sendCalendarBookingConfirmation({
            fullName: session.full_name,
            businessEmail: session.business_email,
            companyName: session.company_name,
            scheduledDate,
            scheduledTime,
            timezone: scheduledAt ? inviteeTimezone : undefined,
            meetingLink: eventDetails?.location?.join_url,
            rescheduleLink: inviteeDetails?.reschedule_url,
            cancelLink: inviteeDetails?.cancel_url,
          });

          // Update email tracking
          await query(
            `UPDATE strategy_sessions
             SET calendar_confirmation_email_sent = TRUE,
                 calendar_confirmation_email_sent_at = NOW()
             WHERE id = ?`,
            [sessionId]
          );

          console.log(`[Mark Token] Customer confirmation email sent to: ${session.business_email}`);
        } catch (emailError) {
          console.error('[Mark Token] FAILED to send customer confirmation email:', emailError);
          console.error('[Mark Token] Error details:', {
            name: (emailError as Error).name,
            message: (emailError as Error).message,
            stack: (emailError as Error).stack
          });
        }

        // ========================================
        // SEND TEAM NOTIFICATION
        // ========================================
        console.log(`[Mark Token] Attempting to send team notification email...`);
        try {
          const { sendStrategySessionTeamNotification } = await import(
            '@/lib/email-strategy-sessions'
          );

          await sendStrategySessionTeamNotification(
            {
              sessionId: session.id,
              fullName: session.full_name,
              businessEmail: session.business_email,
              companyName: session.company_name,
              websiteUrl: session.website_url,
              whatsappNumber: session.whatsapp_number,
              revenueRange: session.revenue_range,
              customRevenue: session.custom_revenue,
              growthObstacle: session.growth_obstacle,
              magicWandOutcome: session.magic_wand_outcome,
              paymentReference: session.payment_reference,
              paymentAmount: session.payment_amount,
              utmSource: session.utm_source,
              utmCampaign: session.utm_campaign,
            },
            sessionId
          );

          // Update email tracking
          await query(
            `UPDATE strategy_sessions
             SET team_notification_sent = TRUE,
                 team_notification_sent_at = NOW()
             WHERE id = ?`,
            [sessionId]
          );

          console.log(`[Mark Token] ✅ Team notification sent for session: ${sessionId}`);
        } catch (teamEmailError) {
          console.error('[Mark Token] ❌ FAILED to send team notification:', teamEmailError);
          console.error('[Mark Token] Team email error details:', {
            name: (teamEmailError as Error).name,
            message: (teamEmailError as Error).message,
            stack: (teamEmailError as Error).stack
          });
        }
      } catch (emailError) {
        console.error('[Mark Token] ❌ Critical error in email sending block:', emailError);
        // Don't fail the request - token is already marked as used
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Mark Token Used] Error:', error);
    return NextResponse.json(
      { error: 'Failed to mark token as used' },
      { status: 500 }
    );
  }
}
