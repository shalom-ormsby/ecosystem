'use client';

import React from 'react';
import { Header, type HeaderNavLink } from './Header/Header';
import { Breadcrumbs, type BreadcrumbItemLegacy } from '../navigation/Breadcrumbs';
import { SecondaryNav, type SecondaryNavItem } from '../navigation/SecondaryNav';
import { PageLayout } from './PageLayout';
import { CustomizerPanel } from './CustomizerPanel';
import { Heading } from '../data-display/Heading';
import { Text } from '../data-display/Text';

export interface PageTemplateHeaderConfig {
  /** Logo or brand element */
  logo: React.ReactNode;
  /** Navigation links with optional dropdowns */
  navLinks?: HeaderNavLink[];
  /** Actions (e.g., Sign In button, CTA) */
  actions?: React.ReactNode;
  /** Whether header should be sticky (default: true) */
  sticky?: boolean;
}

export interface PageTemplateSecondaryNavConfig {
  /** Secondary navigation items */
  items: SecondaryNavItem[];
  /** Currently active item ID */
  activeId: string;
  /** Callback when item changes */
  onItemChange: (id: string) => void;
}

export interface PageTemplateProps {
  /** Header configuration */
  header: PageTemplateHeaderConfig;

  /** Page title (required) */
  title: string;

  /** Optional page subtitle */
  subtitle?: string;

  /** Breadcrumb navigation items */
  breadcrumbs: BreadcrumbItemLegacy[];

  /** Optional secondary navigation */
  secondaryNav?: PageTemplateSecondaryNavConfig;

  /** Main page content */
  children: React.ReactNode;

  /** Optional footer */
  footer?: React.ReactNode;

  /** Show customizer panel (default: true) */
  showCustomizer?: boolean;

  /** Content width variant */
  variant?: 'standard' | 'wide' | 'narrow';
}

/**
 * PageTemplate Component
 *
 * An opinionated page layout template based on Swiss Grid Design principles.
 * This template provides a structured, clean layout with sensible defaults for
 * standard pages (blogs, docs, app pages).
 *
 * Swiss Grid Design Principles:
 * - Structured spacing: 48-96px between major sections
 * - Clear typography hierarchy: 36-48px title, 18px subtitle
 * - Grid-based alignment with consistent content widths
 * - Generous whitespace for breathing room
 * - Minimal, functional aesthetic
 *
 * Features:
 * - Sticky header with glass morphism effect
 * - Breadcrumbs positioned below page title (static)
 * - Always-sticky secondary navigation
 * - Optional customizer panel
 * - Three width variants: standard (1280px), wide (1440px), narrow (896px)
 * - Automatic Swiss Grid spacing
 *
 * Example:
 * ```tsx
 * <PageTemplate
 *   header={{
 *     logo: <Link href="/">Brand</Link>,
 *     navLinks: navigationItems,
 *     sticky: true
 *   }}
 *   title="Welcome to Our Platform"
 *   subtitle="Build amazing experiences with our tools"
 *   breadcrumbs={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Platform' }
 *   ]}
 * >
 *   <article>Your content here</article>
 * </PageTemplate>
 * ```
 */
export function PageTemplate({
  header,
  title,
  subtitle,
  breadcrumbs,
  secondaryNav,
  children,
  footer,
  showCustomizer = true,
  variant = 'standard',
}: PageTemplateProps) {
  // Determine content width based on variant
  const maxWidthClass = {
    standard: 'max-w-7xl',    // 1280px - default, matches most pages
    wide: 'max-w-[1440px]',   // 1440px - for dashboard-like pages
    narrow: 'max-w-4xl',      // 896px - for reading-focused pages
  }[variant] as 'max-w-7xl' | 'max-w-[1440px]' | 'max-w-4xl';

  return (
    <>
      <PageLayout
        header={
          <Header
            logo={header.logo}
            navLinks={header.navLinks}
            actions={header.actions}
            sticky={header.sticky ?? true}
            maxWidth={maxWidthClass}
          />
        }
        stickyHeader={header.sticky ?? true}
        breadcrumbsPosition="below-title"
        breadcrumbs={<Breadcrumbs items={breadcrumbs} variant="subtle" />}
        title={<Heading level={1}>{title}</Heading>}
        subtitle={subtitle ? <Text size="lg" variant="secondary">{subtitle}</Text> : undefined}
        secondaryNav={
          secondaryNav ? (
            <SecondaryNav
              items={secondaryNav.items}
              activeId={secondaryNav.activeId}
              onItemChange={secondaryNav.onItemChange}
              maxWidth={maxWidthClass}
            />
          ) : undefined
        }
        footer={footer}
        swissGridSpacing
        contentMaxWidth={maxWidthClass}
      >
        {children}
      </PageLayout>

      {/* Customizer - Swiss Grid: sticky overlay, bottom right */}
      {showCustomizer && <CustomizerPanel />}
    </>
  );
}
