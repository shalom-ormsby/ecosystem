# Changelog

All notable changes to Sage UI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed - Motion Primitives Animations (2026-01-22)

#### Root Cause
- **Framer Motion animations were not auto-playing** on the Motion Primitives page (`#motion/primitives`)
- Three critical issues prevented animations from running:
  1. **Hydration Mismatch**: Animations attempted to run during server-side rendering, causing React hydration errors
  2. **Invalid Easing Format**: CSS cubic-bezier strings (e.g., `cubic-bezier(0, 0, 0.2, 1)`) were passed directly to framer-motion, which requires array format `[0, 0, 0.2, 1]`
  3. **Content Security Policy**: CSP blocked framer-motion's internal code evaluation with `'unsafe-eval'` restriction

#### Solution
- **Client-Side Animation Guard**: Added `isMounted` state flag to prevent animations during SSR
  - Animations only activate after `useEffect` confirms client-side hydration
  - All `animate` props wrapped with `isMounted ? { ... } : undefined` check
- **Easing Token Converter**: Created `parseCubicBezier()` utility function
  - Converts CSS `cubic-bezier(x, y, z, w)` strings to framer-motion array format `[x, y, z, w]`
  - Applied to all easing token usage (playground, duration showcases, easing showcases)
- **CSP Configuration**: Updated `next.config.mjs` to allow framer-motion's animation engine
  - Added `'unsafe-eval'` to `script-src` CSP directive
  - Added `'unsafe-inline'` for inline scripts and styles
- **Hydration Warning Suppression**: Added `suppressHydrationWarning` to `<body>` tag in `layout.tsx`
  - Browser extensions (like Feedly) inject attributes that cause false-positive hydration warnings
  - Suppression is safe as these attributes don't affect app functionality

#### Result
- ✅ All showcase animations now auto-play on page load
- ✅ Progress bars animate at correct durations (instant, fast, normal, slow, slower)
- ✅ Easing demonstrations loop continuously with 2-second pauses
- ✅ Interactive playground responds to user controls
- ✅ No console errors or hydration warnings

### Changed - Themes & Navigation Architecture (2026-01-21)

#### Major Architectural Elevation: "Themes"
- **New Top-Level Section**: Elevated "Themes" to a primary navigation item in the Studio sidebar.
  - **Why**: Creates a clear separation between **Design Tokens** (Definitions/Vocabulary) and **Themes** (Configuration/Dialect).
  - **Structure**:
    - **Design Tokens**: Colors, Typography, Spacing, Shadows, etc.
    - **Themes**: Palettes, Customizer.
    - **Motion**: Primitives, Foundations, etc.
    - **Components**: Functional categories.

#### Navigation & Routing
- **New `ThemesSection`**: Created a dedicated routing container (`#themes`) to house theme-related tools.
- **Route Updates**:
  - `#themes/palettes`: Moved from Design Tokens section.
  - `#themes/customizer`: Moved from Blocks section and expanded into a full-page experience.
- **Updated `navigation-tree.tsx`**: Reflected the new hierarchy in the sidebar configuration.

#### Component Relocations
- **Palettes**: Moved `PalettesTab` from `TokensSection` to `ThemesSection`.
- **Customizer**: 
  - Moved from a nested "block" example in `BlocksSection` to a first-class tool in `ThemesSection`.
  - Refactored from a floating panel demo to a full-page `CustomizerTab` dashboard.
  - Removed deprecated demo components (`CustomizerDemoFull`, `CustomizerDemoLightweight`) to clean up the codebase.

### Changed - Colors Tab Overhaul (2026-01-21)

#### Unified Color Experience
- **Inspector Mode**: Transformed the Colors tab (`#tokens/colors`) into a context-aware inspector for the active palette.
- **Active Palette Context**: Now displays the name and description of the currently applied palette (e.g., "Midnight Sapphire") instead of generic controls.
- **Generated Scale Visualization**: Added a new section showing the automatically generated 50-900 color scale for the primary color, revealing how the Color Engine derives shades.
- **Improved Token Grid**: Refined the variable grid with better copy-to-clipboard interactions and visual polish.
- **Store Updates**: Extended `ColorPalette` interface in `@sage/ui` to persist palette metadata (name, description) to the global store.

### Added - Interaction System & Token Refactor (2026-01-21)

#### Systematic Interaction Layer ("State Layers")
- **New Interaction Tokens**: Added to `@sage/tokens` and `globals.css`
  - `hover`: Overlay color and opacity (0.08)
  - `active`: Scale transform (0.98)
  - `focus`: Ring color, width (2px), and offset (2px)
  - `disabled`: Opacity (0.5)
- **`.sage-interactive` Utility**: A global utility class that standardizes interaction physics:
  - Applies `position: relative` and `isolation: isolate`
  - Creates an `::after` pseudo-element for the overlay (tint)
  - Handles `transform: scale(0.98)` on active state
  - Manages `z-index` to ensure content stays above the overlay
  - Supports `prefers-reduced-motion`

#### Component Updates
- **Button**: Refactored to use `.sage-interactive`, removing bespoke hover styles.
- **Sidebar**: Updated `SidebarItem` to use the standardized interaction layer.
- **PalettesTab**: Refactored `Reset` and `Apply` feature buttons to use the new system.

#### Documentation
- **New `InteractionsTab`**: Added to Design Tokens section (`#tokens/interactions`)
  - Application methodology for "State Layers"
  - Live demos for Button states, Custom Elements, Active Scale, Focus Rings, and Disabled states
  - Full Interaction Token reference
  - Code examples using `CollapsibleCodeBlock`
- **Navigation & Search**:
  - Added "Interactions" to the sidebar navigation
  - Indexed "Code Block" and "Interactions" in the command palette

#### Fixes
- **CollapsibleCodeBlock**:
  - Registered component in `search-index.ts` (now searchable as "Code Block")
  - Fixed documentation to use this component for high-contrast code display
- **Search Index**: Added missing entries for code blocks and interaction tokens
- **Theme Restoration**: Restored dark mode variables in `globals.css`

### Added - Drag & Drop Component (2026-01-21)

