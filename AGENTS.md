# AGENTS.md

> **For AI coding agents working on this ecosystem. Read [DESIGN-PHILOSOPHY.md](DESIGN-PHILOSOPHY.md) first—it's the North Star. This file tells you how to build in alignment with it.**

---

## Quick Orientation

This is a **monorepo** expressing one unified design philosophy through multiple products. You're not building separate apps—you're building different expressions of the same vision.

```
shalom-ecosystem/
├── apps/
│   ├── portfolio/          # Next.js 15 — The proof of philosophy
│   ├── sage-stocks/        # Next.js 15 — AI-powered investment intelligence
│   ├── creative-powerup/   # Next.js 15 — Community platform
│   └── sageos/             # Future — Personal operating system
├── design-system/          # THE HEART — shared components, tokens, features
│   ├── tokens/             # Design tokens (colors, spacing, typography)
│   ├── atoms/              # Primitive components
│   ├── molecules/          # Composite components
│   ├── patterns/           # Layout and interaction patterns
│   └── features/           # Customizer, X-Ray Mode, AI Notes
├── docs/                   # Documentation including MCP setup
└── packages/               # Shared config and utilities
```

**Key insight:** The `design-system/` lives at root level, not buried in `/packages`. This is intentional—it signals importance and is structured for npm publishing from day one.

---

## If This Is Your First Time

**Do these 5 things before writing any code:**

1. **Read DESIGN-PHILOSOPHY.md** (5 min) - This is the North Star. Everything flows from the four principles.
2. **Verify your setup works:**
   ```bash
   pnpm install
   pnpm build
   pnpm dev --filter portfolio
   ```
   Portfolio should run on **http://localhost:3000** (or next available port).
3. **Check current work context:**
   ```bash
   git status          # See what's modified
   git log -5 --oneline # Recent commits
   cat CHANGELOG.md | head -30  # Recent changes
   ```
4. **Understand what's done vs planned** - Read the "Current Implementation State" section below.
5. **Ask yourself:** "Do I understand the current state and the philosophy?" If no, **ask the human before proceeding.**

---

## Current Implementation State

**Do not rely on static lists here.** The codebase is the source of truth.

**To verify current state:**
1. **Check active apps:** `ls apps/`
2. **Check design system output:** `ls design-system/dist`
3. **Check recent changes:** `git log -5 --oneline`
4. **Check defined tokens:** Read `design-system/tokens/src/index.ts` (or similar path)

---

## File Organization Rules

**AI agents: Read this carefully.** Disorganized file placement is one of the fastest ways to erode a codebase. Follow these rules strictly.

### Where New Files Go

| If you're creating... | Put it in... |
|----------------------|--------------|
| Shared component (used by 2+ apps) | `design-system/` at appropriate atomic level |
| App-specific component | `apps/<app>/components/` |
| Shared custom hook | `design-system/hooks/` |
| App-specific hook | `apps/<app>/hooks/` |
| Global state store (design system) | `design-system/store/` |
| Feature-specific state | `design-system/features/<feature>/store.ts` |
| App-specific state | `apps/<app>/store/` or `apps/<app>/lib/store/` |
| React provider (design system) | `design-system/providers/` |
| App-specific provider | `apps/<app>/providers/` or `apps/<app>/components/providers/` |
| Shared utility function | `packages/utils/` |
| App-specific utility | `apps/<app>/lib/` or `apps/<app>/utils/` |
| Design tokens | `design-system/tokens/` |
| Shared TypeScript types | `design-system/types/` or within component folder as `ComponentName.types.ts` |
| App-specific types | `apps/<app>/types/` or co-located with components |
| Component-specific styles | Co-located with component (if not using Tailwind exclusively) |
| Documentation | `docs/` (only if it serves multiple apps) |
| App-specific docs | `apps/<app>/README.md` or `apps/<app>/docs/` |
| Config files | Root or `packages/config/` (discuss first) |

### Design System Atomic Levels

Place components at the correct level:

