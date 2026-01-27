# AGENTS.md

> **For AI coding agents working on this ecosystem. Read [DESIGN-PHILOSOPHY.md](DESIGN-PHILOSOPHY.md) first—it's the North Star. This file tells you how to build in alignment with it.**

---

## Quick Orientation

This is a **monorepo** expressing one unified design philosophy through multiple products. You're not building separate apps—you're building different expressions of the same vision.

```
ecosystem/
├── apps/
│   ├── portfolio/              # Next.js 15 — The proof of philosophy
│   ├── sage-stocks/            # Next.js 15 — AI-powered investment intelligence
│   ├── creative-powerup/       # Next.js 15 — Community platform
│   ├── sageos/                 # Future — Personal operating system
│   └── web/     # Documentation & playground
├── packages/
│   ├── ui/                     # @thesage/ui — Component library (THE HEART)
│   │   └── src/
│   │       ├── components/     # Functionally organized (actions, forms, navigation, etc.)
│   │       ├── lib/            # Utilities, validation, animations
│   │       ├── hooks/          # useTheme, useMotionPreference, etc.
│   │       └── providers/      # ThemeProvider, etc.
│   ├── tokens/                 # @thesage/tokens — Design system tokens
│   └── config/                 # Shared config (Tailwind, etc.)
└── docs/                       # Documentation including MCP setup
```

**Key insight:** Components are organized by **functional purpose** (what they do), not abstract hierarchy. This aligns with modern design systems and eliminates classification ambiguity.

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
2. **Check UI package output:** `ls packages/ui/dist`
3. **Check recent changes:** `git log -5 --oneline`
4. **Check defined tokens:** Read `packages/tokens/src/index.ts`

---


## Workflows

We use `.agent/workflows/` to store step-by-step guides for common tasks.

- **[Register New Component](.agent/workflows/register-new-component.md)**: Steps to add a component to the library and Studio.

## File Organization Rules

**AI agents: Read this carefully.** Disorganized file placement is one of the fastest ways to erode a codebase. Follow these rules strictly.

### Where New Files Go

| If you're creating... | Put it in... |
|----------------------|--------------|
| Shared component (used by 2+ apps) | `packages/ui/src/components/[category]/` (choose functional category) |
| App-specific component | `apps/<app>/components/` |
| Shared custom hook | `packages/ui/src/hooks/` |
| App-specific hook | `apps/<app>/hooks/` |
| Global state store (design system) | `packages/ui/src/lib/stores/` |
| Feature-specific state | `packages/ui/src/features/<feature>/store.ts` |
| App-specific state | `apps/<app>/store/` or `apps/<app>/lib/store/` |
| React provider (design system) | `packages/ui/src/providers/` |
| App-specific provider | `apps/<app>/providers/` or `apps/<app>/components/providers/` |
| Shared utility function | `packages/ui/src/lib/` or `packages/utils/` |
| App-specific utility | `apps/<app>/lib/` or `apps/<app>/utils/` |
| Design tokens | `packages/tokens/src/` |
| Shared TypeScript types | `packages/ui/src/types/` or within component folder as `ComponentName.types.ts` |
| App-specific types | `apps/<app>/types/` or co-located with components |
| Component-specific styles | Co-located with component (if not using Tailwind exclusively) |
| Documentation | `docs/` (only if it serves multiple apps) |
| App-specific docs | `apps/<app>/README.md` or `apps/<app>/docs/` |
| Config files | Root or `packages/config/` (discuss first) |

### Functional Component Categories

Place components in the category that matches their **primary purpose**:

