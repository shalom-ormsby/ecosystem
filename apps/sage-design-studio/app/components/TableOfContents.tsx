'use client';

import { useState, useEffect } from 'react';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items?: TocItem[];
  relatedComponents?: Array<{
    id: string;
    title: string;
    path: string;
  }>;
  onNavigate?: (path: string) => void;
}

export function TableOfContents({ items = [], relatedComponents = [], onNavigate }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0 && relatedComponents.length === 0) {
    return null;
  }

  return (
    <aside className="hidden xl:block w-64 flex-shrink-0">
      <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
        {/* Table of Contents */}
        {items.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold mb-3 text-[var(--color-text-primary)]">
              On This Page
            </h3>
            <nav>
              <ul className="space-y-2 text-sm">
                {items.map((item) => (
                  <li
                    key={item.id}
                    style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
                  >
                    <a
                      href={`#${item.id}`}
                      className={`block py-1 transition-colors hover:text-[var(--color-primary)] ${
                        activeId === item.id
                          ? 'text-[var(--color-primary)] font-medium'
                          : 'text-[var(--color-text-secondary)]'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(item.id);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}

        {/* Related Components */}
        {relatedComponents.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold mb-3 text-[var(--color-text-primary)]">
              Related Components
            </h3>
            <nav>
              <ul className="space-y-2 text-sm">
                {relatedComponents.map((component) => (
                  <li key={component.id}>
                    <button
                      onClick={() => onNavigate?.(component.path)}
                      className="block py-1 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors text-left w-full"
                    >
                      {component.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </aside>
  );
}

// Hook to auto-generate TOC from content
export function useTableOfContents(contentRef: React.RefObject<HTMLElement>): TocItem[] {
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    if (!contentRef.current) return;

    const headings = contentRef.current.querySelectorAll('h2, h3');
    const tocItems: TocItem[] = [];

    headings.forEach((heading) => {
      const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '';

      // Set ID if not present
      if (!heading.id) {
        heading.id = id;
      }

      tocItems.push({
        id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName[1]),
      });
    });

    setItems(tocItems);
  }, [contentRef]);

  return items;
}