- **atoms/** — Primitives with no dependencies on other components (Button, Input, Icon, Text)
- **molecules/** — Compositions of atoms (Card, FormField, SearchBar)
- **patterns/** — Reusable layout and interaction patterns (PageLayout, Modal, NavigationMenu)
- **features/** — Complex, philosophy-embodying features (Customizer, X-Ray Mode, AI Notes)

**When uncertain:** Start at the lowest level that makes sense. It's easier to promote a component up than to demote it down.

### Do Not Create

- Root-level markdown files (unless explicitly requested)
- `README.md` files in every folder
- Duplicate documentation
- One-off utility files—consolidate into existing modules
- Config files without discussion

### Before Adding Any File

Ask yourself:
1. Does this file already exist somewhere? (Search first)
2. Is this the right location per the table above?
3. Could this be added to an existing file instead?
4. Will this file be maintained, or will it rot?

If you're uncertain about placement, **ask before creating**.

### File Placement Decision Tree

Use this flowchart when uncertain about where a file should go:

```
START: What are you creating?
│
├─ UI Component?
│  ├─ YES → Will it be used by 2+ apps?
│  │       ├─ YES → design-system/
│  │       │       └─ Which level?
│  │       │           ├─ No dependencies on other components → atoms/
│  │       │           ├─ Combines atoms → molecules/
│  │       │           ├─ Layout/interaction pattern → patterns/
│  │       │           └─ Philosophy-embodying feature → features/
│  │       └─ NO → apps/<app>/components/
│  │
├─ React Hook?
│  ├─ Used by design system components → design-system/hooks/
│  └─ App-specific → apps/<app>/hooks/
│
├─ State Store?
│  ├─ Global (design system) → design-system/store/
│  ├─ Feature-specific → design-system/features/<feature>/store.ts
│  └─ App-specific → apps/<app>/store/
│
├─ React Provider?
│  ├─ Design system provider → design-system/providers/
│  └─ App-specific → apps/<app>/providers/
│
├─ Utility Function?
│  ├─ Shared across apps → packages/utils/
│  └─ App-specific → apps/<app>/lib/ or apps/<app>/utils/
│
├─ Design Token?
│  └─ Always → design-system/tokens/
│
├─ TypeScript Types?
│  ├─ Component-specific → ComponentName.types.ts (co-located)
│  ├─ Shared across design system → design-system/types/
│  └─ App-specific shared types → apps/<app>/types/
│
├─ Documentation?
│  ├─ Multi-app documentation → docs/
│  ├─ App-specific → apps/<app>/README.md or apps/<app>/docs/
│  └─ Design system docs → design-system/README.md
│
├─ Config File?
│  ├─ Affects entire monorepo → Root (e.g., turbo.json, .mcp.json)
│  ├─ Shared config → packages/config/
│  └─ App-specific → apps/<app>/ (e.g., next.config.js)
│
└─ Test File?
   └─ Co-locate with what it tests → ComponentName.test.tsx
```

**Quick examples:**

| "I'm creating..." | Where it goes |
|-------------------|---------------|
| A SearchBar that portfolio and sage-stocks will use | `design-system/molecules/SearchBar/` |
| A hook to track scroll position in portfolio | `apps/portfolio/hooks/useScrollPosition.ts` |
| A theme store for the design system | `design-system/store/theme.ts` |
| Types for the Button component | `design-system/atoms/Button/Button.types.ts` |
| A utility to format currency in sage-stocks | `apps/sage-stocks/lib/formatCurrency.ts` |
| Documentation about deployment | `docs/deployment.md` |

### Disambiguating READMEs

Multiple README.md files exist at different levels:
- `/README.md` — Ecosystem overview (for GitHub visitors)
- `/apps/<app>/README.md` — App-specific setup and context
- `/design-system/README.md` — Design system usage guide

Always reference by full path.

---

## Changelog Maintenance

Every significant change to the ecosystem must be documented in `CHANGELOG.md` at the repo root.

### Format
```markdown
# Changelog

**Last updated:** 2025-12-16T14:32:00Z

---

## 2025-12-16T14:32:00Z

- Added AGENTS.md with comprehensive guidance for AI collaborators
- Updated DESIGN-PHILOSOPHY.md to elevate "Lovable by Design" as North Star

## 2025-12-15T09:15:00Z

- Initial monorepo structure
- Added portfolio app scaffold
- Created design-system package with token foundation
```

### Rules

1. **Reverse-chronological order** — Newest entries at the top, immediately below the master timestamp
2. **Master timestamp** — Update `Last updated:` at the very top whenever you add an entry
3. **ISO 8601 timestamps** — Use `YYYY-MM-DDTHH:MM:SSZ` format (UTC)
4. **One entry per work session** — Group related changes under a single timestamp
5. **Be specific** — "Updated design system" is useless. "Added motion preference persistence to Customizer" is useful.

### What Counts as Significant

- New components or features
- Breaking changes to APIs or interfaces
- New documentation files
- Architectural decisions
- Dependency updates that affect behavior
- Bug fixes that change user-facing behavior

### What Doesn't Need an Entry

- Typo fixes
- Code formatting
- Internal refactors with no behavior change
- Work-in-progress commits (log when complete)

### Changelog Entry Template

**Copy-paste this template when adding a changelog entry:**

```markdown
## YYYY-MM-DDTHH:MM:SSZ

- Added/Updated/Fixed/Removed [specific thing]
  - Additional context or details if needed
  - Breaking changes clearly marked

Example:
## 2025-12-16T14:32:00Z

- Added CustomizerPanel component to design system
  - Includes motion intensity slider, theme selector, and mode toggle
  - Persists preferences to localStorage
- Updated Button component with new focus states
  - Now meets WCAG AA contrast requirements
- Fixed Card hover effect not respecting reduced motion preference
```

**After adding your entry:**
1. Update the "Last updated" timestamp at the top of CHANGELOG.md
2. Ensure your entry is in reverse chronological order (newest first)
3. Use ISO 8601 format for timestamps: `YYYY-MM-DDTHH:MM:SSZ` (UTC)

---

## Before You Write Code

### 1. Internalize the Philosophy

Open **[DESIGN-PHILOSOPHY.md](DESIGN-PHILOSOPHY.md)** and internalize the four principles: **Transparent**, **Emotionally Resonant**, **User Control**, **Generous**. This is relevant to everything you build.

### 2. Operational Rules for "Delight"

Instead of asking abstract questions, follow these heuristics to achieve the "Emotionally Resonant" and "Lovable" goals:

- **Always animate state changes:** Use `framer-motion` for mounting/unmounting and layout shifts.
- **Respect Motion Preferences:** Always wrap animations in `useReducedMotion` or equivalent checks.
- **Micro-interactions:** Add hover, focus, and active states to all interactive elements, even if not explicitly requested.
- **Error Gracefully:** Never show raw error stacks to users. Design friendly, helpful error states.

### 3. When Principles Conflict

Sometimes User Control (many options) tensions against Emotional Resonance (simplicity). The tiebreaker is always:
- What would **delight** the human?
- What would **expand their degrees of freedom**?

The answer that best serves the human wins.

---

## Dev Environment

### Prerequisites

- **Node.js 20+** (LTS recommended)
- **pnpm 8.15.0+** (not npm or yarn - install with `npm install -g pnpm`)
- **Git**
- **Terminal/Shell** with bash/zsh support

### Initial Setup

```bash
# Clone the repo
git clone https://github.com/shalom-ormsby/ecosystem.git
cd ecosystem

# Install dependencies (this will install for all workspaces)
pnpm install

# Build all packages (required before running apps)
pnpm build
```

### Verify Setup Works

After installation, verify everything is working:

```bash
# 1. Check pnpm version
pnpm --version  # Should be 8.15.0 or higher

# 2. Verify design-system built successfully
ls design-system/dist  # Should show index.js, index.d.ts, etc.

# 3. Start portfolio app
pnpm dev --filter portfolio
```

**Expected result:** Portfolio should start successfully and show:
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

Open **http://localhost:3000** in your browser. You should see the portfolio with the Customizer button in the bottom-right corner.

### Development Ports

| App | Default Port | URL |
|-----|--------------|-----|
| portfolio | 3000 | http://localhost:3000 |
| sage-stocks | TBD (not functional yet) | - |
| creative-powerup | TBD (not functional yet) | - |

If port 3000 is taken, Next.js will automatically use the next available port (3001, 3002, etc.) and display it in the terminal.

### Environment Variables

**Currently:** No environment variables are required for local development.

**When adding external services:**
- Create `.env.local` in the app directory (e.g., `apps/portfolio/.env.local`)
- Never commit `.env.local` files (already in `.gitignore`)
- Document required variables in app-specific README

### Common Setup Issues

**"Cannot find module '@ecosystem/design-system'"**
```bash
# Solution: Build the design system first
pnpm build --filter @ecosystem/design-system
```

**pnpm install fails**
```bash
# Clear cache and retry
pnpm store prune
rm -rf node_modules
pnpm install
```

**Port already in use**
```bash
# Find process using port 3000
lsof -i :3000
# Kill it or let Next.js use a different port
```

### Starting Development

```bash
# Start all apps (if you have multiple functional apps)
pnpm dev

# Start specific app (recommended)
pnpm dev --filter portfolio

# Start with turbo cache clearing (if seeing stale builds)
rm -rf .turbo && pnpm dev --filter portfolio
```

### Key Commands

```bash
# Development
pnpm dev                    # Start all apps
pnpm dev --filter <app>     # Start specific app

# Building
pnpm build                  # Build all
pnpm build --filter <app>   # Build specific app

# Testing
pnpm test                   # Run all tests
pnpm test --filter <app>    # Test specific app

# Linting
pnpm lint                   # Lint all
pnpm lint --filter <app>    # Lint specific app

# Type checking
pnpm typecheck              # Check all TypeScript
```

### Turborepo

This monorepo uses Turborepo for orchestration. The `turbo.json` at root defines the task pipeline. Turborepo handles:
- Parallel execution
- Dependency-aware task ordering
- Caching for fast rebuilds

---

## Build and Deployment

### Build Process

**Build outputs:**
- **Design System:** `design-system/dist/` (ESM + CJS via tsup)
- **Next.js Apps:** `apps/<app>/.next/` (production-optimized bundles)

### Building Locally

```bash
# Build everything (design system + all apps)
pnpm build

# Build only design system
pnpm build --filter @ecosystem/design-system

# Build specific app
pnpm build --filter portfolio

# Build with cache cleared (if seeing issues)
rm -rf .turbo design-system/dist apps/*/. next
pnpm build
```

### Build Order

Turborepo automatically handles dependency order:
1. **Design system builds first** (other packages depend on it)
2. **Apps build in parallel** after design system completes

This is configured in `turbo.json`:
```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],  // ^ means dependencies first
      "outputs": [".next/**", "dist/**"]
    }
  }
}
```

### Deployment

#### Portfolio (Production)

**Platform:** Vercel (optimized for Next.js)

**Automatic deployment:**
- **main branch** → Production (https://[your-domain].vercel.app)
- **Pull requests** → Preview deployments

**Manual deployment:**
```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

