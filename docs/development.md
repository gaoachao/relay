# Development

## Requirements

Node.js 24.14+ · pnpm 11.7 · Xcode/CocoaPods · Android Studio/SDK

## Workspace

```bash
corepack enable
pnpm install
pnpm dev
pnpm check
```

Run one package with `pnpm --filter @relay/<name> dev`. `pnpm check` lints, type-checks, tests, and builds every JavaScript package.

## Agent

```bash
cp .env.example apps/agent/.env
```

Without `OPENAI_API_KEY`, the Agent uses its mock. Keys must stay server-side.

## Native hosts

Build and sync Lynx before opening a host. Platform setup and checks live in the [iOS](../apps/ios/README.md) and [Android](../apps/android/README.md) READMEs.
