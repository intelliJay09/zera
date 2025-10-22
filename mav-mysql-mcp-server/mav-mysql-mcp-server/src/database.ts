import mysql from 'mysql2/promise';
import { logger } from './logger.js';

export interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  connectionLimit?: number;
  queryTimeout?: number;
  maxResults?: number;
  allowWrite?: boolean;
  rateLimit?: {
    maxQueriesPerMinute?: number;
    maxQueriesPerHour?: number;
    maxConcurrentQueries?: number;
  };
}

// Simple rate limiter implementation
class RateLimiter {
  private queryTimestamps: number[] = [];
  private currentConcurrent: number = 0;
  private readonly maxPerMinute: number;
  private readonly maxPerHour: number;
  private readonly maxConcurrent: number;
  
  constructor(config: { maxPerMinute: number; maxPerHour: number; maxConcurrent: number }) {
    this.maxPerMinute = config.maxPerMinute;
    this.maxPerHour = config.maxPerHour;
    this.maxConcurrent = config.maxConcurrent;
  }
  
  async checkLimit(): Promise<void> {
    const now = Date.now();
    const oneMinuteAgo = now - 60 * 1000;
    const oneHourAgo = now - 60 * 60 * 1000;
    
    // Clean old timestamps
    this.queryTimestamps = this.queryTimestamps.filter(ts => ts > oneHourAgo);
    
    // Count queries in time windows
    const queriesInLastMinute = this.queryTimestamps.filter(ts => ts > oneMinuteAgo).length;
    const queriesInLastHour = this.queryTimestamps.length;
    
    // Check rate limits
    if (queriesInLastMinute >= this.maxPerMinute) {
      throw new Error(`Rate limit exceeded: ${this.maxPerMinute} queries per minute`);
    }
    
    if (queriesInLastHour >= this.maxPerHour) {
      throw new Error(`Rate limit exceeded: ${this.maxPerHour} queries per hour`);
    }
    
    if (this.currentConcurrent >= this.maxConcurrent) {
      throw new Error(`Concurrent query limit exceeded: ${this.maxConcurrent} concurrent queries`);
    }
    
    // Record this query
    this.queryTimestamps.push(now);
    this.currentConcurrent++;
  }
  
  releaseQuery(): void {
    this.currentConcurrent = Math.max(0, this.currentConcurrent - 1);
  }
  
  getStats() {
    const now = Date.now();
    const oneMinuteAgo = now - 60 * 1000;
    const queriesInLastMinute = this.queryTimestamps.filter(ts => ts > oneMinuteAgo).length;
    
    return {
      queriesInLastMinute,
      queriesInLastHour: this.queryTimestamps.length,
      currentConcurrent: this.currentConcurrent
    };
  }
}

export interface QueryResult {
  rows: any[];
  fields: mysql.FieldPacket[];
  affectedRows?: number;
  insertId?: number;
}

export class DatabaseManager {
  private pool: mysql.Pool | null = null;
  private config: DatabaseConfig;
  private isConnected: boolean = false;
  private rateLimiter: RateLimiter | null = null;
  
  // Security: Tables that should never be accessible
  private readonly BLOCKED_TABLES = [
    'mysql.user',
    'information_schema.user_privileges',
    'performance_schema.users',
    'sys.user_summary'
  ];
  
  // Security: Patterns that might indicate sensitive tables
  private readonly SENSITIVE_PATTERNS = [
    /password/i,
    /token/i,
    /secret/i,
    /api_key/i,
    /private_key/i,
    /credit_card/i,
    /ssn/i
  ];
  
  // Security: Valid identifier pattern (alphanumeric, underscore, max 64 chars)
  private readonly VALID_IDENTIFIER = /^[a-zA-Z_][a-zA-Z0-9_]{0,63}$/;
  
  // Validate and escape MySQL identifiers (table/column names)
  validateIdentifier(identifier: string, type: 'table' | 'column' = 'table'): string {
    if (!identifier || identifier.length === 0) {
      throw new Error(`Invalid ${type} name: cannot be empty`);
    }
    
    if (identifier.length > 64) {
      throw new Error(`Invalid ${type} name: exceeds 64 character limit`);
    }
    
    if (!this.VALID_IDENTIFIER.test(identifier)) {
      throw new Error(`Invalid ${type} name: contains invalid characters or starts with a number`);
    }
    
    // Additional check for reserved words could be added here
    
    return identifier;
  }
  
