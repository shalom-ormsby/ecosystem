# Claude Context for Shalom's Creative Ecosystem

> **Context file for AI assistants (primarily Claude) working on this design ecosystem. Read this first, then [DESIGN-PHILOSOPHY.md](../DESIGN-PHILOSOPHY.md) and [AGENTS.md](../AGENTS.md).**

Last updated: 2026-01-23

---

## Quick Orientation

You're working on **Shalom's Creative Ecosystem** - a monorepo demonstrating that human-centered design can be proven through architecture, not just claimed. This isn't just another design system; it's a philosophy embodied in code.

**The North Star:** Lovable by Design - Create products that empower people and bring joy.

**Your Role:** Partner in creative work. You execute within the vision Shalom defines. Ask questions, propose options, challenge assumptions, but never make unilateral architectural decisions.

---

## Critical Context from Our Work Together

### Recent Achievements (What We've Built)

1. **Phase 4 Complete (Jan 2026):** Successfully migrated from `@ecosystem/design-system` to `@thesage/ui` with functional organization
   - 44+ components migrated to functional categories (actions, forms, navigation, overlays, feedback, data-display, layout)
   - Zero breaking changes across 3 applications
   - Subpath exports configured (`@thesage/ui/hooks`, `@thesage/ui/utils`, `@thesage/ui/providers`)
   - Complete TypeScript declaration support

2. **Design System (v1.0 - Production Ready):**
   - 48+ components functionally organized
   - 3 complete themes (Studio, Sage, Volt) with light/dark modes
   - User-controlled motion system (0-10 scale respecting prefers-reduced-motion)
   - Comprehensive token system (colors, typography, spacing, motion, syntax)
   - The Customizer - philosophy-embodying feature for user control

3. **Applications:**
   - **Portfolio** (production) - Proof of philosophy with Customizer integration
   - **Sage Design Engine** (production) - Interactive docs with LLM optimization, JSON-LD metadata
   - **Creative Powerup** (in development) - Experiment gallery and community platform

### Architecture Patterns We've Established

**Functional Organization (NOT Atomic Design):**
- Components organized by what they *do*, not abstract hierarchy
- Categories: actions, forms, navigation, overlays, feedback, data-display, layout, features
- This eliminates classification debates and aligns with industry standards (shadcn/ui, Material UI, Radix)

**Multi-Theme System:**
- Runtime theme switching via CSS variables (not Tailwind JIT)
- Three distinct themes, each with unique personality:
  - **Studio** (🏢): Professional, balanced (Framer/Vercel/Linear aesthetic)
  - **Terra** (🌿): Calm, organic, warm earth tones
  - **Volt** (⚡): Bold, electric, cyberpunk neon
- ThemeProvider injects CSS variables, Zustand manages state with localStorage persistence

**Motion System:**
- Every animation respects `useMotionPreference()` hook
- Intensity 0 = instant state changes (no animation)
- Theme-specific durations and easing curves
- Syncs with system `prefers-reduced-motion`

**State Management:**
- Zustand for client-side state (theme, customizer, user preferences)
- LocalStorage persistence for user settings
- React Server Components + fetch for server data

---

## Essential Files (Read These First)

1. **[DESIGN-PHILOSOPHY.md](../DESIGN-PHILOSOPHY.md)** - THE NORTH STAR. Read this before writing any code. Contains the four principles: Emotionally Resonant, User Control & Freedom, Transparent by Design, Generous by Design.

2. **[AGENTS.md](../AGENTS.md)** - Comprehensive technical guide. File organization, coding standards, workflows, dev environment setup, troubleshooting. Your primary technical reference.

3. **[.agent/workflows/register-new-component.md](../.agent/workflows/register-new-component.md)** - Step-by-step workflow for adding components to @thesage/ui and registering them in Sage Studio. **Follow this workflow whenever creating a new component.**

4. **[CHANGELOG.md](../CHANGELOG.md)** - Recent work history. Check this to understand what's been done before starting new work.

5. **[README.md](../README.md)** - Project overview, tech stack, quick start guide.

---

## Critical Workflows

### When Creating a New Component

**ALWAYS follow:** [.agent/workflows/register-new-component.md](../.agent/workflows/register-new-component.md)

Summary:
1. Create in `packages/ui/src/components/[category]/ComponentName.tsx` (use functional category)
2. Export from category index: `packages/ui/src/components/[category]/index.ts`
3. Export from main entry: `packages/ui/src/index.ts`
4. Build library: `pnpm build --filter @thesage/ui`
5. Register in Studio: Create page, add to section router, sidebar navigation, search index
6. Verify build: `pnpm build --filter @ecosystem/web`

**Do not skip steps.** Incomplete registration = component not discoverable in Studio.

