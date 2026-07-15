# Relay Agent

Validates generation requests and streams cumulative OpenUI over SSE.

## Run

```bash
cp apps/agent/.env.example apps/agent/.env
pnpm --filter @relay/agent dev
curl http://localhost:8787/health
```

## Contract

`POST /v1/openui/stream` accepts `OpenUiGenerationRequest` and emits cumulative `openui.delta` events, then `openui.complete`. Contracts come from `@relay/contracts`; generation policy comes from `@relay/openui-catalog`.

## Runtime notes

- `auto` uses OpenAI when keyed, otherwise mock; `openai` requires a key; `mock` is offline.
- Mock fallback is allowed only before the first model text delta.
- The server binds to `127.0.0.1` and caps bodies at 64 KiB. Use `HOST=0.0.0.0` only for device testing.
- `CORS_ALLOWED_ORIGINS` is exact-match; production rejects wildcard CORS.
