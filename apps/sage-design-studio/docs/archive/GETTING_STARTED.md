# Getting Started with Sage Design Studio

**For developers or LLMs starting work on the Studio with zero context.**

---

## What Is This?

Sage Design Studio is an **interactive documentation website** for the Sage UI. It's a Next.js app that imports components from `@ecosystem/design-system` and provides:

- Live component playgrounds with interactive prop controls
- Visual token documentation (colors, typography, spacing, motion)
- Code examples with syntax highlighting
- Theme switching (Studio, Sage, Volt)
- LLM-optimized structured metadata (JSON-LD)

**URL:** https://studio.shalomormsby.com (or `/studio` on the main site)

**Purpose:** Make the design system transparent, explorable, and usable for both humans and AI.

---

## Quick Start

### Prerequisites

You need to be in the ecosystem monorepo with dependencies installed:

```bash
# From ecosystem root
pnpm install
```

### Run the Studio

```bash
# Option 1: Run everything (recommended for dev)
pnpm dev

# Option 2: Run just the Studio
cd apps/sage-design-studio
pnpm dev
```

**Ports:**
- Studio runs on `http://localhost:3001`
- Portfolio (if running) proxies to `/studio` from `http://localhost:3000`

### Make a Change

1. **Edit a component in the design system:**
   ```bash
   # Example: Update Button component
   vi design-system/atoms/Button/Button.tsx
   ```

2. **Changes auto-reflect in Studio** thanks to `workspace:*` protocol
   - The Studio hot-reloads when design system changes
   - No rebuild needed during development

3. **Update documentation** (if you changed props):
   - Edit `app/components/lib/component-registry.ts` (for Atoms)
   - Or `app/components/lib/molecule-registry.ts` (for Molecules)

---

## Architecture Overview

### Relationship to Design System

```
┌─────────────────────────────────────────┐
│ @ecosystem/design-system                │
│ (design-system/)                        │
│                                         │
│ - Atoms (Button, Card, Heading, etc.)  │
│ - Molecules (Breadcrumbs, etc.)        │
│ - Organisms (Header, Footer, etc.)     │
│ - Templates (PageTemplate)             │
│ - Tokens (colors, spacing, etc.)       │
└─────────────────────────────────────────┘
              ↓ imports
┌─────────────────────────────────────────┐
│ Sage Design Studio                      │
│ (apps/sage-design-studio/)              │
│                                         │
│ - Documents the design system           │
│ - Provides interactive playgrounds      │
│ - Visualizes tokens                     │
│ - Generates code examples               │
└─────────────────────────────────────────┘
```

**Key Point:** The Studio is a **consumer** of the design system, not part of it. It lives in `apps/` alongside other apps like `portfolio` and `creative-powerup`.

See [ARCHITECTURE-GUIDE.md](../../design-system/docs/ARCHITECTURE-GUIDE.md) for details on this separation.

### File Structure

```
apps/sage-design-studio/
├── app/
│   ├── components/
│   │   ├── studio/                    # Studio-specific UI components
│   │   │   ├── StudioHero.tsx         # Landing/hero section
│   │   │   ├── SectionNav.tsx         # Tab navigation
│   │   │   ├── OverviewSection.tsx    # Philosophy section
│   │   │   ├── TokensSection/         # Token visualizations
│   │   │   │   ├── ColorsTab.tsx
│   │   │   │   ├── TypographyTab.tsx
│   │   │   │   ├── SpacingTab.tsx
│   │   │   │   └── MotionTab.tsx
│   │   │   ├── ComponentsSection/     # Atoms playground
│   │   │   ├── MoleculesSection.tsx   # Molecules documentation
│   │   │   ├── OrganismsSection.tsx   # Organisms documentation
│   │   │   └── TemplatesSection.tsx   # Templates documentation
│   │   │
│   │   └── lib/                       # Documentation registries
│   │       ├── component-registry.ts  # Atom metadata & props
│   │       ├── molecule-registry.ts   # Molecule metadata & props
│   │       └── ...
│   │
│   ├── lib/                           # Utilities
│   │   ├── metadata-generator.ts      # JSON-LD generation
│   │   └── ...
│   │
│   ├── globals.css                    # Global styles
│   ├── layout.tsx                     # Root layout with ThemeProvider
│   └── page.tsx                       # Main studio page
│
├── public/                            # Static assets
├── README.md                          # What you're reading
├── GETTING_STARTED.md                 # This file
├── PHASE-7-COMPLETION.md              # Recent documentation overhaul details
└── CHANGELOG.md                       # Version history
```

