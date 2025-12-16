'use client';

/**
 * Theme Provider
 * Applies theme tokens as CSS variables and manages transitions
 */

import { useEffect, useState } from 'react';
import { useThemeStore } from '../store/theme';
import { studioTokens } from '../tokens/studio';
import { sageTokens } from '../tokens/sage';
import { voltTokens } from '../tokens/volt';
import type { ThemeName, ColorMode } from '../store/theme';

// Theme token map
const themeTokens = {
  studio: studioTokens,
  sage: sageTokens,
  volt: voltTokens,
};

// Font family map (CSS variables defined in layout)
const fontFamilies = {
  studio: {
    sans: 'var(--font-studio-sans)',
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
    // Colors
    '--color-background': colors?.background || '#ffffff',
    '--color-background-secondary': colors?.backgroundSecondary || colors?.background || '#fafafa',
    '--color-foreground': colors?.foreground || '#0a0a0a',
    '--color-primary': colors?.primary || '#0a0a0a',
    '--color-accent': colors?.accent || colors?.primary || '#0070f3',
    '--color-success': colors?.success || '#00a86b',
    '--color-warning': colors?.warning || '#f59e0b',
    '--color-error': colors?.error || '#ef4444',
    '--color-info': colors?.info || colors?.accent || '#0070f3',
    '--color-glass': colors?.glass || 'rgba(255, 255, 255, 0.7)',
    '--color-glass-border': colors?.glassBorder || 'rgba(0, 0, 0, 0.1)',

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
    '--font-heading': theme === 'sage' && fonts?.serif ? fonts.serif : fonts?.sans || 'var(--font-studio-sans)',
    '--font-body': fonts?.sans || 'var(--font-studio-sans)',
    '--font-mono': fonts?.mono || 'var(--font-studio-mono)',

    // Motion - These are accessed programmatically via tokens
    // but we can set defaults for CSS animations
    '--ease-default': tokens?.motion?.ease?.default || 'cubic-bezier(0.4, 0, 0.2, 1)',
    '--ease-spring': tokens?.motion?.ease?.spring || tokens?.motion?.ease?.default || 'cubic-bezier(0.16, 1, 0.3, 1)',
  };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, mode } = useThemeStore();
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
    const vars = getThemeVars(theme, mode);

    // Apply transition class
    root.classList.add('theme-transitioning');

    // Apply CSS variables
    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Set data attributes for theme and mode (useful for theme-specific styles)
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-mode', mode);

    // End transition after animation completes
    const timeout = setTimeout(() => {
      root.classList.remove('theme-transitioning');
      setIsTransitioning(false);
    }, 400); // 400ms = 300ms transition + 100ms buffer

    return () => clearTimeout(timeout);
  }, [theme, mode, mounted]);

  // Don't render children until mounted (prevents flash)
  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}