### When Making Breaking Changes

**STOP and discuss with Shalom first.** Follow [Breaking Changes Protocol](../AGENTS.md#breaking-changes-protocol):
1. Search for all usages across ecosystem
2. Get explicit approval
3. Version bump (major for breaking)
4. Update CHANGELOG.md with BREAKING CHANGES section and migration guide
5. Update all consuming apps in same commit
6. Test all apps build successfully

**Prefer deprecation over immediate breaking changes** - give users (future external users) time to migrate.

---

## File Organization Rules (STRICT)

From [AGENTS.md - File Organization Rules](../AGENTS.md#file-organization-rules):

| If you're creating... | Put it in... |
|----------------------|--------------|
| Shared component (2+ apps) | `packages/ui/src/components/[category]/` |
| App-specific component | `apps/<app>/components/` |
| Shared hook | `packages/ui/src/hooks/` |
| App-specific hook | `apps/<app>/hooks/` |
| Design tokens | `packages/tokens/src/` |
| Shared utility | `packages/ui/src/lib/` |
| App-specific utility | `apps/<app>/lib/` |

**Functional Categories:**
- **actions/** - Triggers behavior (Button, Toggle)
- **forms/** - Collects data (Input, Select, Switch, SearchBar)
- **navigation/** - Moves through content (Tabs, Breadcrumb, Pagination)
- **overlays/** - Contextual content (Dialog, Tooltip, Popover)
- **feedback/** - System state (Alert, Toast, Progress)
- **data-display/** - Presents information (Card, Table, Badge)
- **layout/** - Spatial organization (Accordion, Separator, Stack)
- **features/** - Complex philosophy-embodying features (Customizer, AI Notes)

**When uncertain:** Choose based on component's **primary purpose**. Ask if still unclear.

---

## Import Patterns (Current Best Practices)

**Main exports (most common):**
```typescript
import { Button, Card, useTheme, CustomizerPanel } from '@thesage/ui'
import { spacing, typography } from '@thesage/tokens'
```

**Subpath exports (for explicit paths):**
```typescript
import { useMotionPreference, useTheme } from '@thesage/ui/hooks'
import { ThemeProvider } from '@thesage/ui/providers'
import { cn, parseCode } from '@thesage/ui/utils'
import { spacing } from '@thesage/ui/tokens' // Re-exported from @thesage/tokens
```

**Never use these (legacy):**
```typescript
// ❌ OLD - Don't use
import { Button } from '@thesage/ui/atoms'
import { Card } from '@ecosystem/design-system'
```

---

## Key Patterns & Conventions

### Motion Must Respect Preferences

```typescript
// ✅ ALWAYS check motion preference
import { useMotionPreference } from '@thesage/ui/hooks'

function AnimatedComponent() {
  const { shouldAnimate, scale } = useMotionPreference()

  return (
    <motion.div
      animate={{ opacity: 1, y: shouldAnimate ? 20 : 0 }}
      transition={{ duration: shouldAnimate ? 0.3 : 0 }}
    >
      {/* content */}
    </motion.div>
  )
}
```

**Never animate without checking preferences.** Intensity 0 must work perfectly.

### Use Design System Components First

**Rule:** ALWAYS search for existing @thesage/ui components before writing custom JSX or CSS.

```typescript
// ✅ GOOD - Use design system component
import { Card, Button } from '@thesage/ui'

// ❌ BAD - Custom implementation
<div className="rounded-lg border bg-card p-6">
```

**If component doesn't exist:** Mention to user and offer to create it in @thesage/ui. Don't hack together one-off solutions in app layer.

### CSS Variables Over Hardcoded Colors

```typescript
// ✅ GOOD - Theme-aware
className="bg-background text-foreground border-border"
style={{ color: 'var(--color-primary)' }}

// ❌ BAD - Hardcoded colors
className="bg-white text-black border-gray-200"
className="bg-neutral-100" // Even Tailwind neutrals
```

**All styling must respect active theme.** No hardcoded colors except in theme token definitions.

---

## Common Gotchas (Learn From Our Mistakes)

### 1. Syntax Errors in Configuration Files
**Mistake:** Extra closing brackets in large config objects (like `navigation-tree.tsx`) broke builds.

**Fix:** Double-check bracket matching. Use linter. Verify diff before committing. Don't rush file edits.

### 2. Prop Hallucination
**Mistake:** Assuming components accept props like `className` without verification.

**Fix:** Read component definition to confirm available props. Check `ComponentName.types.ts` or component file.

### 3. Black Shader Previews (The "Unified Path" Fix)
**Context:** For shader/WebGL components with animation controls.

**Mistake:** Branching logic in GLSL (e.g., `if (uUseAnimation > 0.5)`) caused black screens.

**Fix:** Unify code path - always run animation logic, but control from JavaScript (e.g., set `uProgress` to `1.0` immediately to skip effect). Ensures shader always executes proven, active code path.

### 4. Tailwind Not Processing Files
**Mistake:** Content paths in `tailwind.config.ts` pointed to non-existent directories after restructure.

**Fix:** Update content paths to match actual file structure. Don't use `./src/**/*` if files are in `./app/**/*`.

---

## Build & Development Commands

```bash
# Start development
pnpm dev --filter portfolio           # Start portfolio app
pnpm dev --filter web  # Start Studio app

