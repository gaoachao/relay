export type HapticKind = 'step' | 'success' | 'warning'

const MAX_NATIVE_COPY_LENGTH = 240

function compact(value: string): string {
  return value.trim().slice(0, MAX_NATIVE_COPY_LENGTH)
}

export const relayBridge = {
  announce(message: string): void {
    NativeModules.RelayBridge?.announce(compact(message))
  },

  confirmGuidance(title: string, message: string): Promise<boolean> {
    const bridge = NativeModules.RelayBridge
    if (!bridge) {
      console.warn('RelayBridge is unavailable; blocking the guided action.')
      return Promise.resolve(false)
    }

    return new Promise((resolve) => {
      bridge.confirmGuidance(compact(title), compact(message), resolve)
    })
  },

  requestHaptic(kind: HapticKind): void {
    NativeModules.RelayBridge?.requestHaptic(kind)
  },
}
