# Sage Design System (SDS) vs Shadcn Parity Strategy

This document outlines the strategy to reach full feature parity with Shadcn/ui efficiently and ethically, while organizing the system for the long-term goal of enabling rapid development of complex applications.

## Prerequisites

Before beginning component migration, verify the following:

1. **Token Integration Automation**
   - Configure `components.json` (Shadcn CLI config) to automatically use SDS CSS variables
   - Update Shadcn's theme mapping to point to our existing tokens (e.g., `--color-primary`)
   - Test one component end-to-end to validate automated token mapping works
   - **Goal**: Zero manual token refactoring per component
   - Document the `components.json` configuration for reference

2. **Legacy Component Audit & CSS Isolation**
   - Identify all current usages of legacy components across the ecosystem
   - Document breaking changes for each migration
   - **Prevent CSS Conflicts**: Ensure legacy component styles are scoped (module CSS, unique class prefixes)
   - Verify no global style bleeding between legacy `Modal` and new `Dialog`, etc.
   - Consider namespacing legacy components (e.g., `.legacy-modal`) if conflicts arise

3. **Testing Infrastructure**
   - Set up Vitest + React Testing Library for unit tests
   - Configure accessibility testing with axe-core
   - Establish visual regression testing (Chromatic or Percy)

4. **Package Architecture**
   - Verify monorepo build configuration (Turborepo)
   - Ensure shared Radix UI version management across workspace
   - Set up independent semantic versioning for packages

## 1. Component State Analysis

The following table compares the current state of SDS components against the standard Shadcn UI library.

**Legend:**
*   ✅ **@sds/ui**: Implemented in the modern, Radix-based package.
*   ⚠️ **Legacy**: Exists in `@ecosystem/design-system` but needs migration to `@sds/ui`.
*   ❌ **Missing**: Not yet present in SDS.

| Component | SDS Status | Shadcn | Priority | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Accordion** | ❌ Missing | Available | Medium | Essential for FAQs and collapsed content. |
| **Alert** | ❌ Missing | Available | **Critical** | Essential for feedback messages. |
| **Alert Dialog** | ❌ Missing | Available | Medium | |
| **Aspect Ratio** | ⚠️ Legacy (`AspectImage`) | Available | Low | |
| **Avatar** | ⚠️ Legacy | Available | High | Needs migration to `@sds/ui`. |
| **Badge** | ✅ @sds/ui | Available | Done | |
| **Breadcrumb** | ⚠️ Legacy | Available | Medium | |
| **Button** | ✅ @sds/ui | Available | Done | |
| **Calendar** | ❌ Missing | Available | Low | Complex, add when needed. |
| **Card** | ✅ @sds/ui | Available | Done | |
| **Carousel** | ❌ Missing | Available | Low | |
| **Checkbox** | ✅ @sds/ui | Available | Done | |
| **Collapsible** | ❌ Missing | Available | Medium | |
| **Combobox** | ❌ Missing | Available | High | Often requested for forms. |
| **Command** | ❌ Missing | Available | High | Basis for command palettes. |
| **ContextMenu** | ❌ Missing | Available | Low | |
| **Data Table** | ❌ Missing | Available | **Critical** | Essential for dashboards and data display. |
| **Date Picker** | ❌ Missing | Available | Medium | |
| **Dialog (Modal)** | ⚠️ Legacy (`Modal`) | Available | **Critical** | Major UI building block. |
| **Drawer** | ❌ Missing | Available | Medium | Good for mobile. |
| **Dropdown Menu** | ⚠️ Legacy (`Dropdown`) | Available | **Critical** | Essential for actions. |
| **Form** | ⚠️ Legacy | Available | **Critical** | `react-hook-form` + `zod` integration. |
| **Hover Card** | ❌ Missing | Available | Low | |
| **Input** | ✅ @sds/ui | Available | Done | |
| **Input OTP** | ❌ Missing | Available | Low | |
| **Label** | ✅ @sds/ui | Available | Done | |
| **Menubar** | ❌ Missing | Available | Low | Desktop app feel. |
| **Navigation Menu** | ❌ Missing | Available | Medium | For complex headers. |
| **Pagination** | ❌ Missing | Available | Medium | |
| **Popover** | ❌ Missing | Available | High | |
| **Progress** | ⚠️ Legacy (`ProgressBar`) | Available | Medium | Needs migration. |
| **Radio Group** | ❌ Missing | Available | **Critical** | Basic form element. |
| **Resizable** | ❌ Missing | Available | Low | |
| **Scroll Area** | ✅ @sds/ui | Available | Done | |
| **Select** | ✅ @sds/ui | Available | Done | |
| **Separator** | ✅ @sds/ui | Available | Done | |
| **Sheet** | ❌ Missing | Available | **Critical** | Sidebars, panels. |
| **Skeleton** | ✅ @sds/ui | Available | Done | |
| **Slider** | ❌ Missing | Available | Medium | |
| **Sonner (Toast)** | ❌ Missing | Available | High | A better toast experience. |
| **Switch** | ✅ @sds/ui | Available | Done | |
| **Table** | ❌ Missing | Available | **Critical** | Basic data presentation. |
| **Tabs** | ❌ Missing | Available | High | Content organization. |
| **Textarea** | ❌ Missing | Available | High | Form element. |
| **Toast** | ✅ @sds/ui | Available | Done | |
| **Toggle** | ❌ Missing | Available | Low | |
| **Toggle Group** | ❌ Missing | Available | Low | |
| **Tooltip** | ⚠️ Legacy | Available | Medium | Needs migration. |

