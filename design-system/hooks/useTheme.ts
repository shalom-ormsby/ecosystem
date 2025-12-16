'use client';

import { useThemeStore } from '../store/theme';
import type { ThemeName, ColorMode } from '../tokens';

export interface ThemeHook {
  /**
   * Current theme name
   */
  theme: ThemeName;

  /**
   * Current color mode (light/dark)
   */
  mode: ColorMode;

  /**
   * Set the theme
   */
  setTheme: (theme: ThemeName) => void;

  /**
   * Set the color mode
   */
  setMode: (mode: ColorMode) => void;

  /**
   * Toggle between light and dark mode
   */
  toggleMode: () => void;

  /**
   * Combined theme configuration
   */
  themeConfig: { name: ThemeName; mode: ColorMode };
}

/**
 * Hook to access and control theme settings
 *
 * @example
 * ```tsx
 * function ThemeSelector() {
 *   const { theme, mode, setTheme, toggleMode } = useTheme();
 *
 *   return (
 *     <div>
 *       <p>Current: {theme} - {mode}</p>
 *       <button onClick={() => setTheme('sage')}>Sage Theme</button>
 *       <button onClick={toggleMode}>Toggle Mode</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useTheme(): ThemeHook {
  return useThemeStore();
}
