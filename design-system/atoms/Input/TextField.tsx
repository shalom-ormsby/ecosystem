import React, { forwardRef } from 'react';

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Visual variant of the text field
   * @default 'outlined'
   */
  variant?: 'outlined' | 'filled';

  /**
   * Size of the text field
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Error state
   * @default false
   */
  error?: boolean;

  /**
   * Helper text displayed below the input
   */
  helperText?: string;

  /**
   * Label for the input
   */
  label?: string;

  /**
   * Whether the field is required
   * @default false
   */
  required?: boolean;
}

/**
 * TextField Component
 *
 * A text input field with support for outlined and filled variants,
 * multiple sizes, error states, and helper text.
 *
 * Features:
 * - Two visual variants (outlined, filled)
 * - Three size options (sm, md, lg)
 * - Error state with red border
 * - Optional label and helper text
 * - Theme-aware colors using CSS variables
 * - Full keyboard accessibility
 * - Ref forwarding support
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      variant = 'outlined',
      size = 'md',
      error = false,
      helperText,
      label,
      required = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const inputId = id || `textfield-${Math.random().toString(36).substr(2, 9)}`;
    const helperTextId = helperText ? `${inputId}-helper` : undefined;

    // Size classes
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-3 text-lg',
    };

    // Variant classes
    const variantClasses = {
      outlined: `
        bg-[var(--color-surface)]
        border-2
        ${error ? 'border-[var(--color-error)]' : 'border-[var(--color-border)]'}
        focus:border-[var(--color-primary)]
      `,
      filled: `
        bg-[var(--color-surface)]
        border-2 border-transparent
        ${error ? 'border-[var(--color-error)]' : ''}
        focus:border-[var(--color-primary)]
      `,
    };

    const baseClasses = `
      w-full
      rounded-lg
      text-[var(--color-text-primary)]
      placeholder:text-[var(--color-text-muted)]
      transition-colors
      duration-200
      focus:outline-none
      focus:ring-2
      focus:ring-[var(--color-focus)]
      focus:ring-opacity-50
      disabled:opacity-50
      disabled:cursor-not-allowed
    `;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block mb-2 text-sm font-medium text-[var(--color-text-primary)]"
          >
            {label}
            {required && <span className="text-[var(--color-error)] ml-1">*</span>}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          aria-describedby={helperTextId}
          aria-invalid={error}
          aria-required={required}
          className={`
            ${baseClasses}
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            ${className}
          `}
          {...props}
        />

        {helperText && (
          <p
            id={helperTextId}
            className={`
              mt-2 text-sm
              ${error ? 'text-[var(--color-error)]' : 'text-[var(--color-text-secondary)]'}
            `}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';
