'use client';

import React from 'react';
import { useTheme } from '../../hooks';

export interface ThemeToggleProps {
  /**
   * Size of the toggle button
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Whether to show the mode label next to the icon
   * @default false
   */
  showLabel?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * ThemeToggle Molecule
 *
 * A button that toggles between light and dark modes with smooth icon transitions.
 *
 * Features:
 * - Automatic mode detection from theme context
 * - Smooth icon transition between sun (light) and moon (dark)
 * - Three size variants
 * - Optional text label
 * - Full keyboard accessibility
 * - ARIA labels for screen readers
 * - Theme-aware colors
 *
 * Example:
 * ```tsx
 * // Simple icon-only toggle
 * <ThemeToggle />
 *
 * // With label
 * <ThemeToggle showLabel />
 *
 * // Large size with label
 * <ThemeToggle size="lg" showLabel />
 * ```
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  size = 'md',
  showLabel = false,
  className = '',
}) => {
  const { mode, setMode } = useTheme();

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const sizeClasses = {
    sm: 'p-2',
    md: 'p-2.5',
    lg: 'p-3',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const iconSize = iconSizes[size];

  return (
    <button
      onClick={toggleMode}
      className={`
        ${sizeClasses[size]}
        rounded-lg
        bg-[var(--color-surface)]
        border border-[var(--color-border)]
        text-[var(--color-text-primary)]
        hover:bg-[var(--color-hover)]
        active:bg-[var(--color-active)]
        transition-all duration-200
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--color-focus)]
        focus-visible:ring-offset-2
        ${showLabel ? 'flex items-center gap-2' : ''}
        ${className}
      `}
      aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Sun Icon (Light Mode) */}
      {mode === 'light' && (
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-200"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      )}

      {/* Moon Icon (Dark Mode) */}
      {mode === 'dark' && (
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-200"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}

      {showLabel && (
        <span className="text-sm font-medium">
          {mode === 'light' ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
};

ThemeToggle.displayName = 'ThemeToggle';
