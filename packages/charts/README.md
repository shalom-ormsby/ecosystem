# Sage Charts (@thesage/charts)

<div align="center">

[![npm version](https://img.shields.io/npm/v/@thesage/charts?color=indigo&style=flat-square)](https://www.npmjs.com/package/@thesage/charts)
[![License](https://img.shields.io/npm/l/@thesage/charts?color=blue&style=flat-square)](https://github.com/shalomormsby/ecosystem/blob/main/LICENSE)

**Beautiful, responsive charts for Sage UI.**

[Documentation](https://thesage.dev) • [GitHub](https://github.com/shalomormsby/ecosystem)

</div>

---

**Sage Charts** is a high-level wrapper around **Recharts**, configured to integrate seamlessly with the Sage UI design tokens. It provides a standardized `ChartContainer` API that handles theming (colors, fonts, tooltips) automatically, making data visualization beautiful by default.

## ✨ Features

- **🎨 Theme Aware**: Automatically picks up Sage UI colors (charts 1-5).
- **🌗 Mode Ready**: Adapts seamlessly to light and dark modes.
- **🛠️ Configurable**: Simple configuration object for labels and icons.
- **🧩 Recharts Power**: Full access to the underlying Recharts primitives.

## 🚀 Installation

Install the package and its peer dependencies.

```bash
pnpm add @thesage/charts recharts
```

### ⚠️ React 19 Compatibility Note
If you are using **React 19**, you may need to add an override for `react-is` to ensure compatibility with Recharts versions prior to explicit React 19 support.

In your `package.json`:
```json
"pnpm": {
  "overrides": {
    "react-is": "^19.0.0-rc"
  }
}
```

## 💻 Usage

Sage Charts uses a `ChartContainer` to wrap standard Recharts components.

```tsx
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@thesage/charts"

// Define your config (labels and colors)
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
}

export function MyChart() {
  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
  ]

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
```

## 📄 License

MIT © [Shalom Ormsby](https://github.com/shalomormsby)
