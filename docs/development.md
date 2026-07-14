# Development

## Requirements

- Node.js 24.14 or newer
- pnpm 11.7
- Xcode and CocoaPods for iOS
- Android Studio and an Android SDK for Android

## JavaScript workspace

```bash
corepack enable
pnpm install
pnpm dev
```

Run one surface when you want a quieter loop:

```bash
pnpm --filter @relay/website dev
pnpm --filter @relay/lynx dev
pnpm --filter @relay/agent dev
```

The Agent uses its deterministic mock when `OPENAI_API_KEY` is empty. To use a model:

```bash
cp .env.example apps/agent/.env
```

Keep the key in the Agent environment. Never add it to an app bundle.

## Native hosts

Follow each host README for its one-time setup:

- [iOS](../apps/ios/README.md)
- [Android](../apps/android/README.md)

Build the Lynx bundle before opening a host when you change `apps/lynx`.

## Quality

```bash
pnpm check
```

That command lints, type-checks, tests, and builds every JavaScript workspace. Native hosts retain their platform checks.
