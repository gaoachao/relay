export type RelayLocale = 'en' | 'zh-Hans'

export interface RelayInitData {
  isStreaming: boolean
  locale: RelayLocale
  openUiResponse: string | null
  recognizedControls: string[]
  scanId: string
  userMode: 'default' | 'low-vision' | 'one-hand'
}

const defaults: RelayInitData = {
  isStreaming: false,
  locale: 'en',
  openUiResponse: null,
  recognizedControls: [],
  scanId: 'local-preview',
  userMode: 'default',
}

export function normalizeInitData(input: unknown): RelayInitData {
  if (!input || typeof input !== 'object') {
    return defaults
  }

  const value = input as Record<string, unknown>
  const locale =
    typeof value.locale === 'string' && value.locale.toLowerCase().startsWith('zh')
      ? 'zh-Hans'
      : 'en'
  const userMode =
    value.userMode === 'low-vision' || value.userMode === 'one-hand' ? value.userMode : 'default'

  return {
    isStreaming: value.isStreaming === true,
    locale,
    openUiResponse: typeof value.openUiResponse === 'string' ? value.openUiResponse : null,
    recognizedControls: Array.isArray(value.recognizedControls)
      ? value.recognizedControls.filter((item): item is string => typeof item === 'string')
      : [],
    scanId: typeof value.scanId === 'string' ? value.scanId : defaults.scanId,
    userMode,
  }
}