## 2. Strategy for Efficient Parity

To efficiently reach parity while maintaining an "ethical" and high-quality codebase, we will adopt the following strategy:

### A. The "Adoption" Workflow (Ethical & Efficient)
Shadcn/ui is designed to be "owned" code, not a node_module dependency. This is the most ethical usage as it complies with their philosophy: copy, paste, and customize.

#### Component Addition Checklist

For each component added, follow this workflow:

1.  **Automated Ingestion**: Use the `shadcn` CLI to pull component code directly into `packages/ui`.
    ```bash
    cd packages/ui
    npx shadcn@latest add [component-name]
    ```

2.  **Instant Refine**: Immediately refactor the added component:
    *   **Tokens**: Should be automatic via `components.json` config - verify it works, no manual changes needed
    *   **Exports**: Export the component from `packages/ui/src/index.ts`
    *   **Customize**: Apply SDS-specific defaults or styling if needed (document all deviations)

3.  **Testing**: Write tests based on phase requirements (see Staged Quality Gates)
    *   **Phase 1 (Critical)**: Critical path tests + accessibility tests with axe-core
    *   **Phase 2/3**: Same as Phase 1 (move fast, backfill later)
    *   **Post-Phase 3**: Backfill to 80% coverage + visual regression baseline

4.  **Documentation**:
    *   Add component to `apps/sage-design-studio/.../component-registry.tsx`
    *   Document API, props, and usage examples
    *   Note any customizations or deviations from Shadcn defaults

5.  **Review**: Code review focusing on:
    *   Token integration
    *   Accessibility compliance (WCAG 2.1 AA)
    *   Browser compatibility
    *   Dark mode support

### B. Migration of Legacy Components

We currently have a split state between `packages/ui` (New) and `design-system` (Old).

**Migration Strategy:**
1.  **Freeze Legacy**: Stop adding to `design-system/atoms|molecules`
2.  **Isolate CSS**: Ensure legacy styles are scoped to prevent conflicts with new components (critical during Phases 1-5 when both exist)
3.  **Replace**: For items like `Modal` (Legacy), install Shadcn `Dialog` into `packages/ui` and deprecate the legacy `Modal`
4.  **Add Deprecation Warnings**: Update legacy components with console warnings pointing to new imports
5.  **Update Consumers**: Migrate all internal usage to `@sds/ui` imports
6.  **Breaking Change**: Remove legacy components in a major version bump with proper communication

**Legacy Components Requiring Migration:**
- Dialog (Modal) → `@sds/ui/dialog`
- Dropdown Menu → `@sds/ui/dropdown-menu`
- Form → `@sds/ui/form`
- Avatar → `@sds/ui/avatar`
- Breadcrumb → `@sds/ui/breadcrumb`
- Progress → `@sds/ui/progress`
- Tooltip → `@sds/ui/tooltip`
- Aspect Ratio (AspectImage) → `@sds/ui/aspect-ratio`

### C. Staged Quality Gates

To maximize velocity while maintaining quality, we use **staged quality gates** that increase rigor after core functionality is complete.

#### Phase 1-3: Velocity-Optimized Quality Gate

**Purpose**: Move fast, ship components, get them in use
**Requirements:**

**Accessibility (Non-negotiable):**
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Passing axe-core automated tests

**Testing (Critical Path Only):**
- Test primary user interactions (click, type, submit, etc.)
- Test accessibility with axe-core
- Test dark mode support
- **No coverage requirement** - focus on critical paths
- **No visual regression** - defer until Post-Phase 3

**Browser Support:**
- Manual testing in Chrome + Safari (primary browsers)
- Defer exhaustive cross-browser testing

