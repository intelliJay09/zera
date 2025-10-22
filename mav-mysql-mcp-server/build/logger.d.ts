/**
 * Logger utility that ensures all output goes to stderr
 * This prevents corruption of stdout which is used for JSON-RPC messages
 */
declare class Logger {
    private debugMode;
    private serverName;
    constructor(serverName?: string);
    private formatMessage;
    private log;
    debug(message: string, data?: any): void;
    info(message: string, data?: any): void;
    warn(message: string, data?: any): void;
    error(message: string, error?: Error | any): void;
    audit(action: string, details: any): void;
}
export declare const logger: Logger;
export { Logger };
//# sourceMappingURL=logger.d.ts.map