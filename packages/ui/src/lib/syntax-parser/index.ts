/**
 * Syntax Parser
 *
 * Lightweight syntax parser for automatic code tokenization.
 * Converts plain code strings into syntax-highlighted token arrays.
 *
 * @example
 * ```ts
 * import { parseCode } from '@sage/ui';
 *
 * const tokens = parseCode('const greeting = "Hello World";');
 * // Use with CollapsibleCodeBlock:
 * <CollapsibleCodeBlock
 *   id="example"
 *   code={tokens}
 * />
 * ```
 */

export { tokenize, detectLanguage } from './tokenizer';
export type { SyntaxToken, SyntaxType, Language } from './types';

import { tokenize, detectLanguage } from './tokenizer';
import type { SyntaxToken, Language } from './types';

/**
 * Parses source code into syntax tokens for highlighting
 *
 * @param code - The source code to parse
 * @param language - Optional language hint (auto-detected if not provided)
 * @returns Array of syntax tokens ready for CollapsibleCodeBlock
 *
 * @example
 * ```ts
 * const code = `
 *   import { useState } from 'react';
 *
 *   export function Counter() {
 *     const [count, setCount] = useState(0);
 *     return <button onClick={() => setCount(count + 1)}>{count}</button>;
 *   }
 * `;
 *
 * const tokens = parseCode(code);
 * ```
 */
export function parseCode(code: string, language?: Language): SyntaxToken[] {
  const lang = language || detectLanguage(code);
  return tokenize(code, lang);
}
