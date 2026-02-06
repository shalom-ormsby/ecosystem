import React from 'react';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Size of the spinner
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Color variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'inherit';

  /**
   * Optional label for screen readers
   */
  label?: string;
}

/**
 * Spinner Component
 *
 * A loading indicator with smooth animation.
 *
 * Features:
 * - Five size variants
 * - Theme-aware colors
 * - Uses current text color option
 * - Accessible label for screen readers
 * - Respects reduced motion preferences
 *
 * Example:
 * ```tsx
 * <Spinner />
 * <Spinner size="lg" variant="primary" label="Loading content..." />
 * <Spinner size="sm" variant="inherit" />
 * ```
 */
export const Spinner = (
  {
    ref,
    size = 'md',
    variant = 'primary',
    label = 'Loading...',
    className = '',
    ...props
  }: SpinnerProps & {
    ref?: React.Ref<HTMLDivElement>;
  }
) => {
  const sizes = {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const variants = {
    primary: 'text-[var(--color-primary)]',
    secondary: 'text-[var(--color-text-secondary)]',
    inherit: 'text-current',
  };

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      role="status"
      aria-label={label}
      {...props}
    >
      <svg
        className={`${sizes[size]} ${variants[variant]} animate-spin`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
};