#### DragDropList Component
- **New `@sage/ui/components/forms/DragDrop.tsx`**: Full-featured drag-and-drop functionality
  - **DragDropList**: Sortable list with drag-and-drop reordering
  - **DragDropTable**: Sortable table rows with drag handles
  - **DragDropHandle**: Optional drag handle component for precise control
  - **Features**:
    - Touch/mobile support with PointerSensor (5px activation threshold)
    - Keyboard accessibility (arrow keys + Space for reordering)
    - Smooth animations powered by @dnd-kit
    - Visual feedback (shadows, rings, drag overlay)
    - Collision detection with closestCenter algorithm
  - **TypeScript Support**: Full generic types for type-safe item rendering
  - **Dependencies**: Added `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`

#### Interactive Documentation
- **New `apps/sage-design-studio/app/components/studio/pages/forms/DragDropPage.tsx`**: Comprehensive examples
  - **Example 1**: Simple drag & drop list with status badges
  - **Example 2**: List with drag handle + interactive delete buttons
  - **Example 3**: Sortable table with custom column renderers
  - Collapsible code blocks for each example
  - Complete API reference with props documentation
- **Navigation**: Added to Forms section in sidebar
- **Search**: Indexed with keywords: drag, drop, sortable, reorder, dnd, draggable
- **Path**: Accessible at `#forms/drag-drop`

### Added - Dynamic Color Customization System (2026-01-20)

#### Curated Color Palette Library
- **New `@sage/tokens/color-palettes.ts`**: Created 21 professionally curated color palettes across 7 categories
  - **Professional** (5 palettes): Midnight Sapphire, Forest Executive, Burgundy Trust, Slate Corporate, Navy Prestige
  - **Creative** (3 palettes): Coral Sunset, Teal Wave, Purple Dream
  - **Natural** (2 palettes): Earth Tones, Ocean Breeze
  - **Vibrant** (2 palettes): Electric Lime, Sunset Orange
  - **Minimal** (3 palettes): Monochrome, Pure Black, Soft Neutral
  - **Tech** (3 palettes): Cyber Blue, Matrix Green, Developer Dark
  - **Warm** (3 palettes): Golden Hour, Rust & Clay, Peach Cream
- **Palette Metadata**: Each palette includes:
  - Primary, secondary (optional), and accent colors
  - Mood descriptors (trustworthy, creative, energetic, etc.)
  - WCAG AA/AAA accessibility compliance flags
  - Best use cases and inspiration notes
  - Semantic categorization for easy discovery

#### Advanced Color Engine
- **New `@sage/tokens/color-utils.ts`**: Standalone color transformation utilities
  - `hexToHSL()` / `hslToHex()`: Bidirectional color space conversion
  - `adjustLightness()`: Perceptually uniform tint/shade generation
  - `adjustSaturation()`: Saturation manipulation for color harmony
  - `rotateHue()`: Hue rotation for complementary/analogous colors
  - `getContrastRatio()`: WCAG contrast ratio calculation
  - `getOptimalForeground()`: Automatic accessible foreground color selection
  - **Why Standalone**: Prevents circular dependencies (@sage/tokens ← @sage/ui)
- **Enhanced `@sage/ui/lib/colors.ts`**: Extended with HSL transformations
  - `generateColorScale()`: Tailwind-style 50-900 tint/shade variants
  - Integrated with existing color utilities for seamless token generation

#### Token Dependency Graph ("Change Once, Ripple Everywhere")
- **New `@sage/tokens/token-graph.ts`**: Explicit dependency mapping system
  - Maps 15+ CSS variables that automatically derive from `--color-primary`
  - **UI Tokens**: `--color-link`, `--color-link-hover`, `--color-ring`, `--color-accent`
  - **Chart Tokens**: `--chart-1` through `--chart-5` with intelligent derivations
    - Chart 1: Primary color (identity)
    - Chart 2: +20% lighter (tint variation)
    - Chart 3: -15% darker (shade variation)
    - Chart 4: -30% saturation (muted variant)
    - Chart 5: 180° hue rotation (complementary color)
  - **Mode-Aware Derivations**: Different transformations for light vs dark mode
  - `computeDerivedTokens()`: Single function call updates entire token tree
  - **Architecture Benefit**: Single source of truth ensures design consistency

#### Enhanced Customizer System
- **Completely Rewritten `@sage/ui/lib/store/customizer.ts`**: Extended Zustand store
  - **Per-Theme, Per-Mode Storage**: `customColors[theme][mode]` nested structure
  - **ColorPalette Interface**: Complete palette object with:
    - Primary/secondary/accent colors with auto-calculated foreground colors
    - Full 50-900 color scale for each custom color
    - Derived tokens map (15+ dependent CSS variables)
  - **Simple vs Advanced Mode**:
    - Simple: Single primary color, auto-generates secondary/accent
    - Advanced: Discrete primary, secondary, and accent color controls (future enhancement)
  - **Zustand Persist Middleware**:
    - localStorage persistence with version migration (v2)
    - Survives page refreshes and browser sessions
    - Scope: Per-theme and per-mode (studio/light, sage/dark, etc.)
  - **Actions**:
    - `setCustomPrimaryColor(theme, mode, hexColor)`: Generates complete palette with dependency graph
    - `setCustomSecondaryColor()`: Updates secondary + re-computes derived tokens
    - `setCustomAccentColor()`: Updates accent + re-computes derived tokens
    - `resetCustomColors(theme, mode?)`: Clears customizations (specific mode or entire theme)
    - `getActiveColorPalette(theme, mode)`: Retrieves current custom palette

#### Smart Theme Provider Integration
- **Enhanced `@sage/ui/providers/ThemeProvider.tsx`**: Non-destructive token merging
  - `mergeCustomColorTokens()`: Overlays custom palette onto base theme tokens
  - **Merge Strategy**:
    1. Start with base theme tokens (studio.ts, sage.ts, volt.ts)
    2. Override primary color + foreground
    3. Override full color scale (50-900)
    4. Override secondary/accent if present
    5. **Critical**: Merge all derived tokens from dependency graph
  - **DOM Updates**: Batched via `requestAnimationFrame()` for performance
  - **Data Attribute**: `data-custom-colors="active"` for debugging/styling
  - **Reactive**: Automatically responds to theme/mode/palette changes

