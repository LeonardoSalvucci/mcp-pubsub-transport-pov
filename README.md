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
pnpm tsx server.ts
```

4. On a different terminal run
```bash
pnpm tsx client.ts
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