# Project UI layer

This directory is the checked-in component layer for the NativeWind v4 + React
Native Reusables decision. Components follow the RNR/shadcn source-ownership
model: the project owns the source, variants, accessibility behavior, and
upgrades. RNR CLI is intentionally not run in CI and must never overwrite this
directory automatically.

`global.css` is the single source for semantic CSS variables. `theme.ts` is the
typed copy consumed by native-stack and code that cannot consume a class name;
the values are kept in sync by `scripts/check-theme-tokens.mjs`.