#### New ColorPicker Component
- **New `@sage/ui/components/forms/ColorPicker.tsx`**: Interactive color selection UI
  - **Dual Input Methods**:
    - Visual color picker (native `<input type="color">`)
    - Hex code text input with validation
  - **Features**:
    - Real-time hex validation (`/^#[0-9A-Fa-f]{6}$/`)
    - Live color preview swatch
    - Error states for invalid input
    - Optional/disabled states
    - Label and description support
  - **UX**: Synced two-way binding between picker and text input
- **Exported from `@sage/ui`**: Available as `import { ColorPicker } from '@sage/ui'`

#### PalettesTab in Design Tokens
- **New `apps/sage-design-studio/app/components/studio/TokensSection/PalettesTab.tsx`**: Interactive palette browser
  - **Category Filter Buttons**: 7 categories with icons (Briefcase, Palette, Leaf, Zap, Minimize, Code, Flame)
  - **Accessibility Toggle**: "Show only WCAG AA compliant" filter
  - **Palette Grid**: Visual cards with:
    - Color swatches (primary + accent preview)
    - Palette name and description
    - Mood tags as chips
    - "Apply Palette" button
    - Accessibility badges (AA/AAA compliance)
    - "Best for" use case tags
  - **Apply Functionality**: One-click palette application to current theme/mode
  - **Active State Indicator**: Shows which palette is currently applied
  - **Responsive**: Grid layout adapts from 1-3 columns based on viewport
- **Registered in TokensSection**: Added to tab navigation alongside Colors, Typography, Spacing, etc.

#### Customizer Panel Enhancements
- **Updated `@sage/ui/components/layout/CustomizerPanel.tsx`**: Added primary color customization
  - **New Section**: "Primary Color" with Palette icon
  - **ColorPicker Integration**: Visual picker + hex input
  - **Apply/Reset Buttons**:
    - "Apply Color": Disabled when no changes detected
    - "Reset": Only shown when custom colors are active
  - **Status Indicator**: "Custom color active for {theme} {colorMode} mode"
  - **UX Flow**:
    1. User selects color (picker or hex input)
    2. Color stored in temp state
    3. User clicks "Apply Color"
    4. Entire UI updates instantly via token dependency graph
    5. Reset button restores default theme colors

#### Package Dependencies
- **Fixed `apps/sage-design-studio/package.json`**: Added missing `@sage/tokens` dependency
  - **Error**: Vercel build failing with "Cannot find module '@sage/tokens'"
  - **Root Cause**: PalettesTab imports from @sage/tokens but dependency wasn't declared
  - **Fix**: Added `"@sage/tokens": "workspace:*"` to dependencies
  - **Verification**: Local build successful, Vercel deployment successful (commit `e6a5d98`)

### Changed

#### Token Architecture
- **Separated Color Utilities**: Moved color transformation functions from @sage/ui to @sage/tokens
  - **Why**: Prevents circular dependency (@sage/tokens depends on @sage/ui for utils, @sage/ui depends on @sage/tokens for tokens)
  - **Solution**: Created standalone `color-utils.ts` in @sage/tokens package
  - **Impact**: Clean dependency graph, faster builds, better code organization

#### Customizer Store Schema
- **Version Migration**: Bumped Zustand persist version from v1 to v2
  - **New Fields**: `customizationMode`, `customColors` nested structure
  - **Backward Compatibility**: Old localStorage data automatically migrated
  - **Storage Key**: `ecosystem-customizer` (shared across themes)

#### ThemeProvider Behavior
- **Non-Destructive Theming**: Custom colors overlay base theme without replacement
  - **Before**: Would need to replace entire theme object
  - **After**: Merges only changed tokens, preserves theme personality
  - **Benefit**: Custom colors don't break carefully crafted theme relationships

### Fixed

#### Build Errors
- **Circular Dependency Resolution**:
  - **Error**: `@sage/tokens` build failing when importing from `@sage/ui/utils`
  - **Fix**: Created `@sage/tokens/color-utils.ts` with standalone utilities
  - **Verification**: `pnpm build --filter @sage/tokens` successful (47.46 KB)

- **Vercel Deployment Failure**:
  - **Error**: `Type error: Cannot find module '@sage/tokens'` in PalettesTab.tsx
  - **Fix**: Added workspace dependency to sage-design-studio package.json
  - **Verification**: Vercel build successful, live site updated

### Technical Details

#### Architecture Decisions
1. **HSL Color Space**: Chosen over RGB for perceptually uniform transformations
   - Lightness adjustments produce consistent visual weight changes
   - Saturation control enables harmonic color variations
   - Hue rotation enables complementary/analogous color generation

2. **Token Dependency Graph**: Explicit over implicit derivations
   - Each derived token has documented transform function
   - Enables future UI for "which tokens will change if I change primary?"
   - Supports different derivation rules for light vs dark mode

3. **Zustand Over Context**: State management choice
   - Built-in persistence middleware (localStorage)
   - Better performance (selective re-renders)
   - DevTools integration
   - Version migration support

4. **Non-Destructive Merging**: Overlay pattern over replacement
   - Preserves base theme carefully crafted relationships
   - Enables "reset to default" without reloading page
   - Supports partial customization (only primary, or primary + secondary)

#### Files Created
- `packages/tokens/src/color-palettes.ts` (428 lines) - 21 curated palettes
- `packages/tokens/src/color-utils.ts` (187 lines) - Standalone color utilities
- `packages/tokens/src/token-graph.ts` (156 lines) - Dependency graph system
- `packages/ui/src/components/forms/ColorPicker.tsx` (98 lines) - Color selection UI
- `apps/sage-design-studio/app/components/studio/TokensSection/PalettesTab.tsx` (267 lines) - Palette browser

