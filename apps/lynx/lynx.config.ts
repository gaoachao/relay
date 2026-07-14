import { pluginReactLynx } from '@lynx-js/react-rsbuild-plugin'
import { defineConfig } from '@lynx-js/rspeedy'

export default defineConfig({
  source: {
    entry: {
      main: './src/index.tsx',
    },
  },
  output: {
    cleanDistPath: true,
    filename: {
      bundle: '[name].lynx.bundle',
    },
    sourceMap: {
      css: false,
      js: process.env.NODE_ENV === 'production' ? false : 'cheap-module-source-map',
    },
  },
  plugins: [
    pluginReactLynx({
      enableAccessibilityElement: true,
      engineVersion: '3.8',
    }),
  ],
})
