# Relay for Android

Kotlin/Compose host: CameraX and ML Kit scan; `LynxView` renders OpenUI. Camera frames never enter Lynx.

## Build

Requirements: Android Studio with SDK 37, JDK 17+, and Node 24+ from the repo.

```bash
pnpm --filter @relay/lynx build
./scripts/sync-lynx-bundle.sh
./gradlew :app:assembleDebug
```

## Notes

- Hosts and bundle pin stable Lynx/PrimJS `3.8.0`; stable `3.9.0` artifacts are unavailable in Maven Central/CocoaPods.
- Edit `../../assets/brand/relay-app-icon.svg`, then regenerate platform icons.
- `RelayBridge` exposes only haptics, accessibility announcements, and confirmation.