---

## How Documentation Works

### Component Registry System

The Studio uses **registry files** to generate documentation automatically.

**For Atoms (simple components):**
File: `app/components/lib/component-registry.ts`

```typescript
export const componentRegistry: Record<string, ComponentConfig> = {
  Button: {
    component: Button,  // Import from design system
    description: 'Interactive button component with multiple variants',
    props: {
      variant: {
        type: 'select',
        options: ['primary', 'secondary', 'ghost'] as const,
        default: 'primary',
        description: 'Visual style of the button',
        required: false,
      },
      size: {
        type: 'select',
        options: ['sm', 'md', 'lg'] as const,
        default: 'md',
        description: 'Size variant',
        required: false,
      },
      // ... more props
    },
    examples: [
      { label: 'Primary', props: { variant: 'primary' }, children: 'Click me' },
      { label: 'Secondary', props: { variant: 'secondary' }, children: 'Cancel' },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `<Button variant="primary">Click me</Button>`,
        description: 'A primary action button',
      },
    ],
    sourceUrl: 'https://github.com/.../Button.tsx',
    accessibilityNotes: [
      'Uses semantic <button> element',
      'Keyboard accessible with Enter/Space',
    ],
  },
};
```

**What this enables:**
- Interactive playground with prop controls
- Live examples that update in real-time
- Code snippets with syntax highlighting
- JSON-LD metadata for LLMs
- Accessibility documentation
- Direct links to source code

**For Molecules and Organisms:**
These are documented in section components (MoleculesSection.tsx, OrganismsSection.tsx) with similar metadata patterns.

---

## Common Tasks

### Task 1: Add a New Component to the Playground

**Scenario:** You created a new `Badge` component in the design system and want to document it.

**Steps:**

1. **Register it in component-registry.ts:**
   ```typescript
   // app/components/lib/component-registry.ts
   import { Badge } from '@ecosystem/design-system';

   export const componentRegistry: Record<string, ComponentConfig> = {
     // ... existing components
     Badge: {
       component: Badge,
       description: 'Label or tag for categorization',
       props: {
         variant: {
           type: 'select',
           options: ['default', 'primary', 'success', 'warning', 'error'],
           default: 'default',
           description: 'Color variant',
         },
         size: {
           type: 'select',
           options: ['sm', 'md', 'lg'],
           default: 'md',
           description: 'Size variant',
         },
       },
       examples: [
         { label: 'Default', props: { variant: 'default' }, children: 'Badge' },
         { label: 'Primary', props: { variant: 'primary' }, children: 'New' },
       ],
       codeExamples: [
         {
           title: 'Basic Usage',
           code: '<Badge variant="primary">New</Badge>',
           description: 'A simple badge',
         },
       ],
       sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/atoms/Badge/Badge.tsx',
       accessibilityNotes: [
         'Uses semantic HTML with proper contrast ratios',
       ],
     },
   };
   ```

2. **That's it!** The Badge will automatically appear in the Components section with:
   - Live playground
   - Prop controls
   - Code examples
   - JSON-LD metadata
   - Accessibility notes

### Task 2: Update Component Props Documentation

**Scenario:** You added a new `loading` prop to Button and need to document it.

**Steps:**

1. **Update component-registry.ts:**
   ```typescript
   Button: {
     // ... existing config
     props: {
       // ... existing props
       loading: {
         type: 'boolean',
         default: false,
         description: 'Shows loading spinner and disables button',
         required: false,
       },
     },
     // Add example showing loading state
     examples: [
       // ... existing examples
       { label: 'Loading', props: { loading: true }, children: 'Processing...' },
     ],
   },
   ```

