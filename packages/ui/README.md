# Sage Design Engine (@thesage/ui)

<div align="center">

[![npm version](https://img.shields.io/npm/v/@thesage/ui?color=indigo&style=flat-square)](https://www.npmjs.com/package/@thesage/ui)
[![License](https://img.shields.io/npm/l/@thesage/ui?color=blue&style=flat-square)](https://github.com/shalomormsby/ecosystem/blob/main/LICENSE)
[![Downloads](https://img.shields.io/npm/dt/@thesage/ui?color=teal&style=flat-square)](https://www.npmjs.com/package/@thesage/ui)

**Sage — Make it Lovable.**

Components that feel alive. Themes with real personality. Motion your users control. Designed for humans. Fluent with AI.

[Documentation](https://thesage.dev) | [Components](https://thesage.dev/components) | [GitHub](https://github.com/shalomormsby/ecosystem)

</div>

---

**Sage Design Engine** is a component library and design system built on **Radix UI** primitives and **Tailwind CSS**. 48+ accessible components, three distinct themes with runtime switching, and a user-controlled motion system — all wired through a 4-layer design token architecture.

## Features

- **Accessible by default** — Built on WAI-ARIA standards via Radix UI. Keyboard navigable, screen reader compatible, WCAG AA contrast.
- **Three themes, real personality** — Studio (professional), Terra (organic), Volt (electric). Runtime switching via CSS variables, light and dark modes each.
- **User-controlled motion** — A 0–10 intensity scale that respects `prefers-reduced-motion`. Intensity 0 works perfectly — no degraded experience.
- **Modular imports** — Core stays lean. Heavy features (forms, dates, tables, drag-and-drop, WebGL) ship as optional subpath exports — install only what you use.
- **Type safe** — Written in TypeScript with full type inference. React 19 ref-as-prop pattern throughout.
- **Design token system** — Colors, typography, spacing, motion, and syntax tokens. Change one primary color, everything updates.

## Installation

```bash
pnpm add @thesage/ui
```

Sage requires **Tailwind CSS** as a styling engine:

```bash
pnpm add -D tailwindcss@^3.4 postcss autoprefixer
```

### Optional subpath exports

Install peer dependencies only for the features you need:

```bash
# Forms (react-hook-form + zod validation)
pnpm add react-hook-form @hookform/resolvers zod

# Date picker
pnpm add react-day-picker date-fns

# Data tables
pnpm add @tanstack/react-table

# Drag and drop
pnpm add @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

### Configure Tailwind

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@thesage/config/tailwind')],
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@thesage/ui/dist/**/*.{js,ts,jsx,tsx}"
  ],
}
```

### Import styles

```tsx
import '@thesage/ui/globals.css';
```

## Usage

```tsx
import { Button, Card, ThemeProvider } from '@thesage/ui';

export default function App() {
  return (
    <ThemeProvider theme="studio" defaultMode="system">
      <Card className="max-w-md p-6">
        <h3 className="mb-2 text-lg font-semibold">Welcome to Sage</h3>
        <p className="mb-4 text-muted-foreground">
          Build beautifully with components that feel premium out of the box.
        </p>
        <div className="flex gap-2">
          <Button>Get Started</Button>
          <Button variant="ghost">Documentation</Button>
        </div>
      </Card>
    </ThemeProvider>
  );
}
```

### Subpath imports

```tsx
import { useMotionPreference, useTheme } from '@thesage/ui/hooks'
import { ThemeProvider } from '@thesage/ui/providers'
import { cn } from '@thesage/ui/utils'

// Optional feature imports
import { Form, FormField } from '@thesage/ui/forms'
import { DatePicker } from '@thesage/ui/dates'
import { DataTable } from '@thesage/ui/tables'
import { SortableList } from '@thesage/ui/dnd'
```

## Component categories

| Category | Examples |
|----------|----------|
| **Actions** | Button, Toggle, ToggleGroup |
| **Forms** | Input, Select, Checkbox, Switch, Slider, SearchBar |
| **Navigation** | Tabs, Menubar, Breadcrumb, Pagination, NavigationMenu |
| **Overlays** | Dialog, Sheet, Popover, Tooltip, ContextMenu, HoverCard |
| **Data Display** | Card, Avatar, Badge, Table, ScrollArea, Carousel |
| **Feedback** | Alert, Progress, Skeleton, Toast (Sonner) |
| **Layout** | Accordion, Separator, ResizablePanels, Collapsible |
| **Features** | Customizer, ThemeSwitcher |

## Bundle size

Core and optional entry points are independently tracked via [size-limit](https://github.com/ai/size-limit):

| Entry point | Brotli size |
|-------------|-------------|
| Core | ~146 KB |
| Hooks | ~40 KB |
| Providers | ~60 KB |
| Tokens | ~70 KB |
| Utils | ~25 KB |
| Forms | ~9.4 KB |
| Dates | ~29 KB |
| Tables | ~8.3 KB |
| DnD | ~8.3 KB |
| WebGL | ~1.1 KB |

## License

MIT &copy; [Shalom Ormsby](https://github.com/shalomormsby)
