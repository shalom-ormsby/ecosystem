'use client';;
import React from 'react';
import { Button } from '../actions/Button';

export interface SecondaryNavItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
}

export interface SecondaryNavProps {
    /**
     * Array of navigation items
     */
    items: SecondaryNavItem[];
    /**
     * Currently active item ID
     */
    activeId: string;
    /**
     * Callback when an item is selected
     */
    onItemChange: (id: string) => void;
    /**
     * Maximum width for content container (should match page variant)
     * @default 'max-w-7xl'
     */
    maxWidth?: 'max-w-7xl' | 'max-w-[1440px]' | 'max-w-4xl';
    /**
     * Additional className for customization
     */
    className?: string;
    /**
     * Sticky behavior mode
     * - 'stacked': Positions automatically below Header (default)
     * - 'standalone': Sticks to top of viewport (0px)
     * @default 'stacked'
     */
    mode?: 'stacked' | 'standalone';
    /**
     * Top offset for sticky positioning.
     * Overrides 'mode' if provided.
     */
    top?: string;
}

/**
 * Secondary Navigation Component
 * ... (keep existing comment block) ...
 */
export const SecondaryNav = (
    {
        ref,
        items,
        activeId,
        onItemChange,
        maxWidth = 'max-w-7xl',
        mode = 'stacked',
        top,
        className = ''
    }: SecondaryNavProps & {
        ref?: React.Ref<HTMLElement>;
    }
) => {
    // Determine sticky position based on mode, unless manually overridden
    const stickyClass = top || (mode === 'stacked' ? 'top-16 lg:top-20' : 'top-0');

    return (
        <nav
            ref={ref}
            className={`
                sticky ${stickyClass} z-40
                bg-[var(--color-surface)]/60 backdrop-blur-md
                border-b border-[var(--color-border)]
                -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8
                ${className}
            `}
            aria-label="Secondary navigation"
        >
            <div className={`${maxWidth} mx-auto px-4 sm:px-6 lg:px-8`}>
                <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
                    {items.map((item) => (
                        <Button
                            key={item.id}
                            onClick={() => onItemChange(item.id)}
                            variant={activeId === item.id ? 'default' : 'ghost'}
                            size="sm"
                            className={`whitespace-nowrap ${activeId !== item.id ? 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]' : ''
                                }`}
                            aria-current={activeId === item.id ? 'page' : undefined}
                        >
                            {item.icon && <span className="mr-2 flex items-center">{item.icon}</span>}
                            {item.label}
                        </Button>
                    ))}
                </div>
            </div>
        </nav>
    );
};
