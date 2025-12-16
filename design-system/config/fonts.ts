/**
 * Font Configuration
 * Theme-specific font definitions with lazy-loading support
 *
 * To replace a font:
 * 1. Import the new font from next/font/google or next/font/local
 * 2. Update the appropriate theme's font definition
 * 3. Update the corresponding CSS variable name in tokens if needed
 */

import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

/**
 * Studio Theme Fonts
 * Professional, balanced aesthetic
 */
export const studioFonts = {
  sans: localFont({
    src: [
      {
        path: '../../../public/fonts/geist/Geist-Light.woff2',
        weight: '300',
        style: 'normal',
      },
      {
        path: '../../../public/fonts/geist/Geist-Regular.woff2',
        weight: '400',
        style: 'normal',
      },
      {
        path: '../../../public/fonts/geist/Geist-Medium.woff2',
        weight: '500',
        style: 'normal',
      },
      {
        path: '../../../public/fonts/geist/Geist-SemiBold.woff2',
        weight: '600',
        style: 'normal',
      },
      {
        path: '../../../public/fonts/geist/Geist-Bold.woff2',
        weight: '700',
        style: 'normal',
      },
    ],
    variable: '--font-geist-sans',
    display: 'swap',
  }),

  mono: localFont({
    src: [
      {
        path: '../../../public/fonts/geist/GeistMono-Regular.woff2',
        weight: '400',
        style: 'normal',
      },
      {
        path: '../../../public/fonts/geist/GeistMono-Medium.woff2',
        weight: '500',
        style: 'normal',
      },
      {
        path: '../../../public/fonts/geist/GeistMono-SemiBold.woff2',
        weight: '600',
        style: 'normal',
      },
    ],
    variable: '--font-geist-mono',
    display: 'swap',
  }),
};

/**
 * Sage Theme Fonts
 * Calm, organic, feminine/yin aesthetic
 */
export const sageFonts = {
  sans: Inter({
    subsets: ['latin'],
    variable: '--font-instrument-sans',
    display: 'swap',
    // TODO: Replace with actual Instrument Sans when available
    // This is a placeholder using Inter until Instrument Sans is added
  }),

  serif: Inter({
    subsets: ['latin'],
    variable: '--font-lora',
    display: 'swap',
    // TODO: Replace with actual Lora when available
    // This is a placeholder using Inter
  }),

  mono: Inter({
    subsets: ['latin'],
    variable: '--font-jetbrains-mono',
    display: 'swap',
    // TODO: Replace with actual JetBrains Mono when available
  }),
};

/**
 * Volt Theme Fonts
 * Bold, electric, masculine/yang aesthetic
 */
export const voltFonts = {
  sans: Inter({
    subsets: ['latin'],
    variable: '--font-space-grotesk',
    display: 'swap',
    // TODO: Replace with actual Space Grotesk when available
    // This is a placeholder using Inter
  }),

  mono: Inter({
    subsets: ['latin'],
    variable: '--font-fira-code',
    display: 'swap',
    // TODO: Replace with actual Fira Code when available
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
