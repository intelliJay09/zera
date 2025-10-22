/**
 * Verify Database Schema API
 * Checks table structure
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const [columns] = await query(`
      SHOW COLUMNS FROM discovery_submissions
      WHERE Field LIKE '%offering%' OR Field LIKE '%service%'
    `);

    return NextResponse.json({
      success: true,
      columns,
    });
  } catch (error: any) {
    console.error('Schema verification failed:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Verification failed',
      },
      { status: 500 }
    );
  }
}
