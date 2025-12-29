/**
 * Typography Tokens
 *
 * Central typography system for the design system.
 * Defines font families, sizes, weights, line heights, and letter spacing.
 *
 * Architecture:
 * - Font families are theme-specific and loaded via Next.js font optimization
 * - Sizes, weights, etc. are universal across all themes
 * - Easily extensible for new themes/font sets
 *
 * Usage:
 * 1. Import in theme-specific apps to load fonts
 * 2. Reference via CSS variables (--font-*, --text-*, etc.)
 * 3. Add to Customizer for theme switching
 */

// ============================================================================
// FONT FAMILIES
// ============================================================================

/**
 * Font Family Definitions
 *
 * Each theme has its own font personality:
 * - Studio: Modern, geometric, professional
 * - Sage: Elegant, serif + sans combo
 * - Volt: Tech-forward, consistent throughout
 *
 * To add a new theme:
 * 1. Add entry to fontFamilies
 * 2. Load fonts in consuming app's layout
 * 3. Map to CSS variables in ThemeProvider
 */
export const fontFamilies = {
  studio: {
    heading: 'Outfit',
    body: 'Manrope',
    mono: 'Fira Code',
    description: 'Modern geometric sans-serif with clean readability',
    usage: {
      heading: 'Headlines, titles, emphasis',
      body: 'Paragraphs, UI text, readable content',
      mono: 'Code blocks, technical content',
    },
  },
  sage: {
    heading: 'Lora',      // Serif for elegance
    body: 'Instrument Sans',
    serif: 'Lora',        // Explicit serif reference
    sans: 'Instrument Sans', // Explicit sans reference
    mono: 'Fira Code',
    description: 'Elegant serif headings with modern sans body',
    usage: {
      heading: 'Elegant headings, article titles',
      body: 'Long-form content, UI text',
      serif: 'Pull quotes, emphasis',
      sans: 'UI elements, captions',
      mono: 'Code blocks, technical content',
    },
  },
  volt: {
    heading: 'Space Grotesk',
    body: 'Space Grotesk',
    sans: 'Space Grotesk',
    mono: 'Fira Code',
    description: 'Tech-forward, consistent geometric throughout',
    usage: {
      heading: 'All headlines',
      body: 'All body text (unified typography)',
      sans: 'All sans-serif needs',
      mono: 'Code blocks, technical content',
    },
  },
} as const;

/**
 * Type-safe theme names based on font families
 */
export type TypographyTheme = keyof typeof fontFamilies;

/**
 * Font loading configuration for Next.js
 * Use this to load fonts in app layouts
 */
export const fontLoadingConfig = {
  studio: {
    heading: { family: 'Outfit', weights: ['300', '400', '500', '600', '700', '800'] },
    body: { family: 'Manrope', weights: ['300', '400', '500', '600', '700', '800'] },
    mono: { family: 'Fira Code', weights: ['400', '500', '600', '700'] },
  },
  sage: {
    heading: { family: 'Lora', weights: ['400', '500', '600', '700'] },
    body: { family: 'Instrument Sans', weights: ['400', '500', '600', '700'] },
    mono: { family: 'Fira Code', weights: ['400', '500', '600', '700'] },
  },
  volt: {
    heading: { family: 'Space Grotesk', weights: ['300', '400', '500', '600', '700'] },
    body: { family: 'Space Grotesk', weights: ['300', '400', '500', '600', '700'] },
    mono: { family: 'Fira Code', weights: ['400', '500', '600', '700'] },
  },
} as const;

// ============================================================================
// FONT SIZES
// ============================================================================

/**
 * Font Size Scale
 *
 * Based on a modular scale for harmonious typography.
 * Mobile-first with responsive scaling.
 *
 * Naming convention:
 * - xs, sm, base, lg, xl, 2xl, etc. for body text
 * - Numeric for headings (aligns with h1-h6)
 */
