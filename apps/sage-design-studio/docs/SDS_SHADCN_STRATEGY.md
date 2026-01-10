# Sage Design System (SDS) vs Shadcn Parity Strategy

This document outlines the strategy to reach full feature parity with Shadcn/ui efficiently and ethically, while organizing the system for the long-term goal of enabling rapid development of complex applications.

## 1. Component State Analysis

The following table compares the current state of SDS components against the standard Shadcn UI library.

**Legend:**
*   ✅ **@sds/ui**: Implemented in the modern, Radix-based package.
*   ⚠️ **Legacy**: Exists in `@ecosystem/design-system` but needs migration to `@sds/ui`.
*   ❌ **Missing**: Not yet present in SDS.

| Component | SDS Status | Shadcn | Priority | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Accordion** | ❌ Missing | Available | High | Essential for FAQs and collapsed content. |
| **Alert** | ❌ Missing | Available | High | Essential for feedback messages. |
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
| **Data Table** | ❌ Missing | Available | High | Critical for dashboards. |
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
| **Radio Group** | ❌ Missing | Available | High | Basic form element. |
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

1.  **Automated Ingestion**: Use the `shadcn` CLI to pull component code directly into `packages/ui`.
    ```bash
    cd packages/ui
    npx shadcn@latest add [component-name]
    ```
2.  **Instant Refine**: Immediately refactor the added component:
    *   **Tokens**: Replace hardcoded Tailwind colors (e.g., `bg-primary`) with our CSS variables (`bg-[var(--color-primary)]`) if our Tailwind config doesn't auto-map them. *Note: Our Tailwind config likely maps `primary` to `var(--color-primary)`, so this might be automatic.*
    *   **Exports**: Export the component from `packages/ui/src/index.ts`.
3.  **Registry Update**: Add the component to `apps/sage-design-studio/.../component-registry.tsx` to visualize it immediately.

### B. Migration of Legacy Components
We currently have a split state between `packages/ui` (New) and `design-system` (Old).
1.  **Freeze Legacy**: Stop adding to `design-system/atoms|molecules`.
2.  **Replace**: For items like `Modal` (Legacy), install Shadcn `Dialog` into `packages/ui` and deprecate the legacy `Modal`.
3.  **Migrate**: Update consumers to import from `@sds/ui`.

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

## 4. Next Steps (Action Plan)

1.  **Execute Component Batch 1**: Install "Critical" missing components (`Dialog`, `Dropdown Menu`, `Sheet`, `Table`, `Form`).
2.  **Unify**: Deprecate legacy duplicates in `design-system` and point them to `@sds/ui`.
3.  **Refine Registry**: Update the Studio Sidebar to group components by these Tiers (Primitives vs. Assemblies).
