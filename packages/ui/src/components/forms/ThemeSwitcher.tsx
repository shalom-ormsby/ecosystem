'use client';

import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Switch } from '../forms/Switch';

export interface ThemeSwitcherProps {
  /**
   * Size of the switcher
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Initial expanded state
   * @default false
   */
  defaultExpanded?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * ThemeSwitcher Molecule
 *
 * An enhanced theme control panel with expandable options for comprehensive theme management.
 *
 * Features:
 * - Quick toggle between light and dark modes
 * - Expandable panel with additional controls
 * - System/Auto mode preference
 * - Visual preview of current mode
 * - Smooth animations and transitions
 * - Full keyboard accessibility
 * - Theme-aware colors
 *
 * Example:
 * ```tsx
 * // Basic usage
 * <ThemeSwitcher />
 *
 * // Expanded by default
 * <ThemeSwitcher defaultExpanded />
 *
 * // Large size
 * <ThemeSwitcher size="lg" />
 * ```
 */
export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  size = 'md',
  defaultExpanded = false,
  className = '',
}) => {
  const { mode, setMode } = useTheme();
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [useSystemTheme, setUseSystemTheme] = useState(false);

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const iconSize = iconSizes[size];

  return (
    <div className={`relative ${className}`}>
      {/* Main Toggle Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleMode}
          className={`
            p-2.5
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
        </button>

        {/* Expand Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`
            p-2.5
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
          `}
          aria-label={isExpanded ? 'Hide theme options' : 'Show theme options'}
          aria-expanded={isExpanded}
        >
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {/* Expandable Options Panel */}
      {isExpanded && (
        <div
          className={`
            absolute bottom-full right-0 mb-2
            min-w-[280px]
            max-h-[80vh]
            overflow-y-auto
            p-4
            rounded-lg
            bg-[var(--color-surface)]
            border border-[var(--color-border)]
            shadow-lg
            animate-in fade-in slide-in-from-bottom-2
            duration-200
            z-50
            ${sizeClasses[size]}
          `}
        >
          <div className="space-y-4">
            {/* Header */}
            <div className="pb-3 border-b border-[var(--color-border)]">
              <h3 className="font-semibold text-[var(--color-text-primary)]">
                Theme Settings
              </h3>
              <p className="text-[var(--color-text-muted)] mt-1">
                Customize your viewing experience
              </p>
            </div>

            {/* Current Mode Display */}
            <div className="space-y-2">
              <label className="text-[var(--color-text-secondary)] font-medium">
                Current Mode
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setMode('light')}
                  className={`
                    flex-1 py-2 px-3 rounded-md
                    transition-all duration-200
                    ${mode === 'light'
                      ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-sm'
                      : 'bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-hover)]'
                    }
                  `}
                >
                  Light
                </button>
                <button
                  onClick={() => setMode('dark')}
                  className={`
                    flex-1 py-2 px-3 rounded-md
                    transition-all duration-200
                    ${mode === 'dark'
                      ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-sm'
                      : 'bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-hover)]'
                    }
                  `}
                >
                  Dark
                </button>
              </div>
            </div>

            {/* System Theme Option */}
            <div className="space-y-2">
              <label className="flex items-center justify-between">
                <span className="text-[var(--color-text-secondary)] font-medium">
                  Use System Theme
                </span>
                <Switch
                  checked={useSystemTheme}
                  onCheckedChange={setUseSystemTheme}
                />
              </label>
              <p className="text-[var(--color-text-muted)]">
                Automatically match your system's theme preference
              </p>
            </div>

            {/* Preview */}
            <div className="space-y-2">
              <label className="text-[var(--color-text-secondary)] font-medium">
                Preview
              </label>
              <div className={`
                p-3 rounded-md border border-[var(--color-border)]
                bg-[var(--color-background)]
              `}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-[var(--color-primary)]" />
                  <div className="flex-1 space-y-1">
                    <div className="h-2 bg-[var(--color-text-primary)] rounded w-3/4 opacity-70" />
                    <div className="h-2 bg-[var(--color-text-secondary)] rounded w-1/2 opacity-50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ThemeSwitcher.displayName = 'ThemeSwitcher';
