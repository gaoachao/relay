# Relay website

The bilingual product site for Relay, built with React 19, TypeScript, and Rsbuild v2.

[Live site](https://gaoachao.github.io/relay/)

## Routes

- `/zh/` — Simplified Chinese
- `/en/` — English
- `/` — redirects from the browser language to one of the routes above

Rsbuild emits real nested HTML entry points at `dist/zh/index.html` and
`dist/en/index.html`; the language routes do not depend on client-side history fallback.

## Commands

Run from the repository root:

```bash
pnpm --filter @relay/website dev
pnpm --filter @relay/website typecheck
pnpm --filter @relay/website test
pnpm --filter @relay/website build
```

The production build requires Node.js 24.14 or newer, matching the repository engine.

GitHub Pages builds with `RELAY_BASE_PATH=/relay/` so generated assets remain valid under
the repository path. Local development continues to use `/`.
