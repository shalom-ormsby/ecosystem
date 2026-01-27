# Typography System Documentation

**Version:** 1.0.0
**Last Updated:** 2026-01-24
**Status:** Production Ready ✅

---

## Overview

The Typography System provides curated font pairings and custom font theme creation for Sage UI. It enables designers and developers to quickly apply professional typography to their projects with confidence.

### Key Features

- **18 Curated Font Themes** - Expert-designed font pairings across 8 categories
- **Custom Font Themes** - Create, edit, and save your own font combinations
- **30+ Google Fonts** - All fonts optimized via `next/font/google`
- **WCAG Accessibility** - Fonts marked for readability compliance
- **OG Card Integration** - Apply custom fonts to Open Graph images
- **Theme-Specific Fonts** - Different fonts per theme (Studio/Sage/Volt) and mode (Light/Dark)
- **LocalStorage Persistence** - Your custom themes are saved across sessions

---

## Font Pairing Principles

### 1. Contrast Creates Hierarchy

Pair fonts with different characteristics to create visual distinction:
- **Serif + Sans-Serif** - Classic pairing (e.g., Lora + Manrope)
- **Display + Body** - Bold heading with neutral body (e.g., Playfair Display + Inter)
- **Geometric + Humanist** - Modern vs organic (e.g., Outfit + Instrument Sans)

### 2. Limit Your Palette

Use 2-3 fonts maximum:
- **Heading**: Display font for titles, hero text
- **Body**: Reading font for paragraphs, content
- **Mono**: Code font for technical content (optional)

### 3. Consider Mood & Context

Match fonts to your brand personality:
- **Professional**: Clean, balanced (Inter, Roboto, Work Sans)
- **Editorial**: Traditional, authoritative (Lora, Playfair Display, Merriweather)
- **Tech**: Monospaced, geometric (Space Grotesk, JetBrains Mono, IBM Plex)
- **Friendly**: Rounded, approachable (Nunito, Quicksand, Fredoka)
- **Luxury**: Elegant serifs (Cormorant Garamond, Libre Bodoni, Abril Fatface)

### 4. Test Readability

Ensure body fonts are legible at small sizes:
- **Line height**: 1.5-1.7 for body text
- **Font size**: 16px minimum for body text
- **Contrast**: WCAG AA compliant (4.5:1 for normal text)

---

## Using the Typography System

### Browsing Font Themes

1. Navigate to **Themes → Typography** in Sage Studio
2. Browse by category:
   - **All**: View all 18+ font themes
   - **My Themes**: Your custom font themes
   - **Professional**: SaaS, corporate, modern
   - **Editorial**: Blogs, magazines, content-heavy
   - **Tech**: Developer tools, documentation
   - **Friendly**: Consumer apps, playful brands
   - **Minimal**: Clean, system fonts
   - **Luxury**: High-end, premium products
   - **Creative**: Artistic, unique designs
   - **Playful**: Fun, energetic brands

3. Use the **"Show only WCAG readable"** filter for accessibility compliance

### Applying a Font Theme

1. Find a font theme you like
2. Click **"Apply Font Theme"**
3. Fonts load automatically (< 500ms)
4. CSS variables update: `--font-heading`, `--font-body`, `--font-mono`
5. Entire site re-renders with new fonts

**Current Active Theme** is shown at the top with a highlighted card.

### Creating Custom Font Themes

1. Click **"+ Create Font Theme"** button
2. Enter a name and description
3. Select fonts:
   - **Heading**: Bold, eye-catching font
   - **Body**: Readable font for long text
   - **Mono**: Monospace font for code
4. Preview updates in real-time
5. Click **"Create Font Theme"**
6. Your theme appears in **"My Themes"** category

### Editing & Deleting

- **Edit**: Click the ⋮ menu → Edit → Change fonts → Save
- **Delete**: Click the ⋮ menu → Delete → Confirm
- **Reorder**: Drag & drop custom themes to reorder

### Resetting to Default

Click **"Reset to Default"** button to remove custom fonts and return to the theme's default typography.

---

## Technical Implementation

### Architecture

```
Typography System
├── Font Theme Tokens (packages/tokens/src/fontThemes.ts)
│   ├── FontTheme interface
│   ├── 18 curated font themes
│   └── Helper functions
│
├── State Management (packages/ui/src/lib/store/customizer.ts)
│   ├── customFontThemes (nested by theme/mode)
│   ├── savedFontThemes (user-created)
│   └── 12 font theme actions
│
├── Font Loading (apps/web/lib/fonts.ts)
│   ├── 30+ Google Fonts via next/font/google
│   ├── Static loading at build time
│   └── CSS variable mapping
│
├── Font Utilities (apps/web/lib/fonts-dynamic.ts)
│   ├── getFontVariable(fontName)
│   ├── getAllFontNames()
│   └── System font stacks
│
├── React Hook (apps/web/hooks/useFontThemeLoader.ts)
│   ├── useFontThemeLoader(fontTheme, options)
│   ├── Apply fonts to target element
│   └── Track loading status
│
└── UI Components
    ├── TypographyTab.tsx (main page)
    └── OpenGraphCardPage.tsx (OG card integration)
```

