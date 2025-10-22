/**
 * Database Migration API
 * Runs pending migrations
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Run the migration to rename services to offerings
    await query(`
      ALTER TABLE discovery_submissions
      CHANGE COLUMN services_headline offerings_headline TEXT,
      CHANGE COLUMN services_list offerings_list TEXT
    `);

    return NextResponse.json({
      success: true,
      message: 'Migration completed: services → offerings',
    });
  } catch (error: any) {
    console.error('Migration failed:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Migration failed',
      },
      { status: 500 }
    );
  }
}
