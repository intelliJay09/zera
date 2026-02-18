/**
 * ZERA Strategy Session - Verify Session Endpoint
 *
 * Used by success page to fetch session details after payment
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId) {
    return NextResponse.json(
      { error: 'Missing sessionId parameter' },
      { status: 400 }
    );
  }

  try {
    const sessionResult = await query(
      `SELECT
        id,
        full_name,
        business_email,
        company_name,
        payment_reference,
        payment_amount,
        payment_currency,
        payment_status,
        paid_at,
        booking_stage
       FROM strategy_sessions
       WHERE id = ?
       LIMIT 1`,
      [sessionId]
    );

    if (!sessionResult || !sessionResult[0] || (sessionResult[0] as any).length === 0) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    const session = (sessionResult[0] as any)[0];

    // Verify payment is completed
    if (session.payment_status !== 'completed') {
      return NextResponse.json(
        {
          error: 'Payment not completed',
          status: session.payment_status,
        },
        { status: 402 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        session: {
          id: session.id,
          full_name: session.full_name,
          business_email: session.business_email,
          company_name: session.company_name,
          payment_reference: session.payment_reference,
          payment_amount: parseFloat(session.payment_amount) || 0,
          payment_currency: session.payment_currency,
          paid_at: session.paid_at,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Session verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify session' },
      { status: 500 }
    );
  }
}
