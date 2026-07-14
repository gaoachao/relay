import { buildRelayMockProgram } from '@relay/openui-catalog'

import type { GenerationEvent, OpenUIRequest } from '../contracts.js'

function wait(milliseconds: number, signal?: AbortSignal): Promise<void> {
  if (milliseconds <= 0) return Promise.resolve()

  return new Promise((resolve, reject) => {
    const onAbort = () => {
      clearTimeout(timeout)
      reject(signal?.reason ?? new DOMException('Aborted', 'AbortError'))
    }
    const timeout = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort)
      resolve()
    }, milliseconds)
    signal?.addEventListener('abort', onAbort, { once: true })
  })
}

export async function* streamMockOpenUI(
  request: OpenUIRequest,
  delayMs: number,
  signal?: AbortSignal,
): AsyncGenerator<GenerationEvent> {
  for (const [index, line] of buildRelayMockProgram(request).split('\n').entries()) {
    if (signal?.aborted) return
    await wait(delayMs, signal)
    yield { type: 'delta', delta: index === 0 ? line : `\n${line}` }
  }

  yield {
    type: 'complete',
    responseId: `mock_${crypto.randomUUID()}`,
    model: 'relay-openui-mock-v1',
    source: 'mock',
  }
}
