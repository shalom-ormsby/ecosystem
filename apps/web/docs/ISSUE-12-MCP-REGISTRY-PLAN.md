# Issue #12: MCP Registry Completion Plan

**Status:** Ready for Implementation
**Created:** 2026-01-30
**Estimated Effort:** 4-6 hours
**Priority:** Phase 3 - Polish

---

## Executive Summary

The MCP server registry currently contains **48 components** out of **89 total** exported from `@thesage/ui`. We need to add **41 missing components** to achieve complete AI-powered discoverability via Claude Desktop and Cursor.

**Impact:**
- **Current:** AI can only discover 54% of available components
- **Target:** AI can discover 100% of available components
- **User Benefit:** Complete component library accessible via AI assistants

---

## Current State Analysis

### Components in MCP Registry (48)

**Actions (3/5):**
- ✅ button
- ✅ toggle
- ✅ toggle-group
- ❌ link (MISSING)
- ❌ magnetic (MISSING)

**Forms (11/18):**
- ✅ checkbox
- ✅ combobox
- ✅ form
- ✅ input
- ✅ input-otp
- ✅ label
- ✅ radio-group
- ✅ select
- ✅ slider
- ✅ switch
- ✅ textarea
- ❌ color-picker (MISSING)
- ❌ drag-drop (MISSING)
- ❌ filter-button (MISSING)
- ❌ search-bar (MISSING)
- ❌ text-field (MISSING)
- ❌ theme-switcher (MISSING)
- ❌ theme-toggle (MISSING)

**Navigation (6/10):**
- ✅ breadcrumb
- ✅ command
- ✅ menubar
- ✅ navigation-menu
- ✅ pagination
- ✅ tabs
- ❌ breadcrumbs (MISSING - note: different from breadcrumb)
- ❌ nav-link (MISSING)
- ❌ secondary-nav (MISSING)
- ❌ tertiary-nav (MISSING)

**Overlays (9/11):**
- ✅ alert-dialog
- ✅ context-menu
- ✅ dialog
- ✅ drawer
- ✅ dropdown-menu
- ✅ hover-card
- ✅ popover
- ✅ sheet
- ✅ tooltip
- ❌ dropdown (MISSING - note: different from dropdown-menu)
- ❌ modal (MISSING - note: different from dialog)

**Feedback (5/7):**
- ✅ alert
- ✅ progress
- ✅ skeleton
- ✅ sonner
- ✅ toast
- ❌ progress-bar (MISSING - note: different from progress)
- ❌ spinner (MISSING)

**Data Display (6/16):**
- ✅ avatar
- ✅ badge
- ✅ calendar
- ✅ card
- ✅ data-table
- ✅ table
- ❌ aspect-image (MISSING)
- ❌ brand (MISSING)
- ❌ code (MISSING)
- ❌ collapsible-code-block (MISSING)
- ❌ description-list (MISSING)
- ❌ github-icon (MISSING)
- ❌ heading (MISSING)
- ❌ text (MISSING)
- ❌ variable-weight-text (MISSING)
- ❌ typewriter (MISSING)

**Layout (8/17):**
- ✅ accordion
- ✅ aspect-ratio
- ✅ carousel
- ✅ collapsible
- ✅ date-picker
- ✅ resizable
- ✅ scroll-area
- ✅ separator
- ❌ container (MISSING)
- ❌ customizer-panel (MISSING)
- ❌ footer (MISSING)
- ❌ grid (MISSING)
- ❌ header (MISSING)
- ❌ page-layout (MISSING)
- ❌ page-template (MISSING)
- ❌ sidebar (MISSING)
- ❌ stack (MISSING)

**Specialty Components (0/7):**
- ❌ warp-background (MISSING)
- ❌ faulty-terminal (MISSING)
- ❌ orb-background (MISSING)
- ❌ animated-beam (MISSING)
- ❌ hero (MISSING)
- ❌ splash-cursor (MISSING)
- ❌ target-cursor (MISSING)
- ❌ open-graph-card (MISSING - exported from blocks/social)

---

## Missing Components Breakdown

### Total Missing: 41 Components

#### By Category:
- **Actions:** 2 missing
- **Forms:** 7 missing
- **Navigation:** 4 missing
- **Overlays:** 2 missing
- **Feedback:** 2 missing
- **Data Display:** 10 missing (largest gap)
- **Layout:** 9 missing
- **Specialty:** 5 missing (backgrounds, cursor, blocks, motion)

#### By Priority (for implementation order):

