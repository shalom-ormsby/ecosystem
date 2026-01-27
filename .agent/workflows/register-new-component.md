---
description: Complete workflow for adding a new component to Sage UI and publishing to npm
---

# Register New Component Workflow

Follow this systematic checklist when adding a new component to the Sage UI. This ensures the component is:
- ✅ Available in the `@thesage/ui` library
- ✅ Documented in Sage Studio with live examples
- ✅ Discoverable via search (Cmd+K)
- ✅ Registered in component metadata (source of truth)
- ✅ Available to AI assistants via MCP server
- ✅ Published to npm for external users

**Time Estimate:** 30-60 minutes for a simple component, 2-3 hours for complex components.

**Prerequisites:**
- Component design finalized
- Props interface defined
- Category determined (actions, forms, navigation, overlays, feedback, data-display, layout)

## Phase 1: Create in Library (`@thesage/ui`)

1.  **Create Component File**
    -   Location: `packages/ui/src/components/[category]/[ComponentName].tsx`
    -   **Rule**: Use **Named Exports** (`export function Component...`) instead of default exports.
    -   **Rule**: Define a typed interface for props (e.g., `ComponentNameProps`).
    -   **Functional Categorization**:
        - `actions/`: Triggers behavior (Button, Toggle)
        - `forms/`: Collects data (Input, Slider)
        - `navigation/`: Moves through content (Tabs, Breadcrumb)
        - `overlays/`: Contextual content (Dialog, Tooltip)
        - `feedback/`: System state (Alert, Toast)
        - `data-display/`: Information (Card, Table)
        - `layout/`: Organization (Sidebar, Stack)
        - `features/`: Complex features (Customizer)

2.  **Export from Category Index**
    -   Location: `packages/ui/src/components/[category]/index.ts`
    -   Action: Add `export * from './[ComponentName]';`.

3.  **Export from Main Entry Point**
    -   Location: `packages/ui/src/index.ts`
    -   Action: Add the direct export (e.g., `export * from './components/[category]/[ComponentName]';`).
    -   Action: Ensure the category namespace is exported (e.g., `export * as [Category] from './components/[category]';`).

4.  **Install Dependencies (If needed)**
    -   Action: If your component uses external libraries (like `ogl` or `framer-motion`), install them specifically in the UI package: `pnpm add [package-name] --filter @thesage/ui`.

5.  **Build Library**
    -   Command: `pnpm build --filter @thesage/ui`
    -   *Why: This generates the `.d.ts` type definitions so the Studio app can "see" the new component.*

## Phase 2: Register in Studio (`apps/web`)

6.  **Create Documentation Page**
    -   Location: `apps/web/app/components/studio/pages/[category]/[ComponentName]Page.tsx`
    -   Action: Import the component from `@thesage/ui`.
    -   Action: Create a `CONST_CODE` string showing users how to import/use it.
    -   Action: Build the interactive preview (sliders, switches) to control the component props.

7.  **Register in Section Router**
    -   Location: `apps/web/app/components/studio/[Category]Sections.tsx` (e.g., `MotionSections.tsx`)
    -   Action: Import your new Page.
    -   Action: Add it to the conditional rendering logic (e.g., `{activeTab === 'component-id' && <ComponentPage />}`).
    -   Action: Update the `Tab` type definition to include your new ID string.

8.  **Add to Sidebar Navigation**
    -   Location: `apps/web/app/lib/navigation-tree.tsx`
    -   Action: Add a new object to the appropriate `children` array:
        ```typescript
        { id: 'component-id', label: 'Component Name', section: '[category]' }
        ```

9.  **Add to Search Registry**
    -   Location: `apps/web/app/lib/search-index.ts`
    -   Action: Add a new entry so users can find it via `Cmd+K`:
        ```typescript
        {
          id: 'component-id',
          title: 'Component Name',
          description: 'Short description...',
          type: 'component',
          category: '[Category]',
          path: '#[section]/[component-id]', // Important: Use hash link
          keywords: ['keyword1', 'keyword2'],
        }
        ```

10. **Update Category Overview (Optional)**
    -   Location: `apps/web/app/components/studio/[Category]Section.tsx` (e.g., `BackgroundsSection.tsx`)
    -   Action: If there is a gallery/grid view for the category, add a visual Card for the new component that links to `#hash-id`.

11. **Update Changelog**
    -   Location: `apps/web/CHANGELOG.md`
    -   Action: Add a record of the new component under "Added".

## Phase 3: Update Metadata & Registry

12. **Update Component Registry**
    -   Location: `packages/ui/src/component-registry.ts`
    -   Action: Add the new component to the appropriate category in `COMPONENT_CATEGORIES`
    -   Action: Update the `totalCount` field (increment by 1)
    -   Action: Update the category's `count` field
    -   Action: Add component name to category's `examples` array
    -   *Why: This registry is the source of truth for component counts used across docs and MCP server.*

