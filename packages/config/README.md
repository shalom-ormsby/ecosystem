# Sage Config (@thesage/config)

<div align="center">

[![npm version](https://img.shields.io/npm/v/@thesage/config?color=indigo&style=flat-square)](https://www.npmjs.com/package/@thesage/config)
[![License](https://img.shields.io/npm/l/@thesage/config?color=blue&style=flat-square)](https://github.com/shalomormsby/ecosystem/blob/main/LICENSE)

**Shared Configuration Presets for the Sage Ecosystem.**

[Documentation](https://thesage.dev) • [GitHub](https://github.com/shalomormsby/ecosystem)

</div>

---

**Sage Config** provides the standard configuration presets for tools like Tailwind CSS, ensuring consistency across all applications and packages in the Sage ecosystem.

## ✨ Features

- **🎨 Tailwind Preset**: Pre-configured colors, typography, animations, and radii matching Sage Tokens.
- **✨ Animation Utilities**: Custom keyframes and animation classes integration.

## 🚀 Installation

This package is typically installed as a `devDependency`.

```bash
pnpm add -D @thesage/config
```

## 💻 Usage

### Tailwind CSS
Add the preset to your `tailwind.config.js` file.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    require('@thesage/config/tailwind')
  ],
  content: [
    // Ensure you scan the Sage UI components
    "./node_modules/@thesage/ui/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 📄 License

MIT © [Shalom Ormsby](https://github.com/shalomormsby)
