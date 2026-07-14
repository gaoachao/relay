import { defineComponent } from '@lynx-js/genui/openui'
import { z } from 'zod/v4'

export const PanelMap = defineComponent({
  name: 'PanelMap',
  description:
    'Maps only observed control identifiers to a restrained schematic of the scanned panel.',
  props: z.object({
    deviceLabel: z.string(),
    controlIds: z.array(z.string()).min(1).max(8),
  }),
  component: ({ props }) => (
    <view
      className="panel-map"
      accessibility-element={true}
      accessibility-label={`${props.deviceLabel}. ${props.controlIds.join(', ')}`}
    >
      <view className="panel-map__header">
        <text className="panel-map__device">{props.deviceLabel}</text>
        <text className="panel-map__count">{String(props.controlIds.length).padStart(2, '0')}</text>
      </view>
      <view className="panel-map__surface">
        {props.controlIds.map((controlId, index) => (
          <view className="panel-map__control" key={`${controlId}-${index}`}>
            <view className="panel-map__control-dot" />
            <text className="panel-map__control-label">{controlId}</text>
          </view>
        ))}
      </view>
    </view>
  ),
})
