import crypto from 'crypto';

const SECRET = process.env.CSRF_SECRET || 'default-dev-secret-change-in-production';

/**
 * Generates a cryptographically secure CSRF token
 * Uses crypto.randomBytes for strong randomness
 *
 * @returns 64-character hexadecimal CSRF token
 *
 * @example
 * const token = generateCSRFToken();
 * // Returns: "a3f5b2c8d9e1f4a7b6c5d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9"
 */
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Verifies a CSRF token matches the stored token
 * Uses timing-safe comparison to prevent timing attacks
 *
 * @param token - Token from request header
 * @param storedToken - Token from cookie
 * @returns true if tokens match, false otherwise
 *
 * @example
 * const isValid = verifyCSRFToken(requestToken, cookieToken);
 * if (!isValid) {
 *   return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
 * }
 */
export function verifyCSRFToken(token: string | null, storedToken: string | null): boolean {
  if (!token || !storedToken) {
    return false;
  }

  // Ensure both tokens are the same length to prevent timing attacks
  if (token.length !== storedToken.length) {
    return false;
  }

  try {
    // Use timing-safe comparison to prevent timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(token),
      Buffer.from(storedToken)
    );
  } catch {
    // If Buffer.from fails or lengths don't match, tokens are invalid
    return false;
  }
}

/**
 * Creates a signed CSRF token that includes the secret
 * More secure than simple comparison
 *
 * @param token - The CSRF token to sign
 * @returns Signed token with HMAC signature
 */
export function signCSRFToken(token: string): string {
  const hmac = crypto.createHmac('sha256', SECRET);
  hmac.update(token);
  return `${token}.${hmac.digest('hex')}`;
}

/**
 * Verifies a signed CSRF token
 *
 * @param signedToken - The signed token to verify
 * @returns true if signature is valid, false otherwise
 */
export function verifySignedCSRFToken(signedToken: string): boolean {
  const parts = signedToken.split('.');
  if (parts.length !== 2) {
    return false;
  }

  const [token, signature] = parts;
  const hmac = crypto.createHmac('sha256', SECRET);
  hmac.update(token);
  const expectedSignature = hmac.digest('hex');

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}