**Environment variables:**
- Set in Vercel dashboard → Project Settings → Environment Variables
- Prefix with `NEXT_PUBLIC_` for client-side access
- Currently: No environment variables needed for portfolio

#### Design System (npm Publishing)

**Status:** Not yet published to npm (prepared for future publishing)

**When ready to publish:**
1. Update version in `design-system/package.json`
2. Build: `pnpm build --filter @ecosystem/design-system`
3. Publish: `cd design-system && npm publish`
4. Update CHANGELOG.md with version and changes

**Package name:** `@ecosystem/design-system` (or update before publishing)

#### Other Apps

**sage-stocks, creative-powerup:** Not yet deployed (scaffolds only)

### Pre-Deployment Checklist

Before deploying any app:

- [ ] Run `pnpm build` locally — ensure it succeeds
- [ ] Check TypeScript: `pnpm typecheck`
- [ ] Run linter: `pnpm lint`
- [ ] Test critical user flows manually
- [ ] Verify environment variables are set (if any)
- [ ] Check that Customizer works (verify motion slider, theme switching)
- [ ] Test on mobile viewport
- [ ] Verify accessibility (keyboard navigation, screen reader basics)

### Build Troubleshooting

**"Module not found" errors during build:**
```bash
# Design system not built
pnpm build --filter @ecosystem/design-system

# Stale node_modules
rm -rf node_modules apps/*/node_modules design-system/node_modules
pnpm install
```

