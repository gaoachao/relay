import { describe, expect, it } from 'vitest'

import { loadConfig } from '../src/config.js'

describe('loadConfig', () => {
  it('binds locally and applies finite resource limits by default', () => {
    const config = loadConfig({ NODE_ENV: 'test' })

    expect(config.host).toBe('127.0.0.1')
    expect(config.requestBodyLimitBytes).toBe(65_536)
    expect(config.openaiMaxOutputTokens).toBe(2_048)
  })

  it('normalizes exact CORS origins', () => {
    const config = loadConfig({
      NODE_ENV: 'test',
      CORS_ALLOWED_ORIGINS: 'https://relay.example, http://localhost:3000',
    })

    expect([...config.allowedOrigins]).toEqual(['https://relay.example', 'http://localhost:3000'])
  })

  it('rejects wildcard CORS in production', () => {
    expect(() =>
      loadConfig({
        NODE_ENV: 'production',
        CORS_ALLOWED_ORIGINS: '*',
      }),
    ).toThrow('CORS wildcard is not allowed in production')
  })
})