### Font Theme Data Structure

```typescript
interface FontTheme {
  id: string;                      // Unique identifier
  name: string;                     // Display name
  description: string;              // Brief description
  category: FontThemeCategory;      // Categorization
  heading: string;                  // Heading font family
  body: string;                     // Body font family
  mono: string;                     // Monospace font family
  headingWeight?: string;           // Default weight (e.g., "700")
  bodyWeight?: string;              // Default weight (e.g., "400")
  letterSpacing?: {
    heading?: string;               // e.g., "-0.03em"
    body?: string;                  // e.g., "0"
  };
  lineHeight?: {
    heading?: string;               // e.g., "1.2"
    body?: string;                  // e.g., "1.6"
  };
  isCustom?: boolean;               // User-created theme
  wcagReadable?: boolean;           // Accessibility compliant
  mood?: string[];                  // e.g., ["modern", "professional"]
  bestFor?: string;                 // Use case description
  pairing?: string;                 // Pairing strategy
}
```

### State Management

```typescript
// Zustand store structure
interface CustomizerState {
  // Font themes per theme/mode
  customFontThemes: {
    [theme in ThemeName]?: {
      [mode in ColorMode]?: FontTheme;
    };
  };

  // User-created themes
  savedFontThemes: SavedFontTheme[];

  // Actions
  applyFontTheme: (theme, mode, fontTheme) => void;
  resetCustomFonts: (theme, mode?) => void;
  saveFontTheme: (fontTheme) => void;
  updateFontTheme: (id, updates) => void;
  deleteFontTheme: (id) => void;
  reorderFontThemes: (fontThemes) => void;
  // ... more actions
}
```

### CSS Variables

When a font theme is applied, these CSS variables are injected:

```css
:root {
  /* Font families */
  --font-heading: var(--font-outfit);
  --font-body: var(--font-manrope);
  --font-mono: var(--font-fira-code);

  /* Optional: Weights */
  --font-heading-weight: 700;
  --font-body-weight: 400;

  /* Optional: Letter spacing */
  --font-heading-letter-spacing: -0.02em;
  --font-body-letter-spacing: 0;

  /* Optional: Line height */
  --font-heading-line-height: 1.2;
  --font-body-line-height: 1.6;
}
```

### Font Loading

All fonts are loaded at build time via `next/font/google` for optimal performance:

```typescript
import { Inter, Roboto, Playfair_Display } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

// Apply to root element
export const allFontVariables = [
  inter.variable,
  roboto.variable,
  playfairDisplay.variable,
  // ... 30+ fonts
].join(' ');
```

### React Hook Usage

```typescript
import { useFontThemeLoader } from '@/hooks/useFontThemeLoader';

function MyComponent() {
  const { status, isLoaded, error, applyFontTheme } = useFontThemeLoader(
    fontTheme,
    {
      autoApply: true,
      targetSelector: ':root',
      onLoaded: () => console.log('Fonts loaded!'),
      onError: (err) => console.error('Font loading failed:', err),
    }
  );

  return <div>{status}</div>;
}
```

---

## Available Fonts (30+)

### Sans-Serif Fonts
- **Inter** - Versatile, modern, highly readable
- **Roboto** - Google's workhorse font, neutral
- **Open Sans** - Friendly, optimized for legibility
- **Lato** - Warm, humanist sans-serif
- **Montserrat** - Geometric, inspired by urban typography
- **Work Sans** - Optimized for screen use
- **Nunito** - Rounded, friendly
- **Nunito Sans** - Slightly more formal variant
- **Outfit** - Geometric display font
- **Manrope** - Modern, balanced
- **Instrument Sans** - Elegant, contemporary
- **Space Grotesk** - Retro-futuristic
- **Poppins** - Geometric with personality
- **Raleway** - Elegant thin font
- **Quicksand** - Friendly, rounded
- **Karla** - Grotesque sans-serif
- **Fredoka** - Playful, rounded
- **IBM Plex Sans** - Corporate, technical

### Serif Fonts
- **Lora** - Brushed curves, calligraphic feel
- **Playfair Display** - High-contrast display serif
- **Merriweather** - Designed for screens
- **Cormorant Garamond** - Classic Garamond revival
- **Libre Bodoni** - Modern Didone
- **Abril Fatface** - Ultra-bold display serif

