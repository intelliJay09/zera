/**
 * ZERA Strategy Session - Paystack Webhook Handler
 *
 * CRITICAL SECURITY:
 * 1. Get raw body as string BEFORE parsing JSON
 * 2. Verify x-paystack-signature header using HMAC SHA512
 * 3. Return 401 if signature invalid
 * 4. Parse JSON only after verification
 * 5. Always return 200 OK to Paystack (even on internal errors)
 *
 * Events Handled:
 * - charge.success: Payment completed successfully
 * - charge.failed: Payment failed
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyWebhookSignature, convertToMainUnit } from '@/lib/paystack';
import type { PaystackWebhookEvent } from '@/types/strategy-session';

// ============================================================
// WEBHOOK EVENT HANDLERS
// ============================================================

/**
 * Handle successful payment
 */
async function handleChargeSuccess(event: PaystackWebhookEvent): Promise<void> {
  const { data } = event;
  const reference = data.reference;
  const sessionId = data.metadata?.session_id;

  console.log(`[Webhook] charge.success received for reference: ${reference}`);

  if (!sessionId) {
    console.error('[Webhook] No session_id in metadata:', data.metadata);
    throw new Error('Missing session_id in payment metadata');
  }

  // Convert amount from kobo/cents to main currency
  const amount = convertToMainUnit(data.amount, data.currency);

  try {
    // Update session record with payment details
    await query(
      `UPDATE strategy_sessions
       SET payment_status = 'completed',
           paid_at = NOW(),
           payment_amount = ?,
           payment_currency = ?,
           paystack_customer_code = ?,
           booking_stage = 'payment_completed',
           updated_at = NOW()
       WHERE id = ?
         AND payment_reference = ?`,
      [amount, data.currency, data.customer.customer_code, sessionId, reference]
    );

    console.log(`[Webhook] Payment completed for session: ${sessionId}`);

    // Fetch session data for email and CRM
    const sessionResult = await query(
      `SELECT * FROM strategy_sessions WHERE id = ?`,
      [sessionId]
    );

    if (!sessionResult || !sessionResult[0] || (sessionResult[0] as any).length === 0) {
      console.error('[Webhook] Session not found after update:', sessionId);
      return;
    }

    const session = (sessionResult[0] as any)[0];

    // ========================================
    // GET OR GENERATE BOOKING TOKEN
    // ========================================
    // Note: Payment callback already generates token, so this usually exists
    let bookingToken = session.booking_token;

    if (!bookingToken) {
      // Fallback: Generate token if callback didn't create one (shouldn't happen)
      const { createBookingToken } = await import('@/lib/booking-token');
      bookingToken = await createBookingToken(sessionId);
      console.log(`[Webhook] Generated NEW booking token (fallback): ${bookingToken.substring(0, 20)}...`);
    } else {
      console.log(`[Webhook] Using EXISTING booking token from payment callback: ${bookingToken.substring(0, 20)}...`);
    }

    // ========================================
    // NO EMAILS SENT AFTER PAYMENT
    // ========================================
    // Customer proceeds directly to Calendly booking page (booking success page with embedded widget)
    // BOTH customer confirmation AND team notification are sent AFTER Calendly booking completes
    // This is triggered by client-side event listener that calls mark-token-used endpoint
    console.log(`[Webhook] Payment confirmed for session: ${sessionId} - Customer redirected to Calendly booking page`)

    // ========================================
    // SEND CRM WEBHOOK (Non-blocking with retry)
    // ========================================
    try {
      const { sendToCRM } = await import('@/lib/crm-webhook');

      await sendToCRM(session);

      console.log(`[Webhook] CRM webhook sent for session: ${sessionId}`);
    } catch (crmError) {
      console.error('[Webhook] Failed to send CRM webhook (will retry):', crmError);
      // CRM webhook has its own retry logic, don't throw
    }
  } catch (error) {
    console.error('[Webhook] Error handling charge.success:', error);
    throw error; // Re-throw to trigger 500 response
  }
}

