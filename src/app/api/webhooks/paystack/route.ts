/**
 * Paystack Webhook Handler
 * Processes payment events from Paystack
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature, convertFromKobo } from '@/lib/paystack';
import { query, update } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Get raw request body for signature verification
    const rawBody = await request.text();

    // Get Paystack signature from headers
    const signature = request.headers.get('x-paystack-signature');

    if (!signature) {
      console.error('Webhook signature missing');
      return NextResponse.json(
        { error: 'Webhook signature missing' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const isValid = verifyWebhookSignature(rawBody, signature);

    if (!isValid) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Parse the webhook payload
    const event = JSON.parse(rawBody);

    console.log('Paystack webhook event:', event.event);

    // Handle different event types
    switch (event.event) {
      case 'charge.success':
        await handleChargeSuccess(event.data);
        break;

      case 'charge.failed':
        await handleChargeFailed(event.data);
        break;

      case 'subscription.create':
        // Handle subscription creation (future feature)
        console.log('Subscription created:', event.data);
        break;

      case 'subscription.disable':
        // Handle subscription cancellation (future feature)
        console.log('Subscription disabled:', event.data);
        break;

      default:
        console.log('Unhandled event type:', event.event);
    }

    // Return 200 to acknowledge receipt
    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook processing error:', error);

    // Return 200 even on error to prevent Paystack retries
    // Log the error for manual review
    return NextResponse.json(
      { received: true, error: error.message },
      { status: 200 }
    );
  }
}

/**
 * Handle successful charge event
 */
async function handleChargeSuccess(data: any) {
  const reference = data.reference;
  const amount = convertFromKobo(data.amount);
  const currency = data.currency;
  const paidAt = data.paid_at;
  const customerCode = data.customer.customer_code;

  console.log(`Processing successful charge: ${reference}`);

  // Check if already processed (idempotency)
  const [existingRows] = await query(
    `SELECT payment_status FROM checkout_submissions WHERE payment_reference = ?`,
    [reference]
  );

  if (existingRows.length === 0) {
    console.error(`Checkout submission not found for reference: ${reference}`);
    return;
  }

  const checkout = existingRows[0] as any;

  if (checkout.payment_status === 'completed') {
    console.log(`Payment already processed: ${reference}`);
    return; // Already processed, skip
  }

  // Update checkout submission
  await update(
    `UPDATE checkout_submissions
     SET
       payment_status = 'completed',
       payment_amount = ?,
       payment_currency = ?,
       paid_at = ?,
       paystack_customer_code = ?,
       updated_at = NOW()
     WHERE payment_reference = ?`,
    [amount, currency, paidAt, customerCode, reference]
  );

  console.log(`Payment completed: ${reference}`);

  // TODO: Send confirmation email to customer
  // TODO: Send discovery form link email
  // TODO: Notify admin via email
  // TODO: Create webhook to project management tool
}

/**
 * Handle failed charge event
 */
async function handleChargeFailed(data: any) {
  const reference = data.reference;
  const message = data.gateway_response;

  console.log(`Processing failed charge: ${reference}`);

  // Update checkout submission status
  await update(
    `UPDATE checkout_submissions
     SET
       payment_status = 'failed',
       payment_error_message = ?,
       updated_at = NOW()
     WHERE payment_reference = ?`,
    [message, reference]
  );

  console.log(`Payment failed: ${reference} - ${message}`);

  // TODO: Send payment failure email to customer
  // TODO: Notify admin of failed payment
}
