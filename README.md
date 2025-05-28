1. Start a redis instance locally with docker
```bash
docker run --rm -it -p 6379:6379 redis:alpine
```

2. Install dependencies
```bash
pnpm install
```

3. On a terminal run
```bash
pnpm run server
```

4. On a different terminal run
```bash
pnpm run client
```

Note: \
There are two queues for this to work: `mcp_read` and `mcp_write`. Youn can subscribe both to see the messages around


## Example output

```json
PING example
Response from ping: {}
-------------------------------

LIST TOOLS example
Response from listTools: {
  "tools": [
    {
      "name": "add",
      "inputSchema": {
        "type": "object",
        "properties": {
          "a": {
            "type": "number"
          },
          "b": {
            "type": "number"
          }
        },
        "required": [
          "a",
          "b"
        ],
        "additionalProperties": false,
        "$schema": "http://json-schema.org/draft-07/schema#"
      }
    }
  ]
}
-------------------------------

CALL TOOL example
Response from toolCall: {
  "content": [
    {
      "type": "text",
      "text": "15"
    }
  ]
}
-------------------------------
```

# Full Chat Agent example
1. Start a redis instance locally with docker
```bash
docker run --rm -it -p 6379:6379 redis:alpine
```
2. On a terminal run
```bash
pnpm run server
```
3. On another terminal run
```bash
pnpm run chat-example
```
You should see in the console the response of the agent call. This is an example of it
```json
{
  messages: [
    HumanMessage {
      "id": "af69fbef-732c-439d-85ce-fdf209dde4e1",
      "content": "what's (3245 + 51234)? Use `add` tool for calculation",
      "additional_kwargs": {},
      "response_metadata": {}
    },
    AIMessage {
      "id": "eb198fd6-0c0a-469a-9a44-d1fbe2b0ea6f",
      "content": "",
      "additional_kwargs": {},
      "response_metadata": {
        "model": "llama3.2",
        "created_at": "2025-05-28T16:34:19.859131Z",
        "done_reason": "stop",
        "done": true,
        "total_duration": 580539000,
        "load_duration": 30721917,
        "prompt_eval_count": 172,
        "prompt_eval_duration": 276149667,
        "eval_count": 24,
        "eval_duration": 273054125
      },
      "tool_calls": [
        {
          "name": "add",
          "args": {
            "a": 3245,
            "b": 51234
          },
          "id": "9b7fd068-a8ea-4aa1-b2e9-55a37c6583d8",
          "type": "tool_call"
        }
      ],
      "invalid_tool_calls": [],
      "usage_metadata": {
        "input_tokens": 172,
        "output_tokens": 24,
        "total_tokens": 196
      }
    },
    ToolMessage {
      "id": "c0d560cf-f2e1-43fc-83ee-18a8d218c96a",
      "content": "54479",
      "name": "add",
      "additional_kwargs": {},
      "response_metadata": {},
      "tool_call_id": "9b7fd068-a8ea-4aa1-b2e9-55a37c6583d8",
      "artifact": []
    },
    AIMessage {
      "id": "1dcc7a0d-bd4f-463f-b7fb-eaefb44e96f9",
      "content": "The result of the calculation is: 54479",
      "additional_kwargs": {},
      "response_metadata": {
        "model": "llama3.2",
        "created_at": "2025-05-28T16:34:20.104369Z",
        "done_reason": "stop",
        "done": true,
        "total_duration": 208740875,
        "load_duration": 12902666,
        "prompt_eval_count": 87,
        "prompt_eval_duration": 78981209,
        "eval_count": 11,
        "eval_duration": 116122125
      },
      "tool_calls": [],
      "invalid_tool_calls": [],
      "usage_metadata": {
        "input_tokens": 87,
        "output_tokens": 11,
        "total_tokens": 98
      }
    }
  ]
}
```
We can see the tool call here that was done through pubsub transport