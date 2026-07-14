import { describe, expect, it } from 'vitest'

import { createApp } from '../src/app.js'
import type { AgentConfig } from '../src/config.js'
import type { GenerateOpenUI } from '../src/contracts.js'

function config(overrides: Partial<AgentConfig> = {}): AgentConfig {
  return {
    nodeEnv: 'test',
    host: '127.0.0.1',
    port: 8_787,
    openaiModel: 'test-model',
    openaiTimeoutMs: 5_000,
    openaiMaxOutputTokens: 2_048,
    requestBodyLimitBytes: 65_536,
    provider: 'mock',
    enableMockFallback: true,
    mockStreamDelayMs: 0,
    allowedOrigins: new Set(['http://localhost:3000']),
    ...overrides,
  }
}

function parseSSE(text: string): Array<{ event: string; data: unknown }> {
  return text
    .trim()
    .split(/\n\n+/)
    .map((block) => {
      const lines = block.split('\n')
      const event = lines.find((line) => line.startsWith('event: '))?.slice(7) ?? ''
      const data = lines.find((line) => line.startsWith('data: '))?.slice(6) ?? 'null'
      return { event, data: JSON.parse(data) }
    })
}

describe('Relay Agent app', () => {
  it('reports health without exposing secrets', async () => {
    const app = createApp({
      config: config({ openaiApiKey: 'secret-test-key' }),
      now: () => new Date('2026-07-14T12:00:00.000Z'),
    })

    const response = await app.request('/health')
    const text = await response.text()

    expect(response.status).toBe(200)
    expect(JSON.parse(text)).toEqual({
      status: 'ok',
      service: 'relay-agent',
      timestamp: '2026-07-14T12:00:00.000Z',
      provider: 'mock',
      openaiConfigured: true,
      model: 'test-model',
    })
    expect(text).not.toContain('secret-test-key')
  })

  it('rejects invalid request bodies before opening SSE', async () => {
    const app = createApp({ config: config() })
    const response = await app.request('/v1/openui/stream', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ prompt: '' }),
    })

    expect(response.status).toBe(400)
    expect(await response.json()).toMatchObject({
      error: { code: 'invalid_request' },
    })
  })

  it('rejects oversized request bodies before JSON parsing', async () => {
    const app = createApp({ config: config({ requestBodyLimitBytes: 64 }) })
    const response = await app.request('/v1/openui/stream', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ prompt: 'x'.repeat(256) }),
    })

    expect(response.status).toBe(413)
    expect(await response.json()).toMatchObject({
      error: { code: 'request_too_large' },
    })
  })

  it('enforces the browser origin allowlist', async () => {
    const app = createApp({ config: config() })
    const denied = await app.request('/health', {
      headers: { origin: 'https://evil.example' },
    })
    const allowed = await app.request('/health', {
      headers: { origin: 'http://localhost:3000' },
    })

    expect(denied.status).toBe(403)
    expect(allowed.status).toBe(200)
    expect(allowed.headers.get('access-control-allow-origin')).toBe('http://localhost:3000')
  })

  it('streams cumulative OpenUI responses and a terminal event', async () => {
    const generateOpenUI: GenerateOpenUI = async function* () {
      yield { type: 'delta', delta: 'root = Stack([step])' }
      yield { type: 'delta', delta: '\nstep = GuidedStep(1, "Find", "Press", "active")' }
      yield { type: 'complete', source: 'openai', model: 'test', responseId: 'resp_1' }
    }
    const app = createApp({
      config: config(),
      generateOpenUI,
      createRequestId: () => 'request_test',
    })

    const response = await app.request('/v1/openui/stream', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ prompt: 'Build a control', locale: 'en-US' }),
    })
    const events = parseSSE(await response.text())

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('text/event-stream')
    expect(events).toHaveLength(3)
    expect(events[0]).toEqual({
      event: 'openui.delta',
      data: {
        type: 'openui.delta',
        response: 'root = Stack([step])',
        isStreaming: true,
        requestId: 'request_test',
      },
    })
    expect(events[1]?.data).toMatchObject({
      response: 'root = Stack([step])\nstep = GuidedStep(1, "Find", "Press", "active")',
      isStreaming: true,
    })
    expect(events[2]).toEqual({
      event: 'openui.complete',
      data: {
        type: 'openui.complete',
        response: 'root = Stack([step])\nstep = GuidedStep(1, "Find", "Press", "active")',
        isStreaming: false,
        requestId: 'request_test',
      },
    })
  })

  it('returns a safe SSE error without provider details', async () => {
    const generateOpenUI: GenerateOpenUI = async function* () {
      yield { type: 'delta', delta: 'root = ' }
      throw new Error('provider leaked detail sk-live-secret')
    }
    const app = createApp({
      config: config(),
      generateOpenUI,
      createRequestId: () => 'request_error',
    })

    const response = await app.request('/v1/openui/stream', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ prompt: 'Build a control' }),
    })
    const text = await response.text()
    const events = parseSSE(text)

    expect(events).toHaveLength(2)
    expect(events.at(-1)).toMatchObject({
      event: 'error',
      data: {
        type: 'error',
        requestId: 'request_error',
        message: 'The interface could not be generated. Please retry.',
        retryable: true,
      },
    })
    expect(text).not.toContain('sk-live-secret')
  })
})
