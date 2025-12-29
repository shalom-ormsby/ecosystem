# Design System Component Workflow

This guide ensures all necessary steps are completed when creating or modifying design system components.

## Table of Contents
- [Creating a New Component](#creating-a-new-component)
- [Modifying an Existing Component](#modifying-an-existing-component)
- [Essential Steps Checklist](#essential-steps-checklist)
- [File Structure Reference](#file-structure-reference)

---

## Creating a New Component

### 1. Create the Component File

**Location Pattern:**
```
design-system/
├── atoms/           # For atomic components (Button, Link, etc.)
├── molecules/       # For composed simple components
├── organisms/       # For complex composed components (Header, SecondaryNav, etc.)
└── templates/       # For page-level templates
```

**File Structure:**
```
design-system/[level]/[ComponentName]/
├── [ComponentName].tsx
├── [ComponentName].stories.tsx (optional)
└── index.ts (optional, if additional exports needed)
```

**Component Template:**
```tsx
'use client'; // If component uses React hooks or state

import React from 'react';

export interface ComponentNameProps {
    /**
     * Prop description
     */
    propName: string;
    /**
     * Optional prop description
     */
    optionalProp?: boolean;
    /**
     * Additional className for customization
     */
    className?: string;
}

/**
 * ComponentName
 *
 * Brief description of what the component does.
 *
 * **Key Features:**
 * - Feature 1
 * - Feature 2
 *
 * **Usage:**
 * ```tsx
 * <ComponentName propName="value" />
 * ```
 */
export const ComponentName = React.forwardRef<HTMLElement, ComponentNameProps>(
    ({ propName, optionalProp = false, className = '' }, ref) => {
        return (
            <div
                ref={ref}
                className={`
                    base-styles
                    ${className}
                `}
            >
                {/* Component content */}
            </div>
        );
    }
);

ComponentName.displayName = 'ComponentName';
```

### 2. Export from Index File

**Update the appropriate index file:**

```typescript
// design-system/atoms/index.ts
// design-system/molecules/index.ts
// design-system/organisms/index.ts

export { ComponentName } from './ComponentName/ComponentName';
export type { ComponentNameProps, ComponentNameItem } from './ComponentName/ComponentName';
```

### 3. Rebuild the Design System

**CRITICAL:** Always rebuild after making changes:

```bash
pnpm --filter @ecosystem/design-system build
```

**Why:** This compiles TypeScript and bundles the component for consumption by other packages.

### 4. Add to Sage Design Studio Documentation

#### A. Add to Component Registry (for Atoms)

**File:** `apps/sage-design-studio/app/components/lib/component-registry.tsx`

```tsx
ComponentName: {
  component: ComponentName,
  description: 'Clear description of the component and its use cases.',
  props: {
    propName: {
      type: 'select' | 'boolean' | 'text',
      options: ['option1', 'option2'] as const, // if type is 'select'
      default: 'defaultValue',
      description: 'What this prop does',
    },
  },
  examples: [
    {
      label: 'Default',
      props: { propName: 'value' },
      children: 'Example content',
    },
    {
      label: 'Variant',
      props: { propName: 'different-value' },
      children: 'Different example',
    },
  ],
},
```

#### B. Add to Section Documentation (for Molecules, Organisms, Templates)

**Files:**
- `apps/sage-design-studio/app/components/studio/MoleculesSection.tsx`
- `apps/sage-design-studio/app/components/studio/OrganismsSection.tsx`
- `apps/sage-design-studio/app/components/studio/TemplatesSection.tsx`

**Pattern:**
```tsx
import { ComponentName } from '@ecosystem/design-system';

// Inside the section component:
<section className="space-y-6">
  <div>
    <h3 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
      ComponentName
    </h3>
    <Card className="p-6">
      <p className="text-[var(--color-text-primary)] mb-4">
        Description of what the component does and when to use it.
      </p>
      <div className="space-y-4">
        <div className="text-sm text-[var(--color-text-secondary)]">
          <strong>Key Features:</strong>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Feature description</li>
            <li>Another feature</li>
          </ul>
        </div>
        <div className="mt-4 p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
          <p className="text-xs text-[var(--color-text-muted)]">
            <strong>Pattern:</strong> Technical details about implementation patterns.
          </p>
        </div>
      </div>
    </Card>
  </div>

  {/* Live Preview */}
  <div>
    <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
      Live Preview
    </h4>
    <Card className="p-0 overflow-hidden">
      <ComponentNameDemo />
    </Card>
  </div>

  {/* Code Example */}
  <div>
    <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
      Code Example
    </h4>
    <Card className="p-6 bg-[var(--color-surface)]">
      <pre className="text-sm text-[var(--color-text-secondary)] overflow-x-auto">
        <code>{`<ComponentName
  propName="value"
  optionalProp={true}
/>`}</code>
      </pre>
    </Card>
  </div>
</section>

// Demo component at the end of the file
function ComponentNameDemo() {
  const [state, setState] = useState('initial');

  return (
    <div className="relative bg-[var(--color-background)] min-h-[400px]">
      <ComponentName propName={state} />
    </div>
  );
}
```

### 5. Rebuild Sage Design Studio

```bash
pnpm --filter sage-design-studio build
```

### 6. Test in Development

```bash
# In the design system
pnpm --filter sage-design-studio dev

# Visit http://localhost:3000 to verify
```

---

## Modifying an Existing Component

### 1. Update Component File

Make changes to the component in:
```
design-system/[level]/[ComponentName]/[ComponentName].tsx
```

### 2. Update Types/Exports (if needed)

If you added new props or types, ensure they're exported:
```typescript
export type { NewType } from './ComponentName/ComponentName';
```

### 3. Rebuild Design System

```bash
pnpm --filter @ecosystem/design-system build
```

### 4. Update Documentation

#### If props changed:
- Update component registry (`component-registry.tsx`)
- Update code examples in section documentation

#### If behavior changed:
- Update description
- Update key features list
- Update demo component if needed

#### If new variants/patterns added:
- Add new examples to registry
- Add new demo scenarios
- Document new patterns

### 5. Rebuild Sage Design Studio

```bash
pnpm --filter sage-design-studio build
```

---

## Essential Steps Checklist

Use this checklist every time you create or modify a component:

### For New Components:
- [ ] Create component file in correct directory (atoms/molecules/organisms/templates)
- [ ] Add TypeScript interfaces with JSDoc comments
- [ ] Use `React.forwardRef` for ref support
- [ ] Add `displayName` for debugging
- [ ] Export component and types from level index file (`atoms/index.ts`, etc.)
- [ ] **Rebuild design system** (`pnpm --filter @ecosystem/design-system build`)
- [ ] Add to component registry (atoms) OR section documentation (molecules/organisms/templates)
- [ ] Create live demo component
- [ ] Add code examples
- [ ] **Rebuild Sage Design Studio** (`pnpm --filter sage-design-studio build`)
- [ ] Test in development mode
- [ ] Test in production build

### For Modified Components:
- [ ] Update component file
- [ ] Update TypeScript types if needed
- [ ] Update exports if new types added
- [ ] **Rebuild design system** (`pnpm --filter @ecosystem/design-system build`)
- [ ] Update component registry props (if props changed)
- [ ] Update descriptions (if behavior changed)
- [ ] Update code examples (if API changed)
- [ ] Update demo component (if new features added)
- [ ] **Rebuild Sage Design Studio** (`pnpm --filter sage-design-studio build`)
- [ ] Test in development mode
- [ ] Verify examples still work

---

## File Structure Reference

### Design System Package
```
design-system/
├── atoms/
│   ├── Button/
│   │   └── Button.tsx
│   ├── Link/
│   │   └── Link.tsx
│   └── index.ts                    # ← Export all atoms
├── molecules/
│   └── index.ts                    # ← Export all molecules
├── organisms/
│   ├── Header/
│   │   └── Header.tsx
│   ├── SecondaryNav/
│   │   └── SecondaryNav.tsx
│   ├── TertiaryNav/
│   │   └── TertiaryNav.tsx
│   └── index.ts                    # ← Export all organisms
├── src/
│   └── index.ts                    # ← Main export (exports atoms/molecules/organisms)
├── docs/
│   └── COMPONENT_WORKFLOW.md       # ← This file
└── package.json
```

### Sage Design Studio App
```
apps/sage-design-studio/
├── app/
│   ├── components/
│   │   ├── lib/
│   │   │   └── component-registry.tsx    # ← Register atoms here
│   │   └── studio/
│   │       ├── ComponentsSection/
│   │       │   └── index.tsx             # ← Atoms playground
│   │       ├── MoleculesSection.tsx      # ← Document molecules
│   │       ├── OrganismsSection.tsx      # ← Document organisms
│   │       └── TemplatesSection.tsx      # ← Document templates
│   └── page.tsx
└── package.json
```

---

## Common Mistakes to Avoid

### ❌ Forgetting to rebuild
**Problem:** Changes don't appear in consuming apps.
**Solution:** Always run `pnpm --filter @ecosystem/design-system build` after changes.

### ❌ Not exporting from index
**Problem:** `import { Component } from '@ecosystem/design-system'` fails.
**Solution:** Export from level index file AND ensure it's exported from `src/index.ts`.

### ❌ Missing 'use client' directive
**Problem:** Build errors about hooks or SSR issues.
**Solution:** Add `'use client';` at top of file if component uses hooks or state.

### ❌ Not updating documentation
**Problem:** New component/feature exists but isn't discoverable.
**Solution:** Always add to component registry OR section documentation.

### ❌ Skipping the demo
**Problem:** Users can't see how to use the component.
**Solution:** Create live demo component showing real usage.

### ❌ Not testing the build
**Problem:** Development works but production fails.
**Solution:** Always run build and test before considering work complete.

---

## Sticky Navigation Pattern Reference

When creating sticky navigation components, follow this pattern:

### Triple-Stack Pattern
```tsx
// Header: top-0, z-50, h-16 lg:h-20
<Header sticky={true} />

// SecondaryNav: top-16 lg:top-20, z-40, h-16
<SecondaryNav items={sections} />

// TertiaryNav: top-32 lg:top-36, z-30, h-14
<TertiaryNav items={components} />
```

### Positioning Math
Each level's `top` value = sum of all previous heights:
- Header: 0px (top-0)
- SecondaryNav: 64px / 80px (top-16 lg:top-20)
- TertiaryNav: 128px / 144px (top-32 lg:top-36)
  - Calculation: Header height (64/80px) + SecondaryNav height (64px)

### Z-Index Hierarchy
- Header: z-50 (highest)
- SecondaryNav: z-40
- TertiaryNav: z-30
- Page content: default (z-0)

---

## Quick Reference Commands

```bash
# Rebuild design system (ALWAYS after component changes)
pnpm --filter @ecosystem/design-system build

# Rebuild documentation site
pnpm --filter sage-design-studio build

# Run documentation site in dev mode
pnpm --filter sage-design-studio dev

# Build everything
pnpm turbo build

# List all packages
pnpm list --depth=0 --filter @ecosystem/*
```

---

## Questions?

If you're unsure about where a component belongs:
- **Atoms:** Cannot be broken down further (Button, Link, Input)
- **Molecules:** Simple compositions of atoms (FormField, NavItem)
- **Organisms:** Complex, functional sections (Header, Footer, DataTable)
- **Templates:** Page-level layouts (PageLayout, DashboardLayout)

When in doubt, start with atoms and promote to higher levels as complexity increases.