- **actions/** — Interactive elements that trigger behaviors (Button, Toggle, ToggleGroup)
- **forms/** — Input controls for data collection (Input, Select, Checkbox, Switch, Slider, Label, Form, RadioGroup, Textarea, SearchBar, TextField)
- **navigation/** — Moving through content hierarchy (Breadcrumb, Tabs, Pagination, Command, NavigationMenu, MenuBar)
- **overlays/** — Contextual content above main UI (Dialog, Sheet, Popover, Tooltip, Drawer, DropdownMenu, ContextMenu, HoverCard, AlertDialog)
- **feedback/** — Communicating system state (Alert, Toast, Progress, Skeleton, Sonner)
- **data-display/** — Presenting information (Table, DataTable, Card, Avatar, Badge, Calendar)
- **layout/** — Spatial organization (Accordion, Carousel, ScrollArea, Separator, AspectRatio, Collapsible, ResizablePanels, Sidebar)
- **features/** — Complex, philosophy-embodying features (Customizer, AI Notes)

**When uncertain:** Choose based on the component's **primary purpose**. If it could fit multiple categories, ask: "What is this component's main job?" For example, SearchBar is in `forms/` (collects input) not `navigation/` (even though it aids navigation).

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
│  │       ├─ YES → packages/ui/src/components/
│  │       │       └─ Which functional category?
│  │       │           ├─ Triggers behavior → actions/
│  │       │           ├─ Collects data → forms/
│  │       │           ├─ Moves through content → navigation/
│  │       │           ├─ Contextual overlay → overlays/
│  │       │           ├─ Communicates state → feedback/
│  │       │           ├─ Presents information → data-display/
│  │       │           ├─ Organizes content → layout/
│  │       │           └─ Philosophy-embodying feature → features/
│  │       └─ NO → apps/<app>/components/
│  │
├─ React Hook?
│  ├─ Used by design system components → packages/ui/src/hooks/
│  └─ App-specific → apps/<app>/hooks/
│
├─ State Store?
│  ├─ Global (design system) → packages/ui/src/lib/stores/
│  ├─ Feature-specific → packages/ui/src/features/<feature>/store.ts
│  └─ App-specific → apps/<app>/store/
│
├─ React Provider?
│  ├─ Design system provider → packages/ui/src/providers/
│  └─ App-specific → apps/<app>/providers/
│
├─ Utility Function?
│  ├─ Shared across apps → packages/utils/
│  └─ App-specific → apps/<app>/lib/ or apps/<app>/utils/
│
├─ Design Token?
│  └─ Always → packages/tokens/src/
│
├─ TypeScript Types?
│  ├─ Component-specific → ComponentName.types.ts (co-located)
│  ├─ Shared across design system → packages/ui/src/types/
│  └─ App-specific shared types → apps/<app>/types/
│
├─ Documentation?
│  ├─ Multi-app documentation → docs/
│  ├─ App-specific → apps/<app>/README.md or apps/<app>/docs/
│  └─ Design system docs → apps/web/docs/
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
| A SearchBar that portfolio and sage-stocks will use | `packages/ui/src/components/forms/SearchBar/` |
| A hook to track scroll position in portfolio | `apps/portfolio/hooks/useScrollPosition.ts` |
| A theme store for the design system | `packages/ui/src/lib/stores/theme.ts` |
| Types for the Button component | `packages/ui/src/components/actions/Button/Button.types.ts` |
| A utility to format currency in sage-stocks | `apps/sage-stocks/lib/formatCurrency.ts` |
| Documentation about deployment | `docs/deployment.md` |

### Disambiguating READMEs

Multiple README.md files exist at different levels:
- `/README.md` — Ecosystem overview (for GitHub visitors)
- `/apps/<app>/README.md` — App-specific setup and context
- `/apps/web/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md` — Design system strategy and usage

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


## UI & Styling Strict Mode

**Adhere to these rules STRICTLY. They prevent code bloat, design drift, and maintenance nightmares.**

1. **SDS Components First:** ALWAYS search for and use existing `@thesage/ui` components (Card, Button, Badge, etc.) before writing any custom JSX or CSS.
2. **Prop-Based Styling:** Use component props (e.g., `hoverEffect`, `variant`, `size`) to achieve desired styles. DO NOT reimplement built-in behaviors with custom utility classes (e.g., don't write `hover:shadow-lg` if `hoverEffect={true}` exists).
3. **No Ad-Hoc CSS:** Avoid generating arbitrary Tailwind classes if an Sage UI component can handle the use case.
4. **Demand New Components:** If a Sage UI component does not exist to meet a web dev need, **mention this to the user** and offer to create a new Sage UI component to meet this need. Do not hack together a one-off solution in the app layer.

---

## Coding Standards & Troubleshooting

### Learn from our Mistakes (The "Never Again" List)

1. **Syntax Errors in Configuration Files:** When editing large configuration objects (like `navigation-tree.tsx`), be extremely careful with closing brackets `}` and `]`.
   - **Mistake:** A previous build failed because extra closing brackets were added, and indentation became inconsistent, breaking the build.
   - **Fix:** Double-check your object structure. Use a linter. verifying that every opening bracket has exactly one matching closing bracket.
   - **Rule:** Do not rush file edits. Verify the syntax locally if possible, or visually double-check the diff before committing.

2. **Prop Hallucination:** Do not assume a component has a prop (like `className` or `style`) unless you verify it in the component definition.
   - **Mistake:** Adding `className` to a custom component that didn't accept it, causing it to be ignored.
   - **Rule:** Read the component file (e.g., `view_file packages/ui/src/components/...`) to confirm available props.

### 🆘 Troubleshooting Guide

If you encounter errors, **STOP and refer to** [The Studio Troubleshooting Guide](https://thesage.dev/#adding-components/troubleshooting).

**Common Motion Issues:**
*   **Black Shader Previews (The "Unified Path" Fix):** If varying props (like `pageLoadAnimation={false}`) cause a shader to turn black, **avoid branching logic in GLSL** (e.g., `if (uUseAnimation > 0.5)`). Instead, **unify the code path**: always run the animation logic in the shader, but control the valid state from JavaScript (e.g., set `uProgress` to `1.0` immediately to skip the effect). This ensures the shader always executes a proven, active code path.
*   **Missing Textures:** Verify that any required textures or assets are correctly loaded and accessible.

**Common Build Errors:**
*   **`useRef` Type Errors:** In strict TypeScript, `useRef<T>()` without arguments is invalid. Always initialize with `null` if the initial value isn't known: `useRef<T>(null)`.
*   **`styled-jsx` in Components:** Avoid using `<style jsx>` in shared components as it can cause build failures. Use `useEffect` to inject global styles or CSS Modules/Tailwind for scoped styles.

---


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
git clone https://github.com/shalomormsby/ecosystem.git
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

# 2. Verify @thesage/ui built successfully
ls packages/ui/dist  # Should show index.js, index.d.ts, etc.

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

**"Cannot find module '@thesage/ui'"**
```bash
# Solution: Build the design system first
pnpm build --filter @thesage/ui
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
- **Design System:** `packages/ui/dist/` (ESM + CJS via tsup)
- **Next.js Apps:** `apps/<app>/.next/` (production-optimized bundles)

### Building Locally

```bash
# Build everything (design system + all apps)
pnpm build

# Build only design system
pnpm build --filter @thesage/ui

# Build specific app
pnpm build --filter portfolio

# Build with cache cleared (if seeing issues)
rm -rf .turbo packages/ui/dist apps/*/.next
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
1. Update version in `packages/ui/package.json`
2. Build: `pnpm build --filter @thesage/ui`
3. Publish: `cd packages/ui && npm publish`
4. Update CHANGELOG.md with version and changes

