type RelayHapticKind = 'step' | 'success' | 'warning'

interface RelayBridgeModule {
  announce(message: string): void
  confirmGuidance(title: string, message: string, callback: (confirmed: boolean) => void): void
  requestHaptic(kind: RelayHapticKind): void
}

declare const NativeModules: {
  RelayBridge?: RelayBridgeModule
}
