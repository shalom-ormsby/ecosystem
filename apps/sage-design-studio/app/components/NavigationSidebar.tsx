'use client';

import { useState, useEffect } from 'react';
import { navigationTree, type NavigationItem } from '../lib/navigation-tree';

interface NavigationSidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function NavigationSidebar({
  activeSection,
  onNavigate,
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
      // Default: expand first two levels
      const defaultExpanded = new Set<string>();
      navigationTree.forEach((item) => {
        defaultExpanded.add(item.id);
        if (item.children) {
          item.children.forEach((child) => {
            if (child.children) {
              defaultExpanded.add(child.id);
            }
          });
        }
      });
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
    const isActive = item.section === activeSection;
    const indentStyle = { paddingLeft: `${depth * 16}px` };

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            }
            if (item.section) {
              onNavigate(item.section);
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
        className={`fixed top-0 left-0 h-screen bg-[var(--color-background)] border-r border-[var(--color-border)] z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:z-0`}
        style={{ width: isOpen ? '280px' : '0' }}
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

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            {navigationTree.map((item) => renderItem(item))}
          </nav>

          {/* Footer Info */}
          <div className="px-4 py-4 border-t border-[var(--color-border)] text-xs text-[var(--color-text-secondary)]">
            <div className="flex items-center gap-2 mb-2">
              <kbd className="px-2 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded font-mono">
                ⌘K
              </kbd>
              <span>Quick search</span>
            </div>
            <p className="text-[var(--color-text-muted)]">v0.1.0</p>
          </div>
        </div>
      </aside>
    </>
  );
}
