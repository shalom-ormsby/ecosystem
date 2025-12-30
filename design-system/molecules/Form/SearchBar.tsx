import React, { useState, useCallback, useEffect, forwardRef } from 'react';
import { TextField, type TextFieldProps } from '../../atoms/Input/TextField';

export interface SearchBarProps extends Omit<TextFieldProps, 'variant'> {
  /**
   * Callback fired when search value changes (after debounce)
   */
  onSearch?: (value: string) => void;

  /**
   * Debounce delay in milliseconds
   * @default 300
   */
  debounceMs?: number;

  /**
   * Show clear button when input has value
   * @default true
   */
  showClearButton?: boolean;

  /**
   * Callback fired when clear button is clicked
   */
  onClear?: () => void;
}

/**
 * SearchBar Component
 *
 * A specialized text field for search functionality with built-in
 * search icon, optional clear button, and debounced onChange.
 *
 * **Note:** SearchBar always uses the `outlined` variant and does not
 * accept a variant prop. This ensures consistent search field styling.
 *
 * Features:
 * - Search icon on the left
 * - Optional clear button (X) on the right
 * - Debounced search callback to reduce API calls
 * - All TextField features (sizes, error states, etc.)
 * - Theme-aware colors
 * - Keyboard accessible (Escape to clear)
 *
 * Example:
 * ```tsx
 * <SearchBar
 *   placeholder="Search products..."
 *   onSearch={(query) => fetchResults(query)}
 *   debounceMs={500}
 * />
 * ```
 */
export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      onSearch,
      debounceMs = 300,
      showClearButton = true,
      onClear,
      value: controlledValue,
      onChange,
      placeholder = 'Search...',
      className = '',
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(controlledValue || '');

    // Update internal value when controlled value changes
    useEffect(() => {
      if (controlledValue !== undefined) {
        setInternalValue(controlledValue);
      }
    }, [controlledValue]);

    // Debounced search callback
    useEffect(() => {
      if (!onSearch) return;

      const timer = setTimeout(() => {
        onSearch(String(internalValue));
      }, debounceMs);

      return () => clearTimeout(timer);
    }, [internalValue, debounceMs, onSearch]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInternalValue(newValue);
        onChange?.(e);
      },
      [onChange]
    );

    const handleClear = useCallback(() => {
      setInternalValue('');
      onClear?.();
      // Create synthetic event for controlled components
      if (onChange) {
        const syntheticEvent = {
          target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
    }, [onChange, onClear]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape' && internalValue) {
          handleClear();
        }
        props.onKeyDown?.(e);
      },
      [internalValue, handleClear, props]
    );

    const value = controlledValue !== undefined ? controlledValue : internalValue;
    const showClear = showClearButton && value;

    return (
      <div className={`relative w-full ${className}`}>
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[var(--color-text-muted)]"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>

        <TextField
          ref={ref}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          variant="outlined"
          className="pl-10"
          style={{ paddingRight: showClear ? '2.5rem' : undefined }}
          {...props}
        />

        {/* Clear Button */}
        {showClear && (
          <button
            type="button"
            onClick={handleClear}
            className="
              absolute right-3 top-1/2 -translate-y-1/2
              p-1 rounded-full
              text-[var(--color-text-muted)]
              hover:text-[var(--color-text-primary)]
              hover:bg-[var(--color-hover)]
              transition-colors
              focus:outline-none
              focus:ring-2
              focus:ring-[var(--color-focus)]
              focus:ring-opacity-50
            "
            aria-label="Clear search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';
