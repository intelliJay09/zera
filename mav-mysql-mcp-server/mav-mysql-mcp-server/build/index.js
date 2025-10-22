#!/usr/bin/env node
import { createDatabaseManager } from './database.js';
import { MySQLMCPServer } from './server.js';
import { logger } from './logger.js';
async function main() {
    try {
        logger.info('MySQL MCP Server starting up...');
        // Load environment variables from .env if exists (generic)
        try {
            const { config } = await import('dotenv');
            config();
            logger.debug('Loaded environment variables from .env file');
        }
        catch {
            logger.debug('No .env file found, using system environment variables');
        }
        // Log configuration (hide password)
        logger.info('Server configuration', {
            MYSQL_HOST: process.env.MYSQL_HOST || 'localhost',
            MYSQL_PORT: process.env.MYSQL_PORT || '3306',
            MYSQL_USER: process.env.MYSQL_USER || 'root',
            MYSQL_DATABASE: process.env.MYSQL_DATABASE,
            ALLOW_WRITE_OPERATIONS: process.env.ALLOW_WRITE_OPERATIONS || 'false',
            MCP_DEBUG: process.env.MCP_DEBUG || 'false'
        });
        // Create database manager
        const db = createDatabaseManager();
        // Create and start MCP server
        const server = new MySQLMCPServer(db);
        await server.start();
        // Keep process alive for stdio transport
        process.stdin.resume();
    }
    catch (error) {
        logger.error('Failed to start MCP server', error);
        process.exit(1);
    }
}
// Handle uncaught errors
process.on('uncaughtException', (error) => {
    logger.error('Uncaught exception', error);
    process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled rejection', reason);
    process.exit(1);
});
// Start the server
main().catch((error) => {
    logger.error('Fatal error', error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map