# Sage Design System Guidelines

## Purpose

This document provides critical guidelines for maintaining consistency and quality when using the Sage Design System. Following these guidelines ensures that your implementation matches the high design standards established through the systematic Atomic Design methodology.

## Root Cause Analysis: January 2026

After reviewing inconsistencies in implementation, we identified these root causes:

### 1. **Unclear CSS Class Standards**
**Problem:** Developers were mixing non-standard CSS classes (e.g., `text-foreground`) with design system CSS variables.

**Impact:** Components broke in dark mode or didn't respect theme changes.

**Solution:** Always use design system CSS variables, never arbitrary or non-standard Tailwind classes for colors.

### 2. **Uncoordinated Component APIs**
**Problem:** Components that work together (Header, PageLayout, PageTemplate) had different max-width defaults and no coordination mechanism.

**Impact:** Misaligned layouts where headers, titles, and content didn't line up on the left margin.

**Solution:** Components now share a coordinated `maxWidth` / `contentMaxWidth` prop system.

### 3. **Poor Example Code in Documentation**
**Problem:** The PageTemplate preview in the studio used inline HTML instead of demonstrating the Footer organism.

**Impact:** Developers saw bad patterns in "official" examples and replicated them.

**Solution:** All examples must use actual design system components, never inline implementations.

### 4. **Incomplete Page Templates**
**Problem:** Pages were missing critical elements like footers.

**Impact:** Inconsistent user experience and incomplete page structures.

**Solution:** Create complete page templates with all standard elements included.

### 5. **Insufficient Spacing Coordination**
**Problem:** Spacing calculations didn't account for different composition patterns (e.g., breadcrumbs below title vs. sticky at top).

**Impact:** Excessive or insufficient whitespace between elements.

**Solution:** Spacing logic now adapts based on composition context.

---

## Mandatory Guidelines

### ✅ DO: Use Design System CSS Variables

**Always** use CSS variables for colors and theme-aware properties:

```tsx
// ✅ CORRECT
<div className="text-[var(--color-text-primary)]">...</div>
<div className="bg-[var(--color-surface)]">...</div>
<div className="border-[var(--color-border)]">...</div>

// ❌ WRONG - breaks in dark mode or theme switching
<div className="text-foreground">...</div>
<div className="text-gray-900">...</div>
<div className="bg-white">...</div>
```

### ✅ DO: Use Actual Design System Components

**Never** recreate components inline when a design system component exists:

```tsx
// ✅ CORRECT
import { Footer } from '@ecosystem/design-system';

<PageTemplate
  footer={
    <Footer
      logo="Brand"
      sections={[...]}
      copyright="© 2026"
    />
  }
>

// ❌ WRONG - defeats the purpose of the design system
<PageTemplate
  footer={
    <footer className="py-8 border-t">
      <p>© 2026</p>
    </footer>
  }
>
```

### ✅ DO: Match Container Widths for Alignment

When using PageTemplate variants, ensure all elements use consistent widths:

```tsx
// ✅ CORRECT - all elements aligned
<PageTemplate variant="wide">  {/* Uses max-w-[1440px] throughout */}
  {/* Header, title, breadcrumbs, content all use 1440px */}
</PageTemplate>

<PageTemplate variant="standard">  {/* Uses max-w-7xl (1280px) throughout */}
  {/* Header, title, breadcrumbs, content all use 1280px */}
</PageTemplate>
```

### ✅ DO: Include All Standard Page Elements

Every page should have:
- ✅ Header with logo and navigation
- ✅ Title and optional subtitle
- ✅ Breadcrumbs for context
- ✅ Main content
- ✅ Footer with navigation and social links

```tsx
// ✅ COMPLETE PAGE
<PageTemplate
  header={{ logo, navLinks, sticky: true }}
  title="Page Title"
  subtitle="Optional context"
  breadcrumbs={[...]}
  footer={<Footer {...} />}  // Don't forget this!
>
  {/* content */}
</PageTemplate>
```

### ✅ DO: Use Swiss Grid Spacing Principles

Follow the 8px base unit system:

```tsx
// ✅ CORRECT - follows Swiss Grid
pt-12 lg:pt-16    // 48px/64px - major sections
pb-8              // 32px - standard spacing
gap-6             // 24px - element spacing
mb-4              // 16px - tight spacing

// ❌ WRONG - arbitrary values break the grid
pt-14             // 56px - not on the 8px grid
pb-7              // 28px - not on the 8px grid
```

### ✅ DO: Respect Component Composition Patterns

PageTemplate has opinionated patterns - follow them:

```tsx
// ✅ CORRECT - follows the template pattern
<PageTemplate
  breadcrumbsPosition="below-title"  // Static below title (default)
  swissGridSpacing={true}            // Structured spacing
  variant="standard"                 // Consistent width
>

// ❌ WRONG - fighting the template
<PageTemplate>
  {/* Don't try to add your own breadcrumbs inside children */}
  {/* Don't add custom headers inside children */}
</PageTemplate>
```

---

## Component-Specific Guidelines

### Header

