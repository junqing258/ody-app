import React
import React_RCTAppDelegate
import UIKit

final class ReactNativeHost {
  static let shared = ReactNativeHost()

  private var rootViewFactory: RCTRootViewFactory?

  private init() {}

  func makeViewController(moduleName: String, initialProperties: [String: Any]) -> UIViewController {
    let controller = UIViewController()
    controller.title = "RN 示例"

    guard let bundleURL = bundleURL() else {
      controller.view = RNLoadFailureView(message: "无法找到 React Native JavaScript bundle")
      return controller
    }

    let factory = self.rootViewFactory ?? makeRootViewFactory(bundleURL: bundleURL)
    self.rootViewFactory = factory

    let rootView = factory.view(
      withModuleName: moduleName,
      initialProperties: initialProperties,
      launchOptions: nil
    )
    rootView.backgroundColor = .systemBackground
    controller.view = rootView
    return controller
  }

  private func makeRootViewFactory(bundleURL: URL) -> RCTRootViewFactory {
    // RN 0.87 默认 New Architecture（bridgeless），与项目决策一致。
    let configuration = RCTRootViewFactoryConfiguration(bundleURL: bundleURL, newArchEnabled: true)
    return RCTRootViewFactory(configuration: configuration)
  }

  private func bundleURL() -> URL? {
    #if DEBUG
      return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
    #else
      return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
    #endif
  }
}

private final class RNLoadFailureView: UIView {
  init(message: String) {
    super.init(frame: .zero)
    backgroundColor = .systemBackground

    let label = UILabel()
    label.text = message
    label.numberOfLines = 0
    label.textAlignment = .center
    label.textColor = .secondaryLabel
    label.translatesAutoresizingMaskIntoConstraints = false
    addSubview(label)
    NSLayoutConstraint.activate([
      label.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 24),
      label.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -24),
      label.centerYAnchor.constraint(equalTo: centerYAnchor),
    ])
  }

  @available(*, unavailable)
  required init?(coder: NSCoder) { fatalError("init(coder:) has not been implemented") }
}
