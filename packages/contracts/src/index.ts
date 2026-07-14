import { z } from 'zod'

export const LanguageSchema = z.enum(['en-US', 'zh-CN'])
export type Language = z.infer<typeof LanguageSchema>

export const BoundingBoxSchema = z
  .object({
    x: z.number().min(0).max(1),
    y: z.number().min(0).max(1),
    width: z.number().positive().max(1),
    height: z.number().positive().max(1),
  })
  .superRefine((box, context) => {
    if (box.x + box.width > 1) {
      context.addIssue({
        code: 'custom',
        path: ['width'],
        message: 'x + width must not exceed 1',
      })
    }

    if (box.y + box.height > 1) {
      context.addIssue({
        code: 'custom',
        path: ['height'],
        message: 'y + height must not exceed 1',
      })
    }
  })
export type BoundingBox = z.infer<typeof BoundingBoxSchema>

export const PanelControlSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1).optional(),
  symbol: z.string().min(1).optional(),
  kind: z.enum(['button', 'dial', 'switch', 'slider', 'display', 'indicator']),
  bounds: BoundingBoxSchema.optional(),
  state: z.record(z.string(), z.unknown()).optional(),
})
export type PanelControl = z.infer<typeof PanelControlSchema>

export const PanelObservationSchema = z.object({
  frameId: z.string().min(1),
  capturedAt: z.iso.datetime(),
  imageDataUrl: z.string().startsWith('data:image/').optional(),
  deviceHint: z.string().min(1).optional(),
  controls: z.array(PanelControlSchema).default([]),
})
export type PanelObservation = z.infer<typeof PanelObservationSchema>

export const AccessProfileSchema = z.object({
  language: LanguageSchema.default('en-US'),
  visualScale: z.enum(['standard', 'large', 'extra-large']).default('standard'),
  contrast: z.enum(['standard', 'high']).default('standard'),
  colorVision: z.enum(['none', 'protanopia', 'deuteranopia', 'tritanopia']).default('none'),
  motorPrecision: z.enum(['standard', 'reduced']).default('standard'),
  guidance: z.enum(['compact', 'detailed']).default('compact'),
})
export type AccessProfile = z.infer<typeof AccessProfileSchema>

export const TaskIntentSchema = z.object({
  goal: z.string().min(1).max(500),
  risk: z.enum(['low', 'medium', 'high']).default('low'),
  requestedAt: z.iso.datetime(),
})
export type TaskIntent = z.infer<typeof TaskIntentSchema>

export const OpenUiGenerationContextSchema = z
  .object({
    deviceLabel: z.string().trim().min(1).max(120).optional(),
    task: z.string().trim().min(1).max(500).optional(),
    risk: z.enum(['low', 'medium', 'high']).default('low'),
    accessModes: z.array(z.string().trim().min(1).max(80)).max(8).default([]),
    observations: z.array(z.string().trim().min(1).max(500)).max(24).default([]),
  })
  .strict()
export type OpenUiGenerationContext = z.infer<typeof OpenUiGenerationContextSchema>

export const OpenUiGenerationRequestSchema = z
  .object({
    prompt: z.string().trim().min(1).max(8_000),
    locale: LanguageSchema.default('zh-CN'),
    provider: z.enum(['auto', 'openai', 'mock']).default('auto'),
    context: OpenUiGenerationContextSchema.optional(),
  })
  .strict()
export type OpenUiGenerationRequest = z.infer<typeof OpenUiGenerationRequestSchema>

export const GenerateInterfaceRequestSchema = z.object({
  sessionId: z.string().min(1),
  observation: PanelObservationSchema,
  intent: TaskIntentSchema,
  profile: AccessProfileSchema,
})
export type GenerateInterfaceRequest = z.infer<typeof GenerateInterfaceRequestSchema>

export const VerifyPanelRequestSchema = z.object({
  sessionId: z.string().min(1),
  beforeFrameId: z.string().min(1),
  after: PanelObservationSchema,
  expectedState: z.string().min(1),
})
export type VerifyPanelRequest = z.infer<typeof VerifyPanelRequestSchema>

export const VerifyPanelResultSchema = z.object({
  matched: z.boolean(),
  confidence: z.number().min(0).max(1),
  explanation: z.string().min(1),
  requiresUserConfirmation: z.boolean(),
})
export type VerifyPanelResult = z.infer<typeof VerifyPanelResultSchema>

const StreamBaseSchema = z.object({
  requestId: z.string().min(1),
})

export const OpenUiDeltaEventSchema = StreamBaseSchema.extend({
  type: z.literal('openui.delta'),
  response: z.string(),
  isStreaming: z.literal(true),
})

export const OpenUiCompleteEventSchema = StreamBaseSchema.extend({
  type: z.literal('openui.complete'),
  response: z.string(),
  isStreaming: z.literal(false),
})

export const OpenUiErrorEventSchema = StreamBaseSchema.extend({
  type: z.literal('error'),
  message: z.string().min(1),
  retryable: z.boolean(),
})

export const OpenUiStreamEventSchema = z.discriminatedUnion('type', [
  OpenUiDeltaEventSchema,
  OpenUiCompleteEventSchema,
  OpenUiErrorEventSchema,
])
export type OpenUiStreamEvent = z.infer<typeof OpenUiStreamEventSchema>
