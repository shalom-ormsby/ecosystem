/**
 * Theme Store
 * Manages theme and color mode state with localStorage persistence
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeName, ColorMode } from '@sage/tokens';

// Re-export types for convenience
export type { ThemeName, ColorMode };

interface ThemeState {
  // Current theme and mode
  theme: ThemeName;
  mode: ColorMode;

  // Actions
  setTheme: (theme: ThemeName) => void;
  setMode: (mode: ColorMode) => void;
  toggleMode: () => void;

  // Computed
  themeConfig: { name: ThemeName; mode: ColorMode };
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      // Defaults
      theme: 'studio',
      mode: 'dark',

      // Actions
      setTheme: (theme) => set({ theme }),
      setMode: (mode) => set({ mode }),
      toggleMode: () =>
        set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),

      // Computed
      get themeConfig() {
        const state = get();
        return { name: state.theme, mode: state.mode };
      },
    }),
    {
      name: 'ecosystem-theme',
      // Only persist theme and mode
      partialize: (state) => ({
        theme: state.theme,
        mode: state.mode,
      }),
    }
  )
);
