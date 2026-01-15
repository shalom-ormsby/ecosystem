/**
 * Semantic Color Utilities
 *
 * Helper functions for working with the design system's color tokens
 * and CSS variables.
 */

/**
 * Color token categories
 */
export const colorTokens = {
  // Background colors
  background: 'var(--color-background)',
  backgroundSecondary: 'var(--color-background-secondary)',
  backgroundTertiary: 'var(--color-background-tertiary)',
  surface: 'var(--color-surface)',

  // Foreground/Text colors
  foreground: 'var(--color-foreground)',
  foregroundSecondary: 'var(--color-foreground-secondary)',
  foregroundTertiary: 'var(--color-foreground-tertiary)',
  textPrimary: 'var(--color-text-primary)',
  textSecondary: 'var(--color-text-secondary)',
  textMuted: 'var(--color-text-muted)',

  // Brand colors
  primary: 'var(--color-primary)',
  primaryForeground: 'var(--color-primary-foreground)',
  secondary: 'var(--color-secondary)',
  secondaryForeground: 'var(--color-secondary-foreground)',
  accent: 'var(--color-accent)',
  accentForeground: 'var(--color-accent-foreground)',

  // Semantic colors
  success: 'var(--color-success)',
  successForeground: 'var(--color-success-foreground)',
  warning: 'var(--color-warning)',
  warningForeground: 'var(--color-warning-foreground)',
  error: 'var(--color-error)',
  errorForeground: 'var(--color-error-foreground)',
  info: 'var(--color-info)',
  infoForeground: 'var(--color-info-foreground)',

  // Borders
  border: 'var(--color-border)',
  borderSubtle: 'var(--color-border-subtle)',

  // Interactive states
  hover: 'var(--color-hover)',
  active: 'var(--color-active)',
  focus: 'var(--color-focus)',

  // Links
  link: 'var(--color-link)',
  linkHover: 'var(--color-link-hover)',
  linkHoverForeground: 'var(--color-link-hover-foreground)',
} as const;

/**
 * Get CSS variable value from computed styles
 *
 * @param variableName - CSS variable name (with or without --)
 * @param element - Element to get computed style from (defaults to document.documentElement)
 * @returns The computed value of the CSS variable
 *
 * @example
 * ```ts
 * const primaryColor = getCSSVariable('--color-primary');
 * // Returns: '#0066ff' (or whatever the current theme's primary color is)
 * ```
 */
export function getCSSVariable(
  variableName: string,
  element: HTMLElement = document.documentElement
): string {
  const name = variableName.startsWith('--') ? variableName : `--${variableName}`;
  return getComputedStyle(element).getPropertyValue(name).trim();
}

/**
 * Set CSS variable value
 *
 * @param variableName - CSS variable name (with or without --)
 * @param value - Value to set
 * @param element - Element to set the variable on (defaults to document.documentElement)
 *
 * @example
 * ```ts
 * setCSSVariable('--color-primary', '#ff0000');
 * ```
 */
export function setCSSVariable(
  variableName: string,
  value: string,
  element: HTMLElement = document.documentElement
): void {
  const name = variableName.startsWith('--') ? variableName : `--${variableName}`;
  element.style.setProperty(name, value);
}

/**
 * Get contrasting foreground color for a background color
 *
 * @param backgroundToken - Background color token name (without 'var()')
 * @returns The appropriate foreground color token
 *
 * @example
 * ```ts
 * const foreground = getForegroundColor('--color-primary');
 * // Returns: 'var(--color-primary-foreground)'
 * ```
 */
export function getForegroundColor(backgroundToken: string): string {
  // Remove var() wrapper if present
  const token = backgroundToken.replace(/var\(|\)/g, '');

  // Map background tokens to their foreground pairs
  const foregroundMap: Record<string, string> = {
    '--color-primary': 'var(--color-primary-foreground)',
    '--color-secondary': 'var(--color-secondary-foreground)',
    '--color-accent': 'var(--color-accent-foreground)',
    '--color-success': 'var(--color-success-foreground)',
    '--color-warning': 'var(--color-warning-foreground)',
    '--color-error': 'var(--color-error-foreground)',
    '--color-info': 'var(--color-info-foreground)',
    '--color-background': 'var(--color-foreground)',
    '--color-surface': 'var(--color-text-primary)',
  };

  return foregroundMap[token] || 'var(--color-text-primary)';
}

