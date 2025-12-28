# Sage Design Studio: Strategic Vision & Implementation Plan

> **"Transparent by Design"**
> The same design system powering the entire ecosystem is publicly accessible—not as mere code or JSON tokens, but as dynamic, interactive, visual components. This is transparency embodied.

---

## 🎯 Vision & Purpose

### What Is Sage Design Studio?

**Sage Design Studio** is the living, interactive documentation and visualization platform for the ecosystem's design system. It transforms static design tokens and component code into a dynamic, explorable experience that:

1. **Showcases the design system** in action with live, interactive components
2. **Educates** developers and designers on how to use the system
3. **Demonstrates "Transparent by Design"** by making the foundation of the ecosystem publicly accessible
4. **Provides intrinsic value** as a standalone design resource
5. **Enables future growth** beyond just the design system (brand guidelines, product design resources, templates)

### Why This Matters

Most design systems hide behind authentication walls or remain as static documentation. Sage Design Studio embodies the philosophy that **transparency builds trust and enables creativity**. By making the design system publicly explorable:

- Developers can see exactly how components behave before using them
- Designers can understand the design decisions encoded in tokens
- The community can learn from and be inspired by the system
- Future clients/collaborators can evaluate design quality firsthand
- The ecosystem demonstrates its values, not just talks about them

### Strategic Positioning

**Short-term**: Interactive design system documentation
**Mid-term**: Comprehensive design resource hub (brand guidelines, UI patterns, templates)
**Long-term**: Potential productization (premium templates, Figma kits, licensing)

The name "Sage Design Studio" supports this evolution—it's professional, expandable, and positions this as a valuable design destination, not just documentation.

---

## 📐 Information Architecture

### URL Structure

**Primary Access**: `shalomormsby.com/studio`

**Why `/studio` and not `/design-system`?**
- More concise and memorable
- Aligns with premium positioning
- Allows for expansion beyond just design system components
- Professional, not technical

### Site Placement

**Portfolio Landing Page → Tools Section**

```
shalomormsby.com/
├─ Work (case studies, shipped products)
├─ Play (experimental projects)
└─ Tools ✅
   ├─ Sage Design Studio → /studio
   │  "Explore the design system, brand guidelines, and
   │   resources that power the entire ecosystem"
   └─ [Future tools...]
```

**Rationale**: The Studio is a resource/tool that provides value to others while showcasing design capabilities. It's not a "work" project (client deliverable) or "play" project (experiment)—it's a foundational tool.

---

## 🏗️ Technical Architecture

### Ecosystem Structure

```
ecosystem/
├── apps/
│   ├── creative-powerup/           # Consumes design system
│   ├── portfolio/                  # Consumes design system + hosts /studio route
│   ├── sage-design-studio/         # ✨ NEW: Standalone Studio app
│   ├── sage-stocks/                # Consumes design system
│   └── sageos/                     # Consumes design system
├── design-system/                  # ✨ Source of truth (library package)
│   ├── atoms/
│   ├── tokens/
│   ├── features/
│   ├── hooks/
│   ├── providers/
│   └── docs/
│       └── SAGE-DESIGN-STUDIO.md   # This document
└── packages/
```

### Why Separate App?

**Design System Package** (`ecosystem/design-system/`)
- Pure library: components, tokens, hooks, providers
- No application code or routing
- Published as `@ecosystem/design-system`
- Consumed by all apps

**Sage Design Studio App** (`ecosystem/apps/sage-design-studio/`)
- Next.js application that imports from `@ecosystem/design-system`
- Interactive playground and documentation
- Lives alongside other ecosystem apps
- Can be independently deployed or integrated into portfolio

**Benefits**:
1. ✅ Clean separation of concerns (library vs. documentation)
2. ✅ Design system remains focused and lightweight
3. ✅ Studio can be developed/deployed independently
4. ✅ Matches ecosystem's monorepo pattern
5. ✅ Easy to open source Studio separately if desired
6. ✅ Better for future scaling (add brand guidelines, design resources)

### Integration Strategy: Portfolio Proxy/Route

**Approach**: Portfolio app routes `/studio` to the Sage Design Studio app

**Implementation**:
```typescript
// apps/portfolio/next.config.mjs
rewrites: async () => [
  {
    source: '/studio/:path*',
    destination: 'http://localhost:3001/:path*', // Dev
    // OR in production: proxy to deployed Studio app
  }
]
```

