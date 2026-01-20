# Mantine UI vs Sage UI: Parity Evaluation & Roadmap

## Executive Summary

Mantine UI is a massive, batteries-included component library with over 120 components and 50+ hooks. Sage UI (formerly Sage Design System), currently based on shadcn/ui principles, focuses on code ownership, modularity, and high-end aesthetics.

To achieve parity with Mantine effectively, Sage UI should **not** copy Mantine blindly but rather adopt its **comprehensive utility** while maintaining Sage UI's **architectural superiority** (headless primitives + Tailwind).

**Key Strategic Findings:**
1.  **Hooks Gap**: SDS completely lacks a standard utility hook library (`@mantine/hooks` is a major competitive advantage).
2.  **Data Viz Gap**: Mantine has a dedicated Charts package. SDS currently has none (but can adopt shadcn charts).
3.  **Complex Inputs**: Mantine excels at complex inputs (ColorPicker, NumberInput, Dropzone) which SDS lacks.
4.  **Form Strategy**: Mantine has its own form library. SDS uses `react-hook-form`. **Recommendation:** Stick with `react-hook-form` (industry standard) but improve the `Form` wrapper.

---

## 1. Feature & Component Comparison

### 📦 Core Architecture

| Feature | Mantine UI | Sage Design System (SDS) | Parity Strategy |
| :--- | :--- | :--- | :--- |
| **Styling** | CSS Modules / css-in-js (PostCSS) | Tailwind CSS + Class Variance Authority | ✅ **SDS is Superior** (Modern Standard) |
| **Theming** | Strict Schema (JSON based) | CSS Variables + Tailwind Config | ✅ **SDS is Superior** (More Flexible) |
| **Philosophy** | Library (npm install) | Copy & Paste (Code Ownership) | ✅ **SDS is Superior** (Solopreneur/AI Friendly) |
| **Icons** | 3rd party (Tabler usually) | Lucide React | 🤝 Parity |

### 🛠 Utilities & Logic

| Category | Mantine UI | SDS Current | Recommendation |
| :--- | :--- | :--- | :--- |
| **Hooks** | **70+ Hooks** (`@mantine/hooks`)<br>*(useHover, useMove, useOs, etc.)* | **3 Hooks**<br>*(useTheme, useMotion, useForm)* | 🚨 **CRITICAL GAP**<br>Build `@sds/hooks` |
| **Forms** | `@mantine/form`<br>*(Custom state management)* | `react-hook-form` + `zod` | ⛔ **Do Not Copy**<br>Stick to RHF standard |
| **Dates** | `@mantine/dates`<br>*(Custom implementation)* | `date-fns` + `react-day-picker` | 🤝 Parity Achieved (via Layout/Calendar) |
| **Notifications** | `@mantine/notifications` | `sonner` | ✅ **SDS is Superior** (Sonner is better) |

### 🧩 Component Comparison

#### Layout & Navigation
| Component | Mantine | SDS | Gap / Action |
| :--- | :--- | :--- | :--- |
| AppShell | ✅ | ❌ | **Build `AppShell`** (Holy grail layout) |
| Stepper | ✅ | ❌ | **Build `Stepper`** |
| Timeline | ✅ | ❌ | **Build `Timeline`** |
| VirtualList | ❌ | ❌ | Low Priority |
| Container | ✅ | ✅ | Parity |
| Grid / Group | ✅ | ✅ (Stack/Grid) | Parity |

#### Inputs & Forms
| Component | Mantine | SDS | Gap / Action |
| :--- | :--- | :--- | :--- |
| ColorPicker | ✅ | ❌ | **Build `ColorPicker`** |
| FileInput / Dropzone | ✅ | ❌ | **Build `Dropzone`** |
| Rating | ✅ | ❌ | **Build `Rating`** |
| PinInput | ✅ | ✅ (InputOTP) | Parity |
| NumberInput | ✅ | ❌ (Basic Input only) | **Build `NumberInput`** (Steppers, formatting) |
| MultiSelect | ✅ | ❌ (Combobox mostly) | Expand `Combobox` (Tag support) |
| Rich Text | ✅ (TipTap) | ❌ | **Build `Editor`** (TipTap wrapper) |

#### Feedback & Overlays
| Component | Mantine | SDS | Gap / Action |
| :--- | :--- | :--- | :--- |
| Loader | ✅ | ✅ (Progress/Skeleton) | Add generic `Spinner` |
| Spotlight | ✅ (Cmd+K) | ✅ (Command) | Parity |
| Modal Manager | ✅ | ❌ (Declarative only) | Consider Imperative Modal Hook |

