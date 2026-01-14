'use client';

import * as React from 'react';
import { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

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

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
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
        className={cn(
          "fixed z-[9999] flex flex-col gap-2 pointer-events-none",
          positionClasses[position]
        )}
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  const typeStyles = {
    success: 'bg-success text-success-foreground border-success',
    error: 'bg-error text-error-foreground border-error',
    warning: 'bg-warning text-warning-foreground border-warning',
    info: 'bg-info text-info-foreground border-info',
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border-2",
        "min-w-[300px] max-w-[400px] pointer-events-auto",
        "animate-in slide-in-from-right-full duration-300",
        typeStyles[toast.type]
      )}
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
        <X className="w-4 h-4" />
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