**Benefits**:
- ✅ Seamless user experience (same domain)
- ✅ Apps remain independent
- ✅ Studio can be deployed/updated separately
- ✅ Portfolio controls routing but doesn't contain Studio code

**Alternative Considered**: Portfolio imports Studio components directly
- ❌ Tighter coupling
- ❌ Portfolio bundle increases
- ❌ Harder to maintain separately

---

## 🗺️ Sage Design Studio: Page Structure

### Landing View (Default)

```
┌─────────────────────────────────────────────────┐
│ 🏠 HERO                                         │
│ ─────────────────────────────────────────────   │
│ "Sage Design Studio"                           │
│ "The heart of the ecosystem"                   │
│                                                  │
│ [View on GitHub] ← Primary CTA (top right)     │
│                                                  │
│ Introduction paragraph explaining philosophy   │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ 📚 STICKY SECTION NAV                           │
│ [ Overview ] [ Tokens ] [ Atoms ] [ Molecules ] │
│ [ Organisms ] [ Templates ] [ Resources ]       │
└─────────────────────────────────────────────────┘
```

### Section Breakdown

#### 1. Overview Section (Default View)

**Purpose**: Communicate philosophy and value

**Content**:
- **Philosophy Card**: "Transparent by Design" principles
- **Three Themes Showcase**: Studio, Sage, Volt visual comparison
- **Key Features Grid**:
  - Design Tokens (single source of truth)
  - Customizer (user control & freedom)
  - Motion System (respects preferences)
  - Open Source (community-driven)
- **Tech Stack**: React, TypeScript, Tailwind, Framer Motion, Zustand

#### 2. Tokens Section

**Purpose**: Visual reference for all design tokens

**Sub-navigation**: `[ Colors ] [ Typography ] [ Spacing ] [ Motion ] [ Effects ]`

**Colors Tab**:
- Theme switcher (Studio / Sage / Volt)
- Mode toggle (Light / Dark)
- Color palette grid:
  ```
  ┌───────────────────────────┐
  │ [Swatch]                  │
  │ --color-primary           │
  │ #2563EB                   │
  │ "Used for primary actions"│
  └───────────────────────────┘
  ```
- Shows all semantic colors across all themes
- Compare themes side-by-side

**Typography Tab**:
- Live type specimens (all sizes, weights, fonts)
- Theme-specific font pairings:
  - Studio: Geist Sans, Geist Mono
  - Sage: Lora (serif), Instrument Sans
  - Volt: Space Grotesk
- Scale visualization (12px → 48px)
- Line height examples

**Spacing Tab**:
- Visual ruler showing scale (4px → 64px)
- Interactive examples
- Common layout patterns

**Motion Tab**:
- Duration demos (instant → slow)
- Easing curve visualizations
- Motion intensity slider demo
- Accessibility note (respects prefers-reduced-motion)

#### 3. Atoms Section (Components Playground)

**Purpose**: Interactive component documentation

**Layout**: Component list → Detail view

**For Each Component** (Button, Card, Header, Link, Motion):

```
┌─────────────────────────────────────────────────┐
│ Component Name                                  │
│ ─────────────────────────────────────────────   │
│                                                  │
│ [Live Preview Area]                             │
│ Interactive component with current props        │
│                                                  │
│ Props Controls                                  │
│ variant: ○ Primary  ○ Secondary  ○ Ghost       │
│ size:    ○ SM  ● MD  ○ LG                      │
│                                                  │
│ ```typescript                                   │
│ <Button variant="primary" size="md">           │
│   Click me                                      │
│ </Button>                                       │
│ ```                                             │
│ [Copy Code]                                     │
│                                                  │
│ Props API Table                                 │
│ │ Name    │ Type   │ Default │ Description   │ │
│ │ variant │ string │ primary │ Visual style  │ │
│ │ size    │ string │ md      │ Size variant  │ │
│                                                  │
│ Features List                                   │
│ • Theme-aware colors                            │
│ • Respects motion preferences                  │
│ • Full keyboard support                        │
└─────────────────────────────────────────────────┘
```

**Components in MVP**:
- ✅ Button (3 variants, 3 sizes)
- ✅ Card (with hover effect demo)
- ✅ Header (with navigation, mobile menu demo)
- ✅ Link (with variants)
- ✅ Motion (FadeIn, Stagger examples)

#### 4. Molecules Section (Phase 2)

**Purpose**: Composed components (FormField, SearchBar, NavigationMenu)

**Status**: Coming Soon placeholder

#### 5. Organisms Section (Phase 3)