**Package name:** `@thesage/ui` (or update before publishing)

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
pnpm build --filter @thesage/ui

# Stale node_modules
rm -rf node_modules apps/*/node_modules packages/*/node_modules
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
| **React** | React | 18.3.1 (@thesage/ui)<br>19.2.1 (portfolio) | Using latest features |
| **Language** | TypeScript | 5.x | Strict mode enabled |
| **Styling** | Tailwind CSS | 3.x | Via CSS variables from design system |
| **Animation** | Framer Motion | 12.23.26 | Respects motion preferences |
| **State Management** | Zustand | 5.0.9 | With localStorage persistence |
| **Package Manager** | pnpm | 8.15.0 | Workspace support required |
| **Monorepo** | Turborepo | latest | Task orchestration, caching |
| **Build Tool** | tsup | 8.5.1 | For @thesage/ui package |
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

- Use design tokens from `packages/tokens/` (imported as CSS variables)
- Prefer semantic class names via `@apply` in component styles when patterns repeat
- All motion utilities must respect `prefers-reduced-motion`
- Use Tailwind's arbitrary values sparingly—add to tokens if used repeatedly

---

## Design System Usage

The design system is the **heart** of this ecosystem. Every app imports from it.

### Package Structure

The design system is published as `@thesage/ui` and consumed via workspace references:

