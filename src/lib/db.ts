/**
 * MariaDB Database Connection
 * Handles all database interactions for the Discovery Form system
 */

import mysql from 'mysql2/promise';

// Connection pool configuration
const poolConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

// Create connection pool
let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool(poolConfig);
  }
  return pool;
}

/**
 * Execute a query with automatic connection management
 */
export async function query<T = any>(
  sql: string,
  params?: any[]
): Promise<[T[], mysql.FieldPacket[]]> {
  const connection = await getPool().getConnection();
  try {
    const result = await connection.query(sql, params);
    return result as [T[], mysql.FieldPacket[]];
  } finally {
    connection.release();
  }
}

/**
 * Execute a query and return only the first row
 */
export async function queryOne<T = any>(
  sql: string,
  params?: any[]
): Promise<T | null> {
  const [rows] = await query<T>(sql, params);
  return rows.length > 0 ? rows[0] : null;
}

/**
 * Execute an INSERT and return the inserted ID
 */
export async function insert(
  sql: string,
  params?: any[]
): Promise<string> {
  const connection = await getPool().getConnection();
  try {
    const [result] = await connection.query(sql, params);
    return (result as any).insertId || (result as any).affectedRows;
  } finally {
    connection.release();
  }
}

/**
 * Execute an UPDATE and return affected rows count
 */
export async function update(
  sql: string,
  params?: any[]
): Promise<number> {
  const connection = await getPool().getConnection();
  try {
    const [result] = await connection.query(sql, params);
    return (result as any).affectedRows || 0;
  } finally {
    connection.release();
  }
}

/**
 * Execute a DELETE and return affected rows count
 */
export async function deleteRows(
  sql: string,
  params?: any[]
): Promise<number> {
  const connection = await getPool().getConnection();
  try {
    const [result] = await connection.query(sql, params);
    return (result as any).affectedRows || 0;
  } finally {
    connection.release();
  }
}

/**
 * Transaction helper
 */
export async function transaction<T>(
  callback: (connection: mysql.PoolConnection) => Promise<T>
): Promise<T> {
  const connection = await getPool().getConnection();
  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

/**
 * Test database connection
 */
export async function testConnection(): Promise<boolean> {
  try {
    const [rows] = await query('SELECT 1 as test');
    return rows.length > 0;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
}

/**
 * Close all connections in the pool
 */
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

// Ensure pool is closed on process exit
if (typeof process !== 'undefined') {
  process.on('beforeExit', () => {
    closePool();
  });
}
