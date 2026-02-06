'use client';

import { useState, useMemo } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { syntaxColors } from '@thesage/tokens';
import { parseCode, type SyntaxToken } from '../../lib/syntax-parser';

export interface CollapsibleCodeBlockProps {
  /** Unique identifier for the code block (required for animation) */
  id: string;
  /** Title/label for the code block */
  title?: string;
  /** Code to display - can be string or array of syntax tokens */
  code: string | SyntaxToken[];
  /** Language identifier (e.g., 'typescript', 'css', 'html') */
  language?: string;
  /** Initial collapsed state */
  defaultCollapsed?: boolean;
  /** Show copy button */
  showCopy?: boolean;
  /** Custom className for container */
  className?: string;
}

/**
 * CollapsibleCodeBlock Organism
 *
 * A reusable code block component with:
 * - Smooth spring animation for expand/collapse
 * - Syntax highlighting with light/dark theme support
 * - Copy to clipboard functionality
 * - Preview mode showing first 3 lines
 * - Gradient overlay in collapsed state
 *
 * @example
 * ```tsx
 * <CollapsibleCodeBlock
 *   id="example-code"
 *   title="TypeScript Example"
 *   code={[
 *     { text: 'const', type: 'keyword' },
 *     { text: ' example ', type: 'plain' },
 *     { text: '=', type: 'operator' },
 *     { text: ' "Hello"', type: 'string' },
 *   ]}
 *   language="typescript"
 * />
 * ```
 */
export function CollapsibleCodeBlock({
  id,
  title,
  code,
  language,
  defaultCollapsed = true,
  showCopy = true,
  className = '',
}: CollapsibleCodeBlockProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [copySuccess, setCopySuccess] = useState(false);
  const { mode } = useTheme();

  // Get the appropriate color scheme based on current theme mode
  const colors = mode === 'dark' ? syntaxColors.dark : syntaxColors.light;

  // Auto-tokenize string code for syntax highlighting
  const tokens = useMemo(() => {
    return typeof code === 'string' ? parseCode(code) : code;
  }, [code]);

  // Convert tokens to string for copying
  const codeString = tokens.map(token => token.text).join('');

  // Handle copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Handle toggle animation
  const handleToggle = () => {
    const preview = document.getElementById(`${id}-preview`);
    const codeBlock = document.getElementById(`${id}-code`);
    const icon = document.getElementById(`${id}-icon`);

    if (preview && codeBlock && icon) {
      const isHidden = codeBlock.classList.contains('hidden');

      if (isHidden) {
        // Opening: start at preview height, expand to full
        preview.classList.add('hidden');
        codeBlock.classList.remove('hidden');
        codeBlock.style.maxHeight = '6.6rem'; // Match preview height (3 lines)
        codeBlock.offsetHeight; // Force reflow
        codeBlock.style.maxHeight = codeBlock.scrollHeight + 'px';
      } else {
        // Closing: collapse to preview height, then swap
        codeBlock.style.maxHeight = '6.6rem';
        setTimeout(() => {
          codeBlock.classList.add('hidden');
          preview.classList.remove('hidden');
        }, 500);
      }

      icon.classList.toggle('rotate-90');
      setIsCollapsed(!isCollapsed);
    }
  };

  // Render syntax-highlighted code with inline colors from tokens
  const renderCode = (tokensToRender: SyntaxToken[]) => {
    return tokensToRender.map((token, index) => {
      // Get color from syntax tokens based on token type
      const color = token.type ? colors[token.type] : colors.plain;

      return (
        <span
          key={index}
          style={{ color }}
        >
          {token.text}
        </span>
      );
    });
  };

  // Get preview tokens (first ~3 lines worth)
  const previewTokens = useMemo(() => {
    // Count characters to approximate 3 lines (~120 chars)
    let charCount = 0;
    const maxChars = 120;
    const preview: SyntaxToken[] = [];

    for (const token of tokens) {
      if (charCount >= maxChars) break;
      preview.push(token);
      charCount += token.text.length;
    }

    return preview;
  }, [tokens]);

  return (
    <div className={`w-full min-w-0 ${className}`}>
      {/* Title */}
      {title && (
        <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
          {title}
        </h3>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={handleToggle}
          className="flex items-center gap-2 px-3 py-2 text-xs text-[var(--color-text-primary)] bg-[var(--color-surface)] hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-foreground)] hover:scale-105 hover:shadow-lg active:scale-95 border border-[var(--color-border)] rounded-md transition-all duration-200"
          aria-expanded={!isCollapsed}
          aria-controls={`${id}-code`}
          aria-label={isCollapsed ? 'Show code' : 'Hide code'}
        >
          <svg
            id={`${id}-icon`}
            className="w-3 h-3 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          {isCollapsed ? 'Show Code' : 'Hide Code'}
        </button>

        {showCopy && (
          <button
            onClick={handleCopy}
            aria-label={copySuccess ? 'Copied to clipboard' : 'Copy code to clipboard'}
            className="flex items-center gap-2 px-3 py-2 text-xs text-[var(--color-text-primary)] bg-[var(--color-surface)] hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-foreground)] hover:scale-105 hover:shadow-lg active:scale-95 border border-[var(--color-border)] rounded-md transition-all duration-200"
          >
            {copySuccess ? (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012-2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </>
            )}
          </button>
        )}
      </div>

      {/* Code Preview (visible when collapsed) */}
      <div
        id={`${id}-preview`}
        className={`bg-[var(--color-background)] p-4 rounded border border-[var(--color-border)] overflow-hidden mb-4 w-full max-w-full ${isCollapsed ? '' : 'hidden'}`}
        style={{ height: '6.6rem' }}
      >
        <div className="relative w-full max-w-full min-w-0">
          <pre className="text-sm font-mono overflow-x-auto w-full max-w-full whitespace-pre">
            <code>{renderCode(previewTokens)}</code>
          </pre>
          <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[var(--color-background)] to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Full Code (hidden by default) */}
      <div
        id={`${id}-code`}
        className={`transition-all duration-500 ease-out overflow-hidden bg-[var(--color-background)] p-4 rounded border border-[var(--color-border)] w-full max-w-full ${isCollapsed ? 'hidden' : ''}`}
        style={{
          maxHeight: isCollapsed ? '0px' : 'none',
          transition: 'max-height 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <pre className="text-sm font-mono overflow-x-auto w-full max-w-full whitespace-pre">
          <code>{renderCode(tokens)}</code>
        </pre>
      </div>
    </div>
  );
}