**Design System Integration:**
- Uses SDS design tokens (automated via `components.json`)
- Supports light and dark modes
- Consistent API patterns with existing components

**Documentation (Lightweight):**
- Add to component registry with basic example
- Document props and variants
- Defer comprehensive docs

#### Post-Phase 3: Backfill Quality Gate

**Purpose**: Harden components for production, increase confidence

**Testing Backfill:**
- Increase coverage to 80% across all components
- Test all interactive states and edge cases
- Establish visual regression baseline (Chromatic/Percy)
- Add integration tests for complex components

**Browser Support Backfill:**
- Test in Firefox, Edge, mobile browsers
- Fix cross-browser issues

**Documentation Backfill:**
- Add comprehensive usage examples
- Document all props with descriptions
- Add accessibility usage notes
- Create migration guides for legacy replacements

**Rationale**: This approach prevents testing overhead from blocking component availability in Phases 1-3, while ensuring we don't ship inaccessible or broken components. We backfill comprehensive testing once all primitives exist.

## 3. Organization Proposal

To scale from "Lego blocks" to "Solopreneur Templates", we should organize the library into three distinct tiers.

### Tier 1: Primitives (The "Parts")
*Location: `@sds/ui` (and Shadcn parity)*
These are the dumb, stateless, accessible building blocks.
*   *Examples*: Button, Input, Dialog, Switch, Card.
*   *Goal*: 100% Shadcn parity.

### Tier 2: Assemblies (The "Modules")
*Location: `@sds/assemblies` (New Package Proposal)*
These are functional, feature-ready compositions of Primitives. They solve a specific UI problem.
*   *Examples*: `LoginForm`, `CreditCardForm`, `PricingTable`, `CookieConsent`, `CommentSection`.
*   *Value*: This is where the "speed" comes from. A user doesn't just want a `Input` and a `Button`; they want a `NewsletterSignup`.

### Tier 3: Templates (The "Blueprints")
*Location: `@sds/templates`*
Full page layouts or entire app shells.
*   *Examples*: `SaaSDashboardDetails`, `MarketingLandingPage`, `SettingsLayout`.

## 4. Phased Migration Plan

### Phase 1: Critical Components + Foundation
**Goal**: Establish core building blocks and validate workflow

**Components to Add:**
- Alert (new)
- Dialog (replaces Modal)
- Dropdown Menu (replaces Dropdown)
- Form (replaces legacy Form)
- Radio Group (new)
- Sheet (new)
- Table (new)
- Data Table (new)

**Additional Tasks:**
- **Configure `components.json`** for automated token mapping (Prerequisite 1)
- Verify CSS isolation between legacy and new components (Prerequisite 2)
- Set up testing infrastructure (Vitest + axe-core)
- Validate entire adoption workflow with first component (e.g., Alert)
- Establish velocity-optimized quality gate baseline

**Success Criteria:**
- All 8 critical components passing Phase 1-3 quality gates
- Testing infrastructure operational
- **Zero manual token refactoring required** (automated via `components.json`)
- No CSS conflicts between legacy and new components
- Component registry updated with all 8 components

---

### Phase 2: High Priority Components
**Goal**: Add frequently-requested form elements and UI patterns

**Components to Add:**
- Avatar (migrate from legacy)
- Combobox
- Command
- Popover
- Tabs
- Textarea
- Sonner (Toast replacement/enhancement)

**Success Criteria:**
- All high-priority components available
- Legacy Avatar migrated
- Form-building capabilities complete

---

### Phase 3: Complete Component Coverage
**Goal**: Achieve 100% Shadcn parity - add ALL remaining components

**Components to Add:**
- Accordion
- Alert Dialog
- Aspect Ratio (migrate from AspectImage)
- Breadcrumb (migrate from legacy)
- Calendar
- Carousel
- Collapsible
- Context Menu
- Date Picker
- Drawer
- Hover Card
- Input OTP
- Menubar
- Navigation Menu
- Pagination
- Progress (migrate from ProgressBar)
- Resizable
- Slider
- Toggle
- Toggle Group
- Tooltip (migrate from legacy)

**Success Criteria:**
- 100% Shadcn component parity achieved
- All legacy components have modern equivalents
- Complete primitive (Tier 1) library ready

**Note**: After Phase 3, schedule a **Testing & Documentation Backfill Sprint** to harden all components before Phase 4. This includes 80% test coverage, visual regression, comprehensive docs, and cross-browser testing.

---

### Phase 4: Legacy Deprecation
**Goal**: Prepare ecosystem for breaking changes

