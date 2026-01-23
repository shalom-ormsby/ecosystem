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

## 🎨 GradientBuilder & GradientPicker Components
**Date Proposed:** 2026-01-23
**Status:** Planned
**Priority:** Medium (Phase 2 - Post OpenGraphCard Quick Wins)

### Project Overview
Create specialized components for visual gradient design and customization, empowering creative professionals to design beautiful gradients without code. This embodies the "Lovable by Design" and "User Control & Freedom" principles by making gradient creation accessible, transparent, and delightful.

### Context & Motivation
The OpenGraphCard component now supports custom gradients via props, but requires developers to manually construct gradient objects. For creative users (designers, solopreneurs, content creators), we need a visual tool that:
- Makes gradient creation intuitive and fun
- Integrates with the existing color palette system
- Validates accessibility (WCAG contrast)
- Exports reusable presets
- Aligns with Sage UI's philosophy of empowering users

### Two Implementation Paths

---

## Option A: GradientPicker (Simpler, Faster)
**Effort:** 1-2 days
**Value:** 80% of functionality, 30% of complexity

### Description
A simplified gradient customization component that provides curated presets and basic customization. Similar in UI pattern to the existing `ColorPicker` component.

### Component Structure
```
packages/ui/src/components/forms/GradientPicker.tsx
```

### Features
1. **Preset Gallery** (10-20 curated gradients)
   - Professional gradients (subtle, corporate)
   - Creative gradients (bold, artistic)
   - Theme-aware presets (Studio, Sage, Volt variants)
   - Each preset includes accessibility rating badge

2. **Simple Customization**
   - Two-color picker (start + end)
   - Type toggle (linear vs radial only)
   - Angle slider for linear (0-360°)
   - Position dropdown for radial (9 preset positions)

3. **Integration**
   - Pull colors from active theme palette
   - Access saved custom palettes
   - Real-time preview on target component
   - Copy CSS code button

4. **Accessibility Layer**
   - Live contrast checker (foreground text vs gradient)
   - WCAG AA/AAA badge display
   - Warning (not blocker) for low contrast
   - Auto-suggest accessible text colors

### Props API
```typescript
interface GradientPickerProps {
  value: GradientConfig;  // Current gradient
  onChange: (gradient: GradientConfig) => void;
  label?: string;
  description?: string;
  showPresets?: boolean;  // Default true
  allowCustom?: boolean;  // Default true
  maxColors?: number;  // Default 2 (start + end only)
  targetForeground?: string;  // For contrast checking
}
```

### UI Layout
```
┌─────────────────────────────────────┐
│  Gradient Picker                    │
├─────────────────────────────────────┤
│  [Preset Gallery Grid - 3 cols]    │
│  ┌───┐ ┌───┐ ┌───┐                 │
│  │ 1 │ │ 2 │ │ 3 │                 │
│  └───┘ └───┘ └───┘                 │
│  ┌───┐ ┌───┐ ┌───┐                 │
│  │ 4 │ │ 5 │ │ 6 │                 │
│  └───┘ └───┘ └───┘                 │
├─────────────────────────────────────┤
│  Custom Gradient                    │
│  ┌─────────────────────────────┐   │
│  │  Live Preview               │   │
│  │  [Gradient Display]         │   │
│  └─────────────────────────────┘   │
│                                     │
│  Start Color: [ColorPicker 1]      │
│  End Color:   [ColorPicker 2]      │
│                                     │
│  Type: ○ Linear  ○ Radial          │
│                                     │
│  [Linear] Angle: [Slider] 135°     │
│  [Radial] Position: [Dropdown]     │
│                                     │
│  ✓ WCAG AA  ✗ WCAG AAA             │
│                                     │
│  [Copy CSS Code] [Apply]           │
└─────────────────────────────────────┘
```

### Implementation Steps

#### Phase 1: Core Component (Day 1, Morning)
- [ ] Create `packages/ui/src/components/forms/GradientPicker.tsx`
- [ ] Define `GradientPickerProps` and `GradientPreset` interfaces
- [ ] Build basic component shell with preview area
- [ ] Implement gradient CSS generation helper
- [ ] Add to `packages/ui/src/components/forms/index.ts`