/**
 * Semantic color groups for different use cases
 */
export const semanticColors = {
  /**
   * Status colors for indicating states
   */
  status: {
    success: {
      bg: colorTokens.success,
      fg: colorTokens.successForeground,
    },
    warning: {
      bg: colorTokens.warning,
      fg: colorTokens.warningForeground,
    },
    error: {
      bg: colorTokens.error,
      fg: colorTokens.errorForeground,
    },
    info: {
      bg: colorTokens.info,
      fg: colorTokens.infoForeground,
    },
  },

  /**
   * Brand colors for primary UI elements
   */
  brand: {
    primary: {
      bg: colorTokens.primary,
      fg: colorTokens.primaryForeground,
    },
    secondary: {
      bg: colorTokens.secondary,
      fg: colorTokens.secondaryForeground,
    },
    accent: {
      bg: colorTokens.accent,
      fg: colorTokens.accentForeground,
    },
  },

  /**
   * Interactive state colors
   */
  interactive: {
    default: {
      bg: colorTokens.background,
      fg: colorTokens.foreground,
    },
    hover: {
      bg: colorTokens.hover,
      fg: colorTokens.foreground,
    },
    active: {
      bg: colorTokens.active,
      fg: colorTokens.foreground,
    },
    focus: {
      border: colorTokens.focus,
    },
  },
} as const;

/**
 * Helper to create color pairs (background + foreground)
 *
 * @param type - Semantic color type
 * @returns Object with bg and fg (and optionally border)
 *
 * @example
 * ```tsx
 * const errorColors = getSemanticColorPair('error');
 * <div style={{
 *   backgroundColor: errorColors.bg,
 *   color: errorColors.fg
 * }}>
 *   Error message
 * </div>
 * ```
 */
export function getSemanticColorPair(
  type: 'success' | 'warning' | 'error' | 'info' | 'primary' | 'secondary' | 'accent'
): { bg: string; fg: string } {
  if (type === 'primary' || type === 'secondary' || type === 'accent') {
    return semanticColors.brand[type];
  }
  return semanticColors.status[type];
}

/**
 * Convert hex color to RGB values
 *
 * @param hex - Hex color string (with or without #)
 * @returns Object with r, g, b values (0-255)
 *
 * @example
 * ```ts
 * const rgb = hexToRgb('#0066ff');
 * // Returns: { r: 0, g: 102, b: 255 }
 * ```
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Calculate relative luminance of a color (WCAG formula)
 *
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns Relative luminance (0-1)
 */
export function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const srgb = c / 255;
    return srgb <= 0.03928 ? srgb / 12.92 : Math.pow((srgb + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors (WCAG formula)
 *
 * @param hex1 - First color (hex)
 * @param hex2 - Second color (hex)
 * @returns Contrast ratio (1-21)
 *
 * @example
 * ```ts
 * const ratio = getContrastRatio('#ffffff', '#000000');
 * // Returns: 21 (maximum contrast)
 * ```
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  if (!rgb1 || !rgb2) return 0;

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if color pair meets WCAG AA contrast requirements
 *
 * @param foreground - Foreground color (hex)
 * @param background - Background color (hex)
 * @param level - WCAG level ('AA' or 'AAA')
 * @param size - Text size ('normal' or 'large')
 * @returns true if contrast ratio meets requirements
 *
 * @example
 * ```ts
 * const isAccessible = meetsContrastRequirements('#000000', '#ffffff', 'AA', 'normal');
 * // Returns: true
 * ```
 */
export function meetsContrastRequirements(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): boolean {
  const ratio = getContrastRatio(foreground, background);

  const requirements = {
    AA: { normal: 4.5, large: 3 },
    AAA: { normal: 7, large: 4.5 },
  };

  return ratio >= requirements[level][size];
}

/**
 * Color utilities for common operations
 */
export const colorUtils = {
  getCSSVariable,
  setCSSVariable,
  getForegroundColor,
  getSemanticColorPair,
  hexToRgb,
  getContrastRatio,
  meetsContrastRequirements,
} as const;
