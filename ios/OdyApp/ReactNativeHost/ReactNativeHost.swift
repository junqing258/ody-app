import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import UIKit

final class ReactNativeHost {
  static let shared = ReactNativeHost()

  /// `RCTReactNativeFactory` wires up the jsRuntime / turboModule / host delegates
  /// exactly like the RN 0.87 template; `rootViewFactory` lets us mount views on demand.
  // RCTReactNativeFactory keeps this delegate weak. The host owns it for the
  // entire application lifetime so bundle resolution and reload callbacks cannot
  // disappear after the factory is created.
  private let reactNativeDelegate = OdyAppReactNativeDelegate()

  private lazy var reactNativeFactory: RCTReactNativeFactory = {
    reactNativeDelegate.dependencyProvider = RCTAppDependencyProvider()
    return RCTReactNativeFactory(delegate: reactNativeDelegate)
  }()

  private init() {}

  func makeViewController(moduleName: String, initialProperties: [String: Any]) -> UIViewController {
    let controller = UIViewController()
    controller.title = "RN 示例"

    let rootView = reactNativeFactory.rootViewFactory.view(
      withModuleName: moduleName,
      initialProperties: initialProperties,
      launchOptions: nil
    )
    rootView.backgroundColor = .systemBackground
    controller.view = rootView
    return controller
  }
}

final class OdyAppReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    bundleURL()
  }

  override func bundleURL() -> URL? {
    #if DEBUG
      return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
    #else
      return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
    #endif
  }
}
