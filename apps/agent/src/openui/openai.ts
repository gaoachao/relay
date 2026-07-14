import OpenAI from 'openai'

import type { AgentConfig } from '../config.js'
import type { GenerationEvent, OpenUIRequest } from '../contracts.js'
import { buildModelInput, buildOpenUIInstructions } from './catalog.js'

export async function* streamOpenAIResponse(
  request: OpenUIRequest,
  config: AgentConfig,
  signal?: AbortSignal,
): AsyncGenerator<GenerationEvent> {
  if (!config.openaiApiKey) {
    throw new Error('OPENAI_API_KEY is not configured')
  }

  const client = new OpenAI({
    apiKey: config.openaiApiKey,
    ...(config.openaiBaseUrl ? { baseURL: config.openaiBaseUrl } : {}),
    timeout: config.openaiTimeoutMs,
    maxRetries: 1,
  })

  const stream = await client.responses.create(
    {
      model: config.openaiModel,
      instructions: buildOpenUIInstructions(request.locale),
      input: buildModelInput(request),
      max_output_tokens: config.openaiMaxOutputTokens,
      store: false,
      stream: true,
    },
    signal ? { signal } : undefined,
  )

  for await (const event of stream) {
    // Responses streaming is a typed event union. Only output text belongs in
    // OpenUI; reasoning and tool-call deltas must never leak into the renderer.
    if (event.type === 'response.output_text.delta') {
      yield { type: 'delta', delta: event.delta }
      continue
    }

    if (event.type === 'response.completed') {
      yield {
        type: 'complete',
        responseId: event.response.id,
        model: event.response.model,
        source: 'openai',
      }
      continue
    }

    if (event.type === 'error') {
      throw new Error(event.message)
    }

    if (event.type === 'response.failed') {
      throw new Error(event.response.error?.message ?? 'OpenAI response failed')
    }

    if (event.type === 'response.incomplete') {
      throw new Error(event.response.incomplete_details?.reason ?? 'OpenAI response was incomplete')
    }
  }
}
