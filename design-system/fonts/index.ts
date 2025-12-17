/**
 * Centralized Font Configuration
 * Single source of truth for theme font specifications
 *
 * This module exports configurations that apps use to load fonts.
 * Apps must import these configs and load fonts with their framework's font loader.
 *
 * Variable names match ThemeProvider expectations:
 * - Studio: --font-studio-heading, --font-studio-body, --font-studio-mono
 * - Sage: --font-sage-sans, --font-sage-serif, --font-sage-mono
 * - Volt: --font-volt-sans, --font-volt-mono
 */

/**
 * Font configuration type
 */
export interface FontConfig {
  family: string;
  variable: string;
  weight: string[];
  subsets?: string[];
  display?: string;
  style?: string[];
}

/**
 * Studio Theme Font Configurations
 */
export const studioFontConfigs = {
  heading: {
    family: 'Inter',
    variable: '--font-studio-heading',
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
  } as FontConfig,

  body: {
    family: 'Manrope',
    variable: '--font-studio-body',
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
  } as FontConfig,

  mono: {
    family: 'JetBrains Mono',
    variable: '--font-studio-mono',
    weight: ['400', '500', '600'],
    subsets: ['latin'],
    display: 'swap',
  } as FontConfig,
};

/**
 * Sage Theme Font Configurations
 */
export const sageFontConfigs = {
  sans: {
    family: 'Instrument Sans',
    variable: '--font-sage-sans',
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
  } as FontConfig,

  serif: {
    family: 'Lora',
    variable: '--font-sage-serif',
    weight: ['400', '500', '600', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
  } as FontConfig,

  mono: {
    family: 'JetBrains Mono',
    variable: '--font-sage-mono',
    weight: ['400', '500', '600'],
    subsets: ['latin'],
    display: 'swap',
  } as FontConfig,
};

/**
 * Volt Theme Font Configurations
 */
export const voltFontConfigs = {
  sans: {
    family: 'Space Grotesk',
    variable: '--font-volt-sans',
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
  } as FontConfig,

  mono: {
    family: 'Fira Code',
    variable: '--font-volt-mono',
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
  } as FontConfig,
};

/**
 * All font variable names
 * Use this to know which CSS variables will be available
 */
export const fontVariableNames = [
  '--font-studio-heading',
  '--font-studio-body',
  '--font-studio-mono',
  '--font-sage-sans',
  '--font-sage-serif',
  '--font-sage-mono',
  '--font-volt-sans',
  '--font-volt-mono',
];
