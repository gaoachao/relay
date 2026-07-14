import SwiftUI

struct GeneratedInterfaceView: View {
    let scan: PanelScan

    var body: some View {
        RelayLynxView(initData: initData)
            .background(Color(uiColor: .systemGroupedBackground))
            .navigationTitle("guidance.title")
            .navigationBarTitleDisplayMode(.inline)
    }

    private var initData: [String: Any] {
        [
            "scanId": scan.id.uuidString,
            "recognizedControls": scan.recognizedControls,
            "locale": Locale.current.language.languageCode?.identifier == "zh" ? "zh-Hans" : "en",
            "userMode": "default",
            "isStreaming": false,
        ]
    }
}
