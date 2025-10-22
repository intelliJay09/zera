# MySQL MCP Server

A secure Model Context Protocol (MCP) server that enables Large Language Models (LLMs) to interact with MySQL databases through a standardized interface. This server provides read and write operations with comprehensive security controls, making it ideal for AI-powered database interactions.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![MySQL](https://img.shields.io/badge/mysql-%3E%3D5.7-orange.svg)

## 🌟 Features

- **🛡️ Secure by Default**: Read-only mode with optional write operations
- **🚀 High Performance**: Connection pooling and query optimization
- **🔐 SQL Injection Protection**: Parameterized queries and identifier validation
- **📊 Comprehensive Toolset**: 18 tools for database operations
- **⚡ Rate Limiting**: Configurable limits to prevent abuse
- **📝 Audit Logging**: Complete operation history in JSON format
- **🔄 Resource System**: Expose database schemas as MCP resources
- **⏱️ Query Timeouts**: Prevent long-running queries
- **🎯 Result Limiting**: Memory-efficient result handling

## 📋 Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Available Tools](#available-tools)
- [Security Features](#security-features)
- [Usage Examples](#usage-examples)
- [Architecture](#architecture)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Installation

### Prerequisites

- Node.js 18 or higher
- MySQL 5.7+ or MariaDB 10.2+
- npm or yarn package manager

### Step 1: Clone and Build

```bash
git clone https://github.com/yourusername/mav-mysql-mcp-server.git
cd mav-mysql-mcp-server
npm install
npm run build
```

### Step 2: Create Read-Only MySQL User (Recommended)

For security, create a dedicated read-only user:

```bash
mysql -u root -p < setup-readonly-user.sql
```

Or manually:

```sql
CREATE USER 'mcp_readonly'@'localhost' IDENTIFIED BY 'secure_password';
GRANT SELECT ON your_database.* TO 'mcp_readonly'@'localhost';
GRANT SHOW VIEW ON your_database.* TO 'mcp_readonly'@'localhost';
FLUSH PRIVILEGES;
```

### Step 3: Configure MCP Client

#### For Claude Desktop

Add to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mysql-myproject": {
      "command": "node",
      "args": ["/absolute/path/to/mav-mysql-mcp-server/build/index.js"],
      "env": {
        "MYSQL_HOST": "localhost",
        "MYSQL_PORT": "3306",
        "MYSQL_USER": "mcp_readonly",
        "MYSQL_PASSWORD": "secure_password",
        "MYSQL_DATABASE": "your_database"
      }
    }
  }
}
```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `MYSQL_HOST` | MySQL server hostname | - | ✅ |
| `MYSQL_PORT` | MySQL server port | 3306 | ❌ |
| `MYSQL_USER` | MySQL username | - | ✅ |
| `MYSQL_PASSWORD` | MySQL password | - | ✅ |
| `MYSQL_DATABASE` | Default database name | - | ✅ |
| `ALLOW_WRITE_OPERATIONS` | Enable write operations | false | ❌ |
| `CONNECTION_LIMIT` | Max connections in pool | 5 | ❌ |
| `QUERY_TIMEOUT` | Query timeout in milliseconds | 30000 | ❌ |
| `MAX_RESULTS` | Maximum rows returned per query | 1000 | ❌ |
| `RATE_LIMIT_PER_MINUTE` | Queries allowed per minute | 60 | ❌ |
| `RATE_LIMIT_PER_HOUR` | Queries allowed per hour | 1000 | ❌ |
| `RATE_LIMIT_CONCURRENT` | Max concurrent queries | 10 | ❌ |
| `MCP_DEBUG` | Enable debug logging | false | ❌ |

### Example .env File

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=myapp_user
MYSQL_PASSWORD=secure_password_here
MYSQL_DATABASE=myapp_db

# Security
ALLOW_WRITE_OPERATIONS=false

# Performance
CONNECTION_LIMIT=10
QUERY_TIMEOUT=60000
MAX_RESULTS=5000

# Rate Limiting
RATE_LIMIT_PER_MINUTE=100
RATE_LIMIT_PER_HOUR=2000
RATE_LIMIT_CONCURRENT=20
```

## 🛠️ Available Tools

### Read-Only Tools (Always Available)

#### 1. `query` - Execute SQL Queries
Execute parameterized SQL queries safely.

```json
{
  "sql": "SELECT * FROM users WHERE age > ? AND city = ?",
  "params": [18, "New York"]
}
```

#### 2. `list_tables` - List Database Tables
Get all tables in the current database.

```json
{}
```

Returns: Array of table names

#### 3. `describe_table` - Get Table Schema
Get detailed information about a table's structure.

```json
{
  "table": "users"
}
```

Returns: Column definitions with types, nullability, defaults, etc.

#### 4. `database_info` - Database Statistics
Get comprehensive database information.

```json
{}
```

Returns: Database version, size, table count, character set, etc.

#### 5. `show_indexes` - Display Table Indexes
List all indexes for a specific table.

```json
{
  "table": "orders"
}
```

#### 6. `explain_query` - Query Execution Plan
Analyze query performance.

```json
{
  "sql": "SELECT * FROM orders JOIN users ON orders.user_id = users.id WHERE orders.total > 100"
}
```

#### 7. `show_constraints` - Table Constraints
Show foreign keys and unique constraints.

```json
{
  "table": "order_items"
}
```

### Write Operation Tools (Requires `ALLOW_WRITE_OPERATIONS=true`)

#### 8. `insert` - Insert Single Row
Insert a new row into a table.

```json
{
  "table": "users",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30
  }
}
```

#### 9. `update` - Update Rows
Update existing rows with conditions.

```json
{
  "table": "users",
  "data": {
    "status": "active",
    "updated_at": "2024-01-01 00:00:00"
  },
  "where": {
    "id": 123
  }
}
```

#### 10. `delete` - Delete Rows
Delete rows matching conditions.

```json
{
  "table": "sessions",
  "where": {
    "expired": true
  }
}
```

#### 11. `bulk_insert` - Insert Multiple Rows
Efficiently insert multiple rows in one operation.

```json
{
  "table": "products",
  "rows": [
    {"name": "Product 1", "price": 19.99},
    {"name": "Product 2", "price": 29.99},
    {"name": "Product 3", "price": 39.99}
  ]
}
```

#### 12. `create_table` - Create New Table
Create a new table with specified columns.

```json
{
  "table": "products",
  "columns": [
    {
      "name": "id",
      "type": "INT",
      "primary": true,
      "autoIncrement": true
    },
    {
      "name": "name",
      "type": "VARCHAR(255)",
      "nullable": false
    },
    {
      "name": "price",
      "type": "DECIMAL(10,2)",
      "nullable": false,
      "default": "0.00"
    },
    {
      "name": "created_at",
      "type": "TIMESTAMP",
      "default": "CURRENT_TIMESTAMP"
    }
  ]
}
```

#### 13. `alter_table` - Modify Table Structure
Add, drop, modify, or rename columns.

```json
{
  "table": "users",
  "operation": "add_column",
  "column": {
    "name": "phone",
    "type": "VARCHAR(20)",
    "nullable": true,
    "after": "email"
  }
}
```

Operations: `add_column`, `drop_column`, `modify_column`, `rename_column`

#### 14. `drop_table` - Remove Table
Drop a table (requires confirmation).

```json
{
  "table": "old_logs",
  "confirm": "DROP_TABLE_old_logs"
}
```

#### 15. `add_index` - Create Index
Add an index to improve query performance.

```json
{
  "table": "orders",
  "indexName": "idx_user_date",
  "columns": ["user_id", "order_date"],
  "unique": false
}
```

#### 16. `drop_index` - Remove Index
Drop an existing index.

```json
{
  "table": "orders",
  "indexName": "idx_user_date"
}
```

#### 17. `rename_table` - Rename Table
Rename an existing table.

```json
{
  "oldName": "user_profiles",
  "newName": "profiles"
}
```

#### 18. `execute_procedure` - Call Stored Procedure
Execute a stored procedure with parameters.

```json
{
  "procedure": "calculate_user_stats",
  "params": [123, "2024-01-01"]
}
```

## 🔒 Security Features

### 1. Access Control
- **Read-only by default**: Write operations must be explicitly enabled
- **System table protection**: Access to mysql.*, information_schema.*, etc. is blocked
- **Sensitive data detection**: Queries containing password/token/secret patterns are blocked

### 2. SQL Injection Prevention
- **Parameterized queries**: All user input is properly escaped
- **Identifier validation**: Table/column names must be alphanumeric + underscore
- **Query pattern matching**: Dangerous operations are detected and blocked

### 3. Operation Restrictions
- **No file operations**: INTO OUTFILE, LOAD DATA blocked
- **No permission changes**: GRANT, REVOKE blocked
- **No system commands**: System functions blocked

### 4. Rate Limiting
- Per-minute query limits
- Per-hour query limits
- Concurrent query limits
- Automatic throttling when limits reached

### 5. Audit Trail
All operations are logged with:
- Timestamp
- Query type and details
- User information
- Execution time
- Success/failure status

## 📚 Usage Examples

### Basic Query Example

```javascript
// In Claude or another MCP client
const result = await use_mcp_tool({
  server_name: "mysql-myproject",
  tool_name: "query",
  arguments: {
    sql: "SELECT id, name, email FROM users WHERE created_at > ? ORDER BY created_at DESC LIMIT 10",
    params: ["2024-01-01"]
  }
});
```

### Creating a Table with Indexes

```javascript
// Create the table
await use_mcp_tool({
  server_name: "mysql-myproject",
  tool_name: "create_table",
  arguments: {
    table: "products",
    columns: [
      { name: "id", type: "INT", primary: true, autoIncrement: true },
      { name: "sku", type: "VARCHAR(50)", nullable: false },
      { name: "name", type: "VARCHAR(255)", nullable: false },
      { name: "price", type: "DECIMAL(10,2)", nullable: false },
      { name: "category_id", type: "INT", nullable: false }
    ]
  }
});

// Add indexes
await use_mcp_tool({
  server_name: "mysql-myproject",
  tool_name: "add_index",
  arguments: {
    table: "products",
    indexName: "idx_sku",
    columns: ["sku"],
    unique: true
  }
});
```

### Bulk Operations

```javascript
// Bulk insert
await use_mcp_tool({
  server_name: "mysql-myproject",
  tool_name: "bulk_insert",
  arguments: {
    table: "inventory_updates",
    rows: [
      { product_id: 1, quantity: 100, updated_by: "system" },
      { product_id: 2, quantity: 50, updated_by: "system" },
      { product_id: 3, quantity: 75, updated_by: "system" }
    ]
  }
});
```

## 🏗️ Architecture

### Component Overview

```
┌─────────────────┐     ┌──────────────────┐     ┌──────────────┐
│   MCP Client    │────▶│   MCP Server     │────▶│    MySQL     │
│    (Claude)     │◀────│   (This Tool)    │◀────│   Database   │
└─────────────────┘     └──────────────────┘     └──────────────┘
         │                       │                        │
         │                       ├── Connection Pool     │
         │                       ├── Query Validator     │
         │                       ├── Rate Limiter        │
         │                       └── Audit Logger        │
         │                                               │
         └───────────── stdio (JSON-RPC) ────────────────┘
```

### Key Components

1. **MCP Protocol Handler** (`server.ts`)
   - Handles tool and resource requests
   - Routes to appropriate handlers
   - Manages protocol compliance

2. **Database Manager** (`database.ts`)
   - Connection pooling
   - Query execution
   - Transaction management
   - Security validation

3. **Security Layer**
   - Input validation
   - Query analysis
   - Permission checking
   - Rate limiting

4. **Logging System** (`logger.ts`)
   - Structured JSON logging
   - Audit trail
   - Error tracking
   - Performance metrics

### Design Patterns

- **Factory Pattern**: Database connection creation
- **Repository Pattern**: Database operations encapsulation
- **Strategy Pattern**: Different handlers for various operations
- **Guard Pattern**: Multiple validation layers

## 🔧 Troubleshooting

### Common Issues

#### Connection Refused
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Solution**: Ensure MySQL is running and accessible on the specified host/port.

#### Authentication Failed
```
Error: Access denied for user 'username'@'localhost'
```
**Solution**: Verify username, password, and user permissions.

#### Rate Limit Exceeded
```
Error: Rate limit exceeded. Please wait before making more requests.
```
**Solution**: Reduce query frequency or increase rate limits in configuration.

#### Query Timeout
```
Error: Query timeout of 30000ms exceeded
```
**Solution**: Optimize your query or increase QUERY_TIMEOUT setting.

### Debug Mode

Enable debug logging for detailed information:

```bash
MCP_DEBUG=true node build/index.js
```

### Health Check

Test your connection:

```javascript
await use_mcp_tool({
  server_name: "mysql-myproject",
  tool_name: "database_info",
  arguments: {}
});
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/mav-mysql-mcp-server.git
cd mav-mysql-mcp-server

# Install dependencies
npm install

# Run in development mode
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Code Style

- TypeScript with strict mode
- ESLint configuration included
- Prettier for formatting
- Conventional commits

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built on the [Model Context Protocol](https://github.com/anthropics/model-context-protocol) by Anthropic
- Uses [mysql2](https://github.com/sidorares/node-mysql2) for MySQL connectivity
- Inspired by security best practices from OWASP

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/mav-mysql-mcp-server/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/mav-mysql-mcp-server/discussions)
- **Security**: Report vulnerabilities to derrick@derricksiawor.com

---

Made with ❤️ by Derrick S. K. Siawor