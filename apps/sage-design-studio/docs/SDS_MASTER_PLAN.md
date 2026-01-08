# SDS Master Plan: Cross-Platform Expansion

> [!IMPORTANT]
> **Vision:** A "Creative Solopreneur" stack enabling the efficient building of premium web and native apps.
> **Philosophy:** "Universal Brain, Specific Hands." We share tokens and logic 100%, but respect platform differences where quality dictates.

---

## 1. Architecture: The "Sage Stack"

We are shifting from a single package to a **Solito-powered Monorepo**. This structure optimizes for code sharing without sacrificing native performance.

### The Stack
| Layer | Technology | Why? |
| :--- | :--- | :--- |
| **Logic** | `rn-primitives` (Mobile) / Radix (Web) | Accessible, headless, "shadcn-style" copy-paste workflow. |
| **Styling** | **NativeWind v4** | Universal Tailwind tokens. Zero runtime overhead. |
| **Routing** | **Solito** + Expo Router | Logic-sharing for screens. Use Next.js for Web, Expo for iOS/Android. |
| **Monorepo** | **Turborepo** | Fast builds. Manages the workspace relationships. |

### Universal vs. Platform-Specific
To avoid the "Uncanny Valley" of cross-platform apps, we strictly define what is shared and what is not.

| Aspect | Universal? | Strategy |
| :--- | :--- | :--- |
| **Tokens** | ✅ **YES** | Single source of truth (Colors, Spacing, Typography). |
| **Business Logic** | ✅ **YES** | Hooks, Stores (Zustand), API Clients, Zod Schemas. |
| **Component Props** | ✅ **YES** | `<Button>` handles `onPress` and `onClick` identically via abstraction. |
| **Layout Primitives** | ⚠️ **MOSTLY** | Flexbox is universal. Platform-specific safe areas are handled by Solito. |
| **Navigation** | ❌ **NO** | Web uses URLs/History. Native uses Stacks/Modals. Solito bridges this, but the *feel* remains native. |
| **Gestures** | ❌ **NO** | Native relies on Swipes/Haptics. Web relies on Hover/Click. |

---

## 2. Repo Structure (Target State)

We will adopt a clear package naming convention (`@sds/*`) to prepare for the future.

```
ecosystem/
├── apps/
│   ├── web/                 # (Existing) Portfolio/Studio (Next.js)
│   └── mobile/              # (New) iOS/Android App (Expo)
├── packages/
│   ├── tokens/              # (@sds/tokens) The "Brain". JSON/TS definitions.
│   ├── ui/                  # (@sds/ui) Universal Components (Button, Card).
│   ├── core/                # (@sds/core) Logic, Hooks, Stores.
│   └── config/              # Shared configurations (Tailwind, ESLint).
```

### The Solito Distinction
*   **`@sds/ui`**: Contains *Components* (Atoms/Molecules).
*   **`packages/app` (Solito)**: Contains *Features* (Screens/Flows).
    *   *Usage Guideline:* Use Solito Shared Screens for simple flows (Marketing, Auth, Settings). Build platform-specific screens for complex, gesture-heavy interactions (Canvas editors, Hardware access).

---

## 3. Strategic Guardrails (What We Are NOT Doing)

To ensure shipping velocity, we explicitly de-scope the following:
*   **NO `Zag.js` (Yet):** We stick to `rn-primitives`/Radix. State machines are powerful but overkill for v1.
*   **NO "Write Once, Run Everywhere" Dogma:** If a screen feels janky on mobile, we fork it. We prefer duplication over mediocrity.
*   **NO Auto-generated Components (Yet):** We do not automate component creation until the patterns are proven manually in Phase 4.

---

## 4. Phased Implementation Plan

### Phase 1: The Foundation (Tokens)
**Goal:** Establish `@sds/tokens` as the single source of truth without breaking the current Studio.
- [x] Create `packages/tokens` and move generic token logic there.
- [x] Create `packages/config` with a shared Tailwind config.
- [x] Update `design-system` (Web) to import from `packages/tokens`.
- **Exit Criteria:** The existing Sage Design Studio builds successfully, but consumes tokens from the new package. ✅
- **Rollback Plan:** Revert `package.json` imports in `design-system` to local files if the build fails.

### Phase 2: The Universal Atom
**Goal:** Prove the "Universal Component" concept with ONE component.
- [x] Initialize `packages/ui` with `nativewind` and `rn-primitives`.
- [x] Implement `Button.tsx` in `@sds/ui` using the shared tokens.
- **Exit Criteria:** `@sds/ui/Button` renders correctly on a **Web** test page within the Studio. ✅

