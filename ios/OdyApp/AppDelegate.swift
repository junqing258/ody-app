import UIKit

@main
final class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    let navigationController = AppNavigationController()
    let homeViewController = HomeViewController()
    navigationController.setViewControllers([homeViewController], animated: false)

    let window = UIWindow(frame: UIScreen.main.bounds)
    window.rootViewController = navigationController
    window.makeKeyAndVisible()
    self.window = window

    NotificationCenter.default.addObserver(
      self,
      selector: #selector(closeReactNativeFeature),
      name: .odyAppCloseReactNative,
      object: nil
    )
    NotificationCenter.default.addObserver(
      self,
      selector: #selector(openNativeRoute(_:)),
      name: .odyAppOpenNativeRoute,
      object: nil
    )

    return true
  }

  @objc private func closeReactNativeFeature() {
    (window?.rootViewController as? AppNavigationController)?.closeReactNativeFeature()
  }

  @objc private func openNativeRoute(_ notification: Notification) {
    guard let route = notification.userInfo?["route"] as? String else { return }
    (window?.rootViewController as? AppNavigationController)?.openNativeRoute(route)
  }
}

extension Notification.Name {
  static let odyAppCloseReactNative = Notification.Name("OdyApp.closeReactNative")
  static let odyAppOpenNativeRoute = Notification.Name("OdyApp.openNativeRoute")
}
