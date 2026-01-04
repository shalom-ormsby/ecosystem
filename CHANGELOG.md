# Changelog

All notable changes to this project will be documented in this file.

**Last updated:** 2026-01-03

## 2026-01-03

### Release - Sage Design System v1.0.0 🎉

**The Sage Design System is now production-ready!**

After extensive development, testing, and documentation, we're proud to release version 1.0.0 of the design system.

**What's Included:**
- **27 production-ready components** (11 atom families, 8 molecules, 8 organisms)
- **3 complete themes** (Studio, Sage, Volt) with light/dark modes
- **Comprehensive token system** (colors, typography, spacing, motion, syntax highlighting)
- **Full accessibility support** (WCAG AA compliance, motion preferences, keyboard navigation)
- **3 custom hooks** (useTheme, useMotionPreference, useForm)
- **Interactive documentation** via Sage Design Studio with LLM optimization
- **Automatic syntax parser** (~2KB) for code highlighting
- **User-controlled motion system** (0-10 scale with system preference sync)
- **The Customizer** - Philosophy-embodying feature for theme/motion control

**Documentation Updates:**
- Comprehensive design system documentation added to ecosystem README
- DESIGN-PHILOSOPHY.md refined to focus on working philosophical foundation
- CHANGELOG updated with Phase 7 completion and all recent enhancements

**Quality Assurance:**
- All components tested and documented
- Complete TypeScript type coverage
- ESM + CJS build outputs
- Ready for npm publishing

This release represents the culmination of the vision: a design system that embodies human-centered principles into every component, token, and interaction.

---

## 2026-01-02

### Added - Sage Design Studio Phase 7 Completion & Breadcrumb Navigation System

#### Phase 7: LLM Optimization - COMPLETE
- **JSON-LD structured data** for all components using Schema.org vocabulary
- **Metadata generator utility** (`app/lib/metadata-generator.ts`) converts ComponentConfig to SoftwareSourceCode format
- **Dynamic metadata injection** via JsonLdMetadata component - updates when component selection changes
- **Full component coverage** - All atoms and molecules now have machine-readable API documentation
- **Accessibility notes** added to all components with GitHub source links

**Benefits for LLMs:**
- Generate correct component usage without reading source code
- Identify missing props or incorrect usage patterns
- Navigate from docs to source code when needed
- Parse structured metadata for semantic understanding

#### Breadcrumb Navigation System
- **Universal breadcrumb implementation** across all Sage Design Studio sections
- **Three breadcrumb variants** - Default, Compact, and Custom separator support
- **Context-aware navigation** - Automatically generates breadcrumbs based on section hierarchy
- **Consistent positioning** - After page title, before description across all docs
- **Integrated into all sections**: Getting Started, Design Tokens (all tabs), Components, Molecules, Hooks, Templates, Motion

**UI/UX Improvements:**
- Even padding and refined spacing for better visual hierarchy
- Quick navigation improvements for better usability
- Corrected file path references and fixed formatting issues

#### Documentation Enhancements
- **Comprehensive documentation audit** across all component pages
- **Core type system enhancements** for better TypeScript support
- **Vercel deployment troubleshooting** documentation added
- **Package exports fixes** for proper module resolution

### Fixed - Button Component & Navigation Patterns
- **Updated Button component defaults** for better accessibility and consistency
- **SecondaryNav formatting** to follow proper design system patterns
- **Vercel build configuration** - Direct turbo usage for monorepo builds

---

## 2026-01-01

### Added - Customizer Enhancements & Motion System Improvements

#### Customizer Component Integration
- **CustomizerDemoFull component** - Complete demonstration of Customizer capabilities
- **CustomizerDemoLightweight component** - Minimal implementation example
- **Customizer integration** into Sage Design Studio documentation
- **Demo fixes** for proper Customizer display and interaction

#### Code Display & Syntax Highlighting
- **Replaced all code blocks** with CollapsibleCodeBlock across documentation
- **Proper syntax highlighting** in all code examples (Overview, Common Patterns, Hooks, Adding Components, Architecture, Organisms sections)
- **Fixed code snippets** across 4 token tab files (Colors, Typography, Spacing, Syntax)
- **Documented "Displaying Code Examples" pattern** for consistent code presentation