/**
 * Handle failed payment
 */
async function handleChargeFailed(event: PaystackWebhookEvent): Promise<void> {
  const { data } = event;
  const reference = data.reference;
  const sessionId = data.metadata?.session_id;

  console.log(`[Webhook] charge.failed received for reference: ${reference}`);

  if (!sessionId) {
    console.error('[Webhook] No session_id in metadata:', data.metadata);
    return; // Don't throw - not critical
  }

  try {
    // Update session record with failure details
    await query(
      `UPDATE strategy_sessions
       SET payment_status = 'failed',
           payment_error_message = ?,
           updated_at = NOW()
       WHERE id = ?
         AND payment_reference = ?`,
      [data.gateway_response || data.message || 'Payment failed', sessionId, reference]
    );

    console.log(`[Webhook] Payment failed for session: ${sessionId}`);
  } catch (error) {
    console.error('[Webhook] Error handling charge.failed:', error);
    // Don't throw - we've logged the error
  }
}

// ============================================================
// POST HANDLER
// ============================================================

export async function POST(request: NextRequest) {
  try {
    // ========================================
    // 1. GET RAW BODY (BEFORE JSON PARSING)
    // ========================================
    const rawBody = await request.text();

    // ========================================
    // 2. VERIFY WEBHOOK SIGNATURE
    // ========================================
    const signature = request.headers.get('x-paystack-signature');

    if (!signature) {
      console.error('[Webhook] Missing x-paystack-signature header');
      return NextResponse.json(
        { error: 'Missing signature header' },
        { status: 401 }
      );
    }

    const isValid = verifyWebhookSignature(rawBody, signature);

    if (!isValid) {
      console.error('[Webhook] Invalid signature');
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }

    // ========================================
    // 3. PARSE JSON AFTER VERIFICATION
    // ========================================
    let event: PaystackWebhookEvent;
    try {
      event = JSON.parse(rawBody);
    } catch (parseError) {
      console.error('[Webhook] JSON parse error:', parseError);
      // Return 200 to Paystack (prevent retries for malformed data)
      return NextResponse.json(
        { message: 'Invalid JSON format' },
        { status: 200 }
      );
    }

    console.log(`[Webhook] Event received: ${event.event}`);

    // ========================================
    // 4. ROUTE TO EVENT HANDLER
    // ========================================
    try {
      switch (event.event) {
        case 'charge.success':
          await handleChargeSuccess(event);
          break;

        case 'charge.failed':
          await handleChargeFailed(event);
          break;

        default:
          console.log(`[Webhook] Unhandled event type: ${event.event}`);
          // Return 200 for unknown events (don't trigger retries)
          break;
      }

      // ========================================
      // 5. ALWAYS RETURN 200 OK TO PAYSTACK
      // ========================================
      return NextResponse.json(
        { message: 'Webhook processed successfully' },
        { status: 200 }
      );
    } catch (handlerError) {
      // Log error but still return 200 to prevent retries
      console.error('[Webhook] Handler error:', handlerError);

      // In production, you might want to alert your team here
      // e.g., send to error tracking service (Sentry, etc.)

      return NextResponse.json(
        { message: 'Webhook received but processing failed' },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('[Webhook] Critical error:', error);

    // Even on critical errors, return 200 to prevent Paystack retries
    // We've logged the error for debugging
    return NextResponse.json(
      { message: 'Webhook received' },
      { status: 200 }
    );
  }
}

// ============================================================
// GET HANDLER (FOR VERIFICATION)
// ============================================================

/**
 * Simple endpoint to verify webhook URL is accessible
 * Paystack may call this during webhook setup
 */
export async function GET() {
  return NextResponse.json(
    {
      message: 'ZERA Strategy Session - Paystack Webhook Endpoint',
      status: 'active',
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}

// ============================================================
// OPTIONS HANDLER (CORS PREFLIGHT)
// ============================================================

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, x-paystack-signature',
      },
    }
  );
}
