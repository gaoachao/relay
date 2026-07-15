# Architecture

Native shells own device capabilities. Lynx renders only catalog-constrained UI.

```text
Camera + intent
      ↓
Native shell → Agent gateway → cumulative OpenUI stream
      ↑                              ↓
RelayBridge  ← ReactLynx actions ← Lynx renderer
```

## Boundaries

| Layer | Owns |
| --- | --- |
| iOS / Android | Camera, permissions, haptics, speech, Lynx lifecycle |
| ReactLynx | OpenUI rendering, accessible components, view state |
| Agent | Validation, model calls, cumulative SSE, mock stream |
| Website | Bilingual product story |

`RelayBridge` is the only generated-to-native boundary. Its type declaration in `apps/lynx/src/bridge/native-modules.d.ts` is mirrored by both hosts.

## Flow

1. A host captures a panel and goal, then sends `OpenUiGenerationRequest` to `POST /v1/openui/stream`.
2. The Agent validates it and streams cumulative OpenUI from the Relay catalog.
3. `OpenUiRenderer` updates the Lynx surface.
4. Native-only actions cross `RelayBridge`; risky actions stop at `VerifyGate`.

## Constraints

- `packages/contracts` validates every trust boundary.
- `packages/openui-catalog` is the generated component allowlist.
- Model credentials and prompt policy remain server-side.
- The deterministic mock works without network access.
- Each runtime deploys independently while sharing the protocol.
