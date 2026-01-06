'use client';

import React from 'react';
import { FilterButton } from '../../atoms';

export interface TertiaryNavItem {
    id: string;
    label: string;
}

export interface TertiaryNavProps {
    /**
     * Array of navigation items
     */
    items: TertiaryNavItem[];
    /**
     * Currently active item ID
     */
    activeId: string;
    /**
     * Callback when an item is selected
     */
    onItemChange: (id: string) => void;
    /**
     * Additional className for customization
     */
    className?: string;
    /**
     * Sticky behavior mode
     * - 'stacked': Positions automatically below SecondaryNav (default)
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
 * Tertiary Navigation Component
 * ... (keep existing comment block) ...
 */
export const TertiaryNav = React.forwardRef<HTMLElement, TertiaryNavProps>(
    ({ items, activeId, onItemChange, mode = 'stacked', top, className = '' }, ref) => {
        // Determine sticky position based on mode, unless manually overridden
        const stickyClass = top || (mode === 'stacked' ? 'top-32 lg:top-36' : 'top-0');

        return (
            <nav
                ref={ref}
                className={`
                    sticky ${top} z-30
                    bg-[var(--color-surface)]/60 backdrop-blur-md
                    border-b border-[var(--color-border)]
                    ${className}
                `}
                aria-label="Tertiary navigation"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
                        {items.map((item) => (
                            <FilterButton
                                key={item.id}
                                onClick={() => onItemChange(item.id)}
                                active={activeId === item.id}
                                shape="rounded"
                                aria-current={activeId === item.id ? 'page' : undefined}
                                className="whitespace-nowrap"
                            >
                                {item.label}
                            </FilterButton>
                        ))}
                    </div>
                </div>
            </nav>
        );
    }
);

TertiaryNav.displayName = 'TertiaryNav';
