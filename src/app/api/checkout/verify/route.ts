/**
 * Payment Verification API
 * Verifies Paystack transaction and updates checkout submission status
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyTransaction, convertFromKobo } from '@/lib/paystack';
import { query, update } from '@/lib/db';
import { checkRateLimit, RATE_LIMITS } from '@/lib/rate-limit';

export async function GET(request: NextRequest) {
  try {
    // Rate limiting: 30 requests per hour
    const rateLimit = await checkRateLimit(
      request,
      '/api/checkout/verify',
      RATE_LIMITS.CHECKOUT_VERIFY.maxRequests,
      RATE_LIMITS.CHECKOUT_VERIFY.windowMinutes
    );

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many verification attempts. Please try again later.',
          retryAfter: Math.ceil(
            (rateLimit.resetAt.getTime() - Date.now()) / 1000
          ),
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil(
              (rateLimit.resetAt.getTime() - Date.now()) / 1000
            ).toString(),
            'X-RateLimit-Limit': RATE_LIMITS.CHECKOUT_VERIFY.maxRequests.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': rateLimit.resetAt.toISOString(),
          },
        }
      );
    }

    // Get transaction reference from query params
    const searchParams = request.nextUrl.searchParams;
    const reference = searchParams.get('reference');

    if (!reference) {
      return NextResponse.json(
        { success: false, error: 'Transaction reference is required' },
        { status: 400 }
      );
    }

    // Verify transaction with Paystack
    const verificationResponse = await verifyTransaction(reference);

    if (!verificationResponse.status) {
      return NextResponse.json(
        { success: false, error: 'Payment verification failed' },
        { status: 400 }
      );
    }

    const transaction = verificationResponse.data;

    // Check if payment was successful
    if (transaction.status !== 'success') {
      // Update database with failed/abandoned status
      await update(
        `UPDATE checkout_submissions
         SET payment_status = ?, updated_at = NOW()
         WHERE payment_reference = ?`,
        [transaction.status, reference]
      );

      return NextResponse.json({
        success: false,
        error: 'Payment was not successful',
        status: transaction.status,
        message: transaction.gateway_response,
      });
    }

    // Payment successful - update database
    // Convert ISO datetime to MySQL format (2025-10-18T18:08:12.000Z -> 2025-10-18 18:08:12)
    const mysqlDatetime = new Date(transaction.paid_at).toISOString().slice(0, 19).replace('T', ' ');

    const affectedRows = await update(
      `UPDATE checkout_submissions
       SET
         payment_status = 'completed',
         payment_amount = ?,
         payment_currency = ?,
         paid_at = ?,
         paystack_customer_code = ?,
         updated_at = NOW()
       WHERE payment_reference = ?`,
      [
        convertFromKobo(transaction.amount),
        transaction.currency,
        mysqlDatetime,
        transaction.customer.customer_code,
        reference,
      ]
    );

    if (affectedRows === 0) {
      return NextResponse.json(
        { success: false, error: 'Checkout submission not found' },
        { status: 404 }
      );
    }

    // Get the updated checkout submission
    const [rows] = await query(
      `SELECT * FROM checkout_submissions WHERE payment_reference = ?`,
      [reference]
    );

    const checkout = rows[0];

    // TODO: Send confirmation email
    // TODO: Send discovery form link email
    // TODO: Create webhook notification to project management tool

    return NextResponse.json({
      success: true,
      data: {
        checkoutId: checkout.id,
        reference: transaction.reference,
        amount: convertFromKobo(transaction.amount),
        currency: transaction.currency,
        paidAt: transaction.paid_at,
        customerEmail: transaction.customer.email,
        message: 'Payment verified successfully',
      },
    });
  } catch (error: any) {
    console.error('Payment verification error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