2. **Add code example:**
   ```typescript
   codeExamples: [
     // ... existing examples
     {
       title: 'Loading State',
       code: '<Button loading>Processing...</Button>',
       description: 'Button with loading spinner',
     },
   ],
   ```

### Task 3: Add a New Token Visualization

**Scenario:** You want to add a "Border Radius" tab to the Tokens section.

**Steps:**

1. **Create a new tab component:**
   ```bash
   touch app/components/studio/TokensSection/BorderRadiusTab.tsx
   ```

2. **Implement the visualization:**
   ```typescript
   export function BorderRadiusTab() {
     return (
       <div>
         <h3>Border Radius Scale</h3>
         {/* Visualize border radius tokens */}
       </div>
     );
   }
   ```

3. **Add to TokensSection/index.tsx:**
   ```typescript
   import { BorderRadiusTab } from './BorderRadiusTab';

   // Add to tab list
   const tabs = [
     { id: 'colors', label: 'Colors' },
     { id: 'typography', label: 'Typography' },
     { id: 'spacing', label: 'Spacing' },
     { id: 'motion', label: 'Motion' },
     { id: 'border-radius', label: 'Border Radius' },  // NEW
   ];

   // Add to content
   {selectedTab === 'border-radius' && <BorderRadiusTab />}
   ```

---

## Key Architectural Decisions

### 1. Why Separate App vs. Design System Package?

**Design System Package** (`design-system/`):
- Pure component library
- No application code
- Consumed by all apps
- Published as `@ecosystem/design-system`

**Sage Design Studio App** (`apps/sage-design-studio/`):
- Documentation application
- Imports from design system
- Has its own routing, pages, state
- Not exported to other apps

**Benefits:**
- Clean separation of concerns
- Design system stays lightweight
- Studio can be developed/deployed independently
- Other apps don't get documentation bloat

### 2. Why Component Registries?

**Alternative approaches considered:**
- Auto-generate from TypeScript types (complex, brittle)
- Separate CMS/database (overkill, harder to maintain)
- Hardcoded in each section (repetitive, harder to update)

**Registry approach wins because:**
- Single source of truth for each component's docs
- Easy to update (just edit one object)
- Type-safe with TypeScript
- Enables automatic features (playgrounds, metadata, accessibility)
- Co-located with the code (monorepo)

### 3. Why JSON-LD Metadata?

**Purpose:** Make component documentation machine-readable for LLMs and search engines.

**How it works:**
- Registries contain all component information
- `metadata-generator.ts` transforms to Schema.org format
- `JsonLdMetadata` component injects into page `<head>`
- LLMs can parse structured data without reading source code

**Benefits:**
- LLMs generate correct component usage
- Search engines index component APIs
- No API endpoint needed
- Standards-based (Schema.org vocabulary)

---

## Integration with Portfolio

The Studio is accessed via the portfolio app at `/studio`:

**In Development:**
- Portfolio: `http://localhost:3000`
- Studio: `http://localhost:3001`
- Portfolio proxies `/studio` to Studio app

**In Production:**
- Both apps deployed separately
- Portfolio rewrites handle routing
- Or use subdomain: `studio.shalomormsby.com`

**Configuration:**
See `apps/portfolio/next.config.mjs` for rewrite rules.

---

## Design System Integration

### How Changes Flow

1. **Edit design system component:**
   ```bash
   # Example: Change Button variant colors
   vi design-system/atoms/Button/Button.tsx
   ```

2. **Design system auto-rebuilds** (if `pnpm dev` running in design-system/)

3. **Studio hot-reloads** and picks up changes immediately

4. **No manual rebuild needed** during development

### Workspace Protocol

```json
// apps/sage-design-studio/package.json
{
  "dependencies": {
    "@ecosystem/design-system": "workspace:*"
  }
}
```