#### Phase 2: Preset System (Day 1, Afternoon)
- [ ] Create `packages/ui/src/lib/gradient-presets.ts` with 15-20 curated gradients
- [ ] Organize presets by category (professional, creative, theme-aware)
- [ ] Add WCAG ratings and metadata to each preset
- [ ] Build preset gallery grid UI
- [ ] Implement preset selection handling

#### Phase 3: Custom Gradient Controls (Day 2, Morning)
- [ ] Integrate existing `ColorPicker` component for start/end colors
- [ ] Add type toggle (linear/radial) with icons
- [ ] Build angle slider for linear gradients (0-360°)
- [ ] Build position dropdown for radial gradients
  - 9 positions: center, top, bottom, left, right, + 4 corners
- [ ] Wire up live preview updates

#### Phase 4: Accessibility & Integration (Day 2, Afternoon)
- [ ] Implement contrast checker using existing `getContrastRatio()` utility
- [ ] Add WCAG badge display with visual indicators
- [ ] Build "Copy CSS Code" button functionality
- [ ] Connect to palette system (pull from customizer store)
- [ ] Add keyboard navigation support
- [ ] Write component documentation
- [ ] Add to component registry
- [ ] Register in Sage Design Studio

#### Phase 5: Polish & Testing
- [ ] Add motion respect (useMotionPreference)
- [ ] Test with all three themes (Studio, Sage, Volt)
- [ ] Test in light and dark modes
- [ ] Verify accessibility (keyboard nav, screen readers)
- [ ] Add loading states if needed
- [ ] Test export/copy functionality

### Integration Points
1. **CustomizerPanel**: Add as new tab "Gradients"
2. **OpenGraphCard docs**: Show as example customization tool
3. **Color Palettes page**: Link to gradient tools
4. **Component Registry**: Full documentation and examples

### Files to Create/Modify
- `packages/ui/src/components/forms/GradientPicker.tsx` (new)
- `packages/ui/src/lib/gradient-presets.ts` (new)
- `packages/ui/src/components/forms/index.ts` (export)
- `packages/ui/src/index.ts` (export)
- `apps/sage-design-studio/app/components/lib/component-registry.tsx` (register)
- `apps/sage-design-studio/app/components/studio/ComponentsSection.tsx` (add page)

### Success Criteria
- [ ] Non-developers can create beautiful gradients in under 60 seconds
- [ ] All generated gradients meet WCAG AA contrast (or show warning)
- [ ] Seamless integration with OpenGraphCard component
- [ ] Accessible via keyboard navigation
- [ ] Exports valid CSS gradient code
- [ ] Feels delightful and empowering to use

---

## Option B: GradientBuilder (Full-Featured, Advanced)
**Effort:** 2-3 days
**Value:** 100% of functionality, full creative power

### Description
A comprehensive visual gradient editor with multi-stop support, advanced controls, and preset management. Similar to tools like Linear's gradient editor or Coolors gradient maker.

### Component Structure
```
packages/ui/src/components/features/GradientBuilder.tsx
packages/ui/src/components/features/GradientBuilder/
  ├── GradientCanvas.tsx       # Visual gradient preview
  ├── ColorStopEditor.tsx      # Drag-and-drop color stops
  ├── GradientControls.tsx     # Type, angle, position controls
  ├── PresetManager.tsx        # Save/load/organize presets
  ├── ColorSourcePanel.tsx     # Palette integration
  └── AccessibilityPanel.tsx   # Contrast validation
```

### Features

#### 1. Visual Gradient Editor
- **Interactive Canvas**: 
  - Real-time gradient preview (400x200px minimum)
  - Apply to target component preview (e.g., OpenGraphCard)
  - Zoom/pan for precise editing (optional)

- **Color Stop Management**:
  - Drag-and-drop color stops on visual gradient bar
  - Add stops by clicking on gradient bar
  - Remove stops by dragging off bar
  - 2-5 color stop support
  - Each stop shows: color swatch, position % slider, ColorPicker

- **Position Controls**:
  - Visual position indicators (0-100%)
  - Numeric input for precise positioning
  - Snap-to-grid option (5%, 10%, 25% increments)

