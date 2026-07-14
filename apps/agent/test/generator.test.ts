import { describe, expect, it } from 'vitest'

import type { AgentConfig } from '../src/config.js'
import type { GenerationEvent, OpenUIRequest } from '../src/contracts.js'
import { createOpenUIGenerator } from '../src/openui/generator.js'

function config(overrides: Partial<AgentConfig> = {}): AgentConfig {
  return {
    nodeEnv: 'test',
    host: '127.0.0.1',
    port: 8_787,
    openaiModel: 'test-model',
    openaiTimeoutMs: 5_000,
    openaiMaxOutputTokens: 2_048,
    requestBodyLimitBytes: 65_536,
    provider: 'auto',
    enableMockFallback: true,
    mockStreamDelayMs: 0,
    allowedOrigins: new Set(),
    ...overrides,
  }
}

function request(overrides: Partial<OpenUIRequest> = {}): OpenUIRequest {
  return {
    prompt: 'Guide me through the panel',
    locale: 'en-US',
    provider: 'auto',
    ...overrides,
  }
}

async function collect(stream: AsyncIterable<GenerationEvent>) {
  const events: GenerationEvent[] = []
  for await (const event of stream) events.push(event)
  return events
}

describe('OpenUI generator', () => {
  it('uses the deterministic offline stream when auto has no key', async () => {
    const events = await collect(createOpenUIGenerator(config())(request()))
    const response = events
      .filter(
        (event): event is Extract<GenerationEvent, { type: 'delta' }> => event.type === 'delta',
      )
      .map((event) => event.delta)
      .join('')

    expect(response).toMatch(/^root = Stack\(/)
    expect(response).toContain('GuidedStep(')
    expect(response).toContain('VerifyGate(')
    expect(events.at(-1)).toMatchObject({ type: 'complete', source: 'mock' })
  })

  it('does not silently mock an explicitly requested OpenAI stream', async () => {
    await expect(
      collect(createOpenUIGenerator(config())(request({ provider: 'openai' }))),
    ).rejects.toThrow('OPENAI_API_KEY is not configured')
  })

  it('lets the server lock the gateway to offline mode', async () => {
    const events = await collect(
      createOpenUIGenerator(config({ provider: 'mock' }))(request({ provider: 'openai' })),
    )

    expect(events.at(-1)).toMatchObject({ type: 'complete', source: 'mock' })
  })
})