**"Out of memory" during build:**
```bash
# Increase Node memory
export NODE_OPTIONS="--max-old-space-size=4096"
pnpm build
```

**Turbo cache causing issues:**
```bash
# Clear turbo cache
rm -rf .turbo
pnpm build
```

### CI/CD Pipeline

**Status:** Not yet configured

**Recommended setup (GitHub Actions):**
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8.15.0
      - uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm build
      - run: pnpm lint
      # When tests are added:
      # - run: pnpm test
```

### Performance Monitoring

**Post-deployment:** Monitor Core Web Vitals via:
- Vercel Analytics (automatic for Vercel deployments)
- Lighthouse CI (can be added to GitHub Actions)
- Manual Lighthouse audits in Chrome DevTools

**Target metrics:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

---

## Tech Stack

### Core Technologies

| Layer | Technology | Version | Notes |
|-------|------------|---------|-------|
| **Framework** | Next.js (App Router) | 16.0.10 | Server components, streaming |
| **React** | React | 18.3.1 (design-system)<br>19.2.1 (portfolio) | Using latest features |
| **Language** | TypeScript | 5.x | Strict mode enabled |
| **Styling** | Tailwind CSS | 3.x | Via CSS variables from design system |
| **Animation** | Framer Motion | 12.23.26 | Respects motion preferences |
| **State Management** | Zustand | 5.0.9 | With localStorage persistence |
| **Package Manager** | pnpm | 8.15.0 | Workspace support required |
| **Monorepo** | Turborepo | latest | Task orchestration, caching |
| **Build Tool** | tsup | 8.5.1 | For design-system package |
| **Deployment** | Vercel | - | Next.js optimized platform |

### Data & Content

| Purpose | Technology | Status |
|---------|------------|--------|
| **Content** | MDX | ✅ Configured in portfolio |
| **Data Fetching** | React Server Components + fetch | ✅ Next.js 15 native patterns |
| **Forms** | TBD | 📋 Not yet standardized |
| **Validation** | TBD | 📋 Consider Zod when needed |
| **Database** | TBD | 📋 Not yet needed |

### Testing & Quality

| Purpose | Technology | Status |
|---------|------------|--------|
| **Unit Testing** | Not configured | 📋 Consider Vitest when needed |
| **E2E Testing** | Not configured | 📋 Consider Playwright when needed |
| **Visual Testing** | Not configured | 📋 Future with Storybook |
| **Accessibility Testing** | Manual | 📋 Consider jest-axe when unit tests added |
| **Linting** | ESLint | ✅ Configured (eslint-config-next) |
| **Type Checking** | TypeScript | ✅ Strict mode |

### Development Tools

- **Hot Reload:** Next.js Fast Refresh + Turbopack (Next.js 16)
- **CSS Processing:** PostCSS + Autoprefixer
- **Import Aliases:** TypeScript paths (configured per app)
- **MCP Servers:** Figma (for design token sync)

### TypeScript Conventions

- **Strict mode enabled** across all packages
- Prefer `interface` over `type` for object shapes
- Use explicit return types on exported functions
- Avoid `any`—use `unknown` and narrow with type guards
- Component props should be defined as interfaces (e.g., `ButtonProps`)

### Tailwind Conventions

- Use design tokens from `design-system/tokens/` (imported as CSS variables)
- Prefer semantic class names via `@apply` in component styles when patterns repeat
- All motion utilities must respect `prefers-reduced-motion`
- Use Tailwind's arbitrary values sparingly—add to tokens if used repeatedly

---

## Design System Usage

The design system is the **heart** of this ecosystem. Every app imports from it.

### Package Structure

The design system is published as `@ecosystem/design-system` and consumed via workspace references:

```json
// In your app's package.json
{
  "dependencies": {
    "@ecosystem/design-system": "workspace:*"
  }
}
```

### Importing Components and Hooks

The package supports both main and scoped exports for tree-shaking:

```typescript
// Main export (most common - imports from design-system/src/index.ts)
import { Button, Card, useTheme, CustomizerPanel } from '@ecosystem/design-system'

