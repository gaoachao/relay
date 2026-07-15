# Relay for iOS

SwiftUI host: VisionKit scans, SwiftUI handles navigation/confirmation, and `LynxView` renders OpenUI.

## Build

Requirements: Xcode 16+, XcodeGen 2.41+, CocoaPods 1.11.3+, Ruby 2.6.10+.

```bash
pnpm --filter @relay/lynx build
./scripts/sync-lynx-bundle.sh
xcodegen generate
pod install
open Relay.xcworkspace
```

## Notes

- Hosts and bundle pin stable Lynx/PrimJS `3.8.0`; stable `3.9.0` artifacts are unavailable in CocoaPods/Maven Central.
- Rebuild and sync the bundle after Lynx changes.
- Change the SVG master, then run `./scripts/generate-app-icon.sh`; never edit `AppIcon-1024.png` directly.
- `RelayBridge` exposes only haptics, accessibility announcements, and confirmation.
