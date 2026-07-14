import type { AgentConfig, AgentProvider } from '../config.js'
import type {
  GenerateOpenUI,
  GenerationEvent,
  GenerationOptions,
  OpenUIRequest,
} from '../contracts.js'
import { streamMockOpenUI } from './mock.js'
import { streamOpenAIResponse } from './openai.js'

function selectProvider(request: OpenUIRequest, config: AgentConfig): AgentProvider {
  if (config.provider !== 'auto') return config.provider
  if (request.provider !== 'auto') return request.provider
  return config.openaiApiKey ? 'openai' : 'mock'
}

async function* generate(
  request: OpenUIRequest,
  config: AgentConfig,
  options?: GenerationOptions,
): AsyncGenerator<GenerationEvent> {
  const provider = selectProvider(request, config)

  if (provider === 'mock') {
    yield* streamMockOpenUI(request, config.mockStreamDelayMs, options?.signal)
    return
  }

  if (!config.openaiApiKey) {
    const automaticSelection = request.provider === 'auto' && config.provider === 'auto'
    if (!automaticSelection || !config.enableMockFallback) {
      throw new Error('OPENAI_API_KEY is not configured')
    }

    yield* streamMockOpenUI(request, config.mockStreamDelayMs, options?.signal)
    return
  }

  let emittedText = false
  try {
    for await (const event of streamOpenAIResponse(request, config, options?.signal)) {
      if (event.type === 'delta') emittedText = true
      yield event
    }
  } catch (error) {
    // Never append a mock program after partial model output: that would corrupt
    // the cumulative OpenUI document. Fallback is safe only before the first delta.
    const fallbackAllowed =
      request.provider === 'auto' &&
      config.provider === 'auto' &&
      config.enableMockFallback &&
      !emittedText

    if (!fallbackAllowed) throw error
    yield* streamMockOpenUI(request, config.mockStreamDelayMs, options?.signal)
  }
}

export function createOpenUIGenerator(config: AgentConfig): GenerateOpenUI {
  return (request, options) => generate(request, config, options)
}
