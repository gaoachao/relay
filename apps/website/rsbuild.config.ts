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
    title: 'Relay — 让机器适应你',
    description: '扫描设备。Relay 通过 Native、Lynx 与 OpenUI 生成任务界面。',
  },
  zh: {
    locale: 'zh-CN',
    title: 'Relay — 让机器适应你',
    description: '扫描设备。Relay 通过 Native、Lynx 与 OpenUI 生成任务界面。',
  },
  en: {
    locale: 'en',
    title: 'Relay — Machines, adapted',
    description:
      'Scan a device. Relay uses Native, Lynx, and OpenUI to generate the task interface.',
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
