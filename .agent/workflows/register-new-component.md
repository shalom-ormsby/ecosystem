---
description: Steps to register a new component in the Sage Design System (SDS)
---

# Register New Component Workflow

Follow this systematic checklist when adding a new component to the Sage Design System. This ensures the component is available in the library, documented in the Studio, and discoverable via search.

## Phase 1: Create in Library (`@sds/ui`)

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
    -   Action: If your component uses external libraries (like `ogl` or `framer-motion`), install them specifically in the UI package: `pnpm add [package-name] --filter @sds/ui`.

5.  **Build Library**
    -   Command: `pnpm build --filter @sds/ui`
    -   *Why: This generates the `.d.ts` type definitions so the Studio app can "see" the new component.*

## Phase 2: Register in Studio (`apps/sage-design-studio`)

6.  **Create Documentation Page**
    -   Location: `apps/sage-design-studio/app/components/studio/pages/[category]/[ComponentName]Page.tsx`
    -   Action: Import the component from `@sds/ui`.
    -   Action: Create a `CONST_CODE` string showing users how to import/use it.
    -   Action: Build the interactive preview (sliders, switches) to control the component props.

7.  **Register in Section Router**
    -   Location: `apps/sage-design-studio/app/components/studio/[Category]Sections.tsx` (e.g., `MotionSections.tsx`)
    -   Action: Import your new Page.
    -   Action: Add it to the conditional rendering logic (e.g., `{activeTab === 'component-id' && <ComponentPage />}`).
    -   Action: Update the `Tab` type definition to include your new ID string.

8.  **Add to Sidebar Navigation**
    -   Location: `apps/sage-design-studio/app/lib/navigation-tree.tsx`
    -   Action: Add a new object to the appropriate `children` array:
        ```typescript
        { id: 'component-id', label: 'Component Name', section: '[category]' }
        ```

9.  **Add to Search Registry**
    -   Location: `apps/sage-design-studio/app/lib/search-index.ts`
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
    -   Location: `apps/sage-design-studio/app/components/studio/[Category]Section.tsx` (e.g., `BackgroundsSection.tsx`)
    -   Action: If there is a gallery/grid view for the category, add a visual Card for the new component that links to `#hash-id`.

11. **Update Changelog**
    -   Location: `apps/sage-design-studio/CHANGELOG.md`
    -   Action: Add a record of the new component under "Added".

## Phase 3: Verification

12. **Build Application**
    -   Command: `pnpm build --filter @ecosystem/sage-design-studio`
    -   *Why: This confirms that all imports are correct and Next.js can resolve the new library exports.*
