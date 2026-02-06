import React from 'react';

export interface HeadingProps {
  /**
   * Heading content
   */
  children: React.ReactNode;

  /**
   * Heading level (affects both semantics and styling)
   */
  level: 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * Additional className for customization
   */
  className?: string;
}

/**
 * Heading Component
 *
 * Semantic heading with automatic token-based styling.
 * No need to manually apply text colors, sizes, or weights.
 *
 * **What it handles automatically:**
 * - Theme-aware text color (`--color-text-primary`)
 * - Appropriate font size for each level
 * - Font weight (bold for all levels)
 * - Line height for readability
 * - Dark mode support
 *
 * **Swiss Grid Typography:**
 * - H1: 48px (3xl) on mobile, 60px (5xl) on desktop
 * - H2: 36px (3xl) on mobile, 48px (4xl) on desktop
 * - H3: 30px (3xl)
 * - H4: 24px (2xl)
 * - H5: 20px (xl)
 * - H6: 18px (lg)
 *
 * Usage:
 * ```tsx
 * <Heading level={1}>Page Title</Heading>
 * <Heading level={2}>Section Heading</Heading>
 * <Heading level={3}>Subsection</Heading>
 * ```
 */
export const Heading = (
  {
    ref,
    children,
    level,
    className = ''
  }: HeadingProps & {
    ref?: React.Ref<HTMLHeadingElement>;
  }
) => {
  const levelStyles = {
    1: 'text-4xl lg:text-5xl',  // 36px → 48px
    2: 'text-3xl lg:text-4xl',  // 30px → 36px
    3: 'text-2xl lg:text-3xl',  // 24px → 30px
    4: 'text-xl lg:text-2xl',   // 20px → 24px
    5: 'text-lg lg:text-xl',    // 18px → 20px
    6: 'text-base lg:text-lg',  // 16px → 18px
  };

  const baseStyles = `
    font-bold
    text-[var(--color-text-primary)]
    ${levelStyles[level]}
  `;

  const Component = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  return React.createElement(
    Component,
    {
      ref,
      className: `${baseStyles} ${className}`,
    },
    children
  );
};
