# Mobile App & Universal System (PAUSED)
**Date Paused:** January 7, 2026
**Status:** Archived / On Ice

## Context & Objective
The goal of this project was to creating a "Sage Stack" for the creative solopreneur: a single monorepo (`ecosystem`) sharing a Universal Design System (`@sage/ui`) across a Next.js Web App (`apps/sage-design-studio`) and an Expo Mobile App (`apps/mobile`).

The core philosophy was "Universal Brain, Specific Hands"—sharing tokens and logic 100%, and sharing UI components where possible using `react-native-web` + `nativewind` (Tailwind for RN).

## Why This Was Paused
We hit a significant "Uncanny Valley" complexity block when trying to integrate **NativeWind v4** into the **Next.js** environment.

While the Mobile App (Expo) worked fine with NativeWind, the Next.js app could not correctly style the React Native Web components sourced from `@sage/ui`.

### The Technical Blocker
1.  **Tailwind works**: Standard HTML elements in Next.js were styled correctly.
2.  **RNW Unstyled**: Components using `Pressable` / `Text` from `@sage/ui` rendered but had seemingly no styles applied on the Web side.
3.  **Compiler Conflict**:
    *   **NativeWind v4** requires **Babel** to transform `className` props into React Native style objects.
    *   **Next.js 15+** (specifically `next/font`) relies on **SWC**.
    *   Enabling Babel (to support NativeWind) caused `next/font` to crash the build (`Syntax error: "next/font" requires SWC...`).
    *   Disabling `next/font` (via mocking) allowed the build to pass, but the runtime style injection for NativeWind still appeared flaky or non-functional in the Next.js context.

### 3rd Party Analysis & Findings
We conducted a deep analysis (via Claude/Goose) which identified the root cause:
*   **Missing Runtime Pipeline**: NativeWind isn't just CSS; it requires a runtime shim to bridge `className` to `react-native-web`'s `style` prop. This is automatic in Metro (Expo) via `withNativeWind` but manual and experimental in Next.js (Webpack/Turbo).
*   **Recommendation**: The analysis suggested that forcing this integration defeats the purpose of "efficiency."

It proposed two paths:
1.  **Hard Path**: Manually configure a `setup-nativewind.js` shim and fight the SWC/Babel conflict (likely losing `next/font`).
2.  **Easy Path**: Use **Expo Web** if universal components are required, effectively abandoning Next.js for the "app" portion.

### Strategic Pivot
We chose a **third path**: **Web-Only Focus**.
To maximize velocity for the solopreneur use case, we decided to:
1.  **Drop Mobile/Universal constraint** for now.
2.  Refactor `@sage/ui` to be a pure **React/DOM/Tailwind** library (shadcn-style).
3.  Focus on making the Web experience (`sage-design-studio`) premium, accessible, and fast using Next.js native features (SWC, Fonts, Image Optimization) without the overhead of React Native compatibility.

## How to Resume Work (For Future AI Agents)
If you are reading this, the user wants to un-pause mobile development.

**Prerequisites:**
*   You need to re-install `react-native`, `react-native-web`, and `nativewind` in `@sage/ui`.
*   You need to re-configure `babel.config.js` in `apps/sage-design-studio` (note the SWC conflict).

**Recommended Strategy to Resume:**
Don't try to force NativeWind v4 into Next.js 15 again unless NativeWind has released a dedicated SWC plugin.
Instead:
1.  **Use Expo Web**: Run the web version of the app via Expo (`npx expo start --web`) for true universal compatibility.
2.  **OR Separate Components**: create `@sage/ui-native` and `@sage/ui-web`. Share *Tokens* (`@sage/tokens`) but keep component implementations platform-specific. This aligns with the "Specific Hands" philosophy and avoids the build-tool nightmare.

## Current State of This Directory
*   **Expo SDK**: 54
*   **React**: 19
*   **Bundler**: Metro
*   **Styling**: NativeWind v4 (configured in `metro.config.js` and `tailwind.config.js`)
*   **Status**: Runnable (`npx expo start`), but currently ignored by the rest of the monorepo workflow.
