# Relay agent guide

Keep the product direct. Short copy. One primary action. No dashboard filler.

## Commands

```bash
pnpm install
pnpm dev
pnpm check
```

## Boundaries

- Native capability stays in `apps/ios` and `apps/android`.
- Shared UI stays in `apps/lynx`.
- API keys stay in `apps/agent`.
- Runtime schemas stay in `packages/contracts`.
- Generative components must be registered in `packages/openui-catalog` and the Lynx library.
- Website content must remain available in English and Chinese.

## Changes

- Parse external input at the boundary with Zod.
- Keep OpenUI streaming cumulative; the renderer receives the full response-so-far.
- Add `VerifyGate` for uncertain or risky actions.
- Run `pnpm check` before committing.
- Do not commit generated bundles, secrets, Pods, Gradle caches, or build output.
