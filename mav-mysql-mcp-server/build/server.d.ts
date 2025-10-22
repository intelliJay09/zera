import { DatabaseManager } from './database.js';
export declare class MySQLMCPServer {
    private server;
    private db;
    constructor(db: DatabaseManager);
    private setupHandlers;
    private getTools;
    private getResources;
    private handleToolCall;
    private handleResourceRead;
    start(): Promise<void>;
}
//# sourceMappingURL=server.d.ts.map