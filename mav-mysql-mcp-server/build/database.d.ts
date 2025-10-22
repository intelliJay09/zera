import mysql from 'mysql2/promise';
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
export interface QueryResult {
    rows: any[];
    fields: mysql.FieldPacket[];
    affectedRows?: number;
    insertId?: number;
}
export declare class DatabaseManager {
    private pool;
    private config;
    private isConnected;
    private rateLimiter;
    private readonly BLOCKED_TABLES;
    private readonly SENSITIVE_PATTERNS;
    private readonly VALID_IDENTIFIER;
    validateIdentifier(identifier: string, type?: 'table' | 'column'): string;
    escapeIdentifier(identifier: string): string;
    safeIdentifier(identifier: string, type?: 'table' | 'column'): string;
    escapeStringValue(value: string): string;
    constructor(config: DatabaseConfig);
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    private validateQuery;
    executeQuery(query: string, params?: any[]): Promise<QueryResult>;
    getTableList(): Promise<string[]>;
    getTableSchema(tableName: string): Promise<any[]>;
    getDatabaseInfo(): Promise<any>;
    isReady(): boolean;
}
export declare function createDatabaseManager(): DatabaseManager;
//# sourceMappingURL=database.d.ts.map