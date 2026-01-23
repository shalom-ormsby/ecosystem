# Sage UI - To Do

This document tracks planned improvements and enhancements to the Sage UI.

---

## 🎨 Dynamic Color Customization System
**Date Started:** 2026-01-20
**Status:** Week 1-2 Complete, Week 3-4 Planned
**Priority:** High

### Project Overview
Enable users to define a primary color in the Customizer that automatically ripples throughout the ENTIRE Sage UI interface, updating 15+ dependent tokens (buttons, links, charts, focus rings, etc.). Includes curated palette library to solve the "blank page problem."

### Implementation Phases

#### ✅ Week 1-2: Curated Palette Library + UI (COMPLETE)

**Phase 1A: Color Engine & Token Infrastructure**
- [x] Create `@sage/tokens/color-utils.ts` - Standalone color transformation utilities
  - [x] `hexToHSL()` / `hslToHex()` - Bidirectional color space conversion
  - [x] `adjustLightness()` - Perceptually uniform tint/shade generation
  - [x] `adjustSaturation()` - Saturation manipulation for color harmony
  - [x] `rotateHue()` - Hue rotation for complementary/analogous colors
  - [x] `getContrastRatio()` - WCAG contrast ratio calculation
  - [x] `getOptimalForeground()` - Auto-accessible foreground color selection
- [x] Create `@sage/tokens/token-graph.ts` - Token dependency mapping system
  - [x] Map 15+ CSS variables that derive from `--color-primary`
  - [x] UI tokens: `--color-link`, `--color-link-hover`, `--color-ring`, `--color-accent`
  - [x] Chart tokens: `--chart-1` through `--chart-5` with intelligent derivations
  - [x] Mode-aware derivations (different transforms for light vs dark)
  - [x] `computeDerivedTokens()` function for single-call updates
- [x] Enhance `@sage/ui/lib/colors.ts` with HSL transformations
  - [x] `generateColorScale()` - Tailwind-style 50-900 tint/shade variants

**Phase 1B: Curated Palette Library**
- [x] Create `@sage/tokens/color-palettes.ts` with 21 curated palettes
  - [x] Professional (5): Midnight Sapphire, Forest Executive, Burgundy Trust, Slate Corporate, Navy Prestige
  - [x] Creative (3): Coral Sunset, Teal Wave, Purple Dream
  - [x] Natural (2): Earth Tones, Ocean Breeze
  - [x] Vibrant (2): Electric Lime, Sunset Orange
  - [x] Minimal (3): Monochrome, Pure Black, Soft Neutral
  - [x] Tech (3): Cyber Blue, Matrix Green, Developer Dark
  - [x] Warm (3): Golden Hour, Rust & Clay, Peach Cream
- [x] Add palette metadata (mood tags, WCAG compliance, best use cases, inspiration)

**Phase 1C: State Management**
- [x] Rewrite `@sage/ui/lib/store/customizer.ts` with Zustand
  - [x] Per-theme, per-mode storage: `customColors[theme][mode]`
  - [x] `ColorPalette` interface with primary/secondary/accent + scale + derived tokens
  - [x] `setCustomPrimaryColor()` action with full palette generation
  - [x] `resetCustomColors()` action for clearing customizations
  - [x] `getActiveColorPalette()` getter
  - [x] Zustand persist middleware with version migration (v2)
  - [x] localStorage persistence across browser sessions

**Phase 1D: Theme Provider Integration**
- [x] Enhance `@sage/ui/providers/ThemeProvider.tsx`
  - [x] `mergeCustomColorTokens()` - Non-destructive overlay function
  - [x] Smart merge strategy (base tokens + custom palette + derived tokens)
  - [x] Batched DOM updates via `requestAnimationFrame()`
  - [x] `data-custom-colors` attribute for debugging
  - [x] Reactive updates on theme/mode/palette changes

**Phase 1E: UI Components**
- [x] Create `@sage/ui/components/forms/ColorPicker.tsx`
  - [x] Dual input methods (visual picker + hex text input)
  - [x] Real-time hex validation
  - [x] Live color preview swatch
  - [x] Error states and validation
  - [x] Two-way binding between picker and text input
