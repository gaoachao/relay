import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginTypeCheck } from '@rsbuild/plugin-type-check'

type PageName = 'index' | 'zh' | 'en'

const basePath = process.env.RELAY_BASE_PATH ?? '/'

const pageMetadata: Record<
  PageName,
  {
    description: string
    locale: string
    title: string
  }
> = {
  index: {
    locale: 'en',
    title: 'Relay — Every machine, made for you',
    description:
      'Point the camera and say what you need. Relay turns unfamiliar controls into a clear, accessible interface.',
  },
  zh: {
    locale: 'zh-CN',
    title: 'Relay — 设备再陌生，也能轻松上手',
    description: '对准设备，说出要做什么。Relay 会把陌生面板变成清楚、顺手的操作界面。',
  },
  en: {
    locale: 'en',
    title: 'Relay — Every machine, made for you',
    description:
      'Point the camera and say what you need. Relay turns unfamiliar controls into a clear, accessible interface.',
  },
}

export default defineConfig({
  plugins: [pluginReact(), pluginTypeCheck()],
  source: {
    entry: {
      index: './src/entries/root.tsx',
      zh: './src/entries/zh.tsx',
      en: './src/entries/en.tsx',
    },
  },
  html: {
    favicon: './src/assets/relay-app-icon.svg',
    template: './src/index.html',
    title({ entryName }) {
      return pageMetadata[entryName as PageName].title
    },
    templateParameters({ entryName }) {
      return {
        ...pageMetadata[entryName as PageName],
        alternatePrefix: entryName === 'index' ? './' : '../',
      }
    },
  },
  server: {
    base: basePath,
  },
  output: {
    assetPrefix: basePath,
    cleanDistPath: true,
    legalComments: 'none',
    sourceMap: false,
    overrideBrowserslist: ['iOS >= 16.4', 'Safari >= 16.4', 'Chrome >= 111', 'Edge >= 111'],
  },
  tools: {
    htmlPlugin(config, { entryName }) {
      config.filename = entryName === 'index' ? 'index.html' : `${entryName}/index.html`
    },
  },
})
