import React from 'react';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode;
    /**
     * Visual style variant for the link
     * @default 'default'
     */
    variant?: 'default' | 'inline';
    /**
     * Whether to apply hover effect (only for 'default' variant).
     * @default true
     */
    hoverEffect?: boolean;
}

/**
 * Link Component
 *
 * A theme-aware link with multiple style variants.
 *
 * Variants:
 * - **default**: Background highlight on hover, good for standalone links
 * - **inline**: Underlined text link, good for inline links within paragraphs
 *
 * Features:
 * - Theme-aware colors using CSS variables
 * - Smooth transition respecting motion preferences
 * - Accessible focus states
 * - Works with Next.js Link or standard anchor tags
 *
 * Usage:
 * ```tsx
 * <Link href="/about">About</Link>
 * <Link variant="inline" href="/contact">Contact</Link>
 * <Link href="https://example.com" target="_blank">External</Link>
 * ```
 */
export const Link = (
    {
        ref,
        children,
        className = '',
        variant = 'default',
        hoverEffect = true,
        ...props
    }: LinkProps & {
        ref?: React.Ref<HTMLAnchorElement>;
    }
) => {
    const variantStyles = {
        default: `
            px-2 py-1 -mx-2 -my-1 rounded
            text-[var(--color-text-primary)]
            ${hoverEffect ? 'hover:bg-[var(--color-link-hover)] hover:text-[var(--color-link-hover-foreground)]' : ''}
        `,
        inline: `
            text-[var(--color-primary)]
            underline decoration-[var(--color-primary)]/40 decoration-1 underline-offset-2
            hover:decoration-[var(--color-primary)] hover:decoration-2
        `,
    };

    return (
        <a
            ref={ref}
            className={`
                transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2
                ${variantStyles[variant]}
                ${className}
            `}
            {...props}
        >
            {children}
        </a>
    );
};
