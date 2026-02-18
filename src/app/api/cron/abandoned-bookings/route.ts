/**
 * ZERA Strategy Session - Abandoned Booking Recovery Cron
 *
 * Runs: Daily at 9:00 AM (configured in vercel.json)
 *
 * Logic:
 * 1. Find sessions with payment_status = 'pending'
 * 2. Filter: created > 24 hours ago
 * 3. Filter: abandoned_email_sent = false
 * 4. Send recovery email with payment link
 * 5. Update abandoned_email_sent flag
 * 6. Update payment_status to 'abandoned'
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { sendAbandonedBookingEmail } from '@/lib/email-strategy-sessions';
import { generatePaymentReference } from '@/lib/paystack';

// ============================================================
// CRON AUTHORIZATION
// ============================================================

/**
 * Verify cron request is authorized
 * Vercel sets CRON_SECRET header for scheduled cron jobs
 */
function isAuthorizedCronRequest(request: NextRequest): boolean {
  // Check Vercel cron secret
  const cronSecret = request.headers.get('x-vercel-cron-secret');
  if (cronSecret && cronSecret === process.env.CRON_SECRET) {
    return true;
  }

  // Check custom authorization header (for manual testing)
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader === `Bearer ${process.env.CRON_SECRET}`) {
    return true;
  }

  return false;
}

// ============================================================
// GET HANDLER
// ============================================================

export async function GET(request: NextRequest) {
  console.log('[Cron] Abandoned bookings recovery started');

  // Verify authorization
  if (!isAuthorizedCronRequest(request)) {
    console.error('[Cron] Unauthorized cron request');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // ========================================
    // 1. FIND ABANDONED SESSIONS
    // ========================================
    const abandonedSessions = await query(
      `SELECT
        id,
        full_name,
        business_email,
        company_name,
        payment_reference,
        created_at
       FROM strategy_sessions
       WHERE payment_status = 'pending'
         AND abandoned_email_sent = FALSE
         AND created_at < DATE_SUB(NOW(), INTERVAL 24 HOUR)
       ORDER BY created_at DESC
       LIMIT 50`,
      []
    );

    if (
      !abandonedSessions ||
      !abandonedSessions[0] ||
      (abandonedSessions[0] as any).length === 0
    ) {
      console.log('[Cron] No abandoned bookings found');
      return NextResponse.json(
        {
          success: true,
          message: 'No abandoned bookings to process',
          processed: 0,
        },
        { status: 200 }
      );
    }

    const sessions = abandonedSessions[0] as any[];
    console.log(`[Cron] Found ${sessions.length} abandoned bookings`);

    // ========================================
    // 2. PROCESS EACH ABANDONED SESSION
    // ========================================
    let successCount = 0;
    let failCount = 0;

    for (const session of sessions) {
      try {
        // Calculate time since submission
        const createdAt = new Date(session.created_at);
        const hoursSinceCreation = Math.floor(
          (Date.now() - createdAt.getTime()) / (1000 * 60 * 60)
        );

        // Calculate expiry (48 hours from creation)
        const expiresInHours = Math.max(0, 48 - hoursSinceCreation);
        const expiresIn =
          expiresInHours > 1 ? `${expiresInHours} hours` : '1 hour';

        // Generate resume payment URL
        // Use existing payment reference or generate new one
        const paymentReference =
          session.payment_reference || generatePaymentReference();

        const resumePaymentUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/book-strategy-session/resume?reference=${paymentReference}`;

        // Send recovery email
        await sendAbandonedBookingEmail({
          fullName: session.full_name,
          businessEmail: session.business_email,
          companyName: session.company_name,
          resumePaymentUrl,
          expiresIn,
        });

        // Update database
        await query(
          `UPDATE strategy_sessions
           SET abandoned_email_sent = TRUE,
               abandoned_email_sent_at = NOW(),
               payment_status = 'abandoned'
           WHERE id = ?`,
          [session.id]
        );

        console.log(
          `[Cron] Recovery email sent for session: ${session.id} (${session.business_email})`
        );
        successCount++;

        // Small delay between emails to avoid overwhelming SMTP
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(
          `[Cron] Failed to process abandoned session ${session.id}:`,
          error
        );
        failCount++;
        // Continue with next session
      }
    }

    // ========================================
    // 3. CLEANUP OLD ABANDONED SESSIONS
    // ========================================
    // Delete sessions abandoned > 7 days ago (optional cleanup)
    try {
      const deleteResult = await query(
        `DELETE FROM strategy_sessions
         WHERE payment_status = 'abandoned'
           AND created_at < DATE_SUB(NOW(), INTERVAL 7 DAY)`,
        []
      );

      const deletedCount = (deleteResult as any).affectedRows || 0;
      if (deletedCount > 0) {
        console.log(
          `[Cron] Cleaned up ${deletedCount} old abandoned sessions`
        );
      }
    } catch (cleanupError) {
      console.error('[Cron] Cleanup error:', cleanupError);
      // Don't fail entire cron if cleanup fails
    }

    // ========================================
    // 4. RETURN SUMMARY
    // ========================================
    const summary = {
      success: true,
      message: 'Abandoned booking recovery completed',
      processed: successCount + failCount,
      successful: successCount,
      failed: failCount,
      timestamp: new Date().toISOString(),
    };

    console.log('[Cron] Abandoned bookings recovery completed:', summary);

    return NextResponse.json(summary, { status: 200 });
  } catch (error) {
    console.error('[Cron] Critical error in abandoned bookings cron:', error);

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
  // Allow POST for manual testing
  return GET(request);
}
