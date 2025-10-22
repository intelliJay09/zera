#!/usr/bin/env node

/**
 * Database Migration Runner
 * Runs all SQL migrations in the migrations folder
 */

const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true
};

async function runMigrations() {
  let connection;

  try {
    console.log('🔌 Connecting to MariaDB...');
    connection = await mysql.createConnection(config);
    console.log('✅ Connected successfully\n');

    const migrationsDir = path.join(__dirname, 'migrations');
    const files = await fs.readdir(migrationsDir);

    // Filter and sort SQL files
    const sqlFiles = files
      .filter(file => file.endsWith('.sql'))
      .sort();

    if (sqlFiles.length === 0) {
      console.log('⚠️  No migration files found');
      return;
    }

    console.log(`📁 Found ${sqlFiles.length} migration file(s):\n`);

    for (const file of sqlFiles) {
      const filePath = path.join(migrationsDir, file);
      const sql = await fs.readFile(filePath, 'utf8');

      console.log(`   Running: ${file}...`);

      try {
        await connection.query(sql);
        console.log(`   ✅ ${file} executed successfully`);
      } catch (error) {
        console.error(`   ❌ ${file} failed:`, error.message);
        throw error;
      }
    }

    console.log('\n🎉 All migrations completed successfully!');

    // Verify tables
    console.log('\n📊 Verifying tables...');
    const [tables] = await connection.query('SHOW TABLES');
    console.log(`   Found ${tables.length} table(s):`);
    tables.forEach(table => {
      console.log(`   - ${Object.values(table)[0]}`);
    });

  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Connection closed');
    }
  }
}

// Run if called directly
if (require.main === module) {
  runMigrations();
}

module.exports = runMigrations;
