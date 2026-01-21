'use client';

/**
 * Theme Provider
 * Applies theme tokens as CSS variables and manages transitions
 */

import { useEffect, useState } from 'react';
import { useThemeStore } from '../lib/store/theme';
import { useCustomizer, type ColorPalette } from '../lib/store/customizer';
import { studioTokens, sageTokens, voltTokens, syntaxColors, codeColors } from '@sage/tokens';
import type { ThemeName, ColorMode } from '@sage/tokens';

// Theme token map
const themeTokens = {
  studio: studioTokens,
  sage: sageTokens,
  volt: voltTokens,
};

// Font family map (CSS variables defined in layout)
const fontFamilies = {
  studio: {
    heading: 'var(--font-studio-heading)',
    body: 'var(--font-studio-body)',
    mono: 'var(--font-studio-mono)',
  },
  sage: {
    sans: 'var(--font-sage-sans)',
    serif: 'var(--font-sage-serif)',
    mono: 'var(--font-sage-mono)',
  },
  volt: {
    sans: 'var(--font-volt-sans)',
    mono: 'var(--font-volt-mono)',
  },
};

/**
 * Convert theme tokens to CSS variables
 */
function getThemeVars(theme: ThemeName, mode: ColorMode): Record<string, string> {
  const tokens = themeTokens[theme];
  const colors = tokens[mode]?.colors as any;
  const effects = tokens[mode]?.effects as any;
  const fonts = fontFamilies[theme] as any;

  return {
    // Colors - Base
    '--color-background': colors?.background || '#ffffff',
    '--color-background-secondary': colors?.backgroundSecondary || colors?.background || '#fafafa',
    '--color-background-tertiary': colors?.backgroundTertiary || colors?.backgroundSecondary || colors?.background || '#f5f5f5',
    '--color-foreground': colors?.foreground || '#0a0a0a',
    '--color-primary': colors?.primary || '#0a0a0a',
    '--color-primary-foreground': colors?.primaryForeground || '#ffffff',
    '--color-secondary': colors?.secondary || '#f5f5f5',
    '--color-secondary-foreground': colors?.secondaryForeground || '#0a0a0a',
    '--color-accent': colors?.accent || colors?.primary || '#0070f3',
    '--color-accent-foreground': colors?.accentForeground || '#ffffff',
    '--color-success': colors?.success || '#00a86b',
    '--color-success-foreground': colors?.successForeground || '#ffffff',
    '--color-warning': colors?.warning || '#f59e0b',
    '--color-warning-foreground': colors?.warningForeground || '#ffffff',
    '--color-error': colors?.error || '#ef4444',
    '--color-error-foreground': colors?.errorForeground || '#ffffff',
    '--color-info': colors?.info || colors?.accent || '#0070f3',
    '--color-info-foreground': colors?.infoForeground || '#ffffff',
    '--color-glass': colors?.glass || 'rgba(255, 255, 255, 0.7)',
    '--color-glass-border': colors?.glassBorder || 'rgba(0, 0, 0, 0.1)',

    // Semantic color aliases (matching README examples)
    '--color-text-primary': colors?.foreground || '#0a0a0a',
    '--color-text-secondary': colors?.foregroundSecondary || '#525252',
    '--color-text-muted': colors?.foregroundTertiary || '#a3a3a3',
    '--color-surface': colors?.backgroundSecondary || colors?.background || '#fafafa',
    '--color-border': colors?.border || colors?.glassBorder || 'rgba(0, 0, 0, 0.1)',
    '--color-focus': colors?.accent || colors?.primary || '#0070f3',

    // Interactive states
    '--color-hover': colors?.hover || colors?.backgroundSecondary || '#fafafa',
    '--color-active': colors?.active || colors?.backgroundTertiary || '#f0f0f0',
    '--color-link-hover': colors?.linkHover || colors?.primary || '#0a0a0a',
    '--color-link-hover-foreground': colors?.linkHoverForeground || colors?.background || '#ffffff',

    // Effects - Blur
    '--effect-blur-sm': effects?.blur?.sm || 'blur(4px)',
    '--effect-blur-md': effects?.blur?.md || 'blur(8px)',
    '--effect-blur-lg': effects?.blur?.lg || 'blur(16px)',
    '--effect-blur-xl': effects?.blur?.xl || effects?.blur?.lg || 'blur(24px)',

    // Effects - Shadow
    '--effect-shadow-sm': effects?.shadow?.sm || '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    '--effect-shadow-md': effects?.shadow?.md || effects?.shadow?.sm || '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    '--effect-shadow-lg': effects?.shadow?.lg || effects?.shadow?.md || effects?.shadow?.sm || '0 10px 15px -3px rgba(0, 0, 0, 0.1)',

    // Typography - Font Families
    '--font-heading': fonts?.heading || (theme === 'sage' && fonts?.serif ? fonts.serif : fonts?.sans) || 'var(--font-studio-heading)',
    '--font-body': fonts?.body || fonts?.sans || 'var(--font-studio-body)',
    '--font-mono': fonts?.mono || 'var(--font-studio-mono)',

    // Motion - These are accessed programmatically via tokens
    // but we can set defaults for CSS animations
    '--ease-default': tokens?.motion?.ease?.default || 'cubic-bezier(0.4, 0, 0.2, 1)',
    '--ease-spring': tokens?.motion?.ease?.spring || tokens?.motion?.ease?.default || 'cubic-bezier(0.16, 1, 0.3, 1)',

    // Syntax Highlighting - Based on VS Code Dark+ theme
    '--syntax-comment': mode === 'light' ? syntaxColors.light.comment : syntaxColors.dark.comment,
    '--syntax-keyword': mode === 'light' ? syntaxColors.light.keyword : syntaxColors.dark.keyword,
    '--syntax-function': mode === 'light' ? syntaxColors.light.function : syntaxColors.dark.function,
    '--syntax-string': mode === 'light' ? syntaxColors.light.string : syntaxColors.dark.string,
    '--syntax-number': mode === 'light' ? syntaxColors.light.number : syntaxColors.dark.number,
    '--syntax-boolean': mode === 'light' ? syntaxColors.light.boolean : syntaxColors.dark.boolean,
    '--syntax-operator': mode === 'light' ? syntaxColors.light.operator : syntaxColors.dark.operator,
    '--syntax-property': mode === 'light' ? syntaxColors.light.property : syntaxColors.dark.property,
    '--syntax-className': mode === 'light' ? syntaxColors.light.className : syntaxColors.dark.className,
    '--syntax-tag': mode === 'light' ? syntaxColors.light.tag : syntaxColors.dark.tag,
    '--syntax-attribute': mode === 'light' ? syntaxColors.light.attribute : syntaxColors.dark.attribute,
    '--syntax-variable': mode === 'light' ? syntaxColors.light.variable : syntaxColors.dark.variable,
    '--syntax-punctuation': mode === 'light' ? syntaxColors.light.punctuation : syntaxColors.dark.punctuation,
    '--syntax-plain': mode === 'light' ? syntaxColors.light.plain : syntaxColors.dark.plain,

    // Code Block Backgrounds and Borders - Accessible contrast (WCAG AA 4.5:1)
    '--code-block-bg': mode === 'light' ? codeColors.light.blockBackground : codeColors.dark.blockBackground,
    '--code-inline-bg': mode === 'light' ? codeColors.light.inlineBackground : codeColors.dark.inlineBackground,
    '--code-border': mode === 'light' ? codeColors.light.border : codeColors.dark.border,
  };
}

