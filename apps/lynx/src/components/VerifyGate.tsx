import { defineComponent } from '@lynx-js/genui/openui'
import { z } from 'zod/v4'

export const VerifyGate = defineComponent({
  name: 'VerifyGate',
  description:
    'Pauses before an uncertain physical action, states the required check, and contains the single next action.',
  props: z.object({
    title: z.string(),
    body: z.string(),
    action: z.any(),
  }),
  component: ({ props, renderNode }) => (
    <view
      className="verify-gate"
      accessibility-element={true}
      accessibility-label={`${props.title}. ${props.body}`}
    >
      <view className="verify-gate__header">
        <view className="verify-gate__mark" />
        <text className="verify-gate__title">{props.title}</text>
      </view>
      <text className="verify-gate__body">{props.body}</text>
      <view className="verify-gate__action">{renderNode(props.action)}</view>
    </view>
  ),
})
