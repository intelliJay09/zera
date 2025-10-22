/**
 * Logger utility that ensures all output goes to stderr
 * This prevents corruption of stdout which is used for JSON-RPC messages
 */
class Logger {
    debugMode;
    serverName;
    constructor(serverName = 'mav-mysql-mcp') {
        this.serverName = serverName;
        this.debugMode = process.env.MCP_DEBUG?.toLowerCase() === 'true';
    }
    formatMessage(level, message, data) {
        const entry = {
            timestamp: new Date().toISOString(),
            level,
            message,
            data
        };
        return `[${entry.timestamp}] [${this.serverName}] [${level.toUpperCase()}] ${message}${data ? ' ' + JSON.stringify(data) : ''}`;
    }
    log(level, message, data) {
        const shouldLog = level !== 'debug' || this.debugMode;
        if (shouldLog) {
            // CRITICAL: Always use stderr, never stdout
            console.error(this.formatMessage(level, message, data));
        }
    }
    debug(message, data) {
        this.log('debug', message, data);
    }
    info(message, data) {
        this.log('info', message, data);
    }
    warn(message, data) {
        this.log('warn', message, data);
    }
    error(message, error) {
        const errorData = error instanceof Error ? {
            message: error.message,
            stack: this.debugMode ? error.stack : undefined
        } : error;
        this.log('error', message, errorData);
    }
    // Special method for audit logging
    audit(action, details) {
        const auditEntry = {
            timestamp: new Date().toISOString(),
            action,
            details,
            // Include request ID if available for tracing
            requestId: global.currentRequestId
        };
        // Always log audits regardless of debug mode
        console.error(`[AUDIT] ${JSON.stringify(auditEntry)}`);
    }
}
// Export singleton instance
export const logger = new Logger();
// Export class for testing or custom instances
export { Logger };
//# sourceMappingURL=logger.js.map