-- MySQL Script to Create Read-Only User for MCP Server
-- Run this as root or admin user: mysql -u root -p < setup-readonly-user.sql

-- Create a dedicated read-only user for MCP
CREATE USER IF NOT EXISTS 'mcp_readonly'@'localhost' IDENTIFIED BY 'ChangeMeToSecurePassword123!';

-- Grant only SELECT privilege on the sundontdie database
GRANT SELECT ON sundontdie.* TO 'mcp_readonly'@'localhost';

-- Optional: Grant SHOW VIEW if you have views
GRANT SHOW VIEW ON sundontdie.* TO 'mcp_readonly'@'localhost';

-- Apply privileges
FLUSH PRIVILEGES;

-- Verify the grants
SHOW GRANTS FOR 'mcp_readonly'@'localhost';

-- Instructions:
-- 1. Change 'ChangeMeToSecurePassword123!' to a secure password
-- 2. Run: mysql -u root -p < setup-readonly-user.sql
-- 3. Update .mcp.json with the new credentials:
--    "MYSQL_USER": "mcp_readonly"
--    "MYSQL_PASSWORD": "your_secure_password"