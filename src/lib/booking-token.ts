/**
 * Booking Token System
 *
 * Cryptographically secure, single-use, time-limited tokens
 * for securing Calendly booking flow after payment
 *
 * Security Features:
 * - 256-bit entropy (64-char hex string)
 * - Single-use enforcement via database
 * - 24-hour expiration window
 * - Payment status validation
 * - Booking status validation
 */

import crypto from 'crypto';
import { query } from './db';

/**
 * Generate cryptographically secure booking token
 * Format: 64-character hex string (256-bit entropy)
 */
export function generateBookingToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Create and save booking token for session
 * Token expires in 24 hours
 */
export async function createBookingToken(sessionId: string): Promise<string> {
  const token = generateBookingToken();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  await query(
    `UPDATE strategy_sessions
     SET booking_token = ?,
         booking_token_expires_at = ?
     WHERE id = ?`,
    [token, expiresAt, sessionId]
  );

  return token;
}

/**
 * Verify booking token is valid
 * Returns session data if valid, error details if invalid
 */
export async function verifyBookingToken(
  sessionId: string,
  token: string
): Promise<{
  valid: boolean;
  session?: any;
  reason?: string;
}> {
  const [rows] = await query(
    `SELECT id, payment_status, booking_token, booking_token_used,
            booking_token_expires_at, calendly_event_booked,
            full_name, business_email, company_name, payment_reference,
            payment_amount, payment_currency, paid_at
     FROM strategy_sessions
     WHERE id = ? AND booking_token = ?
     LIMIT 1`,
    [sessionId, token]
  );

  if (!rows || rows.length === 0) {
    return { valid: false, reason: 'Invalid token or session not found' };
  }

  const session = rows[0] as any;

  // Check payment status
  if (session.payment_status !== 'completed') {
    return { valid: false, reason: 'Payment not completed' };
  }

  // Check if token already used
  if (session.booking_token_used) {
    return { valid: false, reason: 'Booking token already used' };
  }

  // Check if already booked
  if (session.calendly_event_booked) {
    return { valid: false, reason: 'Calendly event already booked' };
  }

  // Check if token expired
  const expiresAt = new Date(session.booking_token_expires_at);
  if (expiresAt < new Date()) {
    return { valid: false, reason: 'Booking token expired' };
  }

  return { valid: true, session };
}

/**
 * Mark booking token as used
 * Called when Calendly event is scheduled
 */
export async function markTokenAsUsed(
  sessionId: string,
  token: string
): Promise<void> {
  await query(
    `UPDATE strategy_sessions
     SET booking_token_used = TRUE,
         calendly_event_booked = TRUE,
         calendly_event_booked_at = NOW()
     WHERE id = ? AND booking_token = ?`,
    [sessionId, token]
  );
}