#### 2. Gradient Type Controls
- **Linear Gradients**:
  - Angle control (0-360°)
  - Visual angle picker (circular control)
  - Common angle presets (0°, 45°, 90°, 135°, 180°, 225°, 270°, 315°)

- **Radial Gradients**:
  - Position control (visual 3x3 grid selector)
  - Custom position input (x%, y%)
  - Shape toggle (circle vs ellipse)
  - Size control (closest-side, farthest-corner, etc.)

- **Conic Gradients** (optional):
  - Start angle control
  - Position control
  - Advanced mode only

#### 3. Color Source Integration
- **Theme Palette Tab**:
  - Pull from active theme (Studio/Sage/Volt)
  - Auto-suggest complementary colors
  - Mode-aware (light/dark)

- **Saved Palettes Tab**:
  - Access user's saved custom palettes
  - One-click apply palette as gradient stops

- **Curated Palettes Tab**:
  - Browse 50+ curated palettes from `@sage/tokens`
  - Filter by category, mood, accessibility
  - Preview palette as gradient

- **Manual Entry**:
  - Standard ColorPicker for each stop
  - Hex input with validation
  - HSL controls for fine-tuning

#### 4. Preset Management System
- **Save Custom Presets**:
  - Name your gradient
  - Add description/tags
  - Store in customizer Zustand store
  - Persist to localStorage

- **Preset Gallery**:
  - Grid view of saved presets
  - Thumbnail previews
  - Quick actions: Apply, Edit, Duplicate, Delete
  - Drag-and-drop reordering

- **Export/Share**:
  - Copy CSS code (background property)
  - Export as JSON (GradientConfig object)
  - Share URL with encoded gradient (optional)
  - Download as PNG preview (optional)

#### 5. Accessibility Layer
- **Real-Time Contrast Checker**:
  - Test against foreground text color
  - Show contrast ratio for each gradient zone
  - Highlight low-contrast areas visually
  - WCAG AA/AAA badge display

- **Accessible Color Suggestions**:
  - Auto-suggest accessible text colors
  - Show multiple options (white, black, theme colors)
  - Visual preview of text on gradient

- **Gradient Accessibility Score**:
  - Overall accessibility rating (A-F scale)
  - Breakdown by gradient zones
  - Improvement suggestions

#### 6. Advanced Features (Optional)
- **Gradient Animation** (for motion-safe users):
  - Preview gradient with animated color shifts
  - Useful for understanding gradient feel

- **Gradient Harmonizer**:
  - Auto-balance color stops for visual harmony
  - Suggest complementary/analogous color adjustments

- **Gradient Randomizer**:
  - Generate random gradients based on constraints
  - Filters: mood, accessibility, color theory rules

### Props API
```typescript
interface GradientBuilderProps {
  initialGradient?: GradientConfig;
  onApply: (gradient: GradientConfig) => void;
  onSavePreset?: (preset: SavedGradientPreset) => void;
  targetComponent?: 'OpenGraphCard' | 'custom';
  targetPreview?: React.ReactNode;  // Custom preview component
  colorSources?: {
    useThemePalette?: boolean;
    useSavedPalettes?: boolean;
    useCuratedPalettes?: boolean;
  };
  maxColorStops?: number;  // Default 5
  allowedTypes?: ('linear' | 'radial' | 'conic')[];  // Default all
  showAccessibilityPanel?: boolean;  // Default true
  foregroundColor?: string;  // For contrast checking
}

interface SavedGradientPreset {
  id: string;
  name: string;
  description?: string;
  gradient: GradientConfig;
  tags?: string[];
  createdAt: number;
  accessibility?: {
    wcagAA: boolean;
    wcagAAA: boolean;
    score: string;  // A-F
  };
}
```

