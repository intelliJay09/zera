/**
 * Client-Side reCAPTCHA Token Generation
 *
 * Provides utilities for generating reCAPTCHA tokens in client components.
 * Handles script loading, readiness checking, and error handling.
 */

/**
 * Check if reCAPTCHA script is loaded and ready
 *
 * @returns true if grecaptcha.execute is available
 */
export function isRecaptchaReady(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.grecaptcha !== 'undefined' &&
    typeof window.grecaptcha.execute === 'function'
  );
}

/**
 * Execute reCAPTCHA and generate token for form submission
 *
 * @param action - Action name (must match server-side verification)
 * @returns reCAPTCHA token or null on failure
 *
 * Usage Example:
 * ```typescript
 * const recaptchaToken = await executeRecaptcha('submit_quote');
 *
 * if (!recaptchaToken) {
 *   throw new Error('Security verification failed. Please try again.');
 * }
 *
 * // Include token in API request
 * const response = await fetch('/api/submit-quote', {
 *   method: 'POST',
 *   body: JSON.stringify({
 *     ...formData,
 *     recaptchaToken,
 *   }),
 * });
 * ```
 */
export async function executeRecaptcha(
  action: string
): Promise<string | null> {
  try {
    // Check if reCAPTCHA script is loaded
    if (!isRecaptchaReady()) {
      console.error(
        '[reCAPTCHA Client] grecaptcha not loaded. Ensure reCAPTCHA script is included in layout.'
      );
      return null;
    }

    // Get site key from environment
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    if (!siteKey) {
      console.error(
        '[reCAPTCHA Client] NEXT_PUBLIC_RECAPTCHA_SITE_KEY not configured'
      );
      return null;
    }

    // Execute reCAPTCHA and generate token
    const token = await safeExecuteRecaptcha(siteKey, action);

    if (!token || token.trim().length === 0) {
      console.error('[reCAPTCHA Client] Empty token returned');
      return null;
    }

    console.log('[reCAPTCHA Client] Token generated successfully:', {
      action,
      tokenLength: token.length,
    });

    return token;
  } catch (error) {
    console.error('[reCAPTCHA Client] Error executing reCAPTCHA:', {
      action,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return null;
  }
}

/**
 * Wait for reCAPTCHA script to load
 *
 * @param timeout - Maximum wait time in milliseconds (default: 5000)
 * @returns Promise that resolves when reCAPTCHA is ready
 *
 * Usage Example:
 * ```typescript
 * await waitForRecaptcha();
 * const token = await executeRecaptcha('submit_quote');
 * ```
 */
export async function waitForRecaptcha(timeout = 5000): Promise<boolean> {
  const startTime = Date.now();

  return new Promise((resolve) => {
    const checkReady = () => {
      if (isRecaptchaReady()) {
        resolve(true);
        return;
      }

      if (Date.now() - startTime >= timeout) {
        console.error('[reCAPTCHA Client] Timeout waiting for script to load');
        resolve(false);
        return;
      }

      setTimeout(checkReady, 100);
    };

    checkReady();
  });
}

/**
 * Safe execute reCAPTCHA (handles undefined gracefully)
 */
async function safeExecuteRecaptcha(
  siteKey: string,
  action: string
): Promise<string> {
  if (!window.grecaptcha) {
    throw new Error('grecaptcha not available');
  }
  return await window.grecaptcha.execute(siteKey, { action });
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    grecaptcha?: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      ready: (callback: () => void) => void;
    };
  }
}
