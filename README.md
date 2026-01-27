# Shalom's Creative Ecosystem

> **How might we make products lovable by design?**

The purpose of this open source monorepo isn't just to answer this question; it's to provide a functional human-centered design philosophy that helps you build the answer for yourself. 

**Status:** Active Development
**License:** MIT
**Philosophy:** [Read DESIGN-PHILOSOPHY.md](DESIGN-PHILOSOPHY.md) — The North Star

---

## What This Is

This ecosystem expresses one unified vision through multiple products:

- **[Portfolio](https://www.shalomormsby.com/)** — My design philosophy in action. Currently being built from the ground-up entirely with Sage UI components.
- **[Sage Studio](https://thesage.dev/)** — Interactive documentation platform for the Sage UI. A comprehensive suite of functional components, patterns, and templates that optimize human and AI-assisted creativity. Purpose-built for solopreneurs who want to build digital products not only with speed but also with precise creative control. 
- **[Creative Powerup](https://ecosystem-creative-powerup.vercel.app/)** — Community platform and experiment gallery for purpose-driven innovators *(in development)*
- **[Sage Stocks](https://stocks.shalomormsby.com/)** — AI-powered investment intelligence that respects user agency *(migration pending)*
- **SageOS** — Personal operating system for creative work *(Currently a WiP. To apply as a beta tester, email Shalom.)*

**The unifying element:** A shared design system that embodies human-centered principles into every component, token, and interaction.

---

## Quick Start

```bash
# Clone and install
git clone https://github.com/shalomormsby/ecosystem.git
cd ecosystem
pnpm install

# Build design system and start portfolio
pnpm build
pnpm dev --filter portfolio

# Open http://localhost:3000
# Look for the Customizer button in the bottom-right corner
```

**First time here?** Read [AGENTS.md](AGENTS.md) for orientation (written for AI agents but useful for humans too).

---

## Core Philosophy

This ecosystem is built on four principles:

1. **Emotionally Resonant** — Touch hearts, not just solve problems. Design should delight.
2. **User Control & Freedom** — Users customize their experience. Motion intensity, themes, everything.
3. **Transparent by Design** — Show the receipts. Users see how things work, including AI collaboration.
4. **Generous by Design** — Open source, teachable, accessible. Code that teaches as it works.

[Read the full philosophy →](DESIGN-PHILOSOPHY.md)

---

## The Sage UI

The heart of this ecosystem. Every app imports from it. **Version 1.0 — Production Ready**

### Architecture

The design system organizes components by **functional purpose**, not abstract hierarchy. This eliminates classification ambiguity and aligns with modern design systems like shadcn/ui, Material UI, and Radix.

**48+ components across 7 functional categories:**

- **Actions** (3) — Interactive elements that trigger behaviors
  Button, Toggle, ToggleGroup

- **Forms** (11) — Input controls with validation
  Input, Select, Checkbox, Switch, Slider, Label, Textarea, RadioGroup, Form

- **Navigation** (6) — Moving through content hierarchy
  Breadcrumb, Tabs, Pagination, Command, MenuBar, NavigationMenu

- **Overlays** (9) — Contextual content above main UI
  Dialog, Sheet, Popover, Tooltip, Drawer, DropdownMenu, ContextMenu, HoverCard, AlertDialog

- **Feedback** (5) — System state communication
  Alert, Toast, Progress, Skeleton, Sonner

- **Data Display** (6) — Structured information presentation
  Table, DataTable, Card, Avatar, Badge, Calendar

- **Layout** (8) — Spatial organization
  Accordion, Carousel, ScrollArea, Separator, Sidebar, Collapsible, AspectRatio, Resizable

### Three Distinct Themes

Each theme has a unique personality and embodies different design values:

- **Studio** — Professional, balanced, modern (inspired by Framer/Vercel/Linear)
  - Cool blues and grays, clean sans-serif typography (Outfit, Manrope, Fira Code)
  - Smooth, professional motion curves

- **Sage** — Calm, organic, thoughtful
  - Warm earth tones, muted sage greens, terracotta accents
  - Serif headings (Lora), clean body text (Instrument Sans)
  - Slower, flowing motion curves

- **Volt** — Bold, electric, energetic
  - Electric blues, vibrant cyans, high contrast
  - Geometric sans-serif (Space Grotesk), technical mono (Fira Code)
  - Fast, snappy motion curves

All themes support both light and dark modes with WCAG AA contrast ratios.

### Token System

Design decisions as code, not locked in design tools:

- **Colors** — Semantic color system with foreground variants for proper light/dark mode support
- **Typography** — 10 size scales (xs-8xl), complete type presets (display, headings, body, caption)
- **Spacing** — 4px base grid with semantic aliases (xs-3xl)
- **Motion** — Duration presets and easing curves that scale with user preference
- **Syntax Highlighting** — 14 token types for automatic code highlighting (comment, keyword, function, string, number, boolean, operator, property, className, tag, attribute, variable, punctuation, plain)

### User-Controlled Motion System

Every animation respects user preference:
- **Motion intensity slider** (0-10 scale)
- **Automatic sync** with system `prefers-reduced-motion`
- **Zero animation** when disabled (instant state changes only)
- **Scaled durations** based on user preference and theme personality

### The Customizer

User control made tangible. A floating panel that gives users ownership of their experience:
- **Motion intensity** — 0-10 scale with system preference sync
- **Theme switching** — Studio, Sage, or Volt with distinct personalities
- **Color mode** — Light or dark mode

All preferences persist to localStorage and survive page reloads.

### Syntax Highlighting System

Built-in automatic syntax parser (~2KB) for beautiful code examples:
- **Zero configuration** — Just pass plain code strings
- **14 token types** — Comprehensive TypeScript/JavaScript/JSX tokenization
- **Theme-aware colors** — Adapts to light/dark mode with WCAG AA contrast
- **No dependencies** — Completely self-contained
- **CollapsibleCodeBlock component** — Full-featured code display with copy, collapse, and syntax highlighting

### Accessibility-First Design

- **WCAG AA compliance** — All color combinations meet 4.5:1 contrast minimum
- **Keyboard navigation** — Full support with visible focus indicators
- **Screen reader compatible** — Semantic HTML and proper ARIA attributes
- **Motion preferences** — Complete respect for reduced motion settings
- **Focus management** — Proper focus ring styling with CSS variables

### State Management

- **Zustand stores** with localStorage persistence
- **Theme state** — Current theme name and color mode
- **Customizer state** — Motion intensity, system preferences
- **Toast context** — Notification system with provider

### Hooks

Three custom React hooks for common patterns:
- **useTheme()** — Theme and mode control with toggle functions
- **useMotionPreference()** — Motion settings and system preference sync
- **useForm()** — Generic form state with validation and dirty tracking

### Technologies

- React 18/19 (peerDependency supports both)
- TypeScript 5 (strict mode)
- Tailwind CSS 3 (via CSS variables)
- Framer Motion 12 (all animations respect preferences)
- Zustand 5 (with localStorage persistence)
- tsup (ESM + CJS outputs for npm publishing)

### Interactive Documentation

The **Sage Studio** app ([apps/web](apps/web)) provides:
- **Component playground** with live prop controls
- **Token visualization** for all design tokens across themes
- **Code examples** with automatic syntax highlighting
- **LLM-optimized documentation** with JSON-LD structured data
- **Accessibility notes** for every component
- **GitHub source links** for transparency

Visit the live documentation at [https://thesage.dev/](https://thesage.dev/)

[Full Design System Documentation →](apps/web/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md)

---

## Project Structure

```
ecosystem/
├── apps/                      # Next.js applications
│   ├── portfolio/             # Proof of philosophy (production-ready)
│   ├── web/    # Interactive design system docs (production)
│   ├── creative-powerup/      # Experiment gallery (in development)
│   ├── sage-stocks/           # Migration pending
│   └── sageos/                # Future
├── packages/                  # Shared packages
│   ├── ui/                    # @thesage/ui - Component library
│   │   └── src/
│   │       ├── components/    # 48+ functionally-organized components
│   │       │   ├── actions/   # Button, Toggle, ToggleGroup
│   │       │   ├── forms/     # Input, Select, Checkbox, etc.
│   │       │   ├── navigation/# Breadcrumb, Tabs, Pagination, etc.
│   │       │   ├── overlays/  # Dialog, Sheet, Popover, etc.
│   │       │   ├── feedback/  # Alert, Toast, Progress, etc.
│   │       │   ├── data-display/  # Table, Card, Avatar, etc.
│   │       │   └── layout/    # Accordion, Carousel, Separator, etc.
│   │       ├── hooks/         # useTheme, useMotionPreference, useForm
│   │       ├── providers/     # ThemeProvider, ToastProvider
│   │       ├── features/      # Customizer (philosophy-embodying)
│   │       ├── lib/           # Store, utils, validation, animations
│   │       └── index.ts       # Main export barrel
│   ├── tokens/                # @thesage/tokens - Design decisions as code
│   │   ├── studio/            # Studio theme tokens
│   │   ├── sage/              # Sage theme tokens
│   │   ├── volt/              # Volt theme tokens
│   │   ├── base.ts            # Shared scales
│   │   └── index.ts           # Unified export
│   └── config/                # Shared Tailwind and TypeScript config
└── docs/                      # Guides and documentation
```

**Why functional organization?** Modern design systems organize by purpose (what components *do*), not abstract hierarchy. This approach eliminates classification debates and maps directly to developer workflows.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion 12 |
| State | Zustand 5 + localStorage |
| Monorepo | Turborepo + pnpm workspaces |
| Deployment | Vercel |

---

## Documentation

### Essential Reading

- **[DESIGN-PHILOSOPHY.md](DESIGN-PHILOSOPHY.md)** — The North Star. Read this first to understand *why* this exists.
- **[AGENTS.md](AGENTS.md)** — Comprehensive guide for AI agents (and humans) working on this codebase.
- **[CHANGELOG.md](CHANGELOG.md)** — What's been built, what's changed, and when.

### Reference Documentation

- **[SAGE_DESIGN_SYSTEM_STRATEGY.md](apps/web/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md)** — Design system architecture, components, tokens, and usage.
- **[apps/portfolio/README.md](apps/portfolio/README.md)** — Portfolio app setup and context.
- **[docs/mcp-setup.md](docs/mcp-setup.md)** — Configure MCP servers for AI coding assistants.

### For Contributors

If you're building here (human or AI):
1. Read [DESIGN-PHILOSOPHY.md](DESIGN-PHILOSOPHY.md) to understand the vision
2. Read [AGENTS.md](AGENTS.md) for technical setup, patterns, and conventions
3. Check [CHANGELOG.md](CHANGELOG.md) to see what's been done recently

---

## Key Features

### The Customizer

User control made tangible. A floating panel that lets users customize:
- **Motion intensity** (0-10, syncs with system preferences)
- **Theme** (Studio, Sage, or Volt)
- **Color mode** (Light or dark)

All preferences persist to localStorage. This isn't a settings panel hidden in a menu—it's a hero feature.

### Design Tokens

Visual properties defined in code, not locked in Figma. Colors, spacing, typography, motion—all exposed as importable JavaScript.

```typescript
import { spacing, typography } from '@thesage/tokens'
```

### Motion That Respects Users

Every animation checks `useMotionPreference()`. When motion = 0 or user has `prefers-reduced-motion`, animations are instant. No exceptions.

---

## Development

### Commands

```bash
# Development
pnpm dev                    # Start all apps
pnpm dev --filter portfolio # Start specific app

# Building
pnpm build                  # Build everything
pnpm build --filter <app>   # Build specific app

# Quality
pnpm lint                   # Lint all packages
pnpm typecheck              # Check TypeScript
```

### Prerequisites

- Node.js 20+
- pnpm 8.15.0+
- Git

[Full development setup →](AGENTS.md#dev-environment)

---

## Philosophy in Practice

This isn't aspirational—it's implemented:

- **Customizer** = User Control & Freedom in action
- **Design tokens** = Transparency (view source on any component)
- **Motion system** = Generous by Design (accessibility first)
- **Open source** = Generous by Design (anyone can learn from this)
- **AI Notes feature** *(planned)* = Transparency (document AI collaboration)

The work is the proof. Every component, every interaction, every line of code demonstrates that human-centered design can be baked into architecture, not just claimed in marketing.

---

## Status & Roadmap

**Production Ready (v1.0):**
- **Design system** — Complete with 27 components, 3 themes, comprehensive token system
- **Sage Studio** — Interactive documentation with LLM optimization (Phase 7 complete)
- **Portfolio app** — Living showcase with Customizer integration

**In Active Development:**
- **Creative Powerup** — Experiment gallery (9 live experiments: games, visualizations, animations, tools)
- **AI Notes component** — Transparency feature for documenting AI collaboration

**Planned:**
- **Sage Stocks migration** — Existing 15k LOC app to be integrated into monorepo
- **SageOS** — Personal operating system for creative work
- **Testing suite** — Vitest + Testing Library for comprehensive test coverage
- **Additional components** — Advanced layout patterns and compositions

[Full implementation status →](AGENTS.md#current-implementation-state)

---

## License

MIT © Shalom Ormsby

---

## Connect

Building something human-centered? Learning from this codebase? Have questions?

Open an issue or start a discussion. This is **Generous by Design**—the code teaches as it works.

---

**Remember:** The best documentation is working code that makes people feel seen, capable, and empowered.
