import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, ListResourcesRequestSchema, ReadResourceRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { logger } from './logger.js';
export class MySQLMCPServer {
    server;
    db;
    constructor(db) {
        this.db = db;
        this.server = new Server({
            name: 'mav-mysql-mcp-server',
            version: '1.0.0'
        }, {
            capabilities: {
                tools: {},
                resources: {}
            }
        });
        this.setupHandlers();
    }
    setupHandlers() {
        // Tool handlers
        this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
            tools: this.getTools()
        }));
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => this.handleToolCall(request.params.name, request.params.arguments || {}));
        // Resource handlers
        this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
            resources: await this.getResources()
        }));
        this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => this.handleResourceRead(request.params.uri));
    }
    getTools() {
        const tools = [
            {
                name: 'query',
                description: 'Execute a read-only SQL query on the database',
                inputSchema: {
                    type: 'object',
                    properties: {
                        sql: {
                            type: 'string',
                            description: 'The SQL query to execute'
                        },
                        params: {
                            type: 'array',
                            description: 'Optional query parameters for prepared statements',
                            items: {
                                type: ['string', 'number', 'boolean', 'null']
                            }
                        }
                    },
                    required: ['sql']
                }
            },
            {
                name: 'list_tables',
                description: 'List all tables in the database',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            },
            {
                name: 'describe_table',
                description: 'Get the schema of a specific table',
                inputSchema: {
                    type: 'object',
                    properties: {
                        table: {
                            type: 'string',
                            description: 'The name of the table to describe'
                        }
                    },
                    required: ['table']
                }
            },
            {
                name: 'database_info',
                description: 'Get general information about the database',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            }
        ];
        // Add write operation tools if enabled
        if (process.env.ALLOW_WRITE_OPERATIONS === 'true') {
            tools.push({
                name: 'insert',
                description: 'Insert data into a table',
                inputSchema: {
                    type: 'object',
                    properties: {
                        table: {
                            type: 'string',
                            description: 'The name of the table to insert into'
                        },
                        data: {
                            type: 'object',
                            description: 'Key-value pairs of column names and values to insert',
                            additionalProperties: true
                        }
                    },
                    required: ['table', 'data']
                }
            }, {
                name: 'update',
                description: 'Update data in a table',
                inputSchema: {
                    type: 'object',
                    properties: {
                        table: {
                            type: 'string',
                            description: 'The name of the table to update'
                        },
                        data: {
                            type: 'object',
                            description: 'Key-value pairs of column names and values to update',
                            additionalProperties: true
                        },
                        where: {
                            type: 'object',
                            description: 'Key-value pairs for WHERE clause conditions',
                            additionalProperties: true
                        }
                    },
                    required: ['table', 'data', 'where']
                }
            }, {
                name: 'delete',
                description: 'Delete data from a table',
                inputSchema: {
                    type: 'object',
                    properties: {
                        table: {
                            type: 'string',
                            description: 'The name of the table to delete from'
                        },
                        where: {
                            type: 'object',
                            description: 'Key-value pairs for WHERE clause conditions',
                            additionalProperties: true
                        }
                    },
                    required: ['table', 'where']
                }
            }, {
                name: 'create_table',
                description: 'Create a new table',
                inputSchema: {
                    type: 'object',
                    properties: {
                        table: {
                            type: 'string',
                            description: 'The name of the table to create'
                        },
                        columns: {
                            type: 'array',
                            description: 'Array of column definitions',
                            items: {
                                type: 'object',
                                properties: {
                                    name: {
                                        type: 'string',
                                        description: 'Column name'
                                    },
                                    type: {
                                        type: 'string',
                                        description: 'Column data type (e.g., VARCHAR(255), INT, TEXT)'
                                    },
                                    nullable: {
                                        type: 'boolean',
                                        description: 'Whether the column can be NULL',
                                        default: true
                                    },
                                    primary: {
                                        type: 'boolean',
                                        description: 'Whether this column is a primary key',
                                        default: false
                                    },
                                    autoIncrement: {
                                        type: 'boolean',
                                        description: 'Whether this column auto-increments',
                                        default: false
                                    },
                                    default: {
                                        type: ['string', 'number', 'boolean', 'null'],
                                        description: 'Default value for the column'
                                    }
                                },
                                required: ['name', 'type']
                            }
                        }
                    },
                    required: ['table', 'columns']
                }
            }, {
                name: 'alter_table',
                description: 'Alter an existing table structure',
                inputSchema: {
                    type: 'object',
                    properties: {
                        table: {
                            type: 'string',
                            description: 'The name of the table to alter'
                        },
                        operation: {
                            type: 'string',
                            enum: ['add_column', 'drop_column', 'modify_column', 'rename_column'],
                            description: 'The type of alteration to perform'
                        },
                        column: {
                            type: 'object',
                            description: 'Column definition for add/modify operations',
                            properties: {
                                name: {
                                    type: 'string',
                                    description: 'Column name'
                                },
                                type: {
                                    type: 'string',
                                    description: 'Column data type'
                                },
                                nullable: {
                                    type: 'boolean',
                                    description: 'Whether the column can be NULL'
                                },
                                default: {
                                    type: ['string', 'number', 'boolean', 'null'],
                                    description: 'Default value for the column'
                                },
                                newName: {
                                    type: 'string',
                                    description: 'New name for rename operations'
                                }
                            }
                        }
                    },
                    required: ['table', 'operation']
                }
            }, {
                name: 'execute_procedure',
                description: 'Execute a stored procedure with parameters',
                inputSchema: {
                    type: 'object',
                    properties: {
                        procedure: {
                            type: 'string',
                            description: 'The name of the stored procedure to execute'
                        },
                        params: {
                            type: 'array',
                            description: 'Parameters to pass to the stored procedure',
                            items: {
                                type: ['string', 'number', 'boolean', 'null']
                            }
                        }
                    },
                    required: ['procedure']
                }
            }, {
                name: 'bulk_insert',
                description: 'Insert multiple rows into a table efficiently',
                inputSchema: {
                    type: 'object',
                    properties: {
                        table: {
                            type: 'string',
                            description: 'The name of the table to insert into'
                        },
                        columns: {
                            type: 'array',
                            description: 'Column names for the insert',
                            items: {
                                type: 'string'
                            }
                        },
                        rows: {
                            type: 'array',
                            description: 'Array of value arrays to insert',
                            items: {
                                type: 'array',
                                items: {
                                    type: ['string', 'number', 'boolean', 'null']
                                }
                            }
                        }
                    },
                    required: ['table', 'columns', 'rows']
                }
            }, {
                name: 'drop_table',
                description: 'Drop a table from the database (requires confirmation)',
                inputSchema: {
                    type: 'object',
                    properties: {
                        table: {
                            type: 'string',
                            description: 'The name of the table to drop'
                        },
                        confirm: {
                            type: 'boolean',
                            description: 'Must be true to confirm the drop operation'
                        }
                    },
                    required: ['table', 'confirm']
                }
            }, {
                name: 'add_index',
                description: 'Add an index to a table',
                inputSchema: {
                    type: 'object',
                    properties: {
                        table: {
                            type: 'string',
                            description: 'The name of the table'
                        },
                        name: {
                            type: 'string',
                            description: 'The name of the index'
                        },
                        columns: {
                            type: 'array',
                            description: 'Column names to include in the index',
                            items: {
                                type: 'string'
                            }
                        },
                        unique: {
                            type: 'boolean',
                            description: 'Whether this should be a unique index',
                            default: false
                        }
                    },
                    required: ['table', 'name', 'columns']
                }
            }, {
                name: 'drop_index',
                description: 'Drop an index from a table',
                inputSchema: {
                    type: 'object',
                    properties: {
                        table: {
                            type: 'string',
                            description: 'The name of the table'
                        },
                        name: {
                            type: 'string',
                            description: 'The name of the index to drop'
                        }
                    },
                    required: ['table', 'name']
                }
            }, {
                name: 'rename_table',
                description: 'Rename a table',
                inputSchema: {
                    type: 'object',
                    properties: {
                        oldName: {
                            type: 'string',
                            description: 'Current name of the table'
                        },
                        newName: {
                            type: 'string',
                            description: 'New name for the table'
                        }
                    },
                    required: ['oldName', 'newName']
                }
            });
        }
        // Add read-only analysis tools (always available)
        tools.push({
            name: 'show_indexes',
            description: 'Show all indexes for a table',
            inputSchema: {
                type: 'object',
                properties: {
                    table: {
                        type: 'string',
                        description: 'The name of the table to show indexes for'
                    }
                },
                required: ['table']
            }
        }, {
            name: 'explain_query',
            description: 'Get the execution plan for a query',
            inputSchema: {
                type: 'object',
                properties: {
                    sql: {
                        type: 'string',
                        description: 'The SQL query to explain'
                    },
                    params: {
                        type: 'array',
                        description: 'Optional query parameters',
                        items: {
                            type: ['string', 'number', 'boolean', 'null']
                        }
                    }
                },
                required: ['sql']
            }
        }, {
            name: 'show_constraints',
            description: 'Show all constraints (foreign keys, unique, check) for a table',
            inputSchema: {
                type: 'object',
                properties: {
                    table: {
                        type: 'string',
                        description: 'The name of the table to show constraints for'
                    }
                },
                required: ['table']
            }
        });
        return tools;
    }
    async getResources() {
        try {
            const tables = await this.db.getTableList();
            const resources = [
                {
                    uri: 'schema://database',
                    name: 'Database Schema',
                    description: 'Complete database schema information',
                    mimeType: 'text/plain'
                }
            ];
            // Add resource for each table
            for (const table of tables) {
                resources.push({
                    uri: `table://${table}`,
                    name: `Table: ${table}`,
                    description: `Schema information for table ${table}`,
                    mimeType: 'text/plain'
                });
            }
            return resources;
        }
        catch (error) {
            logger.error('Failed to get resources', error);
            return [];
        }
    }
    async handleToolCall(name, args) {
        try {
            logger.info('Tool called', { tool: name, args });
            switch (name) {
                case 'query': {
                    const querySchema = z.object({
                        sql: z.string(),
                        params: z.array(z.union([z.string(), z.number(), z.boolean(), z.null()])).optional()
                    });
                    const { sql, params } = querySchema.parse(args);
                    const result = await this.db.executeQuery(sql, params);
                    return {
                        content: [{
                                type: 'text',
                                text: JSON.stringify({
                                    rows: result.rows,
                                    rowCount: result.rows.length,
                                    fields: result.fields ? result.fields.map(f => ({ name: f.name, type: f.type })) : [],
                                    affectedRows: result.affectedRows,
                                    insertId: result.insertId
                                }, null, 2)
                            }]
                    };
                }
                case 'list_tables': {
                    const tables = await this.db.getTableList();
                    return {
                        content: [{
                                type: 'text',
                                text: `Found ${tables.length} tables:\n${tables.join('\n')}`
                            }]
                    };
                }
                case 'describe_table': {
                    const tableSchema = z.object({
                        table: z.string()
                    });
                    const { table } = tableSchema.parse(args);
                    const schema = await this.db.getTableSchema(table);
                    return {
                        content: [{
                                type: 'text',
                                text: `Schema for table ${table}:\n${JSON.stringify(schema, null, 2)}`
                            }]
                    };
                }
                case 'database_info': {
                    const info = await this.db.getDatabaseInfo();
                    return {
                        content: [{
                                type: 'text',
                                text: JSON.stringify(info, null, 2)
                            }]
                    };
                }
                case 'insert': {
                    if (process.env.ALLOW_WRITE_OPERATIONS !== 'true') {
                        throw new Error('Write operations are not enabled. Set ALLOW_WRITE_OPERATIONS=true');
                    }
                    const insertSchema = z.object({
                        table: z.string(),
                        data: z.record(z.any())
                    });
                    const { table, data } = insertSchema.parse(args);
                    const columns = Object.keys(data);
                    const values = Object.values(data);
                    const placeholders = columns.map(() => '?').join(', ');
                    // Use safe identifiers for table and column names
                    const safeTable = this.db.safeIdentifier(table, 'table');
                    const safeColumns = columns.map(c => this.db.safeIdentifier(c, 'column')).join(', ');
                    const sql = `INSERT INTO ${safeTable} (${safeColumns}) VALUES (${placeholders})`;
                    const result = await this.db.executeQuery(sql, values);
                    return {
                        content: [{
                                type: 'text',
                                text: `Inserted ${result.affectedRows} row(s) into ${table}. Insert ID: ${result.insertId}`
                            }]
                    };
                }
                case 'update': {
                    if (process.env.ALLOW_WRITE_OPERATIONS !== 'true') {
                        throw new Error('Write operations are not enabled. Set ALLOW_WRITE_OPERATIONS=true');
                    }
                    const updateSchema = z.object({
                        table: z.string(),
                        data: z.record(z.any()),
                        where: z.record(z.any())
                    });
                    const { table, data, where } = updateSchema.parse(args);
                    const setColumns = Object.keys(data);
                    const setValues = Object.values(data);
                    const whereColumns = Object.keys(where);
                    const whereValues = Object.values(where);
                    const setSql = setColumns.map(c => `${this.db.safeIdentifier(c, 'column')} = ?`).join(', ');
                    const whereSql = whereColumns.map(c => `${this.db.safeIdentifier(c, 'column')} = ?`).join(' AND ');
                    const sql = `UPDATE ${this.db.safeIdentifier(table, 'table')} SET ${setSql} WHERE ${whereSql}`;
                    const result = await this.db.executeQuery(sql, [...setValues, ...whereValues]);
                    return {
                        content: [{
                                type: 'text',
                                text: `Updated ${result.affectedRows} row(s) in ${table}`
                            }]
                    };
                }
                case 'delete': {
                    if (process.env.ALLOW_WRITE_OPERATIONS !== 'true') {
                        throw new Error('Write operations are not enabled. Set ALLOW_WRITE_OPERATIONS=true');
                    }
                    const deleteSchema = z.object({
                        table: z.string(),
                        where: z.record(z.any())
                    });
                    const { table, where } = deleteSchema.parse(args);
                    const whereColumns = Object.keys(where);
                    const whereValues = Object.values(where);
                    const whereSql = whereColumns.map(c => `${this.db.safeIdentifier(c, 'column')} = ?`).join(' AND ');
                    const sql = `DELETE FROM ${this.db.safeIdentifier(table, 'table')} WHERE ${whereSql}`;
                    const result = await this.db.executeQuery(sql, whereValues);
                    return {
                        content: [{
                                type: 'text',
                                text: `Deleted ${result.affectedRows} row(s) from ${table}`
                            }]
                    };
                }
                case 'create_table': {
                    if (process.env.ALLOW_WRITE_OPERATIONS !== 'true') {
                        throw new Error('Write operations are not enabled. Set ALLOW_WRITE_OPERATIONS=true');
                    }
                    const createTableSchema = z.object({
                        table: z.string(),
                        columns: z.array(z.object({
                            name: z.string(),
                            type: z.string(),
                            nullable: z.boolean().optional().default(true),
                            primary: z.boolean().optional().default(false),
                            autoIncrement: z.boolean().optional().default(false),
                            default: z.union([z.string(), z.number(), z.boolean(), z.null()]).optional()
                        }))
                    });
                    const { table, columns } = createTableSchema.parse(args);
                    const columnDefs = columns.map(col => {
                        let def = `${this.db.safeIdentifier(col.name, 'column')} ${col.type}`;
                        if (!col.nullable)
                            def += ' NOT NULL';
                        if (col.autoIncrement)
                            def += ' AUTO_INCREMENT';
                        if (col.default !== undefined) {
                            if (col.default === null) {
                                def += ' DEFAULT NULL';
                            }
                            else if (typeof col.default === 'string') {
                                def += ` DEFAULT '${this.db.escapeStringValue(col.default)}'`;
                            }
                            else if (typeof col.default === 'boolean') {
                                def += ` DEFAULT ${col.default ? 'TRUE' : 'FALSE'}`;
                            }
                            else {
                                def += ` DEFAULT ${col.default}`;
                            }
                        }
                        return def;
                    });
                    const primaryKeys = columns.filter(col => col.primary).map(col => this.db.safeIdentifier(col.name, 'column'));
                    if (primaryKeys.length > 0) {
                        columnDefs.push(`PRIMARY KEY (${primaryKeys.join(', ')})`);
                    }
                    const sql = `CREATE TABLE ${this.db.safeIdentifier(table, 'table')} (${columnDefs.join(', ')})`;
                    await this.db.executeQuery(sql);
                    return {
                        content: [{
                                type: 'text',
                                text: `Created table ${table} successfully`
                            }]
                    };
                }
                case 'alter_table': {
                    if (process.env.ALLOW_WRITE_OPERATIONS !== 'true') {
                        throw new Error('Write operations are not enabled. Set ALLOW_WRITE_OPERATIONS=true');
                    }
                    const alterTableSchema = z.object({
                        table: z.string(),
                        operation: z.enum(['add_column', 'drop_column', 'modify_column', 'rename_column']),
                        column: z.object({
                            name: z.string(),
                            type: z.string().optional(),
                            nullable: z.boolean().optional(),
                            default: z.union([z.string(), z.number(), z.boolean(), z.null()]).optional(),
                            newName: z.string().optional()
                        }).optional()
                    });
                    const { table, operation, column } = alterTableSchema.parse(args);
                    let sql = '';
                    switch (operation) {
                        case 'add_column':
                            if (!column || !column.type)
                                throw new Error('Column definition required for add_column');
                            let colDef = `${this.db.safeIdentifier(column.name, 'column')} ${column.type}`;
                            if (column.nullable === false)
                                colDef += ' NOT NULL';
                            if (column.default !== undefined) {
                                if (column.default === null) {
                                    colDef += ' DEFAULT NULL';
                                }
                                else if (typeof column.default === 'string') {
                                    colDef += ` DEFAULT '${this.db.escapeStringValue(column.default)}'`;
                                }
                                else if (typeof column.default === 'boolean') {
                                    colDef += ` DEFAULT ${column.default ? 'TRUE' : 'FALSE'}`;
                                }
                                else {
                                    colDef += ` DEFAULT ${column.default}`;
                                }
                            }
                            sql = `ALTER TABLE ${this.db.safeIdentifier(table, 'table')} ADD COLUMN ${colDef}`;
                            break;
                        case 'drop_column':
                            if (!column || !column.name)
                                throw new Error('Column name required for drop_column');
                            sql = `ALTER TABLE ${this.db.safeIdentifier(table, 'table')} DROP COLUMN ${this.db.safeIdentifier(column.name, 'column')}`;
                            break;
                        case 'modify_column':
                            if (!column || !column.name || !column.type)
                                throw new Error('Column definition required for modify_column');
                            let modDef = `${this.db.safeIdentifier(column.name, 'column')} ${column.type}`;
                            if (column.nullable === false)
                                modDef += ' NOT NULL';
                            if (column.default !== undefined) {
                                if (column.default === null) {
                                    modDef += ' DEFAULT NULL';
                                }
                                else if (typeof column.default === 'string') {
                                    modDef += ` DEFAULT '${this.db.escapeStringValue(column.default)}'`;
                                }
                                else if (typeof column.default === 'boolean') {
                                    modDef += ` DEFAULT ${column.default ? 'TRUE' : 'FALSE'}`;
                                }
                                else {
                                    modDef += ` DEFAULT ${column.default}`;
                                }
                            }
                            sql = `ALTER TABLE ${this.db.safeIdentifier(table, 'table')} MODIFY COLUMN ${modDef}`;
                            break;
                        case 'rename_column':
                            if (!column || !column.name || !column.newName)
                                throw new Error('Column names required for rename_column');
                            sql = `ALTER TABLE ${this.db.safeIdentifier(table, 'table')} RENAME COLUMN ${this.db.safeIdentifier(column.name, 'column')} TO ${this.db.safeIdentifier(column.newName, 'column')}`;
                            break;
                    }
                    await this.db.executeQuery(sql);
                    return {
                        content: [{
                                type: 'text',
                                text: `Altered table ${table}: ${operation} completed successfully`
                            }]
                    };
                }
                case 'execute_procedure': {
                    if (process.env.ALLOW_WRITE_OPERATIONS !== 'true') {
                        throw new Error('Write operations are not enabled. Set ALLOW_WRITE_OPERATIONS=true');
                    }
                    const procedureSchema = z.object({
                        procedure: z.string(),
                        params: z.array(z.union([z.string(), z.number(), z.boolean(), z.null()])).optional()
                    });
                    const { procedure, params } = procedureSchema.parse(args);
                    const placeholders = params ? params.map(() => '?').join(', ') : '';
                    const sql = `CALL ${this.db.safeIdentifier(procedure, 'table')}(${placeholders})`;
                    const result = await this.db.executeQuery(sql, params);
                    return {
                        content: [{
                                type: 'text',
                                text: JSON.stringify({
                                    procedure,
                                    result: result.rows,
                                    affectedRows: result.affectedRows
                                }, null, 2)
                            }]
                    };
                }
                case 'bulk_insert': {
                    if (process.env.ALLOW_WRITE_OPERATIONS !== 'true') {
                        throw new Error('Write operations are not enabled. Set ALLOW_WRITE_OPERATIONS=true');
                    }
                    const bulkInsertSchema = z.object({
                        table: z.string(),
                        columns: z.array(z.string()),
                        rows: z.array(z.array(z.union([z.string(), z.number(), z.boolean(), z.null()])))
                    });
                    const { table, columns, rows } = bulkInsertSchema.parse(args);
                    if (rows.length === 0) {
                        throw new Error('No rows provided for bulk insert');
                    }
                    const columnList = columns.map(c => this.db.safeIdentifier(c, 'column')).join(', ');
                    const valuePlaceholders = `(${columns.map(() => '?').join(', ')})`;
                    const allValuePlaceholders = rows.map(() => valuePlaceholders).join(', ');
                    const sql = `INSERT INTO ${this.db.safeIdentifier(table, 'table')} (${columnList}) VALUES ${allValuePlaceholders}`;
                    const flatValues = rows.flat();
                    const result = await this.db.executeQuery(sql, flatValues);
                    return {
                        content: [{
                                type: 'text',
                                text: `Bulk inserted ${result.affectedRows} row(s) into ${table}. First insert ID: ${result.insertId}`
                            }]
                    };
                }
                case 'drop_table': {
                    if (process.env.ALLOW_WRITE_OPERATIONS !== 'true') {
                        throw new Error('Write operations are not enabled. Set ALLOW_WRITE_OPERATIONS=true');
                    }
                    const dropTableSchema = z.object({
                        table: z.string(),
                        confirm: z.boolean()
                    });
                    const { table, confirm } = dropTableSchema.parse(args);
                    if (!confirm) {
                        throw new Error('Drop table operation requires confirm: true to proceed');
                    }
                    const sql = `DROP TABLE ${this.db.safeIdentifier(table, 'table')}`;
                    await this.db.executeQuery(sql);
                    return {
                        content: [{
                                type: 'text',
                                text: `Dropped table ${table} successfully`
                            }]
                    };
                }
                case 'show_indexes': {
                    const showIndexesSchema = z.object({
                        table: z.string()
                    });
                    const { table } = showIndexesSchema.parse(args);
                    const sql = `SHOW INDEX FROM ${this.db.safeIdentifier(table, 'table')}`;
                    const result = await this.db.executeQuery(sql);
                    return {
                        content: [{
                                type: 'text',
                                text: `Indexes for table ${table}:\n${JSON.stringify(result.rows, null, 2)}`
                            }]
                    };
                }
                case 'explain_query': {
                    const explainSchema = z.object({
                        sql: z.string(),
                        params: z.array(z.union([z.string(), z.number(), z.boolean(), z.null()])).optional()
                    });
                    const { sql, params } = explainSchema.parse(args);
                    const explainSql = `EXPLAIN ${sql}`;
                    const result = await this.db.executeQuery(explainSql, params);
                    return {
                        content: [{
                                type: 'text',
                                text: `Query execution plan:\n${JSON.stringify(result.rows, null, 2)}`
                            }]
                    };
                }
                case 'add_index': {
                    if (process.env.ALLOW_WRITE_OPERATIONS !== 'true') {
                        throw new Error('Write operations are not enabled. Set ALLOW_WRITE_OPERATIONS=true');
                    }
                    const addIndexSchema = z.object({
                        table: z.string(),
                        name: z.string(),
                        columns: z.array(z.string()),
                        unique: z.boolean().optional().default(false)
                    });
                    const { table, name, columns, unique } = addIndexSchema.parse(args);
                    const indexType = unique ? 'UNIQUE INDEX' : 'INDEX';
                    const columnList = columns.map(c => this.db.safeIdentifier(c, 'column')).join(', ');
                    const sql = `CREATE ${indexType} ${this.db.safeIdentifier(name, 'column')} ON ${this.db.safeIdentifier(table, 'table')} (${columnList})`;
                    await this.db.executeQuery(sql);
                    return {
                        content: [{
                                type: 'text',
                                text: `Created ${unique ? 'unique ' : ''}index ${name} on table ${table}`
                            }]
                    };
                }
                case 'drop_index': {
                    if (process.env.ALLOW_WRITE_OPERATIONS !== 'true') {
                        throw new Error('Write operations are not enabled. Set ALLOW_WRITE_OPERATIONS=true');
                    }
                    const dropIndexSchema = z.object({
                        table: z.string(),
                        name: z.string()
                    });
                    const { table, name } = dropIndexSchema.parse(args);
                    const sql = `DROP INDEX ${this.db.safeIdentifier(name, 'column')} ON ${this.db.safeIdentifier(table, 'table')}`;
                    await this.db.executeQuery(sql);
                    return {
                        content: [{
                                type: 'text',
                                text: `Dropped index ${name} from table ${table}`
                            }]
                    };
                }
                case 'rename_table': {
                    if (process.env.ALLOW_WRITE_OPERATIONS !== 'true') {
                        throw new Error('Write operations are not enabled. Set ALLOW_WRITE_OPERATIONS=true');
                    }
                    const renameTableSchema = z.object({
                        oldName: z.string(),
                        newName: z.string()
                    });
                    const { oldName, newName } = renameTableSchema.parse(args);
                    const sql = `RENAME TABLE ${this.db.safeIdentifier(oldName, 'table')} TO ${this.db.safeIdentifier(newName, 'table')}`;
                    await this.db.executeQuery(sql);
                    return {
                        content: [{
                                type: 'text',
                                text: `Renamed table from ${oldName} to ${newName}`
                            }]
                    };
                }
                case 'show_constraints': {
                    const showConstraintsSchema = z.object({
                        table: z.string()
                    });
                    const { table } = showConstraintsSchema.parse(args);
                    // Get foreign key constraints
                    const fkQuery = `
            SELECT 
              CONSTRAINT_NAME,
              COLUMN_NAME,
              REFERENCED_TABLE_NAME,
              REFERENCED_COLUMN_NAME
            FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
            WHERE TABLE_SCHEMA = DATABASE()
              AND TABLE_NAME = ?
              AND REFERENCED_TABLE_NAME IS NOT NULL
          `;
                    // Get unique constraints
                    const uniqueQuery = `
            SELECT 
              CONSTRAINT_NAME,
              COLUMN_NAME
            FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
            WHERE TABLE_SCHEMA = DATABASE()
              AND TABLE_NAME = ?
              AND CONSTRAINT_NAME != 'PRIMARY'
              AND REFERENCED_TABLE_NAME IS NULL
          `;
                    const [fkResult, uniqueResult] = await Promise.all([
                        this.db.executeQuery(fkQuery, [table]),
                        this.db.executeQuery(uniqueQuery, [table])
                    ]);
                    return {
                        content: [{
                                type: 'text',
                                text: JSON.stringify({
                                    table,
                                    foreignKeys: fkResult.rows,
                                    uniqueConstraints: uniqueResult.rows
                                }, null, 2)
                            }]
                    };
                }
                default:
                    throw new Error(`Unknown tool: ${name}`);
            }
        }
        catch (error) {
            logger.error('Tool execution failed', error);
            return {
                content: [{
                        type: 'text',
                        text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
                    }],
                isError: true
            };
        }
    }
    async handleResourceRead(uri) {
        try {
            logger.info('Resource read', { uri });
            if (uri === 'schema://database') {
                const tables = await this.db.getTableList();
                const schemas = await Promise.all(tables.map(async (table) => ({
                    table,
                    schema: await this.db.getTableSchema(table)
                })));
                return {
                    contents: [{
                            uri,
                            mimeType: 'text/plain',
                            text: JSON.stringify(schemas, null, 2)
                        }]
                };
            }
            if (uri.startsWith('table://')) {
                const table = uri.replace('table://', '');
                const schema = await this.db.getTableSchema(table);
                return {
                    contents: [{
                            uri,
                            mimeType: 'text/plain',
                            text: JSON.stringify({ table, schema }, null, 2)
                        }]
                };
            }
            throw new Error(`Unknown resource: ${uri}`);
        }
        catch (error) {
            logger.error('Resource read failed', error);
            throw error;
        }
    }
    async start() {
        logger.info('Starting MCP server...');
        // Connect to database
        await this.db.connect();
        // Start MCP server with stdio transport
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        logger.info('MCP server started successfully');
        // Handle shutdown
        process.on('SIGINT', async () => {
            logger.info('Shutting down MCP server...');
            await this.db.disconnect();
            process.exit(0);
        });
        process.on('SIGTERM', async () => {
            logger.info('Shutting down MCP server...');
            await this.db.disconnect();
            process.exit(0);
        });
    }
}
//# sourceMappingURL=server.js.map