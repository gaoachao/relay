import { OpenUiRenderer } from '@lynx-js/genui/openui'
import { useInitData } from '@lynx-js/react'

import { relayBridge } from '../bridge/relay-bridge.js'
import { normalizeInitData } from '../domain/init-data.js'
import { relayOpenUiLibrary } from '../openui/library.js'
import { getDemoResponse } from '../protocol/demo-response.js'

export function RelaySurface() {
  const initData = normalizeInitData(useInitData())
  const response = initData.openUiResponse ?? getDemoResponse(initData.locale)

  return (
    <page className="relay-page">
      <scroll-view className="relay-scroll" scroll-orientation="vertical" bounces={true}>
        <view className="relay-surface">
          <OpenUiRenderer
            response={response}
            isStreaming={initData.isStreaming}
            library={relayOpenUiLibrary}
            onAction={(event) => {
              if (
                event.type === 'continue_conversation' &&
                typeof event.humanFriendlyMessage === 'string'
              ) {
                relayBridge.announce(event.humanFriendlyMessage)
              }
            }}
            onError={(errors) => {
              console.warn('OpenUI render error', errors)
            }}
            queryLoader={
              <view className="relay-loading">
                <text className="relay-loading__text">…</text>
              </view>
            }
          />
        </view>
      </scroll-view>
    </page>
  )
}
