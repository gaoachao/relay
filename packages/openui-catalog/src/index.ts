export const RELAY_COMPONENT_NAMES = [
  'Stack',
  'GuidedStep',
  'PanelMap',
  'ControlChoice',
  'AccessModeBar',
  'VerifyGate',
  'ConfidenceNotice',
  'PrimaryAction',
] as const

export type RelayComponentName = (typeof RELAY_COMPONENT_NAMES)[number]

export type RelayComponentDescriptor = {
  name: RelayComponentName
  purpose: string
  constraints: readonly string[]
}

export const RELAY_COMPONENT_CATALOG = [
  {
    name: 'Stack',
    purpose: 'Lay out related controls with predictable spacing.',
    constraints: ['Prefer a single column', 'Avoid deep nesting'],
  },
  {
    name: 'GuidedStep',
    purpose: 'Explain one physical action in plain language.',
    constraints: ['One action per step', 'Use a concrete verb'],
  },
  {
    name: 'PanelMap',
    purpose: 'Relate generated controls to positions on the observed panel.',
    constraints: ['Only show observed controls', 'Never infer a dangerous control'],
  },
  {
    name: 'ControlChoice',
    purpose: 'Let the user choose among a small set of safe alternatives.',
    constraints: ['Two to four choices', 'Labels must be mutually distinct'],
  },
  {
    name: 'AccessModeBar',
    purpose: 'Expose text size, contrast and guidance preferences.',
    constraints: ['Preserve user settings', 'Do not hide behind a gesture'],
  },
  {
    name: 'VerifyGate',
    purpose: 'Pause before an irreversible or uncertain action.',
    constraints: ['Required for medium or high risk', 'State the consequence'],
  },
  {
    name: 'ConfidenceNotice',
    purpose: 'Make uncertain recognition visible without blocking safe progress.',
    constraints: ['Use calibrated language', 'Offer a rescan path'],
  },
  {
    name: 'PrimaryAction',
    purpose: 'Present the single next action.',
    constraints: ['One per view', 'Use a specific label'],
  },
] as const satisfies readonly RelayComponentDescriptor[]

export const buildRelayInstructions = (locale: 'en-US' | 'zh-CN') =>
  `
You generate OpenUI for Relay, an accessible interface for the physical machine in front of the user.

Language: ${locale}
Available components: ${RELAY_COMPONENT_NAMES.join(', ')}.

Rules:
- Return only valid OpenUI output accepted by the renderer.
- Use only the available components.
- Assign the root variable to a Stack. Root is not a component.
- Prefer one short flow and one PrimaryAction.
- Do not invent controls that were not observed.
- Require VerifyGate for uncertain, medium-risk, or high-risk actions.
- Keep labels direct. Never expose implementation detail.
`.trim()

export type RelayProgramRequest = {
  locale: 'en-US' | 'zh-CN'
  prompt: string
  context?:
    | {
        task?: string | undefined
        deviceLabel?: string | undefined
        accessModes?: string[] | undefined
      }
    | undefined
}

const quote = (value: string): string => JSON.stringify(value)

function compact(value: string, maxLength: number): string {
  const normalized = value.replace(/\s+/g, ' ').trim()
  return normalized.length <= maxLength ? normalized : `${normalized.slice(0, maxLength - 1)}…`
}

export function buildRelayMockProgram(request: RelayProgramRequest): string {
  const isChinese = request.locale === 'zh-CN'
  const task = compact(request.context?.task ?? request.prompt, 96)
  const device = compact(
    request.context?.deviceLabel ?? (isChinese ? '已扫描的控制面板' : 'Scanned control panel'),
    64,
  )
  const modes = request.context?.accessModes ?? []
  const modeLabels = modes.length > 0 ? modes : [isChinese ? '标准' : 'Standard']

  return [
    'root = Stack([modeBar, content, gate])',
    'content = Stack([step, panel, choice, confidence])',
    `modeBar = AccessModeBar(${JSON.stringify(modeLabels)})`,
    `step = GuidedStep(1, ${quote(isChinese ? '找到控制键' : 'Find the control')}, ${quote(task)}, "active")`,
    `panel = PanelMap(${quote(device)}, ["primary-control"])`,
    `choice = ControlChoice("primary-control", ${quote(isChinese ? '主要控制键' : 'Primary control')}, ${quote(isChinese ? '相机将持续确认位置' : 'Camera keeps the target aligned')}, true)`,
    `confidence = ConfidenceNotice(${quote(isChinese ? '请在执行前确认高亮位置' : 'Confirm the highlighted target before acting')}, 0.82)`,
    `gate = VerifyGate(${quote(isChinese ? '准备验证' : 'Ready to verify')}, ${quote(isChinese ? '完成实体操作后使用相机确认结果' : 'Use the camera to confirm the physical result')}, action)`,
    `action = PrimaryAction(${quote(isChinese ? '开始相机验证' : 'Start camera verification')}, "verify_target")`,
  ].join('\n')
}
