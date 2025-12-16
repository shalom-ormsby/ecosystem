/**
 * Font Definitions
 * Theme-specific font loading with next/font
 *
 * To replace a font:
 * 1. Import the new font from next/font/google
 * 2. Update the font definition below
 * 3. The theme system will automatically use the new font
 */

import { Outfit, Manrope, Space_Grotesk, Lora, JetBrains_Mono, Fira_Code, Instrument_Sans } from 'next/font/google';

/**
 * Studio Theme Fonts (Professional, modern, geometric)
 * Outfit: Geometric sans with personality for headings
 * Manrope: Rounded, friendly, professional for body text
 */
export const studioHeading = Outfit({
  subsets: ['latin'],
  variable: '--font-studio-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const studioBody = Manrope({
  subsets: ['latin'],
  variable: '--font-studio-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const studioMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-studio-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
});

/**
 * Sage Theme Fonts (Calm, organic, feminine)
 */
export const sageSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-sage-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const sageSerif = Lora({
  subsets: ['latin'],
  variable: '--font-sage-serif',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const sageMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-sage-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
});

/**
 * Volt Theme Fonts (Bold, electric, masculine)
 */
export const voltSans = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-volt-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const voltMono = Fira_Code({
  subsets: ['latin'],
  variable: '--font-volt-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

/**
 * All font variables combined
 * These are applied to the root HTML element
 */
export const allFontVariables = [
  studioHeading.variable,
  studioBody.variable,
  studioMono.variable,
  sageSans.variable,
  sageSerif.variable,
  sageMono.variable,
  voltSans.variable,
  voltMono.variable,
].join(' ');

/**
 * Font variables by theme
 * Used by the theme system to apply the correct fonts
 */
export const fontVariablesByTheme = {
  studio: {
    heading: '--font-studio-heading',
    body: '--font-studio-body',
    mono: '--font-studio-mono',
  },
  sage: {
    sans: '--font-sage-sans',
    serif: '--font-sage-serif',
    mono: '--font-sage-mono',
  },
  volt: {
    sans: '--font-volt-sans',
    mono: '--font-volt-mono',
  },
} as const;
