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
      foregroundTertiary: '#8a7f72',

      // Muted sage green as primary
      primary: '#7a9b7f',
      primaryForeground: '#faf8f5',
      primaryHover: '#6a8b6f',

      // Secondary - warm stone
      secondary: '#ede8e0',
      secondaryForeground: '#2d2823',

      // Warm terracotta accent
      accent: '#c17a5f',
      accentForeground: '#faf8f5',
      accentHover: '#b16a4f',

      // Semantic colors with muted, organic tones
      success: '#6b8e6f',
      successForeground: '#faf8f5',

      warning: '#d4a574',
      warningForeground: '#2d2823',

      error: '#c17a5f',
      errorForeground: '#faf8f5',

      info: '#8b9dc3',
      infoForeground: '#faf8f5',

      // Borders - warm subtle
      border: '#e0d8cf',
      borderSubtle: '#ede8e0',

      // States
      hover: '#f5f1eb',
      active: '#ede8e0',

      // Link hover states - Muted sage green
      linkHover: '#7a9b7f',
      linkHoverForeground: '#faf8f5',

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
      foregroundTertiary: '#8a7f72',

      // Brighter sage for dark mode
      primary: '#a8c5ad',
      primaryForeground: '#1a1614',
      primaryHover: '#b8d5bd',

      // Secondary - lighter warm stone
      secondary: '#2f2b28',
      secondaryForeground: '#f5f1eb',

      // Warm peachy accent for dark
      accent: '#e5a78a',
      accentForeground: '#1a1614',
      accentHover: '#f5b79a',

      // Semantic colors adjusted for dark
      success: '#95b89a',
      successForeground: '#1a1614',

      warning: '#e5c59a',
      warningForeground: '#1a1614',

      error: '#e5a78a',
      errorForeground: '#1a1614',

      info: '#a8b5d5',
      infoForeground: '#1a1614',

      // Borders
      border: '#3a3530',
      borderSubtle: '#2f2b28',

      // States
      hover: '#252220',
      active: '#2f2b28',

      // Link hover states - Brighter sage for dark mode
      linkHover: '#a8c5ad',
      linkHoverForeground: '#1a1614',

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

  interactions: {
    hover: {
      overlayColor: 'var(--color-interaction-overlay)',
      opacity: 'var(--opacity-interaction-hover)',
    },
    active: {
      scale: 'var(--scale-interaction-active)',
    },
    focus: {
      ringColor: 'var(--color-interaction-focus-ring)',
      ringWidth: 'var(--width-interaction-focus-ring)',
      ringOffset: 'var(--width-interaction-focus-offset)',
    },
    disabled: {
      opacity: 'var(--opacity-interaction-disabled)',
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
