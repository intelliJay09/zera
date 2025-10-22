/**
 * Logger utility that ensures all output goes to stderr
 * This prevents corruption of stdout which is used for JSON-RPC messages
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
}

class Logger {
  private debugMode: boolean;
  private serverName: string;

  constructor(serverName: string = 'mav-mysql-mcp') {
    this.serverName = serverName;
    this.debugMode = process.env.MCP_DEBUG?.toLowerCase() === 'true';
  }

  private formatMessage(level: LogLevel, message: string, data?: any): string {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data
    };

    return `[${entry.timestamp}] [${this.serverName}] [${level.toUpperCase()}] ${message}${
      data ? ' ' + JSON.stringify(data) : ''
    }`;
  }

  private log(level: LogLevel, message: string, data?: any): void {
    const shouldLog = level !== 'debug' || this.debugMode;
    
    if (shouldLog) {
      // CRITICAL: Always use stderr, never stdout
      console.error(this.formatMessage(level, message, data));
    }
  }

  debug(message: string, data?: any): void {
    this.log('debug', message, data);
  }

  info(message: string, data?: any): void {
    this.log('info', message, data);
  }

  warn(message: string, data?: any): void {
    this.log('warn', message, data);
  }

  error(message: string, error?: Error | any): void {
    const errorData = error instanceof Error ? {
      message: error.message,
      stack: this.debugMode ? error.stack : undefined
    } : error;
    
    this.log('error', message, errorData);
  }

  // Special method for audit logging
  audit(action: string, details: any): void {
    const auditEntry = {
      timestamp: new Date().toISOString(),
      action,
      details,
      // Include request ID if available for tracing
      requestId: (global as any).currentRequestId
    };
    
    // Always log audits regardless of debug mode
    console.error(`[AUDIT] ${JSON.stringify(auditEntry)}`);
  }
}

// Export singleton instance
export const logger = new Logger();

// Export class for testing or custom instances
export { Logger };