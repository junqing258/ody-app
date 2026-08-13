# ADR 001: Native-first brownfield host

状态：Accepted（2026-08-13）

## 决策

- UIKit/Swift 的 iOS App 是宿主，拥有生命周期、启动、`UINavigationController` 和 Native 首页。
- React Native 0.87.0 只按需挂载 `OdyAppFeature` root；Release 由 Xcode 的 bundle phase 生成离线 JS bundle。
- Native 管理 App 级导航，React Navigation 只管理一个 RN feature 内部的子栈。
- Zustand 只承载客户端 feature state；服务端缓存待首个 API feature 再引入 TanStack Query。
- NativeWind 4.2.6 + Tailwind CSS 3.4.17 + 项目内 RNR 风格源码组件是首期 UI PoC。

## 基线决策

| 项目 | 当前值 |
| --- | --- |
| Display name | Ody App |
| Bundle ID | `com.ody.app` |
| Deployment target | iOS 15.1（RN 0.87 模板基线） |
| Node | 24.17.0（`.nvmrc`） |
| pnpm | 10.9.0（CI 固定） |
| Native UI | UIKit |
| Android | 本阶段不创建、不构建、不验收 |

## 契约与安全边界

Native -> RN 只传可序列化 `initialRoute`；RN -> Native 只通过 `AppNavigationModule` 请求关闭 RN 或打开白名单路由。`SessionModule` 不返回 token，敏感凭证继续由 Native 安全存储持有。

## 退出条件

如果 NativeWind/RNR 无法在 Release 离线 bundle、主题同步或 RN root 生命周期测试中稳定工作，回退为 primitives + `StyleSheet` 的项目自有组件层；不在工程中同时引入 Tamagui。