export const fontSizes = {
  // Body text scale
  xs: { base: '0.75rem', mobile: '0.75rem' },      // 12px
  sm: { base: '0.875rem', mobile: '0.875rem' },    // 14px
  base: { base: '1rem', mobile: '1rem' },          // 16px
  lg: { base: '1.125rem', mobile: '1rem' },        // 18px / 16px mobile
  xl: { base: '1.25rem', mobile: '1.125rem' },     // 20px / 18px mobile
  '2xl': { base: '1.5rem', mobile: '1.25rem' },    // 24px / 20px mobile
  '3xl': { base: '1.875rem', mobile: '1.5rem' },   // 30px / 24px mobile

  // Heading scale (h6 → h1)
  '4xl': { base: '2.25rem', mobile: '1.875rem' },  // 36px / 30px - h3
  '5xl': { base: '3rem', mobile: '2.25rem' },      // 48px / 36px - h2
  '6xl': { base: '3.75rem', mobile: '2.5rem' },    // 60px / 40px - h1
  '7xl': { base: '4.5rem', mobile: '3rem' },       // 72px / 48px - Display
  '8xl': { base: '6rem', mobile: '3.75rem' },      // 96px / 60px - Hero
  '9xl': { base: '8rem', mobile: '4.5rem' },       // 128px / 72px - Ultra
} as const;

/**
 * Semantic font size mappings
 * Maps semantic names to scale values
 */
export const semanticSizes = {
  'heading-1': 'hero',
  'heading-2': '5xl',
  'heading-3': '4xl',
  'heading-4': '2xl',
  'heading-5': 'xl',
  'heading-6': 'lg',
  'body-large': 'lg',
  'body': 'base',
  'body-small': 'sm',
  'caption': 'xs',
} as const;

// ============================================================================
// FONT WEIGHTS
// ============================================================================

/**
 * Font Weight Scale
 *
 * Standard numeric weights with semantic aliases.
 * Not all fonts support all weights - check font-specific availability.
 */
export const fontWeights = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const;

/**
 * Semantic weight mappings
 */
export const semanticWeights = {
  heading: 'bold',        // Default heading weight
  'heading-light': 'semibold',
  'heading-heavy': 'extrabold',
  body: 'normal',        // Default body weight
  'body-emphasis': 'medium',
  'body-strong': 'semibold',
  caption: 'normal',
} as const;

// ============================================================================
// LINE HEIGHTS
// ============================================================================

/**
 * Line Height Scale
 *
 * Unitless values for better scalability.
 * Tighter for headings, relaxed for body text.
 */
export const lineHeights = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '1.75',
  extraloose: '2',
} as const;

/**
 * Semantic line height mappings
 */
export const semanticLineHeights = {
  heading: 'tight',
  'heading-display': 'none',    // Very tight for large display text
  body: 'normal',
  'body-relaxed': 'relaxed',
  caption: 'snug',
} as const;

// ============================================================================
// LETTER SPACING
// ============================================================================

/**
 * Letter Spacing (Tracking) Scale
 *
 * In ems for scalability across font sizes.
 * Negative for headings, positive for small caps.
 */
export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const;

/**
 * Semantic letter spacing mappings
 */
export const semanticLetterSpacing = {
  heading: 'tight',
  'heading-display': 'tighter',
  body: 'normal',
  'small-caps': 'wider',
  'all-caps': 'widest',
} as const;

// ============================================================================
// TYPE SCALE PRESETS
// ============================================================================

/**
 * Complete typography presets for common use cases
 * Combines size, weight, line-height, and letter-spacing
 *
 * Usage: Apply entire preset to a component
 */