```json
// In your app's package.json
{
  "dependencies": {
    "@thesage/ui": "workspace:*"
  }
}
```

### Importing Components and Hooks

The package supports both main and scoped exports for tree-shaking:

```typescript
// Main export (most common - imports from packages/ui/src/index.ts)
import { Button, Card, useTheme, CustomizerPanel } from '@thesage/ui'

// Scoped exports (for specific imports) - all available via subpath exports
import { useMotionPreference, useTheme } from '@thesage/ui/hooks'
import { ThemeProvider } from '@thesage/ui/providers'
import { cn } from '@thesage/ui/utils'
// Note: Tokens are from separate package
import { spacing, typography } from '@thesage/tokens'
```

**When to use which:**
- Use main export for most cases: `import { Button } from '@thesage/ui'`
- Use scoped exports when you want explicit paths or better IDE autocomplete

### Design Tokens

Tokens are the single source of truth for visual properties:

```typescript
import { spacing, typography } from '@thesage/ui/tokens'

// Spacing scale
spacing.xs    // 4px
spacing.sm    // 8px
spacing.md    // 16px
spacing.lg    // 24px
spacing.xl    // 32px
// ... see apps/web/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md for complete token documentation

// Typography
typography.fonts.sans      // Theme-specific sans-serif
typography.fonts.serif     // Theme-specific serif (Sage theme)
typography.fonts.mono      // Theme-specific monospace
typography.sizes.base      // 16px
typography.weights.semibold // 600
// ... see apps/web/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md for complete typography scale
```

**Colors are CSS variables** applied by ThemeProvider:

```typescript
// Use in your components
const styles = {
  backgroundColor: 'var(--color-background)',
  color: 'var(--color-text-primary)',
  borderColor: 'var(--color-border)',
}
// See apps/web/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md for complete list of CSS variables
```

### Flagship Features

Three features embody the philosophy. Here's their current status:

1. **Customizer** — User control made tangible ✅ **IMPLEMENTED**
   - Location: `packages/ui/src/features/customizer/`
   - Import: `import { CustomizerPanel } from '@thesage/ui'`
   - Features:
     - Motion intensity slider (0-10 scale, respects `prefers-reduced-motion`)
     - Theme selector (Studio, Sage, Volt)
     - Color mode toggle (light/dark)
   - Persists to localStorage
   - **Usage:** Add `<CustomizerPanel />` to your app layout

2. **AI Notes** — Collaboration made visible 📋 **PLANNED**
   - Component not yet built
   - **Planned features:**
     - Document AI involvement in building features
     - Show decision rationale
     - "Shows the receipts"
   - **When building:** Create as `packages/ui/src/features/ai-notes/AINote.tsx`

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
| **Theme Store** | `packages/ui/src/lib/stores/theme.ts` | Current theme name and color mode | ✅ Yes (localStorage) |
| **Customizer Store** | `packages/ui/src/lib/store/customizer.ts` | Motion intensity, system preferences | ✅ Yes (localStorage) |

### Using Existing Stores

