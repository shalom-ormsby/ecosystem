import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { computeDerivedTokens } from '@sage/tokens';
import {
  generateColorScale,
  getOptimalForeground,
} from '../colors';

export type CustomizationMode = 'simple' | 'advanced';

export interface ColorPalette {
  primary: string;                          // Base hex
  primaryForeground: string;                // Calculated contrast
  secondary?: string;                       // Optional secondary color
  secondaryForeground?: string;             // Calculated contrast
  accent?: string;                          // Optional accent color
  accentForeground?: string;                // Calculated contrast
  scale: Record<number, string>;            // 50-900 tints/shades
  derivedTokens: Record<string, string>;    // Computed dependent tokens
}

export interface SavedPalette {
  id: string;                               // Unique ID
  name: string;                             // User-defined name
  description: string;                      // Palette description
  primary: string;                          // Primary color hex
  accent: string;                           // Accent color hex
  secondary?: string;                       // Optional secondary color
  category: 'custom';                       // Always 'custom' for user palettes
  wcagAA: boolean;                          // Calculated accessibility
  wcagAAA: boolean;                         // Calculated accessibility
  createdAt: number;                        // Timestamp
  mood: string[];                           // Mood tags
  bestFor?: string[];                       // Best use cases
  harmony?: string;
  rationale?: string;
}

export interface ColorCustomization {
  mode: CustomizationMode;
  palette: ColorPalette | null;
}

export type ThemeName = 'studio' | 'sage' | 'volt';
export type ColorMode = 'light' | 'dark';

interface CustomizerState {
  // Motion settings
  motion: number; // 0-10
  prefersReducedMotion: boolean;

  // Color customization
  customizationMode: CustomizationMode;
  customColors: {
    [theme in ThemeName]?: {
      [mode in ColorMode]?: ColorPalette;
    };
  };

  // Saved custom palettes
  savedPalettes: SavedPalette[];

  // Motion actions
  setMotion: (level: number) => void;
  setPrefersReducedMotion: (value: boolean) => void;

  // Color customization actions
  setCustomizationMode: (mode: CustomizationMode) => void;

  setCustomPrimaryColor: (
    theme: ThemeName,
    mode: ColorMode,
    hexColor: string
  ) => void;

  setCustomSecondaryColor: (
    theme: ThemeName,
    mode: ColorMode,
    hexColor: string
  ) => void;

  setCustomAccentColor: (
    theme: ThemeName,
    mode: ColorMode,
    hexColor: string
  ) => void;

  applyColorPalette: (
    theme: ThemeName,
    mode: ColorMode,
    colors: { primary: string; secondary?: string; accent?: string }
  ) => void;

  resetCustomColors: (theme: ThemeName, mode?: ColorMode) => void;

  getActiveColorPalette: (theme: ThemeName, mode: ColorMode) => ColorPalette | null;

  // Saved palette actions
  savePalette: (palette: Omit<SavedPalette, 'id' | 'createdAt' | 'category'>) => void;
  updatePalette: (id: string, updates: Partial<SavedPalette>) => void;
  renamePalette: (id: string, newName: string) => void;
  deletePalette: (id: string) => void;
  getSavedPalettes: () => SavedPalette[];
}

