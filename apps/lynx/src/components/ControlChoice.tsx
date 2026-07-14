import { defineComponent } from '@lynx-js/genui/openui'
import { z } from 'zod/v4'

export const ControlChoice = defineComponent({
  name: 'ControlChoice',
  description:
    'Shows a safe observed control choice with an explicit selected state and concise distinguishing detail.',
  props: z.object({
    controlId: z.string(),
    label: z.string(),
    detail: z.string(),
    selected: z.boolean(),
  }),
  component: ({ props }) => (
    <view
      className={props.selected ? 'control-choice control-choice--selected' : 'control-choice'}
      accessibility-element={true}
      accessibility-label={`${props.label}. ${props.detail}`}
      accessibility-trait={props.selected ? 'selected' : undefined}
    >
      <view className="control-choice__state">
        <view className="control-choice__state-core" />
      </view>
      <view className="control-choice__content">
        <text className="control-choice__label">{props.label}</text>
        <text className="control-choice__detail">{props.detail}</text>
      </view>
      <text className="control-choice__id">{props.controlId}</text>
    </view>
  ),
})
