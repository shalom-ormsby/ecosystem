# Documentation Update Plan for SDS v2

As we migrate to the "Sage Stack" (Universal Monorepo), the existing "How it Works" and "Getting Started" documentation on the Studio site will need updates.

## Sections to Update

### 1. Overview / Introduction
- **Current:** Describes a single `design-system` package.
- **New:** Needs to describe the "Universal Brain" architecture (`@sds/tokens`, `@sds/ui`, `@sds/core`).

### 2. Getting Started
- **Current:** `pnpm install @ecosystem/design-system`
- **New:** Explanation of the Monorepo structure for solopreneurs.
    - How to use `@sds/ui` for cross-platform components.
    - How to use Solito for shared screens.

### 3. "How it Works"
- **Tokens:** Update to reflect `@sds/tokens` workspace.
- **Components:** Explain `rn-primitives` and `NativeWind` usage (Universal components).

## Action Plan
- [ ] Draft new "Architecture Overview" content.
- [ ] Update READMEs in specific packages (`packages/ui`, `packages/tokens`).
- [ ] Schedule update of proper Studio documentation pages after Phase 5 (Great Migration) is stable.