**Purpose**: Complex composed components (Modal, PageHeader, Footer)

**Status**: Coming Soon placeholder

#### 6. Templates Section (Phase 4)

**Purpose**: Full page layouts and patterns

**Status**: Coming Soon placeholder

#### 7. Resources Section (Future)

**Purpose**: Downloadable assets, Figma files, templates

**Content Ideas**:
- Figma design files
- Icon packs
- Illustration sets
- Brand guidelines PDF
- Component templates

---

## 🚀 Phased Implementation Plan

### Phase 1: MVP (Today) ✅

**Goal**: Get Sage Design Studio live with core functionality

**Deliverables**:
1. ✅ Create `apps/sage-design-studio/` app structure
2. ✅ Configure Next.js with design system integration
3. ✅ Set up portfolio routing (`/studio` → Studio app)
4. ✅ Build Landing/Hero section with GitHub CTA
5. ✅ Build sticky Section Navigation
6. ✅ Build Overview section (philosophy, features, tech stack)
7. ✅ Build Tokens section:
   - Colors tab (palette grid, theme switcher)
   - Typography tab (specimens, scales)
8. ✅ Build Atoms section:
   - Button component playground
   - Card component playground
   - Header component playground
9. ✅ Implement code snippet highlighting (Shiki)
10. ✅ Add "Coming Soon" placeholders for Molecules/Organisms/Templates

**Success Metrics**:
- Can visit `shalomormsby.com/studio`
- Can switch themes and see color palettes update
- Can interact with Button props and see live changes
- Can copy code snippets
- Design system changes in `/design-system` automatically reflect in Studio

**Timeline**: Current session

---

### Phase 2: Polish & Expand (Next Session)

**Goal**: Add remaining token visualizations and more components

**Deliverables**:
1. Spacing tab with visual ruler
2. Motion tab with animation demos
3. Effects tab (shadows, blur)
4. Link component playground
5. Motion components (FadeIn, Stagger) playground
6. Search/filter for components
7. Responsive preview (mobile/tablet/desktop views)
8. Better code snippet formatting with copy feedback

**Timeline**: Next 1-2 sessions

---

### Phase 3: Brand Guidelines (Future)

**Goal**: Expand beyond design system to comprehensive design resources

**Deliverables**:
1. Brand section with logo usage guidelines
2. Color philosophy and meaning
3. Typography principles
4. Voice & tone guidelines
5. Illustration style
6. Photography guidelines

**Timeline**: TBD based on need

---

### Phase 4: Resources & Downloads (Future)

**Goal**: Provide downloadable assets and templates

**Deliverables**:
1. Figma file downloads
2. Component templates (Notion, Framer, etc.)
3. Icon sets
4. Brand assets (logos, lockups)
5. Potentially premium/paid resources

**Timeline**: TBD based on interest/demand

---

## 🔗 Ecosystem Integration

### How Apps Consume the Design System

All apps in the ecosystem import from the design system package:

```typescript
// Any app in ecosystem/apps/
import { Button, Card, Header } from '@ecosystem/design-system'
import { useTheme, useMotionPreference } from '@ecosystem/design-system/hooks'
import { CustomizerPanel } from '@ecosystem/design-system/features/customizer'
import { ThemeProvider } from '@ecosystem/design-system'
```

**Critical Requirement**: Changes to design system must ripple to all consuming apps

### Ensuring Automatic Updates

**Approach**: Workspace protocol in monorepo

```json
// apps/*/package.json
{
  "dependencies": {
    "@ecosystem/design-system": "workspace:*"
  }
}
```

**What This Ensures**:
- ✅ All apps always use the latest local version of design system
- ✅ Changes to components/tokens immediately available
- ✅ No need to publish/version during development
- ✅ Apps automatically rebuild when design system changes (in dev mode)

### Development Workflow

1. **Edit design system**: `ecosystem/design-system/atoms/Button/Button.tsx`
2. **Design system rebuilds**: `pnpm dev` in design-system package
3. **Apps auto-reload**: Portfolio, Studio, Creative Powerup all pick up changes
4. **Studio reflects changes**: New Button behavior visible immediately in playground

**Command to run everything**:
```bash
# From ecosystem root
pnpm dev  # Runs all apps + design system in watch mode
```

### Production Build

```bash
# Build design system first
cd design-system && pnpm build

# Then build all apps (they import the built version)
cd .. && pnpm build
```

---

## 📊 Success Criteria

### MVP Success (Phase 1)

