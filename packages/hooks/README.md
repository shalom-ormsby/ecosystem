# Sage Hooks (@thesage/hooks)

<div align="center">

[![npm version](https://img.shields.io/npm/v/@thesage/hooks?color=indigo&style=flat-square)](https://www.npmjs.com/package/@thesage/hooks)
[![License](https://img.shields.io/npm/l/@thesage/hooks?color=blue&style=flat-square)](https://github.com/shalomormsby/ecosystem/blob/main/LICENSE)

**Essential React Hooks for the Solopreneur.**

[Documentation](https://thesage.dev) • [GitHub](https://github.com/shalomormsby/ecosystem)

</div>

---

**Sage Hooks** is a curated collection of lightweight, type-safe React hooks designed to solve common UI interaction problems. It follows the "batteries included" philosophy of the Sage ecosystem.

## ✨ Features

- **🪶 Lightweight**: Zero external dependencies (besides React).
- **🔒 Type Safe**: Built with TypeScript for excellent DX.
- **🧩 Composable**: Designed to work seamlessly with Sage UI components.

## 🚀 Installation

```bash
pnpm add @thesage/hooks
```

## 💻 Usage

```tsx
import { useClipboard, useMediaQuery } from '@thesage/hooks';

function CopyButton() {
  const { copy, copied } = useClipboard();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <button onClick={() => copy('Hello World')}>
      {copied ? 'Copied!' : isMobile ? 'Copy' : 'Copy to Clipboard'}
    </button>
  );
}
```

## 📦 Available Hooks

| Hook | Description |
| :--- | :--- |
| `useClipboard` | Copy text to clipboard with timeout state. |
| `useMediaQuery` | Subscribe to media query changes (responsive logic). |
| `useLocalStorage` | Persist state to localStorage with JSON parsing. |
| `useHover` | Track hover state of an element. |
| `useDebouncedValue` | Debounce a value change (useful for search inputs). |

## 📄 License

MIT © [Shalom Ormsby](https://github.com/shalomormsby)
