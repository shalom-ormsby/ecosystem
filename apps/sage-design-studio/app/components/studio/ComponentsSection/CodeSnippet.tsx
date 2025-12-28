'use client';

import { useState } from 'react';
import { Card } from '@ecosystem/design-system';

interface CodeSnippetProps {
  code: string;
  language?: string;
}

export function CodeSnippet({ code, language = 'tsx' }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="relative">
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={copyCode}
          className="px-3 py-1.5 rounded bg-[var(--color-surface)] hover:bg-[var(--color-border)] text-xs font-medium text-[var(--color-text-primary)] transition-colors border border-[var(--color-border)]"
        >
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-6 overflow-x-auto text-sm">
        <code className="text-[var(--color-text-primary)] font-mono">{code}</code>
      </pre>
    </Card>
  );
}
