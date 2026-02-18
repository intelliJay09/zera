/**
 * Google reCAPTCHA v3 Server-Side Verification Utility
 *
 * Provides fail-open reCAPTCHA verification with comprehensive error handling.
 * Designed to enhance security without compromising user experience.
 *
 * Philosophy:
 * - Fail-open: Allow requests when reCAPTCHA API is unavailable
 * - Fast timeout: 5 seconds to prevent blocking users
 * - Action verification: Prevent token reuse across different forms
 * - Comprehensive logging: Monitor scores and failures for tuning
 */

interface RecaptchaVerifyResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

export interface RecaptchaVerificationResult {
  success: boolean;
  score: number;
  action: string;
  failedOpen: boolean;
  error?: string;
}

/**
 * Verify reCAPTCHA token with Google API
 *
 * @param token - reCAPTCHA token from client
 * @param expectedAction - Expected action name to prevent token reuse
 * @returns Verification result with score and metadata
 *
 * Error Handling (Fail-Open):
 * - Network errors → Allow request, log warning
 * - Timeout → Allow request, log timeout
 * - Invalid response → Allow request, log error
 * - Only block: Valid response with low score
 */
export async function verifyRecaptchaToken(
  token: string,
  expectedAction: string
): Promise<RecaptchaVerificationResult> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  // Environment validation
  if (!secretKey) {
    console.error('[reCAPTCHA] RECAPTCHA_SECRET_KEY not configured');
    return {
      success: true,
      score: 0,
      action: expectedAction,
      failedOpen: true,
      error: 'reCAPTCHA not configured',
    };
  }

  if (!token || token.trim().length === 0) {
    console.warn('[reCAPTCHA] No token provided');
    return {
      success: false,
      score: 0,
      action: expectedAction,
      failedOpen: false,
      error: 'No reCAPTCHA token provided',
    };
  }

  try {
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    // Verify with Google API
    const response = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret: secretKey,
          response: token,
        }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    // Parse response
    const data: RecaptchaVerifyResponse = await response.json();

    // Log verification result
    console.log('[reCAPTCHA] Verification result:', {
      success: data.success,
      score: data.score,
      action: data.action,
      expectedAction,
      hostname: data.hostname,
      errorCodes: data['error-codes'],
    });

    // Handle Google API errors
    if (!data.success) {
      console.warn('[reCAPTCHA] Verification failed:', {
        errorCodes: data['error-codes'],
        expectedAction,
      });

      // Fail-open on API errors (Google may be having issues)
      return {
        success: true,
        score: 0,
        action: expectedAction,
        failedOpen: true,
        error: `reCAPTCHA API error: ${data['error-codes']?.join(', ')}`,
      };
    }

    // Verify action matches expected
    if (data.action !== expectedAction) {
      console.warn('[reCAPTCHA] Action mismatch:', {
        expected: expectedAction,
        received: data.action,
      });

      return {
        success: false,
        score: data.score || 0,
        action: data.action || 'unknown',
        failedOpen: false,
        error: 'reCAPTCHA action mismatch',
      };
    }

    // Success - return score for threshold checking
    return {
      success: true,
      score: data.score || 0,
      action: data.action,
      failedOpen: false,
    };
  } catch (error) {
    // Handle network errors, timeouts, etc.
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('[reCAPTCHA] Verification timeout (5s)');
        return {
          success: true,
          score: 0,
          action: expectedAction,
          failedOpen: true,
          error: 'reCAPTCHA verification timeout',
        };
      }

      console.error('[reCAPTCHA] Verification error:', error.message);
      return {
        success: true,
        score: 0,
        action: expectedAction,
        failedOpen: true,
        error: `reCAPTCHA verification failed: ${error.message}`,
      };
    }

    // Unknown error type
    console.error('[reCAPTCHA] Unknown verification error:', error);
    return {
      success: true,
      score: 0,
      action: expectedAction,
      failedOpen: true,
      error: 'Unknown reCAPTCHA error',
    };
  }
}

/**
 * Check if reCAPTCHA score meets minimum threshold
 *
 * @param score - reCAPTCHA score (0.0 - 1.0)
 * @param minScore - Minimum acceptable score (default: 0.5)
 * @returns true if score is acceptable
 *
 * Score Interpretation:
 * - 0.9 - 1.0: Very likely human
 * - 0.7 - 0.9: Likely human
 * - 0.5 - 0.7: Neutral (default threshold)
 * - 0.3 - 0.5: Likely bot
 * - 0.0 - 0.3: Very likely bot
 */
export function isScoreAcceptable(
  score: number,
  minScore?: number
): boolean {
  const threshold =
    minScore ?? parseFloat(process.env.RECAPTCHA_MIN_SCORE || '0.5');

  const acceptable = score >= threshold;

  if (!acceptable) {
    console.warn('[reCAPTCHA] Score below threshold:', {
      score,
      threshold,
      difference: threshold - score,
    });
  }

  return acceptable;
}

/**
 * Get human-readable description of reCAPTCHA score
 *
 * @param score - reCAPTCHA score (0.0 - 1.0)
 * @returns Human-readable description
 */
export function getScoreDescription(score: number): string {
  if (score >= 0.9) return 'Very likely human';
  if (score >= 0.7) return 'Likely human';
  if (score >= 0.5) return 'Neutral';
  if (score >= 0.3) return 'Likely bot';
  return 'Very likely bot';
}

/**
 * Check if reCAPTCHA is enabled
 *
 * Allows for feature flag control
 *
 * @returns true if reCAPTCHA is enabled
 */
export function isRecaptchaEnabled(): boolean {
  return process.env.RECAPTCHA_ENABLED !== 'false';
}