  // Escape identifier for use in SQL
  escapeIdentifier(identifier: string): string {
    // After validation, escape by doubling backticks (though none should exist after validation)
    return '`' + identifier.replace(/`/g, '``') + '`';
  }
  
  // Safe identifier helper that validates and escapes in one call
  safeIdentifier(identifier: string, type: 'table' | 'column' = 'table'): string {
    return this.escapeIdentifier(this.validateIdentifier(identifier, type));
  }
  
  // Escape string values for SQL (doubles quotes)
  escapeStringValue(value: string): string {
    return value.replace(/'/g, "''");
  }

  constructor(config: DatabaseConfig) {
    this.config = {
      connectionLimit: 5,
      queryTimeout: 30000,
      maxResults: 1000,
      allowWrite: false,
      rateLimit: {
        maxQueriesPerMinute: 60,
        maxQueriesPerHour: 1000,
        maxConcurrentQueries: 10
      },
      ...config
    };
    
    // Merge rate limit config
    if (config.rateLimit) {
      this.config.rateLimit = {
        ...this.config.rateLimit,
        ...config.rateLimit
      };
    }
    
    // Initialize rate limiter
    this.rateLimiter = new RateLimiter({
      maxPerMinute: this.config.rateLimit!.maxQueriesPerMinute!,
      maxPerHour: this.config.rateLimit!.maxQueriesPerHour!,
      maxConcurrent: this.config.rateLimit!.maxConcurrentQueries!
    });
    
    logger.info('Database manager initialized', {
      host: this.config.host,
      port: this.config.port,
      database: this.config.database,
      user: this.config.user,
      allowWrite: this.config.allowWrite,
      rateLimit: this.config.rateLimit
    });
  }

  async connect(): Promise<void> {
    try {
      logger.info('Connecting to MySQL database...');
      
      this.pool = mysql.createPool({
        host: this.config.host,
        port: this.config.port,
        user: this.config.user,
        password: this.config.password,
        database: this.config.database,
        waitForConnections: true,
        connectionLimit: this.config.connectionLimit,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0
      });

      // Test connection
      const connection = await this.pool.getConnection();
      await connection.ping();
      connection.release();
      
      this.isConnected = true;
      logger.info('Successfully connected to MySQL database');
    } catch (error) {
      logger.error('Failed to connect to MySQL database', error);
      throw new Error(`Database connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async disconnect(): Promise<void> {
    if (this.pool) {
      logger.info('Closing database connection pool...');
      await this.pool.end();
      this.pool = null;
      this.isConnected = false;
      logger.info('Database connection pool closed');
    }
  }

  private validateQuery(query: string): void {
    const normalizedQuery = query.toLowerCase();
    
    // Security: Check for blocked tables
    for (const blockedTable of this.BLOCKED_TABLES) {
      if (normalizedQuery.includes(blockedTable.toLowerCase())) {
        logger.warn('Attempted access to blocked table', { table: blockedTable });
        throw new Error(`Access to table ${blockedTable} is not allowed`);
      }
    }
    
    // Security: Check for sensitive table patterns
    for (const pattern of this.SENSITIVE_PATTERNS) {
      if (pattern.test(normalizedQuery)) {
        logger.warn('Query contains sensitive pattern', { pattern: pattern.toString() });
        // Log warning but don't block - let admin decide
      }
    }
    
    // Check for write operations
    const writePatterns = /^\s*(INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|TRUNCATE|REPLACE|CALL|EXEC|EXECUTE)\s/i;
    const filePatterns = /(INTO\s+OUTFILE|LOAD\s+DATA|LOAD_FILE)/i;
    const permissionPatterns = /(GRANT|REVOKE|SET\s+PASSWORD|CREATE\s+USER|DROP\s+USER|RENAME\s+USER)/i;
    
    if (!this.config.allowWrite) {
      // Block write operations in read-only mode
      if (writePatterns.test(query)) {
        throw new Error('Write operations are not allowed in read-only mode');
      }
      
      if (filePatterns.test(query)) {
        throw new Error('File operations are not allowed');
      }
      
      if (permissionPatterns.test(query)) {
        throw new Error('Permission modifications are not allowed');
      }
    } else {
      // Log write operations when allowed
      if (writePatterns.test(query)) {
        logger.warn('WRITE OPERATION DETECTED', { 
          query: query.substring(0, 100),
          type: 'write_operation'
        });
        logger.audit('WRITE_OPERATION', {
          query: query.substring(0, 200),
          user: this.config.user,
          database: this.config.database
        });
      }
      
      // Still block dangerous operations even in write mode
      if (permissionPatterns.test(query)) {
        logger.error('Attempted permission modification', { query: query.substring(0, 100) });
        throw new Error('Permission modifications are not allowed for safety');
      }
    }
  }

  async executeQuery(query: string, params?: any[]): Promise<QueryResult> {
    if (!this.pool || !this.isConnected) {
      throw new Error('Database not connected');
    }

    // Check rate limit before executing
    if (this.rateLimiter) {
      try {
        await this.rateLimiter.checkLimit();
      } catch (error) {
        logger.warn('Rate limit exceeded', { 
          error: error instanceof Error ? error.message : String(error),
          stats: this.rateLimiter.getStats()
        });
        throw error;
      }
    }

    try {
      logger.debug('Executing query', { query, params });
      
      // Validate query
      this.validateQuery(query);
      
      // Audit log the query
      logger.audit('QUERY_EXECUTE', {
        query: query.substring(0, 200), // Truncate long queries
        user: this.config.user,
        database: this.config.database,
        hasParams: !!params && params.length > 0
      });

      // Execute with timeout
      const connection = await this.pool.getConnection();
      
      try {
        // Set query timeout
        await connection.query(`SET SESSION MAX_EXECUTION_TIME=${this.config.queryTimeout}`);
        
        const [queryResult, fields] = await connection.execute(query, params);
        
        // Handle different query result types
        let resultRows: any[] = [];
        let affectedRows = 0;
        let insertId = 0;
        
        if (Array.isArray(queryResult)) {
          resultRows = queryResult;
        } else if (queryResult && typeof queryResult === 'object' && 'affectedRows' in queryResult) {
          // This is a ResultSetHeader (for INSERT, UPDATE, DELETE)
          affectedRows = queryResult.affectedRows;
          insertId = (queryResult as any).insertId || 0;
        }
        
        // Limit results if needed
        if (resultRows.length > this.config.maxResults!) {
          logger.warn(`Query returned ${resultRows.length} rows, limiting to ${this.config.maxResults}`);
          resultRows = resultRows.slice(0, this.config.maxResults);
        }

        logger.debug('Query executed successfully', { rowCount: resultRows.length });
        
        return {
          rows: resultRows,
          fields: fields as mysql.FieldPacket[],
          affectedRows,
          insertId
        };
      } finally {
        connection.release();
      }
    } catch (error) {
      logger.error('Query execution failed', error);
      throw new Error(`Query failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      // Release the concurrent query count
      if (this.rateLimiter) {
        this.rateLimiter.releaseQuery();
      }
    }
  }

  async getTableList(): Promise<string[]> {
    const result = await this.executeQuery('SHOW TABLES');
    const dbName = this.config.database;
    return result.rows.map(row => row[`Tables_in_${dbName}`]);
  }

  async getTableSchema(tableName: string): Promise<any[]> {
    // Validate table name before using it
    const validTableName = this.validateIdentifier(tableName, 'table');
    const result = await this.executeQuery(`DESCRIBE ${this.safeIdentifier(tableName, 'table')}`);
    return result.rows;
  }

  async getDatabaseInfo(): Promise<any> {
    const [tables, size, version] = await Promise.all([
      this.getTableList(),
      this.executeQuery(`
        SELECT 
          SUM(data_length + index_length) / 1024 / 1024 AS size_mb
        FROM information_schema.TABLES 
        WHERE table_schema = ?
      `, [this.config.database]),
      this.executeQuery('SELECT VERSION() as version')
    ]);

    return {
      database: this.config.database,
      tables: tables.length,
      size_mb: size.rows[0]?.size_mb || 0,
      version: version.rows[0]?.version || 'Unknown',
      connection: {
        host: this.config.host,
        port: this.config.port,
        user: this.config.user
      }
    };
  }

  isReady(): boolean {
    return this.isConnected && this.pool !== null;
  }
}

// Factory function to create database manager from environment
export function createDatabaseManager(): DatabaseManager {
  const config: DatabaseConfig = {
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || '',
    connectionLimit: parseInt(process.env.CONNECTION_LIMIT || '5'),
    queryTimeout: parseInt(process.env.QUERY_TIMEOUT || '30000'),
    maxResults: parseInt(process.env.MAX_RESULTS || '1000'),
    allowWrite: process.env.ALLOW_WRITE_OPERATIONS === 'true',
    rateLimit: {
      maxQueriesPerMinute: parseInt(process.env.RATE_LIMIT_PER_MINUTE || '60'),
      maxQueriesPerHour: parseInt(process.env.RATE_LIMIT_PER_HOUR || '1000'),
      maxConcurrentQueries: parseInt(process.env.RATE_LIMIT_CONCURRENT || '10')
    }
  };

  if (!config.database) {
    throw new Error('MYSQL_DATABASE environment variable is required');
  }

  return new DatabaseManager(config);
}