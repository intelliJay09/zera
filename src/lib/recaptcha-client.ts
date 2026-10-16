/**
 * Client-Side reCAPTCHA Token Generation
 *
 * The reCAPTCHA v3 script is not loaded site-wide. It loads on demand: forms call
 * loadRecaptcha() when a visitor first focuses a field, and executeRecaptcha() waits
 * for it if a submit arrives first. Pages without a form never download it.
 */

const SCRIPT_ID = 'recaptcha-v3';
const LOAD_TIMEOUT_MS = 10000;

let loadPromise: Promise<boolean> | null = null;

function isRecaptchaReady(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.grecaptcha !== 'undefined' &&
    typeof window.grecaptcha.execute === 'function'
  );
}

/**
 * Load the reCAPTCHA v3 script once and resolve when grecaptcha is ready.
 * Safe to call repeatedly; every caller shares the same load.
 *
 * Usage: <form onFocus={() => void loadRecaptcha()}>
 */
export function loadRecaptcha(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if (isRecaptchaReady()) return Promise.resolve(true);
  if (loadPromise) return loadPromise;

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!siteKey) {
    console.error('[reCAPTCHA Client] NEXT_PUBLIC_RECAPTCHA_SITE_KEY not configured');
    return Promise.resolve(false);
  }

  loadPromise = new Promise<boolean>((resolve) => {
    const finish = (ok: boolean) => {
      clearTimeout(timer);
      if (!ok) loadPromise = null; // allow a retry on the next attempt
      resolve(ok);
    };
    const timer = setTimeout(() => {
      console.error('[reCAPTCHA Client] Timed out loading reCAPTCHA');
      finish(false);
    }, LOAD_TIMEOUT_MS);

    const onScriptLoad = () => window.grecaptcha?.ready(() => finish(true));

    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener('load', onScriptLoad, { once: true });
      if (window.grecaptcha) onScriptLoad();
      return;
    }

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.addEventListener('load', onScriptLoad, { once: true });
    script.addEventListener(
      'error',
      () => {
        console.error('[reCAPTCHA Client] Failed to load reCAPTCHA script');
        script.remove();
        finish(false);
      },
      { once: true }
    );
    document.head.appendChild(script);
  });

  return loadPromise;
}

/**
 * Execute reCAPTCHA and generate a token for form submission.
 *
 * @param action - Action name (must match server-side verification)
 * @returns reCAPTCHA token or null on failure
 */
export async function executeRecaptcha(action: string): Promise<string | null> {
  try {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) {
      console.error('[reCAPTCHA Client] NEXT_PUBLIC_RECAPTCHA_SITE_KEY not configured');
      return null;
    }

    const ready = await loadRecaptcha();
    if (!ready || !window.grecaptcha) {
      console.error('[reCAPTCHA Client] reCAPTCHA unavailable');
      return null;
    }

    const token = await window.grecaptcha.execute(siteKey, { action });
    if (!token || token.trim().length === 0) {
      console.error('[reCAPTCHA Client] Empty token returned');
      return null;
    }

    return token;
  } catch (error) {
    console.error('[reCAPTCHA Client] Error executing reCAPTCHA:', {
      action,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return null;
  }
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
