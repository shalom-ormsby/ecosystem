# Sage UI Master Plan: The Solopreneur Stack (Web First)

> [!NOTE]
> **CONTEXT FOR AI AGENTS:**
> *   **North Star:** "The fastest way for a solopreneur to build premium, high-scale web apps."
> *   **Active Strategy:** Web-First React Component Library (`@sage/ui`) consumed by a Next.js App (`apps/sage-design-studio`).
> *   **Core Philosophy:** Functional Organization > Atomic Design. Code Ownership > Black-box dependencies.
> *   **Current Focus:** **Quality Hardening.** We are strictly verifying Phase 3 components for Shadcn parity.

---

## 1. The Vision: "Quality Speed"

The Sage UI is pivoting from a traditional enterprise design system to a **Solopreneur-focused Accelerator**. The goal is not just "consistency" but "velocity."

We adopt the **shadcn/ui distribution model**: components are code you own, allowing for maximum customization and AI-interpretability, while maintaining a robust, accessible foundation.

### Core Principles
1.  **Functional Organization:** Components are grouped by what they *do* (Forms, Feedback, Overlay), not abstract hierarchy (Atoms, Molecules).
2.  **Premium Default:** "It just looks expensive." High-quality animations, interactions, and accessibility out of the box.
3.  **AI-Native:** The codebase structure is optimized for LLMs to read, understand, and compose.

---

## 2. Architecture: "The Sage Stack"

We use a high-performance **Web-Native Stack** to maximize velocity.

| Layer | Technology | Status |
| :--- | :--- | :--- |
| **Logic** | **Radix UI** (Headless) | Standard for all interactive primitives (Select, Switch, Dialog). |
| **Styling** | **Tailwind CSS** | Utility-first. Shared config across workspace. |
| **Animation** | **CSS Variables & Keyframes** | Tightly coupled with Radix data attributes (e.g., `data-[state=open]`). |
| **Framework** | **Next.js 15+** | Server Components, standard Web API. |
| **Workspace** | **@sage/ui** | The reusable component library (Primitives). |
| **Documentation** | **Sage Design Studio** | The visual interface and documentation. |

### The Three-Tier Model
To scale development, we organize the system into three tiers:

*   **Tier 1: Primitives (@sage/ui)**
    *   *Examples:* Button, Dialog, Select, Sonner.
    *   *Goal:* 100% Shadcn Parity. Accessible, unopinionated "lego blocks".
*   **Tier 2: Assemblies (Future: @sds/assemblies)**
    *   *Examples:* `LoginForm`, `CreditCardInput`, `PricingTable`.
    *   *Goal:* Task-specific, composed functional units.
*   **Tier 3: Templates (Future: @sds/templates)**
    *   *Examples:* `DashboardLayout`, `MarketingLanding`.
    *   *Goal:* Full-page starting points.

---

## 3. Roadmap & Status

### Phase 1-3: The Primitives (Shadcn Parity) 🚧 *Hardening*
**Goal:** Reach 100% feature parity with Shadcn UI.
**Status:** Code is largely present, but **quality verification is ongoing**.
*   **Current Blocker:** "Fake Completion." Components exist but lack polish or have bugs.
*   **Immediate Action:** Systematically verify every component in the browser.
    *   [ ] Fix `Resizable` (Page load failure).
    *   [ ] Fix `Accordion` (Animation jumps).
    *   [ ] Fix `Popover`/`DatePicker` (Transparency issues).
    *   [ ] Verify all 46 components against Shadcn spec.

### Phase 4: The Pivot to Assemblies ⏳ *Pending*
**Goal:** Once primitives are solid, build the "High Value" functional blocks.
*   *Triggers:* Primitives Quality Gate Passed.
*   *Focus:* Auth forms, Data Tables, complex interactive patterns.

### Phase 5: "The Premium Feel" ⏳ *Pending*
**Goal:** Differentiate from stock Shadcn.
*   *Focus:* Micro-animations, "Glassmorphism" refinements, sophisticated transitions.

---

## 4. Operational Workflow

### For Humans & Agents
1.  **Read:** `apps/sage-design-studio/docs/shadcn-parity-status.md` for the latest specific component status.
2.  **Verify:** NEVER assume code works because it builds. **Check `http://localhost:3001`**.
3.  **Strict Strictness:** If a component janks, it is BROKEN. If it has no accessible label, it is BROKEN.

### Repo Structure
```
ecosystem/
├── apps/
│   ├── sage-design-studio/  # Documentation & Dev Environment
│   │   └── app/components/lib/component-registry.tsx # Source of Truth for Docs Nav
│   └── mobile/              # (Archived) Do not edit.
├── packages/
│   ├── tokens/              # (@sage/tokens) Design tokens (studio.ts)
│   ├── ui/                  # (@sage/ui) The Product. src/components/*.tsx
│   ├── config/              # Shared configurations (tailwind).
│   └── core/                # (@sage/core) Shared Logic (hooks/utils).
```

---

## 5. Decision Log (Key Shifts)
*   **2026-01-14:** ✅ **IMPLEMENTED Functional Organization.** Restructured all 48 @sage/ui components from flat structure into 7 functional categories (Actions, Forms, Navigation, Overlays, Feedback, Data Display, Layout). Updated Studio navigation to reflect new organization. All exports remain backward-compatible.
*   **2026-01-13:** Pivoted Master Plan to focus on **Functional Organization** and **Quality Hardening**. Confirmed "Shadcn Parity" as the primary goal for Tier 1.
*   **2026-01-10:** Automated Token Integration. Shadcn CLI is used for ingestion, but tokens are mapped automatically via `components.json`.
*   **2025-12:** "Clean Pivot" to Web-Only. Mobile paused.

---
*Source of Truth: This file (`SDS_MASTER_PLAN.md`) overrides conflicts in older docs.*
