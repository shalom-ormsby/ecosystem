'use client';

import React from 'react';
import { Button } from '../../atoms';

export interface SecondaryNavItem {
    id: string;
    label: string;
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
     * Top offset for sticky positioning
     * @default 'top-16 lg:top-20'
     */
    top?: string;
}

/**
 * Secondary Navigation Component
 *
 * A sticky navigation bar designed to sit below a primary sticky header.
 * Commonly used for section/tab navigation within a page.
 *
 * **Sticky Positioning Pattern**:
 * - Uses `top-16 lg:top-20` to position below the Header (which has `h-16 lg:h-20`)
 * - Uses `z-40` to sit below the Header (`z-50`) but above page content
 * - Glass morphism effect with backdrop blur for visual hierarchy
 *
 * **Responsive Behavior**:
 * - Horizontal scrollable on mobile
 * - Maintains sticky position on all screen sizes
 *
 * **Accessibility**:
 * - Keyboard navigable buttons
 * - Clear focus states
 * - ARIA-compliant navigation
 *
 * Usage:
 * ```tsx
 * // Default (below header)
 * <SecondaryNav items={...} />
 * 
 * // Custom stickiness (e.g. top of page)
 * <SecondaryNav items={...} top="top-0" />
 * ```
 */
export const SecondaryNav = React.forwardRef<HTMLElement, SecondaryNavProps>(
    ({ items, activeId, onItemChange, maxWidth = 'max-w-7xl', top = 'top-16 lg:top-20', className = '' }, ref) => {
        return (
            <nav
                ref={ref}
                className={`
                    sticky ${top} z-40
                    bg-[var(--color-surface)]/60 backdrop-blur-md
                    border-b border-[var(--color-border)]
                    ${className}
                `}
                aria-label="Secondary navigation"
            >
                <div className={`${maxWidth} mx-auto px-4 sm:px-6 lg:px-8`}>
                    <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
                        {items.map((item) => (
                            <Button
                                key={item.id}
                                onClick={() => onItemChange(item.id)}
                                variant={activeId === item.id ? 'primary' : 'ghost'}
                                size="sm"
                                className={`whitespace-nowrap ${activeId !== item.id ? 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]' : ''
                                    }`}
                                aria-current={activeId === item.id ? 'page' : undefined}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </nav>
        );
    }
);

SecondaryNav.displayName = 'SecondaryNav';
