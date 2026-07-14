import AVFoundation
import SwiftUI
import VisionKit

struct ScannerFlowView: View {
    private enum CameraState {
        case checking
        case denied
        case ready
        case unavailable
    }

    @State private var cameraState: CameraState = .checking
    @State private var recognizedControls: [String] = []
    @State private var selectedScan: PanelScan?

    var body: some View {
        Group {
            switch cameraState {
            case .checking:
                ProgressView("scanner.checking")
            case .denied:
                scannerUnavailable(
                    title: "scanner.permission_title",
                    message: "scanner.permission_message"
                )
            case .unavailable:
                scannerUnavailable(
                    title: "scanner.unavailable_title",
                    message: "scanner.unavailable_message"
                )
            case .ready:
                scanner
            }
        }
        .navigationTitle("scanner.title")
        .navigationBarTitleDisplayMode(.inline)
        .navigationDestination(item: $selectedScan) { scan in
            GeneratedInterfaceView(scan: scan)
        }
        .task {
            await resolveCameraState()
        }
    }

    private var scanner: some View {
        ZStack(alignment: .top) {
            LiveTextScanner(recognizedControls: $recognizedControls)
                .ignoresSafeArea(edges: .bottom)

            Text(
                recognizedControls.isEmpty
                    ? "scanner.finding"
                    : String(format: String(localized: "scanner.found_count"), recognizedControls.count)
            )
            .font(.subheadline.weight(.semibold))
            .padding(.horizontal, 14)
            .padding(.vertical, 9)
            .background(.regularMaterial, in: Capsule())
            .padding(.top, 12)
        }
        .safeAreaInset(edge: .bottom) {
            VStack(spacing: 8) {
                Button("scanner.use_panel") {
                    selectedScan = PanelScan(recognizedControls: recognizedControls)
                }
                .buttonStyle(.borderedProminent)
                .controlSize(.large)
                .frame(maxWidth: .infinity)
                .disabled(recognizedControls.isEmpty)

                Text("scanner.review_note")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
            .padding(16)
            .background(.bar)
        }
    }

    private func scannerUnavailable(title: LocalizedStringKey, message: LocalizedStringKey) -> some View {
        ContentUnavailableView {
            Label(title, systemImage: "camera.viewfinder")
        } description: {
            Text(message)
        } actions: {
            Button("scanner.use_demo") {
                selectedScan = .preview
            }
            .buttonStyle(.borderedProminent)
        }
    }

    @MainActor
    private func resolveCameraState() async {
        guard DataScannerViewController.isSupported,
              DataScannerViewController.isAvailable else {
            cameraState = .unavailable
            return
        }

        switch AVCaptureDevice.authorizationStatus(for: .video) {
        case .authorized:
            cameraState = .ready
        case .notDetermined:
            cameraState = await CameraPermission.request() ? .ready : .denied
        default:
            cameraState = .denied
        }
    }
}

private enum CameraPermission {
    static func request() async -> Bool {
        await withCheckedContinuation { continuation in
            AVCaptureDevice.requestAccess(for: .video) { granted in
                continuation.resume(returning: granted)
            }
        }
    }
}

private struct LiveTextScanner: UIViewControllerRepresentable {
    @Binding var recognizedControls: [String]

    func makeCoordinator() -> Coordinator {
        Coordinator(recognizedControls: $recognizedControls)
    }

    func makeUIViewController(context: Context) -> DataScannerViewController {
        let scanner = DataScannerViewController(
            recognizedDataTypes: [.text(languages: ["en-US", "zh-Hans"])],
            qualityLevel: .balanced,
            recognizesMultipleItems: true,
            isHighFrameRateTrackingEnabled: true,
            isPinchToZoomEnabled: true,
            isGuidanceEnabled: true,
            isHighlightingEnabled: true
        )
        scanner.delegate = context.coordinator

        DispatchQueue.main.async {
            try? scanner.startScanning()
        }
        return scanner
    }

    func updateUIViewController(_ uiViewController: DataScannerViewController, context: Context) {}

    static func dismantleUIViewController(_ uiViewController: DataScannerViewController, coordinator: Coordinator) {
        uiViewController.stopScanning()
    }

    final class Coordinator: NSObject, DataScannerViewControllerDelegate {
        @Binding private var recognizedControls: [String]

        init(recognizedControls: Binding<[String]>) {
            _recognizedControls = recognizedControls
        }

        func dataScanner(
            _ dataScanner: DataScannerViewController,
            didAdd addedItems: [RecognizedItem],
            allItems: [RecognizedItem]
        ) {
            update(from: allItems)
        }

        func dataScanner(
            _ dataScanner: DataScannerViewController,
            didUpdate updatedItems: [RecognizedItem],
            allItems: [RecognizedItem]
        ) {
            update(from: allItems)
        }

        func dataScanner(
            _ dataScanner: DataScannerViewController,
            didRemove removedItems: [RecognizedItem],
            allItems: [RecognizedItem]
        ) {
            update(from: allItems)
        }

        private func update(from items: [RecognizedItem]) {
            let labels = items.compactMap { item -> String? in
                guard case let .text(text) = item else { return nil }
                let candidate = text.transcript.trimmingCharacters(in: .whitespacesAndNewlines)
                return candidate.isEmpty ? nil : candidate
            }

            recognizedControls = Array(NSOrderedSet(array: labels)).compactMap { $0 as? String }.prefix(8).map { $0 }
        }
    }
}