**High Priority - Core Components (24):**
These are fundamental components users will search for frequently:
1. heading (data-display) - Text hierarchy
2. text (data-display) - Body text
3. code (data-display) - Code formatting
4. link (actions) - Navigation links
5. search-bar (forms) - Search functionality
6. grid (layout) - Layout grid
7. container (layout) - Content containers
8. stack (layout) - Flexbox stacking
9. modal (overlays) - Alternative to dialog
10. dropdown (overlays) - Alternative to dropdown-menu
11. spinner (feedback) - Loading indicators
12. progress-bar (feedback) - Alternative to progress
13. sidebar (layout) - Navigation sidebar
14. header (layout) - Page headers
15. footer (layout) - Page footers
16. nav-link (navigation) - Navigation links
17. secondary-nav (navigation) - Secondary navigation
18. tertiary-nav (navigation) - Tertiary navigation
19. filter-button (forms) - Filtering controls
20. theme-switcher (forms) - Theme switching
21. theme-toggle (forms) - Theme toggle
22. collapsible-code-block (data-display) - Code blocks
23. description-list (data-display) - Key-value lists
24. brand (data-display) - Brand components

**Medium Priority - Advanced Components (10):**
1. customizer-panel (layout) - Philosophy-embodying feature
2. page-layout (layout) - Full page layouts
3. page-template (layout) - Page templates
4. color-picker (forms) - Color selection
5. drag-drop (forms) - Drag and drop
6. text-field (forms) - Text field wrapper
7. aspect-image (data-display) - Aspect ratio images
8. variable-weight-text (data-display) - Variable fonts
9. typewriter (data-display) - Typewriter effect
10. github-icon (data-display) - GitHub icon

**Low Priority - Specialty/Effects (7):**
1. warp-background (backgrounds) - Warp speed effect
2. faulty-terminal (backgrounds) - Terminal effect
3. orb-background (backgrounds) - Orb effect
4. animated-beam (motion) - Beam animation
5. hero (blocks) - Hero section
6. splash-cursor (cursor) - Splash cursor effect
7. target-cursor (cursor) - Target cursor effect
8. open-graph-card (blocks) - Open Graph cards
9. magnetic (actions) - Magnetic hover effect
10. breadcrumbs (navigation) - Alternative breadcrumb component

---

## Implementation Strategy

### Phase 1: High Priority Core Components (3-4 hours)

**Batch 1 - Typography & Display (1 hour):**
- heading
- text
- code
- collapsible-code-block
- description-list

**Batch 2 - Layout Fundamentals (1 hour):**
- grid
- container
- stack
- sidebar
- header
- footer

**Batch 3 - Forms & Actions (1 hour):**
- link
- search-bar
- filter-button
- theme-switcher
- theme-toggle

**Batch 4 - Navigation & Feedback (1 hour):**
- nav-link
- secondary-nav
- tertiary-nav
- modal
- dropdown
- spinner
- progress-bar

### Phase 2: Medium Priority (1-2 hours)

**Batch 5 - Advanced Components:**
- customizer-panel
- page-layout
- page-template
- color-picker
- drag-drop
- text-field
- aspect-image
- variable-weight-text
- typewriter
- github-icon
- brand

### Phase 3: Low Priority Specialty (30 min - 1 hour)

**Batch 6 - Backgrounds & Effects:**
- warp-background
- faulty-terminal
- orb-background
- animated-beam
- hero
- open-graph-card

**Batch 7 - Cursor & Micro-interactions:**
- splash-cursor
- target-cursor
- magnetic
- breadcrumbs

---

## Metadata Template

For each component, we need to provide:

```typescript
'component-name': {
  name: 'ComponentName',
  category: 'category',
  description: 'Brief description of what it does (1 sentence, under 100 chars)',
  keywords: ['keyword1', 'keyword2', 'keyword3', 'keyword4', 'keyword5'],
  useCases: [
    'Use case 1',
    'Use case 2',
    'Use case 3',
    'Use case 4',
  ],
  dependencies: ['dependency-1', 'dependency-2'], // or [] if none
  radixPrimitive?: '@radix-ui/react-primitive', // if applicable
},
```

### Example (Heading):

```typescript
'heading': {
  name: 'Heading',
  category: 'data-display',
  description: 'Semantic heading component with size variants and theme-aware styling',
  keywords: ['heading', 'title', 'h1', 'h2', 'h3', 'typography', 'text'],
  useCases: [
    'Page titles',
    'Section headings',
    'Content hierarchy',
    'Semantic HTML structure',
  ],
  dependencies: [],
},
```

