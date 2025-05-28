import { createClient } from 'redis';
import { JSONRPCMessage } from '@modelcontextprotocol/sdk/types.js';

const client = createClient({ url: 'redis://localhost:6379' });
await client.connect();
const message: JSONRPCMessage = {
  jsonrpc: '2.0',
  id: '1',
  method: 'tools/call',
  // params: { a: 5, b: 10 },
}

await client.publish('mcp_read', JSON.stringify(message));
await client.quit();