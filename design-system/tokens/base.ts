/**
 * Base Design Tokens
 * Shared across all themes (spacing, typography scales, motion)
 */

export const baseTokens = {
  /**
   * Spacing scale (based on 4px grid)
   */
  spacing: {
    '0': '0',
    '0.5': '0.125rem', // 2px
    '1': '0.25rem',    // 4px
    '2': '0.5rem',     // 8px
    '3': '0.75rem',    // 12px
    '4': '1rem',       // 16px
    '5': '1.25rem',    // 20px
    '6': '1.5rem',     // 24px
    '8': '2rem',       // 32px
    '10': '2.5rem',    // 40px
    '12': '3rem',      // 48px
    '16': '4rem',      // 64px
    '20': '5rem',      // 80px
    '24': '6rem',      // 96px
    '32': '8rem',      // 128px
  },

  /**
   * Typography scales
   */
  fontSize: {
    'xs': '0.75rem',     // 12px
    'sm': '0.875rem',    // 14px
    'base': '1rem',      // 16px
    'lg': '1.125rem',    // 18px
    'xl': '1.25rem',     // 20px
    '2xl': '1.5rem',     // 24px
    '3xl': '1.875rem',   // 30px
    '4xl': '2.25rem',    // 36px
    '5xl': '3rem',       // 48px
    '6xl': '3.75rem',    // 60px
    '7xl': '4.5rem',     // 72px
    '8xl': '6rem',       // 96px
  },

  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  /**
   * Border radius
   */
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    DEFAULT: '0.25rem', // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },

  /**
   * Motion durations (base values - themes can override)
   */
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '800ms',
  },

  /**
   * Easing curves (base values - themes can override)
   */
  ease: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  /**
   * Z-index scale
   */
  zIndex: {
    'auto': 'auto',
    '0': '0',
    '10': '10',
    '20': '20',
    '30': '30',
    '40': '40',
    '50': '50',
    dropdown: '1000',
    sticky: '1020',
    fixed: '1030',
    modalBackdrop: '1040',
    modal: '1050',
    popover: '1060',
    tooltip: '1070',
  },

  /**
   * Focus ring configuration
   */
  focus: {
    width: '2px',
    offset: '2px',
    style: 'solid',
  },
} as const;

export type BaseTokens = typeof baseTokens;

/**
 * Semantic spacing aliases
 * Provides human-readable names matching the README documentation
 */
export const spacing = {
  xs: baseTokens.spacing['1'],    // 4px  — Tight internal padding
  sm: baseTokens.spacing['2'],    // 8px  — Default gap
  md: baseTokens.spacing['4'],    // 16px — Section padding
  lg: baseTokens.spacing['6'],    // 24px — Card padding
  xl: baseTokens.spacing['8'],    // 32px — Section margins
  '2xl': baseTokens.spacing['12'], // 48px — Page sections
  '3xl': baseTokens.spacing['16'], // 64px — Major divisions
} as const;

/**
 * Semantic typography aliases
 */
export const typography = {
  fonts: {
    sans: 'var(--font-body)',
    serif: 'var(--font-heading)',
    mono: 'var(--font-mono)',
  },
  sizes: {
    xs: baseTokens.fontSize.xs,       // 12px — Fine print
    sm: baseTokens.fontSize.sm,       // 14px — Secondary text
    base: baseTokens.fontSize.base,   // 16px — Body text
    lg: baseTokens.fontSize.lg,       // 18px — Lead paragraphs
    xl: baseTokens.fontSize.xl,       // 20px — Section headers
    '2xl': baseTokens.fontSize['2xl'], // 24px — Page headers
    '3xl': baseTokens.fontSize['3xl'], // 30px — Hero text
  },
  weights: {
    normal: baseTokens.fontWeight.normal,     // 400
    medium: baseTokens.fontWeight.medium,     // 500
    semibold: baseTokens.fontWeight.semibold, // 600
    bold: baseTokens.fontWeight.bold,         // 700
  },
  leading: {
    tight: baseTokens.lineHeight.tight,     // 1.25 — Headings
    normal: baseTokens.lineHeight.normal,   // 1.5  — Body
    relaxed: baseTokens.lineHeight.relaxed, // 1.625 — Spacious reading
  },
} as const;

/**
 * Motion configuration
 */
export const motion = {
  duration: baseTokens.duration,
  easing: {
    default: baseTokens.ease.out,      // Most transitions
    spring: 'cubic-bezier(0.16, 1, 0.3, 1)', // Playful interactions
    linear: baseTokens.ease.linear,    // Progress indicators
  },
} as const;
