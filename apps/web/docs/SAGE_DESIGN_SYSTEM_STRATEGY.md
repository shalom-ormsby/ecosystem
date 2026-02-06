# Sage Design Engine - Strategy & Implementation Status

> **Last Updated:** 2026-02-06
> **Current Phase:** ✅ Phase 5 - Assemblies & Templates (Planning)
> **Status:** ✅ Functional Organization Complete | ✅ Quality Verification Complete | ✅ Legacy Migration Complete | ✅ Enterprise Readiness Complete (v1.0.0-rc.1)

---

## Table of Contents

1. [Vision & Philosophy](#vision--philosophy)
2. [Current Status](#current-status)
3. [Architecture](#architecture)
4. [Component Organization](#component-organization)
5. [Implementation Progress](#implementation-progress)
6. [Quality Standards](#quality-standards)
7. [Development Workflow](#development-workflow)
8. [Roadmap](#roadmap)

---

## Vision & Philosophy

### The Solopreneur Stack

The Sage Design Engine is evolving from a traditional enterprise design system to a **Solopreneur-focused Accelerator**. The goal is not just "consistency" but **"quality speed"** - enabling rapid development of premium, high-scale web applications.

### Core Principles

1. **Functional Organization Over Atomic Design**
   - Components grouped by what they *do* (Actions, Forms, Overlays) not abstract hierarchy (Atoms, Molecules, Organisms)
   - Eliminates classification ambiguity and improves discoverability
   - Aligns with modern design systems (shadcn/ui, Material UI, Radix, Chakra)

2. **Code Ownership Model (shadcn/ui Philosophy)**
   - Components are code you own, not black-box dependencies
   - Copy, paste, and customize for maximum flexibility
   - AI-interpretable and LLM-friendly codebase structure
   - Zero vendor lock-in or version constraints

3. **Premium Default**
   - "It just looks expensive" - high-quality animations and interactions out of the box
   - Accessibility is non-negotiable (WCAG 2.1 Level AA minimum)
   - Dark mode as a first-class citizen, not an afterthought

4. **AI-Native Design**
   - JSON-LD metadata for LLM consumption
   - Clear component interfaces and documentation
   - Predictable patterns for AI code generation
   - MCP (Model Context Protocol) server for direct AI integration
   - Enables LLMs to discover, search, and install components programmatically

---

## Current Status

### Recent Achievements (January 2026)

#### ✅ Functional Organization (2026-01-14)

**Major architectural restructuring completed:**

- **48 components reorganized** into 7 functional categories
- **Zero breaking changes** - all imports remain backward compatible
- **Studio navigation updated** with two-level category system
- **Documentation aligned** with new structure

**Commits:**
- `77c39eb` - Core restructure (@thesage/ui components)
- `51f4747` - Studio navigation updates
- `78b7001` - TypeScript fixes

**Categories Implemented:**
```
Actions (3)        → Button, Toggle, ToggleGroup
Forms (11)         → Checkbox, Combobox, Form, Input, InputOTP, Label,
                     RadioGroup, Select, Slider, Switch, Textarea
Navigation (6)     → Breadcrumb, Command, Menubar, NavigationMenu,
                     Pagination, Tabs
Overlays (9)       → AlertDialog, ContextMenu, Dialog, Drawer,
                     DropdownMenu, HoverCard, Popover, Sheet, Tooltip
Feedback (5)       → Alert, Progress, Skeleton, Sonner, Toast
Data Display (6)   → Avatar, Badge, Calendar, Card, DataTable, Table
Layout (8)         → Accordion, AspectRatio, Carousel, Collapsible,
                     DatePicker, Resizable, ScrollArea, Separator
```

#### ✅ Shadcn Parity (Phase 1-3 Complete)

- **43 shadcn components** fully integrated
- **Quality hardening** completed (Jan 14):
  - Accordion animation smoothed
  - Popover transparency fixed
  - Resizable rendering corrected
  - Search index repaired (30+ components)

### Current Focus

**✅ MCP Server MVP Complete (2026-01-14):**
- Full implementation at `packages/mcp`
- Four MCP tools for component discovery and installation
- Multi-client support (Claude Desktop, Cursor, VS Code)
- Documentation live at https://studio.shalomormsby.com/#mcp-server

**Quality Verification Phase:**
- Systematic browser testing of all 48 components
- Visual comparison with shadcn/ui reference
- Animation timing verification (0.2s ease-out standard)
- Accessibility audit (axe-core compliance)

---

## Architecture

### The Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Primitives** | Radix UI | Headless accessible components |
| **Styling** | Tailwind CSS | Utility-first with custom animations |
| **Tokens** | @thesage/tokens | Universal design tokens (CSS vars) |
| **Animation** | CSS Keyframes | Radix data attributes (`data-[state=open]`) |
| **Framework** | Next.js 15+ | Server Components, App Router |
| **Build** | tsup + tsc | ESM/CJS bundles with declarations |
| **Workspace** | pnpm | Monorepo with workspace protocol |

### Package Structure

```
ecosystem/
├── packages/
│   ├── ui/                          # @thesage/ui - Component library (Tier 1)
│   │   └── src/
│   │       ├── components/
│   │       │   ├── actions/
│   │       │   ├── forms/
│   │       │   ├── navigation/
│   │       │   ├── overlays/
│   │       │   ├── feedback/
│   │       │   ├── data-display/
│   │       │   └── layout/
│   │       ├── lib/utils.ts        # cn() helper
│   │       └── index.ts            # Barrel exports
│   ├── tokens/                      # @thesage/tokens - Design system tokens
│   │   └── src/studio.ts
│   ├── config/                      # Shared configs (Tailwind)
│   │   └── tailwind/index.js
│   └── core/                        # @thesage/core - Shared logic/hooks
├── design-system/                   # @ecosystem/design-system (Legacy)
│   └── src/                         # Atomic-organized components (deprecated)
└── apps/
    └── web/          # Documentation & playground
        ├── app/
        │   ├── globals.css          # CSS custom properties
        │   └── components/lib/
        │       └── component-registry.tsx
        └── docs/                    # Strategy docs (this file)
```

### Three-Tier Architecture (Current + Planned)

#### Tier 1: Primitives (@thesage/ui) - ✅ COMPLETE

**Goal:** 100% shadcn/ui parity - accessible, unopinionated building blocks

**Status:** 48 components implemented and organized functionally

**Examples:** Button, Dialog, Select, Input, Accordion, Card, Table

#### Tier 2: Assemblies (@sds/assemblies) - 📋 PLANNED

**Goal:** Task-specific, composed functional units for common use cases

**Status:** Not yet started (Phase 4+ work)

**Examples:** LoginForm, CreditCardInput, PricingTable, StatCard, NewsletterSignup, CommentSection

**Approach:**
- Pre-composed components solving specific problems
- Built from Tier 1 primitives
- Opinionated but customizable
- 20+ assemblies planned

#### Tier 3: Templates (@sds/templates) - 📋 PLANNED

**Goal:** Full-page starting points for rapid app development

**Status:** Not yet started (Phase 5+ work)

**Examples:** DashboardLayout, MarketingLanding, SettingsPage, BlogPostLayout

**Approach:**
- Complete page layouts and app shells
- Combines Tier 1 + Tier 2 components
- Production-ready starting points
- 10+ templates planned

---

## Component Organization

### Functional Categories

Modern design systems have abandoned rigid Atomic Design hierarchies (atoms/molecules/organisms) in favor of functional organization. This eliminates classification ambiguity and improves developer discoverability.

#### Why Functional Organization?

**The Problem with Atomic Design:**
- Is a search bar an "atom" (input variant), "molecule" (contains multiple atoms), or "organism" (complex interactive)?
- Teams waste time debating classification instead of building
- Abstraction levels don't map to developer mental models

**The Solution: Function-Based Categories:**
- Developers think "I need a form input" not "I need an atom"
- Clear purpose-based grouping
- Industry standard (shadcn, Material UI, Radix, Chakra all use functional categories)

### Category Definitions

| Category | Purpose | Component Count |
|----------|---------|----------------|
| **Actions** | Interactive elements that trigger behaviors | 3 |
| **Forms** | Input controls for data collection | 11 |
| **Navigation** | Moving through content and hierarchy | 6 |
| **Overlays** | Contextual content layers (modals, menus) | 9 |
| **Feedback** | Status and system communication | 5 |
| **Data Display** | Presenting information visually | 6 |
| **Layout** | Structural and spacing components | 8 |

### Category Details

#### Actions (3 components)

**Purpose:** User-triggered interactions and state changes

- `Button` - Primary interaction element with variants (default, destructive, outline, ghost, link)
- `Toggle` - Binary state toggle with pressed/unpressed states
- `ToggleGroup` - Multiple toggles with single or multi-select

**When to use:** Any user action that changes state or navigates

#### Forms (11 components)

**Purpose:** Data input and collection with validation

- `Input` - Text input with various types (text, email, password, number)
- `Textarea` - Multi-line text input
- `Select` - Dropdown selection from options
- `Combobox` - Searchable select with autocomplete
- `Checkbox` - Boolean selection (single or grouped)
- `RadioGroup` - Exclusive selection from options
- `Switch` - Toggle between two states
- `Slider` - Numeric input via dragging
- `Label` - Form field labels with proper associations
- `InputOTP` - One-time password input
- `Form` - react-hook-form + zod integration wrapper

**When to use:** Any data collection scenario

#### Navigation (6 components)

**Purpose:** Moving through content hierarchy and app structure

- `Breadcrumb` - Hierarchical location indicator
- `Tabs` - Content organization with tab switching
- `Pagination` - Multi-page navigation
- `Command` - Command palette / search interface
- `NavigationMenu` - Complex header navigation with dropdowns
- `Menubar` - Desktop-style menu bar

**When to use:** Helping users understand location and navigate

#### Overlays (9 components)

**Purpose:** Contextual content that appears above the main UI

- `Dialog` - Modal dialogs for critical interactions
- `AlertDialog` - Confirmation dialogs with cancel/confirm
- `Sheet` - Slide-in panels from screen edges
- `Drawer` - Mobile-friendly bottom drawer
- `Popover` - Floating content anchored to trigger
- `Tooltip` - Hover hints and additional context
- `HoverCard` - Rich preview cards on hover
- `DropdownMenu` - Context menus and action lists
- `ContextMenu` - Right-click context menus

**When to use:** Secondary content that shouldn't interrupt main flow

#### Feedback (5 components)

**Purpose:** Communicating system state and user action results

- `Alert` - Prominent messages (info, warning, error, success)
- `Toast` - Temporary notifications (uses Sonner)
- `Progress` - Visual progress indicators
- `Skeleton` - Loading state placeholders
- `Sonner` - Toast notification system

**When to use:** Providing feedback on user actions or system state

#### Data Display (6 components)

**Purpose:** Presenting information in structured formats

- `Table` - Tabular data display
- `DataTable` - Enhanced table with sorting and pagination
- `Card` - Contained content blocks
- `Avatar` - User profile images with fallbacks
- `Badge` - Status indicators and labels
- `Calendar` - Date selection and display

**When to use:** Showing structured or visual data

#### Layout (8 components)

**Purpose:** Spatial organization and structural elements

- `Accordion` - Collapsible content sections
- `Collapsible` - Simple show/hide content
- `Carousel` - Scrollable content slider
- `ScrollArea` - Custom scrollbar styling
- `Separator` - Visual dividers
- `AspectRatio` - Maintain aspect ratios
- `Resizable` - User-resizable panels
- `DatePicker` - Calendar + popover combo

**When to use:** Organizing content spatially

---

## Implementation Progress

### Phase Completion Status

#### ✅ Phase 0: Prerequisites (Complete)

**Token Integration Automation:**
- `components.json` configured to map shadcn tokens to Sage UI CSS variables
- Zero manual token refactoring per component
- Automatic theme mapping verified

**Build Infrastructure:**
- tsup + tsc bundling pipeline
- Vercel deployment pipeline hardened
- Monorepo workspace dependencies resolved

#### ✅ Phase 1: Critical Components (Complete)

**8 components:** Alert, Dialog, DropdownMenu, Form, RadioGroup, Sheet, Table, DataTable

**Status:** All implemented, quality hardened

#### ✅ Phase 2: High Priority Components (Complete)

**7 components:** Avatar, Combobox, Command, Popover, Tabs, Textarea, Sonner

**Status:** All implemented, quality hardened

#### ✅ Phase 3: Complete Coverage (Complete)

**21 components:** Accordion, AlertDialog, AspectRatio, Breadcrumb, Calendar, Carousel, Collapsible, ContextMenu, DatePicker, Drawer, HoverCard, InputOTP, Menubar, NavigationMenu, Pagination, Progress, Resizable, Slider, Toggle, ToggleGroup, Tooltip

**Status:** All implemented, quality hardening complete (Jan 14)

#### ✅ Phase 3.5: Functional Organization (Complete - Jan 14)

**Major restructuring:**
- All 48 components reorganized into functional categories
- Studio navigation updated with two-level system
- Documentation aligned with new structure
- Zero breaking changes (backward compatible exports)

**Files Modified:**
- Moved all component files to category subdirectories
- Updated 57+ import paths
- Created category index.ts files
- Updated main barrel exports

#### ✅ Phase 3.75: Quality Verification (Complete - Jan 14, 2026)

**Completed Work:**
- ✅ Component registry audit (48/48 components verified)
- ✅ MCP server verification (all components searchable)
- ✅ Fixed missing Input component in Studio registry
- ✅ Fixed missing Label component in Studio registry
- ✅ All packages building successfully (no errors)
- ✅ MCP search functionality tested and working
- ✅ Comprehensive verification report created

**Issues Found & Fixed:**
- ✅ Accordion animation (transition-all removed)
- ✅ Popover transparency (token variables added)
- ✅ Resizable rendering (import issues resolved)
- ✅ Search index (30+ components restored)
- ✅ Input component missing from Studio registry (added with full docs)
- ✅ Label component missing from Studio registry (added with full docs)

**Manual Testing Required:**
- 🔧 Browser testing of all 48 components on live site
- 🔧 MCP server integration testing with Claude Desktop/Cursor
- 🔧 Accessibility audit with axe-core
- 🔧 Visual regression testing against shadcn/ui

**Documentation:**
- See `/docs/QUALITY_VERIFICATION_REPORT.md` for detailed findings

#### ✅ Phase 4: Legacy Migration (Complete - 2026-01-15)

**Decision:** Skipped formal deprecation since all usage is internal (3 apps). Went directly to migration.

**Status:** 100% complete

**Infrastructure Setup (2026-01-14):**
- ✅ Created complete infrastructure in @thesage/ui:
  - `lib/syntax-parser/` - Full tokenizer for code highlighting
  - `lib/store/` - Theme and customizer stores
  - `lib/validation.ts` - Form validation utilities
  - `lib/breadcrumbs/`, `lib/typography/`, `lib/patterns/`, `lib/animations/`, `lib/colors/`
  - `providers/ThemeProvider.tsx` - Theme management
  - `hooks/useTheme.ts`, `hooks/useMotionPreference.ts`, `hooks/useForm.ts`

**Subpath Exports Configuration (2026-01-15):**
- ✅ Configured package.json exports field for better developer experience:
  - `@thesage/ui/tokens` - Re-exports from @thesage/tokens
  - `@thesage/ui/hooks` - useTheme, useMotionPreference, useForm
  - `@thesage/ui/utils` - animations, breadcrumbs, colors, utils, validation, syntax-parser
  - `@thesage/ui/providers` - ThemeProvider
- ✅ Created entry point files: `src/tokens.ts`, `src/hooks.ts`, `src/utils.ts`, `src/providers.ts`
- ✅ Updated build configuration to generate TypeScript declarations (tsup --dts)
- ✅ Moved @thesage/tokens from devDependencies to dependencies
- ✅ Added framer-motion as peer dependency for VariableWeightText component

**Components Migrated (44+ components):**
- ✅ All legacy components migrated to functional categories:
  - **Actions:** Link
  - **Forms:** ThemeSwitcher, ThemeToggle, TextField, SearchBar, FilterButton
  - **Navigation:** NavLink, Breadcrumbs (aliased to Breadcrumb)
  - **Data Display:** Code, CollapsibleCodeBlock, GitHubIcon, Heading, Text, Brand, VariableWeightText
  - **Layout:** Header, Footer, SecondaryNav, TertiaryNav, PageLayout, CustomizerPanel, Container, Stack, Grid
  - **Feedback:** Toast (ToastProvider, useToast)

**New Components Added (Not in Legacy):**
- ✅ **TextField** - Text input with outlined/filled variants, error states, helper text
- ✅ **SearchBar** - Specialized search input with debouncing and clear button
- ✅ **VariableWeightText** - Motion component with font-weight animation for variable fonts

**Architecture Fix:**
- ✅ Removed atomic design directories (`components/molecules/`, `components/organisms/`)
- ✅ Reorganized all components into strict functional categories
- ✅ Updated all index.ts exports to match functional structure
- ✅ Updated main barrel export in `src/index.ts`

**App Import Migration (44 files updated):**
- ✅ **Portfolio app** - 15 files migrated:
  - Fixed legacy imports (`@thesage/ui/atoms`, `@thesage/ui/features/customizer`)
  - Updated component APIs (SearchInput → SearchBar with new onChange handler)
  - Fixed Badge variant API (variant="primary" → variant="default")
- ✅ **Creative Powerup app** - 3 files migrated:
  - Fixed legacy imports in ExperimentCard and contribute page
- ✅ **Sage Studio app** - 26+ files migrated:
  - Updated all component imports to use @thesage/ui root import

**Build Verification (All Apps):**
- ✅ @thesage/ui package builds successfully with TypeScript declarations
- ✅ Sage Studio: Compiled successfully (5.0s)
- ✅ Portfolio: Compiled successfully (3.1s)
- ✅ Creative Powerup: Compiled successfully (2.8s)
- ✅ Production deployment verified with zero errors

**Legacy Package Removal:**
- ✅ Removed `@ecosystem/design-system` from all package.json dependencies
- ✅ Deleted `/design-system` directory (114 files removed)
- ✅ Verified all apps build successfully post-deletion

**Commit:**
- `b7adaaf` - "Phase 4 Complete: Remove legacy @ecosystem/design-system package"

**Key Achievements:**
- Zero breaking changes during migration
- All apps remained functional throughout process
- Improved package architecture with subpath exports
- Added 3 new components not in legacy package
- Complete TypeScript declaration generation
- Production-verified across 3 applications

#### 📋 Phase 5: Assemblies & Templates (Planned)

**Goals:**
- Build Tier 2 (Assemblies) - 20+ composed components
- Build Tier 3 (Templates) - 10+ page layouts
- Enable "solopreneur acceleration"

**Triggers:** Phase 4 complete, legacy package removed

---

## Quality Standards

### Definition of "Component Complete"

A component is ONLY complete when ALL criteria are met:

- [ ] **Renders correctly** in browser (not just builds)
- [ ] **Visual match** with shadcn/ui reference
- [ ] **Animations smooth** with correct timing (typically 0.2s ease-out)
- [ ] **Interactive behaviors** work (clicks, hovers, focus states)
- [ ] **Responsive** across mobile, tablet, desktop
- [ ] **Accessible** (WCAG 2.1 AA minimum, axe-core clean)
- [ ] **Dark mode** works correctly
- [ ] **No console errors** or warnings
- [ ] **Code matches** latest shadcn implementation
- [ ] **Documentation complete** in component registry:
  - Component description and use cases
  - All props documented with types and defaults
  - Code examples with syntax highlighting
  - Accessibility notes
  - GitHub source link
- [ ] **Studio page functional** at https://studio.shalomormsby.com/:
  - Dedicated component page accessible via navigation
  - Working "Preview" section showing component in action
  - Interactive "Customize" controls for all props
  - Live prop updates (changes reflected immediately)
  - Multiple example variations
  - Copy-paste code snippets

### Quality Gates

#### Velocity-Optimized Phases (1-3)
- Accessibility non-negotiable
- Critical path testing only
- Ship fast, fix fast mentality

#### Post-Launch Hardening (3.5+)
- 80% test coverage target
- Visual regression baseline
- Comprehensive documentation
- Performance audits

### Testing Requirements

#### Browser Testing (Manual - Required)

For each component:
1. Open in Studio at localhost:3001
2. Test all interactive states
3. Verify animations are smooth
4. Check dark mode
5. Test responsive breakpoints
6. Validate accessibility with screen reader

#### Automated Testing ✅

- **Unit tests:** Vitest + React Testing Library — 63 tests across 10 files, CI-enforced
- **Components tested:** Button, Dialog, Input, Select, Tabs, Accordion, Card, Progress, Switch, useMotionPreference
- **Bundle tracking:** size-limit enforced for 10 entry points in CI
- Accessibility tests with axe-core (planned)
- Visual regression with Chromatic or Percy (planned)
- E2E with Playwright (planned)

---

## Development Workflow

### Adding a New shadcn Component

#### 1. Fetch Component

```bash
# From packages/ui directory
npx shadcn@latest add [component-name]
```

This copies the component to `src/components/[ComponentName].tsx`

#### 2. Organize into Category

Move component to appropriate functional category:

```bash
mv src/components/ComponentName.tsx src/components/[category]/
```

Update imports in the component (if needed):
```typescript
// Change relative imports to account for new location
import { cn } from "../../lib/utils"  // was "../lib/utils"
```

#### 3. Update Category Index

Add export to `src/components/[category]/index.ts`:

```typescript
export * from './ComponentName';
```

#### 4. Update Main Barrel Export

Add to `src/index.ts` under appropriate category section:

```typescript
// [Category]
export * from './components/[category]/ComponentName';
```

#### 5. Build Package

```bash
pnpm build
```

#### 6. Add to Component Registry

Update `/apps/web/app/components/lib/component-registry.tsx`:

```typescript
export const componentRegistry: Record<string, ComponentConfig> = {
  ComponentName: {
    component: ComponentName,
    description: 'Clear, concise description',
    props: {
      variant: {
        type: 'select',
        options: ['default', 'destructive'] as const,
        default: 'default',
        description: 'Visual style variant',
      },
      // ... other props
    },
    examples: [
      {
        label: 'Default',
        props: { variant: 'default' },
        children: <span>Example content</span>,
      },
    ],
    sourceUrl: 'https://github.com/shadcn-ui/ui/tree/main/apps/www/registry/default/ui/component-name.tsx',
    accessibilityNotes: [
      'Uses semantic HTML elements',
      'Keyboard navigable',
      // ... other notes
    ],
  },
};
```

#### 7. Add to Studio Navigation

Update `/apps/web/app/components/studio/ComponentsSection/index.tsx`:

Add component name to appropriate category in `COMPONENT_CATEGORIES`:

```typescript
const COMPONENT_CATEGORIES = {
  [category]: {
    label: 'Category Label',
    description: 'Category description',
    components: ['ExistingComponent', 'ComponentName'], // Add here
  },
  // ...
};
```

#### 8. Test in Browser

```bash
cd apps/web
pnpm dev
```

Navigate to the component and verify:
- Renders correctly
- All props work
- Animations are smooth
- Dark mode works
- No console errors

### Fixing Component Issues

#### Compare with shadcn Source

1. Go to https://ui.shadcn.com/docs/components/[component-name]
2. View source on GitHub
3. Compare line-by-line with Sage UI implementation
4. Note differences in CSS classes, animation timing, structure

#### Common Issues & Fixes

**Transparent backgrounds:**
- Add missing theme tokens to `/packages/tokens/src/studio.ts`
- Rebuild tokens: `cd packages/tokens && pnpm build`

**Animations jumping:**
- Add keyframes to `/packages/config/tailwind/index.js`
- Use Radix CSS custom properties (e.g., `--radix-accordion-content-height`)

**Import errors:**
- Fix relative paths after moving to categories
- Cross-category imports need `../category/Component` paths

**Registry naming mismatch:**
- Add alias entries for kebab-case → PascalCase mismatches

### Build Commands

```bash
# Root directory
cd /Users/shalomormsby/Developer/work/ecosystem

# Rebuild all packages
pnpm build

# Rebuild specific package
pnpm build --filter=@thesage/ui
pnpm build --filter=@thesage/tokens
pnpm build --filter=@ecosystem/web

# Start Studio dev server
cd apps/web
pnpm dev
# Opens on http://localhost:3001

# Kill dev server if port is in use
lsof -i :3001  # Find PID
kill -9 <PID>  # Replace with actual process ID
```

### Git Workflow

```bash
# Feature branch for major changes
git checkout -b feat/component-name

# Incremental commits for phases
git add .
git commit -m "feat(ui): Add ComponentName to [category] category"

# Push and test
git push origin feat/component-name

# Merge when verified
git checkout main
git merge feat/component-name
```

---

## MCP (Model Context Protocol) Server

### Overview

The MCP server will enable AI assistants (like Claude Desktop, Cursor, and others) to directly interact with the Sage UI. This is a critical piece of the AI-native development workflow.

**Reference:** https://ui.shadcn.com/docs/mcp

### What is MCP?

The Model Context Protocol (MCP) is an open standard for connecting AI assistants to external systems. It allows LLMs to:
- Query available components
- Search by functionality or category
- Get detailed component information (props, examples, accessibility)
- Install components directly into user projects
- Receive contextual component recommendations

### Why It's Essential

1. **Removes Friction:** Developers can ask "add a date picker" and the AI handles the entire installation
2. **Semantic Discovery:** AI understands component purposes, not just names
3. **Context-Aware:** Recommendations based on existing code and project structure
4. **Copy-Paste Elimination:** Direct installation replaces manual code copying
5. **Solopreneur Acceleration:** Dramatically speeds up UI development with AI assistance

### Planned Features

#### MVP (Q2 2026)
- **Component Listing:** List all available components with categories
- **Component Search:** Semantic search across component library
- **Component Details:** Get props, examples, and documentation
- **Component Installation:** Add component files to user project
- **Integration:** Works with Claude Desktop and other MCP clients

#### Future Enhancements
- **Smart Recommendations:** Suggest components based on context
- **Dependency Resolution:** Auto-install required dependencies
- **Code Generation:** Generate component usage examples
- **Project Analysis:** Scan project and suggest missing components
- **Update Notifications:** Alert when component updates available

### Implementation Plan

**Phase 1: Server Setup**
- Create MCP server package (`@thesage/mcp`)
- Implement component listing endpoint
- Add search functionality
- Set up authentication (if needed)

**Phase 2: Tools Implementation**
- `list-components` - List all available components
- `search-components` - Search by keyword or category
- `get-component` - Get detailed component information
- `install-component` - Add component to user project

**Phase 3: Integration**
- Package for npm distribution
- Documentation for setup and usage
- Test with Claude Desktop
- Test with Cursor and other MCP clients

**Phase 4: Enhancement**
- Smart recommendations based on project context
- Component update tracking
- Usage analytics (anonymous)
- Community component registry

### Technical Architecture

```typescript
// Example MCP tool definitions
{
  tools: [
    {
      name: "list-components",
      description: "List all available Sage UI components",
      parameters: {
        category?: string,  // Filter by category
        search?: string,    // Search query
      }
    },
    {
      name: "install-component",
      description: "Install a component into the user's project",
      parameters: {
        component: string,     // Component name (e.g., "Button")
        targetPath?: string,   // Optional custom path
      }
    }
  ]
}
```

### Success Metrics

- [ ] MCP server responds to component queries
- [ ] Claude Desktop can list Sage UI components
- [ ] Components install correctly via MCP
- [ ] Search returns relevant results
- [ ] Integration works in real projects
- [ ] Documentation is clear and complete

### Strategic Priority

**HIGH** - This is a key differentiator for the "AI-native" positioning. shadcn/ui's MCP server is a major competitive advantage, and Sage UI should match or exceed this capability.

---

## Roadmap

### Immediate (Q1 2026)

- [x] ✅ Functional organization restructure
- [x] ✅ Studio navigation update
- [x] ✅ **MCP Server MVP** (2026-01-14)
  - Complete component registry with all 48 components
  - Four MCP tools: list, search, get, install
  - Multi-client support (Claude Desktop, Cursor, VS Code)
  - Full documentation at studio site
  - Package: @thesage/mcp v0.1.0
- [x] ✅ **Quality Verification Phase** (2026-01-14)
  - Component registry audit complete (48/48)
  - Fixed missing Input and Label components in Studio
  - MCP server tested and verified
  - Comprehensive verification report created
  - Manual browser testing documented
- [ ] 📋 Complete manual browser testing of all components on live site
- [ ] 📋 Add smoke tests for critical components
- [ ] 📋 Document migration guide from legacy components

### Short Term (Q1-Q2 2026)

- [x] ✅ **Phase 4: Legacy Migration** (Complete 2026-01-15)
  - [x] Infrastructure setup (syntax-parser, stores, hooks, providers)
  - [x] Subpath exports configuration (tokens, hooks, utils, providers)
  - [x] All 44+ components migrated with functional organization
  - [x] 3 new components added (TextField, SearchBar, VariableWeightText)
  - [x] Build @thesage/ui package successfully with TypeScript declarations
  - [x] Migrated all app imports across 44 files (Portfolio, Creative Powerup, Studio)
  - [x] Removed legacy package (114 files deleted)
  - [x] Production deployment verified with zero errors

- [ ] 📋 Testing infrastructure
  - Set up Vitest + React Testing Library
  - Add accessibility testing with axe-core
  - 80% coverage target

- [ ] 📋 **MCP Server Enhancements**
  - Smart recommendations based on project context
  - Component update tracking
  - Usage analytics (anonymous)
  - Community component registry integration

### Medium Term (Q2-Q3 2026)

- [ ] 📋 Visual regression testing (Chromatic or Percy)
- [ ] 📋 Performance optimization audit

### Long Term (Q4 2026+)

- [ ] 📋 Phase 5: Assemblies (Tier 2)
  - 20+ composed components
  - LoginForm, PricingTable, StatCard, etc.

- [ ] 📋 Phase 5: Templates (Tier 3)
  - 10+ page layouts
  - DashboardLayout, MarketingLanding, etc.

- [ ] 📋 Component generator CLI
  - Scaffold new components from templates
  - Auto-generate registry entries
  - Validate component completeness

- [ ] 📋 Visual component gallery with search
  - Interactive showcase of all components
  - Filter by category, props, use cases
  - Copy-paste code snippets

- [ ] 📋 Figma integration for design tokens
  - Sync tokens with Figma variables
  - Export component specs from Figma
  - Design-to-code workflow

---

## Decision Log

### Major Decisions

**2026-01-15 - Legacy Migration Complete (Phase 4)**
- Successfully completed migration from `@ecosystem/design-system` to `@thesage/ui`
- **Subpath exports configured** for improved developer experience:
  - `@thesage/ui/tokens`, `@thesage/ui/hooks`, `@thesage/ui/utils`, `@thesage/ui/providers`
  - Created dedicated entry point files for each subpath
  - Updated build configuration to generate TypeScript declarations with tsup --dts
- **44+ components migrated** with strict functional organization
- **3 new components added**: TextField, SearchBar, VariableWeightText (not in legacy package)
- **44 files updated** across 3 applications (Portfolio, Creative Powerup, Studio)
- **114 files deleted** from legacy design-system package
- **Zero breaking changes** - all apps remain functional and production-verified
- **Production deployment successful** with zero build errors
- Commit: `b7adaaf` - "Phase 4 Complete: Remove legacy @ecosystem/design-system package"
- Next phase: Assemblies & Templates (Tier 2 and Tier 3 components)

**2026-01-14 - Legacy Migration Started (Phase 4)**
- Decided to skip formal deprecation phase since all usage is internal (3 apps only)
- Going directly from quality verification to component migration
- Created infrastructure in @thesage/ui: syntax-parser, stores, hooks, providers
- Migrated 15+ critical components to functionally organized structure
- **Critical fix**: Removed molecules/ and organisms/ directories created by error
- All components now strictly organized by function (actions/forms/navigation/overlays/feedback/data-display/layout)

**2026-01-14 - MCP Server Configured in Claude Desktop**
- Added @thesage/mcp to Claude Desktop config at `~/Library/Application Support/Claude/claude_desktop_config.json`
- Configuration uses local path: `node /Users/shalomormsby/Developer/work/ecosystem/packages/sds-mcp-server/dist/index.js`
- Enables Claude Desktop to browse, search, and get installation instructions for all 48 Sage UI components
- Verified MCP server functionality with all four tools working

**2026-01-14 - Quality Verification Complete**
- Audited all 48 components across MCP server, @thesage/ui, and Studio registry
- Found and fixed 2 critical missing components (Input and Label) in Studio registry
- Verified MCP server has 100% component coverage with working search
- Created comprehensive verification report with manual testing checklist
- All packages building successfully with no TypeScript errors
- Ready for manual browser testing phase

**2026-01-14 - MCP Server MVP Complete**
- Implemented Model Context Protocol server at `@thesage/mcp`
- Created comprehensive component registry with all 48 components
- Built four MCP tools: `list_components`, `search_components`, `get_component`, `install_component`
- Added full documentation to studio site with dedicated page
- Enables AI assistants (Claude Desktop, Cursor, VS Code) to interact with SDS
- Strategic priority achieved: Sage UI is now truly AI-native

**2026-01-14 - Functional Organization Implemented**
- Restructured all 48 @thesage/ui components into 7 functional categories
- Updated Studio navigation to match
- Zero breaking changes (backward compatible exports)
- Aligns Sage UI with modern design system patterns

**2026-01-13 - Functional Organization Strategy Approved**
- Decided to abandon atomic design classification
- Adopted industry-standard functional categories
- Prioritized developer ergonomics over theoretical purity

**2026-01-12 - Phase 3 Complete (100% Shadcn Parity)**
- All 43 shadcn components implemented
- Quality hardening identified and fixed major issues
- Search index restored, animations smoothed

**2026-01-10 - Token Integration Automation Verified**
- Confirmed `components.json` auto-maps tokens correctly
- Zero manual refactoring needed per component
- Established as prerequisite for all component work

### Lessons Learned

**Build Success ≠ Working Component**
- TypeScript compilation doesn't verify visual correctness
- Browser testing is mandatory before marking complete
- Automated tests can't replace human verification (yet)

**Functional Organization Reduces Friction**
- Developers think in terms of function, not abstraction
- Category-based navigation improves discoverability
- Modern design systems are moving this direction

**Quality Gates Prevent Rework**
- Skipping testing to ship fast leads to slower overall progress
- Hardening early is faster than fixing later
- "Ship fast, fix fast" requires fast feedback loops

---

## Contributing

### For Humans

1. Read this document completely
2. Review component registry and existing patterns
3. Follow the development workflow above
4. Test thoroughly before marking complete
5. Update documentation with changes

### For AI Agents

1. **Context is in this file** - no need to search elsewhere
2. **Never assume** code works because it builds
3. **Browser verification** is mandatory
4. **Compare against shadcn** source line-by-line
5. **Update this document** when making structural changes

---

## Key Files Reference

### Component Implementation
- **Components:** `/packages/ui/src/components/[category]/`
- **Barrel Exports:** `/packages/ui/src/index.ts`
- **Utils:** `/packages/ui/src/lib/utils.ts`

### Theme & Styling
- **Tailwind Config:** `/packages/config/tailwind/index.js`
- **Design Tokens:** `/packages/tokens/src/studio.ts`
- **Global CSS:** `/apps/web/app/globals.css`

### Studio Configuration
- **Component Registry:** `/apps/web/app/components/lib/component-registry.tsx`
- **Navigation:** `/apps/web/app/components/studio/ComponentsSection/index.tsx`

### Documentation
- **Strategy (this file):** `/apps/web/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md`
- **Changelog:** `/apps/web/CHANGELOG.md`

---

## Resources

### External References
- **shadcn/ui:** https://ui.shadcn.com/
- **Radix UI:** https://www.radix-ui.com/
- **Tailwind CSS:** https://tailwindcss.com/
- **React Hook Form:** https://react-hook-form.com/
- **Zod:** https://zod.dev/

### Internal Resources
- **GitHub:** https://github.com/shalomormsby/ecosystem
- **Studio (dev):** http://localhost:3001
- **Vercel (prod):** [URL TBD]

---

**Document Version:** 1.1.0
**Last Review:** 2026-02-06
**Next Review:** 2026-03-01