- [x] Create `apps/sage-design-studio/app/components/studio/TokensSection/PalettesTab.tsx`
  - [x] Category filter buttons (7 categories with icons)
  - [x] WCAG compliance filter toggle
  - [x] Palette grid with color swatches
  - [x] Mood tags and "Best for" use cases
  - [x] One-click "Apply Palette" functionality
  - [x] Active state indicator
  - [x] Responsive grid layout (1-3 columns)
- [x] Update `@sage/ui/components/layout/CustomizerPanel.tsx`
  - [x] Add "Primary Color" section with Palette icon
  - [x] Integrate ColorPicker component
  - [x] Add Apply/Reset buttons
  - [x] Show status indicator when custom colors active
  - [x] Disable "Apply" button when no changes

**Phase 1F: Component Registration & Documentation**
- [x] Add PalettesTab to navigation tree
- [x] Add PalettesTab to search index with comprehensive keywords
- [x] Document entire system in CHANGELOG.md
  - [x] Architecture decisions (HSL color space, token dependency graph)
  - [x] Files created and modified
  - [x] User flow walkthrough
  - [x] Benefits and future enhancements

**Phase 1G: Build & Deployment**
- [x] Fix circular dependency (tokens ← ui)
- [x] Add missing `@sage/tokens` dependency to sage-design-studio
- [x] Verify local build successful
- [x] Verify Vercel deployment successful
- [x] Production verification

**Commits:**
- `e6a5d98` - fix(sage-design-studio): Add missing @sage/tokens dependency for Vercel build
- `3fcb1b1` - docs: Document dynamic color customization system and register PalettesTab

---

#### 📋 Week 3: Primary + Secondary Color Support (PLANNED)

**Phase 2A: Advanced Mode Toggle**
- [ ] Add `customizationMode` toggle to CustomizerPanel UI
  - [ ] Simple mode: Single primary color (current behavior)
  - [ ] Advanced mode: Discrete Primary, Secondary, and Accent controls
- [ ] Update `useCustomizer` store to track active mode
- [ ] Show/hide secondary and accent pickers based on mode

**Phase 2B: Secondary Color Support**
- [ ] Add secondary color picker to CustomizerPanel (Advanced mode only)
- [ ] Implement `setCustomSecondaryColor()` with derived token computation
- [ ] Update ThemeProvider to merge secondary color tokens
- [ ] Add secondary color to palette preview in PalettesTab
- [ ] Test secondary color derivations in light and dark modes

**Phase 2C: Accent Color Support**
- [ ] Add accent color picker to CustomizerPanel (Advanced mode only)
- [ ] Implement `setCustomAccentColor()` with derived token computation
- [ ] Update ThemeProvider to merge accent color tokens
- [ ] Add accent color to palette preview in PalettesTab
- [ ] Test accent color derivations in light and dark modes

**Phase 2D: Mode Switching UX**
- [ ] Add informational tooltip explaining Simple vs Advanced modes
- [ ] Show warning when switching from Advanced → Simple (loses secondary/accent)
- [ ] Implement confirmation dialog for destructive mode changes
- [ ] Preserve primary color when switching modes

**Phase 2E: Testing & Validation**
- [ ] Test all three colors working together in both modes
- [ ] Verify token dependency graph updates correctly
- [ ] Test palette application in Advanced mode
- [ ] Verify reset functionality works for all colors
- [ ] Browser testing across themes and color modes

---

#### 📋 Week 4: Integration + Polish (PLANNED)

**Phase 3A: Palette Enhancements**
- [ ] Add "Save Custom Palette" functionality
  - [ ] Allow users to save their custom color combinations
  - [ ] Store saved palettes in localStorage
  - [ ] Add "My Palettes" category to PalettesTab
  - [ ] Enable delete/rename of saved palettes
- [ ] Add palette export/import
  - [ ] Export custom palette as JSON
  - [ ] Import palette from JSON file
  - [ ] Share palettes via URL parameters (optional)

**Phase 3B: Color Picker Enhancements**
- [ ] Add recently used colors
  - [ ] Track last 5-10 colors used
  - [ ] Show as quick-select swatches
