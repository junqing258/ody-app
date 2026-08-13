import UIKit

final class HomeViewController: UIViewController {
  private let openButton = UIButton(type: .system)

  override func viewDidLoad() {
    super.viewDidLoad()
    title = "Ody App"
    view.backgroundColor = .systemBackground

    let heading = UILabel()
    heading.text = "Native 首页"
    heading.font = .preferredFont(forTextStyle: .largeTitle)
    heading.adjustsFontForContentSizeCategory = true

    let description = UILabel()
    description.text = "UIKit 宿主拥有 App 生命周期和总导航；业务 feature 按需使用 React Native。"
    description.font = .preferredFont(forTextStyle: .body)
    description.numberOfLines = 0
    description.adjustsFontForContentSizeCategory = true
    description.textColor = .secondaryLabel

    openButton.configuration = .filled()
    openButton.configuration?.title = "打开 RN 示例流程"
    openButton.configuration?.buttonSize = .large
    openButton.addTarget(self, action: #selector(openRNFeature), for: .touchUpInside)

    let stack = UIStackView(arrangedSubviews: [heading, description, openButton])
    stack.axis = .vertical
    stack.spacing = 16
    stack.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(stack)

    NSLayoutConstraint.activate([
      stack.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: 24),
      stack.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor, constant: -24),
      stack.centerYAnchor.constraint(equalTo: view.safeAreaLayoutGuide.centerYAnchor),
    ])
  }

  @objc private func openRNFeature() {
    (navigationController as? AppNavigationController)?.openReactNativeFeature()
  }
}
