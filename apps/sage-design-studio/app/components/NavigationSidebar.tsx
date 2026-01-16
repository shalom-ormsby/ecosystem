'use client';

import { useState, useEffect } from 'react';
import { navigationTree, type NavigationItem } from '../lib/navigation-tree';
import {
  Sidebar,
  SidebarOverlay,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarItem,
} from '@sds/ui';

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

  // Feature flag for icons - requested by user to be hidden by default but easily restorable
  const SHOW_ICONS = false;

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

    return (
      <div key={item.id}>
        <SidebarItem
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            }
            if (item.section) {
              onNavigate(item.section, item.id);
            }
          }}
          isActive={isActive}
          isExpanded={isExpanded}
          hasChildren={hasChildren}
          depth={depth}
          icon={item.icon}
          showIcon={SHOW_ICONS}
        >
          {item.label}
        </SidebarItem>

        {hasChildren && isExpanded && (
          <div>{item.children!.map((child) => renderItem(child, depth + 1))}</div>
        )}
      </div>
    );
  };

  return (
    <>
      <SidebarOverlay isOpen={isOpen} onDismiss={onToggle} />

      <Sidebar isOpen={isOpen}>
        <SidebarHeader>
          <div className="w-full flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">
              Sage Design System
            </h2>
            <button
              onClick={onToggle}
              className="lg:hidden p-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors"
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
        </SidebarHeader>

        <div className="px-4 py-3">
          <button
            onClick={onSearchOpen}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground bg-muted/50 hover:bg-muted border border-border rounded-md transition-colors"
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
            <kbd className="px-2 py-0.5 text-xs font-mono text-muted-foreground bg-background border border-border rounded">
              ⌘K
            </kbd>
          </button>
        </div>

        <SidebarContent>
          {navigationTree.map((item) => renderItem(item))}
        </SidebarContent>

        <SidebarFooter>
          {/* GitHub Link */}
          <a
            href="https://github.com/shalom-ormsby/ecosystem/tree/main/design-system"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground bg-muted/50 hover:bg-muted border border-border rounded-md transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>View on GitHub</span>
          </a>

          {/* Created By */}
          <div className="pt-3">
            <p className="text-xs text-muted-foreground mb-1">Created by</p>
            <a
              href="https://www.shalomormsby.com"
              className="block text-sm font-bold text-foreground hover:text-primary transition-colors"
              style={{ fontFamily: 'var(--font-header-logo)' }}
            >
              Shalom Ormsby
            </a>
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
