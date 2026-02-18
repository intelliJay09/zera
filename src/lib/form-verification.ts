/**
 * Unified Form Verification Pipeline
 *
 * Combines CSRF token verification, IP rate limiting, and reCAPTCHA verification
 * into a single reusable function for all API routes.
 *
 * Verification Order (Optimized for Performance):
 * 1. CSRF Token Verification (fast - prevent unauthorized requests)
 * 2. Rate Limiting Check (fast - database lookup)
 * 3. reCAPTCHA Verification (slower - external API call)
 *
 * This order ensures expensive operations only run after cheaper checks pass.
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyCSRFToken } from './csrf';
import { checkRateLimit } from './rate-limit';
import {
  verifyRecaptchaToken,
  isScoreAcceptable,
  isRecaptchaEnabled,
  type RecaptchaVerificationResult,
} from './recaptcha';

export interface VerificationConfig {
  /** API endpoint path for rate limiting tracking */
  endpoint: string;
  /** Maximum requests allowed per time window */
  maxRequests: number;
  /** Time window in minutes */
  windowMinutes: number;
  /** reCAPTCHA action name for token verification */
  recaptchaAction: string;
  /** Optional: Require reCAPTCHA verification (default: true if enabled) */
  requireRecaptcha?: boolean;
  /** Optional: Minimum reCAPTCHA score (default: from env or 0.5) */
  minScore?: number;
}

export interface VerificationResult {
  /** Whether the request is allowed to proceed */
  allowed: boolean;
  /** Reason for denial (if not allowed) */
  reason?: string;
  /** HTTP status code for error response */
  statusCode?: number;
  /** User-friendly error message */
  userMessage?: string;
  /** Rate limit information */
  rateLimit?: {
    remaining: number;
    resetTime: Date;
  };
  /** reCAPTCHA verification details */
  recaptcha?: RecaptchaVerificationResult;
  /** Parsed request body (to avoid double parsing) */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
}

/**
 * Verify form submission with CSRF, rate limiting, and reCAPTCHA
 *
 * @param request - Next.js request object
 * @param config - Verification configuration
 * @returns Verification result with allow/deny decision
 *
 * Usage Example:
 * ```typescript
 * const verification = await verifyFormSubmission(request, {
 *   endpoint: '/api/submit-quote',
 *   maxRequests: 5,
 *   windowMinutes: 60,
 *   recaptchaAction: 'submit_quote',
 * });
 *
 * if (!verification.allowed) {
 *   return createVerificationErrorResponse(verification);
 * }
 * ```
 */
