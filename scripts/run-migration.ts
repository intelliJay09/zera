/**
 * Migration runner script
 * Executes SQL migration files
 */

import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

async function runMigration() {
  try {
    // Direct connection using hardcoded credentials from .env.local
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'astraflow',
      password: '&VzL0I^@Yn9L',
      database: 'astraflow',
    });

    const migrationPath = path.join(
      __dirname,
      '../database/migrations/006_rename_services_to_offerings.sql'
    );

    const sql = fs.readFileSync(migrationPath, 'utf-8');

    console.log('Running migration: 006_rename_services_to_offerings.sql');
    await connection.query(sql);
    console.log('✅ Migration completed successfully');

    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
