import React from 'react';

export interface PageLayoutProps {
  /** Optional header configuration */
  header?: React.ReactNode;

  /** Whether the header is sticky (adds top padding to first content element) */
  stickyHeader?: boolean;

  /** Optional breadcrumbs */
  breadcrumbs?: React.ReactNode;

  /** Breadcrumbs position: 'top' (sticky below header) or 'below-title' (static below title+subtitle) */
  breadcrumbsPosition?: 'top' | 'below-title';

  /** Optional page title - rendered in content-width container */
  title?: React.ReactNode;

  /** Optional page subtitle - rendered below title */
  subtitle?: React.ReactNode;

  /** Apply Swiss Grid Design spacing to title/subtitle area */
  swissGridSpacing?: boolean;

  /** Maximum width for title/subtitle area - should match content width for alignment */
  contentMaxWidth?: 'max-w-7xl' | 'max-w-[1440px]' | 'max-w-4xl';

  /** Optional secondary navigation (first stack) */
  secondaryNav?: React.ReactNode;

  /** Optional tertiary navigation (second stack) */
  tertiaryNav?: React.ReactNode;

  /** Optional footer */
  footer?: React.ReactNode;

  /** Main content */
  children: React.ReactNode;

  /** Optional className for main content */
  className?: string;
}

/**
 * PageLayout Component
 *
 * A flexible layout organism that composes Header, Breadcrumbs, SecondaryNav,
 * TertiaryNav, and Footer with automatic z-index and sticky positioning management.
 *
 * Features:
 * - Automatic z-index stacking (50 → 45 → 40 → 30)
 * - Dynamic sticky positioning calculations
 * - Optional title/subtitle slots with Swiss Grid spacing
 * - Flexible breadcrumb positioning (sticky top or static below title)
 * - Optional composition (all props optional)
 * - Handles full-height layouts
 * - Theme-aware styling
 *
 * Z-Index Stack:
 * - Header: z-50, h-16 lg:h-20
 * - Breadcrumbs (if position='top'): z-45, sticky below header
 * - SecondaryNav: z-40, first navigation stack
 * - TertiaryNav: z-30, second navigation stack
 *
 * Swiss Grid Design:
 * - Title/subtitle area uses structured spacing (48-96px sections)
 * - Typography hierarchy: text-4xl/5xl title, text-lg subtitle
 * - Content-width container (max-w-7xl) for proper alignment
 *
 * Example:
 * ```tsx
 * <PageLayout
 *   header={<Header logo={logo} navLinks={links} />}
 *   title={<h1>Page Title</h1>}
 *   subtitle={<p>Page subtitle</p>}
 *   breadcrumbs={<Breadcrumbs items={breadcrumbItems} />}
 *   breadcrumbsPosition="below-title"
 *   swissGridSpacing
 *   secondaryNav={<SecondaryNav items={sections} />}
 * >
 *   <article>Your content here</article>
 * </PageLayout>
 * ```
 */
export function PageLayout({
  header,
  stickyHeader = false,
  breadcrumbs,
  breadcrumbsPosition = 'top',
  title,
  subtitle,
  swissGridSpacing = false,
  contentMaxWidth = 'max-w-7xl',
  secondaryNav,
  tertiaryNav,
  footer,
  children,
  className = '',
}: PageLayoutProps) {
  // Determine if breadcrumbs should be at the top (sticky) or below title (static)
  const showBreadcrumbsAtTop = breadcrumbsPosition === 'top';
  const showBreadcrumbsBelowTitle = breadcrumbsPosition === 'below-title';

  // Sticky header spacing - add top padding to first content element
  const stickyHeaderSpacing = stickyHeader ? 'pt-16 lg:pt-20' : '';

  // Swiss Grid spacing classes
  // When breadcrumbs are below title, reduce bottom padding on title area to avoid excessive space
  const titleAreaTopSpacing = swissGridSpacing ? 'pt-12 lg:pt-16' : 'pt-8';
  const titleAreaBottomSpacing = swissGridSpacing && showBreadcrumbsBelowTitle ? 'pb-3' : swissGridSpacing ? 'pb-12 lg:pb-16' : 'pb-8';
  const titleBottomMargin = swissGridSpacing ? 'mb-4' : 'mb-3';
  const breadcrumbsAreaSpacing = swissGridSpacing ? 'pt-4 pb-8' : 'pt-3 pb-6';

  return (
    <div className="min-h-screen flex flex-col w-full min-w-0">
      {/* Header - z-50, h-16 lg:h-20 */}
      {header}

      {/* Breadcrumbs - z-45, sticky below header (only if position='top') */}
      {breadcrumbs && showBreadcrumbsAtTop && (
        <div
          className={`
            sticky bg-[var(--color-background)]/95 backdrop-blur-sm
            border-b border-[var(--color-border)]
            transition-all duration-300
            top-16 lg:top-20
            ${stickyHeaderSpacing}
          `}
          style={{ zIndex: 45 }}
        >
          <div className={`${contentMaxWidth} mx-auto px-4 sm:px-6 lg:px-8 py-3`}>
            {breadcrumbs}
          </div>
        </div>
      )}

      {/* Title/Subtitle Area - Swiss Grid Design */}
      {(title || subtitle) && (
        <div className={`${titleAreaTopSpacing} ${titleAreaBottomSpacing} ${!showBreadcrumbsAtTop ? stickyHeaderSpacing : ''} bg-[var(--color-background)]`}>
          <div className={`${contentMaxWidth} mx-auto px-4 sm:px-6 lg:px-8`}>
            {/* Title */}
            {title && (
              <div className={titleBottomMargin}>
                {title}
              </div>
            )}

            {/* Subtitle */}
            {subtitle && <div>{subtitle}</div>}
          </div>
        </div>
      )}

      {/* Breadcrumbs below title+subtitle (only if position='below-title') */}
      {breadcrumbs && showBreadcrumbsBelowTitle && (
        <div className={`${breadcrumbsAreaSpacing} bg-[var(--color-background)]`}>
          <div className={`${contentMaxWidth} mx-auto px-4 sm:px-6 lg:px-8`}>
            {breadcrumbs}
          </div>
        </div>
      )}

      {/* Secondary Nav - z-40, first navigation stack */}
      {secondaryNav}

      {/* Tertiary Nav - z-30, second navigation stack */}
      {tertiaryNav}

      {/* Main Content - flexible, fills remaining space */}
      <main className={`flex-1 ${className}`}>
        <div className={`${contentMaxWidth} mx-auto px-4 sm:px-6 lg:px-8 py-12`}>
          {children}
        </div>
      </main>

      {/* Footer */}
      {footer}
    </div>
  );
}
