# Sage Design Engine: Enterprise Readiness Plan

> **Purpose:** Complete implementation plan to make the SDE enterprise-ready.
> **Created:** February 2026
> **Status:** Phases 1-4 complete, v1.0.0-rc.1 — awaiting external consumer test before v1.0.0
> **Last updated:** 2026-02-06

---

## Session Orientation (Always Run First)

When starting a new session on this plan, run the following steps before doing anything else. This ensures you have full context with zero assumptions.

### 1. Read the Plan
```bash
# Read this document to understand what's done and what's next
cat docs/ENTERPRISE-READINESS-PLAN.md
```

### 2. Verify Current State
```bash
# Check React version currently in use
node -e "console.log(require('./node_modules/react/package.json').version)"

# Check if build is clean
pnpm build --filter @thesage/ui

# Check for any forwardRef remnants (should be 0)
grep -r "forwardRef" packages/ui/src --include="*.tsx" | wc -l

# Check git status for in-progress work
git status
git log --oneline -5
```

### 3. Identify Current Phase
- Read the **Master Checklist** below to find the first unchecked item
- That's where you pick up

### 4. Key Context Files
- `/.claude/CLAUDE.md` — AI instructions, coding standards, architecture patterns
- `/DESIGN-PHILOSOPHY.md` — The North Star (4 principles)
- `/AGENTS.md` — Technical reference, file organization rules
- `/CHANGELOG.md` — Recent work history

### 5. Quick Sanity Checks
```bash
# Ensure packages build
pnpm build

# Check for TS errors (if typecheck script exists)
pnpm typecheck 2>/dev/null || echo "No typecheck script configured"

# Verify test suite (once Phase 2 is done)
pnpm --filter @thesage/ui test 2>/dev/null || echo "No test script configured yet"
```

---

## Master Checklist

### Phase 1: React 19 Migration ✅ COMPLETE

#### 1A. Audit (No Code Changes) ✅
- [x] Count `forwardRef` usage → **146 occurrences across 56 files**
- [x] Find `defaultProps` usage → **0 found (already clean)**
- [x] Find `watch()` usage → **0 found (already clean)**
- [x] Check Zustand `.use.` selector pattern → **0 found (already clean)**
- [x] Verify React Native 0.81.5 required React version → **Mobile app already declares React 19.1.0**
- [x] Check `React.FC` usage → **8 files, non-breaking in React 19 (cleanup optional)**

#### 1B. Pre-Migration Fixes (Still on React 18) ✅
- [x] ~~Replace all `defaultProps`~~ — None found
- [x] ~~Replace `watch()` with `useWatch()`~~ — None found
- [x] ~~Fix Zustand `.use.` selectors~~ — None found
- [x] Update all **26** Radix UI packages to latest versions
- [x] Verify changes build: `pnpm build`

#### 1C. Upgrade ✅
- [x] Update root `package.json` pnpm overrides to React 19 (`^19.2.1`)
- [x] Update `@types/react` to `^19` in all 4 packages (ui, core, hooks, charts)
- [x] Update `apps/web/package.json` react/react-dom to `^19.2.1` and `@types/react` to `^19`
- [x] Run `pnpm install`
- [x] Run forwardRef codemod (custom jscodeshift transform — official codemods require interactive mode)
  - 56 files transformed, 0 errors
  - 1 manual fix required: `CommandEmpty` in `Command.tsx` (codemod missed destructuring)
  - 1 unused import cleanup: `TextField.tsx`
- [x] Fix TypeScript errors from @types/react@19 → Only 1 error (Command.tsx), fixed manually

