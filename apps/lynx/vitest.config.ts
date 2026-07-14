import { defineConfig } from 'vitest/config'

export default defineConfig({
  logLevel: 'error',
  resolve: {
    noExternal: true,
  },
  test: {
    environment: 'node',
    setupFiles: ['./src/test/setup.ts'],
  },
})
