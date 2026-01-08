'use client';

import React from 'react';
import { useThemeStore } from '@sds/core';

/**
 * Lightweight mode switcher for the design system documentation
 * Only allows switching between light and dark modes
 * (Theme switching is intentionally disabled to prevent overriding design system styles)
 */
export function ModeSwitcher() {
  const [mounted, setMounted] = React.useState(false);
  const { mode, setMode } = useThemeStore();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed bottom-4 right-8 z-50"
      title="Switch between light and dark modes"
    >
      <div className="flex gap-2 bg-[var(--color-glass)] p-2 rounded-full shadow-lg border border-[var(--color-glass-border)]"
        style={{ backdropFilter: 'var(--effect-blur-md)' }}
      >
        <button
          onClick={() => setMode('light')}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2
            ${mode === 'light'
              ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-md'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }
          `}
          aria-label="Switch to light mode"
        >
          <span>☀️</span>
          <span className="hidden sm:inline">Light</span>
        </button>
        <button
          onClick={() => setMode('dark')}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2
            ${mode === 'dark'
              ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-md'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }
          `}
          aria-label="Switch to dark mode"
        >
          <span>🌙</span>
          <span className="hidden sm:inline">Dark</span>
        </button>
      </div>
    </div>
  );
}