- [ ] Studio accessible at `shalomormsby.com/studio`
- [ ] Can explore all design tokens (colors, typography)
- [ ] Can interact with at least 3 components (Button, Card, Header)
- [ ] Code snippets are syntax-highlighted and copyable
- [ ] Theme switching works (Studio ↔ Sage ↔ Volt)
- [ ] Changes to design system are reflected in Studio immediately
- [ ] GitHub link is prominently placed at top
- [ ] Mobile responsive
- [ ] Accessible (keyboard navigation, screen readers)

### Long-term Success

- [ ] Becomes a reference others use when building with the design system
- [ ] Reduces questions about "how do I use X component?"
- [ ] Showcases design quality in portfolio presentations
- [ ] Generates interest in design system for potential licensing/productization
- [ ] Serves as educational resource for learning design systems

---

## 🎨 Design Philosophy Alignment

### How Sage Design Studio Embodies "Transparent by Design"

1. **Visibility**: Design decisions (tokens, components) are publicly explorable, not hidden
2. **Education**: Explains *why* decisions were made, not just *what* they are
3. **Accessibility**: Anyone can see and understand the system, no authentication required
4. **Interactivity**: Not static docs—users can manipulate and explore
5. **Honesty**: Shows real, working components, not marketing screenshots
6. **Open Source**: Code is public, principles are shareable

### How It Supports Other Design Principles

**Lovable by Design**:
- Beautiful, polished UI for the Studio itself
- Smooth interactions and transitions
- Delightful details (copy feedback, smooth theme transitions)

**User Control & Freedom**:
- Users can switch themes, adjust motion, explore at their own pace
- Customizer works in the Studio, letting users personalize the experience

**Generous by Design**:
- Provides clear examples and usage patterns
- Teaches through interaction, not just documentation
- Shares knowledge freely with the community

---

## 📝 File Structure Reference

### Sage Design Studio App

```
apps/sage-design-studio/
├── app/
│   ├── layout.tsx                      # Root layout with ThemeProvider
│   ├── page.tsx                        # Main studio page
│   ├── components/
│   │   ├── studio/
│   │   │   ├── StudioHero.tsx         # Landing section
│   │   │   ├── SectionNav.tsx          # Sticky navigation
│   │   │   ├── OverviewSection.tsx     # Philosophy & features
│   │   │   ├── TokensSection/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── ColorsTab.tsx
│   │   │   │   ├── TypographyTab.tsx
│   │   │   │   ├── SpacingTab.tsx
│   │   │   │   └── MotionTab.tsx
│   │   │   ├── ComponentsSection/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── ComponentPlayground.tsx
│   │   │   │   ├── PropControls.tsx
│   │   │   │   └── CodeSnippet.tsx
│   │   │   └── ComingSoonSection.tsx
│   │   └── lib/
│   │       ├── component-registry.ts   # Component metadata
│   │       ├── token-data.ts           # Token information
│   │       └── syntax-highlighter.ts   # Shiki configuration
│   ├── globals.css
│   └── favicon.ico
├── public/
├── package.json
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

### Design System Package (Reference)

```
design-system/
├── atoms/                    # ← Studio displays these
│   ├── Button/
│   ├── Card/
│   ├── Header/
│   ├── Link/
│   └── Motion/
├── tokens/                   # ← Studio visualizes these
│   ├── base.ts
│   ├── studio.ts
│   ├── sage.ts
│   └── volt.ts
├── features/
│   └── customizer/          # ← Studio includes this
├── hooks/                   # ← Studio uses these
├── providers/               # ← Studio uses ThemeProvider
├── docs/
│   └── SAGE-DESIGN-STUDIO.md  # ← This document
└── src/
    └── index.ts             # ← Studio imports from here
```

---

## 🎯 Next Steps

1. ✅ Create this strategic document ← **You are here**
2. Create `apps/sage-design-studio/` app structure
3. Configure Next.js and dependencies
4. Set up portfolio routing to proxy `/studio`
5. Build MVP components following the IA above
6. Test integration with portfolio and other ecosystem apps
7. Deploy and announce

---

## 📖 Related Documentation

- [Design System README](../README.md) - Component usage and philosophy
- [DESIGN-PHILOSOPHY.md](/DESIGN-PHILOSOPHY.md) - Core design principles
- [AGENTS.md](/AGENTS.md) - Development guidelines

---

**Last Updated**: 2025-12-28
**Status**: Strategic planning complete, ready for implementation
**Next Milestone**: Phase 1 MVP - Sage Design Studio launch
