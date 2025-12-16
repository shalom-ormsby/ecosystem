# AGENTS.md

> **For AI coding agents working on this ecosystem. Read `DESIGN-PHILOSOPHY.md` first—it's the North Star. This file tells you how to build in alignment with it.**

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

## File Organization Rules

**AI agents: Read this carefully.** Disorganized file placement is one of the fastest ways to erode a codebase. Follow these rules strictly.

### Where New Files Go

| If you're creating... | Put it in... |
|----------------------|--------------|
| Shared component (used by 2+ apps) | `design-system/` at appropriate atomic level |
| App-specific component | `apps/<app>/components/` |
| Shared utility function | `packages/utils/` |
| App-specific utility | `apps/<app>/lib/` or `apps/<app>/utils/` |
| Design tokens | `design-system/tokens/` |
| Documentation | `docs/` (only if it serves multiple apps) |
| App-specific docs | `apps/<app>/README.md` or `apps/<app>/docs/` |

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

---

## Before You Write Code

### 1. Read the Philosophy

Open `DESIGN-PHILOSOPHY.md` and internalize the four principles:
- **Transparent by Design** — Show the receipts
- **Emotionally Resonant** — Touch hearts, not just solve problems
- **User Control & Freedom** — The user controls their experience
- **Generous by Design** — Open source, teachable, accessible

### 2. Ask the Decision Questions

Before implementing anything:
1. Does this embody one of the four principles?
2. Does this serve the human, or the system?
3. Would this make someone feel more capable, or more confused?
4. Can I explain *why* this matters, not just *what* it does?
5. Am I showing my work, or hiding it?

### 3. When Principles Conflict

Sometimes User Control (many options) tensions against Emotional Resonance (simplicity). The tiebreaker is always:
- What would **delight** the human?
- What would **create joy**?
- What would **expand their degrees of freedom**?

The answer that best serves the human wins.

---

## Dev Environment

### Prerequisites

- Node.js 20+
- pnpm 8+ (not npm or yarn)
- Git

### Setup

```bash
# Clone the repo
git clone https://github.com/shalom-ormsby/ecosystem.git
cd ecosystem

# Install dependencies
pnpm install

# Start development (all apps)
pnpm dev

# Start specific app
pnpm dev --filter portfolio
pnpm dev --filter sage-stocks
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

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Package Manager | pnpm |
| Monorepo | Turborepo |
| Deployment | Vercel |

### TypeScript Conventions

- Strict mode enabled
- Prefer `interface` over `type` for object shapes
- Use explicit return types on exported functions
- Avoid `any`—use `unknown` and narrow

### Tailwind Conventions

- Use design tokens from `design-system/tokens/`
- Prefer semantic class names via `@apply` in component styles
- Motion utilities respect `prefers-reduced-motion`

---

## Design System Usage

The design system is the **heart** of this ecosystem. Every app imports from it.

### Importing Components

```typescript
// From any app
import { Button } from '@ecosystem/design-system/atoms'
import { Card } from '@ecosystem/design-system/molecules'
import { Customizer } from '@ecosystem/design-system/features'
```

### Design Tokens

Tokens are the single source of truth for visual properties:

```typescript
// design-system/tokens/colors.ts
export const colors = {
  primary: { ... },
  neutral: { ... },
  semantic: { ... }
}

// design-system/tokens/spacing.ts
export const spacing = { ... }

// design-system/tokens/typography.ts
export const typography = { ... }
```

### Flagship Features

Three features embody the philosophy and should be used across all apps:

1. **Customizer** — User control made tangible
   - Motion slider (0-100, respects `prefers-reduced-motion`)
   - Theme toggle (light/dark/system)
   - Typography options
   
2. **X-Ray Mode** — Transparency made interactive
   - Reveals design tokens in use
   - Shows component boundaries
   - Displays AI collaboration notes

3. **AI Notes** — Collaboration made visible
   - Documents AI involvement in building features
   - Shows decision rationale
   - "Shows the receipts"

---

## Accessibility Requirements

**These are non-negotiable.** From `DESIGN-PHILOSOPHY.md`:

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

This ecosystem supports AI coding assistants via Model Context Protocol. See `docs/mcp-setup.md` for full configuration.

### Available MCP Servers

The `.mcp.json` at repo root configures:
- **Figma MCP** — Access to design files and tokens
- **Additional servers** — See `docs/mcp-setup.md` for current list

### For AI Agents

When working with this codebase:
1. Check if relevant MCP servers are available
2. Use Figma MCP to reference design specs when implementing UI
3. Document any AI collaboration in component comments or AI Notes

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

## Testing

### Philosophy

Test behavior, not implementation. Ask: "What should this do for the user?"

### Structure

```typescript
describe('ComponentName', () => {
  describe('when [condition]', () => {
    it('should [expected behavior]', () => {
      // Arrange
      // Act
      // Assert
    })
  })
})
```

### Accessibility Testing

Use `jest-axe` for automated accessibility checks:

```typescript
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

it('should have no accessibility violations', async () => {
  const { container } = render(<Component />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

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

## AI Collaboration Guidelines

You're a partner in a creative process, not a code generator. From `DESIGN-PHILOSOPHY.md`:

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

Refer to the decision framework in `DESIGN-PHILOSOPHY.md`:

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

- `DESIGN-PHILOSOPHY.md` — **Read this first.** The North Star.
- `README.md` — Project overview for humans
- `docs/mcp-setup.md` — MCP server configuration
- `apps/[app]/README.md` — App-specific documentation
- `design-system/README.md` — Design system usage guide
- `.mcp.json` — MCP server configuration
- `turbo.json` — Turborepo task configuration
- `pnpm-workspace.yaml` — Workspace package definitions

---

**Remember:** The work is the proof. Every line of code should demonstrate that human-centered design must be demonstrated through architecture, process, and results, not just claimed. Build things that make people feel seen, capable, and empowered.
