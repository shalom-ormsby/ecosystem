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
     * Top offset for sticky positioning
     * @default 'top-32 lg:top-36'
     */
    top?: string;
}

/**
 * Tertiary Navigation Component
 *
 * A sticky navigation bar designed to sit below SecondaryNav in a three-level sticky stack.
 * Commonly used for component selectors or sub-section navigation.
 *
 * **Triple-Stack Sticky Pattern**:
 * - Header: `top-0`, `z-50`, `h-16 lg:h-20`
 * - SecondaryNav: `top-16 lg:top-20`, `z-40`, `h-16`
 * - TertiaryNav: `top-32 lg:top-36`, `z-30`, `h-14`
 *
 * **Positioning Calculation**:
 * - Uses `top-32 lg:top-36` (128px / 144px)
 * - This equals Header height (64/80px) + SecondaryNav height (64px)
 * - Uses `z-30` to sit below SecondaryNav (`z-40`) and Header (`z-50`)
 *
 * **Visual Hierarchy**:
 * - Lighter background than SecondaryNav for depth perception
 * - Smaller text and padding for visual subordination
 * - Horizontal scrollable on all screen sizes
 *
 * **Accessibility**:
 * - Keyboard navigable buttons
 * - Clear focus states
 * - ARIA-compliant navigation
 *
 * Usage:
 * ```tsx
 * // Default (below SecondaryNav)
 * <TertiaryNav items={...} />
 * 
 * // Custom stickiness (e.g. top of viewport)
 * <TertiaryNav items={...} top="top-0" />
 * ```
 */
export const TertiaryNav = React.forwardRef<HTMLElement, TertiaryNavProps>(
    ({ items, activeId, onItemChange, top = 'top-32 lg:top-36', className = '' }, ref) => {
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
