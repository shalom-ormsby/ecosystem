/**
 * Dynamic Font Loading System
 * Font utilities for typography themes
 *
 * Note: All fonts are pre-loaded in fonts.ts at build time via next/font/google.
 * This file provides utilities for working with those loaded fonts.
 */

import type { FontTheme } from '@thesage/tokens';

/**
 * Font loading status
 */
export type FontLoadStatus = 'idle' | 'loading' | 'loaded' | 'error';

/**
 * System fonts that don't require loading
 */
const SYSTEM_FONTS = ['System UI', 'SF Mono'];

/**
 * Font name to CSS variable mapping
 * All fonts are loaded in fonts.ts
 */
const FONT_VARIABLE_MAP: Record<string, string> = {
  // Core theme fonts
  'Nunito': '--font-nunito',
  'Nunito Sans': '--font-nunito-sans',
  'Outfit': '--font-studio-heading',
  'Manrope': '--font-studio-body',
  'Lora': '--font-terra-heading',
  'Instrument Sans': '--font-terra-body',
  'Space Grotesk': '--font-volt-heading',
  'Fira Code': '--font-mono',
  // Typography system fonts
  'Inter': '--font-inter',
  'Roboto': '--font-roboto',
  'Roboto Mono': '--font-roboto-mono',
  'Open Sans': '--font-open-sans',
  'Lato': '--font-lato',
  'Montserrat': '--font-montserrat',
  'Source Sans Pro': '--font-source-sans-pro',
  'Raleway': '--font-raleway',
  'Poppins': '--font-poppins',
  'Work Sans': '--font-work-sans',
  'Playfair Display': '--font-playfair-display',
  'Merriweather': '--font-merriweather',
  'Quicksand': '--font-quicksand',
  'Karla': '--font-karla',
  'Cormorant Garamond': '--font-cormorant-garamond',
  'Libre Bodoni': '--font-libre-bodoni',
  'Abril Fatface': '--font-abril-fatface',
  'Fredoka': '--font-fredoka',
  'JetBrains Mono': '--font-jetbrains-mono',
  'IBM Plex Sans': '--font-ibm-plex-sans',
  'IBM Plex Mono': '--font-ibm-plex-mono',
};

/**
 * Get CSS variable for a font
 */
export function getFontVariable(fontName: string): string {
  // System fonts use CSS font-family stacks
  if (fontName === 'System UI') {
    return 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  }
  if (fontName === 'SF Mono') {
    return 'ui-monospace, "SF Mono", Menlo, Monaco, "Cascadia Code", monospace';
  }

  const variable = FONT_VARIABLE_MAP[fontName];
  if (!variable) {
    console.warn(`Font "${fontName}" not found in registry`);
    return 'sans-serif'; // Fallback
  }

  return `var(${variable})`;
}

/**
 * Get all font families used in a font theme
 */
export function getFontThemeFamilies(fontTheme: FontTheme): string[] {
  return [fontTheme.heading, fontTheme.body, fontTheme.mono];
}

/**
 * Check if a font is a system font
 */
export function isSystemFont(fontName: string): boolean {
  return SYSTEM_FONTS.includes(fontName);
}

/**
 * Get all registered font names
 */
export function getAllFontNames(): string[] {
  return [...Object.keys(FONT_VARIABLE_MAP), ...SYSTEM_FONTS].sort();
}

/**
 * Mark fonts as loaded (for tracking purposes)
 * In Next.js, all fonts are loaded at build time, so this is a no-op
 */
export function markFontsAsLoaded(fontNames: string[]): void {
  // No-op: fonts are pre-loaded at build time
}

/**
 * Check if fonts are loaded
 * In Next.js, all fonts are always loaded at build time
 */
export function areFontsLoaded(fontNames: string[]): boolean {
  return true; // All fonts are pre-loaded
}

/**
 * Preconnect to Google Fonts for faster loading
 * Add this to your HTML <head>
 */
export const GOOGLE_FONTS_PRECONNECT = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
];
