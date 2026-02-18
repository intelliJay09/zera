/**
 * ZERA Strategy Session - Paystack Payment Integration
 *
 * SECURITY REQUIREMENTS:
 * - NO fallback values (fail explicitly if env vars missing)
 * - Use crypto.timingSafeEqual() for signature comparison
 * - Verify signature on raw body before parsing JSON
 * - All amounts in kobo (Naira) or cents (USD/other)
 */

import crypto from 'crypto';
import {
  PaystackInitializeRequest,
  PaystackInitializeResponse,
  PaystackVerificationResponse,
} from '@/types/strategy-session';

// ============================================================
// ENVIRONMENT VARIABLES VALIDATION
// ============================================================

/**
 * Validate required environment variables at runtime
 * Throws explicit error if any are missing (NO fallbacks)
 */
function validateEnvVars(): void {
  const required = [
    'PAYSTACK_SECRET_KEY',
    'PAYSTACK_PUBLIC_KEY',
    'PAYSTACK_CALLBACK_URL',
    'PAYSTACK_WEBHOOK_URL',
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `CRITICAL: Missing required Paystack environment variables: ${missing.join(', ')}. ` +
        `Payment operations cannot proceed. Check .env.local configuration.`
    );
  }
}

// Validate on module load
validateEnvVars();

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY as string;
const PAYSTACK_PUBLIC_KEY = process.env.PAYSTACK_PUBLIC_KEY as string;
const PAYSTACK_CALLBACK_URL = process.env.PAYSTACK_CALLBACK_URL as string;
const PAYSTACK_API_BASE = 'https://api.paystack.co';

// Strategy session pricing
const STRATEGY_SESSION_PRICE_USD = 100; // $100 USD
const STRATEGY_SESSION_PRICE_GHS = 2000; // GHS 2,000

// ============================================================
// REFERENCE GENERATION
// ============================================================

/**
 * Generate unique payment reference
 * Format: ZERA_STRAT_YYYYMMDD_RANDOM8
 *
 * @example "ZERA_STRAT_20260128_A3F5B2C8"
 */
export function generatePaymentReference(): string {
  const datePart = new Date()
    .toISOString()
    .split('T')[0]
    .replace(/-/g, ''); // YYYYMMDD

  const randomPart = crypto
    .randomBytes(4)
    .toString('hex')
    .toUpperCase(); // 8 hex chars

  return `ZERA_STRAT_${datePart}_${randomPart}`;
}

// ============================================================
// PAYMENT INITIALIZATION
// ============================================================

/**
 * Initialize Paystack payment for strategy session
 *
 * @param sessionData - Strategy session data from form submission
 * @param currency - Payment currency (USD or GHS)
 * @returns Authorization URL for payment
 *
 * @throws Error if initialization fails
 */