#### Files Modified
- `packages/ui/src/lib/colors.ts` - Added HSL transformation functions
- `packages/ui/src/lib/store/customizer.ts` - Completely rewritten for color customization
- `packages/ui/src/providers/ThemeProvider.tsx` - Added smart token merging
- `packages/ui/src/components/layout/CustomizerPanel.tsx` - Added primary color section
- `packages/ui/src/components/forms/index.ts` - Exported ColorPicker
- `packages/tokens/src/index.ts` - Exported new modules
- `apps/sage-design-studio/app/components/studio/TokensSection/index.tsx` - Added PalettesTab
- `apps/sage-design-studio/package.json` - Added @sage/tokens dependency

#### Commits
- `e6a5d98` - fix(sage-design-studio): Add missing @sage/tokens dependency for Vercel build

### Benefits

1. **"Change Once, Ripple Everywhere"**: Single primary color updates 15+ dependent tokens automatically
2. **No Blank Page Problem**: 21 curated palettes eliminate designer's block
3. **Accessibility First**: Auto-calculated WCAG-compliant foreground colors, palette compliance badges
4. **Per-Theme Customization**: Different colors for Studio vs Sage vs Volt themes
5. **Per-Mode Customization**: Different colors for light vs dark mode
6. **Persistent Across Sessions**: localStorage ensures customizations survive page refreshes
7. **Non-Destructive**: Reset to defaults without losing base theme personality
8. **Developer-Friendly**: Token dependency graph makes customization predictable
9. **Production-Ready**: Vercel build verified, no TypeScript errors
10. **Future-Extensible**: Architecture supports Advanced mode (discrete primary/secondary/accent)

### User Flow

1. User opens Customizer panel (floating button bottom-right)
2. User selects Theme (Studio/Sage/Volt)
3. User selects Mode (Light/Dark)
4. **Option A - Browse Palettes**:
   - Navigate to Design Tokens → Palettes tab
   - Filter by category (Professional, Creative, Natural, etc.)
   - Toggle "Show only WCAG AA compliant"
   - Click "Apply Palette" on desired palette
5. **Option B - Custom Color**:
   - In Customizer panel, use color picker or enter hex code
   - Click "Apply Color"
6. **Result**: Entire UI updates instantly
   - Buttons use new primary color
   - Links use new primary color
   - Charts use harmonized color scale derived from primary
   - Focus rings match primary color
   - All changes scoped to selected theme + mode
7. **Reset**: Click "Reset" button in Customizer to restore defaults

### Next Steps (Future Enhancements)

- **Advanced Mode**: Toggle to enable discrete Primary, Secondary, and Accent color controls
- **Export/Import**: Share custom color schemes as JSON
- **Preset Saving**: Save custom palettes for reuse
- **Live Preview**: Real-time preview of color changes before applying
- **Gradient Support**: Custom gradient generation from primary color
- **Dark Mode Intelligence**: Auto-adjust lightness for dark mode compliance

---

### Added - Charts Experience (2026-01-20)

#### Interactive Chart Previews
- **New `ChartPreview` Component**: Encapsulated all chart examples (Bar, Line, Area, Pie) in a standardized preview container.
- **"View Code" Functionality**:
  - Users can now toggle source code visibility for each chart.
  - Integrated `CollapsibleCodeBlock` with syntax highlighting and "Copy" button.
  - Provides copy-paste ready code snippets for quick implementation.

#### Visual Enhancements
- **Charts Overview**: Added mini, non-interactive chart visualizations to the category cards for better "glanceability".
- **Pie Chart**: Corrected animation direction to open clockwise (`endAngle={-270}`).
- **Line Chart**: Fixed visibility issue by correcting CSS variable resolution in `chartConfig` (removed invalid `hsl()` wrapper around hex variables).

### Added - Motion Component Migration (2026-01-17)

#### Motion Library Integration (@sage/ui)
- **Migrated Motion Components** from Studio examples to `@sage/ui` package:
  - `SplashCursor`: WebGL fluid simulation cursor
  - `TargetCursor`: Precise custom cursor with hover states
  - `WarpBackground`: Immersive 3D starfield warp effect (formerly Galaxy)
- **Export Strategy**:
  - **Named Exports**: Available as top-level named exports (e.g., `import { SplashCursor } from '@sage/ui'`)
  - **Namespace Export**: Grouped under `Motion` and `Backgrounds` namespaces (e.g., `import { Backgrounds } from '@sage/ui';`)
  - This dual strategy supports both convenient direct imports and semantic grouping.

#### Studio Updates
- **Refactored Motion Pages**:
  - `CursorsSection.tsx`: Updated to use library components
  - `SplashCursorPage.tsx`: Updated to use library components
  - `WarpSpeedPage.tsx`: Migrated Galaxy to Warp Speed, using library component.
  - Preserved existing functionality while leveraging the shared library source of truth.

### Changed - Motion Primitives Revamp (2026-01-18)
- **Unified Motion Primitives Dashboard**:
  - Replaced separate Duration and Easing pages with a single, interactive **Primitives** playground.
  - **Interactive Controls**: Added real-time controls for Duration, Easing, Animation Property (Fade, Scale, Slide, Rotate), Looping, and Scale Factor.
  - **Enhanced Visualizations**:
    - **Default Easing**: New smooth ball-on-track animation demonstrating ease-out with reverse looping.
    - **Spring Easing**: Box scaling and rotating to demonstrate overshoot mechanics.
    - **Duration Scale**: Added "Instant" duration visualization with unique blinking pattern.
  - **Documentation**: Integrated educational content for Duration Scale and Easing Curves using a sticky `SecondaryNav`.
  - **Mobile Responsiveness**: Optimized layout for mobile devices with stacked controls and preview.

### Added - Motion Components (2026-01-18)
- **Typewriter Component**:
  - Implementation of character-by-character text reveal effect using `framer-motion` staggering.
  - Supports configurable speed, start delay, cursor character, and blinking cursor animation.
  - Added documentation playground page with interactive controls for speed, delay, and content.
- **Magnetic Component**:
  - Physics-based interaction wrapper that pulls elements towards the cursor.
  - Configurable `strength` prop to control attraction intensity.
  - Added documentation playground page demonstrating button and icon interaction patterns.

### Fixed - Variable Weight Animation
- **Fixed `VariableWeightText` animation**:
  - Updated globally imported Clash Display font to use the variable weight version (`ClashDisplay-Variable.woff2`).
  - Corrected `fontVariationSettings` implementation to ensure smooth weight interpolation.
  - Updated demo text to "Variable weight" to better showcase the effect.