#### 1D. Verification ✅
- [x] Build all packages: `pnpm build` → **11/11 successful**
- [ ] Test production build locally: `pnpm build && cd apps/web && pnpm start`
- [ ] Test Sage Studio manually (http://localhost:3001)
- [ ] Test Portfolio manually (http://localhost:3000)
- [ ] Test Customizer end-to-end (theme switching, motion slider, persistence)
- [ ] Test motion=0 (verify instant state changes, no animations)
- [ ] Verify React Native builds (may need separate handling)
- [ ] **GIT TAG:** `git tag enterprise-phase-1-complete`

---

### Phase 2: Test Foundation ✅ COMPLETE

#### 2A. Install Dependencies ✅
- [x] Install Vitest + Testing Library in `packages/ui` (NOT workspace root)
- [x] Create `packages/ui/vitest.config.ts`
- [x] Create `packages/ui/src/test/setup.ts` with required mocks:
  - [x] `window.matchMedia` mock (for `useMotionPreference`)
  - [x] `ResizeObserver` mock
  - [x] Element pointer capture + scrollIntoView mocks (for Radix components)

#### 2B. Write Tests for 10 Critical Components ✅
- [x] Button (renders, clicks, variants) — 6 tests
- [x] Dialog (opens, closes, focus trap, escape key) — 4 tests
- [x] Input (controlled, validation) — 5 tests
- [x] Select (opens, selects, keyboard nav) — 6 tests
- [x] Tabs (switches, keyboard nav) — 3 tests
- [x] Accordion (expands, collapses) — 4 tests
- [x] Card (rendering, composition) — 12 tests
- [x] Progress (values, accessibility) — 8 tests
- [x] useMotionPreference (respects system settings, scale 0-10) — 7 tests
- [x] Switch (toggle, controlled, disabled) — 8 tests
- **Total: 63 tests, all passing**

#### 2C. CI Integration ✅
- [x] Add test step to `.github/workflows/ci.yml`
- [x] Verify tests run on every PR
- [ ] Add accessibility testing: `pnpm --filter @thesage/ui add -D @axe-core/react` (deferred to Phase 4)
- [ ] **GIT TAG:** `git tag enterprise-phase-2-complete`

---

### Phase 3: Dependency Optimization

> **⚠️ IMPORTANT:** After each dependency change, manually test affected components before proceeding. Commit after each successful change for easy rollback.

#### 3A. Vendor OGL WebGL Utilities ✅
- [x] Create `packages/ui/src/lib/webgl/` directory
- [x] Write minimal TypeScript WebGL implementations (not OGL copies — clean-room from API surface):
  - [x] `Renderer.ts` — WebGL context creation, resize, render dispatch (typed `GL` with `canvas: HTMLCanvasElement`)
  - [x] `Program.ts` — Shader compilation, uniform management (supports number, boolean, Float32Array, Vec3, Color)
  - [x] `Mesh.ts` — Binds geometry attributes and draws
  - [x] `Triangle.ts` — Full-screen triangle geometry (position + uv)
  - [x] `Vec3.ts` — 3-component vector with `.set()` method
  - [x] `Color.ts` — 3-component color value
  - [x] `index.ts` — Barrel export
- [x] Update imports in affected components:
  - [x] `OrbBackground.tsx` → `from '../../lib/webgl'`
  - [x] `FaultyTerminal.tsx` → `from '../../lib/webgl'`
  - [x] `WarpBackground.tsx` → `from '../../lib/webgl'`
  - [x] `Galaxy.tsx` (apps/web) → `from '@thesage/ui/webgl'`
- [x] Added `./webgl` subpath export to `packages/ui/package.json`
- [x] Added `src/webgl.ts` to build entry points
- [x] Remove `ogl` from `packages/ui/package.json`
- [x] Remove `ogl` from `apps/web/package.json`
- [x] **BUILD:** 11/11 packages + apps build successfully, 63 tests passing
- [x] Bundle size: `webgl.mjs` = 5.53 KB (vs `ogl` = 80 KB)
- [ ] **TEST:** Verify all 3 backgrounds render correctly on Sage Studio
- [ ] **COMMIT:** `chore: vendor OGL WebGL utilities, remove ogl dependency`

#### 3B. Audit Radix Packages ✅
- [x] List which of the 26 Radix packages are actually imported → **All 26 are actively used (100%)**
- [x] Remove any unused Radix packages → **None to remove — each has exactly one matching component**
- No commit needed (no changes)

#### 3C. Create Optional Subpath Exports ✅
> **Note:** Deps moved to optional peerDependencies with `peerDependenciesMeta`. Backward compatible — components still exported from main `@thesage/ui` entry.

- [x] `@thesage/ui/forms` (react-hook-form, zod, @hookform/resolvers) — `forms.mjs` = 3.54 KB
  - [x] Create `packages/ui/src/forms.ts` entry point
  - [x] Move form deps to optional peerDependencies + devDependencies
  - [x] apps/web already had these deps
- [x] `@thesage/ui/dates` (date-fns, react-day-picker) — `dates.mjs` = 6.83 KB
  - [x] Create `packages/ui/src/dates.ts` entry point
  - [x] Move date deps to optional peerDependencies + devDependencies
  - [x] Added missing deps to apps/web
- [x] `@thesage/ui/tables` (@tanstack/react-table) — `tables.mjs` = 6.06 KB
  - [x] Create `packages/ui/src/tables.ts` entry point
  - [x] Move table dep to optional peerDependencies + devDependencies
  - [x] Added missing dep to apps/web
- [x] `@thesage/ui/dnd` (@dnd-kit/*) — `dnd.mjs` = 7.32 KB
  - [x] Create `packages/ui/src/dnd.ts` entry point
  - [x] Move dnd deps to optional peerDependencies + devDependencies
  - [x] Added missing @dnd-kit/utilities to apps/web
- [x] **BUILD:** 11/11 packages + apps build successfully, 63 tests passing

#### 3D. Finalize Build Config
- [x] Update `packages/ui/package.json` exports field with new subpaths (`./webgl`, `./forms`, `./dates`, `./tables`, `./dnd`)
- [x] Update `tsup.config.ts` with 10 entry points (Note: `treeshake` option removed — incompatible with `"use client"` banner; consumers tree-shake via their own bundlers)
- [x] Add bundle size tracking: `size-limit` + `@size-limit/preset-small-lib` with per-entry-point limits
- [x] **TEST:** Full build 11/11 passing, size-limit 10/10 passing, 63/63 tests passing
- [x] Bundle sizes (brotli): Core 146 KB, WebGL 1.1 KB, Forms 9.4 KB, Dates 28.8 KB, Tables 8.3 KB, DnD 8.3 KB, Hooks 6 KB, Providers 8.3 KB, Tokens 10.9 KB, Utils 9.5 KB
- [ ] **COMMIT:** `chore: finalize dependency optimization`
- [ ] **GIT TAG:** `git tag enterprise-phase-3-complete`

#### Rollback Procedure
If a component breaks after a dependency change:
```bash
# See recent commits
git log --oneline -10

# Revert last commit (keeps changes staged)
git revert HEAD

# Or hard reset to before the change
git reset --hard HEAD~1
```

---

### Phase 4: Enterprise Polish

- [x] Write integration guide → `docs/ENTERPRISE-INTEGRATION-GUIDE.md` (setup, providers, imports, styling, motion, bundle sizes, troubleshooting)
- [x] Run security audit: `pnpm audit` — 0 vulnerabilities in `@thesage/ui`; fixed Next.js CVEs by updating to 15.5.12 and 16.1.6; remaining 25 vulns are in app-level transitive deps (expo, vercel CLI, MCP SDK)
- [x] Run accessibility audit — 15 issues found, all critical/major fixed: BreadcrumbPage semantic HTML, CustomizerPanel (aria-labels, Escape key, aria-pressed), CollapsibleCodeBlock (aria-labels, SVG aria-hidden), SearchBar SVG, Code tooltip role
- [x] Create performance benchmarks — Bundle sizes tracked via size-limit in CI (10 entry points, all within limits); sizes documented in integration guide
- [x] Document breaking change policy — Codified in CLAUDE.md Breaking Changes Protocol; semver enforced via changesets
- [x] Version progression: Phases 1-4 complete — version set to `1.0.0-rc.1`
- [ ] Test with external consumer (fresh Next.js project) — manual step
- [ ] Declare v1.0.0 — after external consumer testing
- [ ] **GIT TAG:** `git tag v1.0.0` — after declaring v1.0.0

---

## Project Context

### What Is This Project?

The **Sage Design Engine (SDE)** is a React component library and design system built on:
- **Radix UI** primitives (26 packages) for accessible, unstyled components
- **Tailwind CSS** for styling via CSS variables
- **Framer Motion** for animations
- **Zustand** for state management (themes, preferences)

**Live sites:**
- Sage Studio (docs): https://thesage.dev
- Portfolio: https://shalomormsby.com

### Monorepo Structure

```
ecosystem/
├── package.json              # Root - pnpm overrides for React version
├── pnpm-workspace.yaml       # Workspace config
├── packages/
│   ├── ui/                   # @thesage/ui - Main component library (48+ components)
│   │   ├── src/
│   │   │   ├── components/   # Organized by function (actions, forms, overlays, etc.)
│   │   │   ├── hooks/        # useTheme, useMotionPreference, etc.
│   │   │   ├── providers/    # ThemeProvider
│   │   │   └── lib/          # Utilities (cn, etc.)
│   │   ├── package.json      # 25 production deps + 9 optional peer deps
│   │   └── tsup.config.ts    # Build config
│   ├── tokens/               # @thesage/tokens - Design tokens
│   ├── hooks/                # @thesage/hooks - Shared hooks
│   ├── core/                 # @thesage/core - Theme state
│   ├── charts/               # @thesage/charts - Data visualization (recharts - React 19 compatible)
│   ├── config/               # @thesage/config - Shared config
│   └── mcp/                  # @thesage/mcp - AI integration (MCP server)
├── apps/
│   ├── web/                  # Sage Studio - Next.js 15.5.12, React 19.2.1
│   ├── portfolio/            # Portfolio - Next.js 16.x, React 19.2.1
│   ├── creative-powerup/     # Experiments - Next.js 16.1.6, React 19.2.1
│   ├── mobile/               # React Native 0.81.5, Expo 54, React 19.1.0
│   └── sage-stocks/          # Backend only (no React dependency)
└── docs/                     # This plan lives here
```

### Key Files to Know

| File | Purpose |
|------|---------|
| `/package.json` | Root - **pnpm overrides set React 19.2.1** |
| `/packages/ui/package.json` | Main library - 25 production deps + 9 optional peer deps |
| `/packages/ui/src/index.ts` | Main export barrel |
| `/packages/ui/src/components/` | All components by category |
| `/packages/ui/src/components/backgrounds/OrbBackground.tsx` | WebGL orb effect - uses vendored webgl lib |
| `/packages/ui/src/components/backgrounds/FaultyTerminal.tsx` | WebGL terminal effect - uses vendored webgl lib |
| `/packages/ui/src/components/backgrounds/WarpBackground.tsx` | WebGL warp effect - uses vendored webgl lib |
| `/packages/ui/src/hooks/useTheme.ts` | Theme state (Zustand) |
| `/packages/ui/src/hooks/useMotionPreference.ts` | Motion preference hook |
| `/packages/ui/src/providers/ThemeProvider.tsx` | Root provider |
| `/packages/ui/src/components/features/Customizer/` | Complex feature to test thoroughly |
| `/.claude/CLAUDE.md` | AI instructions for this project |

### Current Versions

| Package | Version | Notes |
|---------|---------|-------|
| React | 19.2.1 | All apps unified on React 19 via pnpm override |
| @thesage/ui | 1.0.0-rc.1 | Enterprise-ready release candidate |
| Next.js | 15.5.12 / 16.1.6 | Mixed across apps (both React 19 compatible, CVEs patched) |
| Framer Motion | 12.23-12.26.2 | Compatible with React 19 |
| Zustand | 5.0.9 | Compatible with React 19 |
| Radix UI | ^1.x | 26 packages, all updated to latest |

### Commands

```bash
# Development
pnpm dev --filter web          # Start Sage Studio
pnpm dev --filter portfolio    # Start Portfolio

# Build
pnpm build                     # Build everything
pnpm build --filter @thesage/ui # Build UI library only

# Quality
pnpm lint                      # Lint all
pnpm typecheck                 # TypeScript check

# Clear caches
rm -rf .turbo packages/ui/dist apps/*/.next && pnpm build
```

---

## React 19 Migration Details

### Migration Complete ✅

The root `package.json` now has pnpm overrides set to React 19:

```json
"pnpm": {
  "overrides": {
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "react": "^19.2.1",
    "react-dom": "^19.2.1"
  }
}
```

### What Was Migrated

#### 1. forwardRef → ref as prop (146 occurrences across 56 files)

```tsx
// BEFORE (React 18)
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <button ref={ref} {...props} />
  )
);
Button.displayName = "Button"

// AFTER (React 19)
const Button = ({ ref, className, ...props }: ButtonProps & { ref?: React.Ref<HTMLButtonElement> }) => (
  <button ref={ref} {...props} />
);
```

**Method used:** Custom jscodeshift transform (official codemods required interactive terminal). Transform located in scratchpad for reference.

#### 2. No other breaking patterns found
- `defaultProps`: 0 occurrences
- `watch()`: 0 occurrences
- Zustand `.use.` selectors: 0 occurrences
- `React.FC`: 8 files (non-breaking, optional cleanup)

### Dependency Compatibility (Verified)

| Dependency | React 19 Status | Action Taken |
|------------|-----------------|--------------|
| Framer Motion 12.x | ✅ Compatible | None |
| Radix UI ^1.x (26 pkgs) | ✅ Compatible | Updated all to latest |
| Zustand 5.x | ✅ Compatible | None |
| react-hook-form 7.x | ✅ Compatible | No watch() usage found |
| @tanstack/react-table 8.x | ✅ Compatible | None |
| recharts 2.15.4 | ✅ Compatible | Peer dep includes ^19.0.0 |
| Next.js 15/16 | ✅ Compatible | None |
| React Native 0.81.5 | ✅ Compatible | Already declares React 19.1.0 |

---

## Dependency Analysis

### Final: 25 Production Dependencies + 9 Optional Peer Dependencies

**Production (always installed):**

| Category | Count | Packages |
|----------|-------|----------|
| Radix UI | 26 | accordion, alert-dialog, aspect-ratio, avatar, checkbox, collapsible, context-menu, dialog, dropdown-menu, hover-card, label, menubar, navigation-menu, popover, progress, radio-group, scroll-area, select, separator, slider, slot, switch, tabs, toggle, toggle-group, tooltip |
| Styling | 3 | clsx, tailwind-merge, class-variance-authority |
| Other | 8 | zustand, lucide-react, cmdk, sonner, embla-carousel-react, react-resizable-panels, vaul, input-otp |

**Optional peer dependencies (install only what you use):**

| Subpath | Deps | Bundle (brotli) |
|---------|------|-----------------|
| `@thesage/ui/forms` | react-hook-form, @hookform/resolvers, zod | 9.4 KB |
| `@thesage/ui/dates` | date-fns, react-day-picker | 29 KB |
| `@thesage/ui/tables` | @tanstack/react-table | 8.3 KB |
| `@thesage/ui/dnd` | @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities | 8.3 KB |

**Vendored (no external dependency):**
- WebGL utilities — 1.1 KB (replaced `ogl` at 80 KB, 93% reduction)

---

## OGL Vendoring Details ✅ COMPLETE

### Why Vendor Instead of Remove?

The `ogl` dependency powers 3+1 WebGL background effects that cannot be replicated with CSS:
- **OrbBackground** (`packages/ui`) - Animated gradient orb with hover effects
- **FaultyTerminal** (`packages/ui`) - Glitchy terminal effect
- **WarpBackground** (`packages/ui`) - Space warp effect
- **Galaxy** (`apps/web`) - Star field effect (same API as WarpBackground)

These use custom GLSL shaders (the "magic"). Removing `ogl` would kill the effects. Vendoring keeps the magic while eliminating the dependency.

### What Was Implemented

Instead of copying OGL source (80KB, JavaScript, deep internal dependency tree), we wrote **clean-room minimal TypeScript implementations** matching only the API surface used by our components:

| Class | Purpose | Approach |
|-------|---------|----------|
| `Renderer` | Creates WebGL context, resize, render dispatch | Clean-room. Typed `GL` narrows `canvas` to `HTMLCanvasElement`. WebGL2 with WebGL1 fallback. |
| `Program` | Compiles GLSL shaders, manages uniforms | Clean-room. Caches attribute + uniform locations. Supports number, boolean, Float32Array, Vec3, Color. |
| `Mesh` | Binds geometry attributes + draws | Clean-room. Binds position + uv buffers, calls `gl.drawArrays`. |
| `Triangle` | Full-screen triangle geometry | Clean-room. Oversized triangle ([-1,-1], [3,-1], [-1,3]) clipped to viewport. |
| `Vec3` | 3-component vector for shader uniforms | Clean-room. Wraps Float32Array with `.set(x,y,z)`. |
| `Color` | 3-component color for shader uniforms | Clean-room. Wraps Float32Array. |

**Result:** `webgl.mjs` = **5.53 KB** (vs `ogl` = 80 KB) — **93% reduction**

### Implementation Structure

```
packages/ui/src/lib/webgl/
├── index.ts          # Barrel: Renderer, GL, Program, Mesh, Triangle, Vec3, Color
├── Renderer.ts       # WebGL context + canvas management
├── Program.ts        # GLSL compilation + uniform upload
├── Mesh.ts           # Geometry binding + draw calls
├── Triangle.ts       # Full-screen triangle vertex data
├── Vec3.ts           # vec3 uniform type
└── Color.ts          # vec3 color uniform type
```

### Import Changes

```tsx
// packages/ui components (relative import)
import { Mesh, Program, Renderer, Triangle, Vec3 } from '../../lib/webgl';

// apps/web components (subpath export)
import { Renderer, Program, Mesh, Color, Triangle } from '@thesage/ui/webgl';
```

### Key Design Decisions

1. **No Geometry base class** — Triangle is self-contained with its own buffer management
2. **Vec3/Color use composition** (wrapping Float32Array) not inheritance — avoids `.set()` signature conflict with Float32Array.prototype.set
3. **GLSL 100 shaders work unchanged** — WebGL2 contexts accept GLSL 1.00 without version header
4. **Uniform upload uses duck-typing** — checks `value.data instanceof Float32Array` for Vec3/Color, avoiding circular imports

### Manual Test Checklist

After vendoring, verify on Sage Studio (https://thesage.dev or localhost:3001):
- [ ] `/docs#motion/orb-background` - Orb renders, animates, responds to hover
- [ ] Faulty Terminal effect works (if documented)
- [ ] Warp Background effect works (if documented)
- [ ] Galaxy effect works (if documented)
- [ ] No console errors
- [ ] Performance is comparable (no jank)

---

## Testing Strategy

### Test Setup Requirements

The test setup file (`packages/ui/src/test/setup.ts`) must mock these browser APIs:

1. **`window.matchMedia`** — Used by `useMotionPreference` hook to check `prefers-reduced-motion`
2. **`window.localStorage`** — Used by Zustand persist middleware for theme + customizer stores (`ecosystem-theme`, `ecosystem-customizer` keys)
3. **`document.documentElement` style methods** — Used by ThemeProvider to inject CSS variables via `style.setProperty()` and `setAttribute()`

### Minimum Viable Test Suite

```
packages/ui/
├── vitest.config.ts
├── src/
│   ├── test/
│   │   └── setup.ts           # Testing Library setup + browser API mocks
│   ├── components/
│   │   ├── actions/
│   │   │   └── Button.test.tsx
│   │   ├── overlays/
│   │   │   └── Dialog.test.tsx
│   │   └── ...
│   └── hooks/
│       ├── useTheme.test.ts
│       └── useMotionPreference.test.ts
```

### Critical Test Scenarios

1. **Theme Switching**
   - Switch Studio → Terra → Volt
   - Verify CSS variables update
   - Check localStorage persistence
   - Test light/dark mode toggle

2. **Motion System**
   - Set motion intensity to 0 → instant state changes
   - Set motion intensity to 10 → full animations
   - Toggle `prefers-reduced-motion` → verify sync

3. **Customizer**
   - Open panel
   - Change theme
   - Adjust motion slider
   - Close and reopen → verify persistence
   - Test in production build

4. **Forms**
   - Input validation
   - Select keyboard navigation
   - Form submission

5. **Overlays**
   - Dialog focus trap
   - Escape key dismissal
   - Click outside dismissal

---

## Success Criteria

### Phase 1 ✅ — React 19 Migration
- [x] All apps build with React 19
- [x] Production builds work (11/11)
- [ ] Manual testing pending (console errors, Customizer e2e, motion=0)

### Phase 2 ✅ — Test Foundation
- [x] 63 component tests passing across 10 test files
- [x] Tests run in CI on every PR
- [ ] Coverage report (deferred — not blocking)

### Phase 3 ✅ — Dependency Optimization
- [x] Core bundle 146 KB (brotli), WebGL 1.1 KB (93% reduction from ogl)
- [x] 5 optional subpath exports with optional peer deps
- [x] size-limit tracking in CI (10 entry points)

### Phase 4 ✅ — Enterprise Polish
- [x] Integration guide complete (`docs/ENTERPRISE-INTEGRATION-GUIDE.md`)
- [x] Security audit clean for @thesage/ui (Next.js CVEs patched)
- [x] Accessibility audit — all critical/major issues fixed
- [x] Version set to 1.0.0-rc.1
- [ ] External consumer test (manual step before v1.0.0)

---

## Version Progression

Instead of jumping from `0.0.13` directly to `1.0.0-rc.1`:

| Phase | Version | Milestone |
|-------|---------|-----------|
| Phase 1 | 0.1.0 | React 19 migration complete |
| Phase 2 | 0.2.0 | Test foundation in place |
| Phase 3 | 0.3.0 | Dependencies optimized, subpath exports |
| Phase 4 | 1.0.0-rc.1 | Enterprise-ready release candidate |
| Release | 1.0.0 | Stable enterprise release |

---

## References

- [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
- [React 19 Release Notes](https://react.dev/blog/2024/12/05/react-19)
- [React 18 to 19 Codemods](https://docs.codemod.com/guides/migrations/react-18-19)
- [Framer Motion Upgrade Guide](https://motion.dev/docs/react-upgrade-guide)
- [Radix UI Releases](https://www.radix-ui.com/primitives/docs/overview/releases)
- [Zustand v5 Migration Guide](https://zustand.docs.pmnd.rs/migrations/migrating-to-v5)
- [React Hook Form + React 19](https://github.com/orgs/react-hook-form/discussions/11832)
- [Vitest Getting Started](https://vitest.dev/guide/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

## Notes for Future Sessions

When starting a new session to work on this plan:

1. **Run the Session Orientation section above** — It verifies current state with zero assumptions
2. **Check the master checklist** — See what's done and what's next
3. **Use the commands section** — All common commands are listed
4. **Key files are listed** — Know where to look
5. **Risks are documented** — Don't be surprised by gotchas

**Start with:** "I'm continuing work on the Enterprise Readiness Plan. Let me run the orientation steps and pick up where we left off."
