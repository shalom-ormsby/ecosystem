'use client';

import { CollapsibleCodeBlock } from '@sds/ui';

interface CodeSnippetProps {
  code: string;
  language?: string;
}

export function CodeSnippet({ code, language = 'tsx' }: CodeSnippetProps) {
  return (
    <CollapsibleCodeBlock
      id={`code-snippet-${code.slice(0, 20).replace(/\s/g, '-')}`}
      code={code}
      language={language}
      defaultCollapsed={false}
      showCopy={true}
    />
  );
}
