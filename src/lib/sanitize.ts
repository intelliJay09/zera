import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

// Create a window instance for DOMPurify to use in Node.js environment
const window = new JSDOM('').window;
const purify = DOMPurify(window as any);

/**
 * Sanitizes user input for safe use in email templates
 * Strips all HTML tags and keeps only text content
 *
 * @param input - User-provided string to sanitize
 * @returns Sanitized string safe for email display
 *
 * @example
 * sanitizeForEmail('<script>alert("XSS")</script>Hello')
 * // Returns: 'Hello'
 */
export function sanitizeForEmail(input: string | undefined | null): string {
  if (!input) return '';

  return purify.sanitize(input, {
    ALLOWED_TAGS: [], // Strip all HTML tags
    KEEP_CONTENT: true // Keep text content
  }).trim();
}

/**
 * Sanitizes and validates URLs
 * Only allows http:// and https:// protocols
 *
 * @param url - URL string to sanitize and validate
 * @returns Sanitized URL or empty string if invalid
 *
 * @example
 * sanitizeUrl('javascript:alert("XSS")')
 * // Returns: ''
 *
 * sanitizeUrl('https://example.com')
 * // Returns: 'https://example.com'
 */
export function sanitizeUrl(url: string | undefined | null): string {
  if (!url) return '';

  try {
    const parsed = new URL(url);

    // Only allow http and https protocols
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return '';
    }

    // Sanitize and return
    return purify.sanitize(url, { ALLOWED_TAGS: [] }).trim();
  } catch {
    // Invalid URL format
    return '';
  }
}

/**
 * Sanitizes and validates email addresses
 * Strips HTML and validates against email regex
 *
 * @param email - Email address to sanitize and validate
 * @returns Sanitized email or empty string if invalid
 *
 * @example
 * sanitizeEmail('user@example.com')
 * // Returns: 'user@example.com'
 *
 * sanitizeEmail('invalid-email')
 * // Returns: ''
 */
export function sanitizeEmail(email: string | undefined | null): string {
  if (!email) return '';

  // Strip all HTML tags
  const sanitized = purify.sanitize(email, { ALLOWED_TAGS: [] }).trim();

  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(sanitized) ? sanitized : '';
}

/**
 * Sanitizes phone numbers by removing potentially dangerous characters
 * Allows: numbers, spaces, hyphens, parentheses, plus sign
 *
 * @param phone - Phone number to sanitize
 * @returns Sanitized phone number
 *
 * @example
 * sanitizePhone('+1 (555) 123-4567')
 * // Returns: '+1 (555) 123-4567'
 */
export function sanitizePhone(phone: string | undefined | null): string {
  if (!phone) return '';

  // Strip HTML first
  const cleaned = purify.sanitize(phone, { ALLOWED_TAGS: [] }).trim();

  // Only allow phone-related characters
  return cleaned.replace(/[^0-9\s\-()+ ]/g, '');
}

/**
 * Sanitizes general text input while preserving basic formatting
 * Allows paragraph tags and line breaks for formatted text
 *
 * @param input - Text to sanitize
 * @returns Sanitized text with basic formatting preserved
 */
export function sanitizeFormattedText(input: string | undefined | null): string {
  if (!input) return '';

  return purify.sanitize(input, {
    ALLOWED_TAGS: ['p', 'br'], // Only allow paragraphs and line breaks
    ALLOWED_ATTR: [] // No attributes allowed
  }).trim();
}
