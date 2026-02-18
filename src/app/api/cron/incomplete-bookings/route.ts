/**
 * ZERA Strategy Session - Incomplete Booking Reminder Cron
 *
 * Runs: Every 2 hours (configured in vercel.json)
 *
 * Logic:
 * 1. Find sessions with payment_status = 'completed'
 * 2. Filter: calendly_status = 'not_booked'
 * 3. Filter: paid_at < NOW() - 3 hours
 * 4. Filter: incomplete_booking_email_sent = FALSE
 * 5. Send reminder to complete booking on Calendly
 * 6. Update incomplete_booking_email_sent flag
 *
 * Email Template: Uses sendStrategySessionConfirmation() (same as payment confirmation)
 * Subject: "Payment Confirmed - Next: Book Your Time Slot"
 *
 * Authorization: Requires CRON_SECRET in request header or Vercel cron header
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// ============================================================
// AUTHORIZATION
// ============================================================

function isAuthorizedCronRequest(request: NextRequest): boolean {
  // Check Vercel Cron secret header (production)
  const cronSecret = request.headers.get('x-vercel-cron-secret');
  if (cronSecret && cronSecret === process.env.CRON_SECRET) {
    return true;
  }

  // Check Authorization header (manual trigger)
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader === `Bearer ${process.env.CRON_SECRET}`) {
    return true;
  }

  return false;
}

// ============================================================
// GET HANDLER (Main Cron Logic)
// ============================================================

export async function GET(request: NextRequest) {
  console.log('[Cron] Incomplete bookings reminder started');

  // ========================================
  // 1. AUTHORIZATION CHECK
  // ========================================
  if (!isAuthorizedCronRequest(request)) {
    console.error('[Cron] Unauthorized cron request');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // ========================================
    // 2. FIND INCOMPLETE BOOKINGS
    // ========================================
    const incompleteSessions = await query(
      `SELECT
        id,
        full_name,
        business_email,
        company_name,
        payment_reference,
        payment_amount,
        payment_currency,
        booking_token,
        paid_at
       FROM strategy_sessions
       WHERE payment_status = 'completed'
         AND calendly_status = 'not_booked'
         AND incomplete_booking_email_sent = FALSE
         AND paid_at < DATE_SUB(NOW(), INTERVAL 3 HOUR)
       ORDER BY paid_at ASC
       LIMIT 50`,
      []
    );

    if (
      !incompleteSessions ||
      !incompleteSessions[0] ||
      (incompleteSessions[0] as any).length === 0
    ) {
      console.log('[Cron] No incomplete bookings requiring reminders');
      return NextResponse.json(
        {
          success: true,
          message: 'No incomplete bookings',
          processed: 0,
        },
        { status: 200 }
      );
    }

    const sessions = incompleteSessions[0] as any[];
    console.log(`[Cron] Found ${sessions.length} incomplete bookings`);

    // ========================================
    // 3. SEND REMINDERS
    // ========================================
    let successCount = 0;
    let failCount = 0;

    for (const session of sessions) {
      try {
        // Calculate hours since payment
        const hoursSincePaid = Math.floor(
          (Date.now() - new Date(session.paid_at).getTime()) / (1000 * 60 * 60)
        );

        console.log(
          `[Cron] Sending abandoned booking reminder for session ${session.id} (${hoursSincePaid}h since payment)`
        );

        // Build booking URL with token (not payment URL)
        const bookingUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/booking/success?sessionId=${session.id}&token=${session.booking_token}`;

        // Calculate expiry (24 hours from paid_at)
        const expiresInHours = Math.max(0, 24 - hoursSincePaid);
        const expiresIn = expiresInHours > 1 ? `${expiresInHours} hours` : '1 hour';

        // Send abandoned booking reminder (Email 3)
        const { sendAbandonedBookingEmail } = await import('@/lib/email-strategy-sessions');
        await sendAbandonedBookingEmail({
          fullName: session.full_name,
          businessEmail: session.business_email,
          companyName: session.company_name,
          resumePaymentUrl: bookingUrl, // Booking URL with token
          expiresIn,
        });

        // Update database tracking
        await query(
          `UPDATE strategy_sessions
           SET incomplete_booking_email_sent = TRUE,
               incomplete_booking_email_sent_at = NOW()
           WHERE id = ?`,
          [session.id]
        );

        console.log(
          `[Cron] Incomplete booking reminder sent for session: ${session.id}`
        );
        successCount++;

        // Rate limiting: 1 second between emails
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(
          `[Cron] Failed to send reminder for session ${session.id}:`,
          error
        );
        failCount++;
      }
    }

    // ========================================
    // 4. RETURN SUMMARY
    // ========================================
    const summary = {
      success: true,
      message: 'Incomplete booking reminders completed',
      processed: successCount + failCount,
      successful: successCount,
      failed: failCount,
      timestamp: new Date().toISOString(),
    };

    console.log('[Cron] Incomplete bookings reminder completed:', summary);

    return NextResponse.json(summary, { status: 200 });
  } catch (error) {
    console.error('[Cron] Critical error in incomplete bookings cron:', error);

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
// POST HANDLER (Allow both GET and POST)
// ============================================================

export async function POST(request: NextRequest) {
  return GET(request);
}
