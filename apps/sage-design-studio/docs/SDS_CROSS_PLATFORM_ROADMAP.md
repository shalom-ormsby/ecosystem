# Sage Design System: Cross-Platform Strategic Roadmap

> [!IMPORTANT]
> **Goal:** Enable efficient creation of premium web and mobile apps for solopreneurs and creatives.
> **Key Metric:** "Write once, brand everywhere" without sacrificing the "premium feel" that defines SDS.

## Executive Summary

Your proposed stack of **React Native + Expo + NativeWind** is the correct choice. It balances the efficiency of the React ecosystem with the capability to deliver high-quality native experiences.

However, to truly serve "solopreneurs" who need speed without technical debt, we must refine **how** this stack is integrated. The danger is creating two disconnected systems (Web vs. Mobile) that drift apart, doubling your maintenance load. 

**The Solution:** A "Universal Brain, Specific Hands" architecture.
- **Universal Brain:** Tokens, Business Logic, State, and API hooks shared 100%.
- **Specific Hands:** React DOM for Web (SEO, hover states), React Native for Mobile (Gestures, haptics, native feel).
- **The Bridge:** Strict API parity. A `<Button>` on web and mobile should accept the exact same props (`variant`, `size`, `icon`).

---

## 1. Architectural Evolution

Currently, SDS is a single package `@ecosystem/design-system` containing web components. We will evolve this into a monorepo workspace structure.

### Phase 1: Universal Tokens (The "Brain")
We must extract tokens from `design-system/tokens` into a dedicated package that builds for both platforms.

- **New Package:** `packages/tokens` (or `@ecosystem/tokens`)
- **Source:** TypeScript (just like you have now) or JSON.
- **Build Output:** 
  - Generates `tailwind.config.ts` theme (Web)
  - Generates `nativewind-theme.js` (Mobile)
  - Generates CSS Variables (for global web styles)

> [!TIP]
> **Why this matters for solopreneurs:** You change a color *once* in `packages/tokens`, and your Portfolio, Web App, iOS App, and Android App ALL update instantly.

### Phase 2: React Native Component Library
Instead of trying to force your web components to run on mobile (which often feels "janky"), we build a parallel library.

- **New Package:** `packages/sds-native`
- **Tech:** React Native + NativeWind
- **Strategy:** specific implementations of the *same* component registry.
  - Web: `design-system/atoms/Button.tsx` (uses `button`, `div`)
  - Native: `sds-native/atoms/Button.tsx` (uses `Pressable`, `View`)
- **Enforcement:** Both libraries should implement the *same* TypeScript interfaces.

### Phase 3: Shared Logic (The Efficiency Unlock)
Solopreneurs lose time rewriting logic. We need a shared package for non-UI code.

- **New Package:** `packages/core` (or `@ecosystem/core`)
- **Contents:** 
  - Custom Hooks (`useAuth`, `useTheme`)
  - State management (Zustand stores)
  - Validation schemas (Zod)
  - API clients
- **Benefit:** Your "Create Project" logic is written once and imported by both Next.js and Expo.

---

## 2. Refined Tech Stack Recommendation

| Layer | Technology | Why for SDS? |
| :--- | :--- | :--- |
| **Mobile Core** | **Expo (Managed)** | No dealing with Xcode/Android Studio configurations. One command build. Essential for solo devs. |
| **Web Core** | **Next.js** | You already have this. Best for SEO and performance. |
| **Styling** | **NativeWind (v4)** | "Tailwind for Mobile". Allows you to use the *same mental model* and tokens as web. |
| **Navigation** | **Expo Router** | File-based routing for mobile, exactly like Next.js App Router. Reduces context switching. |
| **Animation** | **React Native Reanimated** | Required for the "premium feel" (60fps gestures). Mapped to SDS Motion tokens. |
| **Monorepo** | **Turborepo** | You already use pnpm/workspaces. Turbo speeds up builds. |

---

## 3. Implementation Steps (The "How-To")

