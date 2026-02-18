/**
 * ZERA Strategy Session - 24h Reminder Cron
 *
 * Runs: Hourly (configured in vercel.json)
 *
 * Logic:
 * 1. Find sessions with booking_stage = 'calendar_booked'
 * 2. Filter: reminder_email_sent = false
 * 3. Filter: calendly_scheduled_at between NOW + 23h and NOW + 25h
 * 4. Send 24h reminder email with prep checklist
 * 5. Update reminder_email_sent flag
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { send24HourReminder } from '@/lib/email-strategy-sessions';

// ============================================================
// CRON AUTHORIZATION
// ============================================================

function isAuthorizedCronRequest(request: NextRequest): boolean {
  const cronSecret = request.headers.get('x-vercel-cron-secret');
  if (cronSecret && cronSecret === process.env.CRON_SECRET) {
    return true;
  }

  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader === `Bearer ${process.env.CRON_SECRET}`) {
    return true;
  }

  return false;
}

// ============================================================
// PREP CHECKLIST
// ============================================================

const PREP_CHECKLIST = [
  'Have access to your website analytics (Google Analytics, Search Console, etc.)',
  'Prepare specific questions about your growth challenges',
  'Be ready to discuss business goals for the next 6-12 months',
  'Have notepad ready to capture insights and action items',
  'Test your audio/video setup 5 minutes before the call',
];

// ============================================================
// GET HANDLER
// ============================================================

export async function GET(request: NextRequest) {
  console.log('[Cron] Session reminders started');

  // Verify authorization
  if (!isAuthorizedCronRequest(request)) {
    console.error('[Cron] Unauthorized cron request');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // ========================================
    // 1. FIND SESSIONS NEEDING REMINDER
    // ========================================
    // Sessions scheduled between 23-25 hours from now
    const upcomingSessions = await query(
      `SELECT
        id,
        full_name,
        business_email,
        company_name,
        calendly_scheduled_at,
        calendly_event_uri
       FROM strategy_sessions
       WHERE booking_stage = 'calendar_booked'
         AND reminder_email_sent = FALSE
         AND calendly_scheduled_at BETWEEN DATE_ADD(NOW(), INTERVAL 23 HOUR)
                                       AND DATE_ADD(NOW(), INTERVAL 25 HOUR)
       ORDER BY calendly_scheduled_at ASC
       LIMIT 50`,
      []
    );

    if (
      !upcomingSessions ||
      !upcomingSessions[0] ||
      (upcomingSessions[0] as any).length === 0
    ) {
      console.log('[Cron] No sessions requiring reminders');
      return NextResponse.json(
        {
          success: true,
          message: 'No reminders to send',
          processed: 0,
        },
        { status: 200 }
      );
    }

    const sessions = upcomingSessions[0] as any[];
    console.log(`[Cron] Found ${sessions.length} sessions requiring reminders`);

    // ========================================
    // 2. SEND REMINDERS
    // ========================================
    let successCount = 0;
    let failCount = 0;

    for (const session of sessions) {
      try {
        const scheduledAt = new Date(session.calendly_scheduled_at);

        // Format date and time
        const scheduledDate = scheduledAt.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        const scheduledTime = scheduledAt.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          timeZone: 'UTC',
        });

        // Calculate hours until session
        const hoursUntil = Math.floor(
          (scheduledAt.getTime() - Date.now()) / (1000 * 60 * 60)
        );

        console.log(
          `[Cron] Sending reminder for session ${session.id} (${hoursUntil}h until meeting)`
        );

        // Send reminder email
        await send24HourReminder({
          fullName: session.full_name,
          businessEmail: session.business_email,
          companyName: session.company_name,
          scheduledDate,
          scheduledTime,
          timezone: 'UTC',
          meetingLink: session.calendly_event_uri || '#',
          prepChecklist: PREP_CHECKLIST,
        });

        // Update database
        await query(
          `UPDATE strategy_sessions
           SET reminder_email_sent = TRUE,
               reminder_email_sent_at = NOW()
           WHERE id = ?`,
          [session.id]
        );

        console.log(
          `[Cron] Reminder sent for session: ${session.id} (${session.business_email})`
        );
        successCount++;

        // Small delay between emails
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(
          `[Cron] Failed to send reminder for session ${session.id}:`,
          error
        );
        failCount++;
        // Continue with next session
      }
    }

    // ========================================
    // 3. CHECK FOR OVERDUE REMINDERS
    // ========================================
    // Find sessions that should have received reminder but didn't
    try {
      const overdueResult = await query(
        `SELECT COUNT(*) as overdue_count
         FROM strategy_sessions
         WHERE booking_stage = 'calendar_booked'
           AND reminder_email_sent = FALSE
           AND calendly_scheduled_at < DATE_ADD(NOW(), INTERVAL 23 HOUR)
           AND calendly_scheduled_at > NOW()`,
        []
      );

      const overdueCount =
        overdueResult &&
        overdueResult[0] &&
        (overdueResult[0] as any).length > 0
          ? (overdueResult[0] as any)[0].overdue_count
          : 0;

      if (overdueCount > 0) {
        console.warn(
          `[Cron] WARNING: ${overdueCount} sessions with overdue reminders (less than 23h until meeting)`
        );
        // Could send immediate reminder or alert team
      }
    } catch (overdueError) {
      console.error('[Cron] Error checking overdue reminders:', overdueError);
    }

    // ========================================
    // 4. RETURN SUMMARY
    // ========================================
    const summary = {
      success: true,
      message: 'Session reminders completed',
      processed: successCount + failCount,
      successful: successCount,
      failed: failCount,
      timestamp: new Date().toISOString(),
    };

    console.log('[Cron] Session reminders completed:', summary);

    return NextResponse.json(summary, { status: 200 });
  } catch (error) {
    console.error('[Cron] Critical error in session reminders cron:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Cron job failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// ============================================================
// POST HANDLER (Alternative for testing)
// ============================================================

export async function POST(request: NextRequest) {
  return GET(request);
}
