'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useMotionPreference } from '../../../hooks/useMotionPreference';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export interface ToastProviderProps {
  children: React.ReactNode;
  /**
   * Maximum number of toasts to show at once
   * @default 3
   */
  maxToasts?: number;
  /**
   * Default duration in milliseconds
   * @default 5000
   */
  defaultDuration?: number;
  /**
   * Position of toast container
   * @default 'bottom-right'
   */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
}

/**
 * ToastProvider Component
 *
 * Provides toast notification functionality to the app.
 * Wrap your app with this provider to enable toast notifications.
 *
 * Example:
 * ```tsx
 * <ToastProvider position="bottom-right" maxToasts={3}>
 *   <App />
 * </ToastProvider>
 * ```
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  maxToasts = 3,
  defaultDuration = 5000,
  position = 'bottom-right',
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const { shouldAnimate } = useMotionPreference();

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  // Inject animation styles
  useEffect(() => {
    if (typeof document !== 'undefined' && !document.getElementById('sds-toast-animations')) {
      const style = document.createElement('style');
      style.id = 'sds-toast-animations';
      style.textContent = `
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastType = 'info', duration = defaultDuration) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: Toast = { id, message, type, duration };

      setToasts((prev) => {
        const updated = [...prev, newToast];
        return updated.slice(-maxToasts);
      });

      if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }
    },
    [defaultDuration, maxToasts, removeToast]
  );

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div
        className={`fixed ${positionClasses[position]} z-[9999] flex flex-col gap-2 pointer-events-none`}
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
            shouldAnimate={shouldAnimate}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
  shouldAnimate: boolean;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose, shouldAnimate }) => {
  const typeStyles = {
    success: 'bg-[var(--color-success)] text-[var(--color-success-foreground)] border-[var(--color-success)]',
    error: 'bg-[var(--color-error)] text-[var(--color-error-foreground)] border-[var(--color-error)]',
    warning: 'bg-[var(--color-warning)] text-[var(--color-warning-foreground)] border-[var(--color-warning)]',
    info: 'bg-[var(--color-info)] text-[var(--color-info-foreground)] border-[var(--color-info)]',
  };

  const icons = {
    success: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    error: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
    warning: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    info: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  };

  return (
    <div
      className={`
        ${typeStyles[toast.type]}
        flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border-2
        min-w-[300px] max-w-[400px] pointer-events-auto
        ${shouldAnimate ? 'animate-slide-in-right' : ''}
      `}
      role="alert"
    >
      <div className="flex-shrink-0" aria-hidden="true">
        {icons[toast.type]}
      </div>
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 text-current hover:opacity-70 transition-opacity"
        aria-label="Close notification"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
};

/**
 * useToast Hook
 *
 * Hook to trigger toast notifications from anywhere in your app.
 *
 * Example:
 * ```tsx
 * function MyComponent() {
 *   const { toast } = useToast();
 *
 *   const handleClick = () => {
 *     toast('Settings saved!', 'success');
 *   };
 *
 *   return <button onClick={handleClick}>Save</button>;
 * }
 * ```
 */
export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return {
    toast: context.addToast,
    removeToast: context.removeToast,
    toasts: context.toasts,
  };
};


