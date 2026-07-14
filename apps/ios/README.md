# Relay for iOS

The iOS app is a native SwiftUI shell. VisionKit owns scanning, SwiftUI owns
navigation and confirmation, and one `LynxView` renders the generated OpenUI
surface.

## Bootstrap

Requirements: Xcode 16+, XcodeGen 2.41+, CocoaPods 1.11.3+, Ruby 2.6.10+.

```bash
pnpm --filter @relay/lynx build
./scripts/sync-lynx-bundle.sh
xcodegen generate
pod install
open Relay.xcworkspace
```

Lynx and PrimJS are pinned to the stable, reproducible `3.8.0` release. The
current Lynx `next` guide references PrimJS `3.9.0`, but that stable artifact is
not published for either CocoaPods or Maven Central, so Relay does not depend on
an alpha or a same-day replacement. The embedded bundle must be rebuilt and
synced after every production Lynx change.

The checked-in `AppIcon-1024.png` is generated from the single brand master at
`../../assets/brand/relay-app-icon.svg`; do not redraw or edit the raster. Run
`./scripts/generate-app-icon.sh` after changing the master.

`RelayBridge` has a deliberately small API. It can request haptics, post an
accessibility announcement, or show a native confirmation. It cannot control a
physical device.
