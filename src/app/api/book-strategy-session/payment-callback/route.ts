/**
 * ZERA Strategy Session - Paystack Payment Callback
 *
 * Handles redirect after user completes/cancels payment on Paystack
 *
 * Flow:
 * 1. Extract reference from query params
 * 2. Verify transaction with Paystack API
 * 3. Check payment status in database
 * 4. Redirect to success page or retry page
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyTransaction } from '@/lib/paystack';

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Create redirect URL that works with both localhost and ngrok
 * Fixes issue where request.url gets rewritten to localhost by Next.js
 */
function createRedirectUrl(request: NextRequest, path: string): string {
  const protocol = request.headers.get('x-forwarded-proto') ||
                  (request.headers.get('host')?.includes('ngrok') ? 'https' : 'http');
  const host = request.headers.get('host') || 'localhost:3000';
  return `${protocol}://${host}${path}`;
}

// ============================================================
// GET HANDLER (Paystack redirects here)
// ============================================================

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get('reference');
  const trxref = searchParams.get('trxref'); // Alternative param name

  // Use whichever parameter is provided
  const paymentReference = reference || trxref;

  // ========================================
  // 1. VALIDATE REFERENCE PARAMETER
  // ========================================
  if (!paymentReference) {
    console.error('[Callback] Missing payment reference');
    return NextResponse.redirect(
      createRedirectUrl(request, '/contact?error=missing_reference')
    );
  }

  try {
    // ========================================
    // 2. VERIFY TRANSACTION WITH PAYSTACK
    // ========================================
    let paystackData;
    try {
      paystackData = await verifyTransaction(paymentReference);
    } catch (verifyError) {
      console.error('[Callback] Paystack verification failed:', verifyError);

      // Redirect to contact page with error
      return NextResponse.redirect(
        createRedirectUrl(
          request,
          `/contact?error=verification_failed&reference=${paymentReference}`
        )
      );
    }

    // ========================================
    // 3. FETCH SESSION FROM DATABASE
    // ========================================
    const sessionResult = await query(
      `SELECT id, payment_status, booking_stage, business_email, full_name
       FROM strategy_sessions
       WHERE payment_reference = ?
       LIMIT 1`,
      [paymentReference]
    );

    if (!sessionResult || !sessionResult[0] || (sessionResult[0] as any).length === 0) {
      console.error('[Callback] Session not found for reference:', paymentReference);

      return NextResponse.redirect(
        createRedirectUrl(
          request,
          `/contact?error=session_not_found&reference=${paymentReference}`
        )
      );
    }

    const session = (sessionResult[0] as any)[0];
    const sessionId = session.id;

    // ========================================
    // 4. CHECK PAYMENT STATUS & UPDATE DATABASE
    // ========================================

    // Payment completed successfully
    if (paystackData.status === 'success') {
      console.log(
        `[Callback] Payment successful: ${sessionId}, Paystack verification confirmed`
      );
      // Update database if not already completed
      if (session.payment_status !== 'completed') {
        await query(
          `UPDATE strategy_sessions
           SET payment_status = 'completed',
               booking_stage = 'payment_completed',
               paid_at = NOW(),
               paystack_customer_code = ?,
               payment_currency = ?,
               payment_amount = ?
           WHERE id = ?`,
          [
            paystackData.customer?.customer_code || null,
            paystackData.currency || 'GHS',
            (paystackData.amount || 0) / 100, // Convert from kobo/cents
            sessionId,
          ]
        );

        console.log(`[Callback] Database updated: payment_status = completed for ${sessionId}`);
      }

      // Generate one-time booking token
      const { createBookingToken } = await import('@/lib/booking-token');
      const bookingToken = await createBookingToken(sessionId);

      console.log(`[Callback] Generated booking token for session: ${sessionId}`);

      // Redirect to success page with token
      const redirectUrl = createRedirectUrl(
        request,
        `/booking/success?sessionId=${sessionId}&token=${bookingToken}`
      );
      console.log(`[Callback] Redirecting to: ${redirectUrl}`);
      return NextResponse.redirect(redirectUrl);
    }

    // Payment pending (still processing) - rare in test mode
    if (paystackData.status === 'pending') {
      console.log(`[Callback] Payment pending for: ${sessionId}`);
      return NextResponse.redirect(
        createRedirectUrl(
          request,
          `/contact?status=pending&sessionId=${sessionId}&reference=${paymentReference}`
        )
      );
    }

    // Payment failed
    if (paystackData.status === 'failed' || session.payment_status === 'failed') {
      console.log(`[Callback] Payment failed for: ${sessionId}`);

      // Extract failure reason
      const failureReason =
        paystackData.gateway_response || paystackData.message || 'Payment failed';

      return NextResponse.redirect(
        createRedirectUrl(
          request,
          `/booking/failed?sessionId=${sessionId}&reason=${encodeURIComponent(failureReason)}`
        )
      );
    }

    // Payment abandoned (user closed payment modal)
    if (paystackData.status === 'abandoned') {
      console.log(`[Callback] Payment abandoned for: ${sessionId}`);

      // Update database
      await query(
        `UPDATE strategy_sessions
         SET payment_status = 'abandoned'
         WHERE id = ?`,
        [sessionId]
      );

      return NextResponse.redirect(
        createRedirectUrl(request, `/contact?error=payment_abandoned&sessionId=${sessionId}`)
      );
    }

    // Unknown status - redirect to contact with info
    console.warn(
      `[Callback] Unknown payment status: ${paystackData.status} for session: ${sessionId}`
    );

    return NextResponse.redirect(
      createRedirectUrl(request, `/contact?error=unknown_status&status=${paystackData.status}`)
    );
  } catch (error) {
    console.error('[Callback] Error processing callback:', error);

    return NextResponse.redirect(
      createRedirectUrl(request, `/contact?error=processing_error&reference=${paymentReference}`)
    );
  }
}

// ============================================================
// POST HANDLER (Alternative callback method)
// ============================================================

export async function POST(request: NextRequest) {
  // Some payment gateways POST to callback URLs
  // Redirect to GET handler with same logic
  const body = await request.json();
  const reference = body.reference || body.trxref;

  if (!reference) {
    return NextResponse.json({ error: 'Missing payment reference' }, { status: 400 });
  }

  // Construct redirect URL with reference using host header
  const redirectUrl = createRedirectUrl(
    request,
    `/api/book-strategy-session/payment-callback?reference=${reference}`
  );

  return NextResponse.redirect(redirectUrl);
}
