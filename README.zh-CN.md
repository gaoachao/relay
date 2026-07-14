# Relay

**为眼前的设备，生成更好用的界面。**

对准面板，说出目标。Relay 会把陌生的物理控件，变成清晰、无障碍的操作界面。

[网站](https://gaoachao.github.io/relay/) · [English](./README.md)

## 开始

```bash
corepack enable
pnpm install
pnpm dev
```

本地演示不需要 API Key。未配置模型时，Agent 会返回可复现的 OpenUI 流。

## 五个模块

- `apps/ios` — Swift 原生容器与 LynxView
- `apps/android` — Kotlin 原生容器与 LynxView
- `apps/lynx` — 共享的 ReactLynx OpenUI 界面
- `apps/agent` — 有输入校验的流式 Agent 网关
- `apps/website` — `/en/` 与 `/zh/` 双语官网

共享数据协议位于 `packages/contracts`。生成式界面的组件白名单位于 `packages/openui-catalog`。

## 技术栈

Swift · Kotlin · [Lynx](https://lynxjs.org/guide/start/integrate-with-existing-apps) · [OpenUI](https://lynxjs.org/next/react/genui/openui.html) · ReactLynx · Hono · OpenAI Responses API · Rsbuild · pnpm · Turborepo

## 开发

```bash
pnpm check
pnpm --filter @relay/website dev
pnpm --filter @relay/agent dev
```

需要细节时，再阅读[架构](./docs/architecture.md)、[开发](./docs/development.md)与[安全](./docs/security.md)。
