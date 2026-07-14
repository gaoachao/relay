import { type OpenUiGenerationRequest, OpenUiGenerationRequestSchema } from '@relay/contracts'

export const openUIRequestSchema = OpenUiGenerationRequestSchema
export type OpenUIRequest = OpenUiGenerationRequest

export type GenerationEvent =
  | { readonly type: 'delta'; readonly delta: string }
  | {
      readonly type: 'complete'
      readonly responseId?: string
      readonly model: string
      readonly source: 'openai' | 'mock'
    }

export interface GenerationOptions {
  readonly signal?: AbortSignal
}

export type GenerateOpenUI = (
  request: OpenUIRequest,
  options?: GenerationOptions,
) => AsyncIterable<GenerationEvent>
