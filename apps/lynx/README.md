# Relay Lynx surface

This package renders the generated guidance surface shared by iOS and Android.
The native apps own camera access, permissions, navigation, and system dialogs.
Lynx owns only the generated content area.

## Commands

```bash
pnpm --filter @relay/lynx dev
pnpm --filter @relay/lynx typecheck
pnpm --filter @relay/lynx build
```

`build` emits `dist/main.lynx.bundle`. Sync that file into each native app with
its `scripts/sync-lynx-bundle.sh` helper before running the host.

The bundle is compiled with `engineVersion: '3.8'`. Both native hosts pin Lynx
and PrimJS to the reproducible stable `3.8.0` release, so a newer bundle cannot
silently require a newer engine. The npm packages remain independently pinned
to the versions validated in this workspace.

The custom OpenUI names exactly match `@relay/openui-catalog`: `GuidedStep`,
`PanelMap`, `ControlChoice`, `AccessModeBar`, `VerifyGate`, `ConfidenceNotice`,
and `PrimaryAction`. `Stack` comes from the standard OpenUI library; `root` is
the OpenUI program's root assignment rather than a component.

## Boundary

`RelayBridge` exposes three fixed operations: a haptic cue, an accessibility
announcement, and a confirmation dialog. It cannot open arbitrary URLs, call
arbitrary native methods, or control a physical device. Generated output is
guidance; the person remains responsible for every physical action.
