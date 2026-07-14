import type { OpenUiStreamEvent } from '@relay/contracts'
import { Hono } from 'hono'
import { bodyLimit } from 'hono/body-limit'
import { streamSSE } from 'hono/streaming'
import { ZodError } from 'zod'

import type { AgentConfig } from './config.js'
import { type GenerateOpenUI, openUIRequestSchema } from './contracts.js'
import { corsAllowlist } from './cors.js'
import { createOpenUIGenerator } from './openui/generator.js'

export interface CreateAppOptions {
  readonly config: AgentConfig
  readonly generateOpenUI?: GenerateOpenUI
  readonly now?: () => Date
  readonly createRequestId?: () => string
}

function requestIdFromHeader(value: string | undefined): string | undefined {
  if (!value) return undefined
  return /^[A-Za-z0-9._:-]{1,128}$/.test(value) ? value : undefined
}

export function createApp(options: CreateAppOptions): Hono {
  const app = new Hono()
  const generateOpenUI = options.generateOpenUI ?? createOpenUIGenerator(options.config)
  const now = options.now ?? (() => new Date())
  const createRequestId = options.createRequestId ?? (() => crypto.randomUUID())

  app.use('*', corsAllowlist(options.config))
  app.use(
    '/v1/openui/stream',
    bodyLimit({
      maxSize: options.config.requestBodyLimitBytes,
      onError: (context) =>
        context.json(
          {
            error: {
              code: 'request_too_large',
              message: 'Request body exceeds the configured limit',
            },
          },
          413,
        ),
    }),
  )

  app.get('/health', (context) =>
    context.json({
      status: 'ok',
      service: 'relay-agent',
      timestamp: now().toISOString(),
      provider: options.config.provider,
      openaiConfigured: Boolean(options.config.openaiApiKey),
      model: options.config.openaiModel,
    }),
  )

  app.post('/v1/openui/stream', async (context) => {
    const requestId = requestIdFromHeader(context.req.header('x-request-id')) ?? createRequestId()
    context.header('X-Request-Id', requestId)

    let body: unknown
    try {
      body = await context.req.json()
    } catch {
      return context.json(
        {
          error: {
            code: 'invalid_json',
            message: 'Request body must be valid JSON',
          },
          requestId,
        },
        400,
      )
    }

    const parsed = openUIRequestSchema.safeParse(body)
    if (!parsed.success) {
      return context.json(
        {
          error: {
            code: 'invalid_request',
            message: 'Request validation failed',
            issues: parsed.error.issues.map((issue) => ({
              path: issue.path.join('.'),
              message: issue.message,
            })),
          },
          requestId,
        },
        400,
      )
    }

    context.header('Cache-Control', 'no-cache, no-transform')
    context.header('X-Accel-Buffering', 'no')

    return streamSSE(context, async (stream) => {
      let response = ''
      let completed = false

      try {
        for await (const event of generateOpenUI(parsed.data, {
          signal: context.req.raw.signal,
        })) {
          if (event.type === 'delta') {
            response += event.delta
            const payload: OpenUiStreamEvent = {
              type: 'openui.delta',
              response,
              isStreaming: true,
              requestId,
            }
            await stream.writeSSE({ event: payload.type, data: JSON.stringify(payload) })
            continue
          }

          completed = true
          const payload: OpenUiStreamEvent = {
            type: 'openui.complete',
            response,
            isStreaming: false,
            requestId,
          }
          await stream.writeSSE({ event: payload.type, data: JSON.stringify(payload) })
        }

        if (!completed) {
          throw new Error('Generation stream ended without response.completed')
        }
      } catch (error) {
        if (context.req.raw.signal.aborted) return

        // Provider details can contain request metadata. Keep them server-side.
        if (options.config.nodeEnv !== 'test') {
          console.error('[relay-agent] generation failed', {
            requestId,
            error: error instanceof Error ? error.message : 'Unknown error',
          })
        }

        const payload: OpenUiStreamEvent = {
          type: 'error',
          requestId,
          message: 'The interface could not be generated. Please retry.',
          retryable: true,
        }
        await stream.writeSSE({ event: payload.type, data: JSON.stringify(payload) })
      }
    })
  })

  app.notFound((context) =>
    context.json(
      {
        error: {
          code: 'not_found',
          message: 'Route not found',
        },
      },
      404,
    ),
  )

  app.onError((error, context) => {
    if (options.config.nodeEnv !== 'test') {
      console.error('[relay-agent] unhandled request error', error)
    }

    const isValidationError = error instanceof ZodError
    return context.json(
      {
        error: {
          code: isValidationError ? 'invalid_request' : 'internal_error',
          message: isValidationError ? 'Request validation failed' : 'An unexpected error occurred',
        },
      },
      isValidationError ? 400 : 500,
    )
  })

  return app
}