#### Data Display & Charts
| Component | Mantine | SDS | Gap / Action |
| :--- | :--- | :--- | :--- |
| Area/Bar/Line Chart | ✅ | ❌ | 🚨 **High Priority Gap**<br>Integrate `recharts` |
| Image | ✅ | ✅ (Next/Image) | Parity |
| Kbd (Keyboard) | ✅ | ✅ (in Command) | Extract `Kbd` primitive |
| Indicator | ✅ | ❌ | **Build `Indicator`** (Notification dot) |

---

## 2. The "Mantine Parity" Playbook

To achieve feature parity with Mantine, SDS needs to move beyond "basic UI" and into "application ecosystem" territory.

### Phase 1: The "Utility Belt" (@sds/hooks)
**Goal:** Match `@mantine/hooks` utility for utility.
This is low-effor/high-impact. We can port popular open-source hooks or write our own implementation of the top 20 most used hooks.

**Must-Have Hooks:**
- `use-click-outside` (Already internal, export it)
- `use-clipboard`
- `use-viewport-size`
- `use-window-scroll`
- `use-media-query`
- `use-local-storage`
- `use-hover`
- `use-idle`

### Phase 2: Data Visualization (Charts)
**Goal:** Match `@mantine/charts`.
Do **not** write from scratch. Adopt `recharts` and wrap them in SDS design tokens/Tailwind classes (similar to shadcn/charts).

**New Category:** `components/charts/`
- `AreaChart`
- `BarChart`
- `LineChart`
- `PieChart`
- `RadarChart`

### Phase 3: Complex Inputs
**Goal:** Fill the gaps in form data collection.

1.  **ColorPicker**: Essential for creative apps (like the Customizer itself).
2.  **NumberInput**: A robust numerical input with increment/decrement steppers and clamp logic.
3.  **Dropzone**: A wrapper around `react-dropzone` with SDS styling.
4.  **RichTextEditor**: A styled wrapper around `TipTap`.

### Phase 4: Time & Progress
**Goal:** Better visualization of process.

1.  **Timeline**: Vertical list of events with connecting lines.
2.  **Stepper**: Progress through multiple form steps.

### Phase 5: App Shell & Layout
**Goal:** One-drop layouts.

1.  **AppShell**: A component that accepts `header`, `navbar`, `aside`, `footer` and handles the responsive grid logic automatically.

---


---

## 3. Strategic Pivot: Rebranding to Sage UI

**Current Status:** "Sage Design System" (SDS)
**New Identity:** **Sage UI** (@sage/ui)

### The Problem with "Design System"
The term "Design System" often implies:
- Enterprise governance and bureaucracy
- Rigid constraints ("You must use it this way")
- Slow evolution
- Heavy documentation requirements

This contradicts our Solopreneur/AI-Native vision, which prioritizes:
- **Velocity**
- **Flexibility**
- **Code Ownership**
- **Ecosystem Scale**

### The Solution: Sage UI
Rebranding to **Sage UI** aligns us with modern industry standards (Material UI, Chakra UI, Mantine UI) while allowing for flexible scope scaling.

**Brand Hierarchy:**
- **Sage UI**: The master brand for the ecosystem.
- **@sage-ui/ui**: The core primitives (Tier 1).
- **@sage-ui/assemblies**: Pre-built functional combinations (Tier 2).
- **@sage-ui/templates**: Full page layouts (Tier 3).
- **@sage-ui/mcp**: The AI integration layer.

**Tagline Candidates:**
- *"AI-Native Components for Solopreneur Velocity"*
- *"The Foundation for Premium Web Apps"*
- *"From Primitives to Production"*

### Competitive Positioning
- **vs. Mantine (Library):** Sage UI offers the same utility depth but with better styling control (Tailwind) and code ownership.
- **vs. shadcn/ui (Foundation):** Sage UI is a "batteries-included" ecosystem, not just a bare-bones foundation.
- **vs. Material (System):** Sage UI is for creators, not just enterprise drones.

---

## 4. Comparison Summary Table

| Metric | Mantine UI | Sage UI (formerly SDS) | Project Delta |
| :--- | :--- | :--- | :--- |
| **Component Count** | ~120 | ~50 | **-70** |
| **Hook Count** | ~50 | 3 | **-47** |
| **Bundle Size** | Heavy (Tree-shakeable) | 0kb (Copy Code) | **SDS Wins** |
| **Dependencies** | High (@mantine/core, etc) | Low (Radix + Tailwind) | **SDS Wins** |
| **Customizability** | Styles API (Complex) | Tailwind (Standard) | **SDS Wins** |

## 5. Recommended Next Steps (Immediate)

1.  **Rebrand Logic:** Begin renaming internal references from SDS to Sage UI where appropriate (keeping practical backward compat).
2.  **Create `@sds/hooks` (or `@sage/hooks`)**: Initialize this new sub-path and add 5 core hooks.
3.  **Add `Chart` Primitives**: Import `recharts` and create the base Chart configuration.
4.  **Build `NumberInput`**: This is the most requested "missing" input from standard HTML.
