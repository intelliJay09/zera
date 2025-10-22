# MCP MySQL Server Security Guide

## Security Features

### 1. **Read-Only Mode (Default)**
- Enforced by default (`ALLOW_WRITE_OPERATIONS: "false"`)
- Blocks INSERT, UPDATE, DELETE, DROP, CREATE, ALTER, TRUNCATE, REPLACE
- Blocks stored procedures (CALL, EXEC, EXECUTE)
- Blocks file operations (INTO OUTFILE, LOAD DATA, LOAD_FILE)
- Blocks permission changes (GRANT, REVOKE, CREATE USER, etc.)

### 1a. **Write Mode (When Enabled)**
- Set `ALLOW_WRITE_OPERATIONS: "true"` to enable
- Allows INSERT, UPDATE, DELETE, CREATE, ALTER, etc.
- Allows stored procedures (CALL, EXEC, EXECUTE)
- All write operations are logged and audited
- Permission changes remain blocked for safety

### 2. **Sensitive Table Protection**
- System tables are blocked (mysql.user, information_schema.user_privileges, etc.)
- Warns on access to tables with sensitive patterns (password, token, secret, api_key, etc.)

### 3. **Query Safety**
- Parameterized queries prevent SQL injection
- Query timeout protection (default: 30 seconds)
- Result size limiting (default: 1000 rows)
- Connection pool limiting (default: 5 connections)

### 4. **Audit Logging**
- All queries are logged with timestamp
- Logs include user, database, and truncated query
- Audit logs always written to stderr as JSON

## Setup Instructions

### 1. Create Read-Only MySQL User
```bash
mysql -u root -p < mcp-server/setup-readonly-user.sql
```

### 2. Configure MCP Server
1. Copy `.mcp.json.template` to `.mcp.json`
2. Update the password for the read-only user
3. Set `MCP_DEBUG: "false"` for production

### 3. Secure Your Configuration
- `.mcp.json` is already in `.gitignore`
- Never commit credentials to version control
- Consider using environment variables for passwords

### 4. Monitor Audit Logs
Audit logs are written to stderr in JSON format:
```json
[AUDIT] {"timestamp":"2024-01-20T10:30:00Z","action":"QUERY_EXECUTE","details":{...}}
```

## Best Practices

1. **Use Minimal Privileges**
   - Always use the read-only user
   - Never use root or admin credentials
   - Grant only SELECT privilege

2. **Regular Security Reviews**
   - Review audit logs regularly
   - Check for sensitive pattern warnings
   - Monitor failed query attempts

3. **Environment-Specific Settings**
   - Development: `MCP_DEBUG: "true"` for troubleshooting
   - Production: `MCP_DEBUG: "false"` to reduce log verbosity

4. **Additional Hardening**
   - Consider IP whitelisting in MySQL
   - Use SSL/TLS for database connections
   - Rotate passwords regularly

## Troubleshooting

### Connection Issues
- Verify MySQL is running on specified host/port
- Check firewall rules
- Verify user credentials and permissions

### Permission Denied
- Ensure user has SELECT privilege
- Check if accessing blocked tables
- Review audit logs for details

### Query Timeouts
- Adjust QUERY_TIMEOUT if needed
- Optimize slow queries
- Check database indexes