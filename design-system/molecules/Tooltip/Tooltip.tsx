'use client';

import React, { useState } from 'react';
import { useMotionPreference } from '../../hooks';

export interface TooltipProps {
  /**
   * Tooltip content text
   */
  content: string;

  /**
   * Element that triggers the tooltip
   */
  children: React.ReactNode;

  /**
   * Tooltip position relative to trigger
   * @default 'top'
   */
  position?: 'top' | 'bottom' | 'left' | 'right';

  /**
   * Delay in milliseconds before showing tooltip
   * @default 200
   */
  delay?: number;

  /**
   * Additional CSS classes for the tooltip
   */
  className?: string;
}

/**
 * Tooltip Component
 *
 * A small popup that displays additional information on hover or focus.
 *
 * Features:
 * - Shows on hover and focus (keyboard accessible)
 * - Configurable delay
 * - Four position options
 * - Respects motion preferences
 * - Theme-aware styling
 * - Automatic positioning
 *
 * Example:
 * ```tsx
 * <Tooltip content="Click to save your changes" position="top">
 *   <Button>Save</Button>
 * </Tooltip>
 * ```
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 200,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);
  const { shouldAnimate } = useMotionPreference();

  const showTooltip = () => {
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-[var(--color-text-primary)]',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-[var(--color-text-primary)]',
    left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-[var(--color-text-primary)]',
    right: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-[var(--color-text-primary)]',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {isVisible && (
        <div
          id="tooltip"
          role="tooltip"
          className={`
            absolute ${positionClasses[position]}
            px-3 py-2
            bg-[var(--color-text-primary)]
            text-[var(--color-background)]
            text-xs
            rounded-lg
            whitespace-nowrap
            z-[9999]
            pointer-events-none
            ${shouldAnimate ? 'animate-tooltip-in' : ''}
            ${className}
          `}
        >
          {content}
          {/* Arrow */}
          <div
            className={`
              absolute
              w-0 h-0
              border-4
              ${arrowClasses[position]}
            `}
          />
        </div>
      )}
    </div>
  );
};

Tooltip.displayName = 'Tooltip';

// Add animation keyframes
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes tooltip-in {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    .animate-tooltip-in {
      animation: tooltip-in 0.15s ease-out;
    }
  `;
  if (!document.querySelector('style[data-tooltip-animations]')) {
    style.setAttribute('data-tooltip-animations', 'true');
    document.head.appendChild(style);
  }
}