export const useCustomizer = create<CustomizerState>()(
  persist(
    (set, get) => ({
      motion: 5,
      prefersReducedMotion: false,
      customizationMode: 'simple',
      customColors: {},
      savedPalettes: [],

      setMotion: (level) => set({ motion: level }),
      setPrefersReducedMotion: (value) => set({ prefersReducedMotion: value }),
      setCustomizationMode: (mode) => set({ customizationMode: mode }),

      setCustomPrimaryColor: (theme, mode, hexColor) => {
        const state = get();
        const currentPalette = state.customColors[theme]?.[mode];

        // Generate complete color palette
        const scale = generateColorScale(hexColor);
        const primaryForeground = getOptimalForeground(hexColor);

        // Compute all derived tokens based on dependency graph
        const derivedTokens = computeDerivedTokens('--color-primary', hexColor, mode);

        // In simple mode, generate secondary/accent from primary
        const isSimple = state.customizationMode === 'simple';

        const palette: ColorPalette = {
          primary: hexColor,
          primaryForeground,
          secondary: isSimple ? undefined : currentPalette?.secondary,
          secondaryForeground: isSimple ? undefined : currentPalette?.secondaryForeground,
          accent: isSimple ? undefined : currentPalette?.accent,
          accentForeground: isSimple ? undefined : currentPalette?.accentForeground,
          scale,
          derivedTokens,
        };

        set((state) => ({
          customColors: {
            ...state.customColors,
            [theme]: {
              ...state.customColors[theme],
              [mode]: palette,
            },
          },
        }));
      },

      setCustomSecondaryColor: (theme, mode, hexColor) => {
        const state = get();
        const currentPalette = state.customColors[theme]?.[mode];

        if (!currentPalette) return;

        const secondaryForeground = getOptimalForeground(hexColor);
        const derivedTokens = computeDerivedTokens('--color-secondary', hexColor, mode);

        set((state) => ({
          customColors: {
            ...state.customColors,
            [theme]: {
              ...state.customColors[theme],
              [mode]: {
                ...currentPalette,
                secondary: hexColor,
                secondaryForeground,
                derivedTokens: {
                  ...currentPalette.derivedTokens,
                  ...derivedTokens,
                },
              },
            },
          },
        }));
      },

      setCustomAccentColor: (theme, mode, hexColor) => {
        const state = get();
        const currentPalette = state.customColors[theme]?.[mode];

        if (!currentPalette) return;

        const accentForeground = getOptimalForeground(hexColor);
        const derivedTokens = computeDerivedTokens('--color-accent', hexColor, mode);

        set((state) => ({
          customColors: {
            ...state.customColors,
            [theme]: {
              ...state.customColors[theme],
              [mode]: {
                ...currentPalette,
                accent: hexColor,
                accentForeground,
                derivedTokens: {
                  ...currentPalette.derivedTokens,
                  ...derivedTokens,
                },
              },
            },
          },
        }));
      },

      applyColorPalette: (theme, mode, colors: { primary: string; secondary?: string; accent?: string }) => {
        // Generate complete color palette with all three colors in a single atomic update
        const scale = generateColorScale(colors.primary);
        const primaryForeground = getOptimalForeground(colors.primary);

        // Compute all derived tokens
        let derivedTokens = computeDerivedTokens('--color-primary', colors.primary, mode);

        // Add secondary color if provided
        let secondary = colors.secondary;
        let secondaryForeground = secondary ? getOptimalForeground(secondary) : undefined;
        if (secondary) {
          const secondaryDerived = computeDerivedTokens('--color-secondary', secondary, mode);
          derivedTokens = { ...derivedTokens, ...secondaryDerived };
        }

        // Add accent color if provided
        let accent = colors.accent;
        let accentForeground = accent ? getOptimalForeground(accent) : undefined;
        if (accent) {
          const accentDerived = computeDerivedTokens('--color-accent', accent, mode);
          derivedTokens = { ...derivedTokens, ...accentDerived };
        }

        const palette: ColorPalette = {
          primary: colors.primary,
          primaryForeground,
          secondary,
          secondaryForeground,
          accent,
          accentForeground,
          scale,
          derivedTokens,
        };

        set((state) => ({
          customColors: {
            ...state.customColors,
            [theme]: {
              ...state.customColors[theme],
              [mode]: palette,
            },
          },
        }));
      },

      resetCustomColors: (theme, mode) => {
        if (mode) {
          // Reset specific mode
          set((state) => ({
            customColors: {
              ...state.customColors,
              [theme]: {
                ...state.customColors[theme],
                [mode]: undefined,
              },
            },
          }));
        } else {
          // Reset entire theme
          set((state) => {
            const { [theme]: _, ...rest } = state.customColors;
            return { customColors: rest };
          });
        }
      },

      getActiveColorPalette: (theme, mode) => {
        return get().customColors[theme]?.[mode] || null;
      },

      // Saved palette management
      savePalette: (paletteData) => {
        const id = `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newPalette: SavedPalette = {
          ...paletteData,
          id,
          category: 'custom',
          createdAt: Date.now(),
        };

        set((state) => ({
          savedPalettes: [...state.savedPalettes, newPalette],
        }));
      },

      updatePalette: (id, updates) => {
        set((state) => ({
          savedPalettes: state.savedPalettes.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        }));
      },

      renamePalette: (id, newName) => {
        set((state) => ({
          savedPalettes: state.savedPalettes.map((p) =>
            p.id === id ? { ...p, name: newName } : p
          ),
        }));
      },

      deletePalette: (id) => {
        set((state) => ({
          savedPalettes: state.savedPalettes.filter((p) => p.id !== id),
        }));
      },

      getSavedPalettes: () => {
        return get().savedPalettes;
      },
    }),
    {
      name: 'ecosystem-customizer',
      version: 3,
      partialize: (state) => ({
        motion: state.motion,
        prefersReducedMotion: state.prefersReducedMotion,
        customizationMode: state.customizationMode,
        customColors: state.customColors,
        savedPalettes: state.savedPalettes,
      }),
    }
  )
);
