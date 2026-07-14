import { defineComponent, useIsStreaming, useTriggerAction } from '@lynx-js/genui/openui'
import { z } from 'zod/v4'

import { relayBridge } from '../bridge/relay-bridge.js'

export const PrimaryAction = defineComponent({
  name: 'PrimaryAction',
  description:
    'The one primary next action on a generated surface. It confirms guidance but never claims to control a device.',
  props: z.object({
    label: z.string(),
    actionId: z.string(),
  }),
  component: ({ props }) => {
    const isStreaming = useIsStreaming()
    const triggerAction = useTriggerAction()

    const handleTap = async () => {
      if (isStreaming) {
        return
      }

      relayBridge.requestHaptic('step')
      const isChinese = /[\u3400-\u9fff]/.test(props.label)
      const confirmed = await relayBridge.confirmGuidance(
        props.label,
        isChinese
          ? '请先核对真实设备。Relay 只提供引导，不会控制设备。'
          : 'Check the real device first. Relay provides guidance and does not control it.',
      )
      if (confirmed) {
        await triggerAction(props.label, undefined, {
          type: 'relay.action',
          params: { actionId: props.actionId },
        })
      }
    }

    return (
      <view className="primary-action">
        <view
          className={
            isStreaming
              ? 'primary-action__button primary-action__button--disabled'
              : 'primary-action__button'
          }
          accessibility-element={true}
          accessibility-label={props.label}
          accessibility-trait="button"
          bindtap={handleTap}
        >
          <text className="primary-action__label">{props.label}</text>
          <text className="primary-action__arrow">→</text>
        </view>
      </view>
    )
  },
})