```typescript
// Theme store
import { useTheme } from '@thesage/ui/hooks'

function ThemeSelector() {
  const { theme, mode, setTheme, setMode, toggleMode } = useTheme()

  return (
    <button onClick={() => setTheme('sage')}>
      Switch to Sage theme
    </button>
  )
}

// Customizer store
import { useMotionPreference } from '@thesage/ui/hooks'

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
// packages/ui/src/lib/stores/myFeature.ts
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

1. **Global stores** → `packages/ui/src/lib/stores/`
2. **Feature stores** → Co-locate with feature: `packages/ui/src/features/<feature>/store.ts`
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

## Dependency Management Strategy

**Proper dependency management reduces maintenance burden and prevents version conflicts across the monorepo.**

### Package Types and Dependency Rules

#### Shared Libraries (@thesage/ui, @thesage/tokens, packages/*)

**Rule:** Use `peerDependencies` with version ranges for packages that consuming apps will also depend on (React, framer-motion, etc.)

```json
{
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",        // Support multiple major versions
    "react-dom": "^18.0.0 || ^19.0.0",
    "framer-motion": "^11.0.0 || ^12.0.0"
  },
  "devDependencies": {
    "react": "^18.3.1",        // For local development and testing
    "react-dom": "^18.3.1",
    "typescript": "^5.9.3"
  },
  "dependencies": {
    "zustand": "^5.0.9"        // Runtime dependencies not provided by consumer
  }
}
```

**Why:**
- **peerDependencies** let consuming apps choose their version within the supported range
- **devDependencies** provide development/testing environment for the library
- **dependencies** are for packages the library needs that consumers don't provide

#### Applications (apps/*)

**Rule:** Use `^` semver ranges for automatic updates within major versions

```json
{
  "dependencies": {
    "react": "^19.2.1",                      // Gets 19.x updates, not 20.x
    "next": "^16.0.10",                      // Gets 16.x updates, not 17.x
    "@thesage/ui": "workspace:^" // Always use workspace protocol
  }
}
```

**Why:**
- `^` allows minor and patch updates automatically (security fixes, bug fixes)
- Blocks major version updates (which may contain breaking changes)
- Reduces manual maintenance while staying safe

### Semver Quick Reference

| Pattern | Meaning | Example | Updates To |
|---------|---------|---------|------------|
| `19.2.1` | Exact version | `19.2.1` | Never (frozen) |
| `^19.2.1` | Compatible with | `19.2.1` | `19.2.2`, `19.3.0`, `19.99.0` (not `20.0.0`) |
| `~19.2.1` | Approximately | `19.2.1` | `19.2.2`, `19.2.9` (not `19.3.0`) |
| `^18.0.0 \|\| ^19.0.0` | Either range | `18.x` or `19.x` | Any `18.x` or `19.x` |

**Prefer `^` for apps, use exact versions only when you have a specific reason to pin.**

### Why This Matters

**Without ranges (❌ Bad):**
```json
{
  "dependencies": {
    "react": "19.2.1"  // Frozen at exactly 19.2.1
  }
}
```
- Security patches require manual updates
- Bug fixes require manual updates
- High maintenance burden across all apps

**With ranges (✅ Good):**
```json
{
  "dependencies": {
    "react": "^19.2.1"  // Auto-updates within 19.x
  }
}
```
- Security patches applied automatically via `pnpm install`
- Bug fixes applied automatically
- Stays on same major version (no breaking changes)
- Low maintenance burden

### Avoiding Version Conflicts

**Problem:** Portfolio uses React 19, @thesage/ui locked to React 18
```json
// ❌ This creates conflicts
// packages/ui/package.json
{
  "dependencies": {
    "react": "18.3.1"  // Locked to 18
  }
}