/**
 * Merge custom color palette with base theme tokens
 * This is where "change once, ripple everywhere" happens!
 */
function mergeCustomColorTokens(
  baseTokens: Record<string, string>,
  customPalette: ColorPalette
): Record<string, string> {
  return {
    ...baseTokens,

    // Override primary color
    '--color-primary': customPalette.primary,
    '--color-primary-foreground': customPalette.primaryForeground,

    // Apply color scale (for utilities like bg-primary/50)
    '--color-primary-50': customPalette.scale[50],
    '--color-primary-100': customPalette.scale[100],
    '--color-primary-200': customPalette.scale[200],
    '--color-primary-300': customPalette.scale[300],
    '--color-primary-400': customPalette.scale[400],
    '--color-primary-500': customPalette.scale[500],
    '--color-primary-600': customPalette.scale[600],
    '--color-primary-700': customPalette.scale[700],
    '--color-primary-800': customPalette.scale[800],
    '--color-primary-900': customPalette.scale[900],

    // Override secondary color if provided (advanced mode)
    ...(customPalette.secondary && {
      '--color-secondary': customPalette.secondary,
      '--color-secondary-foreground': customPalette.secondaryForeground || baseTokens['--color-secondary-foreground'],
    }),

    // Override accent color if provided (advanced mode)
    ...(customPalette.accent && {
      '--color-accent': customPalette.accent,
      '--color-accent-foreground': customPalette.accentForeground || baseTokens['--color-accent-foreground'],
    }),

    // Apply ALL derived tokens from dependency graph
    // This automatically updates:
    // - Links (--color-link, --color-link-hover)
    // - Focus rings (--color-ring)
    // - Charts (--chart-1, --chart-2, --chart-3, --chart-4, --chart-5)
    // - Buttons, badges, and any other dependent tokens
    ...customPalette.derivedTokens,
  };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, mode } = useThemeStore();
  const getActiveColorPalette = useCustomizer((state) => state.getActiveColorPalette);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Apply theme variables with transition
  useEffect(() => {
    if (!mounted) return;

    // Start transition
    setIsTransitioning(true);

    // Apply theme vars to :root
    const root = document.documentElement;

    // 1. Get base theme tokens
    const baseTokens = getThemeVars(theme, mode);

    // 2. Get custom color palette (if exists)
    const customPalette = getActiveColorPalette(theme, mode);

    // 3. Merge tokens (custom overrides base)
    const finalTokens = customPalette
      ? mergeCustomColorTokens(baseTokens, customPalette)
      : baseTokens;

    // Apply transition class
    root.classList.add('theme-transitioning');

    // Apply CSS variables IMMEDIATELY (no requestAnimationFrame delay)
    Object.entries(finalTokens).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Set data attributes for theme and mode
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-mode', mode);
    root.setAttribute('data-custom-colors', customPalette ? 'active' : 'default');

    // Toggle 'dark' class for Tailwind dark: modifier support
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // End transition after animation completes
    const timeout = setTimeout(() => {
      root.classList.remove('theme-transitioning');
      setIsTransitioning(false);
    }, 400); // 400ms = 300ms transition + 100ms buffer

    return () => clearTimeout(timeout);
  }, [theme, mode, mounted, getActiveColorPalette]);

  // Don't render children until mounted (prevents flash)
  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}