#### Motion & Animation System
- **Full-width responsive animations** in Motion tab
- **Syntax-colored code blocks** in Text Effects section
- **Fixed Tailwind config performance warning** and motion animation issues
- **Motion system documentation** improvements for better understanding

#### Documentation Redesign
- **Redesigned Overview section** - More welcoming and provides zero-context orientation
- **Optimized for LLMs and AI agents** - Structured for better machine readability
- **Formatting fixes** and documentation improvements throughout

---

## 2025-12-31

### Added - Automatic Syntax Parser & Documentation Enhancement

#### New Feature: Lightweight Syntax Parser for Code Highlighting
- **Built-in automatic code tokenization** for TypeScript/JavaScript/JSX syntax highlighting
- **Zero-configuration** - just pass plain code strings to `CollapsibleCodeBlock`
- **Lightweight implementation** - ~2KB regex-based parser with O(n) performance
- **14 token types**: comment, keyword, function, string, number, boolean, operator, property, className, tag, attribute, variable, punctuation, plain
- **Theme-aware colors** - syntax highlighting adapts to light/dark mode with WCAG AA contrast
- **No external dependencies** - completely self-contained within design system

#### Core Components
- **`parseCode()` utility** (`design-system/utils/syntax-parser/`) - Automatic tokenization function
  ```typescript
  import { parseCode } from '@ecosystem/design-system/utils'
  const tokens = parseCode(`const greeting = "Hello World";`)
  ```
- **`CollapsibleCodeBlock` organism** - Enhanced with automatic syntax highlighting when `code` prop is a string
- **`Code` atom** - Simple inline/block code display without syntax highlighting
- **14 syntax color tokens** - CSS variables for manual styling (e.g., `var(--syntax-keyword)`)

#### Implementation Details
```typescript
// Auto-parsing happens automatically in CollapsibleCodeBlock
const tokens = useMemo(() => {
  return typeof code === 'string' ? parseCode(code) : code;
}, [code]);

// Supports both automatic and manual tokenization
<CollapsibleCodeBlock
  code={`your code string`}  // Auto-tokenizes
/>
<CollapsibleCodeBlock
  code={manualTokens}  // Or pass pre-tokenized array
/>
```

### Fixed - Comprehensive Code Block Documentation Update

#### Problem
Code blocks throughout Sage Design Studio lacked multi-color syntax highlighting despite the parser being built. All code examples used `Code inline={false}` which only applies single-color styling.

#### Solution
**Systematically replaced 36 instances** of `Code inline={false}` with `CollapsibleCodeBlock` across 6 documentation files:

| File | Instances Fixed | Code Block IDs |
|------|----------------|----------------|
| `OverviewSection.tsx` | 2 | basic-usage, theme-switching |
| `CommonPatternsSection.tsx` | 8 | pattern-1 to pattern-8 |
| `HooksSection.tsx` | 7 | hook-1 to hook-7 |
| `AddingComponentsSection.tsx` | 12 | add-comp-1 to add-comp-12 |
| `ArchitectureSection.tsx` | 1 | arch-1 |
| `OrganismsSection.tsx` | 6 | org-usage-1 to org-usage-6 |

**Transformation pattern**:
```typescript
// Before (single-color)
<Code inline={false} syntax="plain">{`code here`}</Code>

// After (multi-color with auto-parsing)
<CollapsibleCodeBlock
  id="unique-id"
  code={`code here`}
  defaultCollapsed={false}
  showCopy={true}
/>
```

#### Documentation Additions
- **Design System README** - Added comprehensive "Syntax Highlighting & Code Display" section with:
  - Quick example and feature overview
  - 14 syntax token types with CSS variable names
  - Manual usage examples for `parseCode()` utility
  - Component comparison guide (when to use `Code` vs `CollapsibleCodeBlock`)
  - Updated package exports to include syntax parser utilities

- **Sage Design Studio README** - Added "Syntax Highlighting" feature section highlighting:
  - Zero-configuration automatic parsing
  - Lightweight implementation details
  - Theme-aware color system
  - Reference to live documentation

- **Ecosystem Root README** - Added syntax parser to design system feature list

- **SyntaxTab.tsx** - Added "Automatic Syntax Parser" overview card documenting:
  - Three key features (Automatic, Lightweight, 14 Token Types)
  - Live code example with actual syntax highlighting
  - Usage examples (auto-parsing, manual tokenization, CSS variables)

