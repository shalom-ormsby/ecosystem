/**
 * Syntax Highlighting Tokens
 * Based on VS Code Dark+ theme with light mode variants
 */

export const syntaxColors = {
  light: {
    comment: '#22863a',      // Green for comments
    keyword: '#8250df',      // Purple for keywords (import, export, const, etc.)
    function: '#6639ba',     // Purple for function names
    string: '#c1592a',       // Orange for strings
    number: '#0a3069',       // Blue for numbers
    boolean: '#0550ae',      // Blue for booleans
    operator: '#1a1a1a',     // Almost black for operators
    property: '#0550ae',     // Blue for properties
    className: '#005cc5',    // Blue for class names
    tag: '#005cc5',          // Blue for HTML/JSX tags
    attribute: '#0550ae',    // Blue for attributes
    variable: '#0550ae',     // Blue for variables
    punctuation: '#57606a',  // Gray for punctuation
    plain: '#1a1a1a',        // Default text color
  },
  dark: {
    comment: '#6A9955',      // Green for comments
    keyword: '#C586C0',      // Purple for keywords (import, export, const, etc.)
    function: '#DCDCAA',     // Yellow for function names
    string: '#CE9178',       // Orange for strings
    number: '#B5CEA8',       // Light green for numbers
    boolean: '#569CD6',      // Blue for booleans
    operator: '#D4D4D4',     // Light gray for operators
    property: '#9CDCFE',     // Light blue for properties
    className: '#4EC9B0',    // Cyan for class names
    tag: '#4EC9B0',          // Cyan for HTML/JSX tags
    attribute: '#9CDCFE',    // Light blue for attributes
    variable: '#9CDCFE',     // Light blue for variables
    punctuation: '#808080',  // Gray for punctuation
    plain: '#D4D4D4',        // Default text color
  },
} as const;

export type SyntaxColorScheme = 'light' | 'dark';
export type SyntaxTokenType = keyof typeof syntaxColors.light;