### Step 1: Formalize Token Extraction
Move `design-system/tokens` to a new `packages/tokens` workspace.
- Ensure it exports raw data (for computations) and styling configs.
- **Action:** Create `packages/tokens` and move generic token logic there.

### Step 2: Initialize the Expo App
Create the mobile entry point in your monorepo.
- **Action:** `pnpm create expo-app apps/sage-mobile -t expo-template-blank-typescript`
- **Action:** Configure it to consume local packages (`workspace:*`).

### Step 3: Set up NativeWind with SDS Tokens
Configure `apps/sage-mobile/tailwind.config.js` to import the theme from `@ecosystem/tokens`.
- This proves the "write once" concept immediately.

### Step 4: Build the "Bridge" Component
Create your first cross-platform component (e.g., `Button`).
- Define `ButtonProps` in a shared type file.
- Build usage in `apps/sage-mobile` using the new NativeWind styling.

---

## 4. Efficiency Hacks for the Solopreneur

1.  **Scaffold Generator:**
    Create a scaffold script (using Plop.js or just Node) that creates a new component in BOTH `design-system` and `sds-native` simultaneously, using the same props interface.

2.  **Storybook / Ladle? No, use the Studio.**
    Your `sage-design-studio` is excellent. Extend it. 
    - Add a "Native" tab to your Component Playground.
    - Use `react-native-web` *inside the Studio only* to render the Native components for documentation purposes. This lets you document both libraries in one place.

3.  **Strict "No Logic in UI" Rule:**
    To move fast, never put business logic (fetch calls, detailed validation) inside your UI components. Put them in `packages/core` hooks. This lets you swap the UI layer (Web to Mobile) without breaking the app flow.

---

## 5. Leveraging shadcn/ui (The Solopreneur's Secret Weapon)

You asked how to "level up" SDS using inspiration from [shadcn/ui](https://ui.shadcn.com/). 

**The Philosophy:** shadcn/ui isn't a library; it's a *distribution method*. You copy the code, you own the code. This is perfect for a solopreneur who needs speed but hates being locked into a rigid library that's hard to customize.

### Strategy: "Universal Primitives, Native Implementation"

The brilliance of shadcn/ui is that it separates **Structure** (Radix UI) from **Style** (Tailwind). We will replicate this for mobile.

| Layer | Web (Standard shadcn) | Mobile (SDS Native) |
| :--- | :--- | :--- |
| **Logic/A11y** | Radix UI | **rn-primitives** (The "Radix for Mobile") |
| **Styling** | Tailwind CSS | **NativeWind** (Tailwind for Mobile) |
| **Icons** | Lucide React | **Lucide React Native** |

### Recommendations for SDS:

1.  **Adopt `rn-primitives`:**
    Instead of writing raw `View` and `Pressable` components with complex accessibility logic, use [`rn-primitives`](https://rn-primitives.vercel.app/). It is built by the authors of `React Native Reusables` specifically to port the Radix/shadcn experience to mobile.

2.  **The "Universal Copy-Paste":**
    Imagine a CLI command: `npx sds add button`.
    - It adds `design-system/atoms/Button.tsx` (shadcn style for web)
    - It adds `apps/sage-mobile/components/Button.tsx` (using `rn-primitives` + NativeWind)
    - *Result:* You get accessible, beautiful components on both platforms that use the exact same Shared Tokens.

3.  **Visual Consistency:**
    shadcn/ui uses "foreground", "muted", "accent". Your SDS tokens should map 1:1 to these semantic names. This allows you to literally copy a shadcn web component, paste it into your web package, and have it *immediately* look like SDS because your Tailwind config powers it.

4.  **Reference Implementation:**
    Look at [React Native Reusables](https://rnr-docs.vercel.app/). It is effectively "shadcn/ui for React Native". You shouldn't blindly install it, but you should **study its source code** to see how they implement shadcn patterns in NativeWind.

## Conclusion

This approach doesn't just "support" mobile; it treats mobile as a first-class citizen while respecting the fact that *native apps behave differently than websites*. By fixing the **Tokens** and **Logic** as universal truths, you gain the efficiency you need without creating a "lowest common denominator" generic app.
