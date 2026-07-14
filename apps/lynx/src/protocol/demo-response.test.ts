import { createParser } from '@lynx-js/genui/openui'
import { buildRelayMockProgram } from '@relay/openui-catalog'
import { describe, expect, it } from 'vitest'

import { relayOpenUiLibrary } from '../openui/library.js'
import { getDemoResponse } from './demo-response.js'

const parser = createParser(relayOpenUiLibrary.toJSONSchema())

describe('Relay OpenUI demo programs', () => {
  it.each([
    'en',
    'zh-Hans',
  ] as const)('parses the %s program against the real library', (locale) => {
    const result = parser.parse(getDemoResponse(locale))

    expect(result.root?.typeName).toBe('Stack')
    expect(result.meta.incomplete).toBe(false)
    expect(result.meta.unresolved).toEqual([])
    expect(result.meta.orphaned).toEqual([])
    expect(result.meta.errors).toEqual([])
  })

  it.each([
    'en-US',
    'zh-CN',
  ] as const)('parses the Agent mock program for %s against the real library', (locale) => {
    const result = parser.parse(
      buildRelayMockProgram({
        locale,
        prompt: locale === 'zh-CN' ? '帮我找到开始键' : 'Help me find the start control',
      }),
    )

    expect(result.root?.typeName).toBe('Stack')
    expect(result.meta.incomplete).toBe(false)
    expect(result.meta.unresolved).toEqual([])
    expect(result.meta.orphaned).toEqual([])
    expect(result.meta.errors).toEqual([])
  })
})
