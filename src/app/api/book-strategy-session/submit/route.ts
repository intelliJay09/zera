/**
 * ZERA Strategy Session - Form Submission Endpoint
 *
 * Flow:
 * 1. Verify CSRF token
 * 2. Check rate limit (5 per hour per IP)
 * 3. Validate form data with Zod
 * 4. Sanitize all inputs
 * 5. Generate session ID and payment reference
 * 6. Insert session record into database
 * 7. Initialize Paystack payment
 * 8. Return authorization URL
 *
 * Note: Duplicate booking prevention is handled by the booking token system.
 * Each payment generates a unique, single-use, time-limited token that prevents
 * multiple Calendly bookings per payment while allowing repeat customers.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { query, insert } from '@/lib/db';
import {
  sanitizeForEmail,
  sanitizeUrl,
  sanitizeEmail,
  sanitizePhone,
} from '@/lib/sanitize';
import { initializePayment, generatePaymentReference } from '@/lib/paystack';
import {
  verifyFormSubmission,
  createVerificationErrorResponse,
} from '@/lib/form-verification';
import type {
  SubmitStrategySessionResponse,
} from '@/types/strategy-session';

// ============================================================
// ZOD VALIDATION SCHEMA
// ============================================================

const strategySessionSchema = z.object({
  recaptchaToken: z.string().min(1, 'reCAPTCHA token is required'),
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(255, 'Full name is too long'),
  businessEmail: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email is too long'),
  companyName: z
    .string()
    .min(1, 'Company name is required')
    .max(255, 'Company name is too long'),
  websiteUrl: z
    .string()
    .min(1, 'Website URL is required')
    .max(500, 'Website URL is too long')
    .transform((url) => {
      // Auto-add https:// if no protocol specified
      // Accepts: example.com, www.example.com, https://example.com
      const trimmed = url.trim();
      if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
        return `https://${trimmed}`;
      }
      return trimmed;
    })
    .refine(
      (url) => {
        try {
          new URL(url);
          return true;
        } catch {
          return false;
        }
      },
      { message: 'Please enter a valid website (e.g., example.com)' }
    ),
  whatsappNumber: z
    .string()
    .min(1, 'WhatsApp number is required')
    .max(50, 'WhatsApp number is too long')
    .refine(
      (num) => {
        // Accept any number-like string (with or without country code)
        // Examples: 0501234567, +233501234567, 233501234567
        const cleaned = num.replace(/[\s\-\(\)]/g, '');
        return /^[\+]?[0-9]{7,15}$/.test(cleaned);
      },
      { message: 'Please enter a valid phone number' }
    ),
  revenueRange: z.enum(['pre-revenue', '50k-250k', '250k-1m', '1m+', 'custom'], {
    message: 'Please select a revenue range',
  }),
  customRevenue: z.string().max(255, 'Custom revenue is too long').optional(),
  growthObstacle: z.enum(['visibility', 'lead-flow', 'retention', 'chaos'], {
    message: 'Please select a growth obstacle',
  }),
  magicWandOutcome: z
    .string()
    .min(10, 'Please describe your desired outcome (at least 10 characters)')
    .max(2000, 'Desired outcome is too long'),

  // Optional UTM parameters
  utmSource: z.string().max(100).optional(),
  utmMedium: z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional(),
  utmTerm: z.string().max(100).optional(),
  utmContent: z.string().max(100).optional(),
  referrerUrl: z.string().max(500).optional(),
});

// ============================================================
// RATE LIMIT CONFIGURATION
// ============================================================

const RATE_LIMIT = {
  maxRequests: 5, // 5 submissions per hour per IP
  windowMinutes: 60,
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Extract client IP address from request
 */
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  return 'unknown';
}

/**
 * Extract UTM parameters from request headers or query
 */
function extractUTMParams(request: NextRequest): {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referrerUrl?: string;
} {
  const { searchParams } = new URL(request.url);
  const referer = request.headers.get('referer');

  return {
    utmSource: searchParams.get('utm_source') || undefined,
    utmMedium: searchParams.get('utm_medium') || undefined,
    utmCampaign: searchParams.get('utm_campaign') || undefined,
    utmTerm: searchParams.get('utm_term') || undefined,
    utmContent: searchParams.get('utm_content') || undefined,
    referrerUrl: referer || undefined,
  };
}

// ============================================================
// POST HANDLER
// ============================================================