---

## Research Process

For each component, follow this process:

### Step 1: Read Component File
```bash
# Example for Heading
cat packages/ui/src/components/data-display/Heading.tsx
```

### Step 2: Extract Information
- **Description:** What does it do? (read JSDoc or component logic)
- **Keywords:** What would users search for?
- **Use Cases:** When would you use it?
- **Dependencies:** Check imports and package.json

### Step 3: Check for Radix Primitive
```typescript
// Look for imports like:
import * as Something from '@radix-ui/react-something'
```

### Step 4: Add to Registry
- Add entry to `/packages/mcp/src/registry.ts`
- Follow alphabetical order within category
- Match existing code style

---

## Verification Checklist

After adding all components:

### Update Component Counts
- [ ] Update `COMPONENT_CATEGORIES` counts in registry.ts
- [ ] actions: 3 → 5
- [ ] forms: 11 → 18
- [ ] navigation: 6 → 10
- [ ] overlays: 9 → 11
- [ ] feedback: 5 → 7
- [ ] data-display: 6 → 16
- [ ] layout: 8 → 17

### Add Specialty Categories
- [ ] Add `backgrounds` category (count: 3)
- [ ] Add `cursor` category (count: 2)
- [ ] Add `blocks` category (count: 2)
- [ ] Add `motion` category (count: 1)

### Build & Test
```bash
# 1. Build MCP server
pnpm build --filter @thesage/mcp

# 2. Test search functionality
node -e "const {searchComponents} = require('./packages/mcp/dist/registry.js'); console.log(searchComponents('heading').map(c => c.name));"

# 3. Verify count
node -e "const {getComponentCount} = require('./packages/mcp/dist/registry.js'); console.log('Total:', getComponentCount());"
# Should output: Total: 89

# 4. Test MCP server
npx @thesage/mcp
# Then in Claude Desktop: "List all Sage UI components"
```

### Update Documentation
- [ ] Update `/packages/mcp/README.md` (if it mentions component counts)
- [ ] Update `/apps/web/docs/DOCUMENTATION-AUDIT.md` (mark Issue #12 complete)
- [ ] Update `CHANGELOG.md` with completion note

---

## Files to Modify

### Primary File:
- `/packages/mcp/src/registry.ts` - Add all 41 missing components

### Supporting Files (Update Counts):
- `/packages/mcp/README.md` - If component count mentioned
- `/apps/web/docs/DOCUMENTATION-AUDIT.md` - Mark Issue #12 complete
- `/CHANGELOG.md` - Log completion with timestamp

---

## Potential Challenges

### Challenge 1: Component Naming Conflicts
**Issue:** Some components have similar names (e.g., `breadcrumb` vs `breadcrumbs`, `dropdown` vs `dropdown-menu`)
**Solution:** Clearly differentiate in descriptions and keywords

### Challenge 2: Component File Locations
**Issue:** Some components are in unexpected locations (e.g., `OpenGraphCard` in `blocks/social/`)
**Solution:** Use grep to find actual file paths

### Challenge 3: Specialty Component Categories
**Issue:** MCP registry doesn't have `backgrounds`, `cursor`, `blocks`, `motion` categories yet
**Solution:** Add new categories to `COMPONENT_CATEGORIES` object

---

## Success Criteria

- [ ] All 89 components from `@thesage/ui/src/index.ts` are in MCP registry
- [ ] Each component has complete metadata (name, category, description, keywords, useCases, dependencies)
- [ ] `getComponentCount()` returns 89
- [ ] Search works for all new components
- [ ] MCP server builds successfully
- [ ] AI assistants can discover all components via natural language queries
- [ ] Category counts are updated and accurate
- [ ] Documentation reflects completion

---

## Time Estimates

| Phase | Components | Estimated Time |
|-------|-----------|----------------|
| Phase 1: Core Components | 24 | 3-4 hours |
| Phase 2: Advanced | 10 | 1-2 hours |
| Phase 3: Specialty | 7 | 30 min - 1 hour |
| **Total** | **41** | **4.5 - 7 hours** |

**Recommended approach:** Dedicate a focused 4-6 hour session with breaks

---

## Next Steps

1. ✅ Review this plan with Shalom
2. Schedule dedicated implementation session
3. Follow batched approach (Phase 1 → 2 → 3)
4. Test after each phase
5. Update documentation upon completion
6. Publish new MCP server version to npm

---

**Last Updated:** 2026-01-30
**Status:** Ready for implementation - awaiting approval