### Added - Quality Verification (2026-01-14)

#### Component Registry Completion
- **Added Input component** to Studio component registry
  - Comprehensive documentation with 7 input types (text, email, password, number, tel, url, search)
  - 5 interactive examples (default, email, password, disabled, with label)
  - 3 code examples (basic usage, with label, form integration)
  - Full accessibility documentation
  - shadcn/ui source URL reference

- **Added Label component** to Studio component registry
  - Complete documentation with Radix UI Label primitive details
  - 3 interactive examples (with Input, with Textarea, with Checkbox)
  - 3 code examples (basic usage, with checkbox, required field indicator)
  - WCAG 2.1 Level AA accessibility notes
  - shadcn/ui source URL reference

#### Quality Verification Documentation
- **NEW: `QUALITY_VERIFICATION_REPORT.md`** - Comprehensive 500+ line verification report
  - Complete inventory of all 48 components across 7 categories
  - Detailed findings of missing components (Input and Label)
  - MCP server verification results (100% component coverage)
  - Build verification status for all packages
  - Manual testing checklists for browser and MCP integration
  - Testing requirements for production deployment
  - Files modified documentation

#### Strategy Document Updates
- Updated Phase 3.75 status from "In Progress" to "Complete"
- Added quality verification completion details
- Updated decision log with Jan 14 quality verification entry
- Updated roadmap to reflect verification completion
- Changed overall status to include "Quality Verification Complete"

### Fixed

#### Critical Registry Issues
- **Input component missing** from Studio registry
  - Component was exported from `@sage/ui` ✓
  - Component was in navigation list ✓
  - Component was NOT in component registry ✗
  - Impact: HIGH - Input is a fundamental form component
  - Resolution: Added comprehensive 99-line registry entry


- **Label component missing** from Studio registry
  - Component was exported from `@sage/ui` ✓
  - Component was in navigation list ✓
  - Component was NOT in component registry ✗
  - Impact: HIGH - Label is essential for accessible forms (WCAG 2.1 AA)
  - Resolution: Added comprehensive 86-line registry entry

#### Build & Infrastructure Fixes
- **Functional Organization Build Repairs**
  - **Issue:** `@sage/ui` build failing after massive refactor due to import path and prop errors.
  - **Resolution:**
    - `packages/ui/src/lib/store/theme.ts`: Fixed import path from `../tokens` to `@sage/tokens` workspace package.
    - `packages/ui/src/components/forms/ThemeSwitcher.tsx`: Removed unsupported `size` prop from `Switch` component.
    - `packages/ui/src/components/feedback/Toast.tsx`: Deleted duplicate file (conflicting with `Toast/Toast.tsx`).
    - `packages/ui/src/index.ts` & `src/components/feedback/index.ts`: Removed duplicate exports for Toast component.
    - `apps/sage-design-studio`: Resolved all TypeScript build errors in `component-registry.tsx`, `HooksSection.tsx`, and `universal/page.tsx` by migrating imports and adding required props to satisfy strict types.
    - `packages/design-system`: Updated legacy `Card` component to disable `hoverEffect` by default, resolving UI inconsistencies in the "Adding Components" section.
    - **Release**: Bumped `@sage/ui` to v0.0.2 and `@ecosystem/design-system` to v1.0.1 to ensure fresh builds on deployment.
    - **Hotfix**: Refactored `Toast.tsx` to move style injection into `useEffect` to prevent build-time crashes. Bumped versions to v0.0.3 / v1.0.2.
    - **Critical Fix**: Fixed SSR build crash in `useMotionPreference.ts` by adding browser environment check before accessing `window.matchMedia`. This was causing Vercel deployment failures for all commits after the functional design framework refactor. Bumped versions to v0.0.4 / v1.0.3.
    - **Critical Fix**: Added missing `zustand` dependency to `@sage/ui` package.json. The package was using zustand in store files but it wasn't declared as a dependency, causing build failures on Vercel. Bumped versions to v0.0.5 / v1.0.4.

### Changed

#### Component Updates
- **Card Component**
  - Changed default `hoverEffect` from `true` to `false`.
  - Effect: Cards no longer elevate on hover by default, removing false interaction affordance.
  - Opt-in: Explicitly pass `hoverEffect={true}` to restore the elevation animation.
  - Updated Component Registry documentation and examples to match new default.

### Verified

#### Package Build Status
- ✅ @sage/ui package builds successfully (112.71 KB ESM, 131.28 KB CJS)
- ✅ @sage/mcp package builds successfully (32.22 KB ESM, 32.24 KB CJS)
- ✅ @ecosystem/sage-design-studio builds successfully (Next.js 15.5.9)
- ✅ No TypeScript compilation errors
- ✅ All type declarations generated correctly

#### MCP Server Verification
- ✅ **48/48 components registered** (100% coverage)
- ✅ All 4 MCP tools functional:
  - `list_components` - Lists all/filtered components by category
  - `search_components` - Semantic search tested with multiple queries
  - `get_component` - Retrieves detailed component metadata
  - `install_component` - Provides installation instructions
- ✅ Component distribution verified:
  - Actions: 3/3 components ✓
  - Forms: 11/11 components ✓ (including Input and Label)
  - Navigation: 6/6 components ✓
  - Overlays: 9/9 components ✓
  - Feedback: 5/5 components ✓
  - Data Display: 6/6 components ✓
  - Layout: 8/8 components ✓
- ✅ Search functionality tested:
  - Search "input" returns 7 relevant components
  - Search "form" returns 18 relevant components
  - Case-insensitive search working
  - Keyword matching across descriptions and use cases

### Technical Details

#### Files Modified
- `apps/sage-design-studio/app/components/lib/component-registry.tsx`
  - Added `Input` import to registry imports (line 4)
  - Added complete Input registry entry (lines 1613-1711, 99 lines)
  - Added complete Label registry entry (lines 1712-1797, 86 lines)
  - Total: 185 lines of comprehensive documentation

