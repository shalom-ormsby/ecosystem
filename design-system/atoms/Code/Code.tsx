'use client';

import { ReactNode, useState, useMemo } from 'react';
import type { SyntaxType } from '../../utils/syntax-parser';
import { parseCode } from '../../utils/syntax-parser';

export interface CodeProps {
  /** The code content to display */
  children: ReactNode;
  /** Optional syntax highlighting type */
  syntax?: SyntaxType;
  /** Whether to render as inline code (default) or block */
  inline?: boolean;
  /** Show copy button for block code (default: true) */
  showCopy?: boolean;
  /** Additional className for custom styling */
  className?: string;
}

/**
 * Code Atom
 *
 * A semantic code wrapper with automatic syntax highlighting and enhanced visual styling.
 * Features distinct treatments for inline vs block code, with copy-on-hover for blocks.
 *
 * **Visual Design:**
 * - Inline: Pale amber background (#FEF3E7 light / #252525 dark) with subtle border
 * - Block: Cool gray background (#F8F9FA light / #1E1E1E dark) with generous padding
 * - Copy button appears on hover for block code with tooltip feedback
 * - Accessible contrast ratios (WCAG AA 4.5:1)
 *
 * @example
 * ```tsx
 * // Inline code - perfect for text snippets
 * <Code>example</Code>
 * <Code syntax="keyword">const</Code>
 * <Code syntax="function">useState()</Code>
 *
 * // Block code - for larger code examples
 * <Code inline={false}>const example = "value";</Code>
 * <Code inline={false} syntax="keyword" showCopy={false}>
 *   const greeting = "Hello World";
 * </Code>
 * ```
 */
export function Code({
  children,
  syntax = 'plain',
  inline = true,
  showCopy = true,
  className = '',
}: CodeProps) {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Auto-parse code for block syntax highlighting
  const tokens = useMemo(() => {
    if (!inline && typeof children === 'string') {
      return parseCode(children);
    }
    return null;
  }, [children, inline]);

  // Handle copy to clipboard for block code
  const handleCopy = async () => {
    const text = typeof children === 'string' ? children : String(children);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // Inline code - subtle, integrated into text
  if (inline) {
    return (
      <code
        className={`font-mono text-[0.875em] px-[0.375rem] py-[0.125rem] rounded border ${className}`}
        style={{
          backgroundColor: 'var(--code-inline-bg)',
          borderColor: 'var(--code-border)',
          color: `var(--syntax-${syntax})`,
        }}
      >
        {children}
      </code>
    );
  }

  // Block code - prominent with copy button on hover
  return (
    <div className={`relative group ${className}`}>
      <pre
        className="font-mono text-sm p-6 rounded-lg border overflow-x-auto"
        style={{
          backgroundColor: 'var(--code-block-bg)',
          borderColor: 'var(--code-border)',
        }}
      >
        <code>
          {tokens ? (
            // Automatic syntax highlighting with parsed tokens
            tokens.map((token, index) => (
              <span
                key={index}
                style={{
                  color: `var(--syntax-${token.type})`,
                }}
              >
                {token.text}
              </span>
            ))
          ) : (
            // Fallback to single color for non-string children
            <span
              style={{
                color: `var(--syntax-${syntax})`,
              }}
            >
              {children}
            </span>
          )}
        </code>
      </pre>

      {/* Copy Button - appears on hover for block code */}
      {showCopy && (
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="relative">
            <button
              onClick={handleCopy}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="flex items-center gap-2 px-3 py-2 text-xs rounded-md transition-all duration-200 border"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-primary)',
              }}
              aria-label={copied ? 'Copied!' : 'Copy code'}
            >
              {copied ? (
                <>
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Copy</span>
                </>
              )}
            </button>

            {/* Tooltip */}
            {showTooltip && !copied && (
              <div
                className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs rounded whitespace-nowrap pointer-events-none"
                style={{
                  backgroundColor: 'var(--color-text-primary)',
                  color: 'var(--color-background)',
                }}
              >
                Copy code
                {/* Arrow */}
                <div
                  className="absolute top-full right-4 w-0 h-0"
                  style={{
                    borderLeft: '4px solid transparent',
                    borderRight: '4px solid transparent',
                    borderTop: '4px solid var(--color-text-primary)',
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