export async function POST(request: NextRequest) {
  try {
    // ========================================
    // 1. UNIFIED VERIFICATION: CSRF + Rate Limiting + reCAPTCHA
    // ========================================
    const verification = await verifyFormSubmission(request, {
      endpoint: '/api/book-strategy-session/submit',
      maxRequests: RATE_LIMIT.maxRequests,
      windowMinutes: RATE_LIMIT.windowMinutes,
      recaptchaAction: 'book_strategy_session',
    });

    if (!verification.allowed) {
      return createVerificationErrorResponse(verification);
    }

    // ========================================
    // 2. USE PARSED REQUEST BODY FROM VERIFICATION
    // ========================================
    const body = verification.body;

    // Extract UTM params from request and merge with body
    const utmParams = extractUTMParams(request);
    const formData = {
      ...body,
      ...utmParams, // URL params override body params
    };

    // Validate with Zod schema
    const validationResult = strategySessionSchema.safeParse(formData);

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((err: any) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      return NextResponse.json(
        {
          error: 'Validation failed',
          details: errors,
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // Extract recaptchaToken (don't include in database)
    const { recaptchaToken: _recaptchaToken, ...validData } = validatedData;

    // ========================================
    // 4. SANITIZE ALL INPUTS
    // ========================================
    const sanitizedData = {
      fullName: sanitizeForEmail(validData.fullName),
      businessEmail: sanitizeEmail(validData.businessEmail),
      companyName: sanitizeForEmail(validData.companyName),
      websiteUrl: sanitizeUrl(validData.websiteUrl),
      whatsappNumber: sanitizePhone(validData.whatsappNumber),
      revenueRange: validData.revenueRange,
      customRevenue: validData.customRevenue
        ? sanitizeForEmail(validData.customRevenue)
        : null,
      growthObstacle: validData.growthObstacle,
      magicWandOutcome: sanitizeForEmail(validData.magicWandOutcome),
      utmSource: validData.utmSource
        ? sanitizeForEmail(validData.utmSource)
        : null,
      utmMedium: validData.utmMedium
        ? sanitizeForEmail(validData.utmMedium)
        : null,
      utmCampaign: validData.utmCampaign
        ? sanitizeForEmail(validData.utmCampaign)
        : null,
      utmTerm: validData.utmTerm ? sanitizeForEmail(validData.utmTerm) : null,
      utmContent: validData.utmContent
        ? sanitizeForEmail(validData.utmContent)
        : null,
      referrerUrl: validData.referrerUrl
        ? sanitizeUrl(validData.referrerUrl)
        : null,
    };

    // Verify email wasn't stripped by sanitization
    if (!sanitizedData.businessEmail) {
      return NextResponse.json(
        { error: 'Invalid email address provided' },
        { status: 400 }
      );
    }

    // Verify URL wasn't stripped by sanitization
    if (!sanitizedData.websiteUrl) {
      return NextResponse.json(
        { error: 'Invalid website URL provided' },
        { status: 400 }
      );
    }

    // ========================================
    // 5. GENERATE SESSION ID AND REFERENCE
    // ========================================
    // Note: Duplicate booking prevention is handled by the booking token system
    // Each payment generates a unique, single-use, time-limited token
    // This allows repeat customers while preventing abuse
    const sessionId = uuidv4();
    const paymentReference = generatePaymentReference();
    const ipAddress = getClientIp(request);
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // ========================================
    // 6. INSERT INTO DATABASE
    // ========================================
    const insertSql = `
      INSERT INTO strategy_sessions (
        id,
        full_name,
        business_email,
        company_name,
        website_url,
        whatsapp_number,
        revenue_range,
        custom_revenue,
        growth_obstacle,
        magic_wand_outcome,
        payment_status,
        payment_reference,
        payment_amount,
        payment_currency,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_term,
        utm_content,
        referrer_url,
        ip_address,
        user_agent,
        booking_stage
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, 100.00, 'USD', ?, ?, ?, ?, ?, ?, ?, ?, 'form_submitted')
    `;

    await insert(insertSql, [
      sessionId,
      sanitizedData.fullName,
      sanitizedData.businessEmail,
      sanitizedData.companyName,
      sanitizedData.websiteUrl,
      sanitizedData.whatsappNumber,
      sanitizedData.revenueRange,
      sanitizedData.customRevenue,
      sanitizedData.growthObstacle,
      sanitizedData.magicWandOutcome,
      paymentReference,
      sanitizedData.utmSource,
      sanitizedData.utmMedium,
      sanitizedData.utmCampaign,
      sanitizedData.utmTerm,
      sanitizedData.utmContent,
      sanitizedData.referrerUrl,
      ipAddress,
      userAgent,
    ]);

    console.log(`Strategy session created: ${sessionId} for ${sanitizedData.businessEmail}`);

    // ========================================
    // 7. INITIALIZE PAYSTACK PAYMENT
    // ========================================
    try {
      const paymentResult = await initializePayment(
        {
          sessionId,
          fullName: sanitizedData.fullName,
          businessEmail: sanitizedData.businessEmail,
          companyName: sanitizedData.companyName,
          websiteUrl: sanitizedData.websiteUrl,
          whatsappNumber: sanitizedData.whatsappNumber,
          revenueRange: sanitizedData.revenueRange,
          growthObstacle: sanitizedData.growthObstacle,
        },
        'GHS', // GHS 2,000 (Paystack merchant account currency)
        paymentReference // Use the same reference stored in database
      );

      // ========================================
      // 8. RETURN SUCCESS RESPONSE
      // ========================================
      const response: SubmitStrategySessionResponse = {
        success: true,
        sessionId,
        authorizationUrl: paymentResult.authorizationUrl,
        reference: paymentReference,
        message: 'Session created successfully. Redirecting to payment...',
      };

      return NextResponse.json(response, { status: 200 });
    } catch (paymentError) {
      // Payment initialization failed - update database
      await query(
        `UPDATE strategy_sessions
         SET payment_status = 'failed',
             payment_error_message = ?
         WHERE id = ?`,
        [
          paymentError instanceof Error
            ? paymentError.message
            : 'Payment initialization failed',
          sessionId,
        ]
      );

      console.error('Payment initialization error:', paymentError);

      return NextResponse.json(
        {
          error: 'Failed to initialize payment. Please try again or contact support.',
          sessionId, // Return sessionId for debugging
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Strategy session submission error:', error);

    return NextResponse.json(
      {
        error: 'An unexpected error occurred. Please try again later.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
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
        'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, x-csrf-token',
      },
    }
  );
}