The `workspace:*` protocol ensures:
- Studio always uses local design system version
- Changes immediately available
- No publish/version needed during development

---

## Troubleshooting

### Studio Not Showing Component Changes

**Problem:** You changed a component in the design system but it's not updating in the Studio.

**Solutions:**
1. **Check if design system is running in watch mode:**
   ```bash
   cd design-system
   pnpm dev  # Should be running
   ```

2. **Manually rebuild design system:**
   ```bash
   cd design-system
   pnpm build
   ```

3. **Restart Studio:**
   ```bash
   cd apps/sage-design-studio
   pnpm dev
   ```

4. **Clear Next.js cache:**
   ```bash
   rm -rf apps/sage-design-studio/.next
   pnpm dev
   ```

### Component Not Appearing in Playground

**Problem:** You added a component to the registry but it's not showing up.

**Check:**
1. **Did you import the component?**
   ```typescript
   import { YourComponent } from '@ecosystem/design-system';
   ```

2. **Is it exported from the design system?**
   ```bash
   # Check design-system/atoms/index.ts (or molecules/organisms)
   grep "YourComponent" design-system/atoms/index.ts
   ```

3. **Did you rebuild the design system?**
   ```bash
   cd design-system && pnpm build
   ```

4. **Check browser console for errors**

### Syntax Highlighting Not Working

**Problem:** Code examples show as plain text.

**Check:**
1. **Is CollapsibleCodeBlock imported?**
2. **Is code wrapped in proper format?**
   ```typescript
   <CollapsibleCodeBlock
     id="unique-id"
     code={codeString}  // Must be string
     language="tsx"
     showCopy
   />
   ```

---

## Testing

### Manual Testing Checklist

Before committing changes:

- [ ] All tabs in Tokens section render correctly
- [ ] Component playgrounds work (prop controls update UI)
- [ ] Code examples have syntax highlighting
- [ ] Copy button works on code blocks
- [ ] Theme switching works (Studio, Sage, Volt)
- [ ] Dark/light mode toggle works
- [ ] Mobile responsive (check on small screen)
- [ ] No console errors
- [ ] JSON-LD metadata present in page source

### Testing JSON-LD Metadata

1. **View page source** (right-click → View Page Source)
2. **Search for** `<script type="application/ld+json">`
3. **Verify structure:**
   ```json
   {
     "@context": "https://schema.org",
     "@type": "SoftwareSourceCode",
     "name": "Button",
     "description": "...",
     "properties": [...]
   }
   ```

---

## Related Documentation

### Essential Reading

**Start here:**
- [Design System Usage Guide](../../design-system/docs/USAGE_GUIDE.md) - How to use the design system (what the Studio documents)

**For contributors:**
- [Component Workflow](../../design-system/docs/COMPONENT_WORKFLOW.md) - How to create design system components
- [Architecture Guide](../../design-system/docs/ARCHITECTURE-GUIDE.md) - Where code belongs

**For troubleshooting:**
- [Unresolved Issues](../../design-system/docs/UNRESOLVED_ISSUES.md) - Current known issues

**Strategic context:**
- [Sage Design Studio Strategy](../../design-system/docs/SAGE-DESIGN-STUDIO.md) - Vision and roadmap for the Studio
- [Design Philosophy](/DESIGN-PHILOSOPHY.md) - Why this exists

### Studio-Specific

- [README.md](./README.md) - Overview and features
- [PHASE-7-COMPLETION.md](./PHASE-7-COMPLETION.md) - Recent improvements
- [CHANGELOG.md](./CHANGELOG.md) - Version history

---

## Next Steps

1. **Run the Studio locally** and explore
2. **Read the [Design System Usage Guide](../../design-system/docs/USAGE_GUIDE.md)** to understand what you're documenting
3. **Try adding a component** to the registry
4. **Check the [Roadmap](./README.md#roadmap)** for planned features

---

**Questions?**

Check [UNRESOLVED_ISSUES.md](../../design-system/docs/UNRESOLVED_ISSUES.md) for current problems and context, or refer to the comprehensive documentation links above.
