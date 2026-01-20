# Sage UI Strategic Analysis & Migration Plan

> [!IMPORTANT]
> **Core User Need:** Implementation of a "Creative Solopreneur" stack that enables building premium apps efficiently.
> **Key Insight:** "Efficiency" comes from sharing code, but "Premium" comes from native performance.

## 1. Strategic Analysis (Competitor Landscape)

We analyzed three major competitors to the proposed "Sage Stack":

### A. Tamagui (The "Heavy/Premium" Option)
*   **Pros:** Incredible performance, distinct styling engine, 90% code sharing.
*   **Cons:** Very steep learning curve. Complex configuration. Harder to "eject" from.
*   **Verdict for SDS:** **Reject.** It requires learning a "Tamagui way" of doing things which conflicts with the "standard web standard" (Tailwind) approach solopreneurs prefer.

### B. Gluestack (The "Enterprise" Option)
*   **Pros:** Accessible, robust, now uses NativeWind v4.
*   **Cons:** Heavy, comes with a lot of "opinion".
*   **Verdict for SDS:** **Partial Adoption.** We don't adopt the library, but we **adopt their architecture** (NativeWind + Primitives).

### C. Solito (The "Glue" Option)
*   **Pros:** Connects Next.js (Web) and Expo (Mobile) so you can **share screens**, not just components.
*   **Cons:** Requires strict monorepo structure.
*   **Verdict for SDS:** **ADOPT IMMEDIATELY.** This is the missing link for your "efficiency" goal. It lets you write `packages/app/features/home/screen.tsx` and use it on *both* your portfolio and your iOS app.

---

## 2. The New Sage UI Architecture (Monorepo Structure)

To verify "building the plane while flying", we must reorganize the repo into this standard Solito/Turbo structure:

```
ecosystem/
├── apps/
│   ├── web/                 # (Existing) Your Next.js Portfolio/Studio
│   │   ├── next.config.js
│   │   └── ...
│   └── mobile/              # (New) Expo iOS/Android App
│       ├── babel.config.js
│       └── ...
├── packages/
│   ├── ui/                  # (New) The "Universal" SDS
│   │   ├── src/
│   │   │   ├── atoms/       # Universal Atoms (Button, Card)
│   │   │   ├── tokens/      # Universal Tokens
│   │   │   └── provider.tsx # SDSProvider (Theme + Toast etc)
│   │   └── package.json
│   ├── app/                 # (New) Shared Business Logic & Screens
│   │   ├── features/        # Shared Feature Screens
│   │   ├── provider.tsx     # Solito/Navigation Providers
│   │   └── ...
│   └── config/              # Shared Config (Tailwind, ESLint)
```

---

## 3. Phased Task List (The Migration)

### Phase 1: The Monorepo Foundation (Low Risk)
Goal: Set up the structure without breaking the existing Studio.
- [ ] Create `packages/ui` and `packages/config` folders.
- [ ] Initialize `packages/config/tailwind` (Shared Tailwind config).
- [ ] Move `design-system/tokens` basic logic to `packages/ui/src/tokens`.
- [ ] **Verification:** Ensure `apps/sage-design-studio` can import the new tokens.

### Phase 2: The Universal Atom (Proof of Concept)
Goal: Create ONE component that works on Web and Mobile.
- [ ] Install `nativewind` and `rn-primitives` in `packages/ui`.
- [ ] Create `packages/ui/src/atoms/Button.tsx`.
    -   Must use `Pressable` (from rn-primitives) styled with NativeWind.
- [ ] **Verification:** Render this Button in the Studio (Web).

### Phase 3: The Mobile Entry (New Frontier)
Goal: Get a simpler iOS app running.
- [ ] Initialize `apps/mobile` (Expo Router).
- [ ] Configure `monorepo` linkage (Solito/Turbo).
- [ ] **Verification:** run `pnpm native` and see the Universal Button on an iOS Simulator.

### Phase 4: Validating the "Solopreneur Workflow"
Goal: Prove the "Shared Screen" concept.
- [ ] Create `packages/app/features/demo-screen.tsx`.
- [ ] Mount this screen in `apps/web/pages/demo.tsx`.
- [ ] Mount this screen in `apps/mobile/app/demo.tsx`.
- [ ] **Verification:** Change text in `demo-screen.tsx` and watch it update on BOTH Web and Simulator instantly.

### Phase 5: The Great Migration (Refactoring)
Goal: Move Sage UI components to the Universal structure one by one.
- [ ] Audit `design-system` components.
- [ ] For each component (e.g., `Card`, `Input`):
    -   Rewrite using `rn-primitives`.
    -   Move to `packages/ui`.
    -   Update `apps/sage-design-studio` to use the new package.
- [ ] Deprecate old `design-system` folder.

---

## 4. The "MCP Server" Role in Migration
You asked when to build the MCP server. 
**Answer:** Build a simple V1 **during Phase 5**.

Why? Refactoring 50+ components is tedious. 
*   **Role:** You write the "Universal Button" manually (Phase 2) to set the pattern.
*   **Automation:** You then build an MCP tool `refactor_to_universal(component_path)` that reads an old web component and writes the new Universal `rn-primitives` version for you. 
*   **Benefit:** This speeds up Phase 5 by 10x.
