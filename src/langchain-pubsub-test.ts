import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { ChatOllama } from '@langchain/ollama'
import { PubSubTransport } from './mcp/pubsubTransport.js'
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { loadMcpTools } from "@langchain/mcp-adapters";

const model = new ChatOllama({
    model: 'llama3.2',
    temperature: 1,

})
const client = new Client({
  name: 'Demo PubSub Transport Client',
  version: '1.0.0',
})
const transport = new PubSubTransport('mcp_write', 'mcp_read'); // switch as this is the client side transport
await client.connect(transport);

const tools = await loadMcpTools("Demo", client)

// Create and run the agent
try {
  const agent = createReactAgent({ llm: model, tools });
  const agentResponse = await agent.invoke({
    messages: [{ role: "user", content: "what's (3245 + 51234)? Use `add` tool for calculation" }],
  });
  console.log(agentResponse);
} catch (e) {
  console.error(e);
} finally {
  // Clean up connection
  await client.close();
}