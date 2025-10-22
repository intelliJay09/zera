#!/usr/bin/env node

/**
 * Direct test of MySQL MCP Server tools
 * Tests all tools by spawning the server and communicating via stdio
 */

const { spawn } = require('child_process');
const path = require('path');

// Test configuration
const TEST_TABLE_NAME = 'mcp_test_table_' + Date.now();
const SERVER_PATH = path.join(__dirname, 'build', 'index.js');

// Helper to send JSON-RPC requests
function createRequest(method, params, id = 1) {
  return JSON.stringify({
    jsonrpc: '2.0',
    method,
    params,
    id
  }) + '\n';
}

// Helper to parse responses
function parseResponse(data) {
  try {
    const lines = data.toString().split('\n').filter(line => line.trim());
    for (const line of lines) {
      try {
        const parsed = JSON.parse(line);
        if (parsed.jsonrpc === '2.0') {
          return parsed;
        }
      } catch (e) {
        // Continue to next line
      }
    }
    return null;
  } catch (error) {
    console.error('Failed to parse response:', error);
    return null;
  }
}

async function runTests() {
  console.log('🚀 Starting MySQL MCP Server Tool Tests\n');
  console.log('Server path:', SERVER_PATH);
  
  // Start the server with write operations enabled
  const server = spawn('node', [SERVER_PATH], {
    env: {
      ...process.env,
      ALLOW_WRITE_OPERATIONS: 'true',
      LOG_LEVEL: 'debug'
    },
    stdio: ['pipe', 'pipe', 'pipe']
  });

  // Collect responses
  let responseBuffer = '';
  const responses = [];
  
  server.stdout.on('data', (data) => {
    responseBuffer += data.toString();
    const response = parseResponse(responseBuffer);
    if (response) {
      responses.push(response);
      responseBuffer = '';
    }
  });

  server.stderr.on('data', (data) => {
    // Server logs go to stderr
    if (process.env.DEBUG) {
      console.error('Server log:', data.toString());
    }
  });

  // Wait for server to start
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Initialize connection
  server.stdin.write(createRequest('initialize', {
    protocolVersion: '0.1.0',
    capabilities: {},
    clientInfo: {
      name: 'mysql-mcp-test',
      version: '1.0.0'
    }
  }, 1));

  // Wait for initialization
  await new Promise(resolve => setTimeout(resolve, 500));

  const tests = [
    // Test 1: List tools
    {
      name: 'List available tools',
      request: createRequest('tools/list', {}, 2),
      validate: (response) => {
        if (response.error) return false;
        const tools = response.result?.tools || [];
        console.log(`  Found ${tools.length} tools`);
        const toolNames = tools.map(t => t.name);
        console.log(`  Tools: ${toolNames.join(', ')}`);
        return tools.length > 0;
      }
    },

    // Test 2: List tables
    {
      name: 'list_tables tool',
      request: createRequest('tools/call', {
        name: 'list_tables',
        arguments: {}
      }, 3),
      validate: (response) => {
        if (response.error) {
          console.log(`  Error: ${response.error.message}`);
          return false;
        }
        const content = response.result?.content?.[0];
        console.log(`  Response: ${content?.text?.substring(0, 100)}...`);
        return !response.error;
      }
    },

    // Test 3: Create table
    {
      name: 'create_table tool',
      request: createRequest('tools/call', {
        name: 'create_table',
        arguments: {
          table: TEST_TABLE_NAME,
          columns: [
            { name: 'id', type: 'INT', primaryKey: true, autoIncrement: true },
            { name: 'name', type: 'VARCHAR(100)', notNull: true },
            { name: 'email', type: 'VARCHAR(255)', unique: true },
            { name: 'created_at', type: 'TIMESTAMP', default: 'CURRENT_TIMESTAMP' }
          ]
        }
      }, 4),
      validate: (response) => {
        if (response.error) {
          console.log(`  Error: ${response.error.message}`);
          return false;
        }
        console.log(`  Table ${TEST_TABLE_NAME} created successfully`);
        return !response.error;
      }
    },

    // Test 4: Describe table
    {
      name: 'describe_table tool',
      request: createRequest('tools/call', {
        name: 'describe_table',
        arguments: {
          table: TEST_TABLE_NAME
        }
      }, 5),
      validate: (response) => {
        if (response.error) {
          console.log(`  Error: ${response.error.message}`);
          return false;
        }
        const content = response.result?.content?.[0];
        console.log(`  Table schema retrieved`);
        return !response.error;
      }
    },

    // Test 5: Insert data
    {
      name: 'insert tool',
      request: createRequest('tools/call', {
        name: 'insert',
        arguments: {
          table: TEST_TABLE_NAME,
          data: {
            name: 'Test User',
            email: 'test@example.com'
          }
        }
      }, 6),
      validate: (response) => {
        if (response.error) {
          console.log(`  Error: ${response.error.message}`);
          return false;
        }
        console.log(`  Data inserted successfully`);
        return !response.error;
      }
    },

    // Test 6: Query data
    {
      name: 'query tool',
      request: createRequest('tools/call', {
        name: 'query',
        arguments: {
          sql: `SELECT * FROM ${TEST_TABLE_NAME}`
        }
      }, 7),
      validate: (response) => {
        if (response.error) {
          console.log(`  Error: ${response.error.message}`);
          return false;
        }
        console.log(`  Query executed successfully`);
        return !response.error;
      }
    },

    // Test 7: Database info
    {
      name: 'database_info tool',
      request: createRequest('tools/call', {
        name: 'database_info',
        arguments: {}
      }, 8),
      validate: (response) => {
        if (response.error) {
          console.log(`  Error: ${response.error.message}`);
          return false;
        }
        console.log(`  Database info retrieved`);
        return !response.error;
      }
    },

    // Test 8: Drop test table (cleanup)
    {
      name: 'Cleanup - Drop test table',
      request: createRequest('tools/call', {
        name: 'query',
        arguments: {
          sql: `DROP TABLE IF EXISTS ${TEST_TABLE_NAME}`
        }
      }, 9),
      validate: (response) => {
        console.log(`  Test table dropped`);
        return true;
      }
    }
  ];

  // Run all tests
  let passedTests = 0;
  let failedTests = 0;

  for (const test of tests) {
    console.log(`\nTesting: ${test.name}`);
    
    // Clear previous responses
    responses.length = 0;
    
    // Send request
    server.stdin.write(test.request);
    
    // Wait for response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find the response with matching ID
    const response = responses.find(r => r.id === JSON.parse(test.request).id);
    
    if (!response) {
      console.log(`  ❌ FAIL: No response received`);
      failedTests++;
      continue;
    }
    
    // Validate response
    const passed = test.validate(response);
    
    if (passed) {
      console.log(`  ✅ PASS`);
      passedTests++;
    } else {
      console.log(`  ❌ FAIL`);
      failedTests++;
    }
  }

  // Print summary
  console.log('\n========================================');
  console.log('TEST SUMMARY');
  console.log('========================================\n');
  console.log(`Total Tests: ${tests.length}`);
  console.log(`✅ Passed: ${passedTests}`);
  console.log(`❌ Failed: ${failedTests}`);
  console.log(`Success Rate: ${((passedTests / tests.length) * 100).toFixed(1)}%\n`);

  // Kill the server
  server.kill();
}

// Run tests
runTests().catch(console.error);