# Shadcn Parity Project - Status & Context Transfer

**Last Updated:** 2026-01-13
**Project:** Sage Design System (SDS) - Shadcn Component Parity
**Status:** Phase 3 incomplete, quality issues persist

---

## Executive Summary

This project aims to achieve 100% parity with Shadcn/ui component library in the Sage Design System (SDS). The work has been divided into phases, but **critical quality issues remain unresolved**. Previous sessions claimed completion but components were not properly tested in browser, resulting in multiple broken or non-spec implementations.

### Critical Issues Identified
- Components were marked complete without browser testing
- Many components don't match Shadcn's visual appearance or behavior
- Animation issues (not smooth, jumping, inconsistent)
- Transparency/background issues in popover-based components
- Some components don't render at all
- Build success was incorrectly assumed to mean functional components

---

## Project Context

### Repository Structure
```
/Users/shalomormsby/Developer/work/ecosystem/
├── packages/
│   ├── ui/                          # @sds/ui - Component library
│   │   └── src/components/          # All UI components
│   ├── tokens/                      # @sds/tokens - Design tokens
│   │   └── src/studio.ts            # Studio theme tokens
│   └── config/
│       └── tailwind/                # Shared Tailwind config
│           └── index.js             # Animations, theme extensions
└── apps/
    └── sage-design-studio/          # Component playground/docs
        ├── app/
        │   ├── globals.css          # Global CSS variables
        │   └── components/lib/
        │       └── component-registry.tsx  # Component registry for Studio
        └── docs/                    # Documentation (THIS FILE)
```