export async function verifyFormSubmission(
  request: NextRequest,
  config: VerificationConfig
): Promise<VerificationResult> {
  const recaptchaEnabled = isRecaptchaEnabled();
  const requireRecaptcha =
    recaptchaEnabled && (config.requireRecaptcha ?? true);

  // STEP 1: CSRF Token Verification (Fast)
  const csrfToken = request.headers.get('x-csrf-token');
  const csrfCookie = request.cookies.get('csrf-token')?.value;

  if (!verifyCSRFToken(csrfToken, csrfCookie || null)) {
    console.warn('[Verification] CSRF token verification failed:', {
      endpoint: config.endpoint,
    });

    return {
      allowed: false,
      reason: 'csrf_failed',
      statusCode: 403,
      userMessage:
        'Invalid CSRF token. Please refresh the page and try again.',
    };
  }

  // STEP 2: Rate Limiting Check (Fast - Database Lookup)
  const rateLimitResult = await checkRateLimit(
    request,
    config.endpoint,
    config.maxRequests,
    config.windowMinutes
  );

  if (!rateLimitResult.allowed) {
    const resetMinutes = Math.ceil(
      (rateLimitResult.resetAt.getTime() - Date.now()) / 1000 / 60
    );

    const clientIp =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    console.warn('[Verification] Rate limit exceeded:', {
      endpoint: config.endpoint,
      clientIp,
      requestCount: rateLimitResult.total,
      maxRequests: config.maxRequests,
      windowMinutes: config.windowMinutes,
      resetMinutes,
    });

    return {
      allowed: false,
      reason: 'rate_limit_exceeded',
      statusCode: 429,
      userMessage: `Too many requests. Please try again in ${resetMinutes} minute${resetMinutes !== 1 ? 's' : ''}.`,
      rateLimit: {
        remaining: 0,
        resetTime: rateLimitResult.resetAt,
      },
    };
  }

  // STEP 3: reCAPTCHA Verification (Slower - External API Call)
  // Parse request body once for reCAPTCHA verification
  let requestBody;
  try {
    requestBody = await request.json();
  } catch (error) {
    console.error('[Verification] Error parsing request body:', {
      endpoint: config.endpoint,
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return {
      allowed: false,
      reason: 'invalid_request_body',
      statusCode: 400,
      userMessage: 'Invalid request body',
    };
  }

  if (requireRecaptcha) {
    const recaptchaToken = requestBody.recaptchaToken;

    if (!recaptchaToken) {
      console.warn('[Verification] Missing reCAPTCHA token:', {
        endpoint: config.endpoint,
      });

      return {
        allowed: false,
        reason: 'recaptcha_token_missing',
        statusCode: 400,
        userMessage: 'Security verification failed. Please try again.',
      };
    }

    // Verify token with Google API
    const recaptchaResult = await verifyRecaptchaToken(
      recaptchaToken,
      config.recaptchaAction
    );

    // Check if verification failed (not failed-open)
    if (!recaptchaResult.success && !recaptchaResult.failedOpen) {
      console.warn('[Verification] reCAPTCHA verification failed:', {
        endpoint: config.endpoint,
        action: config.recaptchaAction,
        error: recaptchaResult.error,
      });

      return {
        allowed: false,
        reason: 'recaptcha_verification_failed',
        statusCode: 400,
        userMessage:
          'Security verification failed. If you are human, please contact support.',
        recaptcha: recaptchaResult,
      };
    }

    // Check score threshold (if verification succeeded or failed-open)
    if (!recaptchaResult.failedOpen) {
      const scoreAcceptable = isScoreAcceptable(
        recaptchaResult.score,
        config.minScore
      );

      if (!scoreAcceptable) {
        console.warn('[Verification] reCAPTCHA score below threshold:', {
          endpoint: config.endpoint,
          score: recaptchaResult.score,
          minScore: config.minScore,
        });

        return {
          allowed: false,
          reason: 'recaptcha_score_too_low',
          statusCode: 403,
          userMessage:
            'Security verification failed. If you are human, please contact support.',
          recaptcha: recaptchaResult,
        };
      }
    }

    // Log successful verification
    console.log('[Verification] reCAPTCHA verification succeeded:', {
      endpoint: config.endpoint,
      score: recaptchaResult.score,
      action: recaptchaResult.action,
      failedOpen: recaptchaResult.failedOpen,
    });
  }

  // All verifications passed
  return {
    allowed: true,
    rateLimit: {
      remaining: rateLimitResult.remaining,
      resetTime: rateLimitResult.resetAt,
    },
    body: requestBody,
  };
}

/**
 * Verify a multipart form submission with CSRF and rate limiting only.
 *
 * Unlike `verifyFormSubmission`, this does NOT call `request.json()` and
 * does NOT perform reCAPTCHA verification. This allows the calling API
 * route to subsequently call `request.formData()` without a body-already-consumed error.
 *
 * Designed for file-upload endpoints (multipart/form-data) where:
 * - The body cannot be parsed as JSON
 * - reCAPTCHA is not required (e.g., private onboarding forms)
 *
 * @param request - Next.js request object
 * @param config - Partial config: only endpoint, maxRequests, windowMinutes are used
 * @returns Verification result with allow/deny decision (body will be undefined)
 */
export async function verifyMultipartSubmission(
  request: NextRequest,
  config: Pick<VerificationConfig, 'endpoint' | 'maxRequests' | 'windowMinutes'>
): Promise<VerificationResult> {
  // STEP 1: CSRF Token Verification
  const csrfToken = request.headers.get('x-csrf-token');
  const csrfCookie = request.cookies.get('csrf-token')?.value;

  if (!verifyCSRFToken(csrfToken, csrfCookie || null)) {
    console.warn('[Verification] CSRF token verification failed:', {
      endpoint: config.endpoint,
    });

    return {
      allowed: false,
      reason: 'csrf_failed',
      statusCode: 403,
      userMessage:
        'Invalid CSRF token. Please refresh the page and try again.',
    };
  }

  // STEP 2: Rate Limiting Check
  const rateLimitResult = await checkRateLimit(
    request,
    config.endpoint,
    config.maxRequests,
    config.windowMinutes
  );

  if (!rateLimitResult.allowed) {
    const resetMinutes = Math.ceil(
      (rateLimitResult.resetAt.getTime() - Date.now()) / 1000 / 60
    );

    console.warn('[Verification] Rate limit exceeded:', {
      endpoint: config.endpoint,
      requestCount: rateLimitResult.total,
      maxRequests: config.maxRequests,
    });

    return {
      allowed: false,
      reason: 'rate_limit_exceeded',
      statusCode: 429,
      userMessage: `Too many requests. Please try again in ${resetMinutes} minute${resetMinutes !== 1 ? 's' : ''}.`,
      rateLimit: {
        remaining: 0,
        resetTime: rateLimitResult.resetAt,
      },
    };
  }

  // All checks passed — body is intentionally NOT parsed
  return {
    allowed: true,
    rateLimit: {
      remaining: rateLimitResult.remaining,
      resetTime: rateLimitResult.resetAt,
    },
  };
}

/**
 * Create error response from verification result
 *
 * @param result - Verification result from verifyFormSubmission
 * @returns Next.js JSON response with appropriate status code
 *
 * Usage Example:
 * ```typescript
 * if (!verification.allowed) {
 *   return createVerificationErrorResponse(verification);
 * }
 * ```
 */
export function createVerificationErrorResponse(
  result: VerificationResult
): NextResponse {
  const response = {
    success: false,
    error: result.userMessage || 'Verification failed',
    reason: result.reason,
    ...(result.rateLimit && {
      rateLimit: {
        remaining: result.rateLimit.remaining,
        resetTime: result.rateLimit.resetTime.toISOString(),
      },
    }),
  };

  return NextResponse.json(response, {
    status: result.statusCode || 400,
  });
}
