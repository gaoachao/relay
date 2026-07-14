import SwiftUI

struct HomeView: View {
    var body: some View {
        NavigationStack {
            VStack(alignment: .leading, spacing: 24) {
                Spacer(minLength: 32)

                VStack(alignment: .leading, spacing: 10) {
                    Text("Relay")
                        .font(.system(size: 44, weight: .bold, design: .rounded))
                    Text("home.tagline")
                        .font(.title3)
                        .foregroundStyle(.secondary)
                        .fixedSize(horizontal: false, vertical: true)
                }

                Spacer()

                VStack(alignment: .leading, spacing: 12) {
                    Label("home.camera_note", systemImage: "viewfinder")
                    Label("home.control_note", systemImage: "hand.raised")
                }
                .font(.subheadline)
                .foregroundStyle(.secondary)

                NavigationLink {
                    ScannerFlowView()
                } label: {
                    Text("home.primary_action")
                        .frame(maxWidth: .infinity, minHeight: 28)
                }
                .buttonStyle(.borderedProminent)
                .controlSize(.large)
            }
            .padding(24)
            .navigationBarTitleDisplayMode(.inline)
        }
    }
}

#Preview {
    HomeView()
}
