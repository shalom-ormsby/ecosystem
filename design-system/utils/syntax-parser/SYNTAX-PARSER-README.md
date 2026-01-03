# Custom Syntax Parser

## Overview

A lightweight, regex-based syntax parser that automatically tokenizes TypeScript/JavaScript/JSX code for multi-color syntax highlighting in the Sage Design System.

## Features

- **Automatic Tokenization**: Pass plain code strings and get automatic syntax highlighting
- **Lightweight**: ~2KB implementation
- **Fast**: Regex-based parsing with O(n) complexity
- **Extensible**: Easy to add new languages or syntax patterns
- **14 Token Types**: Comprehensive support for TS/JS/JSX syntax
- **Theme-Aware**: Works seamlessly with light/dark mode

## Installation

The parser is built into the design system:

```bash
pnpm add @ecosystem/design-system
```

## Usage

### 1. Automatic Parsing (Recommended)

Simply pass a plain code string to `CollapsibleCodeBlock` - it automatically tokenizes:

```tsx
import { CollapsibleCodeBlock } from '@ecosystem/design-system';

<CollapsibleCodeBlock
  id="my-code"
  title="TypeScript Example"
  code={`import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`}
/>
```

### 2. Using parseCode Utility

For direct access to tokens:

```tsx
import { parseCode } from '@ecosystem/design-system';

const tokens = parseCode(`const greeting = "Hello World";`);
// Returns: [
//   { text: 'const', type: 'keyword' },
//   { text: ' greeting ', type: 'plain' },
//   { text: '=', type: 'operator' },
//   { text: ' ', type: 'plain' },
//   { text: '"Hello World"', type: 'string' },
//   { text: ';', type: 'punctuation' },
// ]
```

### 3. Manual Tokenization (Advanced)

For fine-grained control:

```tsx
import { CollapsibleCodeBlock } from '@ecosystem/design-system';
import type { SyntaxToken } from '@ecosystem/design-system';

const tokens: SyntaxToken[] = [
  { text: 'const', type: 'keyword' },
  { text: ' example ', type: 'plain' },
  { text: '=', type: 'operator' },
  { text: ' "value"', type: 'string' },
];

<CollapsibleCodeBlock
  id="custom"
  code={tokens}
/>
```

## Supported Token Types

The parser recognizes 14 syntax token types:

- `comment` - Single/multi-line comments
- `keyword` - Language keywords (const, function, return, etc.)
- `function` - Function names
- `string` - String literals (including template literals)
- `number` - Numeric values
- `boolean` - true/false
- `operator` - Operators (=, +, -, &&, etc.)
- `property` - Object properties
- `className` - Class/type names (PascalCase)
- `tag` - JSX/HTML tags
- `attribute` - JSX/HTML attributes
- `variable` - Variable names
- `punctuation` - Brackets, commas, semicolons
- `plain` - Default text

## Architecture

### File Structure

```
design-system/utils/syntax-parser/
├── index.ts          # Main API exports
├── tokenizer.ts      # Core tokenization logic
├── patterns.ts       # Regex patterns
└── types.ts          # TypeScript type definitions
```

### How It Works

1. **Pattern Matching**: Regex patterns test in sequence for each token type
2. **Position Tracking**: Matches are sorted by position and deduplicated
3. **Gap Filling**: Plain text fills spaces between matched tokens
4. **Output**: Returns array of `{text, type}` objects ready for rendering

### Integration Points

- **CollapsibleCodeBlock**: Auto-tokenizes string `code` prop using `useMemo`
- **Exports**: Available from main package: `@ecosystem/design-system`
- **Types**: `SyntaxToken` and `SyntaxType` exported for TypeScript users

## Performance

- **Parse Time**: ~1-2ms for typical code blocks (50-100 lines)
- **Bundle Size**: ~2KB (minified)
- **Memory**: O(n) space complexity

## Examples

### TypeScript Component

```tsx
const code = `
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export function Button({ variant, onClick }: ButtonProps) {
  return <button onClick={onClick}>Click</button>;
}
`;

<CollapsibleCodeBlock id="ts-example" code={code} />
```

### React Hooks

```tsx
const code = `
function Counter() {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(true);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
`;

<CollapsibleCodeBlock id="hooks-example" code={code} />
```

## Future Enhancements

Potential additions for future versions:

- CSS/SCSS syntax support
- HTML/Markdown syntax support
- Line number display
- Syntax error highlighting
- Code diff visualization
- Custom theme support

## Benefits

### For Design System Users

- **Zero Configuration**: Works out of the box
- **Consistent Styling**: Matches design system theme
- **Easy Integration**: Drop-in replacement for code blocks
- **Accessible**: WCAG AA 4.5:1 contrast ratios

### For Development

- **Maintainable**: Clear separation of patterns and logic
- **Testable**: Pure functions with predictable output
- **Extensible**: Easy to add new patterns or languages
- **Documented**: Full TypeScript types and JSDoc comments

## Summary

The custom syntax parser provides automatic, multi-color syntax highlighting for code examples throughout the design system with zero manual tokenization. It's lightweight, fast, and works seamlessly with existing components while providing an excellent developer experience.
