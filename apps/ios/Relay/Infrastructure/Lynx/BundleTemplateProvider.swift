import Foundation

final class BundleTemplateProvider: NSObject, LynxTemplateProvider {
    func loadTemplate(withUrl url: String!, onComplete callback: LynxTemplateLoadBlock!) {
        let path = (url ?? "main.lynx.bundle") as NSString
        let resource = path.deletingPathExtension
        let fileExtension = path.pathExtension.isEmpty ? "bundle" : path.pathExtension
        let fileURL =
            Bundle.main.url(forResource: resource, withExtension: fileExtension, subdirectory: "Lynx")
            ?? Bundle.main.url(forResource: resource, withExtension: fileExtension)

        guard let fileURL else {
            callback(
                nil,
                NSError(
                    domain: "com.gaoachao.relay.lynx",
                    code: 404,
                    userInfo: [NSLocalizedDescriptionKey: "Missing embedded Lynx bundle."]
                )
            )
            return
        }

        do {
            callback(try Data(contentsOf: fileURL), nil)
        } catch {
            callback(nil, error)
        }
    }
}