### UI Layout (Desktop)
```
┌─────────────────────────────────────────────────────────────┐
│  Gradient Builder                               [Save] [✕]  │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────┐ ┌─────────────────────────────┐│
│ │  Preview                │ │  Controls                   ││
│ │  ┌───────────────────┐  │ │                             ││
│ │  │                   │  │ │  Type: ○ Linear ○ Radial   ││
│ │  │  Gradient Display │  │ │                             ││
│ │  │  [Live Preview]   │  │ │  [Linear] Angle: 135°      ││
│ │  │                   │  │ │  ┌───────────────────────┐ ││
│ │  └───────────────────┘  │ │  │  [Angle Picker]       │ ││
│ │                         │ │  └───────────────────────┘ ││
│ │  [Apply to OG Card]     │ │                             ││
│ └─────────────────────────┘ │  Presets: [45°][90°][135°] ││
│                             │                             ││
│ Color Stops                 └─────────────────────────────┘│
│ ┌─────────────────────────────────────────────────────────┐│
│ │ ▼          ▼          ▼          ▼                      ││
│ │ ├──────────┼──────────┼──────────┼─────────────────────┤││
│ │ 0%        33%        66%       100%                     ││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ ┌─────────────┬─────────────┬─────────────┬─────────────┐ │
│ │ Stop 1      │ Stop 2      │ Stop 3      │ Stop 4      │ │
│ │ [Color]     │ [Color]     │ [Color]     │ [Color]     │ │
│ │ 0%  [───]   │ 33% [───]   │ 66% [───]   │ 100%[───]   │ │
│ │ [Remove]    │ [Remove]    │ [Remove]    │ [Remove]    │ │
│ └─────────────┴─────────────┴─────────────┴─────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ [Color Sources]  [Presets]  [Accessibility]                │
├─────────────────────────────────────────────────────────────┤
│ Tab Content Area                                            │
│ (Theme Palette | Saved Palettes | Curated | Saved Presets) │
│                                                             │
│ [Contrast Checker | WCAG Badges | Suggestions]             │
└─────────────────────────────────────────────────────────────┘
│ [Copy CSS] [Export JSON] [Save Preset] [Apply]             │
└─────────────────────────────────────────────────────────────┘
```

### Implementation Steps

#### Phase 1: Core Architecture & Canvas (Day 1)
**Morning:**
- [ ] Create folder structure: `packages/ui/src/components/features/GradientBuilder/`
- [ ] Define TypeScript interfaces:
  - `GradientBuilderProps`
  - `SavedGradientPreset`
  - `ColorStop` (internal)
  - `GradientBuilderState` (internal)
- [ ] Create main `GradientBuilder.tsx` shell with layout
- [ ] Build `GradientCanvas.tsx` with live preview
  - Use `buildGradientCSS()` helper from OpenGraphCard
  - 400x200px preview area
  - Real-time updates on prop changes

**Afternoon:**
- [ ] Build `ColorStopEditor.tsx` with drag-and-drop
  - Use `@dnd-kit/core` (already in project)
  - Visual gradient bar with draggable stops
  - Add stop by clicking on bar
  - Remove stop by dragging off or delete button
  - Position indicators (0-100%)
- [ ] Implement internal state management
  - Local component state for color stops
  - Real-time gradient calculation
  - Validation (min 2, max 5 stops)

#### Phase 2: Controls & Type Management (Day 2)
**Morning:**
- [ ] Build `GradientControls.tsx`
  - Type selector (Linear/Radial/Conic tabs)
  - Linear: Angle slider + visual circular picker
  - Radial: Position grid selector (3x3)
  - Common presets (quick angle/position buttons)
- [ ] Wire up controls to gradient state
- [ ] Implement gradient CSS regeneration on control changes

**Afternoon:**
- [ ] Build individual color stop controls
  - Integrate existing `ColorPicker` component
  - Position slider (0-100%)
  - Numeric input for precise positioning
  - Remove button
- [ ] Add snap-to-grid option
- [ ] Add color harmonization helpers
  - Suggest complementary colors
  - Auto-balance stops

#### Phase 3: Color Sources & Presets (Day 3, Morning)
- [ ] Build `ColorSourcePanel.tsx` with tabs:
  - **Theme Palette Tab**: Pull from `useTheme()` and `useCustomizer()`
  - **Saved Palettes Tab**: Access `savedPalettes` from customizer store
  - **Curated Tab**: Import from `@sage/tokens/color-palettes`
- [ ] Build palette → gradient conversion logic
  - Map palette colors to gradient stops
  - Auto-distribute positions
- [ ] Implement "Apply Palette" button for each source

#### Phase 4: Preset Management (Day 3, Afternoon)
- [ ] Build `PresetManager.tsx`
  - Grid gallery of saved gradient presets
  - Thumbnail generation (mini canvas previews)
  - CRUD operations: Create, Read, Update, Delete