// apps/portfolio/package.json
{
  "dependencies": {
    "react": "19.2.1"  // Wants 19
  }
}
```

**Solution:** Design-system uses flexible peerDependencies
```json
// ✅ This allows both versions
// packages/ui/package.json
{
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0"  // Supports both 18 and 19
  }
}
```

Now:
- Portfolio can use React 19.2.1
- Creative-powerup can use React 18.3.1
- Design-system works with both
- No conflicts, no forced upgrades

### When Adding New Packages

#### Adding a Shared Library

**Ask:** "Will this be consumed by multiple apps?"

If **YES**:
1. Use `peerDependencies` for peer packages (React, etc.)
2. Use version ranges: `"^18.0.0 || ^19.0.0"`
3. Add same packages to `devDependencies` for development
4. Only put true runtime dependencies in `dependencies`

**Example:** Adding a new @thesage/ui feature that uses React:
```json
{
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0"  // Consumer provides this
  },
  "devDependencies": {
    "react": "^18.3.1"  // For local development
  }
}
```

#### Adding an App Dependency

1. **Always use `^` ranges** for automatic updates:
   ```json
   {
     "dependencies": {
       "some-package": "^2.1.0"  // Not "2.1.0"
     }
   }
   ```

2. **Use workspace protocol** for internal packages:
   ```json
   {
     "dependencies": {
       "@thesage/ui": "workspace:^"
     }
   }
   ```

3. **Check peerDependency compatibility:**
   - If @thesage/ui requires React 18+, app must satisfy that
   - Run `pnpm install` to see peer dependency warnings

### Updating Dependencies

#### Updating Shared Libraries

When updating a shared library's supported versions:

1. **Check breaking changes** in the dependency's changelog
2. **Update peerDependencies range** if compatible:
   ```json
   {
     "peerDependencies": {
       "react": "^18.0.0 || ^19.0.0 || ^20.0.0"  // Add new version
     }
   }
   ```
3. **Test with all supported versions:**
   ```bash
   # Test with React 18
   pnpm install --filter @thesage/ui react@^18.3.1
   pnpm test --filter @thesage/ui

   # Test with React 19
   pnpm install --filter @thesage/ui react@^19.2.1
   pnpm test --filter @thesage/ui
   ```
4. **Update CHANGELOG.md** noting new version support
5. **Bump @thesage/ui version** (minor bump for new support)

#### Updating App Dependencies

```bash
# Update all dependencies to latest within ranges
pnpm update

# Update specific package to latest
pnpm update react --filter portfolio

# Update to specific version
pnpm add react@^19.2.1 --filter portfolio
```

### Checking for Outdated Dependencies

```bash
# See what updates are available
pnpm outdated

# Update interactively
pnpm update -i
```

### When to Use Exact Versions

**Rarely, but valid reasons:**
- Deployment lockfile (pnpm-lock.yaml handles this automatically)
- Known breaking bug in next version
- Waiting for ecosystem to catch up (e.g., types not updated yet)

**Document why:**
```json
{
  "dependencies": {
    "problematic-package": "2.1.0"  // TODO: Pinned due to bug in 2.2.0 (issue #123)
  }
}
```

### Best Practices Summary

✅ **Do:**
- Use `^` ranges for app dependencies
- Use flexible peerDependencies for shared libraries
- Use workspace protocol for internal packages
- Update regularly with `pnpm update`
- Test after dependency updates

❌ **Don't:**
- Use exact versions without good reason
- Lock shared libraries to specific peer versions
- Ignore peerDependency warnings
- Mix dependency and peerDependency for same package
- Forget to update lockfile after manual package.json changes

### Related Sections

- See **[Breaking Changes Protocol](#breaking-changes-protocol)** for handling major version bumps
- See **[Tech Stack](#tech-stack)** for current versions across the ecosystem

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
import { cn } from '@thesage/utils'
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

1. Check if the component belongs in the UI package instead
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
- Update `packages/ui/package.json` version:
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
- Add to `packages/ui/MIGRATION.md` (create if doesn't exist)
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
- **[apps/web/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md](apps/web/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md)** — Design system architecture, components, usage guide. Reference this for import paths and component APIs.
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