```tsx
import { Header } from '@ecosystem/design-system';

<Header
  logo={<Link className="text-[var(--color-text-primary)]">Brand</Link>}
  navLinks={[...]}
  actions={<Button>Sign In</Button>}
  sticky={true}
  maxWidth="max-w-7xl"  // Match your page variant!
/>
```

**Critical:**
- Logo must use `text-[var(--color-text-primary)]` for dark mode support
- `maxWidth` should match your PageTemplate variant
- Use the Header organism, don't create custom headers

### PageTemplate

```tsx
import { PageTemplate, Footer } from '@ecosystem/design-system';

<PageTemplate
  header={{
    logo: <Link className="text-[var(--color-text-primary)]">Brand</Link>,
    navLinks: ecosystemNavigation,
    sticky: true,
  }}
  title="Page Title"
  subtitle="Optional subtitle for context"
  breadcrumbs={[
    { label: 'Home', href: '/' },
    { label: 'Current' },
  ]}
  variant="standard"  // or "wide" or "narrow"
  footer={<Footer {...completeFooterConfig} />}  // Always include!
>
  <YourContent />
</PageTemplate>
```

**Critical:**
- Always include a footer using the Footer organism
- Match variant to your content needs (wide for dashboards, narrow for reading)
- Logo in header must use proper CSS variables

### Footer

```tsx
import { Footer } from '@ecosystem/design-system';

<Footer
  logo={<Link className="text-[var(--color-text-primary)]">Brand</Link>}
  sections={[
    { title: 'Product', links: [...] },
    { title: 'Company', links: [...] },
  ]}
  socialLinks={{
    github: 'https://github.com/...',
    linkedin: 'https://linkedin.com/...',
    email: 'hello@...',
  }}
  copyright="© 2026 Company Name"
/>
```

**Critical:**
- Use the Footer organism, never create inline footers
- Provide complete navigation sections
- Include social links when applicable

---

## Systemic Improvements Implemented

### 1. **Coordinated Max-Width System**

Components now share a consistent max-width prop:
- Header accepts `maxWidth` prop
- PageLayout accepts `contentMaxWidth` prop
- PageTemplate passes the variant's width to both

This ensures perfect alignment from header → title → content.

### 2. **Context-Aware Spacing**

PageLayout now adjusts spacing based on composition:
- Less spacing between subtitle and breadcrumbs when breadcrumbs are below title
- Proper top padding for sticky header compensation
- Swiss Grid spacing that adapts to layout structure

### 3. **Type-Safe Component APIs**

All max-width props use TypeScript unions:
```typescript
maxWidth?: 'max-w-7xl' | 'max-w-[1440px]' | 'max-w-4xl'
```

This prevents arbitrary values and ensures consistency.

### 4. **Complete Example Code**

All documentation examples now:
- Use actual design system components (no inline HTML)
- Include all standard page elements
- Demonstrate proper CSS variable usage
- Show complete, copy-paste-ready patterns

---

## Quick Reference: Common Mistakes

| ❌ Wrong | ✅ Correct | Why |
|---------|-----------|-----|
| `text-foreground` | `text-[var(--color-text-primary)]` | Theme support |
| `bg-white` | `bg-[var(--color-background)]` | Dark mode support |
| `<footer className="...">` | `<Footer {...} />` | Consistency |
| No footer prop | `footer={<Footer />}` | Complete pages |
| `max-w-[1440px]` header with `max-w-7xl` content | Matching widths via variant | Alignment |
| `pt-14` | `pt-12 lg:pt-16` | Swiss Grid 8px units |

---

## When Creating a New Page

Use this checklist:

1. ☐ Import PageTemplate and Footer from design system
2. ☐ Set up header with logo using `text-[var(--color-text-primary)]`
3. ☐ Choose appropriate variant (standard/wide/narrow)
4. ☐ Add title and subtitle
5. ☐ Configure breadcrumbs for navigation context
6. ☐ Include complete Footer with navigation and social links
7. ☐ Use CSS variables for all colors
8. ☐ Follow Swiss Grid spacing (8px base unit)
9. ☐ Test in both light and dark modes
10. ☐ Verify alignment of header, title, and content

---

## Philosophy

The Sage Design System exists to make building beautiful, consistent interfaces as easy as using Lego blocks. This only works if:

1. **Every component is used as designed** - don't recreate them inline
2. **Examples show best practices** - documentation is a teaching tool
3. **APIs coordinate** - components that work together have aligned interfaces
4. **Standards are clear** - no ambiguity about which classes to use
5. **Completeness is expected** - pages should have all standard elements

When you follow these guidelines, you get:
- ✨ Automatic theme support (light/dark mode)
- ✨ Perfect alignment and spacing
- ✨ Consistent user experience
- ✨ Maintainable, reusable code
- ✨ Beautiful interfaces built quickly

---

## Questions or Issues?

If you're unsure about how to use a component or follow a pattern:
1. Check the Sage Design Studio examples
2. Review this guideline document
3. Look at the component's TypeScript interface for prop documentation
4. Examine existing pages that use the pattern correctly

**Remember:** The design system is here to help you build better, faster. Use it fully and consistently to get the best results.
