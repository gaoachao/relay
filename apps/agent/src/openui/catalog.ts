import { buildRelayInstructions, RELAY_COMPONENT_NAMES } from '@relay/openui-catalog'

import type { OpenUIRequest } from '../contracts.js'

const componentSignatures = `
Stack(children)
GuidedStep(index: positive integer, title, instruction, state: "active" | "complete" | "upcoming")
PanelMap(label, targets: 1..8 observed control ids)
ControlChoice(id, label, hint, selected: boolean)
AccessModeBar(modes: 1..8 strings)
VerifyGate(title, description, action: component reference)
ConfidenceNotice(message, confidence: number from 0 to 1)
PrimaryAction(label, actionId: string)
`.trim()

export function buildOpenUIInstructions(locale: OpenUIRequest['locale']): string {
  const sharedInstructions = buildRelayInstructions(locale)
  const language = locale === 'zh-CN' ? 'Simplified Chinese' : 'English (US)'

  return `${sharedInstructions}

Return only OpenUI Lang v0.5 assignments, with exactly one assignment per line.
The first line must define root = Stack([...]). Forward references are allowed.
Allowed component names: ${RELAY_COMPONENT_NAMES.join(', ')}.
Use only these component signatures and positional arguments:
${componentSignatures}

Rules:
- Write user-visible text in ${language}.
- Generate the smallest interface that completes the current physical task.
- Never claim a physical action has succeeded before verification.
- Put uncertain recognition in ConfidenceNotice.
- Put medium- or high-risk actions behind VerifyGate.
- Include an AccessModeBar when accessibility modes are supplied.
- Do not output Markdown fences, prose, JSON, XML, comments, or unknown components.`
}

export function buildModelInput(request: OpenUIRequest): string {
  const context = request.context

  return JSON.stringify({
    userRequest: request.prompt,
    deviceLabel: context?.deviceLabel ?? null,
    task: context?.task ?? null,
    risk: context?.risk ?? 'low',
    accessModes: context?.accessModes ?? [],
    observations: context?.observations ?? [],
  })
}
