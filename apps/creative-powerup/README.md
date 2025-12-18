# Creative Sandbox

A gallery application for code experiments, creative projects, and playful explorations. Built to make sharing and discovering creative coding experiments delightful and accessible.

## Purpose

The Creative Sandbox is a **community-driven playground** where developers, designers, and creative technologists can:

- **Share experiments** - Post your code explorations, creative projects, and prototypes
- **Discover inspiration** - Browse experiments by category (Games, Visualizations, Animations, Tools)
- **Learn by doing** - See how others approach creative coding challenges
- **Contribute easily** - Beginner-friendly GitHub workflow with step-by-step guidance

## What Makes It Special

### Inviting by Design
- **Simple architecture** - URL = folder structure, no complexity
- **Beginner-friendly** - Comprehensive contribution guide at `/contribute`
- **Quick start** - Just add a file and registry entry to publish an experiment

### Fully Themed
- Integrated with `@ecosystem/design-system`
- Real-time theme switching (Studio, Sage, Volt)
- Light/dark mode support
- Customizable typography, colors, and motion

### Organized & Discoverable
- **Category-based** - Games, Visualizations, Animations, Tools
- **Metadata-rich** - Tags, authors, descriptions for each experiment
- **Central registry** - Single source of truth for all experiments

## Quick Start

### Running Locally

```bash
# From repository root
pnpm install
pnpm --filter creative-powerup dev
```

Visit `http://localhost:3000`

### Adding an Experiment

1. **Create your experiment page**
   ```bash
   # Choose a category: games, visualizations, animations, tools
   apps/creative-powerup/app/[category]/[your-experiment]/page.tsx
   ```

2. **Add to the registry**
   ```typescript
   // apps/creative-powerup/lib/experiments.ts
   {
     slug: 'your-experiment',
     title: 'Your Experiment Title',
     category: 'games', // or visualizations, animations, tools
     description: 'What your experiment does',
     author: 'Your Name',
     path: '/games/your-experiment',
     dateAdded: '2025-12-17',
     tags: ['tag1', 'tag2'],
   }
   ```

3. **That's it!** Your experiment appears in the gallery automatically.

See `/contribute` for detailed step-by-step instructions.

## Architecture

### Clean & Simple Structure

```
apps/creative-powerup/
├── app/                        # Next.js app router
│   ├── layout.tsx             # Root layout with nav + themes
│   ├── page.tsx               # Homepage gallery
│   ├── contribute/            # Contribution guide
│   ├── games/                 # Games category + experiments
│   ├── visualizations/        # Math/art experiments
│   ├── animations/            # Motion technique experiments
│   └── tools/                 # Functional utilities
├── components/
│   ├── ExperimentCard.tsx     # Gallery card component
│   └── CategoryPage.tsx       # Category view component
├── lib/
│   ├── experiments.ts         # Central registry (single source of truth)
│   ├── types.ts               # TypeScript interfaces
│   └── fonts.ts               # Theme-aware font configuration
└── public/
    ├── games-html/            # Standalone HTML games
    └── sounds/                # Audio assets
```

### Design Philosophy

1. **URL = Folder Structure** - No `src/` complexity, what you see is what you get
2. **Registry-Driven** - Add once to `experiments.ts`, appears everywhere automatically
3. **Framework Integration** - Uses design-system for consistent theming across all apps
4. **Progressive Enhancement** - Works with pure HTML, enhances with React when needed

## Categories

### 🎮 Games
Playable interactive experiences. Examples:
- Galaga (arcade shooter)
- Tetris (puzzle game)
- 2v2 Soccer (multiplayer)

### 🌀 Visualizations
Mathematical and generative art. Examples:
- Fibonacci Spiral (sacred geometry)
- Hexagonal Grid (tiling patterns)

### ✨ Animations
Motion technique experiments. Examples:
- Kaleidoscope (interactive symmetry)

### 🔧 Tools
Functional utilities. Examples:
- Mayan Calendar Converter (cultural tool)

## Contributing

### For First-Time Contributors

Visit **`/contribute`** on the running app for a complete beginner-friendly guide covering:
- How to fork the repository
- Creating your first experiment
- Adding to the registry
- Submitting a pull request

### For Experienced Developers

1. Fork the repo
2. Create experiment in appropriate `app/[category]/[slug]/page.tsx`
3. Add entry to `lib/experiments.ts`
4. Submit PR with description

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS + CSS Variables
- **Theming**: `@ecosystem/design-system`
- **State**: Zustand (theme preferences)
- **Fonts**: Google Fonts via next/font
- **Language**: TypeScript

## Design System Integration

This app uses the ecosystem's shared design system:

```typescript
import { ThemeProvider, CustomizerPanel } from '@ecosystem/design-system';
```

### Theme Features
- **3 Themes**: Studio (professional), Sage (organic), Volt (electric)
- **Light/Dark modes**: 6 total combinations
- **Font switching**: Automatic based on theme selection
- **Motion control**: Adjustable animation intensity
- **X-Ray mode**: Visual design system debugging

## Building

```bash
# Development
pnpm --filter creative-powerup dev

# Production build
pnpm --filter creative-powerup build

# Type checking
pnpm --filter creative-powerup build
```

## Philosophy

The Creative Sandbox embodies **"Lovable by Design"**:

1. **Inviting** - Clear instructions, low barriers to entry
2. **Playful** - Celebrate experimentation and exploration
3. **Accessible** - Works for beginners and experts alike
4. **Community-Driven** - Everyone's contribution makes it better
5. **Consistent** - Shared design system ensures quality

## License

Part of the ecosystem monorepo. See repository root for license information.

## Need Help?

- **In-app guide**: Visit `/contribute` for step-by-step instructions
- **GitHub Discussions**: [Ask questions](https://github.com/shalom-ormsby/ecosystem/discussions)
- **Issues**: [Report bugs](https://github.com/shalom-ormsby/ecosystem/issues)

---

**Happy experimenting!** 🎨✨
