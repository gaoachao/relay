# Relay

**为眼前的设备，生成更好用的界面。**

对准面板，说出目标。Relay 将陌生控件转为无障碍操作指引。

[网站](https://gaoachao.github.io/relay/) · [English](./README.md)

## 运行

```bash
corepack enable
pnpm install
pnpm dev
```

无需 API Key；本地 Agent 默认返回可复现的 OpenUI 流。

## 仓库

- `apps/ios`、`apps/android` — 原生容器
- `apps/lynx` — 共享 OpenUI 界面
- `apps/agent` — 流式模型网关
- `apps/website` — 双语官网
- `packages` — 协议与组件目录

## 检查

```bash
pnpm check
```

[架构](./docs/architecture.md) · [开发](./docs/development.md) · [安全](./docs/security.md)
