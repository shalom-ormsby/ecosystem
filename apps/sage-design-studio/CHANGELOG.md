# Changelog

All notable changes to the Sage Design Studio will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
  - Component was exported from `@sds/ui` ✓
  - Component was in navigation list ✓
  - Component was NOT in component registry ✗
  - Impact: HIGH - Input is a fundamental form component
  - Resolution: Added comprehensive 99-line registry entry


- **Label component missing** from Studio registry
  - Component was exported from `@sds/ui` ✓
  - Component was in navigation list ✓
  - Component was NOT in component registry ✗
  - Impact: HIGH - Label is essential for accessible forms (WCAG 2.1 AA)
  - Resolution: Added comprehensive 86-line registry entry

#### Build & Infrastructure Fixes
- **Functional Organization Build Repairs**
  - **Issue:** `@sds/ui` build failing after massive refactor due to import path and prop errors.
  - **Resolution:**
    - `packages/ui/src/lib/store/theme.ts`: Fixed import path from `../tokens` to `@sds/tokens` workspace package.
    - `packages/ui/src/components/forms/ThemeSwitcher.tsx`: Removed unsupported `size` prop from `Switch` component.
    - `packages/ui/src/components/feedback/Toast.tsx`: Deleted duplicate file (conflicting with `Toast/Toast.tsx`).
    - `packages/ui/src/index.ts` & `src/components/feedback/index.ts`: Removed duplicate exports for Toast component.
    - `apps/sage-design-studio`: Resolved all TypeScript build errors in `component-registry.tsx`, `HooksSection.tsx`, and `universal/page.tsx` by migrating imports and adding required props to satisfy strict types.
    - `packages/design-system`: Updated legacy `Card` component to disable `hoverEffect` by default, resolving UI inconsistencies in the "Adding Components" section.
    - **Release**: Bumped `@sds/ui` to v0.0.2 and `@ecosystem/design-system` to v1.0.1 to ensure fresh builds on deployment.
    - **Hotfix**: Refactored `Toast.tsx` to move style injection into `useEffect` to prevent build-time crashes. Bumped versions to v0.0.3 / v1.0.2.

### Changed

#### Component Updates
- **Card Component**
  - Changed default `hoverEffect` from `true` to `false`.
  - Effect: Cards no longer elevate on hover by default, removing false interaction affordance.
  - Opt-in: Explicitly pass `hoverEffect={true}` to restore the elevation animation.
  - Updated Component Registry documentation and examples to match new default.

### Verified

#### Package Build Status
- ✅ @sds/ui package builds successfully (112.71 KB ESM, 131.28 KB CJS)
- ✅ @sds/mcp-server package builds successfully (32.22 KB ESM, 32.24 KB CJS)
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

**Major architectural restructure of the Sage Design System from atomic design to functional organization.**

#### Component Library Restructure (@sds/ui)
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
  - Moved `Evolving the Sage Design System from Atomic to functional organization.md` to archive (implemented)
  - Moved `shadcn-parity-status.md` to archive (integrated into strategy doc)

- **Updated remaining documentation**:
  - Marked functional organization proposal as IMPLEMENTED
  - Added implementation status notes with commit references
  - Updated SDS_MASTER_PLAN.md decision log (before archiving)

### Changed

#### Backward Compatibility Maintained
- **Zero breaking changes** - all existing imports continue to work
- `import { Button } from '@sds/ui'` still works exactly as before
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
- `77c39eb` - refactor(@sds/ui): Restructure components from flat to functional organization
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
- Example: `import { Button } from '@sds/ui/actions'` (future enhancement)

**For Contributors:**
- New components go in appropriate category directory
- Follow updated development workflow in SAGE_DESIGN_SYSTEM_STRATEGY.md
- Update category index.ts when adding components

## [2.1.0] - 2026-01-07

### Added - SDS Cross-Platform Architecture (Phase 1)
- **New Monorepo Strategy (The "Sage Stack")**
  - **`@sds/tokens`**: New dedicated workspace for universal design tokens. Extracted from `design-system` to serve as the single source of truth for Web and Mobile.
  - **`@sds/config`**: New shared configuration workspace (Tailwind, etc.).
  - **`SDS_MASTER_PLAN.md`**: Comprehensive roadmap and migration strategy documentation.

### Changed
- **`design-system` Refactor**:
  - Now consumes tokens from `@sds/tokens` instead of local files.
  - Removed legacy token files (`base.ts`, `colors.json`, etc.) to enforce the new architecture.
  - Updated `package.json` to use workspace protocol: `"@sds/tokens": "workspace:*"`.

### Added - Universal UI (Phase 2)
- **`@sds/ui` Workspace**:
  - Initialized with `nativewind` v4, `react-native-web`, and `@rn-primitives`.
  - Configured tailwind preset to consume `@sds/tokens`.
  - **Universal Button**: Created first cross-platform component (`src/components/Button.tsx`) using `Pressable` and `Slot` pattern.
  - **Universal Test Page**: Added `/universal` route in Sage Design Studio to verify the button.

### Added - Mobile Entry (Phase 3)
- **`apps/mobile`**:
  - Initialized Expo (Managed) project with TypeScript.
  - Configured **Metro** for monorepo resolution (handling workspace packages).
  - Configured **NativeWind v4** with `babel` and `tailwind.config.js`.
  - Consumes `@sds/ui` and `@sds/tokens` directly.
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