13. **Update MCP Server Registry (Optional but Recommended)**
    -   Location: `packages/sds-mcp-server/src/registry.ts`
    -   Action: Add complete metadata for AI discoverability:
        ```typescript
        {
          name: 'ComponentName',
          category: 'category',
          description: 'What it does...',
          keywords: ['keyword1', 'keyword2'],
          useCases: ['Use case 1', 'Use case 2'],
          dependencies: ['react', 'framer-motion'],
          radixPrimitive: '@radix-ui/react-dialog', // if applicable
        }
        ```
    -   *Why: Makes the component discoverable via Claude Desktop, Cursor, and other MCP clients.*

## Phase 4: Verification & Publishing

14. **Build Library**
    -   Command: `pnpm build --filter @thesage/ui`
    -   *Why: Confirms component compiles and type definitions are generated.*

15. **Build Application**
    -   Command: `pnpm build --filter @ecosystem/web`
    -   *Why: Confirms Sage Studio can import and render the new component.*

16. **Test Locally**
    -   Command: `pnpm dev --filter @ecosystem/web`
    -   Action: Navigate to your component's page in the Studio
    -   Action: Test all interactive controls
    -   Action: Verify search (`Cmd+K`) finds the component
    -   Action: Verify sidebar navigation works

17. **Update Changelog**
    -   Location: Root `CHANGELOG.md`
    -   Action: Add timestamped entry under "Added" section
    -   Format:
        ```markdown
        ## 2026-01-26T20:45:00Z

        **Added [ComponentName] to [Category]**
        - Description of what it does
        - Key features or props
        - Related: Issue #X or PR #Y
        ```

## Phase 5: Publish to npm (Required for External Users)

18. **Version Bump**
    -   Location: `packages/ui/package.json`
    -   Action: Increment version following semver:
        - **Patch** (0.0.X): Bug fixes, documentation updates
        - **Minor** (0.X.0): New components, new features (backwards compatible)
        - **Major** (X.0.0): Breaking changes (rare)
    -   Example: `0.0.9` → `0.0.10` for new component

19. **Rebuild for Publishing**
    -   Command: `pnpm build --filter @thesage/ui`
    -   *Why: Ensures dist/ folder reflects the new version.*

20. **Publish to npm**
    -   Command: `cd packages/ui && npm publish`
    -   Verification: `npm view @thesage/ui` (should show new version)
    -   *Why: Makes the component available to external users via `npm install @thesage/ui`.*

21. **Update Studio Installation Docs (If Needed)**
    -   Location: `apps/web/app/components/studio/OverviewSection.tsx`
    -   Action: If you added new peer dependencies, update Prerequisites card
    -   Action: Update any version references if needed

22. **Git Commit & Push**
    -   Command: `git add . && git commit -m "feat: add [ComponentName] component" && git push`
    -   *Why: Preserves version history and triggers CI/CD.*

---

## Quick Reference Checklist

**Phase 1: Create in Library**
- [ ] Create component file in `packages/ui/src/components/[category]/`
- [ ] Export from category index
- [ ] Export from main `index.ts`
- [ ] Install dependencies if needed
- [ ] Build: `pnpm build --filter @thesage/ui`

**Phase 2: Register in Studio**
- [ ] Create documentation page in `apps/web/app/components/studio/pages/[category]/`
- [ ] Register in section router
- [ ] Add to sidebar navigation (`navigation-tree.tsx`)
- [ ] Add to search registry (`search-index.ts`)
- [ ] Update category overview (optional)

**Phase 3: Update Metadata**
- [ ] Update `packages/ui/src/component-registry.ts` (increment counts, add to examples)
- [ ] Update `packages/sds-mcp-server/src/registry.ts` (for AI discoverability)

**Phase 4: Verification**
- [ ] Build library: `pnpm build --filter @thesage/ui`
- [ ] Build app: `pnpm build --filter @ecosystem/web`
- [ ] Test locally: `pnpm dev --filter @ecosystem/web`
- [ ] Update `CHANGELOG.md`

**Phase 5: Publish to npm**
- [ ] Bump version in `packages/ui/package.json` (patch/minor/major)
- [ ] Rebuild: `pnpm build --filter @thesage/ui`
- [ ] Publish: `cd packages/ui && npm publish`
- [ ] Verify: `npm view @thesage/ui`
- [ ] Git commit and push

---

## Troubleshooting

**"Cannot find module @thesage/ui"**
- Run: `pnpm build --filter @thesage/ui`
- Ensure `dist/` folder exists in `packages/ui/`

**Component not showing in search**
- Verify entry in `apps/web/app/lib/search-index.ts`
- Ensure `path` uses hash link format: `#[section]/[component-id]`

**TypeScript errors in Studio**
- Rebuild library to regenerate type definitions: `pnpm build --filter @thesage/ui`

**npm publish fails**
- Ensure you're logged in: `npm whoami`
- Verify you have publish access to `@thesage` org
- Check version number is unique: `npm view @thesage/ui versions`

---

**Last Updated:** 2026-01-26
**Related Documentation:**
- Component Registry: `packages/ui/src/component-registry.ts`
- AGENTS.md: File organization rules and coding standards
- DESIGN-PHILOSOPHY.md: Principles for component design