- [ ] Integrate with customizer Zustand store
  - Add `gradientPresets` array to store
  - Add actions: `saveGradientPreset`, `deleteGradientPreset`, `reorderGradientPresets`
- [ ] Implement drag-and-drop reordering (use `@dnd-kit`)
- [ ] Add preset metadata (name, description, tags, createdAt)

#### Phase 5: Accessibility & Export (Day 4, Morning)
- [ ] Build `AccessibilityPanel.tsx`
  - Integrate `getContrastRatio()` from `@sage/ui/lib/colors`
  - Test gradient zones against foreground color
  - Display WCAG AA/AAA badges
  - Show accessibility score (A-F)
  - Visual contrast warnings
- [ ] Build auto-suggest accessible text colors
  - Test white, black, theme colors
  - Show preview of text on gradient
- [ ] Add export functionality:
  - Copy CSS code button
  - Export JSON (GradientConfig object)
  - Optional: Download PNG preview

#### Phase 6: Integration & Polish (Day 4, Afternoon)
- [ ] Create curated gradient presets library
  - 20-30 professional gradients
  - Categorize by mood/use case
  - Include accessibility ratings
- [ ] Add keyboard navigation support
  - Tab through color stops
  - Arrow keys to adjust positions
  - Delete key to remove stops
- [ ] Add motion respect (`useMotionPreference`)
  - Smooth transitions for motion-safe users
  - Instant updates for motion-reduced users
- [ ] Add loading/error states
- [ ] Write comprehensive documentation

#### Phase 7: Registration & Testing (Day 5)
- [ ] Add to component exports:
  - `packages/ui/src/components/features/index.ts`
  - `packages/ui/src/index.ts`
- [ ] Register in component registry
  - Full prop documentation
  - Interactive examples
  - Code snippets
- [ ] Add to Sage Design Studio navigation
  - New "Gradient Builder" page under Features
  - Link from OpenGraphCard docs
  - Link from Customizer
- [ ] Build @sage/ui package
- [ ] Integration testing:
  - Test with OpenGraphCard
  - Test with all three themes
  - Test in light and dark modes
  - Test on mobile (responsive layout)
- [ ] Accessibility testing:
  - Keyboard navigation
  - Screen reader compatibility
  - Focus management
  - ARIA labels
- [ ] Cross-browser testing

### Integration Points
1. **CustomizerPanel**: Add as new tab "Gradient Builder"
2. **OpenGraphCard Page**: Dedicated section showing gradient customization
3. **Features Section**: New standalone page for GradientBuilder
4. **Color Palette Pages**: Link to gradient tools from palette pages
5. **Component Registry**: Full documentation with live examples

### Files to Create
**New Components:**
- `packages/ui/src/components/features/GradientBuilder.tsx`
- `packages/ui/src/components/features/GradientBuilder/GradientCanvas.tsx`
- `packages/ui/src/components/features/GradientBuilder/ColorStopEditor.tsx`
- `packages/ui/src/components/features/GradientBuilder/GradientControls.tsx`
- `packages/ui/src/components/features/GradientBuilder/PresetManager.tsx`
- `packages/ui/src/components/features/GradientBuilder/ColorSourcePanel.tsx`
- `packages/ui/src/components/features/GradientBuilder/AccessibilityPanel.tsx`

**New Libraries:**
- `packages/ui/src/lib/gradient-presets.ts` (curated gradients)
- `packages/ui/src/lib/gradient-utils.ts` (helper functions)

**Store Updates:**
- `packages/ui/src/lib/store/customizer.ts` (add gradient preset management)

**Documentation:**
- `apps/sage-design-studio/app/components/studio/pages/features/GradientBuilderPage.tsx`

**Exports:**
- `packages/ui/src/components/features/index.ts`
- `packages/ui/src/index.ts`

**Registry:**
- `apps/sage-design-studio/app/components/lib/component-registry.tsx`

### Success Criteria
- [ ] Creative professionals can design multi-stop gradients visually
- [ ] All gradients validated for WCAG accessibility
- [ ] Seamless integration with color palette system
- [ ] Save and reuse custom gradient presets
- [ ] Export gradients as CSS or JSON
- [ ] Full keyboard accessibility
- [ ] Works flawlessly on mobile and desktop
- [ ] Feels delightful, empowering, and professional
- [ ] Zero learning curve for basic usage
- [ ] Advanced features discoverable but not overwhelming

