import Foundation

final class RelayLynxRuntime {
    static let shared = RelayLynxRuntime()

    private var started = false

    private init() {}

    func start() {
        guard !started else { return }
        LynxEnv.sharedInstance()
        started = true
    }
}