# Build packages and apps
pnpm build                            # Build everything (design system first, then apps)
pnpm build --filter @thesage/ui          # Build design system only
pnpm build --filter portfolio         # Build specific app

# Quality checks
pnpm lint                             # Lint all
pnpm typecheck                        # Check TypeScript

# Clear caches if seeing stale builds
rm -rf .turbo packages/ui/dist apps/*/.next && pnpm build
```

**Build order:** Turborepo automatically builds @thesage/ui before apps (dependency-aware).

---

## When to Use Which Tool

**Explore Tool (Task with subagent_type=Explore):**
- Open-ended codebase exploration ("Where are errors handled?")
- Understanding project structure
- Finding patterns across multiple files
- NOT for finding specific file/class/function (use Glob/Grep for those)

**Direct Read/Glob/Grep:**
- Reading specific known files
- Finding specific class definitions ("class Foo")
- Searching within 2-3 specific files
- Quick lookups

**EnterPlanMode:**
- Non-trivial implementation tasks (new features, refactors, multi-file changes)
- When multiple approaches are possible
- When user preferences matter
- Skip for simple tasks (typos, small fixes, explicit instructions)

---

## Accessibility Requirements (Non-Negotiable)

From [DESIGN-PHILOSOPHY.md](../DESIGN-PHILOSOPHY.md):

> Accessibility is not optional. Motion = 0 must work perfectly. High contrast modes must be first-class. Users who need accommodations get excellent experiences, not degraded ones.

**Checklist for every component:**
- ✅ Works with `prefers-reduced-motion: reduce`
- ✅ Keyboard navigable (tab order, focus indicators)
- ✅ Screen reader compatible (semantic HTML, ARIA)
- ✅ Color contrast meets WCAG AA (4.5:1 for text)
- ✅ Interactive elements have visible focus states
- ✅ No information conveyed by color alone

**Testing:** Manual testing required. Automated testing suite planned but not yet implemented.

---

## Changelog Maintenance (Required)

**Every significant change must be logged in [CHANGELOG.md](../CHANGELOG.md).**

Format:
```markdown
## 2026-01-23T14:32:00Z

- Added [specific thing]
- Updated [specific thing]
- Fixed [specific thing]
  - Additional context if needed
  - Breaking changes clearly marked
```

**What counts as significant:**
- New components or features
- Breaking changes to APIs
- New documentation files
- Architectural decisions
- Dependency updates affecting behavior
- User-facing bug fixes

**What doesn't need an entry:**
- Typo fixes
- Code formatting
- Internal refactors with no behavior change
- WIP commits (log when complete)

**Always update the "Last updated" timestamp at the top of CHANGELOG.md.**

---

## Tech Stack (Current)

| Layer | Technology | Notes |
|-------|------------|-------|
| Framework | Next.js 16 (App Router) | React Server Components, streaming |
| React | React 19.2.1 | Latest features, peerDep supports 18+ |
| Language | TypeScript 5 | Strict mode enabled |
| Styling | Tailwind CSS 3 | Via CSS variables from design system |
| Animation | Framer Motion 12 | Respects motion preferences |
| State | Zustand 5 | With localStorage persistence |
| Package Manager | pnpm 8.15.0+ | Workspace support required |
| Monorepo | Turborepo | Task orchestration, caching |
| Build | tsup 8.5.1 | For @thesage/ui package (ESM + CJS) |
| Deployment | Vercel | Next.js optimized |

**Testing:** Vitest + Testing Library configured in `packages/ui`. 63 tests across 10 test files. Tests run in CI on every PR via `.github/workflows/ci.yml`.

---

## Git Conventions

**Commit messages:**
```
type(scope): description

[optional body]

[optional footer]
```

**Types:** feat, fix, docs, style, refactor, test, chore

**Example:**
```
feat(design-system): add CollapsibleCodeBlock with syntax highlighting

Implements automatic tokenization for TypeScript/JavaScript/JSX
with 14 token types and theme-aware colors.

Closes #42
```

**Branch naming:** `type/brief-description` (e.g., `feat/motion-slider`, `fix/button-focus`)

---

## What Makes This Project Unique

1. **Philosophy as Architecture:** The four principles aren't aspirational—they're implemented. The Customizer embodies User Control. Open source embodies Generous Design. AI Notes (planned) embody Transparency.

2. **Functional Organization:** Not Atomic Design. Components organized by purpose (what they do), eliminating classification debates.

3. **User-Controlled Motion:** Not just respecting prefers-reduced-motion, but giving users a 0-10 scale. Intensity 0 must work perfectly.

4. **Multi-Theme Runtime Switching:** CSS variables enable theme changes without recompilation. Each theme has distinct personality (Studio = professional, Sage = organic, Volt = electric).

5. **AI Collaboration Transparency:** This project is built WITH AI (Claude, Gemini, Goose, Notion AI) but the human (Shalom) remains central. Collaboration is transparent and documented.

---

## Decision Framework (When Uncertain)

From [DESIGN-PHILOSOPHY.md](../DESIGN-PHILOSOPHY.md):

**Priority order:**
1. **Functional** - It must work
2. **Honest** - It must be true to what it claims
3. **Lovable** - It should delight
4. **Perfect** - Polish comes last

**When you're unsure, ask:**
1. Does this embody one of the four principles?
2. Does this serve the human, or the system?
3. Would this make someone feel more capable, or more confused?
4. Can I explain *why* this matters, not just *what* it does?

**When principles conflict:** What would delight the human, create joy, or expand their degrees of freedom?

**Ship working over perfect. One excellent thing over three mediocre things.**

---

## What NOT to Do

❌ **Don't:**
- Make major architectural decisions without discussing with Shalom
- Skip accessibility requirements (motion = 0 must work)
- Ignore design system in favor of one-off solutions
- Optimize prematurely
- Create new markdown files unless explicitly requested
- Use atomic design terminology (atoms/molecules/organisms)
- Hardcode colors instead of using CSS variables
- Add animations without checking motion preferences
- Create one-off utilities—consolidate into existing modules
- Over-engineer—only make changes directly requested or clearly necessary

✅ **Do:**
- Ask clarifying questions when intent is unclear
- Actively seek out and challenge assumptions
- Propose options, don't make unilateral decisions
- Be honest about tradeoffs
- Ship working prototypes over perfect abstractions
- Document AI involvement (future: via AI Notes component)
- Follow the register-new-component workflow religiously
- Update CHANGELOG.md for significant changes
- Use design system components first, always

---

## Troubleshooting Quick Reference

**Build fails with "Cannot find module @thesage/ui":**
```bash
pnpm build --filter @thesage/ui
```

**Stale cache issues:**
```bash
rm -rf .turbo packages/ui/dist apps/*/.next
pnpm build
```

**pnpm install fails:**
```bash
pnpm store prune
rm -rf node_modules
pnpm install
```

**TypeScript errors after pulling:**
```bash
pnpm typecheck
pnpm build --filter @thesage/ui  # Regenerate type definitions
```

**Full troubleshooting guide:** [The Studio Troubleshooting Guide](https://thesage.dev/#adding-components/troubleshooting)

---

## Related Documentation

- **[DESIGN-PHILOSOPHY.md](../DESIGN-PHILOSOPHY.md)** - The North Star (read first)
- **[AGENTS.md](../AGENTS.md)** - Comprehensive technical guide (read second)
- **[.agent/workflows/register-new-component.md](../.agent/workflows/register-new-component.md)** - Component registration workflow
- **[README.md](../README.md)** - Project overview
- **[CHANGELOG.md](../CHANGELOG.md)** - Work history
- **[apps/web/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md](../apps/web/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md)** - Design system architecture and usage

---

## Quick Links

**Live Sites:**
- Portfolio: https://www.shalomormsby.com/
- Sage Studio: https://thesage.dev/
- Creative Powerup: https://ecosystem-creative-powerup.vercel.app/

**Development:**
- Portfolio: http://localhost:3000
- Sage Design Engine: http://localhost:3001 (or next available port)

---

## Remember

**You're not just writing code. You're embodying a philosophy.**

Every component should make users feel:
- **Seen** - The interface understands their needs
- **Capable** - They have control and agency
- **Empowered** - They can customize and adapt

**The work is the proof.** This project demonstrates that human-centered design can be baked into architecture, process, and results—not just claimed in marketing.

**When in doubt:** Ask Shalom. You're a partner in creative work, not a code generator.

---

**Last major update:** Phase 4 Complete (Jan 2026) - Legacy migration finished, 44+ components in functional organization, zero breaking changes.

**Current focus:** Phase 5 planning - Assemblies & Templates (composed components and full-page layouts).
