import UIKit

@objcMembers
public final class RelayBridge: NSObject, LynxModule {
    public static var name: String { "RelayBridge" }

    public static var methodLookup: [String: String] {
        [
            "announce": NSStringFromSelector(#selector(announce(_:))),
            "confirmGuidance": NSStringFromSelector(#selector(confirmGuidance(_:message:completion:))),
            "requestHaptic": NSStringFromSelector(#selector(requestHaptic(_:))),
        ]
    }

    public func announce(_ message: String) {
        DispatchQueue.main.async {
            UIAccessibility.post(notification: .announcement, argument: Self.compact(message))
        }
    }

    public func requestHaptic(_ kind: String) {
        DispatchQueue.main.async {
            switch kind {
            case "success":
                UINotificationFeedbackGenerator().notificationOccurred(.success)
            case "warning":
                UINotificationFeedbackGenerator().notificationOccurred(.warning)
            default:
                UIImpactFeedbackGenerator(style: .medium).impactOccurred()
            }
        }
    }

    public func confirmGuidance(
        _ title: String,
        message: String,
        completion: @escaping (NSNumber) -> Void
    ) {
        DispatchQueue.main.async {
            guard let presenter = Self.topViewController() else {
                completion(false)
                return
            }

            let alert = UIAlertController(
                title: Self.compact(title),
                message: Self.compact(message),
                preferredStyle: .alert
            )
            alert.addAction(
                UIAlertAction(title: String(localized: "action.cancel"), style: .cancel) { _ in
                    completion(false)
                }
            )
            alert.addAction(
                UIAlertAction(title: String(localized: "action.continue"), style: .default) { _ in
                    completion(true)
                }
            )
            presenter.present(alert, animated: true)
        }
    }

    private static func compact(_ value: String) -> String {
        String(value.trimmingCharacters(in: .whitespacesAndNewlines).prefix(240))
    }

    private static func topViewController(from root: UIViewController? = keyWindow?.rootViewController) -> UIViewController? {
        if let navigation = root as? UINavigationController {
            return topViewController(from: navigation.visibleViewController)
        }
        if let tab = root as? UITabBarController {
            return topViewController(from: tab.selectedViewController)
        }
        if let presented = root?.presentedViewController {
            return topViewController(from: presented)
        }
        return root
    }

    private static var keyWindow: UIWindow? {
        UIApplication.shared.connectedScenes
            .compactMap { $0 as? UIWindowScene }
            .flatMap(\.windows)
            .first(where: \.isKeyWindow)
    }
}