export const typePresets = {
  'display-large': {
    size: fontSizes['8xl'],
    weight: fontWeights.bold,
    lineHeight: lineHeights.none,
    letterSpacing: letterSpacing.tighter,
    description: 'Large hero text, landing pages',
  },
  'display': {
    size: fontSizes['7xl'],
    weight: fontWeights.bold,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.tight,
    description: 'Hero sections, major headings',
  },
  'heading-1': {
    size: fontSizes['6xl'],
    weight: fontWeights.bold,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.tight,
    description: 'Page titles, h1',
  },
  'heading-2': {
    size: fontSizes['5xl'],
    weight: fontWeights.bold,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.normal,
    description: 'Section titles, h2',
  },
  'heading-3': {
    size: fontSizes['4xl'],
    weight: fontWeights.semibold,
    lineHeight: lineHeights.snug,
    letterSpacing: letterSpacing.normal,
    description: 'Subsection titles, h3',
  },
  'heading-4': {
    size: fontSizes['2xl'],
    weight: fontWeights.semibold,
    lineHeight: lineHeights.snug,
    letterSpacing: letterSpacing.normal,
    description: 'Component titles, h4',
  },
  'heading-5': {
    size: fontSizes.xl,
    weight: fontWeights.medium,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.normal,
    description: 'Small headings, h5',
  },
  'heading-6': {
    size: fontSizes.lg,
    weight: fontWeights.medium,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.normal,
    description: 'Tiny headings, h6',
  },
  'body-large': {
    size: fontSizes.lg,
    weight: fontWeights.normal,
    lineHeight: lineHeights.relaxed,
    letterSpacing: letterSpacing.normal,
    description: 'Lead paragraphs, intro text',
  },
  'body': {
    size: fontSizes.base,
    weight: fontWeights.normal,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.normal,
    description: 'Default body text',
  },
  'body-small': {
    size: fontSizes.sm,
    weight: fontWeights.normal,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.normal,
    description: 'Small body text, fine print',
  },
  'caption': {
    size: fontSizes.xs,
    weight: fontWeights.normal,
    lineHeight: lineHeights.snug,
    letterSpacing: letterSpacing.wide,
    description: 'Captions, labels, metadata',
  },
  'overline': {
    size: fontSizes.xs,
    weight: fontWeights.semibold,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.widest,
    description: 'Eyebrows, categories, all-caps labels',
  },
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get CSS variable name for a font family
 */
export function getFontVariable(theme: TypographyTheme, type: 'heading' | 'body' | 'mono' | 'serif' | 'sans'): string {
  return `--font-${theme}-${type}`;
}

/**
 * Get all font family CSS variables for a theme
 */
export function getThemeFontVariables(theme: TypographyTheme): Record<string, string> {
  const fonts = fontFamilies[theme];
  const vars: Record<string, string> = {};

  Object.entries(fonts).forEach(([key, value]) => {
    if (typeof value === 'string') {
      vars[`--font-${theme}-${key}`] = value;
    }
  });

  return vars;
}

/**
 * Get responsive font size CSS
 */
export function getResponsiveFontSize(sizeKey: keyof typeof fontSizes): string {
  const size = fontSizes[sizeKey];
  return `font-size: ${size.mobile}; @media (min-width: 768px) { font-size: ${size.base}; }`;
}

// ============================================================================
// EXPORTS
// ============================================================================

/**
 * Complete typography system export
 * Import this for access to entire typography token set
 *
 * Note: This is the comprehensive typography system with font families,
 * scales, presets, and utilities. For simple semantic aliases compatible
 * with existing code, use `typography` from './base'
 */
export const typographySystem = {
  families: fontFamilies,
  sizes: fontSizes,
  weights: fontWeights,
  lineHeights,
  letterSpacing,
  presets: typePresets,
  semantic: {
    sizes: semanticSizes,
    weights: semanticWeights,
    lineHeights: semanticLineHeights,
    letterSpacing: semanticLetterSpacing,
  },
  utils: {
    getFontVariable,
    getThemeFontVariables,
    getResponsiveFontSize,
  },
} as const;

/**
 * Type exports for TypeScript consumers
 */
export type FontSize = keyof typeof fontSizes;
export type FontWeight = keyof typeof fontWeights;
export type LineHeight = keyof typeof lineHeights;
export type LetterSpacing = keyof typeof letterSpacing;
export type TypePreset = keyof typeof typePresets;
