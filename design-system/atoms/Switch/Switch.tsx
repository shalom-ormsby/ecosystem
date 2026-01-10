'use client';

import React from 'react';

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size' | 'onChange'> {
  /**
   * Whether the switch is checked
   */
  checked?: boolean;

  /**
   * Callback when the switch state changes
   */
  onCheckedChange?: (checked: boolean) => void;

  /**
   * Size of the switch
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Whether the switch is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional className for custom styling
   */
  className?: string;
}

/**
 * Switch Atom
 *
 * A toggle switch control for binary state changes.
 *
 * **Visual Design:**
 * - Smooth animated transitions
 * - Theme-aware colors (unchecked: gray, checked: primary)
 * - Accessible with keyboard support
 * - Disabled state with reduced opacity
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Switch checked={enabled} onCheckedChange={setEnabled} />
 *
 * // Controlled with label
 * <label className="flex items-center gap-2">
 *   <Switch checked={darkMode} onCheckedChange={setDarkMode} />
 *   <span>Dark Mode</span>
 * </label>
 *
 * // Different sizes
 * <Switch size="sm" checked={value} onCheckedChange={setValue} />
 * <Switch size="lg" checked={value} onCheckedChange={setValue} />
 * ```
 */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(

  ({ checked = false, onCheckedChange, size = 'md', disabled = false, className = '', onClick, ...props }, ref) => {
    const sizes = {
      sm: {
        track: 'w-8 h-4',
        thumb: 'w-3 h-3',
        translate: 'translate-x-4',
      },
      md: {
        track: 'w-11 h-6',
        thumb: 'w-5 h-5',
        translate: 'translate-x-5',
      },
      lg: {
        track: 'w-14 h-7',
        thumb: 'w-6 h-6',
        translate: 'translate-x-7',
      },
    };

    const safeSize = (size && sizes[size]) ? size : 'md';
    const { track, thumb, translate } = sizes[safeSize];

    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        data-state={checked ? 'checked' : 'unchecked'}
        disabled={disabled}
        ref={ref}
        {...props}
        onClick={(e) => {
          onClick?.(e);
          if (!disabled) {
            onCheckedChange?.(!checked);
          }
        }}
        className={`
          relative inline-flex items-center
          ${track}
          rounded-full
          transition-colors duration-200 ease-in-out
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
          ${checked
            ? 'bg-[var(--color-primary)] focus-visible:ring-[var(--color-primary)]'
            : 'bg-[var(--color-border)] focus-visible:ring-[var(--color-border)]'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${className}
        `}
      >
        <span
          className={`
            ${thumb}
            rounded-full
            bg-white
            shadow-lg
            transform transition-transform duration-200 ease-in-out
            pointer-events-none
            ${checked ? translate : 'translate-x-0.5'}
          `}
        />
      </button>
    );
  }
);

Switch.displayName = 'Switch';
