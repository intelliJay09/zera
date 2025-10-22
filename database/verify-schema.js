require('dotenv').config({ path: '.env.local' });
const mysql = require('mysql2/promise');

async function verifySchema() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  console.log('\n📊 Verifying Database Schema\n');
  
  // Get all tables
  const [tables] = await connection.query('SHOW TABLES');
  console.log('✅ Tables found:', tables.length);
  tables.forEach(t => console.log('   -', Object.values(t)[0]));
  
  // Check checkout_submissions structure
  console.log('\n📋 checkout_submissions columns:');
  const [checkoutCols] = await connection.query('DESCRIBE checkout_submissions');
  console.log('   Total columns:', checkoutCols.length);
  
  // Check discovery_submissions structure
  console.log('\n📋 discovery_submissions columns:');
  const [discoveryCols] = await connection.query('DESCRIBE discovery_submissions');
  console.log('   Total columns:', discoveryCols.length);
  
  // Check uploaded_files structure
  console.log('\n📋 uploaded_files columns:');
  const [filesCols] = await connection.query('DESCRIBE uploaded_files');
  console.log('   Total columns:', filesCols.length);
  
  await connection.end();
  console.log('\n✅ Schema verification complete!');
}

verifySchema().catch(console.error);
