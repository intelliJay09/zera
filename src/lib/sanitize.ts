/**
 * Server-side input sanitization utilities
 * Uses regex-based approach (no jsdom/DOMPurify) for serverless compatibility
 */

/**
 * Strips all HTML tags from a string, keeping only text content
 */
function stripHtml(input: string): string {
  return input
    .replace(/<[^>]*>/g, '') // Remove all HTML tags
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
    .replace(/&nbsp;/g, ' ');
}

export function sanitizeForEmail(input: string | undefined | null): string {
  if (!input) return '';
  return stripHtml(input).trim();
}

export function sanitizeUrl(url: string | undefined | null): string {
  if (!url) return '';

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return '';
    }
    return stripHtml(url).trim();
  } catch {
    return '';
  }
}

export function sanitizeEmail(email: string | undefined | null): string {
  if (!email) return '';

  const sanitized = stripHtml(email).trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(sanitized) ? sanitized : '';
}

export function sanitizePhone(phone: string | undefined | null): string {
  if (!phone) return '';
  const cleaned = stripHtml(phone).trim();
  return cleaned.replace(/[^0-9\s\-()+]/g, '');
}

export function sanitizeFormattedText(input: string | undefined | null): string {
  if (!input) return '';
  // Allow only p and br tags, strip everything else
  return input
    .replace(/<(?!\/?(?:p|br)(?:\s[^>]*)?>)[^>]*>/gi, '')
    .trim();
}