- [ ] Add color harmony suggestions
  - [ ] Show complementary color
  - [ ] Show analogous colors
  - [ ] Show triadic colors
- [ ] Improve color picker accessibility
  - [ ] Add keyboard navigation
  - [ ] Improve screen reader labels
  - [ ] Add color name/description

**Phase 3C: Live Preview**
- [ ] Add "Preview" mode before applying colors
  - [ ] Show temporary preview without committing to store
  - [ ] Add "Apply" and "Cancel" buttons
  - [ ] Show before/after comparison (optional)
- [ ] Add real-time preview while dragging color picker

**Phase 3D: Documentation & Examples**
- [ ] Create video tutorial for color customization
- [ ] Add "How to customize colors" guide to Getting Started
- [ ] Create example use cases (personal branding, client projects, etc.)
- [ ] Document color psychology and palette selection best practices
- [ ] Add accessibility guidelines for color selection

**Phase 3E: Performance & Polish**
- [ ] Optimize color derivation calculations
  - [ ] Cache computed color scales
  - [ ] Debounce real-time updates
- [ ] Add loading states for palette application
- [ ] Improve transition animations when colors change
- [ ] Test performance with rapid color changes
- [ ] Memory leak testing (localStorage growth)

**Phase 3F: Advanced Features (Optional)**
- [ ] Gradient generation from primary color
- [ ] Dark mode intelligence (auto-adjust lightness for dark mode)
- [ ] Color blindness simulation mode
- [ ] Auto-generate complementary palette from single color
- [ ] AI-powered palette suggestions based on brand keywords

---

### Success Metrics

**Week 1-2 (Complete):**
- ✅ 21 curated palettes available
- ✅ ColorPicker component functional
- ✅ PalettesTab UI complete and responsive
- ✅ Primary color customization working
- ✅ 15+ tokens update automatically from primary color
- ✅ Production deployment successful

**Week 3 (Planned):**
- [ ] Advanced mode toggle functional
- [ ] Secondary and accent color pickers working
- [ ] All three colors can be customized independently
- [ ] Mode switching doesn't lose data unexpectedly
- [ ] Browser tested across all themes and modes

**Week 4 (Planned):**
- [ ] Save/load custom palettes working
- [ ] Export/import functionality complete
- [ ] Live preview mode functional
- [ ] Documentation complete with video tutorial
- [ ] Performance optimization verified
- [ ] Zero console errors or warnings

---

### Known Issues & Risks

**Current Issues:**
- None (Week 1-2 complete with no known issues)

**Week 3 Risks:**
- Advanced mode UI could become cluttered (mitigation: collapsible sections)
- Color harmony between primary/secondary/accent needs careful testing
- Mode switching confirmation UX needs careful design

**Week 4 Risks:**
- localStorage size limits with many saved palettes (mitigation: limit to 10 saved)
- Live preview performance on slower devices (mitigation: debounce updates)
- Export/import security (mitigation: validate JSON structure)

---

### Future Enhancements (Beyond Week 4)

- [ ] Palette sharing community (public palette gallery)
- [ ] AI-powered palette generation from image upload
- [ ] Seasonal palette recommendations
- [ ] Integration with design tools (Figma plugin)
- [ ] Color analytics (most popular palettes, usage patterns)
- [ ] A/B testing support (test two color schemes)
- [ ] Programmatic API for color customization

---

## 🚀 Strategic Rebrand: Sage UI -> Sage UI
**Date Added:** 2026-01-20
**Priority:** Critical
**Status:** Planning

**Objective:** Shift identity from a "Design System" (governance/enterprise constrains) to "Sage UI" (Solopreneur/Velocity Ecosystem). Move from `@sds/*` to `@sage-ui/*` (or `@sage/*`) namespace.

### Phase 1: Identity & Documentation (Immediate)
- [x] **Documentation Rebrand**:
    - Rename "Sage Design Studio" -> "Sage Studio" or "Sage UI Studio".
    - Update homepage copy: "The Solopreneur's Development Stack" / "AI-Native Components".
    - Update metadata/titles across the documentation site.
    - [x] Global Find & Replace: `Sage Design System` -> `Sage UI`, `@sds/*` -> `@sage/*`.
