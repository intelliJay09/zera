/**
 * Booking Token Verification Endpoint
 *
 * Validates one-time booking tokens before showing Calendly widget
 *
 * Security Checks:
 * - Token exists and matches session
 * - Payment status is 'completed'
 * - Token not already used
 * - Token not expired (24h window)
 * - Calendly event not already booked
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyBookingToken } from '@/lib/booking-token';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');
  const token = searchParams.get('token');

  if (!sessionId || !token) {
    return NextResponse.json(
      { valid: false, reason: 'Missing sessionId or token' },
      { status: 400 }
    );
  }

  try {
    const result = await verifyBookingToken(sessionId, token);

    if (!result.valid) {
      return NextResponse.json(
        { valid: false, reason: result.reason },
        { status: 403 }
      );
    }

    return NextResponse.json({
      valid: true,
      session: result.session,
    });
  } catch (error) {
    console.error('[Verify Token] Error:', error);
    return NextResponse.json(
      { valid: false, reason: 'Internal server error' },
      { status: 500 }
    );
  }
}
