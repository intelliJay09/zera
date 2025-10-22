/**
 * Paystack API Integration
 * Handles payment initialization, verification, and webhook processing
 */

const PAYSTACK_BASE_URL = 'https://api.paystack.co';
const SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;

interface PaystackResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

interface InitializeTransactionData {
  authorization_url: string;
  access_code: string;
  reference: string;
}

interface VerifyTransactionData {
  id: number;
  domain: string;
  status: 'success' | 'failed' | 'abandoned';
  reference: string;
  amount: number;
  message: string;
  gateway_response: string;
  paid_at: string;
  created_at: string;
  channel: string;
  currency: string;
  ip_address: string;
  metadata: any;
  fees: number;
  customer: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    customer_code: string;
    phone: string;
    metadata: any;
    risk_action: string;
  };
  authorization: {
    authorization_code: string;
    bin: string;
    last4: string;
    exp_month: string;
    exp_year: string;
    channel: string;
    card_type: string;
    bank: string;
    country_code: string;
    brand: string;
    reusable: boolean;
    signature: string;
  };
}

/**
 * Initialize a Paystack transaction
 */
export async function initializeTransaction(params: {
  email: string;
  amount: number; // Amount in kobo (GHS * 100)
  currency?: 'GHS' | 'USD';
  reference?: string;
  callback_url?: string;
  metadata?: Record<string, any>;
  channels?: string[];
}): Promise<PaystackResponse<InitializeTransactionData>> {
  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: params.email,
      amount: params.amount,
      currency: params.currency || 'GHS',
      reference: params.reference,
      callback_url: params.callback_url,
      metadata: params.metadata,
      channels: params.channels || ['card', 'mobile_money'],
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to initialize transaction');
  }

  return response.json();
}

/**
 * Verify a Paystack transaction
 */
export async function verifyTransaction(
  reference: string
): Promise<PaystackResponse<VerifyTransactionData>> {
  const response = await fetch(
    `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to verify transaction');
  }

  return response.json();
}

/**
 * Verify Paystack webhook signature
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string
): boolean {
  const crypto = require('crypto');
  const hash = crypto
    .createHmac('sha512', SECRET_KEY)
    .update(payload)
    .digest('hex');
  return hash === signature;
}

/**
 * Generate a unique transaction reference
 */
export function generateTransactionReference(prefix: string = 'TAF'): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Convert amount to kobo (smallest currency unit)
 * GHS 1000 = 100000 kobo
 */
export function convertToKobo(amount: number): number {
  return Math.round(amount * 100);
}

/**
 * Convert kobo to currency amount
 */
export function convertFromKobo(kobo: number): number {
  return kobo / 100;
}

/**
 * Format currency amount with symbol
 */
export function formatCurrency(amount: number, currency: 'GHS' | 'USD' = 'GHS'): string {
  const symbol = currency === 'GHS' ? '₵' : '$';
  return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
