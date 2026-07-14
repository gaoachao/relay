# Relay for Android

The Android app is a native Kotlin and Jetpack Compose shell. CameraX plus the
bundled ML Kit recognizer own scanning; a separate `LynxView` renders the
generated OpenUI surface. Camera frames never enter Lynx.

## Bootstrap

Requirements: Android Studio with SDK 37, JDK 17+, and Node 24+ from the repo.

```bash
pnpm --filter @relay/lynx build
./scripts/sync-lynx-bundle.sh
./gradlew :app:assembleDebug
```

Lynx, Lynx JSSDK, Lynx Trace, and PrimJS are pinned to the stable, reproducible
`3.8.0` release, matching the bundle's `engineVersion: '3.8'`. The current Lynx
`next` guide references PrimJS `3.9.0`, but that stable artifact is not published
for either Maven Central or CocoaPods, so Relay does not depend on an alpha or a
same-day replacement.

The adaptive and legacy launcher drawables mirror the path geometry in the
single brand master at `../../assets/brand/relay-app-icon.svg`. Update that
master first, then regenerate platform resources; do not redraw the mark.

`RelayBridge` has only three operations: haptic feedback, an accessibility
announcement, and a native confirmation dialog. It cannot control a physical
device or invoke arbitrary native functionality.