### Results
- ✅ All code blocks in Sage Design Studio now have multi-color syntax highlighting
- ✅ Comprehensive documentation across all README files
- ✅ Live examples visible at https://studio.shalomormsby.com/ (Design Tokens > Syntax)
- ✅ Build verified successfully (sage-design-studio compiled in 6.5s)
- ✅ Zero external dependencies added
- ✅ WCAG AA contrast maintained in both light and dark modes

### Technical Details
- **Parser location**: `design-system/utils/syntax-parser/`
- **Token types**: Exported from `design-system/utils/syntax-parser/types.ts`
- **Color definitions**: `design-system/tokens/syntax.ts`
- **Auto-parsing logic**: `CollapsibleCodeBlock.tsx:71-73`
- **CSS variables**: Applied in ThemeProvider and available globally

## 2025-12-17

### Added - Creative Sandbox Gallery Application

#### New Application: creative-powerup
- **Full-featured gallery application** for code experiments and creative projects
- **Simple, clean architecture**: `app/` directory structure where URL = folder structure (no `src/` complexity)
- **Category-based organization**: Games, Visualizations, Animations, Tools
- **Central experiment registry** (`lib/experiments.ts`) for easy content management
- **Beginner-friendly contribution guide** at `/contribute` with step-by-step GitHub workflow

#### Core Features
- **Homepage gallery** displaying all experiments with cards and metadata
- **Category pages** with filtered views and empty states
- **Experiment cards** showing thumbnails, descriptions, authors, and tags
- **Navigation system** with category links and "+ Create" CTA
- **Full design system integration** with ThemeProvider and CustomizerPanel

#### File Structure
```
apps/creative-powerup/
├── app/
│   ├── layout.tsx              # Root layout with nav + ThemeProvider
│   ├── page.tsx                # Homepage gallery
│   ├── globals.css             # Theme CSS variables
│   ├── contribute/page.tsx     # Contribution guide
│   ├── games/page.tsx          # Games category
│   ├── visualizations/
│   │   ├── page.tsx            # Visualizations category
│   │   ├── fibonacci/page.tsx  # Migrated experiment
│   │   └── hexgrid/page.tsx    # Migrated experiment
│   ├── animations/page.tsx     # Animations category
│   └── tools/
│       ├── page.tsx            # Tools category
│       └── mayan-calendar/     # Migrated experiment
├── components/
│   ├── ExperimentCard.tsx      # Reusable card component
│   └── CategoryPage.tsx        # Reusable category view
└── lib/
    ├── types.ts                # TypeScript interfaces
    ├── experiments.ts          # Central registry
    └── fonts.ts                # Font configuration
```

### Fixed - Styling System & Architecture

#### Critical Tailwind Configuration Fix
**Problem**: Tailwind wasn't processing any files - content paths pointed to non-existent `./src/` directories after restructure.

**Impact**: Zero styling applied - cards, grids, typography all broken.

**Solution**: Updated `tailwind.config.ts` content paths:
```typescript
content: [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",       // Was: "./src/app/**/*"
  "./components/**/*.{js,ts,jsx,tsx,mdx}", // Was: "./src/components/**/*"
  "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  "../../design-system/**/*.{js,ts,jsx,tsx,mdx}",
]
```

Added proper color variable mapping:
```typescript
colors: {
  background: "var(--color-background)",
  "background-secondary": "var(--color-background-secondary)",
  foreground: "var(--color-foreground)",
  primary: "var(--color-primary)",
  accent: "var(--color-accent)",
}
```

#### CSS Variables System Completion
Added missing design system CSS variables to `globals.css`:
- **Color variables**: `--color-glass-border`, `--color-background-secondary`
- **Effect variables**: `--effect-blur-*`, `--effect-shadow-*`
- **Typography variables**: `--font-heading`, `--font-body`, `--font-mono`
- **Motion variables**: `--ease-default`, `--ease-spring`
- **Theme transition styles**: `.theme-transitioning` class for smooth theme changes

### Fixed - Centralized Font Architecture (Critical)

#### The Problem: Duplicate Font Configurations
**Initial approach** (WRONG):
- Each app defined its own font loading in `lib/fonts.ts`
- Font variable names were inconsistent across apps
- ThemeProvider expected specific variable names but apps used different ones
- Result: **Font switching in Customizer didn't work**

#### The Solution: Configuration vs Implementation Pattern
**Architectural principle**: Design-system defines WHAT, apps define HOW.

