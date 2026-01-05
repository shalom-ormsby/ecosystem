# Sage Design Studio

> **The heart of the ecosystem.** Interactive documentation and visualization platform for the ecosystem's design system.

## Overview

Sage Design Studio is a living, interactive showcase of the design system that powers the entire ecosystem. It embodies the "Transparent by Design" philosophy by making design tokens, components, and design decisions publicly explorable—not as static documentation, but as dynamic, interactive experiences.

## Features

- **Interactive Component Playground**: Explore components with live prop controls
- **Token Visualization**: See all design tokens (colors, typography, spacing, motion) across three themes
- **Theme Switching**: Preview components in Studio, Sage, and Volt themes
- **Automatic Syntax Highlighting**: Multi-color code examples powered by a built-in lightweight parser (~2KB)
- **Copy-Paste Ready Code**: Every code example includes syntax highlighting and one-click copying
- **Responsive Design**: Works beautifully on mobile, tablet, and desktop
- **LLM-Optimized Documentation**: JSON-LD structured data for AI-powered documentation consumption
- **Accessibility-First**: Comprehensive accessibility notes for every component

### Syntax Highlighting

The Studio uses the design system's automatic syntax parser to provide beautiful, theme-aware code highlighting throughout the documentation. Every code example is automatically tokenized into 14 syntax types with colors that adapt to light/dark mode.

**What makes it special:**
- Zero configuration - just pass plain code strings
- Lightweight (~2KB) regex-based implementation
- 14 token types: comment, keyword, function, string, number, boolean, operator, property, className, tag, attribute, variable, punctuation, plain
- WCAG AA contrast ratios in both light and dark modes
- Based on VS Code Dark+ theme colors

See the **Design Tokens > Syntax** section for live examples and documentation.

### LLM Optimization

The Studio embeds **JSON-LD structured data** using Schema.org vocabulary to make component documentation machine-readable for LLMs and search engines:

**What makes it special:**
- Automatic metadata generation for all Atoms and Molecules
- Schema.org `SoftwareSourceCode` and `PropertyValueSpecification` types
- Dynamic updates when switching between components
- Includes props, types, defaults, code examples, and accessibility notes
- No API endpoint needed—LLMs can parse metadata directly from page source

**Benefits:**
- LLMs can generate correct component usage without reading source code
- Search engines can index and display rich component information
- AI coding assistants understand component APIs instantly
- Supports semantic web and linked data standards

See [PHASE-7-COMPLETION.md](./docs/PHASE-7-COMPLETION.md) for implementation details.

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
│   │   ├── StudioHero.tsx              # Landing section
│   │   ├── SectionNav.tsx              # Navigation tabs
│   │   ├── OverviewSection.tsx         # Philosophy & features
│   │   ├── TokensSection/              # Token visualization
│   │   │   ├── ColorsTab.tsx
│   │   │   └── TypographyTab.tsx
│   │   └── ComponentsSection/          # Component playground
│   │       ├── ComponentPlayground.tsx
│   │       └── CodeSnippet.tsx
│   ├── lib/
│   │   ├── component-registry.ts       # Atom metadata
│   │   └── molecule-registry.ts        # Molecule metadata
│   └── JsonLdMetadata.tsx              # JSON-LD injection component
├── lib/
│   └── metadata-generator.ts           # LLM metadata utilities
├── globals.css
├── layout.tsx
└── page.tsx
```

## Adding New Components

To add a new component to the playground:

1. **Register it** in `app/components/lib/component-registry.ts` (Atoms) or `molecule-registry.ts` (Molecules):

```typescript
export const componentRegistry: Record<string, ComponentConfig> = {
  // ... existing components

  YourComponent: {
    component: YourComponent,
    description: 'Description of what this component does',
    props: {
      propName: {
        type: 'select', // or 'boolean' | 'text' | 'array' | 'object' | 'interface' | 'custom'
        options: ['option1', 'option2'],
        default: 'option1',
        description: 'What this prop controls',
        required: false, // Mark true for required props
        typeDefinition: 'string', // TypeScript type string for complex types
      },
    },
    examples: [
      { label: 'Default', props: { propName: 'option1' } },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: '<YourComponent propName="option1" />',
        description: 'Simple example showing default usage',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/atoms/YourComponent/YourComponent.tsx',
    accessibilityNotes: [
      'Uses semantic HTML elements',
      'Keyboard navigable with Tab/Enter',
      'Screen reader accessible with proper ARIA attributes',
    ],
  },
};
```

2. **It will automatically appear** in the Components section with full documentation, JSON-LD metadata, and accessibility notes!

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Components**: `@ecosystem/design-system`
- **State**: React hooks + design system's Zustand stores
- **Code Highlighting**: Shiki (planned for Phase 2)

## Roadmap

### Phase 1-7 (Documentation Overhaul) ✅ COMPLETE
- ✅ Enhanced registry type system for complex prop types
- ✅ Code examples integration with CollapsibleCodeBlock
- ✅ PageLayout organism for composition patterns
- ✅ Breadcrumb generation utilities and global integration
- ✅ Complete documentation audit (all components)
- ✅ LLM optimization with JSON-LD structured data
- ✅ Accessibility notes for all components
- ✅ GitHub source links for all components

See [PHASE-7-COMPLETION.md](./docs/PHASE-7-COMPLETION.md) for full details.

### Phase 8 (Enhancement)
- Search/filter functionality
- Responsive preview modes
- Component usage analytics
- Version comparison tools

### Phase 9 (Expansion)
- Brand guidelines section
- Product design resources
- Template downloads
- Figma integration

### Phase 10 (Productization)
- Premium templates
- Design kits
- Community contributions
- Licensing options

## Related Documentation

### Design System Documentation

The Sage Design Studio documents and showcases the design system. For comprehensive information about the design system itself:

**For Users (Building with the Design System):**
- [Usage Guide](../../design-system/docs/USAGE_GUIDE.md) - Complete guide to using components, component-first philosophy, patterns, and examples

**For Contributors (Extending the Design System):**
- [Component Workflow](../../design-system/docs/COMPONENT_WORKFLOW.md) - How to create/modify components
- [Architecture Guide](../../design-system/docs/ARCHITECTURE-GUIDE.md) - Where code belongs (design system vs. apps)

**For Troubleshooting:**
- [Unresolved Issues](../../design-system/docs/UNRESOLVED_ISSUES.md) - Current known issues with full context

**Strategic & Philosophy:**
- [Sage Design Studio Strategy](../../design-system/docs/SAGE-DESIGN-STUDIO.md) - Strategic vision for this documentation platform
- [Design System README](../../design-system/README.md) - Design system overview and API reference
- [Design Philosophy](/DESIGN-PHILOSOPHY.md) - Core principles and values

### Studio-Specific Documentation

- [PHASE-7-COMPLETION.md](./docs/PHASE-7-COMPLETION.md) - Documentation overhaul completion details
- [CHANGELOG.md](./CHANGELOG.md) - Version history and changes

---

**Built with ❤️ as part of the ecosystem**
