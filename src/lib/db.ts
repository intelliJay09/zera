/**
 * Postgres (Neon) Database Connection
 * Handles all database interactions for the Discovery Form system
 */

import { Pool, type PoolClient } from 'pg';

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 10,
    });
  }
  return pool;
}

/**
 * Execute a query with automatic connection management
 */
export async function query<T = any>(
  sql: string,
  params?: any[]
): Promise<[T[], string[]]> {
  const result = await getPool().query(sql, params);
  return [result.rows as T[], result.fields.map((f) => f.name)];
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
 * Execute an INSERT
 */
export async function insert(
  sql: string,
  params?: any[]
): Promise<number> {
  const result = await getPool().query(sql, params);
  return result.rowCount || 0;
}

/**
 * Execute an UPDATE and return affected rows count
 */
export async function update(
  sql: string,
  params?: any[]
): Promise<number> {
  const result = await getPool().query(sql, params);
  return result.rowCount || 0;
}

/**
 * Execute a DELETE and return affected rows count
 */
export async function deleteRows(
  sql: string,
  params?: any[]
): Promise<number> {
  const result = await getPool().query(sql, params);
  return result.rowCount || 0;
}

/**
 * Transaction helper
 */
export async function transaction<T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> {
  const client = await getPool().connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
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