- `apps/sage-design-studio/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md`
  - Updated status from "Quality Verification In Progress" to "Complete"
  - Updated Phase 3.75 section with completion details
  - Added decision log entry for quality verification
  - Updated roadmap with verification completion status

#### Files Created
- `apps/sage-design-studio/docs/QUALITY_VERIFICATION_REPORT.md` (500+ lines)
- Comprehensive verification summary in scratchpad

### Testing Required

**Manual browser testing required before production deployment:**
- [ ] Test Input component on live site (https://studio.shalomormsby.com/)
- [ ] Test Label component on live site
- [ ] Systematic testing of all 48 components
- [ ] MCP server integration testing with Claude Desktop
- [ ] MCP server integration testing with Cursor IDE
- [ ] Accessibility audit with axe-core
- [ ] Visual regression testing against shadcn/ui reference

See `QUALITY_VERIFICATION_REPORT.md` for detailed testing checklists.

### Benefits

1. **Complete Component Coverage**: All 48 components now fully documented in Studio
2. **MCP Server Ready**: 100% component coverage for AI-native development workflow
3. **Accessibility Compliance**: Label component documentation ensures WCAG 2.1 AA compliance
4. **Build Verification**: All packages confirmed building without errors
5. **Quality Assurance**: Comprehensive testing framework established
6. **Documentation**: Complete verification report for future reference

---

## [3.0.0] - 2026-01-14

### Added - Functional Organization Architecture

**Major architectural restructure of the Sage UI from atomic design to functional organization.**

#### Component Library Restructure (@sage/ui)
- **48 components reorganized** into 7 functional categories
  - Actions (3): Button, Toggle, ToggleGroup
  - Forms (11): Checkbox, Combobox, Form, Input, InputOTP, Label, RadioGroup, Select, Slider, Switch, Textarea
  - Navigation (6): Breadcrumb, Command, Menubar, NavigationMenu, Pagination, Tabs
  - Overlays (9): AlertDialog, ContextMenu, Dialog, Drawer, DropdownMenu, HoverCard, Popover, Sheet, Tooltip
  - Feedback (5): Alert, Progress, Skeleton, Sonner, Toast
  - Data Display (6): Avatar, Badge, Calendar, Card, DataTable, Table
  - Layout (8): Accordion, AspectRatio, Carousel, Collapsible, DatePicker, Resizable, ScrollArea, Separator

#### File Structure Changes
- Moved all component files to category subdirectories
  - `packages/ui/src/components/Button.tsx` → `packages/ui/src/components/actions/Button.tsx`
  - Applied to all 48 components
- Updated 57+ relative import paths (`../lib/utils` → `../../lib/utils`)
- Fixed cross-component imports to reference new category paths
- Created category index.ts files for re-exports
- Updated main barrel exports for backward compatibility

#### Studio Navigation Updates
- **Two-level navigation system**: Category selector → Component selector
- Category descriptions for improved discoverability
- Replaced "Atoms" terminology with "Functional Organization"
- Added "Legacy" category for @ecosystem/design-system components
- Automatic category detection from URL/component name

#### Documentation
- **NEW: `SAGE_DESIGN_SYSTEM_STRATEGY.md`** - Comprehensive strategy document consolidating:
  - Vision & philosophy (solopreneur stack, code ownership model)
  - Current status and recent achievements
  - Architecture (three-tier model: Primitives → Assemblies → Templates)
  - Component organization (functional categories explained)
  - Implementation progress (phase completion status)
  - Quality standards and testing requirements
  - Development workflow (adding components, fixing issues, build commands)
  - Roadmap (Q1-Q4 2026 and beyond)
  - Decision log and lessons learned

- **Archived legacy documentation**:
  - Moved `SDS_MASTER_PLAN.md` to archive (superseded by new strategy doc)
  - Moved `SDS_SHADCN_STRATEGY.md` to archive (integrated into strategy doc)
  - Moved `Evolving the Sage UI from Atomic to functional organization.md` to archive (implemented)
  - Moved `shadcn-parity-status.md` to archive (integrated into strategy doc)

- **Updated remaining documentation**:
  - Marked functional organization proposal as IMPLEMENTED
  - Added implementation status notes with commit references
  - Updated SDS_MASTER_PLAN.md decision log (before archiving)

### Changed

#### Backward Compatibility Maintained
- **Zero breaking changes** - all existing imports continue to work
- `import { Button } from '@sage/ui'` still works exactly as before
- Added optional category-based imports for future use
- TypeScript compilation verified successful

#### Build System
- All packages build successfully after restructure
- Import path resolution verified
- Type declarations generated correctly

### Fixed

#### TypeScript Compilation
- Added type assertions for category lookup to resolve index signature errors
- Fixed `COMPONENT_CATEGORIES[selectedCategory]` type safety issues

### Technical Details

#### Commits
- `77c39eb` - refactor(@sage/ui): Restructure components from flat to functional organization
- `51f4747` - feat(studio): Implement functional category navigation
- `78b7001` - fix(studio): Add TypeScript type assertion for category lookup

#### Files Modified
- **48 component files** moved to category subdirectories
- **7 category index.ts files** created
- `packages/ui/src/index.ts` - Updated with category-organized exports
- `apps/sage-design-studio/app/components/studio/ComponentsSection/index.tsx` - New two-level navigation
- `apps/sage-design-studio/docs/` - Multiple documentation updates and reorganization

### Benefits

1. **Improved Discoverability**: Developers find components by function, not abstraction level
2. **Industry Alignment**: Matches modern design system patterns (shadcn, Material UI, Radix, Chakra)
3. **Eliminated Ambiguity**: No more debates about atomic classification
4. **Better Documentation**: Studio navigation matches mental models
5. **Future Ready**: Prepared for Tier 2 (Assemblies) and Tier 3 (Templates)
6. **Zero Disruption**: Backward compatible exports ensure smooth transition

### Migration Notes

**For Consumers:**
- No action required - all imports work as before
- Optional: Start using category-based imports when convenient
- Example: `import { Button } from '@sage/ui/actions'` (future enhancement)

**For Contributors:**
- New components go in appropriate category directory
- Follow updated development workflow in SAGE_DESIGN_SYSTEM_STRATEGY.md
- Update category index.ts when adding components

## [2.1.0] - 2026-01-07

### Added - Sage UI Cross-Platform Architecture (Phase 1)
- **New Monorepo Strategy (The "Sage Stack")**
  - **`@sage/tokens`**: New dedicated workspace for universal design tokens. Extracted from `design-system` to serve as the single source of truth for Web and Mobile.
  - **`@sage/config`**: New shared configuration workspace (Tailwind, etc.).
  - **`SDS_MASTER_PLAN.md`**: Comprehensive roadmap and migration strategy documentation.

### Changed
- **`design-system` Refactor**:
  - Now consumes tokens from `@sage/tokens` instead of local files.
  - Removed legacy token files (`base.ts`, `colors.json`, etc.) to enforce the new architecture.
  - Updated `package.json` to use workspace protocol: `"@sage/tokens": "workspace:*"`.

### Added - Universal UI (Phase 2)
- **`@sage/ui` Workspace**:
  - Initialized with `nativewind` v4, `react-native-web`, and `@rn-primitives`.
  - Configured tailwind preset to consume `@sage/tokens`.
  - **Universal Button**: Created first cross-platform component (`src/components/Button.tsx`) using `Pressable` and `Slot` pattern.
  - **Universal Test Page**: Added `/universal` route in Sage Design Studio to verify the button.

### Added - Mobile Entry (Phase 3)
- **`apps/mobile`**:
  - Initialized Expo (Managed) project with TypeScript.
  - Configured **Metro** for monorepo resolution (handling workspace packages).
  - Configured **NativeWind v4** with `babel` and `tailwind.config.js`.
  - Consumes `@sage/ui` and `@sage/tokens` directly.
  - Added Universal Button demo to `App.tsx`.

## [2.0.1] - 2026-01-05

### Changed
- **Icon System Migration**
  - Replaced all direct emoji usage with `lucide-react` icons for consistency and accessibility.
  - **Sidebar:** Updated navigation icons (BookOpen, Palette, Component, Webhook, LayoutTemplate).
  - **Documentation:** Replaced status flags (✅/❌) with CheckCircle/XCircle in `MotionFoundationsSection`.
  - **Accessibility:** Replaced wheelchair emoji (♿) with Accessibility icon.
  - **Component Demos:** Replaced emojis in `TypographyTab`, `OrganismsSection`, `TextEffectsSection`.
  - **Architecture:** Replaced text arrows with proper ArrowRight icons.
  - **Sections Updated:** `OverviewSection`, `ContributingSection`, `TemplatesSection`, `TypographyTab`, `OrganismsSection`, `TextEffectsSection`, `MotionFoundationsSection`.

### Fixed
- **Mobile Responsive Layout**
  - **Issue:** Severe horizontal scrolling and content overflow on mobile viewports due to unconstrained flex containers and code blocks.
  - **Root Cause:** Deeply nested flex containers in section components (`AddingComponentsSection`, `OrganismsSection`, etc.) were missing `min-w-0` and `w-full` constraints. Specifically, `flex-1` containers within list items (`li`) would refuse to shrink below the intrinsic width of their children (code blocks with long paths), forcing the parent card to expand beyond the viewport.
  - **Fix:** Systemically applied the "Flatten & Clamp" strategy:
    - Added `w-full min-w-0` to the root container of all studio sections:
      - `AddingComponentsSection`
      - `ArchitectureSection`
      - `CommonPatternsSection`
      - `HooksSection`
      - `MoleculesSection`
      - `OrganismsSection`
      - `TemplatesSection`
      - `TokensSection`
    - **Crucial:** Added `min-w-0` to all `flex-1` containers in list items to allow flex shrinking.
    - Constrained `CollapsibleCodeBlock` internal containers with `w-full max-w-full` in the design system to ensure independent responsiveness.
    - Added `overflow-x-hidden` to the main page layout to prevent global scroll leaks.
    - Fixed `portfolio` build failure by exporting `SearchInput` from `design-system`.
  - **Outcome:** Zero horizontal scroll on mobile. Content now correctly shrinks to fit the viewport, and code blocks trigger their own internal scrollbars instead of breaking the page layout.
- **Sticky Navigation Restoration**
  - **Issue:** Sticky headers (`SecondaryNav`, `TertiaryNav`) stopped sticking due to `overflow-x-hidden` applied to `PageLayout` container during mobile responsive fixes.
  - **Fix:** Removed `overflow-x-hidden` from `PageLayout` and `StudioPage` containers. Horizontal overflow protection is now handled exclusively by the `body` element constraints.
- **Component Architecture Refactor**
  - **Issue:** Several components (`NavigationFallback`, `SecondaryNav`, `TertiaryNav`) relied on manual utility classes instead of atomic components, violating design system principles.
  - **Fix:** Refactored these components to use `Heading`, `Text`, `Button`, and `FilterButton` strictly.
  - **Enhancement:** Added `variant="link"` to `Button` and `shape` prop to `FilterButton` to support these patterns natively.

## [2.0.0] - 2026-01-02

### Added - Phase 7: LLM Optimization & Accessibility

#### LLM-Friendly Metadata System
- **JSON-LD Metadata Generation** ([app/lib/metadata-generator.ts](app/lib/metadata-generator.ts))
  - `generateComponentMetadata()` - Converts ComponentConfig to Schema.org SoftwareSourceCode format
  - `generateFullDocumentation()` - Creates complete API documentation object for all components
  - Supports atoms, molecules, organisms, tokens, and hooks
  - Uses Schema.org vocabulary for semantic web standards

- **Dynamic Metadata Injection** ([app/components/JsonLdMetadata.tsx](app/components/JsonLdMetadata.tsx))
  - Client-side component that dynamically injects `<script type="application/ld+json">` tags
  - Updates metadata when component selection changes
  - Automatic cleanup on unmount
  - Enables LLMs and search engines to parse structured component documentation

- **Metadata Integration**
  - Atoms: [ComponentPlayground.tsx](app/components/studio/ComponentsSection/ComponentPlayground.tsx) (lines 6-7, 16, 52)
  - Molecules: [MoleculesSection.tsx](app/components/studio/MoleculesSection.tsx) (lines 6-7, 52, 87)
  - Metadata includes: component name, description, props (with types, defaults, requirements), code examples, accessibility notes, source URLs

#### Accessibility Documentation
- **Component Registry Enhancements**
  - Added `accessibilityNotes` field to ComponentConfig interface
  - Breadcrumbs: 6 comprehensive accessibility notes ([molecule-registry.tsx:140-145](app/components/lib/molecule-registry.tsx#L140-L145))
  - Button: 6 detailed accessibility notes ([component-registry.tsx:162-169](app/components/lib/component-registry.tsx#L162-L169))
  - Modal: Accessibility section in organisms documentation ([OrganismsSection.tsx:1437-1447](app/components/studio/OrganismsSection.tsx#L1437-L1447))

- **Accessibility UI Rendering**
  - ComponentPlayground.tsx: Accessibility section with wheelchair emoji (♿), card styling, conditional rendering (lines 148-165)
  - MoleculesSection.tsx: Identical accessibility section pattern (lines 200-217)
  - Consistent visual design: border-left accent, bullet points, proper spacing

#### Enhanced Type System
- **PropConfig Extended** ([component-registry.tsx](app/components/lib/component-registry.tsx))
  - New prop types: `'array' | 'object' | 'interface' | 'custom'` (in addition to existing `'select' | 'boolean' | 'text'`)
  - `typeDefinition?: string` - Display complex TypeScript types (e.g., `"BreadcrumbItem[]"`)
  - `required?: boolean` - Mark required props with visual indicator
  - Backward compatible - all new fields are optional

- **ComponentConfig Extended**
  - `codeExamples?: Array<{ title: string; code: string; description?: string }>` - CollapsibleCodeBlock examples
  - `sourceUrl?: string` - GitHub source link for LLM navigation
  - `accessibilityNotes?: string[]` - Accessibility documentation

#### PageLayout Organism Integration
- **OrganismsSection.tsx Updates** ([OrganismsSection.tsx](app/components/studio/OrganismsSection.tsx))
  - PageLayout imported from `@ecosystem/design-system` (line 4)
  - Added to organisms navigation list (lines 366-367)
  - Full documentation section (lines 413-467):
    - Component description and features
    - Key features list (z-index stacking, sticky positioning, composition)
    - Accessibility section with semantic HTML notes
    - Usage example with CollapsibleCodeBlock

### Changed

#### Component Documentation Enhancement
- **Breadcrumbs Registry** ([molecule-registry.tsx](app/components/lib/molecule-registry.tsx))
  - Added missing `items` prop with proper type definition
  - Complete prop documentation with descriptions
  - Code examples with TypeScript interface
  - GitHub source link
  - Accessibility notes

#### UI Improvements
- **Accessibility Section Styling**
  - Consistent ♿ wheelchair emoji header
  - Border-left-4 accent with primary color
  - Bullet points with rounded indicators
  - Responsive spacing and typography

### Fixed
- **API Endpoint Removed**
  - Initial plan included `/api/components` REST endpoint
  - Removed due to Next.js App Router constraints (API routes cannot import client components)
  - JSON-LD metadata embedded in pages serves the same purpose for LLM consumption

### Documentation
- **README.md Updates** ([README.md](README.md))
  - Added "LLM-Optimized Documentation" feature
  - Added "Accessibility-First" feature
  - New "LLM Optimization" section explaining JSON-LD metadata system
  - Updated "Structure" section with new files
  - Enhanced "Adding New Components" guide with complete example
  - Updated roadmap reflecting Phase 1-7 completion

- **PHASE-7-COMPLETION.md** ([PHASE-7-COMPLETION.md](PHASE-7-COMPLETION.md))
  - Comprehensive completion report
  - Implementation details for all Phase 7 features
  - Testing instructions
  - Files modified list
  - Success metrics

## Technical Details

### Metadata Structure (Schema.org)
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "ComponentName",
  "description": "Component description",
  "programmingLanguage": "TypeScript",
  "codeRepository": "GitHub URL",
  "runtimePlatform": "React",
  "keywords": ["component", "react", "design-system", "ui"],
  "properties": [
    {
      "@type": "PropertyValueSpecification",
      "name": "propName",
      "description": "Prop description",
      "valueRequired": false,
      "defaultValue": "default",
      "valueType": "string"
    }
  ],
  "codeExample": [
    {
      "@type": "SoftwareSourceCode",
      "name": "Example Title",
      "description": "Example description",
      "programmingLanguage": "TypeScript",
      "text": "Code snippet"
    }
  ],
  "accessibilityNotes": ["Note 1", "Note 2"]
}
```

### Benefits for LLMs
1. **Structured API Documentation**: LLMs can parse component props, types, defaults, and requirements
2. **Code Examples**: Practical usage examples in standardized format
3. **Source Navigation**: Direct links to GitHub source code
4. **Semantic Understanding**: Schema.org vocabulary provides context
5. **Search Optimization**: Search engines can index and display rich component information

### Files Created
- `app/lib/metadata-generator.ts` - Metadata generation utilities (103 lines)
- `app/components/JsonLdMetadata.tsx` - JSON-LD injection component (32 lines)
- `PHASE-7-COMPLETION.md` - Comprehensive completion documentation
- `CHANGELOG.md` - This file

### Files Modified
- `app/components/studio/ComponentsSection/ComponentPlayground.tsx` - Added metadata and accessibility sections
- `app/components/studio/MoleculesSection.tsx` - Added metadata and accessibility sections
- `app/components/studio/OrganismsSection.tsx` - Added PageLayout documentation
- `app/components/lib/component-registry.tsx` - Enhanced PropConfig and ComponentConfig interfaces, added Button accessibility notes
- `app/components/lib/molecule-registry.tsx` - Added Breadcrumbs complete props and accessibility notes
- `README.md` - Comprehensive updates for Phase 7 features

## Contributors
- **Primary Development**: Claude Code (Anthropic) & Shalom Ormsby
- **Additional Work**: Antigravity (Accessibility patterns, PageLayout integration)

---

[Unreleased]: https://github.com/shalom-ormsby/ecosystem/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/shalom-ormsby/ecosystem/releases/tag/v2.0.0
