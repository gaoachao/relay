import { defineComponent } from '@lynx-js/genui/openui'
import { z } from 'zod/v4'

export const GuidedStep = defineComponent({
  name: 'GuidedStep',
  description:
    'Explains exactly one observable physical action. Never claims that Relay operated the device.',
  props: z.object({
    index: z.number().int().positive(),
    title: z.string(),
    body: z.string(),
    status: z.enum(['active', 'complete', 'upcoming']),
  }),
  component: ({ props }) => (
    <view
      className={`guided-step guided-step--${props.status}`}
      accessibility-element={true}
      accessibility-label={`${props.index}. ${props.title}. ${props.body}`}
    >
      <view className="guided-step__index">
        <text className="guided-step__index-text">{String(props.index)}</text>
      </view>
      <view className="guided-step__content">
        <text className="guided-step__title">{props.title}</text>
        <text className="guided-step__body">{props.body}</text>
      </view>
    </view>
  ),
})
