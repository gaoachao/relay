# Relay Agent

```bash
cp apps/agent/.env.example apps/agent/.env
pnpm --filter @relay/agent dev
curl http://localhost:8787/health
```

## API

`POST /v1/openui/stream` returns cumulative OpenUI Lang over SSE.

```json
{
  "prompt": "Generate a one-hand control flow",
  "locale": "en-US",
  "provider": "auto",
  "context": {
    "deviceLabel": "Microwave panel",
    "task": "Heat for 30 seconds",
    "accessModes": ["one-hand"]
  }
}
```

Each event carries the full response produced so far:

```json
{
  "type": "openui.delta",
  "response": "root = Stack([step])",
  "isStreaming": true,
  "requestId": "..."
}
```

The last event uses `type: "openui.complete"` and `isStreaming: false`.

The server consumes OpenAI Responses API events `response.output_text.delta` and
`response.completed`. Reasoning and tool-call events are not forwarded. See the
[official streaming event reference](https://platform.openai.com/docs/api-reference/responses-streaming).

## Runtime

- `auto`: OpenAI when `OPENAI_API_KEY` exists; mock otherwise.
- `openai`: require a server-side key.
- `mock`: deterministic offline stream.

The mock fallback runs only before the first OpenAI text delta. This prevents a
partial model response and a mock response from being joined into invalid OpenUI.

The server binds to `127.0.0.1` by default, caps request bodies at 64 KiB, and
caps model output. Set `HOST=0.0.0.0` explicitly only when testing from a device.

Browser origins are exact-match allowlisted through `CORS_ALLOWED_ORIGINS`.
Native clients without an `Origin` header are allowed. Wildcard CORS is rejected
in production.

Transport events come from `@relay/contracts`. Component names and base model
instructions come from `@relay/openui-catalog`.
