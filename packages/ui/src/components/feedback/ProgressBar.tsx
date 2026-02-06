import React from 'react';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Progress value (0-100)
   */
  value: number;

  /**
   * Maximum value
   * @default 100
   */
  max?: number;

  /**
   * Size of the progress bar
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Color variant
   * @default 'primary'
   */
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';

  /**
   * Whether to show the percentage label
   * @default false
   */
  showLabel?: boolean;

  /**
   * Whether to animate the progress bar
   * @default true
   */
  animated?: boolean;

  /**
   * Indeterminate state (ignores value)
   * @default false
   */
  indeterminate?: boolean;
}

/**
 * ProgressBar Component
 *
 * A visual indicator of progress or completion.
 *
 * Features:
 * - Determinate and indeterminate modes
 * - Five color variants
 * - Three size options
 * - Optional percentage label
 * - Smooth animations
 * - Theme-aware colors
 * - Accessible ARIA attributes
 *
 * Example:
 * ```tsx
 * <ProgressBar value={65} showLabel />
 * <ProgressBar value={100} variant="success" />
 * <ProgressBar indeterminate variant="primary" />
 * ```
 */
export const ProgressBar = (
  {
    ref,
    value,
    max = 100,
    size = 'md',
    variant = 'primary',
    showLabel = false,
    animated = true,
    indeterminate = false,
    className = '',
    ...props
  }: ProgressBarProps & {
    ref?: React.Ref<HTMLDivElement>;
  }
) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const variants = {
    primary: 'bg-[var(--color-primary)]',
    success: 'bg-[var(--color-success)]',
    warning: 'bg-[var(--color-warning)]',
    error: 'bg-[var(--color-error)]',
    info: 'bg-[var(--color-info)]',
  };

  return (
    <div ref={ref} className={`w-full ${className}`} {...props}>
      {showLabel && !indeterminate && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-[var(--color-text-primary)]">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div
        className={`
          w-full ${sizes[size]}
          bg-[var(--color-surface)]
          rounded-full
          overflow-hidden
          border border-[var(--color-border)]
        `}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={indeterminate ? 'Loading' : `${Math.round(percentage)}% complete`}
      >
        <div
          className={`
            h-full
            ${variants[variant]}
            ${animated ? 'transition-all duration-300 ease-out' : ''}
            ${indeterminate ? 'animate-progress-indeterminate w-1/3' : ''}
          `}
          style={{
            width: indeterminate ? undefined : `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
};

// Add indeterminate animation
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes progress-indeterminate {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(400%);
      }
    }
    .animate-progress-indeterminate {
      animation: progress-indeterminate 1.5s ease-in-out infinite;
    }
  `;
  if (!document.querySelector('style[data-progress-animations]')) {
    style.setAttribute('data-progress-animations', 'true');
    document.head.appendChild(style);
  }
}