**Design-System Layer** (Configuration - Framework Agnostic):
- Created `design-system/fonts/index.ts` exporting font configurations:
  ```typescript
  export interface FontConfig {
    family: string;      // "Inter"
    variable: string;    // "--font-studio-heading"
    weight: string[];    // ["400", "500", "600", "700"]
    subsets?: string[];
    display?: string;
  }
  ```
- Defines canonical variable names ThemeProvider expects
- No framework dependencies (Next.js, etc.)
- Single source of truth for font specifications

**App Layer** (Implementation - Framework Specific):
- Apps load fonts with `next/font/google` using config specifications
- Both `creative-powerup` and `portfolio` use identical variable names
- Example:
  ```typescript
  export const studioHeading = Inter({
    variable: '--font-studio-heading',  // From design-system config
    weight: ['400', '500', '600', '700'],
  });
  ```

#### Why This Architecture Matters
**Before**:
- ❌ Duplication across apps
- ❌ Inconsistent variable names
- ❌ Font switching broken
- ❌ Design-system tied to Next.js

**After**:
- ✅ Single source of truth in design-system
- ✅ Consistent variable names guaranteed
- ✅ Font switching works automatically via ThemeProvider
- ✅ Framework-agnostic design-system (can support Vue, Svelte, etc.)
- ✅ Apps remain framework-specific (Next.js font optimization)

#### Implementation Details
1. **ThemeProvider** (`design-system/providers/ThemeProvider.tsx`) sets font CSS variables dynamically:
   ```typescript
   '--font-heading': fonts?.heading || 'var(--font-studio-heading)',
   '--font-body': fonts?.body || 'var(--font-studio-body)',
   '--font-mono': fonts?.mono || 'var(--font-studio-mono)',
   ```

2. **Font maps** defined for each theme:
   - Studio: `--font-studio-heading`, `--font-studio-body`, `--font-studio-mono`
   - Sage: `--font-sage-sans`, `--font-sage-serif`, `--font-sage-mono`
   - Volt: `--font-volt-sans`, `--font-volt-mono`

3. **Apps load all fonts** upfront, ThemeProvider switches which ones are active

### Results
- ✅ Creative Sandbox builds successfully
- ✅ All styling applied correctly (Tailwind + CSS variables)
- ✅ Font switching works with theme changes
- ✅ Zero duplication in font configuration
- ✅ Design-system remains framework-agnostic
- ✅ Both portfolio and creative-powerup use identical font system

### Technical Debt Resolved
- Removed incorrect `design-system/fonts/nextjs.ts` (attempted to load Next.js fonts in library)
- Removed duplicate font configs with wrong variable names
- Fixed TypeScript path aliases in `tsconfig.json` (`"@/*": ["./*"]` instead of `"./src/*"`)
- Updated both apps to React 19 for consistency

## 2025-12-16T14:32:00Z

- Added AGENTS.md with comprehensive guidance for AI collaborators
- Updated DESIGN-PHILOSOPHY.md to elevate "Lovable by Design" as North Star and provide practical guidance for how to encode human-centered principles into every creative decision we make.

## 2025-12-15

### Fixed - Comprehensive Theme System Audit & Completion (Latest)

#### Typography System Enhancement
- **Automatic heading font switching** - All h1-h6 elements now use `var(--font-heading)` automatically
- **Theme-specific typography attributes**:
  - **Studio**: Semi-bold headings (600), tight spacing (-0.02em), clean sans-serif
  - **Sage**: Semi-bold serif headings (Lora 600), relaxed spacing, elegant body text (Instrument Sans)
  - **Volt**: Bold headings (Space Grotesk 700), very tight spacing (-0.03em), geometric sans
- **Typography preview** in Customizer showing active fonts for each theme
- **Font loading references**:
  - Studio: Inter (placeholder for Geist) + JetBrains Mono
  - Sage: Instrument Sans (body) + Lora (headings) + JetBrains Mono (code)
  - Volt: Space Grotesk (both) + Fira Code (code)

