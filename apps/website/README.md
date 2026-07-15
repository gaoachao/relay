# Relay website

React/Rsbuild bilingual product site: [gaoachao.github.io/relay](https://gaoachao.github.io/relay/).

## Run

```bash
pnpm --filter @relay/website dev
pnpm --filter @relay/website test
pnpm --filter @relay/website build
```

## Notes

- `/` selects a locale; `/zh/` and `/en/` are real generated HTML entries.
- GitHub Pages sets `RELAY_BASE_PATH=/relay/`; local development uses `/`.