// Scoped exports (for specific imports)
import { Button, Card } from '@ecosystem/design-system/atoms'
import { useMotionPreference, useTheme } from '@ecosystem/design-system/hooks'
import { CustomizerPanel } from '@ecosystem/design-system/features'
import { spacing, typography } from '@ecosystem/design-system/tokens'
import { ThemeProvider } from '@ecosystem/design-system/providers'
```

**When to use which:**
- Use main export for most cases: `import { Button } from '@ecosystem/design-system'`
- Use scoped exports when you want explicit paths or better IDE autocomplete

### Design Tokens

Tokens are the single source of truth for visual properties:

```typescript
import { spacing, typography } from '@ecosystem/design-system/tokens'

// Spacing scale
spacing.xs    // 4px
spacing.sm    // 8px
spacing.md    // 16px
spacing.lg    // 24px
spacing.xl    // 32px
// ... see design-system/README.md for complete token documentation

// Typography
typography.fonts.sans      // Theme-specific sans-serif
typography.fonts.serif     // Theme-specific serif (Sage theme)
typography.fonts.mono      // Theme-specific monospace
typography.sizes.base      // 16px
typography.weights.semibold // 600
// ... see design-system/README.md for complete typography scale
```

**Colors are CSS variables** applied by ThemeProvider:

```typescript
// Use in your components
const styles = {
  backgroundColor: 'var(--color-background)',
  color: 'var(--color-text-primary)',
  borderColor: 'var(--color-border)',
}
// See design-system/README.md for complete list of CSS variables
```

### Flagship Features

Three features embody the philosophy. Here's their current status:

1. **Customizer** — User control made tangible ✅ **IMPLEMENTED**
   - Location: `design-system/features/customizer/`
   - Import: `import { CustomizerPanel } from '@ecosystem/design-system'`
   - Features:
     - Motion intensity slider (0-10 scale, respects `prefers-reduced-motion`)
     - Theme selector (Studio, Sage, Volt)
     - Color mode toggle (light/dark)
     - X-Ray Mode toggle (control exists but UI overlay not built)
   - Persists to localStorage
   - **Usage:** Add `<CustomizerPanel />` to your app layout

2. **X-Ray Mode** — Transparency made interactive 🚧 **IN DEVELOPMENT**
   - Toggle control exists in Customizer
   - UI overlay component not yet built
   - **Planned features:**
     - Reveal design tokens in use
     - Show component boundaries
     - Display AI collaboration notes
   - **When building:** Create as `design-system/features/xray/XRayOverlay.tsx`

3. **AI Notes** — Collaboration made visible 📋 **PLANNED**
   - Component not yet built
   - **Planned features:**
     - Document AI involvement in building features
     - Show decision rationale
     - "Shows the receipts"
   - **When building:** Create as `design-system/features/ai-notes/AINote.tsx`
   - **Implementation suggestion:** Inline component that appears in context, triggered by X-Ray Mode

---

## State Management

The ecosystem uses **Zustand** for client-side state management with localStorage persistence.

### When to Use Zustand

**Use Zustand for:**
- User preferences (theme, motion settings, UI state)
- Feature flags and toggles
- Client-side state that needs to persist across page reloads
- Complex state shared across many components

**Don't use Zustand for:**
- Server data (use React Server Components + fetch)
- Form state (use React state or a form library)
- Simple component state (use `useState`)
- State only used by one component

### Existing Stores

| Store | Location | Purpose | Persists? |
|-------|----------|---------|-----------|
| **Theme Store** | `design-system/store/theme.ts` | Current theme name and color mode | ✅ Yes (localStorage) |
| **Customizer Store** | `design-system/features/customizer/store.ts` | Motion intensity, x-ray mode, system preferences | ✅ Yes (localStorage) |

### Using Existing Stores

```typescript
// Theme store
import { useTheme } from '@ecosystem/design-system/hooks'

function ThemeSelector() {
  const { theme, mode, setTheme, setMode, toggleMode } = useTheme()

  return (
    <button onClick={() => setTheme('sage')}>
      Switch to Sage theme
    </button>
  )
}

// Customizer store
import { useMotionPreference } from '@ecosystem/design-system/hooks'

function AnimatedComponent() {
  const { scale, shouldAnimate } = useMotionPreference()

  // scale: 0-10 (user's preference)
  // shouldAnimate: boolean (false if scale=0 or prefers-reduced-motion)

  return shouldAnimate ? <WithAnimation /> : <WithoutAnimation />
}
```

### Creating a New Store

**Design System Store** (for shared state across all apps):

```typescript
// design-system/store/myFeature.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MyFeatureState {
  enabled: boolean
  setEnabled: (enabled: boolean) => void
}

export const useMyFeature = create<MyFeatureState>()(
  persist(
    (set) => ({
      enabled: false,
      setEnabled: (enabled) => set({ enabled }),
    }),
    {
      name: 'my-feature-storage', // localStorage key
    }
  )
)
```

**App-Specific Store** (for state only used in one app):

```typescript
// apps/portfolio/store/navigation.ts
import { create } from 'zustand'

interface NavigationState {
  isMenuOpen: boolean
  toggleMenu: () => void
}

