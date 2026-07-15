# Relay website

React/Rsbuild bilingual product site: [gaoachao.github.io/relay](https://gaoachao.github.io/relay/).

## Run

```bash
pnpm --filter @relay/website dev
pnpm --filter @relay/website test
pnpm --filter @relay/website build
```

## Notes

- `/` renders English directly; `/zh/` and `/en/` remain standalone entries.
- GitHub Pages sets `RELAY_BASE_PATH=/relay/`; local development uses `/`.
