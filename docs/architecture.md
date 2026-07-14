# Architecture

Relay keeps native capabilities native and generated UI constrained.

```text
Camera + intent
      ↓
Native shell → Agent gateway → cumulative OpenUI stream
      ↑                              ↓
RelayBridge  ← ReactLynx actions ← Lynx renderer
```

## Boundaries

| Layer | Owns | Does not own |
| --- | --- | --- |
| iOS / Android | Camera, permission, haptics, speech, Lynx lifecycle | Model keys, generated layouts |
| ReactLynx | OpenUI renderer, accessible components, view state | Camera APIs, arbitrary native calls |
| Agent | Validation, model call, cumulative SSE, mock stream | Device permissions, direct equipment control |
| Website | Bilingual story and demo entry points | Runtime secrets |

`RelayBridge` is the narrow native boundary. Its callable surface is declared in
`apps/lynx/src/bridge/native-modules.d.ts` and mirrored by both native hosts.

## Request flow

1. The native shell captures a panel observation and a spoken or typed goal.
2. The client maps that state to `OpenUiGenerationRequest` and sends it to `POST /v1/openui/stream`.
3. The Agent validates the payload and selects the Relay component catalog.
4. The response arrives as cumulative OpenUI over server-sent events.
5. `OpenUiRenderer` updates the ReactLynx surface while streaming.
6. A user action crosses `RelayBridge` only when native capability is required.
7. Medium- and high-risk actions stop at `VerifyGate` for explicit confirmation.

## Why these choices

- Native shells preserve platform camera, permission, and accessibility behavior.
- Lynx shares one high-performance UI implementation across iOS and Android.
- OpenUI limits generation to known components instead of arbitrary code.
- A server gateway keeps model credentials and prompt policy off-device.
- Shared Zod contracts reject malformed data at trust boundaries.
- A deterministic mock keeps the demo usable without network or model access.

## Repository

```text
apps/
  android/   Kotlin host
  ios/       Swift host
  lynx/      ReactLynx UI
  agent/     OpenUI stream gateway
  website/   bilingual Rsbuild site
packages/
  contracts/       runtime schemas and shared types
  openui-catalog/  component names and generation policy
assets/
  brand/     SVG master
docs/        architecture, development, security
```

This split makes each runtime independently deployable while keeping the protocol shared.
