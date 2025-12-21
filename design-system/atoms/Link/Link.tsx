import React from 'react';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode;
    /**
     * Whether to apply background highlight on hover.
     * Uses theme-aware colors from CSS variables.
     * @default true
     */
    hoverEffect?: boolean;
}

/**
 * Link Component
 *
 * A theme-aware link with background highlight hover effect.
 *
 * Features:
 * - Background changes to --color-link-hover on hover
 * - Text changes to --color-link-hover-foreground on hover
 * - Smooth transition respecting motion preferences
 * - Accessible focus states
 * - Works with Next.js Link or standard anchor tags
 *
 * Usage:
 * ```tsx
 * <Link href="/about">About</Link>
 * <Link href="https://example.com" target="_blank">External</Link>
 * ```
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
    ({ children, className = '', hoverEffect = true, ...props }, ref) => {
        return (
            <a
                ref={ref}
                className={`
          px-2 py-1 -mx-2 -my-1 rounded
          transition-all duration-200
          ${hoverEffect ? 'hover:bg-[var(--color-link-hover)] hover:text-[var(--color-link-hover-foreground)]' : ''}
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2
          ${className}
        `}
                {...props}
            >
                {children}
            </a>
        );
    }
);

Link.displayName = 'Link';
