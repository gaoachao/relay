# Relay

**A better interface for what is in front of you.**

Point the camera. Say what you need. Relay turns an unfamiliar control panel into a clear, accessible interface.

[Website](https://gaoachao.github.io/relay/) · [中文](./README.zh-CN.md)

## Start

```bash
corepack enable
pnpm install
pnpm dev
```

No API key is required for the local demo. The agent falls back to a deterministic OpenUI stream.

## Surfaces

- `apps/ios` — native Swift host and LynxView
- `apps/android` — native Kotlin host and LynxView
- `apps/lynx` — shared ReactLynx OpenUI surface
- `apps/agent` — validated, streaming Agent gateway
- `apps/website` — bilingual product site at `/en/` and `/zh/`

Shared contracts live in `packages/contracts`. The allowed generative UI lives in `packages/openui-catalog`.

## Stack

Swift · Kotlin · [Lynx](https://lynxjs.org/guide/start/integrate-with-existing-apps) · [OpenUI](https://lynxjs.org/next/react/genui/openui.html) · ReactLynx · Hono · OpenAI Responses API · Rsbuild · pnpm · Turborepo

## Work

```bash
pnpm check
pnpm --filter @relay/website dev
pnpm --filter @relay/agent dev
```

Read [architecture](./docs/architecture.md), [development](./docs/development.md), and [security](./docs/security.md) when you need the detail.
