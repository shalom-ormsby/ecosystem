# Sage Tokens (@thesage/tokens)

<div align="center">

[![npm version](https://img.shields.io/npm/v/@thesage/tokens?color=indigo&style=flat-square)](https://www.npmjs.com/package/@thesage/tokens)
[![License](https://img.shields.io/npm/l/@thesage/tokens?color=blue&style=flat-square)](https://github.com/shalomormsby/ecosystem/blob/main/LICENSE)

**The Design Foundation for the Sage Ecosystem.**

[Documentation](https://thesage.dev) • [GitHub](https://github.com/shalomormsby/ecosystem)

</div>

---

**Sage Tokens** provides the raw design values (colors, typography, spacing, animations) that power the Sage UI. It includes a multi-theme engine supporting **Studio**, **Terra**, and **Volt** themes, along with a sophisticated dynamic color palette generator.

## ✨ Features

- **🎨 Multi-Theme Support**: Built-in support for multiple distinct visual languages.
- **🌗 Mode Aware**: First-class light/dark mode tokens.
- **🌈 Dynamic Palettes**: Utilities to generate accessible color scales from a single hex value.
- **🔢 Typed**: Fully typed TypeScript interfaces for all tokens.

## 🚀 Installation

```bash
pnpm add @thesage/tokens
```

## 💻 Usage

### Accessing Raw Tokens
You can import specific token sets directly if you need to use them in JavaScript/TypeScript environments (outside of CSS).

```ts
import { studioTokens, terraTokens, voltTokens } from '@thesage/tokens';

const primaryColor = studioTokens.light.colors.primary;
```

### Color Utilities
The package includes powerful color transformation utilities used by the Customizer.

```ts
import { hexToHSL, generateColorScale } from '@thesage/tokens';

// Convert Hex to HSL
const hsl = hexToHSL('#3b82f6'); // "217 91% 60%"

// Generate a full Tailwind-style scale (50-950)
const scale = generateColorScale('#3b82f6');
```

## 🎨 Available Themes

| Theme | Description |
| :--- | :--- |
| **Studio** | The default, balanced, professional aesthetic. |
| **Terra** | A warm, earthy, and organic visual language. |
| **Volt** | A high-contrast, energetic, digital-native look. |

## 📄 License

MIT © [Shalom Ormsby](https://github.com/shalomormsby)
