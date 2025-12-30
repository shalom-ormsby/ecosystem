'use client';

import { useState, useEffect } from 'react';
import { navigationTree, type NavigationItem } from '../lib/navigation-tree';

interface NavigationSidebarProps {
  activeSection: string;
  activeItemId?: string;
  onNavigate: (section: string, itemId?: string) => void;
  onSearchOpen: () => void;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function NavigationSidebar({
  activeSection,
  activeItemId,
  onNavigate,
  onSearchOpen,
  isOpen = true,
  onToggle,
}: NavigationSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isMounted, setIsMounted] = useState(false);

  // Load expanded state from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem('sage-sidebar-expanded');
    if (stored) {
      try {
        const items = JSON.parse(stored);
        setExpandedItems(new Set(items));
      } catch (e) {
        // Ignore errors
      }
    } else {
      // Default: only expand the first section (Getting Started)
      // This behavior can be easily changed by modifying the array below
      const defaultExpanded = new Set<string>(['getting-started']);
      setExpandedItems(defaultExpanded);
    }
  }, []);

  // Save expanded state to localStorage
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('sage-sidebar-expanded', JSON.stringify(Array.from(expandedItems)));
    }
  }, [expandedItems, isMounted]);

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const renderItem = (item: NavigationItem, depth: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const isActive = item.id === activeItemId;
    const indentStyle = { paddingLeft: `${depth * 16}px` };

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            }
            if (item.section) {
              onNavigate(item.section, item.id);
            }
          }}
          className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
            isActive
              ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-medium'
              : 'text-[var(--color-text-primary)] hover:bg-[var(--color-hover)]'
          } ${depth === 0 ? 'font-semibold' : ''}`}
          style={indentStyle}
        >
          {hasChildren && (
            <svg
              className={`w-4 h-4 flex-shrink-0 transition-transform ${
                isExpanded ? 'rotate-90' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
          {!hasChildren && depth > 0 && <span className="w-4 flex-shrink-0" />}
          {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
          <span className="flex-1 text-left truncate">{item.label}</span>
        </button>

        {hasChildren && isExpanded && (
          <div>{item.children!.map((child) => renderItem(child, depth + 1))}</div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[280px] bg-[var(--color-background)] border-r border-[var(--color-border)] z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:z-0`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-[var(--color-border)]">
            <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
              Sage Design System
            </h2>
            <button
              onClick={onToggle}
              className="lg:hidden p-2 hover:bg-[var(--color-hover)] rounded-lg transition-colors"
              aria-label="Close sidebar"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Search */}
          <div className="px-4 py-3 border-b border-[var(--color-border)]">
            <button
              onClick={onSearchOpen}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs bg-[var(--color-surface)] hover:bg-[var(--color-hover)] border border-[var(--color-border)] rounded-md transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="flex-1 text-left">Search</span>
              <kbd className="px-2 py-0.5 text-xs font-mono bg-[var(--color-background)] border border-[var(--color-border)] rounded">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            {navigationTree.map((item) => renderItem(item))}
          </nav>

          {/* Footer Info */}
          <div className="px-4 py-4 border-t border-[var(--color-border)] space-y-3">
            {/* Version */}
            <p className="text-xs text-[var(--color-text-muted)]">v0.1.0</p>

            {/* GitHub Link */}
            <a
              href="https://github.com/shalomormsby/ecosystem"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-xs bg-[var(--color-surface)] hover:bg-[var(--color-hover)] border border-[var(--color-border)] rounded-md transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>View on GitHub</span>
            </a>

            {/* Created By */}
            <div className="pt-3 border-t border-[var(--color-border)]">
              <p className="text-xs text-[var(--color-text-muted)] mb-2">Created by</p>
              <a
                href="https://www.shalomormsby.com"
                className="block text-sm font-bold text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors"
                style={{ fontFamily: 'var(--font-header-logo)' }}
              >
                Shalom Ormsby
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
