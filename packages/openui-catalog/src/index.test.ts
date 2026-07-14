import { describe, expect, it } from 'vitest'

import {
  buildRelayInstructions,
  buildRelayMockProgram,
  RELAY_COMPONENT_CATALOG,
  RELAY_COMPONENT_NAMES,
} from './index.js'

describe('Relay OpenUI catalog', () => {
  it('keeps component names unique and documented', () => {
    expect(new Set(RELAY_COMPONENT_NAMES).size).toBe(RELAY_COMPONENT_NAMES.length)
    expect(RELAY_COMPONENT_CATALOG.map(({ name }) => name)).toEqual(RELAY_COMPONENT_NAMES)

    const instructions = buildRelayInstructions('en-US')
    for (const name of RELAY_COMPONENT_NAMES) expect(instructions).toContain(name)
  })

  it('builds a compact deterministic program', () => {
    const program = buildRelayMockProgram({
      locale: 'zh-CN',
      prompt: '找到开始键',
      context: { accessModes: ['大字'] },
    })

    expect(program.split('\n')).toHaveLength(9)
    expect(program).toContain('root = Stack(')
    expect(program).toContain('AccessModeBar(["大字"])')
    expect(program).toContain('PrimaryAction(')
  })
})
