import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { z } from 'zod';
import { type CallToolRequest, PingRequest,ListToolsRequest , CallToolResultSchema, LoggingMessageNotificationSchema, ListToolsResultSchema } from '@modelcontextprotocol/sdk/types.js';
import { PubSubTransport } from './pubsubTransport.js';

const client = new Client({
  name: 'Demo PubSub Transport Client',
  version: '1.0.0',
})

const transport = new PubSubTransport('mcp_write', 'mcp_read'); // switch as this is the client side transport
await client.connect(transport);

// example of pinging the server
console.log('PING example')
const pingCall: PingRequest = {
  method: 'ping',
}
const pingResponse = await client.request(pingCall, z.object({}));
console.log('Response from ping:', JSON.stringify(pingResponse, null, 2));
console.log('-------------------------------');
console.log('')
// -------------------------------

// example of listing tools
console.log('LIST TOOLS example')
const listToolsCall: ListToolsRequest = {
  method: 'tools/list',
}
const toolsResponse = await client.request(listToolsCall, ListToolsResultSchema);
console.log('Response from listTools:', JSON.stringify(toolsResponse, null, 2));
console.log('-------------------------------');
console.log('')
// -------------------------------

// example of calling a tool
console.log('CALL TOOL example')
const toolCall: CallToolRequest = {
  method: 'tools/call',
  params: {
    name: 'add',
    arguments: { a: 5, b: 10 }
  }
}
const response = await client.request(toolCall, CallToolResultSchema);
console.log('Response from toolCall:', JSON.stringify(response, null, 2));
console.log('-------------------------------');
// -------------------------------

// await client.close();