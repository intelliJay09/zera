/**
 * POST /api/lead-magnet/ghana-audit
 *
 * Lead Magnet — 2026 Ghana Executive Audit PDF Delivery
 *
 * Flow:
 * 1. Verify CSRF token + rate limit + reCAPTCHA
 * 2. Validate form data (name, email, phone, UTM params)
 * 3. Sanitize all inputs
 * 4. Send PDF delivery email to lead
 * 5. Send team notification (non-blocking, fire-and-forget)
 * 6. Return success
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  sanitizeForEmail,
  sanitizeEmail,
  sanitizePhone,
} from '@/lib/sanitize';
import {
  verifyFormSubmission,
  createVerificationErrorResponse,
} from '@/lib/form-verification';
import {
  sendGhanaAuditDelivery,
  sendGhanaAuditTeamNotification,
} from '@/lib/email-lead-magnet';

// ============================================================
// ZOD VALIDATION SCHEMA
// ============================================================

const ghanaAuditSchema = z.object({
  recaptchaToken: z.string().min(1, 'reCAPTCHA token is required'),
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(255, 'Full name is too long'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email is too long'),
  phone: z
    .string()
    .min(7, 'Please enter a valid phone number')
    .max(50, 'Phone number is too long')
    .refine(
      (num) => {
        const cleaned = num.replace(/[\s\-\(\)]/g, '');
        return /^[\+]?[0-9]{7,15}$/.test(cleaned);
      },
      { message: 'Please enter a valid phone number' }
    ),
  utmSource: z.string().max(100).optional(),
  utmMedium: z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional(),
});

// ============================================================
// POST HANDLER
// ============================================================

export async function POST(request: NextRequest) {
  try {
    // 1. CSRF + Rate Limiting + reCAPTCHA
    const verification = await verifyFormSubmission(request, {
      endpoint: '/api/lead-magnet/ghana-audit',
      maxRequests: 3,
      windowMinutes: 60,
      recaptchaAction: 'ghana_audit_download',
    });

    if (!verification.allowed) {
      return createVerificationErrorResponse(verification);
    }

    // 2. Validate with Zod
    const validationResult = ghanaAuditSchema.safeParse(verification.body);

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    // Strip recaptchaToken before processing
    const { recaptchaToken: _recaptchaToken, ...validData } = validationResult.data;

    // 3. Sanitize all inputs
    const sanitizedEmail = sanitizeEmail(validData.email);

    if (!sanitizedEmail) {
      return NextResponse.json(
        { error: 'Invalid email address provided' },
        { status: 400 }
      );
    }

    const leadData = {
      fullName: sanitizeForEmail(validData.fullName),
      email: sanitizedEmail,
      phone: sanitizePhone(validData.phone),
      utmSource: validData.utmSource
        ? sanitizeForEmail(validData.utmSource)
        : undefined,
      utmMedium: validData.utmMedium
        ? sanitizeForEmail(validData.utmMedium)
        : undefined,
      utmCampaign: validData.utmCampaign
        ? sanitizeForEmail(validData.utmCampaign)
        : undefined,
    };

    // 4. Send PDF delivery email to lead
    await sendGhanaAuditDelivery(leadData);

    console.log(`[LeadMagnet] Ghana Audit delivered to: ${leadData.email}`);

    // 5. Team notification (non-blocking)
    sendGhanaAuditTeamNotification(leadData).catch((err) => {
      console.error('[LeadMagnet] Team notification failed:', err);
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[LeadMagnet] Ghana audit submission error:', error);

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
