import { z } from 'zod'

const booleanFromEnv = z
  .enum(['true', 'false'])
  .default('true')
  .transform((value) => value === 'true')

const optionalString = z.preprocess(
  (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
  z.string().trim().min(1).optional(),
)

const optionalUrl = z.preprocess(
  (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
  z.url().optional(),
)

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  HOST: z.string().trim().min(1).default('127.0.0.1'),
  PORT: z.coerce.number().int().min(1).max(65_535).default(8_787),
  OPENAI_API_KEY: optionalString,
  OPENAI_MODEL: z.string().trim().min(1).default('gpt-5.6-terra'),
  OPENAI_BASE_URL: optionalUrl,
  OPENAI_TIMEOUT_MS: z.coerce.number().int().min(1_000).max(300_000).default(45_000),
  OPENAI_MAX_OUTPUT_TOKENS: z.coerce.number().int().min(256).max(16_384).default(2_048),
  REQUEST_BODY_LIMIT_BYTES: z.coerce.number().int().min(1_024).max(1_048_576).default(65_536),
  AGENT_PROVIDER: z.enum(['auto', 'openai', 'mock']).default('auto'),
  AGENT_ENABLE_MOCK_FALLBACK: booleanFromEnv,
  MOCK_STREAM_DELAY_MS: z.coerce.number().int().min(0).max(2_000).default(24),
  CORS_ALLOWED_ORIGINS: z.string().default('http://localhost:3000,http://localhost:5173'),
})

export type AgentProvider = 'auto' | 'openai' | 'mock'

export interface AgentConfig {
  readonly nodeEnv: 'development' | 'test' | 'production'
  readonly host: string
  readonly port: number
  readonly openaiApiKey?: string
  readonly openaiModel: string
  readonly openaiBaseUrl?: string
  readonly openaiTimeoutMs: number
  readonly openaiMaxOutputTokens: number
  readonly requestBodyLimitBytes: number
  readonly provider: AgentProvider
  readonly enableMockFallback: boolean
  readonly mockStreamDelayMs: number
  readonly allowedOrigins: ReadonlySet<string>
}

function parseOrigins(input: string): ReadonlySet<string> {
  const origins = input
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
    .map((origin) => {
      if (origin === '*') return origin

      const url = new URL(origin)
      if (url.pathname !== '/' || url.search || url.hash) {
        throw new Error(`CORS origin must not contain a path, query, or hash: ${origin}`)
      }

      return url.origin
    })

  return new Set(origins)
}

export function loadConfig(environment: NodeJS.ProcessEnv = process.env): AgentConfig {
  const env = envSchema.parse(environment)
  const allowedOrigins = parseOrigins(env.CORS_ALLOWED_ORIGINS)

  if (env.NODE_ENV === 'production' && allowedOrigins.has('*')) {
    throw new Error('CORS wildcard is not allowed in production')
  }

  return {
    nodeEnv: env.NODE_ENV,
    host: env.HOST,
    port: env.PORT,
    ...(env.OPENAI_API_KEY ? { openaiApiKey: env.OPENAI_API_KEY } : {}),
    openaiModel: env.OPENAI_MODEL,
    ...(env.OPENAI_BASE_URL ? { openaiBaseUrl: env.OPENAI_BASE_URL } : {}),
    openaiTimeoutMs: env.OPENAI_TIMEOUT_MS,
    openaiMaxOutputTokens: env.OPENAI_MAX_OUTPUT_TOKENS,
    requestBodyLimitBytes: env.REQUEST_BODY_LIMIT_BYTES,
    provider: env.AGENT_PROVIDER,
    enableMockFallback: env.AGENT_ENABLE_MOCK_FALLBACK,
    mockStreamDelayMs: env.MOCK_STREAM_DELAY_MS,
    allowedOrigins,
  }
}
