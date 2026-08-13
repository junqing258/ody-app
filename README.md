# Ody App

以原生优先的棕色地带 iOS 应用：UIKit 负责应用生命周期与导航，React Native 负责按需挂载的功能页面。

## 基础信息

- 当前阶段仅支持 iOS，目录中刻意没有 `android/`。
- RN 0.87.0、TypeScript 严格模式、pnpm 10.9.0、Node 24.17.0。
- NativeWind v4 + 项目自有的 React Native Reusables 风格组件。
- Bundle ID：`com.ody.app`；最低支持 iOS 15.1。

## 开发

```sh
pnpm install
bundle install
bundle exec pod install --project-directory=ios
pnpm start
pnpm ios
```

应用启动后进入原生首页。点击“打开 RN 示例流程”即可挂载 RN 功能页面，在其内部子栈中导航，并使用“返回 Native 首页”让类型化桥接层弹出原生导航栈。

### 真机 iPhone 开发

先在一个终端保持 Metro 运行：

```sh
pnpm start
```

然后在已连接的 iPhone 上安装并启动 Debug 应用（将 UDID 替换为 `xcrun xctrace list devices` 显示的设备）：

```sh
pnpm exec react-native run-ios --udid <DEVICE_UDID> --scheme OdyApp --no-packager
```

例如，当前连接的设备可以这样运行：

```sh
pnpm exec react-native run-ios --udid 00008130-0006202134F8001C --scheme OdyApp --no-packager
```

在 Xcode 中选择 iPhone 目标，而不是 “My Mac (Designed for iPad/iPhone)”。Debug 构建从 Metro 加载 JavaScript，因此 Fast Refresh 需要 Metro 始终监听 `8081` 端口。如果改动没有刷新，请确保 iPhone 与 Mac 处于同一网络，放行 macOS 防火墙的 `8081` 端口，并在 Dev Menu 中将打包器地址设为 `<MAC_LAN_IP>:8081` 后重新加载。Swift、Pods 或其他原生配置的改动需要重新构建应用。

## 检查

```sh
pnpm typecheck
pnpm lint
pnpm test
pnpm format:check
node scripts/check-theme-tokens.mjs
node scripts/validate-no-android.mjs
```

Release 构建使用 Xcode 的 “Bundle React Native code and images” 阶段，因此不依赖 Metro。所有权规则与升级/回滚限制请参见 [`docs/adr-001-hybrid-architecture.md`](docs/adr-001-hybrid-architecture.md) 和 [`docs/app-initialization-plan.md`](docs/app-initialization-plan.md)。
