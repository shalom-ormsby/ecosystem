/**
 * Design Tokens Exports
 */

export * from './base';
export * from './studio';
export * from './sage';
export * from './volt';
export * from './typography';
export * from './MotionTab';

/**
 * Theme names
 */
export const THEME_NAMES = ['studio', 'sage', 'volt'] as const;
export type ThemeName = typeof THEME_NAMES[number];

/**
 * Color modes
 */
export const COLOR_MODES = ['light', 'dark'] as const;
export type ColorMode = typeof COLOR_MODES[number];

/**
 * Theme configuration type
 */
export interface ThemeConfig {
  name: ThemeName;
  mode: ColorMode;
}
