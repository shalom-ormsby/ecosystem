import React from 'react';

export interface ContainerProps {
  /**
   * Content to wrap
   */
  children: React.ReactNode;

  /**
   * Maximum width variant
   * @default 'standard'
   */
  variant?: 'standard' | 'wide' | 'narrow';

  /**
   * Add horizontal padding
   * @default true
   */
  padding?: boolean;

  /**
   * Additional className for customization
   */
  className?: string;

  /**
   * HTML element to render as
   * @default 'div'
   */
  as?: 'div' | 'section' | 'article' | 'main' | 'aside' | 'header' | 'footer';
}

/**
 * Container Component
 *
 * Manages consistent max-widths and horizontal padding across the design system.
 * This component ensures perfect alignment between header, content, and footer
 * without manually coordinating max-width classes.
 *
 * **Swiss Grid Integration:**
 * - Uses standard max-widths that align with the 8px base unit
 * - Coordinates with PageTemplate variant system
 * - Provides consistent horizontal padding
 *
 * **Why This Component Exists:**
 * Before Container, every component had hardcoded max-widths:
 * - Header: max-w-[1440px]
 * - SecondaryNav: max-w-7xl
 * - Content: max-w-4xl
 *
 * This caused misalignment. Container solves this by centralizing width management.
 *
 * Usage:
 * ```tsx
 * // Standard width (1280px)
 * <Container>Content</Container>
 *
 * // Wide width (1440px) - for dashboards, data-heavy pages
 * <Container variant="wide">Dashboard</Container>
 *
 * // Narrow width (896px) - for reading-focused content
 * <Container variant="narrow">Article</Container>
 *
 * // Without padding (when you need edge-to-edge content)
 * <Container padding={false}>Full bleed content</Container>
 *
 * // As different HTML element
 * <Container as="main">Main content</Container>
 * ```
 */
export const Container = React.forwardRef<HTMLElement, ContainerProps>(
  (
    {
      children,
      variant = 'standard',
      padding = true,
      className = '',
      as: Component = 'div',
    },
    ref
  ) => {
    const maxWidthClasses = {
      standard: 'max-w-7xl',      // 1280px - default for most content
      wide: 'max-w-[1440px]',     // 1440px - for data-heavy layouts
      narrow: 'max-w-4xl',        // 896px - for reading comfort
    };

    const paddingClasses = padding ? 'px-4 sm:px-6 lg:px-8' : '';

    return React.createElement(
      Component,
      {
        ref,
        className: `${maxWidthClasses[variant]} mx-auto ${paddingClasses} ${className}`,
      },
      children
    );
  }
);

Container.displayName = 'Container';
