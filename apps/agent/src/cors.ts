import type { MiddlewareHandler } from 'hono'

import type { AgentConfig } from './config.js'

const allowedHeaders = 'Content-Type, X-Request-Id'
const allowedMethods = 'GET, POST, OPTIONS'

export function corsAllowlist(config: AgentConfig): MiddlewareHandler {
  return async (context, next) => {
    const origin = context.req.header('origin')

    if (!origin) {
      await next()
      return
    }

    const normalizedOrigin = (() => {
      try {
        return new URL(origin).origin
      } catch {
        return origin
      }
    })()
    const allowed = config.allowedOrigins.has('*') || config.allowedOrigins.has(normalizedOrigin)

    if (!allowed) {
      return context.json(
        {
          error: {
            code: 'origin_not_allowed',
            message: 'Request origin is not allowed',
          },
        },
        403,
      )
    }

    context.header('Access-Control-Allow-Origin', normalizedOrigin)
    context.header('Access-Control-Allow-Methods', allowedMethods)
    context.header('Access-Control-Allow-Headers', allowedHeaders)
    context.header('Access-Control-Max-Age', '86400')
    context.header('Vary', 'Origin', { append: true })

    if (context.req.method === 'OPTIONS') {
      return context.body(null, 204)
    }

    await next()
  }
}
