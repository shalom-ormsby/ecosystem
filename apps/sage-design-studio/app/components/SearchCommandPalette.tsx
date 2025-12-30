'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card } from '@ecosystem/design-system';
import { searchContent, getResultTypeIcon, type SearchResult } from '../lib/search-index';

interface SearchCommandPaletteProps {
  onNavigate: (path: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function SearchCommandPalette({ onNavigate, isOpen, onClose }: SearchCommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Close with Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
        setQuery('');
        setResults([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Search when query changes
  useEffect(() => {
    if (query.trim().length > 0) {
      const searchResults = searchContent(query);
      setResults(searchResults);
      setSelectedIndex(0);
    } else {
      setResults([]);
      setSelectedIndex(0);
    }
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter' && results.length > 0) {
        e.preventDefault();
        handleSelect(results[selectedIndex]);
      }
    },
    [results, selectedIndex]
  );

  const handleSelect = (result: SearchResult) => {
    onNavigate(result.path);
    onClose();
    setQuery('');
    setResults([]);
  };

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
        onClick={() => {
          onClose();
          setQuery('');
          setResults([]);
        }}
      />

      {/* Command Palette */}
      <div className="fixed top-[20vh] left-1/2 -translate-x-1/2 w-full max-w-2xl z-[101] px-4">
        <Card className="overflow-hidden shadow-2xl">
          {/* Search Input */}
          <div className="flex items-center gap-3 p-4 border-b border-[var(--color-border)]">
            <svg
              className="w-5 h-5 text-[var(--color-text-secondary)]"
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
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search components, hooks, utilities..."
              className="flex-1 bg-transparent border-none outline-none text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
            />
            <kbd className="px-2 py-1 text-xs font-mono text-[var(--color-text-primary)] bg-[var(--color-surface)] border border-[var(--color-border)] rounded">
              ESC
            </kbd>
          </div>

          {/* Results */}
          {results.length > 0 ? (
            <div
              ref={resultsRef}
              className="max-h-[60vh] overflow-y-auto"
            >
              {results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  className={`w-full flex items-start gap-3 p-4 text-left transition-colors ${
                    index === selectedIndex
                      ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                      : 'hover:bg-[var(--color-hover)]'
                  } ${index !== results.length - 1 ? 'border-b border-[var(--color-border)]' : ''}`}
                >
                  <span className="text-2xl flex-shrink-0">
                    {getResultTypeIcon(result.type)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`font-medium ${
                          index === selectedIndex
                            ? 'text-[var(--color-primary-foreground)]'
                            : 'text-[var(--color-text-primary)]'
                        }`}
                      >
                        {result.title}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          index === selectedIndex
                            ? 'bg-[var(--color-primary-foreground)]/20 text-[var(--color-primary-foreground)]'
                            : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
                        }`}
                      >
                        {result.category}
                      </span>
                    </div>
                    <p
                      className={`text-sm ${
                        index === selectedIndex
                          ? 'text-[var(--color-primary-foreground)]/80'
                          : 'text-[var(--color-text-secondary)]'
                      }`}
                    >
                      {result.description}
                    </p>
                  </div>
                  <svg
                    className={`w-4 h-4 flex-shrink-0 mt-1 ${
                      index === selectedIndex
                        ? 'text-[var(--color-primary-foreground)]'
                        : 'text-[var(--color-text-muted)]'
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
                </button>
              ))}
            </div>
          ) : query.trim().length > 0 ? (
            <div className="p-8 text-center text-[var(--color-text-secondary)]">
              <p>No results found for "{query}"</p>
              <p className="text-sm mt-2">Try searching for components, hooks, or utilities</p>
            </div>
          ) : (
            <div className="p-8 text-center text-[var(--color-text-secondary)]">
              <p className="mb-4">Quick access to all components and documentation</p>
              <div className="grid grid-cols-2 gap-3 text-sm text-left max-w-md mx-auto">
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 font-mono text-[var(--color-text-primary)] bg-[var(--color-surface)] border border-[var(--color-border)] rounded text-xs">
                    ↑↓
                  </kbd>
                  <span>Navigate</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 font-mono text-[var(--color-text-primary)] bg-[var(--color-surface)] border border-[var(--color-border)] rounded text-xs">
                    ↵
                  </kbd>
                  <span>Select</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 font-mono text-[var(--color-text-primary)] bg-[var(--color-surface)] border border-[var(--color-border)] rounded text-xs">
                    ESC
                  </kbd>
                  <span>Close</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 font-mono text-[var(--color-text-primary)] bg-[var(--color-surface)] border border-[var(--color-border)] rounded text-xs">
                    ⌘K
                  </kbd>
                  <span>Toggle</span>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