export const useNavigation = create<NavigationState>((set) => ({
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}))
```

### Store Organization Rules

1. **Global stores** → `design-system/store/`
2. **Feature stores** → Co-locate with feature: `design-system/features/<feature>/store.ts`
3. **App stores** → `apps/<app>/store/` or `apps/<app>/lib/store/`

### Persistence Patterns

**With localStorage (user preferences):**
```typescript
export const useMyStore = create<MyState>()(
  persist(
    (set) => ({ /* state */ }),
    {
      name: 'my-store-key',
      // Optional: only persist specific fields
      partialize: (state) => ({
        setting: state.setting
      }),
    }
  )
)
```

**Without persistence (transient UI state):**
```typescript
export const useMyStore = create<MyState>((set) => ({
  // Just the store, no persist middleware
}))
```

### Best Practices

✅ **Do:**
- Keep stores focused (one concern per store)
- Export a custom hook, not the store directly
- Use TypeScript interfaces for state shape
- Persist only what needs to survive reloads
- Document what each store does (comment at top of file)

❌ **Don't:**
- Put server data in Zustand (it will go stale)
- Create stores for one-component state
- Store sensitive data in localStorage
- Persist computed/derived state

### Debugging Stores

```typescript
// Add this to see state changes in console (dev only)
import { useEffect } from 'react'
import { useMyStore } from './store'

function DebugStore() {
  const state = useMyStore()

  useEffect(() => {
    console.log('Store state changed:', state)
  }, [state])

  return null
}
```

Or use [Zustand DevTools](https://github.com/pmndrs/zustand#redux-devtools):

```typescript
import { devtools } from 'zustand/middleware'

export const useMyStore = create<MyState>()(
  devtools(
    persist(/* ... */),
    { name: 'MyStore' }
  )
)
```

---

## Accessibility Requirements

**These are non-negotiable.** From **[DESIGN-PHILOSOPHY.md](DESIGN-PHILOSOPHY.md)**:

> Accessibility is not optional. Motion = 0 must work perfectly. High contrast modes must be first-class. Users who need accommodations get excellent experiences, not degraded ones.

### Checklist for Every Component

- [ ] Works with `prefers-reduced-motion: reduce`
- [ ] Keyboard navigable (logical tab order, focus indicators)
- [ ] Screen reader compatible (semantic HTML, ARIA where needed)
- [ ] Color contrast meets WCAG AA minimum (4.5:1 for text)
- [ ] Interactive elements have visible focus states
- [ ] No information conveyed by color alone

### Motion Pattern

```typescript
// Always check motion preference
import { useReducedMotion } from 'framer-motion'

function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <motion.div
      animate={{ opacity: 1, y: shouldReduceMotion ? 0 : 20 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
    >
      {/* content */}
    </motion.div>
  )
}
```

---

## Code Style

### File Naming

- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Types: `types.ts` or `ComponentName.types.ts`
- Tests: `ComponentName.test.tsx`

### Component Structure

```typescript
// ComponentName.tsx

// 1. Imports (external, then internal, then types)
import { motion } from 'framer-motion'
import { cn } from '@ecosystem/utils'
import type { ComponentNameProps } from './ComponentName.types'

// 2. Types (if not in separate file)
interface ComponentNameProps {
  // ...
}

// 3. Component
export function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  // hooks first
  // derived state
  // handlers
  // render
}

// 4. Display name (for DevTools)
ComponentName.displayName = 'ComponentName'
```

### Comments

Write comments that explain **why**, not **what**:

```typescript
// ❌ Bad: Describes what the code does
// Set opacity to 0
setOpacity(0)

// ✅ Good: Explains why
// Fade out before unmounting to prevent jarring removal
setOpacity(0)
```

---

## MCP Server Integration

**Model Context Protocol (MCP)** lets AI coding assistants access external tools and data sources. This ecosystem uses MCP to connect design files, documentation, and other resources.

### What is MCP?

MCP is a protocol that allows AI assistants (like Claude) to:
- Access external APIs and services
- Read design files (Figma, Sketch)
- Query databases or documentation
- Use specialized tools beyond basic file operations

Think of it as "plugins for AI assistants."

### Configured MCP Servers

**Current configuration** (`.mcp.json` at repo root):

```json
{
  "mcpServers": {
    "figma": {
      "type": "http",
      "url": "https://mcp.figma.com/mcp"
    }
  }
}
```

**Figma MCP** provides:
- Access to design files and prototypes
- Design token values (colors, spacing, typography)
- Component specs and measurements
- Design system documentation from Figma

### When to Use MCP Tools

**Use Figma MCP when:**
- Implementing a new component from a design
- Verifying design token values match Figma
- Checking spacing, colors, or typography specs
- Syncing design system changes from Figma

**Example workflow:**
1. User says: "Implement the Hero component from Figma"
2. Agent uses Figma MCP to fetch component specs
3. Agent implements component using exact values from design
4. Agent verifies colors/spacing match tokens

### For AI Agents

When working with this codebase:

1. **Check if MCP tools are available** — Some environments may not have MCP configured
2. **Use Figma MCP when implementing UI** — Reference design specs to ensure accuracy
3. **Document AI collaboration** — Add comments or AI Notes when you use MCP data to inform decisions
4. **Verify before using** — MCP data is a reference, not ground truth. Always verify critical values.

### Adding New MCP Servers

To add a new MCP server (with human approval):

1. Update `.mcp.json`:
```json
{
  "mcpServers": {
    "figma": { /* existing */ },
    "newServer": {
      "type": "http",
      "url": "https://example.com/mcp"
    }
  }
}
```

2. Document in `docs/mcp-setup.md` (create if doesn't exist):
   - What the server provides
   - How to use it
   - Any required authentication or setup

3. Add to this section in AGENTS.md

### Troubleshooting MCP

**MCP server not responding:**
- Check internet connection
- Verify server URL in `.mcp.json`
- Check if service requires authentication

**Can't access Figma designs:**
- Ensure Figma file is shared correctly
- Verify Figma MCP server is running
- Check file permissions

### Related Documentation

- **Full MCP setup guide:** `docs/mcp-setup.md` (if it exists)
- **MCP Protocol spec:** https://modelcontextprotocol.io
- **Figma MCP docs:** Check Figma's MCP documentation

---

## Git Conventions

### Commit Messages

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat` — New feature
- `fix` — Bug fix
- `docs` — Documentation
- `style` — Formatting (no code change)
- `refactor` — Code restructure (no behavior change)
- `test` — Adding tests
- `chore` — Maintenance

