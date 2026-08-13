import UIKit

final class AppNavigationController: UINavigationController, UINavigationControllerDelegate {
  /// The pushed RN feature container. The outer navigation bar is hidden while it
  /// is on screen, because the RN feature renders its own native-stack header.
  private weak var reactNativeFeatureViewController: UIViewController?

  override func viewDidLoad() {
    super.viewDidLoad()
    delegate = self
  }

  func openReactNativeFeature() {
    let viewController = ReactNativeHost.shared.makeViewController(
      moduleName: "OdyAppFeature",
      initialProperties: ["initialRoute": ["screen": "Example"]]
    )
    reactNativeFeatureViewController = viewController
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

  func navigationController(
    _ navigationController: UINavigationController,
    willShow viewController: UIViewController,
    animated: Bool
  ) {
    let isReactNativeFeature = viewController === reactNativeFeatureViewController
    navigationController.setNavigationBarHidden(isReactNativeFeature, animated: animated)
  }
}
