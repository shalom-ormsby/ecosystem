# Sage UI (@thesage/ui)

<div align="center">

[![npm version](https://img.shields.io/npm/v/@thesage/ui?color=indigo&style=flat-square)](https://www.npmjs.com/package/@thesage/ui)
[![License](https://img.shields.io/npm/l/@thesage/ui?color=blue&style=flat-square)](https://github.com/shalomormsby/ecosystem/blob/main/LICENSE)
[![Downloads](https://img.shields.io/npm/dt/@thesage/ui?color=teal&style=flat-square)](https://www.npmjs.com/package/@thesage/ui)

**The Design Engine for the Solopreneur.**

[Documentation](https://thesage.dev) • [Components](https://thesage.dev/components) • [GitHub](https://github.com/shalomormsby/ecosystem)

</div>

---

**Sage UI** is not just a component library—it's a systematic design engine built for speed, consistency, and beauty. Built on top of **Radix UI** for headless accessibility and **Tailwind CSS** for styling, it provides a comprehensive suite of 45+ polished components that work together seamlessly.

## ✨ Features

- **🎨 Systematic Design**: Powered by a robust design token system (colors, typography, spacing).
- **♿ Fully Accessible**: Built on WAI-ARIA standards via Radix UI primitives.
- **🌗 Mode Aware**: First-class support for light and dark modes with automatic color harmonization.
- **🧩 Composable**: Components designed to fit together like LEGO blocks.
- **🛠️ Type Safe**: Written in TypeScript with full type inference.

## 🚀 Installation

### 1. Install Dependencies
Sage UI is built on Tailwind CSS. You need to install the package and its peer dependencies.

```bash
pnpm add @thesage/ui @thesage/tokens @thesage/hooks lucide-react clsx tailwind-merge
pnpm add -D tailwindcss@^3.4 postcss autoprefixer
```

### 2. Configure Tailwind
Update your `tailwind.config.js` contents to use the preset and scan the component definitions.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@thesage/config/tailwind')],
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@thesage/ui/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 3. Import Styles
Import the global CSS file (which contains the theme variables) in your root entry file (e.g., `main.tsx` or `App.tsx`).

```tsx
import '@thesage/ui/globals.css';
```

## 💻 Usage

Sage UI components are designed to be dropped into any React application.

```tsx
import { Button, Card, Text, Heading } from '@thesage/ui';

export default function WelcomeCard() {
  return (
    <Card className="max-w-md p-6">
      <Heading level={3} className="mb-2">Welcome to Sage</Heading>
      <Text variant="muted" className="mb-4">
        Build faster with components that look premium out of the box.
      </Text>
      <div className="flex gap-2">
        <Button variant="primary">Get Started</Button>
        <Button variant="ghost">Documentation</Button>
      </div>
    </Card>
  );
}
```

## 🖌️ Theming

Sage UI uses a 4-layer token system. Changing a single primary color automatically updates buttons, focus rings, and chart colors across your entire application.

```tsx
// Example: Customizing the theme
import { ThemeProvider } from '@thesage/ui';

export default function App({ children }) {
  return (
    <ThemeProvider theme="sage" defaultMode="system">
      {children}
    </ThemeProvider>
  );
}
```

## 📦 Component Categories

- **Actions**: Button, Toggle, ToggleGroup
- **Forms**: Input, Select, Checkbox, Switch, Slider, Form
- **Navigation**: Tabs, Menubar, Breadcrumb, Pagination
- **Overlays**: Dialog, Sheet, Popover, Tooltip, Toast
- **Data Display**: Card, Avatar, Badge, Table, ScrollArea
- **Feedback**: Alert, Progress, Skeleton, Sonner

## 📄 License

MIT © [Shalom Ormsby](https://github.com/shalomormsby)
