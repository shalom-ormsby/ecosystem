# Shalom's Creative Ecosystem

> **Building digital experiences that make people feel seen, capable, and empowered.**

A monorepo of human-centered products unified by a shared design philosophy. This isn't just code—it's a demonstration that software can be **transparent**, **emotionally resonant**, **user-controlled**, and **generous** by design.

**Status:** Active Development
**License:** MIT
**Philosophy:** [Read DESIGN-PHILOSOPHY.md](DESIGN-PHILOSOPHY.md) — The North Star

---

## What This Is

This ecosystem expresses one unified vision through multiple products:

- **Portfolio** — The proof of philosophy. A living showcase of human-centered design with the Customizer as its centerpiece.
- **Sage Stocks** — AI-powered investment intelligence that respects user agency *(planned)*
- **Creative Powerup** — Community platform for purpose-driven innovators *(planned)*
- **SageOS** — Personal operating system for creative work *(future)*

**The unifying element:** A shared design system that encodes human-centered principles into every component, token, and interaction.

---

## Quick Start

```bash
# Clone and install
git clone https://github.com/shalom-ormsby/ecosystem.git
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

1. **Transparent by Design** — Show the receipts. Users see how things work, including AI collaboration.
2. **Emotionally Resonant** — Touch hearts, not just solve problems. Design should delight.
3. **User Control & Freedom** — Users customize their experience. Motion intensity, themes, everything.
4. **Generous by Design** — Open source, teachable, accessible. Code that teaches as it works.

[Read the full philosophy →](DESIGN-PHILOSOPHY.md)

---

## The Design System

The heart of this ecosystem. Every app imports from it.

**What makes it different:**
- Three distinct themes (Studio, Sage, Volt) with unique personalities
- User-controlled motion system (0-10 scale, respects `prefers-reduced-motion`)
- Built-in Customizer for runtime theme/motion adjustments
- Zustand + localStorage for persistent preferences
- WCAG AA accessible by default

**Technologies:** React 18/19, TypeScript, Tailwind CSS, Framer Motion, Zustand

[Design System Documentation →](design-system/README.md)

---

## Project Structure

```
ecosystem/
├── apps/               # Next.js 16 applications
│   ├── portfolio/      # Active development
│   ├── sage-stocks/    # Scaffold
│   └── creative-powerup/
├── design-system/      # The heart (at root, not in packages/)
│   ├── tokens/         # Design decisions as code
│   ├── atoms/          # Button, Card, Motion
│   ├── hooks/          # useTheme, useMotionPreference
│   ├── features/       # Customizer (philosophy-embodying)
│   └── providers/      # ThemeProvider
├── docs/               # Guides and documentation
└── packages/           # Shared config and utilities
```

**Why design-system at root?** It signals importance and is structured for npm publishing from day one.

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

- **[design-system/README.md](design-system/README.md)** — Design system architecture, components, tokens, and usage.
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
- **X-Ray Mode** *(planned)*

All preferences persist to localStorage. This isn't a settings panel hidden in a menu—it's a hero feature.

### Design Tokens

Visual properties defined in code, not locked in Figma. Colors, spacing, typography, motion—all exposed as importable JavaScript.

```typescript
import { spacing, typography } from '@ecosystem/design-system/tokens'
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

**Currently implemented:**
- Design system (tokens, atoms, Customizer, themes)
- Portfolio app (active development)
- Motion preference system
- Theme switching with persistence

**In development:**
- X-Ray Mode (toggle exists, UI overlay pending)

**Planned:**
- AI Notes component
- Molecules and patterns
- Sage Stocks app
- Creative Powerup app
- Testing suite (Vitest + Testing Library)
- Storybook documentation

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