**Example:**
```
feat(design-system): add Customizer motion slider

Implements user-controlled motion preference that persists
to localStorage and respects prefers-reduced-motion.

Closes #42
```

### Branch Naming

```
type/brief-description
```

Examples:
- `feat/customizer-motion-slider`
- `fix/button-focus-state`
- `docs/agents-md`

---

## Testing Standards (Future)

*Note: Testing is not yet fully configured. When adding tests in the future, follow these standards:*

- **Stack:** Vitest, @testing-library/react, user-event, jest-axe.
- **Location:** Co-locate tests with components (e.g., `Button.test.tsx`).
- **Priority:**
  1. **Accessibility** (no violations via `jest-axe`)
  2. **User Behavior** (clicks, flows)
  3. **Edge Cases**
- **Philosophy:** Test behavior, not implementation details.

---

## Adding New Features

### To the Design System

1. Determine atomic level (atom, molecule, pattern, feature)
2. Create component in appropriate directory
3. Export from package index
4. Add to Storybook (when available)
5. Document usage in component file
6. Add AI Notes if built with AI collaboration

### To an App

1. Check if the component belongs in design-system instead
2. If app-specific, create in `apps/<app>/components/`
3. Use design system tokens and components
4. Follow accessibility checklist
5. Add tests

---

## Breaking Changes Protocol

Breaking changes to the design system affect all apps. Follow this protocol strictly.

### What Counts as Breaking

**Breaking changes include:**
- Removing or renaming exported components, hooks, or utilities
- Changing component prop interfaces (removing props, changing types)
- Changing token values in ways that break existing usage
- Removing or renaming design tokens
- Changing store interfaces or state shape
- Modifying CSS variable names
- Changing the behavior of existing features in non-backwards-compatible ways

**Not breaking:**
- Adding new optional props
- Adding new components, hooks, or tokens
- Fixing bugs that restore intended behavior
- Internal refactoring with same public API
- Adding new CSS variables
- Deprecating with backwards compatibility

### Before Making a Breaking Change

**1. Check if it's truly necessary**
   - Can you add the new API alongside the old one?
   - Can you use a deprecation period?
   - Is there a backwards-compatible alternative?

**2. Discuss with the human (Shalom) first**
   - Explain what you want to change and why
   - Propose migration path for existing code
   - Get explicit approval before proceeding

**3. Search for usage across the ecosystem**
```bash
# Find all usages of the thing you're about to break
cd /Users/shalomormsby/Developer/work/ecosystem
grep -r "oldComponentName" apps/
grep -r "oldPropName" apps/
```

### Making a Breaking Change

**Step 1: Version bump**
- Update `design-system/package.json` version:
  - Major bump (1.0.0 → 2.0.0) for breaking changes
  - Minor bump (1.0.0 → 1.1.0) for new features
  - Patch bump (1.0.0 → 1.0.1) for bug fixes

**Step 2: Update CHANGELOG.md**
```markdown
## [2.0.0] - 2025-12-16

### BREAKING CHANGES
- **Button component:** Removed `variant="outline"` prop. Use `variant="secondary"` instead.
  - Migration: Find and replace `variant="outline"` with `variant="secondary"`

- **Theme tokens:** Renamed `spacing.giant` to `spacing['4xl']`
  - Migration: Update imports and usage

### Migration Guide
[Provide step-by-step migration instructions]
```

**Step 3: Update all consuming apps**
- Fix all apps in the ecosystem to use new API
- Test each app builds and runs
- Commit all changes together (atomic change)

