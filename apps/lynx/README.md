# Relay Lynx surface

Shared OpenUI renderer for iOS and Android. Native hosts retain cameras, permissions, navigation, and dialogs.

## Commands

```bash
pnpm --filter @relay/lynx dev
pnpm --filter @relay/lynx typecheck
pnpm --filter @relay/lynx build
```

`build` emits `dist/main.lynx.bundle`. Sync that file into each native app with
its `scripts/sync-lynx-bundle.sh` helper before running the host.

## Notes

- Bundle `engineVersion` is `3.8`, matching both hosts.
- Custom names must match `@relay/openui-catalog`; `Stack` is built-in and `root` is an assignment.
- `RelayBridge` permits only haptics, announcements, and confirmation—never arbitrary native calls or equipment control.
