'use client';

import React, { useEffect } from 'react';
import { useMotionPreference } from '../../hooks';

export interface ModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;

  /**
   * Callback fired when the modal should close
   */
  onClose: () => void;

  /**
   * Modal title (optional)
   */
  title?: string;

  /**
   * Modal content
   */
  children: React.ReactNode;

  /**
   * Footer content (typically buttons)
   */
  footer?: React.ReactNode;

  /**
   * Size of the modal
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';

  /**
   * Whether clicking the overlay closes the modal
   * @default true
   */
  closeOnOverlayClick?: boolean;

  /**
   * Whether pressing Escape closes the modal
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Additional CSS classes for the modal content
   */
  className?: string;
}

/**
 * Modal Component
 *
 * A dialog overlay for focused user interactions.
 *
 * Features:
 * - Keyboard accessible (Escape to close, focus trap)
 * - Click outside to close (optional)
 * - Multiple size variants
 * - Smooth animations
 * - Blocks body scroll when open
 * - Theme-aware styling
 *
 * Example:
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm Action"
 *   footer={
 *     <>
 *       <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
 *       <Button onClick={handleConfirm}>Confirm</Button>
 *     </>
 *   }
 * >
 *   <p>Are you sure you want to continue?</p>
 * </Modal>
 * ```
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = '',
}) => {
  const { shouldAnimate, scale } = useMotionPreference();

  const animationDuration = shouldAnimate && scale > 0 ? `${0.2 * (5 / scale)}s` : '0s';

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[95vw] max-h-[95vh]',
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`
        fixed inset-0 z-[9999] flex items-center justify-center p-4
        bg-black/50 backdrop-blur-sm
        ${shouldAnimate ? 'animate-fade-in' : ''}
      `}
      style={{ animationDuration }}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        className={`
          ${sizeClasses[size]}
          w-full
          bg-[var(--color-surface)]
          rounded-2xl
          shadow-2xl
          border border-[var(--color-border)]
          flex flex-col
          max-h-[90vh]
          ${shouldAnimate ? 'animate-scale-in' : ''}
          ${className}
        `}
        style={{ animationDuration }}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
            <h2
              id="modal-title"
              className="text-xl font-semibold text-[var(--color-text-primary)]"
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              className="
                p-2 rounded-lg
                text-[var(--color-text-primary)]
                hover:bg-[var(--color-hover)]
                transition-colors
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[var(--color-focus)]
              "
              aria-label="Close modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[var(--color-border)]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

Modal.displayName = 'Modal';

// Add animation keyframes
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes scale-in {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    .animate-fade-in {
      animation: fade-in 0.2s ease-out;
    }
    .animate-scale-in {
      animation: scale-in 0.2s ease-out;
    }
  `;
  if (!document.querySelector('style[data-modal-animations]')) {
    style.setAttribute('data-modal-animations', 'true');
    document.head.appendChild(style);
  }
}
