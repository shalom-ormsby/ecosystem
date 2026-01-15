'use client';

import React from 'react';

// Legacy BreadcrumbItemLegacy interface (kept separate from shadcn Breadcrumb)
export interface BreadcrumbItemLegacy {
  /**
   * Display text for the breadcrumb
   */
  label: string;

  /**
   * Navigation URL (href for anchor tags)
   * Omit for current/last item (will render as plain text)
   */
  href?: string;

  /**
   * Optional icon to display before the label
   */
  icon?: React.ReactNode;
}

export interface BreadcrumbsProps {
  /**
   * Array of breadcrumb items (hierarchy from root to current)
   */
  items: BreadcrumbItemLegacy[];

  /**
   * Visual style variant
   * @default 'subtle'
   */
  variant?: 'subtle' | 'bold' | 'underline';

  /**
   * Custom separator between items
   * @default '/'
   */
  separator?: React.ReactNode;

  /**
   * ARIA label for the navigation
   * @default 'Breadcrumb'
   */
  ariaLabel?: string;

  /**
   * Additional CSS classes for customization
   */
  className?: string;

  /**
   * Callback fired when a breadcrumb link is clicked
   */
  onNavigate?: (item: BreadcrumbItemLegacy, index: number) => void;
}

/**
 * Breadcrumbs Component
 *
 * A navigation component showing page hierarchy with clickable links.
 *
 * Features:
 * - Three visual variants (subtle, bold, underline)
 * - Customizable separators
 * - Full ARIA accessibility
 * - Theme-aware styling
 * - Keyboard navigable
 * - Current page indication
 *
 * Example:
 * ```tsx
 * <Breadcrumbs
 *   variant="subtle"
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Products', href: '/products' },
 *     { label: 'Laptop' }, // Current page (no href)
 *   ]}
 * />
 * ```
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  variant = 'subtle',
  separator = '/',
  ariaLabel = 'Breadcrumb',
  className = '',
  onNavigate,
}) => {
  // Return null if no items
  if (!items || items.length === 0) {
    return null;
  }

  // Truncate items for long paths: show first item + ... + last 2 items
  const getDisplayItems = () => {
    if (items.length <= 3) {
      return items;
    }

    // For long paths: [first, ..., second-to-last, last]
    return [
      items[0],
      { label: '...', href: undefined } as BreadcrumbItemLegacy, // Ellipsis
      items[items.length - 2],
      items[items.length - 1],
    ];
  };

  const displayItems = getDisplayItems();

  // Get variant-specific styles
  const getVariantStyles = (isLink: boolean, isCurrent: boolean) => {
    const baseStyles = 'text-sm transition-all duration-200';

    if (variant === 'subtle') {
      if (isCurrent) {
        return `${baseStyles} text-[var(--color-text-muted)] font-medium`;
      }
      if (isLink) {
        return `${baseStyles} text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-hover)] px-1.5 py-1.5 -mx-1.5 -my-1.5 rounded`;
      }
    }

    if (variant === 'bold') {
      if (isCurrent) {
        return `${baseStyles} text-[var(--color-text-primary)] font-semibold`;
      }
      if (isLink) {
        return `${baseStyles} text-[var(--color-primary)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-background)] font-medium px-1.5 py-1.5 -mx-1.5 -my-1.5 rounded`;
      }
    }

    if (variant === 'underline') {
      if (isCurrent) {
        return `${baseStyles} text-[var(--color-text-primary)] font-medium`;
      }
      if (isLink) {
        return `${baseStyles} text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] underline-offset-2 hover:underline decoration-[var(--color-primary)]/40 hover:decoration-[var(--color-primary)] decoration-1 hover:decoration-2 px-1.5 py-1.5 -mx-1.5 -my-1.5`;
      }
    }

    return baseStyles;
  };

  const getLinkStyles = () => {
    return `
      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-[var(--color-focus)]
      focus-visible:ring-offset-2
      active:scale-95
      cursor-pointer
    `;
  };

  const getSeparatorStyles = () => {
    const baseStyles = 'mx-2 select-none';

    if (variant === 'subtle') {
      return `${baseStyles} text-[var(--color-text-muted)]`;
    }
    if (variant === 'bold') {
      return `${baseStyles} text-[var(--color-border)] font-bold`;
    }
    if (variant === 'underline') {
      return `${baseStyles} text-[var(--color-text-muted)]`;
    }

    return baseStyles;
  };

  return (
    <nav aria-label={ariaLabel} className={className}>
      <ol className="flex items-center flex-nowrap list-none m-0 p-0 overflow-x-auto scrollbar-hide">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isEllipsis = item.label === '...';
          const isInteractive = item.href && !isLast && !isEllipsis;

          return (
            <li key={index} className="flex items-center flex-shrink-0">
              {isInteractive ? (
                <a
                  href={item.href}
                  onClick={(e) => {
                    if (onNavigate) {
                      onNavigate(item, index);
                    }
                  }}
                  className={`${getVariantStyles(true, false)} ${getLinkStyles()}`}
                >
                  {item.icon && <span className="inline-flex mr-1.5">{item.icon}</span>}
                  {item.label}
                </a>
              ) : (
                <span
                  className={isEllipsis ? 'text-sm text-[var(--color-text-muted)] px-1' : getVariantStyles(false, isLast)}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.icon && <span className="inline-flex mr-1.5">{item.icon}</span>}
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span aria-hidden="true" className={getSeparatorStyles()}>
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumbs.displayName = 'Breadcrumbs';