**Tasks:**
- Add deprecation warnings to all legacy components
- Create migration guides for each legacy → modern component
- Update all internal apps to use `@sds/ui` imports
- Document breaking changes for next major version
- Communicate timeline to all consumers

**Success Criteria:**
- Zero internal usage of legacy components
- Migration guides published
- Deprecation warnings active
- Breaking change documentation complete

---

### Phase 5: Legacy Removal (Breaking Change)
**Goal**: Clean up codebase and remove technical debt

**Tasks:**
- Remove all legacy components from `design-system`
- Publish major version bump
- Archive old package or mark as deprecated
- Update all documentation to reference only `@sds/ui`

**Success Criteria:**
- Clean, unified component library
- No duplicate components
- Simplified package structure
- Reduced bundle size

---

### Phase 6: Assemblies & Templates (Solopreneur Acceleration)
**Goal**: Build high-velocity development tools by assembling primitives into ready-to-use components

**Package Structure:**

#### `@sds/assemblies` (New Package)
Feature-ready compositions that solve specific UI problems:

**Authentication & User Management:**
- LoginForm (email/password + OAuth options)
- SignupForm (validation + password strength)
- ForgotPasswordForm
- UserProfileCard
- AccountSettingsPanel

**E-commerce:**
- ProductCard
- PricingTable (with tier comparison)
- CheckoutSummary
- CreditCardForm (with validation)
- OrderHistoryTable

**Content & Communication:**
- CommentSection (nested threads)
- NewsletterSignup
- ContactForm
- FeedbackWidget
- NotificationCenter

**Dashboard & Data:**
- StatCard (with trend indicators)
- ChartContainer (with legend, tooltips)
- FilterPanel
- DataTableWithFilters
- KPIDashboard

**Onboarding & Modals:**
- OnboardingFlow (multi-step wizard)
- CookieConsent
- UpgradePrompt
- DeleteConfirmationDialog

#### `@sds/templates` (New Package)
Full page layouts and app shells:

**Marketing:**
- LandingPageHero
- FeaturesGrid
- PricingPage
- TestimonialsSection
- BlogPostLayout

**Application:**
- SaaSDashboard
- SettingsLayout (with sidebar navigation)
- UserProfilePage
- DataTablePage
- EmptyState templates

**Shared Layouts:**
- AppShell (header, sidebar, content)
- AuthenticationLayout
- MarketingLayout
- DocumentationLayout

**Phase 6 Tasks:**
1. Create `@sds/assemblies` package with proper build config
2. Create `@sds/templates` package
3. Build assemblies by composing Tier 1 primitives
4. Add comprehensive examples to design studio
5. Create template showcase gallery
6. Document composition patterns and best practices
7. Add copy-paste code snippets for rapid integration

**Success Criteria:**
- 20+ production-ready assemblies
- 10+ full page templates
- All assemblies have usage examples
- Copy-paste snippets available
- Templates significantly reduce time-to-market for common pages
- Solopreneurs can build complete app pages in hours instead of days

---

## 5. Success Metrics & Tracking

**Component Parity:**
- Track completion percentage for each phase
- Target: 100% Shadcn parity by end of Phase 3

**Adoption Metrics:**
- Monitor usage of `@sds/ui` vs legacy components across all apps
- Track import statements in codebase
- Target: 100% migration before Phase 5

**Quality Metrics:**
- Test coverage percentage (target: 80%+)
- Accessibility audit pass rate (target: 100% WCAG 2.1 AA)
- Visual regression test stability

**Developer Velocity (Phase 6):**
- Time to build common pages (before vs after assemblies/templates)
- Reduction in boilerplate code
- Developer satisfaction surveys

**Bundle Size:**
- Monitor package size with each addition
- Ensure tree-shaking works properly
- Target: No more than 20% increase from current baseline

**Maintenance Burden:**
- Track time spent on component updates
- Monitor dependency update frequency
- Track number of component-related bugs

---

## 6. Customization Principles

When adapting Shadcn components for SDS:

**Prefer Composition Over Modification:**
- Build on top of Shadcn primitives rather than modifying internals
- Use wrapper components for SDS-specific behavior

**Maintain Radix Primitives Unchanged:**
- Don't modify underlying Radix UI components
- Keep accessibility features intact

**Styling Guidelines:**
- Use SDS design tokens for all styling
- Customize only visual appearance and defaults
- Maintain responsive behavior patterns

**Document All Deviations:**
- Note why customization was needed
- Document impact on upgradability
- Provide migration path for future Shadcn updates

**Upgradability Strategy:**
- Keep customizations minimal to ease upstream syncing
- Tag customized sections in code with `// SDS-specific`
- Periodically review Shadcn updates for improvements