### Monospace Fonts
- **Fira Code** - Code font with ligatures
- **JetBrains Mono** - Developer-focused
- **Roboto Mono** - Monospaced Roboto
- **IBM Plex Mono** - Corporate monospace
- **SF Mono** - Apple's system mono (system font)

### System Fonts
- **System UI** - Native system font stack
- **SF Mono** - Apple's monospace (macOS/iOS)

---

## Curated Font Themes

### Professional (3 themes)

**Studio**
- Heading: Outfit
- Body: Manrope
- Mono: Fira Code
- Best for: SaaS products, modern web apps

**Modern Swiss**
- Heading: Inter
- Body: Inter
- Mono: Fira Code
- Best for: Minimalist designs, clean interfaces

**Corporate Authority**
- Heading: IBM Plex Sans
- Body: IBM Plex Sans
- Mono: IBM Plex Mono
- Best for: Enterprise software, corporate sites

### Editorial (3 themes)

**Sage**
- Heading: Lora
- Body: Instrument Sans
- Mono: Fira Code
- Best for: Blogs, content sites, storytelling

**Editorial Classic**
- Heading: Playfair Display
- Body: Merriweather
- Mono: Fira Code
- Best for: Magazines, long-form content

**Literary**
- Heading: Cormorant Garamond
- Body: Lora
- Mono: Fira Code
- Best for: Books, literature, academic content

### Tech (3 themes)

**Volt**
- Heading: Space Grotesk
- Body: Inter
- Mono: Fira Code
- Best for: Developer tools, technical products

**Tech Monospace**
- Heading: JetBrains Mono
- Body: Roboto Mono
- Mono: JetBrains Mono
- Best for: Code editors, terminals, dev tools

**Dev Tools**
- Heading: Space Grotesk
- Body: Roboto
- Mono: Fira Code
- Best for: Documentation, API references

### Friendly (2 themes)

**Friendly & Rounded**
- Heading: Nunito
- Body: Nunito Sans
- Mono: Fira Code
- Best for: Consumer apps, friendly brands

**Warm Welcome**
- Heading: Quicksand
- Body: Lato
- Mono: Fira Code
- Best for: Community platforms, welcoming sites

### Minimal (2 themes)

**Minimal Sans**
- Heading: Inter
- Body: Inter
- Mono: Roboto Mono
- Best for: Portfolio sites, minimal designs

**System UI**
- Heading: System UI
- Body: System UI
- Mono: SF Mono
- Best for: Native-feeling apps, fast loading

### Luxury (2 themes)

**Luxury Serif**
- Heading: Playfair Display
- Body: Lora
- Mono: Fira Code
- Best for: High-end brands, luxury products

**Prestige**
- Heading: Libre Bodoni
- Body: Cormorant Garamond
- Mono: Fira Code
- Best for: Fashion, jewelry, premium services

### Creative (2 themes)

**Creative Bold**
- Heading: Abril Fatface
- Body: Work Sans
- Mono: JetBrains Mono
- Best for: Art portfolios, bold statements

**Artistic Flair**
- Heading: Playfair Display
- Body: Raleway
- Mono: Fira Code
- Best for: Creative agencies, galleries

### Playful (1 theme)

**Playful Rounded**
- Heading: Fredoka
- Body: Quicksand
- Mono: Fira Code
- Best for: Kids' apps, fun brands, energetic products

---

## Performance Considerations

### Build-Time Loading

All fonts are loaded at build time via `next/font/google`:
- **Zero runtime requests** - Fonts are self-hosted by Vercel
- **Automatic subsetting** - Only characters you need
- **Font display: swap** - Text visible immediately with fallback
- **Preload critical fonts** - Faster first contentful paint

### Font File Sizes

Average font file sizes (per weight):
- **Sans-serif**: 12-20 KB (gzip)
- **Serif**: 15-25 KB (gzip)
- **Monospace**: 18-30 KB (gzip)

Total payload with 30+ fonts: ~600-800 KB (gzip), loaded at build time.

### Optimization Tips

