import UIKit

final class AppNavigationController: UINavigationController {
  func openReactNativeFeature() {
    let viewController = ReactNativeHost.shared.makeViewController(
      moduleName: "OdyAppFeature",
      initialProperties: ["initialRoute": ["screen": "Example"]]
    )
    pushViewController(viewController, animated: true)
  }

  func closeReactNativeFeature() {
    guard viewControllers.count > 1 else { return }
    popViewController(animated: true)
  }

  func openNativeRoute(_ route: String) {
    switch route {
    case "home":
      popToRootViewController(animated: true)
    case "settings":
      let controller = UIViewController()
      controller.view.backgroundColor = .systemBackground
      controller.title = "设置"
      pushViewController(controller, animated: true)
    default:
      assertionFailure("Unsupported native route: \(route)")
    }
  }
}
