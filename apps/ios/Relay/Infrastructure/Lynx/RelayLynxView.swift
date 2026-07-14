import SwiftUI
import UIKit

struct RelayLynxView: UIViewRepresentable {
    let initData: [String: Any]

    func makeUIView(context: Context) -> LynxView {
        RelayLynxRuntime.shared.start()

        let size = UIScreen.main.bounds.size
        let config = LynxConfig(provider: BundleTemplateProvider())
        config.registerModule(RelayBridge.self)

        let lynxView = LynxView { builder in
            builder.config = config
            builder.screenSize = size
            builder.fontScale = 1.0
        }
        lynxView.preferredLayoutWidth = size.width
        lynxView.preferredLayoutHeight = size.height
        lynxView.layoutWidthMode = .exact
        lynxView.layoutHeightMode = .exact

        let meta = LynxLoadMeta()
        meta.url = "main.lynx.bundle"
        meta.initialData = LynxTemplateData(dictionary: initData)
        lynxView.loadTemplate(meta)

        return lynxView
    }

    func updateUIView(_ uiView: LynxView, context: Context) {
        let size = uiView.bounds.size
        guard size.width > 0, size.height > 0 else { return }
        uiView.preferredLayoutWidth = size.width
        uiView.preferredLayoutHeight = size.height
    }
}