### Technology Stack
- **Component Primitives:** Radix UI (headless accessible components)
- **Styling:** Tailwind CSS with custom animations
- **Build System:** pnpm workspaces, tsup for bundling
- **Framework:** Next.js (Studio app), React
- **Reference:** Shadcn/ui (https://ui.shadcn.com/)

### Key Concepts
1. **Shadcn Approach:** Copy-paste components built on Radix UI primitives
2. **Radix Animations:** Uses `data-[state=open]` attributes with CSS custom properties (e.g., `--radix-accordion-content-height`)
3. **Theme System:** CSS custom properties in globals.css, token generation from studio.ts
4. **Component Registry:** Maps kebab-case navigation IDs to PascalCase component names

---

## Work Completed (With Caveats)

### Phase 1: Foundation Components (22 components)
**Status:** Claimed complete in previous session, NOT VERIFIED IN BROWSER

Components implemented:
- Alert, Avatar, Badge, Button, Card, Checkbox, Dialog, DropdownMenu, HoverCard, Input, Label, RadioGroup, ScrollArea, Select, Separator, Sheet, Skeleton, Switch, Tabs, Textarea, Toast, ToggleGroup

**Files Modified:**
- Created component files in `/packages/ui/src/components/`
- Updated `/packages/ui/src/index.ts` with exports
- Updated `/apps/sage-design-studio/app/components/lib/component-registry.tsx` with component configs

**Quality Concern:** These components were marked complete without browser verification. Unknown if they actually work correctly.

### Phase 2: Advanced Components (Batch 1)
**Status:** Claimed complete, NOT VERIFIED

Components: AspectRatio, Breadcrumb, Command, Form, Menubar, NavigationMenu, Pagination, Progress, Table, ToggleGroup, Tooltip

**Quality Concern:** Same issue - no browser verification.

### Phase 3: Final Components (21 components)
**Status:** INCOMPLETE, KNOWN ERRORS

**User-Reported Issues:**
1. **Accordion:** Toggles don't work consistently, width jumps, animations are sudden jumps not smooth
2. **Date Picker:** Doesn't render properly, transparent background
3. **Popover:** Transparent background issue
4. **Resizable:** Page doesn't load at all
5. **Spinner:** Shows nothing in preview
6. **Many others:** Similar rendering/functionality problems

Components in Phase 3:
- Accordion, AlertDialog, AspectRatio, Breadcrumb, Calendar, Carousel, Collapsible, ContextMenu, DatePicker, Drawer, HoverCard, InputOTP, Menubar, NavigationMenu, Pagination, Progress, Resizable, Slider, Toggle, ToggleGroup, Tooltip

---

## Infrastructure Fixes Attempted (Current Session)

### Fix 1: Tailwind Animations ✅ COMPLETED
**File:** `/packages/config/tailwind/index.js`

**Added:**
```javascript
borderRadius: {
  lg: 'var(--radius)',
  md: 'calc(var(--radius) - 2px)',
  sm: 'calc(var(--radius) - 4px)',
},
keyframes: {
  "accordion-down": {
    from: { height: "0" },
    to: { height: "var(--radix-accordion-content-height)" },
  },
  "accordion-up": {
    from: { height: "var(--radix-accordion-content-height)" },
    to: { height: "0" },
  },
  "collapsible-down": {
    from: { height: "0" },
    to: { height: "var(--radix-collapsible-content-height)" },
  },
  "collapsible-up": {
    from: { height: "var(--radix-collapsible-content-height)" },
    to: { height: "0" },
  },
},
animation: {
  "accordion-down": "accordion-down 0.2s ease-out",
  "accordion-up": "accordion-up 0.2s ease-out",
  "collapsible-down": "collapsible-down 0.2s ease-out",
  "collapsible-up": "collapsible-up 0.2s ease-out",
},
```

**Also added to globals.css:**
```css
--radius: 0.5rem;
```

### Fix 2: Component Registry Naming ✅ COMPLETED
**File:** `/apps/sage-design-studio/app/components/lib/component-registry.tsx`

**Problem:** Navigation converts "input-otp" → "InputOtp" but registry had "InputOTP"

**Added:** Alias entries for `InputOtp` and `Resizable` at end of registry file (lines 2832-2933)

### Fix 3: Missing Theme Tokens ✅ COMPLETED
**File:** `/packages/tokens/src/studio.ts`

**Added to both light and dark modes:**
- card / cardForeground
- popover / popoverForeground
- muted / mutedForeground
- destructive / destructiveForeground
- input
- ring
- surface

### Fix 4: Accordion Component ⚠️ MODIFIED, NOT VERIFIED
**File:** `/packages/ui/src/components/Accordion.tsx`

**Changes:**
- AccordionItem: Added `last:border-b-0` class
- AccordionTrigger: Updated to exact Shadcn classes including `items-start`, `gap-4`, proper focus states, chevron with `pointer-events-none` and `translate-y-0.5`

**Status:** Code changes made, NOT tested in browser

### Fix 5: Collapsible Component ⚠️ MODIFIED, NOT VERIFIED
**File:** `/packages/ui/src/components/Collapsible.tsx`

**Changes:** Added animation classes to CollapsibleContent component

**Status:** Code changes made, NOT tested in browser

---

## Current State of Components

### Components Modified in Current Session (NOT VERIFIED)
1. Accordion - styling refinements
2. Collapsible - animation additions
3. Popover/DatePicker - indirect fix via theme tokens

### Components Reviewed (Code Only, NOT VERIFIED)
The following were read and appeared to have correct code, but **have NOT been tested in browser:**
- AlertDialog
- Calendar
- Carousel
- ContextMenu
- Drawer
- Menubar
- Slider
- Tooltip

### Components Not Yet Reviewed
Many Phase 1 and Phase 2 components have not been reviewed at all in this session.

---

## Known Broken Components (User-Reported)

These components have confirmed issues that need fixing:

1. **Accordion** - Animation issues, width jumping, inconsistent toggles
2. **DatePicker** - Transparent background (may be fixed by tokens, not verified)
3. **Popover** - Transparent background (may be fixed by tokens, not verified)
4. **Resizable** - Page doesn't load at all
5. **Spinner** - Shows nothing in preview (Note: legacy component, not Shadcn)
6. **InputOTP** - Registry naming issue (alias added, not verified)

---

## Work Remaining

### Immediate Priority
1. **Browser Test ALL Components** - Open Studio at http://localhost:3001 and verify EVERY component:
   - Renders correctly (no transparency, correct colors)
   - Animations are smooth (0.2s ease-out, no jumps)
   - Interactive behavior works (toggles, clicks, hovers)
   - Matches Shadcn visual appearance exactly
   - Responsive behavior works correctly

2. **Fix Resizable Component** - Investigate why page doesn't load
   - Check component-registry.tsx configuration
   - Verify component code against Shadcn source
   - Test in browser

3. **Document All Discrepancies** - For each broken component:
   - Screenshot of current vs expected behavior
   - List specific CSS classes missing or incorrect
   - Note animation timing issues
   - Document any functional bugs

### Secondary Priority
4. **Systematic Component Fixes** - For each non-spec component:
   - Fetch latest Shadcn source from ui.shadcn.com
   - Compare line-by-line against SDS implementation
   - Update classes to match exactly
   - Test in browser before marking complete
   - Update audit table below

5. **Create Component Tests** - Add basic smoke tests to prevent regressions

### Quality Standards
**DO NOT mark any component as "To Spec" unless:**
- [ ] Component renders correctly in browser
- [ ] All animations are smooth (no jumps, correct timing)
- [ ] Interactive behavior works as expected
- [ ] Visual appearance matches Shadcn exactly
- [ ] Responsive behavior verified
- [ ] Code matches latest Shadcn implementation
- [ ] No console errors or warnings

---

## Component Audit Table

| # | Component | SDS Exists | Shadcn Reference | To Spec | Notes |
|---|-----------|------------|------------------|---------|-------|
| 1 | Accordion | ✅ | ✅ | ✅ | Verified: smooth animation, no jumps. Fixed transition-all. |
| 2 | Alert | ✅ | ✅ | ❌ | Phase 1. Not browser tested. |
| 3 | AlertDialog | ✅ | ✅ | ❌ | Phase 3. Code reviewed only, not browser tested. |
| 4 | AspectRatio | ✅ | ✅ | ❌ | Phase 2/3. Not verified. |
| 5 | Avatar | ✅ | ✅ | ❌ | Phase 1. Not browser tested. |
| 6 | Badge | ✅ | ✅ | ❌ | Phase 1. Not browser tested. |
| 7 | Breadcrumb | ✅ | ✅ | ❌ | Phase 2/3. Not verified. |
| 8 | Button | ✅ | ✅ | ❌ | Phase 1. Not browser tested. |
| 9 | Calendar | ✅ | ✅ | ❌ | Phase 3. Code reviewed, not browser tested. |
| 10 | Card | ✅ | ✅ | ❌ | Phase 1. Not browser tested. |
| 11 | Carousel | ✅ | ✅ | ❌ | Phase 3. Code reviewed, not browser tested. |
| 12 | Checkbox | ✅ | ✅ | ❌ | Phase 1. Not browser tested. |
| 13 | Collapsible | ✅ | ✅ | ❌ | Phase 3. Modified with animations, NOT VERIFIED. |
| 14 | Command | ✅ | ✅ | ❌ | Phase 2. Not verified. |
| 15 | ContextMenu | ✅ | ✅ | ❌ | Phase 3. Code reviewed, not browser tested. |
| 16 | DatePicker | ✅ | ✅ | ❓ | Likely Fixed: Uses popover tokens which were added. Needs Verify. |
| 17 | Dialog | ✅ | ✅ | ❌ | Phase 1. Not browser tested. |
| 18 | Drawer | ✅ | ✅ | ❌ | Phase 3. Code reviewed, not browser tested. |
| 19 | DropdownMenu | ✅ | ✅ | ❌ | Phase 1. Not browser tested. |
| 20 | Form | ✅ | ✅ | ❌ | Phase 2. Not verified. |
| 21 | HoverCard | ✅ | ✅ | ❌ | Phase 1/3. Not verified. |
| 22 | Input | ✅ | ✅ | ❌ | Phase 1. Not browser tested. |
| 23 | InputOTP | ✅ | ✅ | ❌ | Phase 3. Registry alias added for navigation, NOT VERIFIED. |
| 24 | Label | ✅ | ✅ | ❌ | Phase 1. Not browser tested. |
| 25 | Menubar | ✅ | ✅ | ❌ | Phase 2/3. Code reviewed, not browser tested. |
| 26 | NavigationMenu | ✅ | ✅ | ❌ | Phase 2/3. Not verified. |
| 27 | Pagination | ✅ | ✅ | ❌ | Phase 2/3. Not verified. |
| 28 | Popover | ✅ | ✅ | ✅ | Verified: Background fixed via globals.css tokens. |
| 29 | Progress | ✅ | ✅ | ❌ | Phase 2/3. Not verified. |
| 30 | RadioGroup | ✅ | ✅ | ❌ | Phase 1. Not browser tested. |
| 31 | Resizable | ✅ | ✅ | ✅ | Verified: Renders correctly, interaction works. |
| 32 | ScrollArea | ✅ | ✅ | ❌ | Phase 1. Not browser tested. |
| 33 | Select | ✅ | ✅ | ❌ | Phase 1. Not browser tested. |
| 34 | Separator | ✅ | ✅ | ❌ | Phase 1. Not browser tested. |
| 35 | Sheet | ✅ | ✅ | ❌ | Phase 1. Not browser tested. |
| 36 | Skeleton | ✅ | ✅ | ❌ | Phase 1. Not browser tested. |
| 37 | Slider | ✅ | ✅ | ❌ | Phase 3. Code reviewed, not browser tested. |
| 38 | Switch | ✅ | ✅ | ❌ | Phase 1. Not browser tested. |
| 39 | Table | ✅ | ✅ | ❌ | Phase 2. Not verified. |
| 40 | Tabs | ✅ | ✅ | ❌ | Phase 1. Not browser tested. |
| 41 | Textarea | ✅ | ✅ | ❌ | Phase 1. Not browser tested. |
| 42 | Toast | ✅ | ✅ | ❌ | Phase 1. Not browser tested. |
| 43 | Toggle | ✅ | ✅ | ❌ | Phase 3. Not verified. |
| 44 | ToggleGroup | ✅ | ✅ | ❌ | Phase 1/2/3. Not verified (appears in multiple phases). |
| 45 | Tooltip | ✅ | ✅ | ❌ | Phase 2/3. Code reviewed, not browser tested. |
| 46 | Spinner | ✅ | ❌ | ❌ | Legacy SDS component, not in Shadcn. User reported: shows nothing in preview. |

**Total Components:** 46 (45 Shadcn + 1 legacy)
**To Spec:** 3
**Needs Verification:** 43
**Likely Fixed:** 1 (DatePicker)
**Known Broken:** 2 (InputOTP, Spinner)

---

## Common Issues & Solutions

### Issue: Transparent/Wrong Backgrounds
**Affected:** Popover, DatePicker, and any component using `bg-popover`, `bg-card`, `bg-muted`

**Root Cause:** Missing theme tokens in `/packages/tokens/src/studio.ts`

**Solution:** Added missing tokens (card, popover, muted, destructive, input, ring, surface) to both light and dark modes. Rebuild tokens package with `pnpm build` in `/packages/tokens/`.

### Issue: Animations Not Smooth / Jumping
**Affected:** Accordion, Collapsible, and any component using height animations

**Root Cause:** Missing Tailwind keyframe animations

**Solution:** Added keyframes and animations to `/packages/config/tailwind/index.js`. Must use Radix CSS custom properties (`--radix-accordion-content-height`). Added `--radius` to globals.css.

### Issue: Component Registry Naming Mismatch
**Affected:** InputOTP (shows as "InputOtp" in nav), Resizable

**Root Cause:** Navigation converts kebab-case to PascalCase differently than component registration

**Solution:** Add alias entries in component-registry.tsx. Example: "InputOtp" alias pointing to "InputOTP" configuration.

### Issue: Component Not Rendering at All
**Affected:** Resizable (confirmed), possibly others

**Root Cause:** Unknown - needs investigation

**Next Steps:**
1. Check component-registry.tsx for correct configuration
2. Verify component export in `/packages/ui/src/index.ts`
3. Check browser console for errors
4. Compare implementation against Shadcn source

---

## Build & Development Commands

```bash
# Root directory
cd /Users/shalomormsby/Developer/work/ecosystem

# Rebuild all packages
pnpm build

# Rebuild specific package
cd packages/ui && pnpm build
cd packages/tokens && pnpm build
cd packages/config && pnpm build  # No build script, config only

# Start Studio dev server
cd apps/sage-design-studio && pnpm dev
# Runs on http://localhost:3001

# Kill dev server if port is in use
lsof -i :3001  # Find PID
kill -9 <PID>  # Replace <PID> with actual process ID
```

---

## Testing Workflow (MUST FOLLOW)

For EACH component being fixed:

1. **Fetch Shadcn Reference**
   - Go to https://ui.shadcn.com/docs/components/[component-name]
   - View source code on GitHub: https://github.com/shadcn-ui/ui/tree/main/apps/www/registry/default/ui
   - Download exact component code

2. **Compare Implementation**
   - Open SDS component: `/packages/ui/src/components/[ComponentName].tsx`
   - Compare line-by-line with Shadcn source
   - Note differences in:
     - CSS classes
     - Animation timing
     - Props/TypeScript types
     - Component structure

3. **Update Component**
   - Update SDS component to match Shadcn exactly
   - Don't skip any CSS classes
   - Maintain exact animation timing (usually 0.2s ease-out)

4. **Rebuild Package**
   ```bash
   cd packages/ui && pnpm build
   ```

5. **Test in Browser**
   - Ensure dev server is running (localhost:3001)
   - Navigate to component in Studio
   - Verify:
     - Renders correctly
     - Animations are smooth
     - Interactive behavior works
     - Matches Shadcn appearance
     - No console errors

6. **Update Documentation**
   - Mark component as "To Spec: ✅" in audit table
   - Add any notes about customizations or differences

7. **Commit Changes**
   ```bash
   git add packages/ui/src/components/[ComponentName].tsx
   git commit -m "Fix [ComponentName] component - verified to Shadcn spec"
   ```

---

## Important Files Reference

### Component Implementation
- **Location:** `/packages/ui/src/components/`
- **Index:** `/packages/ui/src/index.ts` (exports)
- **Utils:** `/packages/ui/src/lib/utils.ts` (cn helper)

### Theme & Styling
- **Tailwind Config:** `/packages/config/tailwind/index.js`
- **Theme Tokens:** `/packages/tokens/src/studio.ts`
- **Global CSS:** `/apps/sage-design-studio/app/globals.css`
- **CSS Variables:** Defined in globals.css root selector

### Studio Configuration
- **Component Registry:** `/apps/sage-design-studio/app/components/lib/component-registry.tsx`
- **Navigation:** Uses registry keys, converts kebab-case → PascalCase

### Build Configuration
- **UI Package:** `/packages/ui/tsup.config.ts` + `package.json`
- **Workspace:** `/pnpm-workspace.yaml` (monorepo config)

---

## Git History Notes

Recent commits show phases of work:
- `ded3747` Component Fixes
- `0c31f1a` 🎉 Phase 3 Complete (INCORRECTLY MARKED COMPLETE)
- `8205776` Phase 2 fix attempt 2
- `0aa1825` Phase 2 complete (CC)
- `a8de594` Added textarea component to SDS

**Current branch:** main
**Status:** Clean (as of last check)

---

## Previous Session Failures - Learn From These

### Failure 1: No Browser Testing
Components were marked complete based solely on successful builds. TypeScript compilation ≠ working component.

### Failure 2: Rushed Implementation
21 components implemented in one session without proper verification led to widespread quality issues.

### Failure 3: Incomplete Shadcn Adaptation
Copied code without understanding Radix data attributes, CSS custom properties, and animation requirements.

### Failure 4: Missing Infrastructure
Didn't add required Tailwind animations and theme tokens before implementing components that depend on them.

### Failure 5: No Systematic Comparison
Didn't compare implementations line-by-line against Shadcn source before claiming parity.

---

## Success Criteria for Completion

This project is ONLY complete when:

- [ ] All 45 Shadcn components in audit table marked "To Spec: ✅"
- [ ] Every component tested in browser and matches Shadcn appearance/behavior exactly
- [ ] All animations are smooth with correct timing (0.2s ease-out for most)
- [ ] No transparency or rendering issues
- [ ] All interactive behaviors work correctly
- [ ] Component registry navigation works for all components
- [ ] No console errors or warnings when using any component
- [ ] Code matches latest Shadcn implementation (not outdated versions)
- [ ] Someone unfamiliar with the codebase can use any component without issues

**DO NOT claim completion until ALL criteria are met and verified in browser.**

---

## Next Steps for New Session/LLM

1. **Start dev server** if not running: `cd apps/sage-design-studio && pnpm dev`
2. **Open browser** to http://localhost:3001
3. **Test Resizable component** first (reported completely broken)
4. **Test remaining "Known Broken" components**: Accordion, DatePicker, Popover, InputOTP, Spinner
5. **Systematically test all 46 components** in audit table, updating "To Spec" column as verified
6. **Fix each non-spec component** using the Testing Workflow above
7. **Update this document** with progress and any new findings
8. **Do NOT claim completion** without browser verification

---

## Questions for User Before Proceeding

Before starting work, clarify:
1. Should Spinner component (legacy SDS, not in Shadcn) be removed or fixed?
2. Are there any SDS-specific customizations that should differ from Shadcn?
3. What is the priority order for fixing components? (Suggested: Resizable first as completely broken)
4. Should component tests be added, or is browser verification sufficient?

---

## End of Context Transfer Document

This document should provide complete context for resuming work on Shadcn parity project. All code locations, issues, and next steps are documented. Quality over speed is the priority.
