# Ody App

Native-first brownfield iOS app: UIKit owns the app lifecycle and navigation,
while React Native owns feature screens mounted on demand.

## Baseline

- iOS only in this phase; there is intentionally no `android/` directory.
- RN 0.87.0, TypeScript strict mode, pnpm 10.9.0, Node 24.17.0.
- NativeWind v4 + project-owned React Native Reusables-style components.
- Bundle ID: `com.ody.app`; deployment target: iOS 15.1.

## Development

```sh
pnpm install
bundle install
bundle exec pod install --project-directory=ios
pnpm start
pnpm ios
```

The app starts on the Native Home screen. Tap “打开 RN 示例流程” to mount the
RN feature, navigate inside its child stack, and use “返回 Native 首页” to let
the typed bridge pop the Native navigation stack.

## Checks

```sh
pnpm typecheck
pnpm lint
pnpm test
pnpm format:check
node scripts/check-theme-tokens.mjs
node scripts/validate-no-android.mjs
```

Release builds use the Xcode “Bundle React Native code and images” phase, so
they do not depend on Metro. See [`docs/adr-001-hybrid-architecture.md`](docs/adr-001-hybrid-architecture.md)
and [`docs/app-initialization-plan.md`](docs/app-initialization-plan.md) for the
ownership rules and upgrade/rollback constraints.
