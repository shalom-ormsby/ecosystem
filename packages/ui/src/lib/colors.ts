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
 * Convert hex to HSL for manipulation
 */
export function hexToHSL(hex: string): { h: number; s: number; l: number } {
  const rgb = hexToRgb(hex);
  if (!rgb) return { h: 0, s: 0, l: 0 };

  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0; const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Convert HSL to hex
 */
export function hslToHex(h: number, s: number, l: number): string {
  h = h / 360;
  s = s / 100;
  l = l / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Adjust lightness of a hex color
 * @param hex - Input color
 * @param percent - Amount to adjust (-100 to 100)
 */
export function adjustLightness(hex: string, percent: number): string {
  const hsl = hexToHSL(hex);
  const newL = Math.max(0, Math.min(100, hsl.l + percent));
  return hslToHex(hsl.h, hsl.s, newL);
}

/**
 * Adjust saturation of a hex color
 * @param hex - Input color
 * @param percent - Amount to adjust (-100 to 100)
 */
export function adjustSaturation(hex: string, percent: number): string {
  const hsl = hexToHSL(hex);
  const newS = Math.max(0, Math.min(100, hsl.s + percent));
  return hslToHex(hsl.h, newS, hsl.l);
}

/**
 * Rotate hue of a hex color
 * @param hex - Input color
 * @param degrees - Degrees to rotate (0-360)
 */
export function rotateHue(hex: string, degrees: number): string {
  const hsl = hexToHSL(hex);
  const newH = (hsl.h + degrees) % 360;
  return hslToHex(newH, hsl.s, hsl.l);
}

/**
 * Add opacity to a hex color (returns rgba CSS value)
 * @param hex - Input color
 * @param opacity - Opacity (0-1)
 */
export function adjustOpacity(hex: string, opacity: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
}

/**
 * Get optimal foreground color (white or black) for a background
 * Uses WCAG contrast formula
 */
export function getOptimalForeground(
  bgHex: string,
  whiteHex: string = '#ffffff',
  blackHex: string = '#000000'
): string {
  const whiteRatio = getContrastRatio(bgHex, whiteHex);
  const blackRatio = getContrastRatio(bgHex, blackHex);

  return whiteRatio > blackRatio ? whiteHex : blackHex;
}

/**
 * Generate a complete tint/shade scale (like Tailwind)
 * Returns 50, 100, 200, ..., 900 variants
 */
export function generateColorScale(baseHex: string): Record<number, string> {
  const hsl = hexToHSL(baseHex);

  return {
    50:  hslToHex(hsl.h, Math.max(hsl.s - 10, 20), 95),
    100: hslToHex(hsl.h, Math.max(hsl.s - 5, 30), 90),
    200: hslToHex(hsl.h, hsl.s, 80),
    300: hslToHex(hsl.h, hsl.s, 70),
    400: hslToHex(hsl.h, hsl.s, 60),
    500: baseHex,  // Base color
    600: hslToHex(hsl.h, Math.min(hsl.s + 5, 100), 45),
    700: hslToHex(hsl.h, Math.min(hsl.s + 10, 100), 35),
    800: hslToHex(hsl.h, Math.min(hsl.s + 15, 100), 25),
    900: hslToHex(hsl.h, Math.min(hsl.s + 20, 100), 15),
  };
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
  hexToHSL,
  hslToHex,
  adjustLightness,
  adjustSaturation,
  rotateHue,
  adjustOpacity,
  getOptimalForeground,
  generateColorScale,
  getContrastRatio,
  meetsContrastRequirements,
} as const;
