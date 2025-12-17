/**
 * Font Configuration
 * Theme-specific font definitions with lazy-loading support
 *
 * To replace a font:
 * 1. Import the new font from next/font/google or next/font/local
 * 2. Update the appropriate theme's font definition
 * 3. Update the corresponding CSS variable name in tokens if needed
 */

import { Inter, Instrument_Sans, Lora, JetBrains_Mono, Space_Grotesk, Fira_Code } from 'next/font/google';

/**
 * Studio Theme Fonts
 * Professional, balanced aesthetic
 * Using Inter as a clean, professional sans-serif
 */
export const studioFonts = {
  sans: Inter({
    subsets: ['latin'],
    variable: '--font-geist-sans',
    display: 'swap',
    weight: ['300', '400', '500', '600', '700'],
  }),

  mono: JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-geist-mono',
    display: 'swap',
    weight: ['400', '500', '600'],
  }),
};

/**
 * Sage Theme Fonts
 * Calm, organic, feminine/yin aesthetic
 */
export const sageFonts = {
  sans: Instrument_Sans({
    subsets: ['latin'],
    variable: '--font-instrument-sans',
    display: 'swap',
  }),

  serif: Lora({
    subsets: ['latin'],
    variable: '--font-lora',
    display: 'swap',
  }),

  mono: JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains-mono',
    display: 'swap',
  }),
};

/**
 * Volt Theme Fonts
 * Bold, electric, masculine/yang aesthetic
 */
export const voltFonts = {
  sans: Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-space-grotesk',
    display: 'swap',
  }),

  mono: Fira_Code({
    subsets: ['latin'],
    variable: '--font-fira-code',
    display: 'swap',
  }),
};

/**
 * Font configuration by theme
 */
export const fontsByTheme = {
  studio: studioFonts,
  sage: sageFonts,
  volt: voltFonts,
} as const;

/**
 * Get CSS variables for a theme's fonts
 */
export function getFontVariables(theme: keyof typeof fontsByTheme): string {
  const fonts = fontsByTheme[theme];

  return Object.values(fonts)
    .map((font) => font.variable)
    .join(' ');
}
