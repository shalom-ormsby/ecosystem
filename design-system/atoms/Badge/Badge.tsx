import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Badge content
   */
  children: React.ReactNode;

  /**
   * Visual variant of the badge
   * @default 'default'
   */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';

  /**
   * Size of the badge
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Whether the badge should have a dot indicator
   * @default false
   */
  dot?: boolean;
}

/**
 * Badge Component
 *
 * A small label for displaying status, counts, or categorization.
 *
 * Features:
 * - Six semantic variants
 * - Three size options
 * - Optional dot indicator
 * - Theme-aware colors
 * - Rounded corners for modern look
 *
 * Example:
 * ```tsx
 * <Badge variant="success">Active</Badge>
 * <Badge variant="error" size="sm">3</Badge>
 * <Badge variant="primary" dot>New</Badge>
 * ```
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = 'default', size = 'md', dot = false, className = '', ...props }, ref) => {
    const variants = {
      default: 'bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border)]',
      primary: 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]',
      success: 'bg-[var(--color-success)] text-[var(--color-success-foreground)]',
      warning: 'bg-[var(--color-warning)] text-[var(--color-warning-foreground)]',
      error: 'bg-[var(--color-error)] text-[var(--color-error-foreground)]',
      info: 'bg-[var(--color-info)] text-[var(--color-info-foreground)]',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base',
    };

    const dotSizes = {
      sm: 'w-1.5 h-1.5',
      md: 'w-2 h-2',
      lg: 'w-2.5 h-2.5',
    };

    return (
      <span
        ref={ref}
        className={`
          inline-flex items-center gap-1.5
          font-medium rounded-full
          ${variants[variant]}
          ${sizes[size]}
          ${className}
        `}
        {...props}
      >
        {dot && (
          <span
            className={`
              ${dotSizes[size]}
              rounded-full
              bg-current
              animate-pulse
            `}
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
