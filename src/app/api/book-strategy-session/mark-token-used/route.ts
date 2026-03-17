/**
 * Mark Booking Token as Used and Send Confirmation Emails
 *
 * Called when user successfully schedules via Cal.com
 * 1. Marks token as consumed to prevent reuse
 * 2. Uses event details from Cal.com postMessage payload (no API call needed)
 * 3. Updates database with booking details
 * 4. Sends customer calendar confirmation email
 * 5. Sends team notification email
 */

import { NextRequest, NextResponse } from 'next/server';
import { markTokenAsUsed } from '@/lib/booking-token';
import { query } from '@/lib/db';
import { sendCalendarBookingConfirmation } from '@/lib/email-strategy-sessions';
import { sendToCRM } from '@/lib/crm-webhook';

// ============================================================
// POST HANDLER
// ============================================================

export async function POST(request: NextRequest) {
  try {
    const { sessionId, token, calEvent } = await request.json();

    if (!sessionId || !token) {
      return NextResponse.json(
        { error: 'Missing sessionId or token' },
        { status: 400 }
      );
    }

    console.log(`[Mark Token] Cal.com event received for session: ${sessionId}`);

    // Mark token as used (existing functionality)
    await markTokenAsUsed(sessionId, token);

    // If Cal.com event details provided, update database and send confirmation
    if (calEvent) {
      try {
        const sessionResult = await query(
          `SELECT * FROM growth_audit WHERE id = ?`,
          [sessionId]
        );

        if (!sessionResult || !sessionResult[0] || (sessionResult[0] as any).length === 0) {
          console.error('[Mark Token] Session not found:', sessionId);
          return NextResponse.json(
            { error: 'Session not found' },
            { status: 404 }
          );
        }

        const session = (sessionResult[0] as any)[0];

        // Parse scheduled time from Cal.com event payload
        const scheduledAt = calEvent.startTime ? new Date(calEvent.startTime) : null;
        const inviteeTimezone = calEvent.timezone || 'UTC';

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

        console.log(`[Mark Token] Cal.com: scheduled at ${calEvent.startTime}, timezone: ${inviteeTimezone}`);

        // Update database with Cal.com booking details
        await query(
          `UPDATE growth_audit
           SET calendly_scheduled_at = ?,
               calendly_status = 'booked',
               booking_stage = 'calendar_booked',
               updated_at = NOW()
           WHERE id = ?`,
          [scheduledAt, sessionId]
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
            meetingLink: calEvent.meetingLink || undefined,
          });

          await query(
            `UPDATE growth_audit
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

          await query(
            `UPDATE growth_audit
             SET team_notification_sent = TRUE,
                 team_notification_sent_at = NOW()
             WHERE id = ?`,
            [sessionId]
          );

          console.log(`[Mark Token] Team notification sent for session: ${sessionId}`);
        } catch (teamEmailError) {
          console.error('[Mark Token] FAILED to send team notification:', teamEmailError);
          console.error('[Mark Token] Team email error details:', {
            name: (teamEmailError as Error).name,
            message: (teamEmailError as Error).message,
            stack: (teamEmailError as Error).stack
          });
        }

        // ========================================
        // NOTIFY CRM (Make.com) — Path A trigger
        // ========================================
        try {
          await sendToCRM({
            ...session,
            booking_stage: 'calendar_booked',
            calendly_status: 'booked',
            calendly_scheduled_at: scheduledAt,
          });
          console.log(`[Mark Token] CRM webhook fired for session: ${sessionId}`);
        } catch (crmError) {
          console.error('[Mark Token] FAILED to send CRM webhook:', crmError);
        }

      } catch (emailError) {
        console.error('[Mark Token] Critical error in email sending block:', emailError);
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
