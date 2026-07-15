import SwiftUI
import UIKit

private extension Color {
    static let relayAccent = Color(
        uiColor: UIColor { traits in
            traits.userInterfaceStyle == .dark
                ? UIColor(red: 214.0 / 255.0, green: 167.0 / 255.0, blue: 196.0 / 255.0, alpha: 1)
                : UIColor(red: 104.0 / 255.0, green: 64.0 / 255.0, blue: 95.0 / 255.0, alpha: 1)
        }
    )
}

@main
struct RelayApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) private var appDelegate

    var body: some Scene {
        WindowGroup {
            HomeView()
                .tint(.relayAccent)
        }
    }
}