- [x] **Feature Parity Strategy**:
    - [x] Adopt "Mantine-style" utility hook library (`@sage/hooks`).
    - [x] Adopt "Shadcn-style" chart library (`@sage/charts`).

### Phase 2: Package Migration (Careful Execution)
*Goal: Rename packages to align with new brand. Proposed Naming: `@sage/*` or `@sage-ui/*`.*

- [x] **Package Renaming**:
    - `@sage/ui` -> `@sage/ui` (The Primitives)
    - `@sage/tokens` -> `@sage/tokens`
    - `@sage/mcp` -> `@sage/mcp`
- [x] **New Packages**:
    - [x] `@sage/hooks` (New utility belt)
    - [x] `@sage/charts` (Recharts wrapper)
    - [ ] `@sage/templates` (Future Tier 3)
- [x] **Refactor Consumers**:
    - Update imports in `apps/sage-design-studio`
    - Update imports in `apps/portfolio`
    - Update imports in `apps/ecosystem-creative-powerup`
- [x] **Infrastructure**:
    - Update `tsconfig.json` paths.
    - Update `turbo.json` pipeline configuration.

### Phase 3: Public Presence
- [ ] **Domain**: Secure `sage-ui.dev` or `sage-ui.com`.
- [ ] **CLI**: Create `npx sage-ui init` (instead of manual copy-paste).

---
**Date Added:** 2026-01-16
**Priority:** High
**Effort:** Medium (3-5 days)
**Impact:** High

### Current State
The Motion Intensity slider in the Customizer **partially works** - it updates the store but doesn't affect most animations in the app.

**What's Working:**
- Slider updates the customizer store correctly
- Infrastructure exists (`useMotionPreference` hook is well-designed)
- One component uses it (`VariableWeightText` properly scales animations)

**The Problem:**
Out of **43 files using framer-motion**, only **1 component** respects the motion intensity setting. All other animated components ignore it.

### Original Intent
The motion intensity slider was designed to:
- **Scale animation speed**: Higher intensity = faster/more energetic animations
- **Disable animations**: Setting to 0 completely stops motion
- **Respect accessibility**: Automatically syncs with system `prefers-reduced-motion` preference
- **Provide granular control**: 11 levels (0-10) for fine-tuning motion comfort

The `useMotionPreference` hook provides:
- `shouldAnimate` - Boolean to conditionally render animations
- `scale` - Number (0-10) to scale duration/intensity
- `prefersReducedMotion` - System preference awareness

### Implementation Plan

**What needs to be done:**
1. Audit all components using `motion.` from framer-motion
2. Add `useMotionPreference` hook to each animated component
3. Wrap animations in `shouldAnimate` conditionals
4. Scale duration using: `duration * (5 / scale)` (where 5 is normal)
5. Provide static fallbacks when `shouldAnimate === false`

**Example transformation:**
```tsx
// BEFORE (ignores motion preference)
<motion.div
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>

// AFTER (respects motion preference)
const { shouldAnimate, scale } = useMotionPreference();

{shouldAnimate ? (
  <motion.div
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 * (scale > 0 ? 5 / scale : 0) }}
  >
) : (
  <div style={{ opacity: 1 }}>
)}
```

**Complexity factors:**
- ✅ Hook already exists and is well-designed
- ✅ Pattern established in `VariableWeightText` to follow
- ⚠️ 43 files to update (but most have simple animations)
- ⚠️ Need to test each component's static fallback
- ⚠️ Some complex animations may need custom scaling logic

### Impact
**User Experience Benefits:**
- ✨ **Accessibility compliance** - Critical for users with vestibular disorders
- ✨ **User preference** - Some users simply prefer less motion
- ✨ **Performance** - Users on slower devices can reduce motion overhead
- ✨ **Brand polish** - Shows attention to detail and inclusive design

**Current Consequences:**
- ❌ Slider appears broken (misleading UX)
- ❌ Users with motion sensitivity have no recourse except OS-level settings
- ❌ Violates the principle of user control established by having the slider

