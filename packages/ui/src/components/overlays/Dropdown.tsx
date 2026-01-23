'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useMotionPreference } from '../../hooks';

export interface DropdownItem {
  label: string;
  value: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  divider?: boolean;
}

export interface DropdownProps {
  /**
   * Trigger element (button, link, etc.)
   */
  trigger: React.ReactNode;

  /**
   * Dropdown menu items
   */
  items: DropdownItem[];

  /**
   * Callback when an item is selected
   */
  onSelect?: (value: string) => void;

  /**
   * Dropdown alignment relative to trigger
   * @default 'left'
   */
  align?: 'left' | 'right' | 'center';

  /**
   * Additional CSS classes for the dropdown menu
   */
  className?: string;
}

/**
 * Dropdown Component
 *
 * A menu that appears when clicking a trigger element.
 *
 * Features:
 * - Click outside to close
 * - Keyboard navigation (Arrow keys, Enter, Escape)
 * - Flexible trigger element
 * - Optional icons
 * - Dividers between items
 * - Theme-aware styling
 * - Smooth animations
 *
 * Example:
 * ```tsx
 * <Dropdown
 *   trigger={<Button>Actions</Button>}
 *   items={[
 *     { label: 'Edit', value: 'edit', icon: <EditIcon /> },
 *     { label: 'Delete', value: 'delete', icon: <DeleteIcon /> },
 *     { label: 'Divider', value: 'div', divider: true },
 *     { label: 'Archive', value: 'archive' },
 *   ]}
 *   onSelect={(value) => handleAction(value)}
 * />
 * ```
 */
export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  onSelect,
  align = 'left',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate, scale } = useMotionPreference();

  const animationDuration = shouldAnimate && scale > 0 ? `${0.15 * (5 / scale)}s` : '0s';

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const selectableItems = items.filter((item) => !item.disabled && !item.divider);

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = prev + 1;
            return next >= selectableItems.length ? 0 : next;
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = prev - 1;
            return next < 0 ? selectableItems.length - 1 : next;
          });
          break;
        case 'Enter':
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < selectableItems.length) {
            const item = selectableItems[focusedIndex];
            onSelect?.(item.value);
            setIsOpen(false);
            setFocusedIndex(-1);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, focusedIndex, items, onSelect]);

  const handleItemClick = (item: DropdownItem) => {
    if (item.disabled || item.divider) return;
    onSelect?.(item.value);
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const alignClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  };

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <div onClick={() => setIsOpen(!isOpen)} role="button" tabIndex={0}>
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`
            absolute top-full mt-2 ${alignClasses[align]}
            min-w-[200px]
            bg-[var(--color-background)]/80
            backdrop-blur-md
            border border-[var(--color-border)]
            rounded-lg
            shadow-lg
            py-2
            z-50
            ${shouldAnimate ? 'animate-dropdown-in' : ''}
            ${className}
          `}
          style={{ animationDuration }}
          role="menu"
          aria-orientation="vertical"
        >
          {items.map((item, index) => {
            if (item.divider) {
              return (
                <div
                  key={`divider-${index}`}
                  className="my-2 border-t border-[var(--color-border)]"
                  role="separator"
                />
              );
            }

            const selectableItems = items.filter((i) => !i.disabled && !i.divider);
            const selectableIndex = selectableItems.indexOf(item);
            const isFocused = selectableIndex === focusedIndex;

            return (
              <button
                key={item.value}
                onClick={() => handleItemClick(item)}
                disabled={item.disabled}
                className={`
                  w-full flex items-center gap-3 px-4 py-2 text-sm
                  text-left transition-colors
                  ${item.disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : `
                        text-[var(--color-text-primary)]
                        hover:bg-[var(--color-hover)]
                        ${isFocused ? 'bg-[var(--color-hover)]' : ''}
                      `
                  }
                `}
                role="menuitem"
                tabIndex={-1}
              >
                {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                <span className="flex-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

Dropdown.displayName = 'Dropdown';

// Add animation keyframes
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes dropdown-in {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-dropdown-in {
      animation: dropdown-in 0.15s ease-out;
    }
  `;
  if (!document.querySelector('style[data-dropdown-animations]')) {
    style.setAttribute('data-dropdown-animations', 'true');
    document.head.appendChild(style);
  }
}
