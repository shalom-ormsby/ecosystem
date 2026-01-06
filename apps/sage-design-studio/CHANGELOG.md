# Changelog

All notable changes to the Sage Design Studio will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.1] - 2026-01-05

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

### WIP
- **Icon System Migration**
  - **Objective:** Replace all direct emoji usage with `lucide-react` icons throughout the design system and studio app to ensure visual consistency and better accessibility.
  - **Plan:**
    - Audit all occurrences of emoji.
    - Select appropriate Lucide icons.
    - Replace and verify.

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
