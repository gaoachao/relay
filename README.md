# Relay

**A better interface for what is in front of you.**

Point the camera. State your goal. Relay turns an unfamiliar control panel into accessible, generated guidance.

[Website](https://gaoachao.github.io/relay/) · [中文](./README.zh-CN.md)

## Run

```bash
corepack enable
pnpm install
pnpm dev
```

No API key is needed; the Agent uses a deterministic OpenUI stream locally.

## Repository

- `apps/ios`, `apps/android` — native hosts
- `apps/lynx` — shared OpenUI surface
- `apps/agent` — streaming model gateway
- `apps/website` — bilingual product site
- `packages` — contracts and component catalog

## Check

```bash
pnpm check
```

[Architecture](./docs/architecture.md) · [Development](./docs/development.md) · [Security](./docs/security.md)
