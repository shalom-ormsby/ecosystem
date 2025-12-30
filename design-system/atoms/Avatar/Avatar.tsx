'use client';

import React, { useState } from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Image URL for the avatar
   */
  src?: string;

  /**
   * Alt text for the image
   */
  alt?: string;

  /**
   * Fallback text (initials) if image fails or is not provided
   */
  fallback?: string;

  /**
   * Size of the avatar
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Shape of the avatar
   * @default 'circle'
   */
  shape?: 'circle' | 'square';

  /**
   * Optional status indicator
   */
  status?: 'online' | 'offline' | 'away' | 'busy';
}

/**
 * Avatar Component
 *
 * A visual representation of a user or entity.
 *
 * Features:
 * - Image with automatic fallback to initials
 * - Five size variants
 * - Circle or square shape
 * - Optional status indicator
 * - Theme-aware colors
 * - Accessible alt text
 *
 * Example:
 * ```tsx
 * <Avatar src="/user.jpg" alt="John Doe" fallback="JD" />
 * <Avatar fallback="AB" size="lg" status="online" />
 * <Avatar src="/logo.png" shape="square" />
 * ```
 */
export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = '',
      fallback = '?',
      size = 'md',
      shape = 'circle',
      status,
      className = '',
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = useState(false);

    const sizes = {
      xs: 'w-6 h-6 text-xs',
      sm: 'w-8 h-8 text-sm',
      md: 'w-10 h-10 text-base',
      lg: 'w-12 h-12 text-lg',
      xl: 'w-16 h-16 text-xl',
    };

    const shapes = {
      circle: 'rounded-full',
      square: 'rounded-lg',
    };

    const statusColors = {
      online: 'bg-[var(--color-success)]',
      offline: 'bg-[var(--color-text-secondary)]',
      away: 'bg-[var(--color-warning)]',
      busy: 'bg-[var(--color-error)]',
    };

    const statusSizes = {
      xs: 'w-1.5 h-1.5',
      sm: 'w-2 h-2',
      md: 'w-2.5 h-2.5',
      lg: 'w-3 h-3',
      xl: 'w-4 h-4',
    };

    const showImage = src && !imageError;

    return (
      <div ref={ref} className={`relative inline-block ${className}`} {...props}>
        <div
          className={`
            ${sizes[size]}
            ${shapes[shape]}
            flex items-center justify-center
            overflow-hidden
            bg-[var(--color-surface)]
            border-2 border-[var(--color-border)]
            ${!showImage ? 'text-[var(--color-text-primary)] font-semibold' : ''}
          `}
        >
          {showImage ? (
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <span>{fallback}</span>
          )}
        </div>

        {/* Status Indicator */}
        {status && (
          <span
            className={`
              absolute bottom-0 right-0
              ${statusSizes[size]}
              ${statusColors[status]}
              ${shapes[shape]}
              border-2 border-[var(--color-background)]
            `}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