### Additional UI Fix Needed
**Slider Background Contrast**: The slider background needs increased contrast, especially in the Volt theme. Currently difficult to see the track/rail.

### References
- [customizer.ts:5-23](../../packages/ui/src/lib/store/customizer.ts#L5-L23) - Store implementation
- [useMotionPreference.ts](../../packages/ui/src/hooks/useMotionPreference.ts) - Motion preference hook
- [VariableWeightText.tsx:68-76](../../packages/ui/src/components/data-display/VariableWeightText.tsx#L68-L76) - Working example
- [CustomizerPanel.tsx:68-84](../../packages/ui/src/components/layout/CustomizerPanel.tsx#L68-L84) - Slider UI

---


## Motion Section Evolution
**Date Added:** 2026-01-17
**Status:** In Progress

High-impact tasks to evolve the Sage UI Motion section and make it as useful as possible.

- [ ] **Fill the "Placeholders"**
    - [x] **DurationPage & EasingPage**: Critical foundation primitives. Users need to feel the difference. (Impact: High)
    - [x] **TypewriterPage**: A classic effect. (Impact: Medium)
    - [x] **MagneticPage**: Great for micro-interactions. (Impact: High)
- [ ] **Standardize "Motion Primitives"**
    - Create a `Motion` namespace in `@sage/ui` (e.g., `<Motion.Fade in>`). Reduces boilerplate. (Impact: High)
- [x] **"Playground" for Motion Tokens**
    - Build a page where users can tweak variables and see real-time effects on dummy UI. (Impact: High) - *Implemented as the new "Primitives" page*
- [ ] **Accessibility First (Reduced Motion)**
    - Audit all motion components. If `prefers-reduced-motion` is true, automatically simplify or disable. (Impact: Critical)
- [ ] **Add "Page Transitions"**
    - Create a standard `<PageTransition>` component for seamless navigation. (Impact: High)
- [ ] **Interactive "Scroll" Components**
    - Add `ScrollReveal` or `Parallax` components. (Impact: High)

---

## 🏠 Create Sage UI Home and Landing Page
**Date Added:** 2026-01-21
**Priority:** Critical
**Status:** Planned
**Impact:** Very High (First Impression)

### Objective
Create a landing page that instantly communicates the purpose, structure, and value of Sage UI to both technical users and executive stakeholders (CDOs, design leaders).

### Core Message: "Sage UI - A Systematic Design Language"

**The Four-Layer Hierarchy:**

**1. Design Tokens (Foundation Layer)**
The atomic values that define your brand's visual language—colors, typography, spacing, shadows, and motion. Tokens ensure consistency across all implementations and enable dynamic theming.

*Value*: Single source of truth for design decisions, enabling brand consistency and theme flexibility.

**2. Components (Element Layer)**
Primitive, reusable UI elements—buttons, inputs, cards, dialogs—that implement design tokens and handle core interactions. Each component follows accessibility standards (WCAG AA/AAA) and responds to theme customization.

*Value*: Accelerated development with pre-built, accessible, production-ready elements.

**3. Blocks (Pattern Layer)**
Pre-composed sections combining multiple components into common UI patterns—hero sections, feature grids, pricing tables, testimonial layouts. Blocks are context-aware compositions that solve specific design problems.

*Value*: Rapid prototyping and consistent implementation of proven UX patterns across products.

**4. Templates (Page Layer)**
Complete page layouts that combine blocks into cohesive experiences—landing pages, dashboards, documentation sites. Templates demonstrate best-practice composition and provide production-ready starting points.

*Value*: Accelerated time-to-market with battle-tested layouts that maintain brand consistency.

### Design Philosophy
Each layer builds upon the previous, creating a systematic approach where changes cascade intelligently—updating a color token automatically refines all components, blocks, and templates that use it.

### Why This Resonates with CDOs
- **Strategic thinking**: Systematic approach to design at scale
- **Efficiency**: Reusability at every layer reduces redundancy
- **Flexibility**: Customizable at the foundation without rebuilding
- **Quality**: Accessibility and best practices baked in from the start

### Implementation Requirements

1) Must be built with existing Sage UI design token, components, blocks, and templates that are imported directly from '@sage/ui'. We should "dog-food" everything. We must not write custom CSS or create custom components that aren't in the Sage UI library. Where there are key missing elements, components, or blocks, we should build them and add them to Sage UI. This includes dynamic Motion elements, of couse. 
2) Should visualize and present the Sage UI system in a beautiful, dynamic, and engaging way, including the thoughful use of animations. [Should not rely on static text and demand lots of reading.]
3) Must be clear, concise, and action-oriented, i.e., able to help the website visitor get up and running as quickly as possible. 
4) Should be stylistically cutting-edge, on par or excelling the quality of the inspirations on line 459 - 462 (and other relevant offerings).
5) Must not use http://localhost:3001/landing (as that's currently occupied with an early version that's sub-par, which you can review for reference, but which does not meet any of the above requirements). 