export async function initializePayment(
  sessionData: {
    sessionId: string;
    fullName: string;
    businessEmail: string;
    companyName: string;
    websiteUrl: string;
    whatsappNumber: string;
    revenueRange: string;
    growthObstacle: string;
  },
  currency: 'USD' | 'GHS' = 'USD',
  paymentReference?: string
): Promise<{
  authorizationUrl: string;
  reference: string;
  accessCode: string;
}> {
  try {
    // Use provided reference or generate new one
    const reference = paymentReference || generatePaymentReference();

    // Calculate amount in smallest currency unit (kobo for GHS, cents for USD)
    const amount =
      currency === 'GHS'
        ? STRATEGY_SESSION_PRICE_GHS * 100 // GHS 2,000 = 200,000 kobo
        : STRATEGY_SESSION_PRICE_USD * 100; // $100 = 10,000 cents

    const payload: PaystackInitializeRequest = {
      email: sessionData.businessEmail,
      amount,
      reference,
      callback_url: PAYSTACK_CALLBACK_URL,
      currency,
      channels: ['card', 'bank', 'ussd', 'mobile_money'], // All available payment methods
      metadata: {
        session_id: sessionData.sessionId,
        full_name: sessionData.fullName,
        company_name: sessionData.companyName,
        custom_fields: [
          {
            display_name: 'Company Name',
            variable_name: 'company_name',
            value: sessionData.companyName,
          },
          {
            display_name: 'Website URL',
            variable_name: 'website_url',
            value: sessionData.websiteUrl,
          },
          {
            display_name: 'WhatsApp Number',
            variable_name: 'whatsapp_number',
            value: sessionData.whatsappNumber,
          },
          {
            display_name: 'Revenue Range',
            variable_name: 'revenue_range',
            value: sessionData.revenueRange,
          },
          {
            display_name: 'Growth Obstacle',
            variable_name: 'growth_obstacle',
            value: sessionData.growthObstacle,
          },
        ],
      },
    };

    const response = await fetch(`${PAYSTACK_API_BASE}/transaction/initialize`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Paystack initialization failed: ${errorData.message || response.statusText}`
      );
    }

    const result: PaystackInitializeResponse = await response.json();

    if (!result.status || !result.data.authorization_url) {
      throw new Error('Paystack returned invalid response format');
    }

    return {
      authorizationUrl: result.data.authorization_url,
      reference: result.data.reference,
      accessCode: result.data.access_code,
    };
  } catch (error) {
    console.error('Paystack initialization error:', error);
    throw new Error(
      `Failed to initialize payment: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

// ============================================================
// PAYMENT VERIFICATION
// ============================================================

/**
 * Verify payment transaction with Paystack
 *
 * @param reference - Payment reference to verify
 * @returns Transaction verification data
 *
 * @throws Error if verification fails
 */
export async function verifyTransaction(
  reference: string
): Promise<PaystackVerificationResponse['data']> {
  try {
    const response = await fetch(`${PAYSTACK_API_BASE}/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Paystack verification failed: ${errorData.message || response.statusText}`
      );
    }

    const result: PaystackVerificationResponse = await response.json();

    if (!result.status) {
      throw new Error('Paystack verification returned unsuccessful status');
    }

    return result.data;
  } catch (error) {
    console.error('Paystack verification error:', error);
    throw new Error(
      `Failed to verify transaction: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

// ============================================================
// WEBHOOK SIGNATURE VERIFICATION
// ============================================================

/**
 * Verify Paystack webhook signature using HMAC SHA512
 *
 * CRITICAL SECURITY:
 * - Use crypto.timingSafeEqual() to prevent timing attacks
 * - Compare signatures on raw body before parsing JSON
 * - Never proceed with webhook processing if signature invalid
 *
 * @param rawBody - Raw request body as string
 * @param signature - x-paystack-signature header value
 * @returns true if signature is valid, false otherwise
 */
export function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  try {
    // Generate expected signature using HMAC SHA512
    const hash = crypto
      .createHmac('sha512', PAYSTACK_SECRET_KEY)
      .update(rawBody)
      .digest('hex');

    // Use timing-safe comparison to prevent timing attacks
    // Both buffers must be same length for timingSafeEqual
    const signatureBuffer = Buffer.from(signature);
    const hashBuffer = Buffer.from(hash);

    if (signatureBuffer.length !== hashBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(signatureBuffer, hashBuffer);
  } catch (error) {
    console.error('Webhook signature verification error:', error);
    return false;
  }
}

// ============================================================
// AMOUNT CONVERSION UTILITIES
// ============================================================

/**
 * Convert amount from kobo/cents to main currency unit
 *
 * @param amountInMinorUnit - Amount in kobo (GHS) or cents (USD)
 * @param currency - Currency code
 * @returns Amount in main currency unit (e.g., 200000 kobo → 2000 GHS)
 */
export function convertToMainUnit(amountInMinorUnit: number, _currency: string): number {
  return amountInMinorUnit / 100;
}

/**
 * Convert amount from main currency unit to kobo/cents
 *
 * @param amount - Amount in main currency unit
 * @param currency - Currency code
 * @returns Amount in kobo/cents (e.g., 2000 GHS → 200000 kobo)
 */
export function convertToMinorUnit(amount: number, _currency: string): number {
  return Math.round(amount * 100);
}

// ============================================================
// PAYMENT STATUS HELPERS
// ============================================================

/**
 * Map Paystack transaction status to our internal payment status
 */
export function mapPaystackStatus(
  paystackStatus: 'success' | 'failed' | 'pending' | 'abandoned'
): 'completed' | 'failed' | 'pending' | 'abandoned' {
  const statusMap = {
    success: 'completed' as const,
    failed: 'failed' as const,
    pending: 'pending' as const,
    abandoned: 'abandoned' as const,
  };

  return statusMap[paystackStatus];
}

/**
 * Check if payment is successful
 */
export function isPaymentSuccessful(status: string): boolean {
  return status === 'success' || status === 'completed';
}

/**
 * Get strategy session price
 */
export function getStrategySessionPrice(currency: 'USD' | 'GHS' = 'USD'): number {
  return currency === 'GHS' ? STRATEGY_SESSION_PRICE_GHS : STRATEGY_SESSION_PRICE_USD;
}

// ============================================================
// ERROR HANDLING UTILITIES
// ============================================================

/**
 * Extract meaningful error message from Paystack API error
 */
export function extractPaystackError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String((error as { message: unknown }).message);
  }

  return 'Unknown Paystack error occurred';
}

// ============================================================
// EXPORTS
// ============================================================

export const paystackConfig = {
  publicKey: PAYSTACK_PUBLIC_KEY,
  callbackUrl: PAYSTACK_CALLBACK_URL,
  apiBase: PAYSTACK_API_BASE,
  priceUSD: STRATEGY_SESSION_PRICE_USD,
  priceGHS: STRATEGY_SESSION_PRICE_GHS,
} as const;
