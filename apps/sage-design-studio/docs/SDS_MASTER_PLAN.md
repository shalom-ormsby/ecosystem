# SDS Master Plan: The Solopreneur Stack (Web First)

> [!NOTE]
> **CONTEXT FOR AI AGENTS:** 
> This project is a Monorepo using `pnpm` workspaces.
> **Active Strategy:** Web-First. We are building a high-quality React Component Library (`@sds/ui`) consumed by a Next.js App (`apps/sage-design-studio`).
> **Mobile:** Paused. Do not touch `apps/mobile` or `react-native` deps.
> **Validation:** Always verify changes by checking `http://localhost:3001/universal` (The Universal Test Page) or the Component Playground in the Studio.

---

## 1. Architecture: The "Sage Stack"

We use a high-performance **Web-Native Stack** to maximize velocity.

| Layer | Technology | Status |
| :--- | :--- | :--- |
| **Logic** | **Radix UI** (Headless) | Standard for all interactive primitives (Select, Switch, Dialog). |
| **Styling** | **Tailwind CSS** | Utility-first. Config allows sharing styles across the monorepo. |
| **Animation** | **Framer Motion** | *Coming in Phase 3.* Using pure CSS for now. |
| **Framework** | **Next.js 15+** | Server Components, standard Web API. |
| **Workspace** | **@sds/ui** | The reusable component library. |
| **Documentation** | **Sage Design Studio** | The visual interface and documentation for the library. |

---

## 2. Repo Structure

```
ecosystem/
├── apps/
│   ├── sage-design-studio/  # The Documentation & Dev Environment (Next.js)
│   └── mobile/              # (Archived) Do not edit.
├── packages/
│   ├── tokens/              # (@sds/tokens) JSON/TS design definitions (Colors, Type).
│   ├── ui/                  # (@sds/ui) The Product. Reusable React Components.
│   ├── config/              # Shared configurations.
│   └── core/                # (@sds/core) Shared Logic/Hooks (Future home of ThemeProvider).
```

---

## 3. Implementation Plan

### Phase 1: The Clean Pivot (Completed) ✅
**Goal:** Establish a working Web-Only workflow.
- [x] Pause Mobile development.
- [x] Strip `react-native-web` dependencies.
- [x] Set up `@sds/ui` build pipeline (`tsup`).
- [x] Create core inputs: `Button`, `Input`, `Label`.

### Phase 2: Core Atoms Migration (In Progress) 🚧
**Goal:** Port high-value components from the old `design-system` folder to `@sds/ui`.
**Rule:** "Package, Don't Rebuild". Extract, Refactor, Export.

**Status:**
- [x] **Layout:** `Card`, `Separator`, `ScrollArea` (Migrated).
- [x] **Data Entry:** `Checkbox`, `Switch`, `Select` (Migrated).
- [x] **Feedback:** `Badge` (Migrated).
- [ ] **Feedback:** `Skeleton`, `Toast` (To Do).
- [ ] **Theming:** Move `ThemeProvider` to `@sds/core`.

**Verification:**
check `apps/sage-design-studio/app/universal/page.tsx` to see migrated components in action.

### Phase 3: The "Premium" Feel (Motion & Overlay)
**Goal:** Introduce the elements that make an app feel "expensive."
- [ ] **Framer Motion:** Add layout animations (AnimatePresence) to `Toast` and `Dialog`.
- [ ] **Complex Atoms:** `Dialog` (Modal), `Sheet` (Slide-over), `DropdownMenu`, `Tooltip`.
- [ ] **Micro-interactions:** Hover states, specific easings in `@sds/tokens`.

### Phase 4: Consumption Verification
**Goal:** Build a real app `apps/portfolio` using *only* `@sds/ui`.
- [ ] Create `apps/portfolio`.
- [ ] Install `@sds/ui`.
- [ ] Build a page using the library.

---

## 4. Documentation & Maintenance
*   **Source of Truth:** This file (`SDS_MASTER_PLAN.md`) is the master logic.
*   **Archive:** Old documentation is in `apps/sage-design-studio/docs/archive/`. Ignore it unless digging for historical context.
*   **Troubleshooting:**
    *   **Styles Missing?** Check `apps/sage-design-studio/tailwind.config.ts` content paths.
    *   **Build Fail?** Run `pnpm --filter @sds/ui build`.
