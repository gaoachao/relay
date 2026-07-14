import { defineComponent } from '@lynx-js/genui/openui'
import { z } from 'zod/v4'

export const AccessModeBar = defineComponent({
  name: 'AccessModeBar',
  description:
    'Shows the active accessibility and guidance preferences without hiding them behind a gesture.',
  props: z.object({
    modes: z.array(z.string()).min(1).max(8),
  }),
  component: ({ props }) => (
    <view
      className="access-mode-bar"
      accessibility-element={true}
      accessibility-label={props.modes.join(', ')}
    >
      <text className="access-mode-bar__eyebrow">ACCESS</text>
      <scroll-view className="access-mode-bar__modes" scroll-orientation="horizontal">
        {props.modes.map((mode, index) => (
          <view
            className={
              index === 0
                ? 'access-mode-bar__mode access-mode-bar__mode--active'
                : 'access-mode-bar__mode'
            }
            key={`${mode}-${index}`}
          >
            <text
              className={
                index === 0
                  ? 'access-mode-bar__mode-label access-mode-bar__mode-label--active'
                  : 'access-mode-bar__mode-label'
              }
            >
              {mode}
            </text>
          </view>
        ))}
      </scroll-view>
    </view>
  ),
})