**Step 4: Create migration guide**
- Add to `design-system/MIGRATION.md` (create if doesn't exist)
- Include code examples (before/after)
- Document every breaking change

**Step 5: Communicate**
- If published to npm: release notes, blog post, or email
- Internal: update team via appropriate channel

### Deprecation (Preferred Alternative)

**Instead of breaking immediately, deprecate first:**

```typescript
/**
 * @deprecated Use `newComponent` instead. Will be removed in v3.0.0
 * @see {@link newComponent}
 */
export function OldComponent(props: OldProps) {
  console.warn('OldComponent is deprecated. Use newComponent instead.')
  return <NewComponent {...props} />
}
```

**Deprecation period:** At least one minor version before removal.

Example timeline:
- v1.5.0: Add new API, deprecate old API (both work)
- v1.6.0, v1.7.0: Both APIs still work, warnings remain
- v2.0.0: Remove deprecated API (breaking change)

### Versioning Strategy

**Design system follows semantic versioning:**

- **Major (x.0.0):** Breaking changes
- **Minor (1.x.0):** New features, deprecations (backwards compatible)
- **Patch (1.0.x):** Bug fixes, internal improvements

**When to publish a new version:**
- After any significant feature addition
- Before making a breaking change (so apps can lock to old version if needed)
- When accumulated bug fixes warrant it

**Not yet published to npm?** Still follow versioning in package.json for internal tracking.

### Emergency Breaking Changes

**If you must break immediately (security issue, critical bug):**

1. **Document the urgency** in commit message and CHANGELOG
2. **Fix all consuming apps immediately** (don't leave broken)
3. **Add regression test** to prevent it happening again
4. **Post-mortem:** Why did this happen? How do we prevent it?

### Reviewing Breaking Changes

**Before merging a PR with breaking changes:**
- [ ] Version bumped appropriately
- [ ] CHANGELOG.md updated with BREAKING CHANGES section
- [ ] All apps in monorepo updated and tested
- [ ] Migration guide provided
- [ ] Discussed with and approved by Shalom

---

## AI Collaboration Guidelines

You're a partner in a creative process, not a code generator. From **[DESIGN-PHILOSOPHY.md](DESIGN-PHILOSOPHY.md)**:

### Do

- Ask clarifying questions when intent is unclear
- Actively seek out and challenge assumptions and bias
- Propose options, don't make unilateral decisions
- Be honest about tradeoffs
- Ship working prototypes over perfect abstractions
- Document your involvement via AI Notes

### Don't

- Make major architectural decisions without discussion
- Skip accessibility requirements
- Ignore the design system in favor of one-off solutions
- Optimize prematurely
- Hide complexity from the human collaborator

### When Uncertain

Refer to the decision framework in **[DESIGN-PHILOSOPHY.md](DESIGN-PHILOSOPHY.md)**:

1. **Functional** — It must work
2. **Honest** — It must be true to what it claims
3. **Lovable** — It should delight
4. **Perfect** — Polish comes last

Ship working over perfect. One excellent thing over three mediocre things.

---

## Troubleshooting

### Common Issues

**pnpm install fails**
```bash
# Clear cache and retry
pnpm store prune
rm -rf node_modules
pnpm install
```

**TypeScript errors after pulling**
```bash
# Rebuild types
pnpm typecheck
```

**Turborepo cache issues**
```bash
# Clear Turbo cache
rm -rf .turbo
pnpm build
```

### Getting Help

1. Check existing documentation in `/docs`
2. Review recent commits for context
3. Ask the human collaborator (Shalom) directly

---

## Related Files

### Essential Reading

- **[DESIGN-PHILOSOPHY.md](DESIGN-PHILOSOPHY.md)** — **Read this first.** The North Star. Contains the four principles that guide all decisions.
- **[design-system/README.md](design-system/README.md)** — Design system architecture, components, usage guide. Reference this for import paths and component APIs.
- **[CHANGELOG.md](CHANGELOG.md)** — Project history. Check here to see what's been done recently before starting work.

### Configuration Files

- **[.mcp.json](.mcp.json)** — MCP server configuration (Figma integration)
- **[turbo.json](turbo.json)** — Turborepo task pipeline (build, dev, lint)
- **[pnpm-workspace.yaml](pnpm-workspace.yaml)** — Workspace package definitions
- **[package.json](package.json)** — Root package with monorepo scripts

### App Documentation

- **[apps/portfolio/README.md](apps/portfolio/README.md)** — Portfolio app setup and context
- **[apps/sage-stocks/README.md](apps/sage-stocks/README.md)** — Sage Stocks app (if exists)
- **[apps/creative-powerup/README.md](apps/creative-powerup/README.md)** — Creative Powerup app (if exists)

### Additional Documentation

- **[docs/mcp-setup.md](docs/mcp-setup.md)** — MCP server setup guide (if it exists)
- **[README.md](README.md)** — Project overview for GitHub visitors

### Quick Reference Links

**Within this file:**
- [Current Implementation State](#current-implementation-state) — See what exists vs what's planned
- [File Organization Rules](#file-organization-rules) — Where to put new files
- [Design System Usage](#design-system-usage) — How to import and use components
- [State Management](#state-management) — Zustand stores and patterns
- [Testing](#testing) — How to set up and write tests
- [Build and Deployment](#build-and-deployment) — Building and deploying apps
- [Breaking Changes Protocol](#breaking-changes-protocol) — How to handle breaking changes

---

**Remember:** The work is the proof. Every line of code should demonstrate that human-centered design must be demonstrated through architecture, process, and results, not just claimed. Build things that make people feel seen, capable, and empowered.
