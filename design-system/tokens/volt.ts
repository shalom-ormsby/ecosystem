/**
 * Volt Theme Tokens
 * Bold, electric, masculine/yang design
 * High-chroma colors, dynamic animations, cyberpunk aesthetic
 */

export const voltTokens = {
  light: {
    colors: {
      // Bright, punchy backgrounds
      background: '#ffffff',
      backgroundSecondary: '#f8f9fb',
      backgroundTertiary: '#f0f2f5',

      // Sharp contrast text
      foreground: '#0a0a0a',
      foregroundSecondary: '#4a4a4a',

      // Electric blue primary (WCAG AA compliant)
      primary: '#0066ff',
      primaryHover: '#0052cc',

      // Vibrant cyan accent
      accent: '#00d9ff',
      accentHover: '#00c3e6',

      // Bold semantic colors
      success: '#00cc66',
      warning: '#ffaa00',
      error: '#ff3366',
      info: '#0066ff',

      // Link hover states - Electric blue with high contrast
      linkHover: '#0066ff',
      linkHoverForeground: '#ffffff',

      // Crisp glass effects
      glass: 'rgba(255, 255, 255, 0.8)',
      glassBorder: 'rgba(0, 102, 255, 0.2)',
    },
    effects: {
      blur: {
        sm: 'blur(8px)',
        md: 'blur(16px)',
        lg: 'blur(32px)',
        xl: 'blur(48px)',
      },
      shadow: {
        sm: '0 0 8px rgba(0, 102, 255, 0.15)',
        md: '0 0 16px rgba(0, 102, 255, 0.2)',
        lg: '0 0 24px rgba(0, 102, 255, 0.25)',
        xl: '0 0 32px rgba(0, 102, 255, 0.3)',
        '2xl': '0 0 48px rgba(0, 102, 255, 0.4)',
      },
    },
  },

  dark: {
    colors: {
      // Pure black cyberpunk background
      background: '#000000',
      backgroundSecondary: '#0a0a0a',
      backgroundTertiary: '#141414',

      // Bright white text
      foreground: '#ffffff',
      foregroundSecondary: '#b3b3b3',

      // Neon blue primary
      primary: '#0099ff',
      primaryHover: '#00aaff',

      // Neon cyan accent
      accent: '#00ffff',
      accentHover: '#33ffff',

      // Neon semantic colors
      success: '#00ff99',
      warning: '#ffcc00',
      error: '#ff0066',
      info: '#0099ff',

      // Link hover states - Neon cyan (high luma)
      linkHover: '#00ffff',
      linkHoverForeground: '#000000',

      // Dark glass with glow
      glass: 'rgba(0, 0, 0, 0.8)',
      glassBorder: 'rgba(0, 153, 255, 0.3)',
    },
    effects: {
      blur: {
        sm: 'blur(8px)',
        md: 'blur(16px)',
        lg: 'blur(32px)',
        xl: 'blur(48px)',
      },
      shadow: {
        sm: '0 0 12px rgba(0, 153, 255, 0.4)',
        md: '0 0 20px rgba(0, 153, 255, 0.5)',
        lg: '0 0 32px rgba(0, 153, 255, 0.6)',
        xl: '0 0 48px rgba(0, 153, 255, 0.7)',
        '2xl': '0 0 64px rgba(0, 153, 255, 0.8)',
      },
    },
  },

  motion: {
    getDuration: (intensity: number): string => {
      if (intensity === 0) return '0ms';
      // Fast, snappy durations
      const ms = 100 + (intensity - 1) * 25;
      return `${ms}ms`;
    },

    ease: {
      default: 'cubic-bezier(0.16, 1, 0.3, 1)', // Snappy spring
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)', // Bouncy
    },
  },

  typography: {
    heading: {
      fontFamily: 'var(--font-volt-sans)', // Space Grotesk
      fontWeight: '700', // Bold
      letterSpacing: '-0.03em',
    },

    body: {
      fontFamily: 'var(--font-volt-sans)',
      fontWeight: '400',
      letterSpacing: '0',
    },

    mono: {
      fontFamily: 'var(--font-volt-mono)', // Fira Code
      fontWeight: '400',
      letterSpacing: '0',
    },
  },
} as const;

export type VoltTheme = typeof voltTokens;