---

## Recommendation: Which Path to Choose?

### Start with GradientPicker (Option A) if:
- You want quick wins and faster time-to-value
- Your users primarily need simple 2-color gradients
- You want to validate the concept before heavy investment
- You prefer iterative development (ship fast, improve later)

**Timeline:** 1-2 days → Immediate value

### Build GradientBuilder (Option B) if:
- You want a showcase feature that demonstrates Sage UI's philosophy
- Your users are creative professionals who need advanced control
- You want to differentiate from competitors with a unique tool
- You're committed to the long-term vision of empowering creatives

**Timeline:** 4-5 days → Maximum differentiation

### Recommended Hybrid Approach:
1. **Week 1**: Build GradientPicker (Option A)
   - Get 80% of value quickly
   - Validate user interest and usage patterns
   - Gather feedback on UI/UX approach

2. **Week 2-3**: Evaluate and decide
   - If users love it and want more: Build GradientBuilder (Option B)
   - If usage is low: Iterate on GradientPicker
   - If feedback suggests different direction: Pivot

3. **Month 2**: Advanced features
   - Add multi-stop support to GradientPicker
   - Add preset management
   - Gradually evolve toward full GradientBuilder

This approach minimizes risk, maximizes learning, and aligns with agile principles.

---

## Dependencies & Technical Considerations

### Existing Infrastructure to Leverage
- ✅ `ColorPicker` component (ready to use)
- ✅ `@dnd-kit/core` (already in project for drag-and-drop)
- ✅ Color utilities (`getContrastRatio`, `hexToHSL`, `generateColorScale`)
- ✅ Customizer Zustand store (for preset persistence)
- ✅ Theme system (Studio/Sage/Volt)
- ✅ Color palettes (`@sage/tokens/color-palettes`)

### New Dependencies (if needed)
- None required for GradientPicker (Option A)
- Potentially canvas library for advanced preview features (Option B)

### Technical Constraints
1. **Satori Limitation**: OpenGraphCard uses inline styles (no CSS variables)
   - Solution: Gradient tools output explicit hex values
   - Generate CSS strings that work in Satori

2. **Performance**: Real-time gradient updates can be heavy
   - Solution: Debounce gradient calculations
   - Use `useMemo` for expensive computations
   - Optimize re-renders with React.memo

3. **Mobile UX**: Drag-and-drop on mobile is challenging
   - Solution: Alternative tap-and-slide controls
   - Dedicated mobile layout with larger touch targets

4. **Accessibility**: Gradients are inherently visual
   - Solution: Provide text alternatives
   - Ensure keyboard-only navigation works
   - Add screen reader announcements

### Design System Alignment
- Follow existing Sage UI patterns (Card, Button, Input)
- Use theme-aware colors (CSS variables)
- Respect motion preferences (`useMotionPreference`)
- Maintain consistent spacing (8px base unit)
- Use existing typography scale

---

## Philosophy Alignment Check

✅ **Lovable by Design**
- Visual, delightful interface that sparks joy
- Makes complex tasks (gradient creation) feel simple
- Polished animations and micro-interactions

✅ **User Control & Freedom**
- Full customization: presets OR manual design
- Save and reuse creations
- Export in multiple formats
- No forced workflows

✅ **Transparent by Design**
- Real-time preview of changes
- Clear accessibility feedback
- Explainable gradient parameters
- No hidden magic

✅ **Generous by Design**
- Curated presets to solve blank page problem
- Auto-accessible suggestions
- Share and export capabilities
- Teaching tool (learn color theory through use)

---

## Next Steps

1. **Decision Point**: Choose GradientPicker (A) or GradientBuilder (B)
2. **Spike**: 2-hour prototype of chosen approach
3. **Design Review**: Mockup UI in Figma (optional but recommended)
4. **Implementation**: Follow phased approach above
5. **User Testing**: Get feedback from 3-5 target users
6. **Iteration**: Refine based on feedback
7. **Documentation**: Write comprehensive docs
8. **Launch**: Announce to community

