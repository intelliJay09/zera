#!/usr/bin/env npx tsx

/**
 * Comprehensive test suite for MySQL MCP Server tools
 * This tests all available tools with various scenarios
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { spawn } from 'child_process';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface TestResult {
  tool: string;
  test: string;
  status: 'PASS' | 'FAIL' | 'ERROR';
  message?: string;
  response?: any;
}

class MCPTestRunner {
  private client: Client;
  private transport: StdioClientTransport;
  private results: TestResult[] = [];
  private testTableName = 'mcp_test_table';

  constructor() {
    this.client = new Client({
      name: 'mysql-mcp-test-client',
      version: '1.0.0'
    }, {
      capabilities: {}
    });
  }

  async connect() {
    const serverPath = path.join(__dirname, 'build', 'index.js');
    const serverProcess = spawn('node', [serverPath], {
      env: {
        ...process.env,
        ALLOW_WRITE_OPERATIONS: 'true' // Enable write operations for testing
      }
    });

    this.transport = new StdioClientTransport({
      command: 'node',
      args: [serverPath],
      env: {
        ...process.env,
        ALLOW_WRITE_OPERATIONS: 'true'
      }
    });

    await this.client.connect(this.transport);
    console.log('Connected to MySQL MCP Server');
  }

  async disconnect() {
    await this.client.close();
  }

  async runTest(tool: string, testName: string, args: any): Promise<TestResult> {
    try {
      console.log(`\nTesting: ${tool} - ${testName}`);
      const response = await this.client.callTool({
        name: tool,
        arguments: args
      });

      const result: TestResult = {
        tool,
        test: testName,
        status: 'PASS',
        response
      };

      console.log(`✅ PASS: ${testName}`);
      this.results.push(result);
      return result;
    } catch (error) {
      const result: TestResult = {
        tool,
        test: testName,
        status: 'FAIL',
        message: error instanceof Error ? error.message : String(error)
      };

      console.log(`❌ FAIL: ${testName} - ${result.message}`);
      this.results.push(result);
      return result;
    }
  }

  async cleanup() {
    // Try to drop the test table if it exists
    try {
      await this.client.callTool({
        name: 'query',
        arguments: {
          sql: `DROP TABLE IF EXISTS ${this.testTableName}`
        }
      });
    } catch (error) {
      // Ignore errors during cleanup
    }
  }

  async runAllTests() {
    console.log('🚀 Starting MySQL MCP Server Tool Tests\n');
    
    // Cleanup before starting
    await this.cleanup();

    // Test 1: list_tables
    await this.runTest('list_tables', 'List all tables', {});

    // Test 2: create_table (if write operations are enabled)
    await this.runTest('create_table', 'Create test table', {
      table: this.testTableName,
      columns: [
        { name: 'id', type: 'INT', primaryKey: true, autoIncrement: true },
        { name: 'name', type: 'VARCHAR(100)', notNull: true },
        { name: 'email', type: 'VARCHAR(255)', unique: true },
        { name: 'age', type: 'INT' },
        { name: 'created_at', type: 'TIMESTAMP', default: 'CURRENT_TIMESTAMP' }
      ]
    });

    // Test 3: describe_table (not 'describe')
    await this.runTest('describe_table', 'Describe the test table', {
      table: this.testTableName
    });

    // Test 4: insert
    await this.runTest('insert', 'Insert single row', {
      table: this.testTableName,
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        age: 30
      }
    });

    // Test 5: insert_many
    await this.runTest('insert_many', 'Insert multiple rows', {
      table: this.testTableName,
      rows: [
        { name: 'Jane Smith', email: 'jane@example.com', age: 25 },
        { name: 'Bob Johnson', email: 'bob@example.com', age: 35 }
      ]
    });

    // Test 6: query - SELECT
    await this.runTest('query', 'Select all rows', {
      sql: `SELECT * FROM ${this.testTableName}`
    });

    // Test 7: query - SELECT with WHERE
    await this.runTest('query', 'Select with WHERE clause', {
      sql: `SELECT * FROM ${this.testTableName} WHERE age > ?`,
      params: [25]
    });

    // Test 8: update
    await this.runTest('update', 'Update a row', {
      table: this.testTableName,
      set: { age: 31 },
      where: { name: 'John Doe' }
    });

    // Test 9: query - Verify update
    await this.runTest('query', 'Verify update', {
      sql: `SELECT * FROM ${this.testTableName} WHERE name = ?`,
      params: ['John Doe']
    });

    // Test 10: show_indexes
    await this.runTest('show_indexes', 'Show indexes for test table', {
      table: this.testTableName
    });

    // Test 11: add_index
    await this.runTest('add_index', 'Add index on age column', {
      table: this.testTableName,
      indexName: 'idx_age',
      columns: ['age']
    });

    // Test 12: show_constraints
    await this.runTest('show_constraints', 'Show constraints', {});

    // Test 13: database_info
    await this.runTest('database_info', 'Get database information', {});

    // Test 14: explain_query
    await this.runTest('explain_query', 'Explain SELECT query', {
      sql: `SELECT * FROM ${this.testTableName} WHERE age > 25`
    });

    // Test 15: delete
    await this.runTest('delete', 'Delete a row', {
      table: this.testTableName,
      where: { name: 'Bob Johnson' }
    });

    // Test 16: query - Verify deletion
    await this.runTest('query', 'Verify deletion', {
      sql: `SELECT COUNT(*) as count FROM ${this.testTableName}`
    });

    // Test 17: Error handling - Invalid table name
    await this.runTest('describe_table', 'Error: Invalid table name', {
      table: 'non_existent_table_12345'
    });

    // Test 18: Error handling - SQL injection attempt
    await this.runTest('query', 'Error: SQL injection protection', {
      sql: `SELECT * FROM ${this.testTableName} WHERE name = ?`,
      params: ["'; DROP TABLE users; --"]
    });

    // Test 19: add_column
    await this.runTest('add_column', 'Add new column', {
      table: this.testTableName,
      column: {
        name: 'phone',
        type: 'VARCHAR(20)'
      }
    });

    // Test 20: describe_table after adding column
    await this.runTest('describe_table', 'Verify new column', {
      table: this.testTableName
    });

    // Cleanup
    await this.cleanup();

    // Print summary
    this.printSummary();
  }

  printSummary() {
    console.log('\n========================================');
    console.log('TEST SUMMARY');
    console.log('========================================\n');

    const passed = this.results.filter(r => r.status === 'PASS').length;
    const failed = this.results.filter(r => r.status === 'FAIL').length;
    const total = this.results.length;

    console.log(`Total Tests: ${total}`);
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`Success Rate: ${((passed / total) * 100).toFixed(1)}%\n`);

    if (failed > 0) {
      console.log('Failed Tests:');
      this.results
        .filter(r => r.status === 'FAIL')
        .forEach(r => {
          console.log(`  - ${r.tool}: ${r.test}`);
          console.log(`    Error: ${r.message}\n`);
        });
    }

    // Group results by tool
    const toolResults = new Map<string, TestResult[]>();
    this.results.forEach(r => {
      if (!toolResults.has(r.tool)) {
        toolResults.set(r.tool, []);
      }
      toolResults.get(r.tool)!.push(r);
    });

    console.log('\nResults by Tool:');
    toolResults.forEach((results, tool) => {
      const toolPassed = results.filter(r => r.status === 'PASS').length;
      const toolTotal = results.length;
      console.log(`  ${tool}: ${toolPassed}/${toolTotal} passed`);
    });
  }
}

// Run the tests
async function main() {
  const tester = new MCPTestRunner();
  
  try {
    await tester.connect();
    await tester.runAllTests();
  } catch (error) {
    console.error('Test runner error:', error);
  } finally {
    await tester.disconnect();
  }
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}