**Visual Design Inspiration:**
- https://ui.mantine.dev/ - Clean hierarchy, interactive demos
- https://chakra-ui.com/ - Component showcase, clear structure
- https://m3.material.io/ - Systematic thinking, design principles
- https://ui.shadcn.com/ - Modern aesthetic, developer-friendly

**Must-Have Elements:**
1. **Hero Section**
   - Clear headline conveying systematic design language
   - Visual diagram showing the 4-layer hierarchy
   - Primary CTA ("Get Started" / "Explore Components")
   - Secondary CTA ("View Templates" / "See Examples")
   Shalom's brainstorm on the animation for this section:
    - The idea of seeing design tokens assemble into compnents, which snap into blocks, which form into templates feels magical and novel.
    - Show an animation of nodes with clean Bezier curves that pipe into components. Colored dots traveling along these curves represent design token data that's informing the appearance of the components. Then, an animation to the right can show Components, once they're informed by the tokens, moving into shape into the shape of Blocks. Fitting almost Tetris-like. Then, to the right of that, the blocks group into Templates. And that would successfully visualize the 4-layer hierarchy. [And on mobile breakpoints, this shifts from a right-to-left layout to a top-to-bottom one.]

2. **The Four Layers Section**
   - Visual cards for each layer (Tokens → Components → Blocks → Templates)
   - Interactive preview showing how changes cascade through layers
   - Value proposition for each layer
   - Icon/illustration for each layer concept

3. **Live Examples**
   - Interactive component playground
   - Theme switcher showing dynamic theming in action
   - Before/after comparisons showing the power of token-based design
   - Real product examples built with Sage UI

4. **Key Features Grid**
   - Accessibility-first approach
   - Dynamic theming system
   - Responsive by default
   - Developer-friendly API
   - Production-ready components
   - Open source / MIT licensed

5. **Use Cases / Audience**
   - Not just for solopreneurs (broader appeal)
   - Design teams scaling design systems
   - Product teams shipping faster
   - Agencies building client projects
   - Startups needing production-ready UI

6. **Social Proof** (when available)
   - Built with Sage UI showcase
   - GitHub stars / npm downloads
   - Community testimonials

7. **Get Started Section**
   - Installation command
   - Quick start guide
   - Link to documentation
   - Link to component library

**Technical Requirements:**
- Must be responsive (mobile-first)
- Must demonstrate Sage UI's own components
- Must load quickly (<2s LCP)
- Must be accessible (WCAG AA minimum)
- Must include meta tags for social sharing
- Must have clear navigation to docs/components/templates

**Aesthetics:** 
- Glassmorphism (backdrop-blur), subtle borders, and hover lift effects.

**Content Goals:**
- Inspiring but not overwhelming
- Professional but approachable
- Technical but understandable by non-technical stakeholders
- Clear value proposition within 5 seconds
- Call-to-action within first screen

### Success Metrics
- [ ] Clear understanding of Sage UI structure within 30 seconds of landing
- [ ] Compelling reason to explore further (low bounce rate)
- [ ] Smooth path to documentation / getting started
- [ ] Appeals to both developers and design leadership
- [ ] Showcases visual quality and attention to detail
- [ ] Mobile experience as polished as desktop

---
