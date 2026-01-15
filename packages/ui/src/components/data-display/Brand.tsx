import React from 'react';

export interface BrandProps {
  /**
   * Brand name or logo element
   */
  children: React.ReactNode;

  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Optional href for link behavior
   * When provided, renders as an anchor tag
   */
  href?: string;

  /**
   * Additional className for customization
   */
  className?: string;

  /**
   * Click handler (used when href is provided)
   */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * Brand Component
 *
 * A theme-aware brand/logo component that automatically handles:
 * - Dark mode support via design system tokens
 * - Consistent typography and sizing
 * - Optional link behavior
 * - Focus states and accessibility
 *
 * This component encapsulates the proper styling so you never need to
 * manually apply `text-[var(--color-text-primary)]` to logos.
 *
 * Features:
 * - Automatic theme-aware text color
 * - Three size variants (sm, md, lg)
 * - Works standalone or as a link
 * - Compatible with Next.js Link wrapper
 * - Proper focus states
 *
 * Usage:
 * ```tsx
 * // Standalone brand text
 * <Brand>Company Name</Brand>
 *
 * // As a link (use with Next.js Link)
 * <Brand href="/">Company Name</Brand>
 *
 * // With Next.js Link wrapper
 * <Brand>
 *   <NextLink href="/">Company Name</NextLink>
 * </Brand>
 *
 * // Different sizes
 * <Brand size="sm">Brand</Brand>
 * <Brand size="lg">Brand</Brand>
 * ```
 */
export const Brand = React.forwardRef<HTMLElement, BrandProps>(
  ({ children, size = 'md', href, className = '', onClick }, ref) => {
    // Size mappings following Swiss Grid typography scale
    const sizeStyles = {
      sm: 'text-base',      // 16px
      md: 'text-lg',        // 18px
      lg: 'text-2xl',       // 24px
    };

    // Base styles with design system tokens
    const baseStyles = `
      font-bold
      text-[var(--color-text-primary)]
      transition-colors duration-200
      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-[var(--color-focus)]
      focus-visible:ring-offset-2
      ${sizeStyles[size]}
    `;

    // If href is provided, render as link
    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          onClick={onClick}
          className={`${baseStyles} hover:opacity-80 ${className}`}
        >
          {children}
        </a>
      );
    }

    // Otherwise render as span
    return (
      <span
        ref={ref as React.Ref<HTMLSpanElement>}
        className={`${baseStyles} ${className}`}
      >
        {children}
      </span>
    );
  }
);

Brand.displayName = 'Brand';
