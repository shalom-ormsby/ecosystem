/**
 * Sage Theme Tokens
 * Calm, organic, feminine/yin design
 * Muted earth tones, flowing animations
 */

export const sageTokens = {
  light: {
    colors: {
      // Warm, earthy backgrounds
      background: '#faf8f5',
      backgroundSecondary: '#f5f1eb',
      backgroundTertiary: '#ede8e0',

      // Warm neutrals for text
      foreground: '#2d2823',
      foregroundSecondary: '#5a524a',

      // Muted sage green as primary
      primary: '#7a9b7f',
      primaryHover: '#6a8b6f',

      // Warm terracotta accent
      accent: '#c17a5f',
      accentHover: '#b16a4f',

      // Semantic colors with muted, organic tones
      success: '#7a9b7f',
      warning: '#d4a574',
      error: '#c17a5f',
      info: '#8b9dc3',

      // Soft glass effects
      glass: 'rgba(250, 248, 245, 0.85)',
      glassBorder: 'rgba(122, 155, 127, 0.15)',
    },
    effects: {
      blur: {
        sm: 'blur(6px)',
        md: 'blur(12px)',
        lg: 'blur(20px)',
        xl: 'blur(32px)',
      },
      shadow: {
        sm: '0 2px 4px 0 rgba(45, 40, 35, 0.06)',
        md: '0 4px 8px -2px rgba(45, 40, 35, 0.08)',
        lg: '0 8px 16px -4px rgba(45, 40, 35, 0.12)',
        xl: '0 16px 32px -8px rgba(45, 40, 35, 0.16)',
        '2xl': '0 24px 48px -12px rgba(45, 40, 35, 0.20)',
      },
    },
  },

  dark: {
    colors: {
      // Deep forest backgrounds
      background: '#1a1614',
      backgroundSecondary: '#252220',
      backgroundTertiary: '#2f2b28',

      // Warm light text
      foreground: '#f5f1eb',
      foregroundSecondary: '#c7bfb5',

      // Brighter sage for dark mode
      primary: '#a8c5ad',
      primaryHover: '#b8d5bd',

      // Warm peachy accent for dark
      accent: '#e5a78a',
      accentHover: '#f5b79a',

      // Semantic colors adjusted for dark
      success: '#a8c5ad',
      warning: '#e5c59a',
      error: '#e5a78a',
      info: '#a8b5d5',

      // Dark glass effects
      glass: 'rgba(26, 22, 20, 0.85)',
      glassBorder: 'rgba(168, 197, 173, 0.2)',
    },
    effects: {
      blur: {
        sm: 'blur(6px)',
        md: 'blur(12px)',
        lg: 'blur(20px)',
        xl: 'blur(32px)',
      },
      shadow: {
        sm: '0 2px 4px 0 rgba(0, 0, 0, 0.3)',
        md: '0 4px 8px -2px rgba(0, 0, 0, 0.4)',
        lg: '0 8px 16px -4px rgba(0, 0, 0, 0.5)',
        xl: '0 16px 32px -8px rgba(0, 0, 0, 0.6)',
        '2xl': '0 24px 48px -12px rgba(0, 0, 0, 0.7)',
      },
    },
  },

  motion: {
    getDuration: (intensity: number): string => {
      if (intensity === 0) return '0ms';
      // Slower, more organic durations
      const ms = 300 + (intensity - 1) * 60;
      return `${ms}ms`;
    },

    ease: {
      default: 'cubic-bezier(0.33, 1, 0.68, 1)', // Organic, flowing
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
    },
  },

  typography: {
    heading: {
      fontFamily: 'var(--font-sage-serif)', // Lora serif
      fontWeight: '600',
      letterSpacing: '-0.01em',
    },

    body: {
      fontFamily: 'var(--font-sage-sans)', // Instrument Sans
      fontWeight: '400',
      letterSpacing: '0',
    },

    mono: {
      fontFamily: 'var(--font-sage-mono)',
      fontWeight: '400',
      letterSpacing: '0',
    },
  },
} as const;

export type SageTheme = typeof sageTokens;
