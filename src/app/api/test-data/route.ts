/**
 * Test Data API
 * Checks what's saved in database
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const [rows] = await query(`
      SELECT email, main_goal, business_name
      FROM discovery_submissions
      ORDER BY updated_at DESC
      LIMIT 1
    `);

    return NextResponse.json({
      success: true,
      data: rows,
    });
  } catch (error: any) {
    console.error('Test data fetch failed:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Fetch failed',
      },
      { status: 500 }
    );
  }
}
