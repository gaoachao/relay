import { defineComponent } from '@lynx-js/genui/openui'
import { z } from 'zod/v4'

export const ConfidenceNotice = defineComponent({
  name: 'ConfidenceNotice',
  description:
    'Makes recognition confidence visible with calibrated language and without implying certainty.',
  props: z.object({
    message: z.string(),
    confidence: z.number().min(0).max(1),
  }),
  component: ({ props }) => {
    const percentage = Math.round(props.confidence * 100)

    return (
      <view
        className="confidence-notice"
        accessibility-element={true}
        accessibility-label={`${props.message}. ${percentage}%`}
      >
        <view className="confidence-notice__copy">
          <text className="confidence-notice__message">{props.message}</text>
          <text className="confidence-notice__value">{percentage}%</text>
        </view>
        <view className="confidence-notice__track">
          <view className="confidence-notice__fill" style={{ width: `${percentage}%` }} />
        </view>
      </view>
    )
  },
})
