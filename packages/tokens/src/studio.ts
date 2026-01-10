/**
 * Studio Theme Tokens
 * Professional, polished, balanced design
 * Inspiration: Framer, Vercel, Linear
 */

export const studioTokens = {
  light: {
    colors: {
      // Backgrounds
      background: '#ffffff',
      backgroundSecondary: '#fafafa',
      backgroundTertiary: '#f5f5f5',

      // Foregrounds
      foreground: '#0a0a0a',
      foregroundSecondary: '#525252',
      foregroundTertiary: '#a3a3a3',

      // Brand
      primary: '#0a0a0a',
      primaryForeground: '#ffffff',

      secondary: '#f5f5f5',
      secondaryForeground: '#0a0a0a',

      accent: '#0070f3',
      accentForeground: '#ffffff',

      // Borders
      border: '#d4d4d4',
      borderSubtle: '#f5f5f5',

      // States
      hover: '#fafafa',
      active: '#f0f0f0',

      // Link hover states
      linkHover: '#0a0a0a',
      linkHoverForeground: '#ffffff',

      // Semantic
      success: '#00a86b',
      successForeground: '#ffffff',

      warning: '#f59e0b',
      warningForeground: '#ffffff',

      error: '#ef4444',
      errorForeground: '#ffffff',

      info: '#0070f3',
      infoForeground: '#ffffff',

      // Glass effects
      glass: 'rgba(255, 255, 255, 0.7)',
      glassBorder: 'rgba(0, 0, 0, 0.1)',
    },

    effects: {
      blur: {
        sm: 'blur(4px)',
        md: 'blur(8px)',
        lg: 'blur(16px)',
        xl: 'blur(24px)',
      },

      shadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
    },
  },

  dark: {
    colors: {
      // Backgrounds
      background: '#000000',
      backgroundSecondary: '#171717',
      backgroundTertiary: '#262626',

      // Foregrounds
      foreground: '#fafafa',
      foregroundSecondary: '#a3a3a3',
      foregroundTertiary: '#858585',

      // Brand
      primary: '#ffffff',
      primaryForeground: '#0a0a0a',

      secondary: '#262626',
      secondaryForeground: '#fafafa',

      accent: '#0090ff',
      accentForeground: '#ffffff',

      // Borders
      border: '#404040',
      borderSubtle: '#1a1a1a',

      // States
      hover: '#1a1a1a',
      active: '#262626',

      // Link hover states
      linkHover: '#ffffff',
      linkHoverForeground: '#0a0a0a',

      // Semantic
      success: '#10b981',
      successForeground: '#ffffff',

      warning: '#f59e0b',
      warningForeground: '#ffffff',

      error: '#ef4444',
      errorForeground: '#ffffff',

      info: '#0090ff',
      infoForeground: '#ffffff',

      // Glass effects
      glass: 'rgba(0, 0, 0, 0.7)',
      glassBorder: 'rgba(255, 255, 255, 0.1)',
    },

    effects: {
      blur: {
        sm: 'blur(4px)',
        md: 'blur(8px)',
        lg: 'blur(16px)',
        xl: 'blur(24px)',
      },

      shadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.6)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.7)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
      },
    },
  },

  /**
   * Motion personality for Studio theme
   */
  motion: {
    // Duration scales based on motion slider (0-10)
    getDuration: (intensity: number): string => {
      if (intensity === 0) return '0ms';
      // Linear scale: 150ms at intensity 1, 500ms at intensity 10
      const ms = 150 + (intensity - 1) * 40;
      return `${ms}ms`;
    },

    // Easing curves - smooth and professional
    ease: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)', // ease-in-out
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.16, 1, 0.3, 1)', // Smooth spring
    },
  },

  /**
   * Typography for Studio theme
   */
  typography: {
    heading: {
      fontFamily: 'var(--font-geist-sans)',
      fontWeight: '600',
      letterSpacing: '-0.02em',
    },

    body: {
      fontFamily: 'var(--font-geist-sans)',
      fontWeight: '400',
      letterSpacing: '0',
    },

    mono: {
      fontFamily: 'var(--font-geist-mono)',
      fontWeight: '400',
      letterSpacing: '0',
    },
  },
} as const;

export type StudioTheme = typeof studioTokens;
