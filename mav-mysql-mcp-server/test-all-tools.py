#!/usr/bin/env python3
"""
Comprehensive test suite for MySQL MCP Server tools
Tests all available tools with various scenarios
"""

import json
import subprocess
import time
import sys
import os
from datetime import datetime

class MCPToolTester:
    def __init__(self):
        self.server_path = os.path.join(os.path.dirname(__file__), 'build', 'index.js')
        self.test_table = f'mcp_test_{int(time.time())}'
        self.server_process = None
        self.test_results = []
        
    def start_server(self):
        """Start the MCP server with write operations enabled"""
        env = os.environ.copy()
        env['ALLOW_WRITE_OPERATIONS'] = 'true'
        
        print(f"Starting MCP server at: {self.server_path}")
        self.server_process = subprocess.Popen(
            ['node', self.server_path],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            env=env,
            text=True,
            bufsize=0
        )
        
        # Initialize the connection
        self.send_request({
            "jsonrpc": "2.0",
            "method": "initialize",
            "params": {
                "protocolVersion": "0.1.0",
                "capabilities": {},
                "clientInfo": {
                    "name": "mysql-test-client",
                    "version": "1.0.0"
                }
            },
            "id": 1
        })
        
        # Wait for initialization
        time.sleep(1)
        self.read_response()
        
    def send_request(self, request):
        """Send a JSON-RPC request to the server"""
        request_str = json.dumps(request) + '\n'
        self.server_process.stdin.write(request_str)
        self.server_process.stdin.flush()
        
    def read_response(self, timeout=2):
        """Read and parse response from server"""
        import select
        
        # Use select to read with timeout
        ready, _, _ = select.select([self.server_process.stdout], [], [], timeout)
        if ready:
            response_line = self.server_process.stdout.readline()
            if response_line:
                try:
                    return json.loads(response_line)
                except json.JSONDecodeError:
                    print(f"Failed to parse response: {response_line}")
        return None
        
    def call_tool(self, tool_name, arguments, test_name):
        """Call a tool and record the result"""
        request_id = len(self.test_results) + 10
        
        print(f"\n{'='*60}")
        print(f"Test: {test_name}")
        print(f"Tool: {tool_name}")
        print(f"Args: {json.dumps(arguments, indent=2)}")
        
        self.send_request({
            "jsonrpc": "2.0",
            "method": "tools/call",
            "params": {
                "name": tool_name,
                "arguments": arguments
            },
            "id": request_id
        })
        
        response = self.read_response()
        
        if response:
            if 'error' in response:
                print(f"❌ FAIL: {response['error'].get('message', 'Unknown error')}")
                self.test_results.append({
                    'test': test_name,
                    'tool': tool_name,
                    'status': 'FAIL',
                    'error': response['error']
                })
            else:
                print(f"✅ PASS")
                if 'result' in response and 'content' in response['result']:
                    content = response['result']['content'][0].get('text', '')
                    print(f"Response preview: {content[:200]}...")
                self.test_results.append({
                    'test': test_name,
                    'tool': tool_name,
                    'status': 'PASS'
                })
        else:
            print(f"❌ FAIL: No response received")
            self.test_results.append({
                'test': test_name,
                'tool': tool_name,
                'status': 'FAIL',
                'error': 'No response'
            })
            
    def run_all_tests(self):
        """Run comprehensive tests for all tools"""
        print("🚀 MySQL MCP Server Tool Test Suite\n")
        
        # Test 1: List available tools
        self.send_request({
            "jsonrpc": "2.0",
            "method": "tools/list",
            "params": {},
            "id": 2
        })
        response = self.read_response()
        if response and 'result' in response:
            tools = response['result'].get('tools', [])
            print(f"Found {len(tools)} tools:")
            for tool in tools:
                print(f"  - {tool['name']}: {tool.get('description', '')[:60]}...")
        
        # Test 2: list_tables
        self.call_tool('list_tables', {}, 'List all tables in database')
        
        # Test 3: database_info
        self.call_tool('database_info', {}, 'Get database information')
        
        # Test 4: create_table
        self.call_tool('create_table', {
            'table': self.test_table,
            'columns': [
                {'name': 'id', 'type': 'INT', 'primaryKey': True, 'autoIncrement': True},
                {'name': 'username', 'type': 'VARCHAR(50)', 'notNull': True, 'unique': True},
                {'name': 'email', 'type': 'VARCHAR(100)', 'notNull': True},
                {'name': 'age', 'type': 'INT'},
                {'name': 'created_at', 'type': 'TIMESTAMP', 'default': 'CURRENT_TIMESTAMP'}
            ]
        }, f'Create test table {self.test_table}')
        
        # Test 5: describe_table (the correct tool name, not 'describe')
        self.call_tool('describe_table', {
            'table': self.test_table
        }, f'Describe table {self.test_table}')
        
        # Test 6: show_indexes
        self.call_tool('show_indexes', {
            'table': self.test_table
        }, 'Show indexes on test table')
        
        # Test 7: insert
        self.call_tool('insert', {
            'table': self.test_table,
            'data': {
                'username': 'john_doe',
                'email': 'john@example.com',
                'age': 30
            }
        }, 'Insert single row')
        
        # Test 8: insert_many
        self.call_tool('insert_many', {
            'table': self.test_table,
            'rows': [
                {'username': 'jane_smith', 'email': 'jane@example.com', 'age': 25},
                {'username': 'bob_wilson', 'email': 'bob@example.com', 'age': 35}
            ]
        }, 'Insert multiple rows')
        
        # Test 9: query - SELECT all
        self.call_tool('query', {
            'sql': f'SELECT * FROM {self.test_table}'
        }, 'Select all rows')
        
        # Test 10: query - SELECT with parameters
        self.call_tool('query', {
            'sql': f'SELECT * FROM {self.test_table} WHERE age > ?',
            'params': [28]
        }, 'Select with WHERE clause and parameters')
        
        # Test 11: update
        self.call_tool('update', {
            'table': self.test_table,
            'set': {'age': 31},
            'where': {'username': 'john_doe'}
        }, 'Update a row')
        
        # Test 12: add_index
        self.call_tool('add_index', {
            'table': self.test_table,
            'indexName': 'idx_age',
            'columns': ['age']
        }, 'Add index on age column')
        
        # Test 13: explain_query
        self.call_tool('explain_query', {
            'sql': f'SELECT * FROM {self.test_table} WHERE age > 25'
        }, 'Explain query execution plan')
        
        # Test 14: show_constraints
        self.call_tool('show_constraints', {}, 'Show all constraints')
        
        # Test 15: add_column
        self.call_tool('add_column', {
            'table': self.test_table,
            'column': {
                'name': 'phone',
                'type': 'VARCHAR(20)'
            }
        }, 'Add new column')
        
        # Test 16: describe_table after modification
        self.call_tool('describe_table', {
            'table': self.test_table
        }, 'Verify column was added')
        
        # Test 17: delete
        self.call_tool('delete', {
            'table': self.test_table,
            'where': {'username': 'bob_wilson'}
        }, 'Delete a row')
        
        # Test 18: Error handling - invalid table
        self.call_tool('describe_table', {
            'table': 'non_existent_table_xyz'
        }, 'Error test: Non-existent table')
        
        # Test 19: Error handling - SQL injection attempt
        self.call_tool('query', {
            'sql': f"SELECT * FROM {self.test_table} WHERE username = ?",
            'params': ["'; DROP TABLE users; --"]
        }, 'Security test: SQL injection protection')
        
        # Test 20: Cleanup - drop test table
        self.call_tool('query', {
            'sql': f'DROP TABLE IF EXISTS {self.test_table}'
        }, 'Cleanup: Drop test table')
        
    def print_summary(self):
        """Print test summary"""
        print(f"\n{'='*60}")
        print("TEST SUMMARY")
        print(f"{'='*60}\n")
        
        total = len(self.test_results)
        passed = len([r for r in self.test_results if r['status'] == 'PASS'])
        failed = total - passed
        
        print(f"Total Tests: {total}")
        print(f"✅ Passed: {passed}")
        print(f"❌ Failed: {failed}")
        print(f"Success Rate: {(passed/total*100):.1f}%\n")
        
        if failed > 0:
            print("Failed Tests:")
            for result in self.test_results:
                if result['status'] == 'FAIL':
                    print(f"  - {result['test']} ({result['tool']})")
                    if 'error' in result:
                        print(f"    Error: {result['error']}")
        
        # Group by tool
        tools = {}
        for result in self.test_results:
            tool = result['tool']
            if tool not in tools:
                tools[tool] = {'passed': 0, 'total': 0}
            tools[tool]['total'] += 1
            if result['status'] == 'PASS':
                tools[tool]['passed'] += 1
        
        print("\nResults by Tool:")
        for tool, stats in sorted(tools.items()):
            print(f"  {tool}: {stats['passed']}/{stats['total']} passed")
            
    def cleanup(self):
        """Cleanup server process"""
        if self.server_process:
            self.server_process.terminate()
            self.server_process.wait()

def main():
    tester = MCPToolTester()
    
    try:
        tester.start_server()
        tester.run_all_tests()
        tester.print_summary()
    except Exception as e:
        print(f"\n❌ Test suite error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        tester.cleanup()

if __name__ == '__main__':
    main()