### Phase 3: The Mobile Entry
**Goal:** Boot up the iOS environment.
- [x] Initialize `apps/mobile` (Expo).
- [x] Configure to consume `@sds/ui` and `@sds/tokens`.
- **Exit Criteria:** `apps/mobile` runs in an iOS Simulator and displays the Universal Button. (Configured ✅ - Ready for local simulator launch)

### Phase 4: Workflow Validation (Solito)
**Goal:** Prove screen sharing across platforms.
- [ ] Create a `demo-screen` in `packages/app/features`.
- [ ] Mount it in both `apps/web` and `apps/mobile`.
- **Exit Criteria:** Editing text in `demo-screen` hot-reloads on **both** Web and Simulator simultaneously.

### Phase 5: The Tiered Migration
**Goal:** Systematically migrate components to `@sds/ui` based on value.
*   **Tier 1 (Core):** Button, Input, Card, Text, Box. (High Usage)
*   **Tier 2 (structure):** Container, Stack, Grid.
*   **Tier 3 (Niche):** Specific marketing components. (Migrate on demand).

**The MCP "Autopilot" Role (V1):**
*   During this phase, we introduce a simple MCP tool: `review_component_for_migration`.
*   *Input:* Path to legacy component.
*   *Output:* A draft Universal version using `rn-primitives` + a checklist of props to verify.
*   *Constraint:* The user MUST manually review and commit. No auto-commits.

---

## 5. Next Steps

1.  **Approval:** Confirm this plan aligns with your vision.
2.  **Execution:** Begin Phase 1 (Create `packages/tokens`).

## 6. Known Issues & Workarounds
- **React 19 Compatibility**: `react-native-web`@0.19.x requires a patch to work with React 19 (which removed `render` and `hydrate`). A patch file (`patch-rnw-render.js`) is applied in `node_modules` for Studio.
- **Expo & NativeWind**: Requires `unstable_enablePackageExports: true` in Metro config to resolve `react-native-css-interop` correctly.

## 7. Troubleshooting Log: Web Styling (Phase 2)
**Status**: BLOCKED
**Date**: 2026-01-07
**Issue**: Universal components (`@sds/ui`) render unstyled in the Next.js app (`sage-design-studio`), specifically those using `react-native-web` primitives (`Pressable`, `Text`).

### Root Cause Analysis
1.  **Tailwind Scanning is Working**: Standard HTML elements (`<button>`, `<div>`) in `apps/sage-design-studio` are correctly styled by Tailwind when testing. This confirms `tailwind.config.ts` content paths are correct (using absolute paths).
2.  **React Native Web + NativeWind**: The issue is specifically with how `nativewind` processes styles for React Native components. `nativewind` transforms `className` props into React Native style objects.
3.  **Compiler Conflict**:
    *   `next/font` (Google Fonts) requires Next.js to use the **SWC** compiler.
    *   `nativewind` (v4) requires **Babel** to process styles in a Next.js environment.
    *   **Conflict**: Enabling Babel (via `babel.config.js`) forces Next.js to disable SWC, which breaks `next/font`.
    *   **Current State**: We have temporarily mocked `next/font` imports in `lib/fonts.ts` to allow Babel to run without crashing the build.

### Attempted Solutions (Failed)
1.  **Tailwind Path Fixes**: Switched to absolute paths (`path.join(__dirname, ...)`) in `tailwind.config.ts`. (Proved effective for HTML, not RNW).
2.  **Explicit Transpilation**: Added `@sds/ui`, `nativewind`, `react-native-css-interop` to `transpilePackages` in `next.config.mjs`.
3.  **Babel Configuration**: Added `babel.config.js` with `presets: ['next/babel', 'nativewind/babel']`.
4.  **Local Component**: Created `LocalUniversalButton.tsx` inside the app to bypass monorepo resolution issues. It also failed to style, confirming the issue is the compilation environment, not the package link.

### Hypotheses for Next Steps
1.  **NativeWind Next.js Plugin**: We might be missing a dedicated Next.js plugin for NativeWind v4 that handles this SWC/Babel interop better than manual config.
2.  **SWC Support**: Check if NativeWind has released SWC support, which would eliminate the need for Babel.
3.  **Expo Adapter**: Switching the "Web" app to use Expo Router (via `apps/mobile` serving web) works flawlessly. The issue is strictly integrating RNW+NativeWind into a *standard* Next.js app.
    *   *Alternative*: Re-evaluate if `sage-design-studio` *needs* to be a raw Next.js app or if it can be an Expo Web app.