1. **Limit weights**: Only load weights you use (400, 600, 700)
2. **Preconnect to Google Fonts** (already configured):
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   ```
3. **Use system fonts** for instant loading (System UI theme)
4. **Font subsetting**: next/font automatically subsets to Latin characters

---

## Accessibility

### WCAG Compliance

Font themes marked "WCAG Readable" meet these criteria:
- **Contrast**: Text meets WCAG AA (4.5:1 for normal text, 3:1 for large text)
- **Readability**: Body fonts tested at 16px for legibility
- **Line height**: 1.5-1.7 for body text (recommended)
- **Letter spacing**: Appropriate spacing for readability

### Screen Reader Support

- All interactive elements have ARIA labels
- Keyboard navigable (Tab, Enter, Escape)
- Focus indicators visible on all controls
- Semantic HTML structure

### Reduced Motion

Typography changes respect `prefers-reduced-motion`:
- Font switches happen instantly (no animation)
- Smooth scrolling disabled if motion is reduced
- All transitions respect user preferences

---

## OG Card Integration

Apply custom fonts to Open Graph images (1200x630px social media cards):

1. Navigate to **Blocks → Open Graph Card**
2. Customize your OG card design
3. Select a font from the **"Font Family"** dropdown (29 options)
4. Preview updates in real-time
5. Save your design
6. Click **"Set Active"** to sync to production
7. Edge Config syncs the fontFamily automatically
8. OG images render with your selected font

### Technical Details

- Fonts loaded dynamically in Edge Runtime via Google Fonts API
- Old browser User-Agent trick forces TTF/OTF format (Satori requirement)
- Graceful fallback to sans-serif if font loading fails
- Font rendered via Satori in ImageResponse

---

## Troubleshooting

### Font Not Applying

**Issue**: Custom font not showing after clicking "Apply"

**Solutions**:
1. Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
2. Check browser console for errors
3. Verify font is loaded: Inspect element → Computed styles → font-family
4. Clear localStorage and try again

### Font Loading Slowly

**Issue**: Fonts take too long to load

**Solutions**:
1. All fonts are pre-loaded at build time - if slow, it's a build issue
2. Check network tab - fonts should come from `/_next/static/media/`
3. Use System UI theme for instant loading

### Custom Theme Not Saving

**Issue**: Custom font theme disappears after refresh

**Solutions**:
1. Check localStorage is enabled in browser
2. Verify localStorage key: `ecosystem-customizer`
3. Check browser's storage quota (may be full)

### OG Card Font Not Rendering

**Issue**: OG card image shows wrong font

**Solutions**:
1. Verify font is in AVAILABLE_FONTS list
2. Check Edge Config sync (wait 5 seconds for propagation)
3. Test locally: Copy config from Active Design card
4. Ensure font name matches exactly (case-sensitive)

---

## Future Enhancements

Planned features for future releases:

1. **Font Pairing AI** - AI-suggested complementary fonts
2. **Variable Font Support** - Sliders for weight, width, slant
3. **Font Performance Dashboard** - Load time analysis
4. **Self-Hosted Font Uploads** - Custom font files
5. **Font Theme Marketplace** - Share/export font themes
6. **Advanced Typography Controls** - Kerning, OpenType features
7. **A/B Testing** - Compare font pairings side-by-side
8. **Font Subsetting UI** - Load only characters you need
9. **Theme-Specific Recommendations** - "Best fonts for dark mode"
10. **Figma Integration** - Export font configs to design tools

---

## Contributing

To add a new font to the Typography System:

1. **Add to `fonts.ts`**:
   ```typescript
   import { New_Font } from 'next/font/google';

   export const newFont = New_Font({
     subsets: ['latin'],
     variable: '--font-new-font',
     display: 'swap',
     weight: ['400', '600', '700'],
   });
   ```

2. **Add to `allFontVariables`**:
   ```typescript
   export const allFontVariables = [
     // ... existing fonts
     newFont.variable,
   ].join(' ');
   ```

3. **Add to `fonts-dynamic.ts` mapping**:
   ```typescript
   const FONT_VARIABLE_MAP: Record<string, string> = {
     // ... existing fonts
     'New Font': '--font-new-font',
   };
   ```

4. **Build and test**:
   ```bash
   pnpm build --filter @ecosystem/web
   ```

---

## Changelog

See [CHANGELOG.md](../../CHANGELOG.md) for full version history.

**v1.0.0** (2026-01-24)
- Initial release
- 18 curated font themes
- 30+ Google Fonts
- Custom theme creation
- OG Card integration
- WCAG accessibility compliance
- Full documentation

---

## License

All Google Fonts used in this system are licensed under the SIL Open Font License (OFL):
- Free for personal and commercial use
- Can be bundled, redistributed, and modified
- No attribution required (but appreciated!)

See individual font licenses on [Google Fonts](https://fonts.google.com/).

---

## Support

- **Documentation**: [Sage Studio](https://thesage.dev/#themes/typography)
- **Issues**: [GitHub Issues](https://github.com/shalomormsby/ecosystem/issues)
- **Questions**: Open a discussion or reach out

---

**Built with ❤️ by Shalom Ormsby**
Part of the Sage UI Design System - Lovable by Design
