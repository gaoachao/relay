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
    locale: 'zh-CN',
    title: 'Relay — A better interface for what’s in front of you',
    description: 'Relay 把复杂的实体设备面板翻译成适合当前用户与任务的操作界面。',
  },
  zh: {
    locale: 'zh-CN',
    title: 'Relay — 为眼前的设备，生成更好用的界面',
    description:
      '扫描眼前的设备面板。Relay 通过 Native、Lynx 与 OpenUI，生成更容易看、听、触摸和完成的操作界面。',
  },
  en: {
    locale: 'en',
    title: 'Relay — A better interface for what’s in front of you',
    description:
      'Scan a physical control panel. Relay uses Native, Lynx, and OpenUI to generate an interface that is easier to see, hear, touch, and complete.',
  },
}

export default defineConfig({
  plugins: [pluginReact(), pluginTypeCheck()],
  source: {
    entry: {
      index: './src/entries/root.ts',
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
