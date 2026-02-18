#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });
const mysql = require('mysql2/promise');

async function debugRecentBooking() {
  const connection = await mysql.createConnection({
    socketPath: '/tmp/mysql.sock',
    user: process.env.DB_USER || 'jacqueline',
    database: process.env.DB_NAME || 'zera',
  });

  try {
    // Get most recent session
    const [rows] = await connection.query(`
      SELECT
        id,
        full_name,
        business_email,
        company_name,
        payment_status,
        calendly_status,
        calendly_scheduled_at,
        calendar_confirmation_email_sent,
        calendar_confirmation_email_sent_at,
        created_at,
        paid_at
      FROM strategy_sessions
      ORDER BY created_at DESC
      LIMIT 3
    `);

    console.log('\n=== Most Recent Strategy Sessions ===\n');
    rows.forEach((row, i) => {
      console.log(`\n--- Session ${i + 1} ---`);
      console.log(`ID: ${row.id}`);
      console.log(`Name: ${row.full_name}`);
      console.log(`Email: ${row.business_email}`);
      console.log(`Company: ${row.company_name}`);
      console.log(`Payment Status: ${row.payment_status}`);
      console.log(`Calendly Status: ${row.calendly_status}`);
      console.log(`Calendly Scheduled At: ${row.calendly_scheduled_at}`);
      console.log(`Confirmation Email Sent: ${row.calendar_confirmation_email_sent}`);
      console.log(`Email Sent At: ${row.calendar_confirmation_email_sent_at}`);
      console.log(`Created At: ${row.created_at}`);
      console.log(`Paid At: ${row.paid_at}`);
    });

    // Check for bookings without confirmation email
    const [noEmail] = await connection.query(`
      SELECT COUNT(*) as count
      FROM strategy_sessions
      WHERE calendly_status = 'booked'
        AND calendar_confirmation_email_sent = FALSE
    `);

    console.log(`\n\n⚠️  Booked sessions without confirmation email: ${noEmail[0].count}`);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await connection.end();
  }
}

debugRecentBooking();