#### Theme Token Completion
- **Sage theme fully implemented** with complete color palettes for both light and dark modes:
  - Light: Warm earthy tones (#faf8f5 background, #7a9b7f sage green, #c17a5f terracotta accent)
  - Dark: Deep forest backgrounds (#1a1614) with brighter sage greens and warm peachy accents
  - Complete effects (blur, shadow) and motion curves (slower, organic animations 300-840ms)
- **Volt theme fully implemented** with vibrant cyberpunk aesthetic:
  - Light: Electric blues (#0066ff), vibrant cyan (#00d9ff), sharp contrast
  - Dark: Pure black (#000000) with neon colors (#0099ff, #00ffff), glow shadows
  - Complete effects with glow-style shadows and fast, snappy animations (100-325ms)

#### Global Theme Application
- **Fixed Tailwind config** to use CSS variables instead of hardcoded colors
  - All `neutral.*` shades now use `color-mix()` to blend foreground/background dynamically
  - `background`, `foreground`, `primary`, `accent` all reference theme CSS variables
  - Font families reference theme-specific font variables
- **Fixed Experience Customizer** to be fully theme-aware:
  - Panel background uses glass effect with blur
  - All colors reference CSS variables (no more hardcoded `bg-white`, `text-black`)
  - Active states use `--color-primary` for consistency across themes
  - X-Ray toggle uses `--color-accent`
- **Fixed all portfolio pages** to remove hardcoded colors:
  - Home page: All `text-neutral-*`, `bg-neutral-*` → `text-foreground`, `bg-background`
  - About page: All `text-gray-*` → `text-foreground` with opacity
  - Not Found page: All colors converted to theme-aware classes

#### Visual Theme Differentiation
Now when switching themes, users see dramatically different experiences:
- **Studio**: Clean, professional grays and blues (like Vercel/Linear)
- **Sage**: Warm earth tones, muted greens, organic feel
- **Volt**: Electric blues, sharp contrast, cyberpunk neon (especially in dark mode)

#### Bug Fixes
- Fixed Light/Dark mode only applying to 3 cards → now applies **globally** to entire app
- Fixed Customizer panel not responding to theme changes
- Fixed "Built with Transparent Design" section colors
- Fixed hydration warnings with `suppressHydrationWarning` on html/body tags

---

### Added - Multi-Theme Design System Architecture (Initial Release)

#### Theme System Foundation
- **Multi-theme architecture** supporting 3 distinct design languages:
  - **Studio** (🏢): Professional, balanced aesthetic inspired by Framer, Vercel, Linear
  - **Sage** (🌿): Calm, organic, feminine/yin aesthetic (placeholder for Phase 2)
  - **Volt** (⚡): Bold, electric, masculine/yang aesthetic (placeholder for Phase 3)
- Each theme supports both **light** and **dark** modes (6 total combinations)
- Separation of concerns: primitives (headless components) vs themes (visual identities)

#### Token System
- **Base tokens** (`design-system/tokens/base.ts`):
  - Shared spacing scale (0-32, 4px increments)
  - Typography scales (fontSize, fontWeight, lineHeight)
  - Border radius values
  - Duration values for animations
  - Easing curves
  - Z-index scales
- **Theme-specific tokens**:
  - `design-system/tokens/studio.ts` - Complete implementation
  - `design-system/tokens/sage.ts` - Placeholder structure
  - `design-system/tokens/volt.ts` - Placeholder structure
- **Token categories** per theme:
  - Colors (background, foreground, primary, accent, semantic colors, glass effects)
  - Effects (blur levels, shadow scales)
  - Motion (intensity-based duration calculation, theme-specific easing)
  - Typography (font family references)

#### Theme Switching & State Management
- **Zustand store** (`design-system/store/theme.ts`):
  - Theme selection (studio/sage/volt)
  - Mode selection (light/dark)
  - LocalStorage persistence
  - Type-safe theme configuration
- **ThemeProvider** (`design-system/providers/ThemeProvider.tsx`):
  - Converts theme tokens to CSS variables
  - Applies variables to `:root` element
  - Manages animated transitions (300ms fade)
  - Sets `data-theme` and `data-mode` attributes for conditional styling
  - Graceful fallbacks for incomplete theme definitions

#### Font Loading System
- **Theme-specific fonts** (`apps/portfolio/lib/fonts.ts`):
  - Studio: Inter (placeholder for Geist) + JetBrains Mono
  - Sage: Instrument Sans + Lora serif + JetBrains Mono
  - Volt: Space Grotesk + Fira Code
- **next/font optimization**: All fonts loaded upfront, swapped via CSS variables
- **Easy replacement**: Centralized font configuration for future updates

#### Component Integration
- **Button** (`design-system/atoms/Button/Button.tsx`):
  - Uses CSS variables for all colors
  - Variants: primary, secondary, ghost
  - Sizes: sm, md, lg
- **Card** (`design-system/atoms/Card/Card.tsx`):
  - Uses CSS variables for background, borders, shadows
  - Optional hover effects
  - Theme-aware styling
- **Motion components** (`design-system/atoms/Motion/index.tsx`):
  - FadeIn, StaggerContainer, StaggerItem
  - **Motion intensity integration**: Duration scales with customizer slider (0-10)
  - **Theme-specific motion**: Each theme has unique duration curves and easing
  - **Accessibility**: Intensity 0 = no animations

#### Experience Customizer UI
- **Updated CustomizerPanel** (`design-system/features/customizer/CustomizerPanel.tsx`):
  - Theme picker with emoji indicators (🏢 Studio, 🌿 Sage, ⚡ Volt)
  - Mode toggle (☀️ Light, 🌙 Dark)
  - Motion intensity slider (0-10)
  - X-Ray mode toggle
- **Split stores**: Theme state separate from customizer state
- LocalStorage persistence for all settings

#### CSS Architecture
- **Global CSS variables** (`apps/portfolio/app/globals.css`):
  - Color variables (--color-background, --color-foreground, etc.)
  - Effect variables (--effect-blur-*, --effect-shadow-*)
  - Typography variables (--font-heading, --font-body, --font-mono)
  - Motion variables (--ease-default, --ease-spring)
- **Theme transition styles**:
  - `.theme-transitioning` class for smooth color/background transitions
  - 300ms transition duration with theme-specific easing

#### Motion System Features
- **Intensity-based durations**:
  - Studio: 150ms (intensity 1) → 490ms (intensity 10), linear scale
  - Sage: 300ms (intensity 1) → 840ms (intensity 10), slower, organic
  - Volt: 100ms (intensity 1) → 325ms (intensity 10), fast, snappy
- **Theme-specific easing**:
  - Studio: Smooth, professional curves
  - Sage: Organic, flowing curves
  - Volt: Bouncy, spring-loaded curves
- **Stagger timing**: Scales with motion intensity
- **Zero-motion mode**: Complete animation disable for accessibility

### Technical Details

#### Architecture Decisions
- **CSS variables over Tailwind JIT**: Enables runtime theme switching without recompilation
- **Zustand over Context**: Better performance, simpler API, built-in persistence
- **Token-driven design**: All visual properties defined in tokens, not in components
- **Graceful degradation**: Optional chaining ensures placeholder themes don't break

#### File Structure
```
design-system/
├── tokens/
│   ├── base.ts          # Shared tokens
│   ├── studio.ts        # Studio theme (complete)
│   ├── sage.ts          # Sage theme (placeholder)
│   ├── volt.ts          # Volt theme (placeholder)
│   └── index.ts         # Theme types & exports
├── store/
│   └── theme.ts         # Theme state management
├── providers/
│   └── ThemeProvider.tsx # CSS variable injection
├── atoms/
│   ├── Button/
│   ├── Card/
│   └── Motion/
└── features/
    └── customizer/

apps/portfolio/
├── lib/
│   └── fonts.ts         # Font configuration
└── app/
    ├── globals.css      # CSS variables & transitions
    └── layout.tsx       # ThemeProvider integration
```

#### Build Status
- ✅ All packages build successfully
- ✅ TypeScript type safety maintained
- ✅ Zero runtime errors
- ✅ Backward compatibility preserved with legacy CSS variable names

### Coming Soon (Phases 2-3)

#### Phase 2: Sage Theme
- Complete Sage color palette (muted greens, earth tones)
- Sage-specific effects and glass styling
- WCAG AA compliance testing

#### Phase 3: Volt Theme
- Complete Volt color palette (high-chroma, vibrant from Liquid Glass design)
- Neon glow effects and cyberpunk aesthetic
- WCAG AA compliance testing

#### Accessibility
- WCAG AA compliance testing for all 6 theme/mode combinations
- Motion preference respect (prefers-reduced-motion)
- Keyboard navigation for customizer controls

---

## Notes

This release establishes the foundation for a scalable, multi-theme design system that can power multiple projects with distinct visual identities while sharing the same component primitives. The system is fully token-driven, enabling easy customization and brand adaptation.
