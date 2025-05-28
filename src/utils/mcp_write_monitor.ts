import { createClient } from 'redis';
const client = createClient({ url: 'redis://localhost:6379' });
await client.connect();
await client.subscribe('mcp_write', (message) => {
  console.log('Received message on mcp_write topic:', message);
  // Here you can process the message as needed
}
);