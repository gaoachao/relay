import Foundation

struct PanelScan: Hashable, Identifiable {
    let id: UUID
    let recognizedControls: [String]

    init(id: UUID = UUID(), recognizedControls: [String]) {
        self.id = id
        self.recognizedControls = recognizedControls
    }

    static let preview = PanelScan(
        recognizedControls: ["Power", "30s", "Start", "Cancel"]
    )
}
