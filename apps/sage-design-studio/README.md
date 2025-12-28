# Sage Design Studio

> **The heart of the ecosystem.** Interactive documentation and visualization platform for the ecosystem's design system.

## Overview

Sage Design Studio is a living, interactive showcase of the design system that powers the entire ecosystem. It embodies the "Transparent by Design" philosophy by making design tokens, components, and design decisions publicly explorable—not as static documentation, but as dynamic, interactive experiences.

## Features

- **Interactive Component Playground**: Explore components with live prop controls
- **Token Visualization**: See all design tokens (colors, typography, spacing, motion) across three themes
- **Theme Switching**: Preview components in Studio, Sage, and Volt themes
- **Code Snippets**: Copy-paste ready code for every component
- **Responsive Design**: Works beautifully on mobile, tablet, and desktop

## Development

### Running Locally

```bash
# From ecosystem root
pnpm dev

# Or specifically for this app
cd apps/sage-design-studio
pnpm dev
```

The Studio runs on **port 3001** by default.

### Accessing via Portfolio

When the portfolio app is running, the Studio is accessible at:
- `http://localhost:3000/studio` (proxied from portfolio)

Or directly at:
- `http://localhost:3001` (direct access to Studio app)

## Architecture

### Integration with Portfolio

The portfolio app (`apps/portfolio`) proxies the `/studio` route to this app via Next.js rewrites. This allows seamless integration while keeping the apps independent.

**In development:**
- Portfolio: `http://localhost:3000`
- Studio: `http://localhost:3001`
- Route: `/studio` on portfolio → proxied to Studio app

**In production:**
- Set `STUDIO_URL` environment variable in portfolio to point to deployed Studio app
- Or deploy both apps on the same domain with routing configuration

### Design System Integration

The Studio imports components and tokens directly from `@ecosystem/design-system`:

```typescript
import { Button, Card, Header } from '@ecosystem/design-system';
import { useTheme, useMotionPreference } from '@ecosystem/design-system/hooks';
import { CustomizerPanel } from '@ecosystem/design-system/features/customizer';
```

**Key Benefit**: Changes to the design system automatically reflect in the Studio thanks to the `workspace:*` protocol.

## Structure

```
app/
├── components/
│   ├── studio/
│   │   ├── StudioHero.tsx          # Landing section
│   │   ├── SectionNav.tsx          # Navigation tabs
│   │   ├── OverviewSection.tsx     # Philosophy & features
│   │   ├── TokensSection/          # Token visualization
│   │   │   ├── ColorsTab.tsx
│   │   │   └── TypographyTab.tsx
│   │   └── ComponentsSection/      # Component playground
│   │       ├── ComponentPlayground.tsx
│   │       └── CodeSnippet.tsx
│   └── lib/
│       └── component-registry.ts   # Component metadata
├── globals.css
├── layout.tsx
└── page.tsx
```

## Adding New Components

To add a new component to the playground:

1. **Register it** in `app/components/lib/component-registry.ts`:

```typescript
export const componentRegistry: Record<string, ComponentConfig> = {
  // ... existing components

  YourComponent: {
    component: YourComponent,
    description: 'Description of what this component does',
    props: {
      propName: {
        type: 'select', // or 'boolean' | 'text'
        options: ['option1', 'option2'],
        default: 'option1',
        description: 'What this prop controls',
      },
    },
    examples: [
      { label: 'Default', props: { propName: 'option1' } },
    ],
  },
};
```

2. **It will automatically appear** in the Components section!

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Components**: `@ecosystem/design-system`
- **State**: React hooks + design system's Zustand stores
- **Code Highlighting**: Shiki (planned for Phase 2)

## Roadmap

### Phase 1 (MVP) ✅
- Landing section with GitHub CTA
- Overview section (philosophy, themes, features)
- Tokens visualization (colors, typography)
- Component playground (Button, Card, Header)
- Theme switching
- Basic code snippets

### Phase 2 (Enhancement)
- Spacing & motion token tabs
- Syntax highlighting for code snippets (Shiki)
- More components (Link, Motion)
- Search/filter functionality
- Responsive preview modes

### Phase 3 (Expansion)
- Brand guidelines section
- Product design resources
- Template downloads
- Figma integration

### Phase 4 (Productization)
- Premium templates
- Design kits
- Community contributions
- Licensing options

## Related Documentation

- [Strategic Vision](../../design-system/docs/SAGE-DESIGN-STUDIO.md) - Comprehensive strategy doc
- [Design System README](../../design-system/README.md) - Design system documentation
- [Design Philosophy](/DESIGN-PHILOSOPHY.md) - Core principles

---

**Built with ❤️ as part of the ecosystem**
