'use client';

import { useState, useEffect } from 'react';
import { Card, Button, Header, SecondaryNav, TertiaryNav, Footer, Modal, ToastProvider, useToast, CollapsibleCodeBlock, Code } from '@ecosystem/design-system';
import type { SyntaxToken } from '@ecosystem/design-system';

type OrganismType = 'PrimaryNav' | 'FirstStack' | 'SecondStack' | 'Footer' | 'Toast' | 'Modal' | 'CollapsibleCodeBlock';

interface OrganismsSectionProps {
  activeItemId?: string;
}

function ToastDemo() {
  const { toast } = useToast();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button
          variant="primary"
          size="sm"
          onClick={() => toast('Operation successful!', 'success')}
        >
          Success Toast
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => toast('Something went wrong', 'error')}
        >
          Error Toast
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toast('Please be careful', 'warning')}
        >
          Warning Toast
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => toast('Here is some information', 'info')}
        >
          Info Toast
        </Button>
      </div>
    </div>
  );
}

function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button variant="primary" size="sm" onClick={() => { setSize('sm'); setIsOpen(true); }}>
          Small Modal
        </Button>
        <Button variant="primary" size="sm" onClick={() => { setSize('md'); setIsOpen(true); }}>
          Medium Modal
        </Button>
        <Button variant="primary" size="sm" onClick={() => { setSize('lg'); setIsOpen(true); }}>
          Large Modal
        </Button>
        <Button variant="primary" size="sm" onClick={() => { setSize('xl'); setIsOpen(true); }}>
          XL Modal
        </Button>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`${size.toUpperCase()} Modal Example`}
        size={size}
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>Confirm</Button>
          </>
        }
      >
        <p className="text-[var(--color-text-secondary)]">
          This is a {size} sized modal. It demonstrates the modal component with title, content, and footer actions.
          Modals are useful for focused interactions that require user attention.
        </p>
      </Modal>
    </div>
  );
}

export function OrganismsSection({ activeItemId }: OrganismsSectionProps) {
  const [selectedOrganism, setSelectedOrganism] = useState<OrganismType>('PrimaryNav');

  // Update selected organism when activeItemId changes
  useEffect(() => {
    if (activeItemId) {
      // Map kebab-case ids to PascalCase names
      // e.g., 'primary-nav' -> 'PrimaryNav', 'first-stack' -> 'FirstStack'
      const organismName = activeItemId
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('') as OrganismType;

      if (['PrimaryNav', 'FirstStack', 'SecondStack', 'Footer', 'Toast', 'Modal', 'CollapsibleCodeBlock'].includes(organismName)) {
        setSelectedOrganism(organismName);
      }
    }
  }, [activeItemId]);

  const organisms = [
    { id: 'PrimaryNav', label: 'Primary Nav' },
    { id: 'FirstStack', label: '1st Stacking Row' },
    { id: 'SecondStack', label: '2nd Stacking Row' },
    { id: 'Footer', label: 'Footer' },
    { id: 'Toast', label: 'Toast' },
    { id: 'Modal', label: 'Modal' },
    { id: 'CollapsibleCodeBlock', label: 'Code Block' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-[var(--color-text-primary)]">
          Organisms
        </h2>
        <p className="text-lg text-[var(--color-text-secondary)] mb-2">
          <strong>Distinct Sections:</strong> Complex compositions of molecules and/or atoms that form a discrete, functional section of an interface. Often manage state or layout for children.
        </p>
        <p className="text-base text-[var(--color-text-muted)]">
          Comprehensive, interactive sections that compose multiple components together.
        </p>
      </div>

      {/* Sticky Tertiary Navigation for Organism Selector */}
      <div className="sticky top-0 z-10 bg-[var(--color-background)] pb-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mb-4">
        <TertiaryNav
          items={organisms}
          activeId={selectedOrganism}
          onItemChange={(id) => setSelectedOrganism(id as OrganismType)}
        />
      </div>

      {/* Organism Display with spacing for sticky nav */}
      <div className="mt-4">
        {/* Primary Nav Component */}
        {selectedOrganism === 'PrimaryNav' && (
        <section className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
            Primary Nav
          </h3>
          <Card className="p-6">
            <p className="text-[var(--color-text-primary)] mb-4">
              Sticky navigation header with glass morphism on scroll. Includes responsive mobile menu with full-screen overlay.
            </p>
            <div className="space-y-4">
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Key Features:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Dropdown menus with hover (desktop) and tap-to-expand (mobile) support</li>
                  <li>Active state indicator with underline (desktop) and primary color (mobile)</li>
                  <li>Sticky positioning with optional glass morphism effect on scroll</li>
                  <li>Responsive mobile menu with hamburger toggle</li>
                  <li>Full-screen mobile overlay navigation</li>
                  <li>Respects motion preferences (prefers-reduced-motion)</li>
                  <li>Keyboard accessible with focus indicators and aria-current</li>
                  <li>Theme-aware colors using CSS custom properties</li>
                </ul>
              </div>
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Typography Customization:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><Code syntax="plain">--font-header-logo</Code> - Controls logo/brand font</li>
                  <li><Code syntax="plain">--font-header-nav</Code> - Controls navigation link font</li>
                  <li>Define these CSS variables in your globals.css for ecosystem-wide control</li>
                  <li>Logo font applied via inline styles on the logo ReactNode</li>
                  <li>Nav font automatically applied by the Header component</li>
                </ul>
              </div>
              <div className="mt-4 p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-muted)]">
                  <strong>Single Source of Truth:</strong> Typography is controlled by CSS variables, not props. Change <Code syntax="plain">--font-header-logo</Code> and <Code syntax="plain">--font-header-nav</Code> in globals.css to update all Header instances across your ecosystem.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Live Example */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Live Example
          </h4>
          <Card className="p-0 overflow-hidden bg-[var(--color-background)]">
            <Header
              logo={
                <a href="/" className="font-semibold text-lg" style={{ fontFamily: 'var(--font-header-logo)' }}>
                  Brand
                </a>
              }
              navLinks={[
                { label: 'Features', href: '/features' },
                {
                  label: 'Products',
                  active: true,
                  children: [
                    { label: 'Product A', href: '/products/a' },
                    { label: 'Product B', href: '/products/b', active: true },
                    { label: 'Product C', href: '/products/c' },
                  ]
                },
                { label: 'About', href: '/about' },
              ]}
              actions={
                <>
                  <a href="/signin">Sign In</a>
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </>
              }
              glassOnScroll={false}
              sticky={false}
            />
          </Card>
        </div>

        {/* Code Example */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Code Example
          </h4>
          <Card className="p-6 bg-[var(--color-surface)]">
            <Code inline={false} syntax="plain">{`<Header
  logo={
    <a href="/" className="font-semibold text-lg">
      Brand
    </a>
  }
  navLinks={[
    { label: 'Features', href: '/features' },
    {
      label: 'Products',
      active: true,
      children: [
        { label: 'Product A', href: '/products/a' },
        { label: 'Product B', href: '/products/b', active: true },
        { label: 'Product C', href: '/products/c' },
      ]
    },
    { label: 'About', href: '/about' },
  ]}
  actions={
    <>
      <a href="/signin">Sign In</a>
      <Button variant="primary" size="sm">
        Get Started
      </Button>
    </>
  }
  glassOnScroll={true}
  sticky={true}
/>`}</Code>
          </Card>
        </div>

        {/* Single-Stack Behavior */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Single-Stack Behavior
          </h4>
          <Card className="p-6">
            <p className="text-[var(--color-text-primary)] mb-4">
              The Primary Nav uses sticky positioning to remain at the top of the viewport during scroll.
            </p>
            <div className="space-y-4">
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Positioning:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><Code syntax="plain">top-0</Code> - Sticks to top of viewport</li>
                  <li><Code syntax="plain">z-50</Code> - Highest layer for primary navigation</li>
                  <li><Code syntax="plain">h-16 lg:h-20</Code> - Height: 64px mobile, 80px desktop</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
        </section>
      )}

      {/* 1st Stacking Row Component */}
      {selectedOrganism === 'FirstStack' && (
        <section className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
            1st Stacking Row
          </h3>
          <Card className="p-6">
            <p className="text-[var(--color-text-primary)] mb-4">
              Secondary navigation that stacks below the primary header. Creates a double-stack pattern for section/tab navigation within a page.
            </p>
            <div className="space-y-4">
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Key Features:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Sticky positioning below primary header (top-16 lg:top-20)</li>
                  <li>Z-index coordination (z-40, below header's z-50)</li>
                  <li>Glass morphism with backdrop blur</li>
                  <li>Horizontal scrollable on mobile</li>
                  <li>Active state with primary color background</li>
                  <li>Keyboard accessible with focus indicators</li>
                  <li>Theme-aware colors using CSS custom properties</li>
                </ul>
              </div>
              <div className="mt-4 p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-muted)]">
                  <strong>Pattern:</strong> The SecondaryNav uses <Code syntax="plain">top-16 lg:top-20</Code> to position exactly below the Header's height (h-16 lg:h-20), creating a seamless stacked sticky navigation pattern.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Live Example */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Live Example
          </h4>
          <Card className="p-0 overflow-hidden bg-[var(--color-background)]">
            <SecondaryNav
              items={[
                { id: 'overview', label: 'Overview' },
                { id: 'details', label: 'Details' },
                { id: 'settings', label: 'Settings' },
                { id: 'advanced', label: 'Advanced' },
              ]}
              activeId="details"
              onItemChange={() => {}}
            />
          </Card>
        </div>

        {/* Code Example */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Code Example
          </h4>
          <Card className="p-6 bg-[var(--color-surface)]">
            <Code inline={false} syntax="plain">{`const [activeSection, setActiveSection] = useState('overview');

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Details' },
  { id: 'settings', label: 'Settings' },
];

<SecondaryNav
  items={sections}
  activeId={activeSection}
  onItemChange={setActiveSection}
/>`}</Code>
          </Card>
        </div>

        {/* 1st Stacking Row Behavior */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            1st Stacking Row Behavior
          </h4>
          <Card className="p-6">
            <p className="text-[var(--color-text-primary)] mb-4">
              Creates a double-stack pattern by positioning below the Primary Nav. Both levels remain sticky during scroll.
            </p>
            <div className="space-y-4">
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Stack Configuration:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><strong>Primary Nav:</strong> <Code syntax="plain">top-0</Code>, <Code syntax="plain">z-50</Code>, <Code syntax="plain">h-16 lg:h-20</Code></li>
                  <li><strong>1st Stacking Row:</strong> <Code syntax="plain">top-16 lg:top-20</Code>, <Code syntax="plain">z-40</Code>, <Code syntax="plain">h-16</Code></li>
                </ul>
              </div>
              <div className="mt-4 p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-muted)]">
                  <strong>Positioning Math:</strong> The 1st Stacking Row's <Code syntax="plain">top</Code> value equals the Primary Nav's height (64px mobile, 80px desktop).
                </p>
              </div>
            </div>
          </Card>
        </div>
        </section>
      )}

      {/* 2nd Stacking Row Component */}
      {selectedOrganism === 'SecondStack' && (
        <section className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
            2nd Stacking Row
          </h3>
          <Card className="p-6">
            <p className="text-[var(--color-text-primary)] mb-4">
              Third navigation level that stacks below the 1st Stacking Row. Creates a triple-stack pattern for component selectors or sub-section navigation.
            </p>
            <div className="space-y-4">
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Key Features:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Sticky positioning below SecondaryNav (top-32 lg:top-36)</li>
                  <li>Z-index coordination (z-30, below SecondaryNav's z-40)</li>
                  <li>Lighter background for visual hierarchy</li>
                  <li>Smaller padding and text for visual subordination</li>
                  <li>Horizontal scrollable on all screen sizes</li>
                  <li>Active state with primary color background</li>
                  <li>Keyboard accessible with focus indicators</li>
                  <li>Theme-aware colors using CSS custom properties</li>
                </ul>
              </div>
              <div className="mt-4 p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-muted)]">
                  <strong>Pattern:</strong> The TertiaryNav uses <Code syntax="plain">top-32 lg:top-36</Code> to position below both Header (64/80px) and SecondaryNav (64px), creating a triple-stack sticky navigation pattern.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Live Example */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Live Example
          </h4>
          <Card className="p-0 overflow-hidden bg-[var(--color-background)]">
            <TertiaryNav
              items={[
                { id: 'button', label: 'Button' },
                { id: 'card', label: 'Card' },
                { id: 'link', label: 'Link' },
                { id: 'input', label: 'Input' },
                { id: 'select', label: 'Select' },
                { id: 'checkbox', label: 'Checkbox' },
              ]}
              activeId="card"
              onItemChange={() => {}}
            />
          </Card>
        </div>

        {/* Code Example */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Code Example
          </h4>
          <Card className="p-6 bg-[var(--color-surface)]">
            <Code inline={false} syntax="plain">{`const [activeComponent, setActiveComponent] = useState('button');

const components = [
  { id: 'button', label: 'Button' },
  { id: 'card', label: 'Card' },
  { id: 'link', label: 'Link' },
];

<TertiaryNav
  items={components}
  activeId={activeComponent}
  onItemChange={setActiveComponent}
/>`}</Code>
          </Card>
        </div>

        {/* 2nd Stacking Row Behavior */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            2nd Stacking Row Behavior
          </h4>
          <Card className="p-6">
            <p className="text-[var(--color-text-primary)] mb-4">
              Creates a triple-stack pattern by positioning below both the Primary Nav and 1st Stacking Row. All three levels remain sticky during scroll.
            </p>
            <div className="space-y-4">
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Stack Configuration:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><strong>Primary Nav:</strong> <Code syntax="plain">top-0</Code>, <Code syntax="plain">z-50</Code>, <Code syntax="plain">h-16 lg:h-20</Code></li>
                  <li><strong>1st Stacking Row:</strong> <Code syntax="plain">top-16 lg:top-20</Code>, <Code syntax="plain">z-40</Code>, <Code syntax="plain">h-16</Code></li>
                  <li><strong>2nd Stacking Row:</strong> <Code syntax="plain">top-32 lg:top-36</Code>, <Code syntax="plain">z-30</Code>, <Code syntax="plain">h-14</Code></li>
                </ul>
              </div>
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Visual Hierarchy:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Each level has decreasing z-index for proper layering</li>
                  <li>Background opacity decreases across layers for visual depth</li>
                  <li>Padding and text size decrease to show visual subordination</li>
                </ul>
              </div>
              <div className="mt-4 p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-muted)]">
                  <strong>Positioning Math:</strong> The 2nd Stacking Row's <Code syntax="plain">top</Code> value equals Primary Nav height (64/80px) + 1st Stacking Row height (64px) = 128px mobile, 144px desktop.
                </p>
              </div>
            </div>
          </Card>
        </div>
        </section>
      )}

      {/* Footer Component */}
      {selectedOrganism === 'Footer' && (
        <section className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
            Footer
          </h3>
          <Card className="p-6">
            <p className="text-[var(--color-text-primary)] mb-4">
              Swiss Grid-inspired footer organism with multi-column layout, social links with icons, and organized content sections. Designed following Swiss design principles with precise spacing and clean typography.
            </p>
            <div className="space-y-4">
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Key Features:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Swiss Grid design with 8px base unit spacing system</li>
                  <li>Responsive multi-column layout (1 col mobile, 2 cols tablet, 12-col grid desktop)</li>
                  <li>Organized content sections with clear typographic hierarchy</li>
                  <li>Social links with integrated GitHub icon</li>
                  <li>Generous whitespace for breathing room</li>
                  <li>Grid-based layout with precise alignment</li>
                  <li>Minimal, functional aesthetic</li>
                  <li>Theme-aware colors using CSS custom properties</li>
                  <li>Separated top content area and bottom copyright bar</li>
                </ul>
              </div>
              <div className="mt-4 p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-muted)]">
                  <strong>Swiss Grid Principles:</strong> The Footer uses an 8px base spacing unit (py-16 sm:py-20 lg:py-24 = 128/160/192px) and a 12-column grid system on large screens for precise, structured layouts.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Live Example */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Live Example
          </h4>
          <Card className="p-0 overflow-hidden bg-[var(--color-background)]">
            <Footer
              logo="My Brand"
              sections={[
                {
                  title: 'Work',
                  links: [
                    { label: 'Portfolio', href: '/portfolio' },
                    { label: 'Case Studies', href: '/case-studies' },
                    { label: 'Resume', href: '/resume.pdf', external: true },
                  ],
                },
                {
                  title: 'Play',
                  links: [
                    { label: 'Creative Sandbox', href: '/sandbox', external: true },
                    { label: 'Blog', href: '/blog' },
                    { label: 'Poetry', href: '/poetry' },
                  ],
                },
                {
                  title: 'Tools',
                  links: [
                    { label: 'Design Studio', href: '/studio' },
                    { label: 'Component Library', href: '/components' },
                  ],
                },
              ]}
              socialLinks={{
                github: 'https://github.com/example',
                linkedin: 'https://linkedin.com/in/example',
                email: 'hello@example.com',
              }}
              copyright="© 2025 Example Brand"
            />
          </Card>
        </div>

        {/* Code Example */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Code Example
          </h4>
          <Card className="p-6 bg-[var(--color-surface)]">
            <Code inline={false} syntax="plain">{`<Footer
  logo="My Brand"
  sections={[
    {
      title: 'Work',
      links: [
        { label: 'Portfolio', href: '/portfolio' },
        { label: 'Case Studies', href: '/case-studies' },
        { label: 'Resume', href: '/resume.pdf', external: true },
      ],
    },
    {
      title: 'Play',
      links: [
        { label: 'Creative Sandbox', href: '/sandbox', external: true },
        { label: 'Blog', href: '/blog' },
        { label: 'Poetry', href: '/poetry' },
      ],
    },
    {
      title: 'Tools',
      links: [
        { label: 'Design Studio', href: '/studio' },
        { label: 'Component Library', href: '/components' },
      ],
    },
  ]}
  socialLinks={{
    github: 'https://github.com/example',
    linkedin: 'https://linkedin.com/in/example',
    email: 'hello@example.com',
  }}
  copyright="© 2025 Example Brand"
/>`}</Code>
          </Card>
        </div>

        {/* Swiss Grid Layout */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Swiss Grid Layout
          </h4>
          <Card className="p-6">
            <p className="text-[var(--color-text-primary)] mb-4">
              The Footer employs a precise 12-column grid system on desktop, with responsive behavior across breakpoints.
            </p>
            <div className="space-y-4">
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Grid Configuration:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><strong>Brand Section:</strong> <Code syntax="plain">lg:col-span-4</Code> - Takes 4 of 12 columns (33%)</li>
                  <li><strong>Navigation Sections:</strong> <Code syntax="plain">lg:col-span-2</Code> - Each takes 2 of 12 columns (16.6%)</li>
                  <li><strong>Social Links:</strong> <Code syntax="plain">lg:col-span-2</Code> - Takes remaining 2 columns (16.6%)</li>
                </ul>
              </div>
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Spacing (8px base units):</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><Code syntax="plain">py-16 sm:py-20 lg:py-24</Code> - Vertical padding: 128/160/192px (16/20/24 units)</li>
                  <li><Code syntax="plain">gap-12 lg:gap-8</Code> - Column gaps: 96px mobile, 64px desktop (12/8 units)</li>
                  <li><Code syntax="plain">mb-6</Code> - Logo margin: 48px (6 units)</li>
                  <li><Code syntax="plain">mb-4</Code> - Section title margin: 32px (4 units)</li>
                  <li><Code syntax="plain">space-y-3</Code> - Link spacing: 24px (3 units)</li>
                </ul>
              </div>
              <div className="mt-4 p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-muted)]">
                  <strong>Design Philosophy:</strong> Every spacing value is a multiple of 8px, creating a consistent vertical and horizontal rhythm. The grid ensures precise alignment and professional appearance across all screen sizes.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Social Links Integration */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Social Links with Icons
          </h4>
          <Card className="p-6">
            <p className="text-[var(--color-text-primary)] mb-4">
              The Footer includes integrated icon support for social links, with the GitHub icon automatically displayed alongside the GitHub link.
            </p>
            <div className="space-y-4">
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Supported Social Links:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><strong>GitHub:</strong> Displays with GitHubIcon component (size 16)</li>
                  <li><strong>LinkedIn:</strong> Text-only link</li>
                  <li><strong>Email:</strong> Mailto link</li>
                </ul>
              </div>
              <div className="mt-4 p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-muted)]">
                  <strong>Icon Integration:</strong> The GitHubIcon uses <Code syntax="plain">currentColor</Code> to automatically adapt to light/dark modes and inherits the link's hover color.
                </p>
              </div>
            </div>
          </Card>
        </div>
        </section>
      )}

      {/* Toast Component */}
      {selectedOrganism === 'Toast' && (
        <section className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
            Toast
          </h3>
          <Card className="p-6">
            <p className="text-[var(--color-text-primary)] mb-4">
              Temporary notification messages that appear at the edge of the screen. Toasts auto-dismiss after a configurable duration and support multiple types.
            </p>
            <div className="space-y-4">
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Key Features:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Four semantic types: success, error, warning, info</li>
                  <li>Auto-dismiss with configurable duration</li>
                  <li>Stacks multiple toasts with max limit</li>
                  <li>Six position options (corners and centers)</li>
                  <li>Respects motion preferences for animations</li>
                  <li>Accessible with ARIA live regions</li>
                  <li>Theme-aware colors</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Live Example */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Live Example
          </h4>
          <Card className="p-6">
            <ToastDemo />
          </Card>
        </div>

        {/* Code Example */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Code Example
          </h4>
          <Card className="p-6 bg-[var(--color-surface)]">
            <Code inline={false} syntax="plain">{`// Wrap your app with ToastProvider
<ToastProvider position="bottom-right" maxToasts={3}>
  <App />
</ToastProvider>

// Use the toast hook in any component
function MyComponent() {
  const { toast } = useToast();

  return (
    <Button onClick={() => toast('Saved!', 'success')}>
      Save
    </Button>
  );
}`}</Code>
          </Card>
        </div>
        </section>
      )}

      {/* Modal Component */}
      {selectedOrganism === 'Modal' && (
        <section className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
            Modal
          </h3>
          <Card className="p-6">
            <p className="text-[var(--color-text-primary)] mb-4">
              A dialog overlay for focused user interactions that require attention. Modals block the main content and trap focus until dismissed.
            </p>
            <div className="space-y-4">
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Key Features:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Five size variants: sm, md, lg, xl, full</li>
                  <li>Optional title and footer sections</li>
                  <li>Click outside to close (configurable)</li>
                  <li>Escape key to close (configurable)</li>
                  <li>Focus trap for keyboard navigation</li>
                  <li>Blocks body scroll when open</li>
                  <li>Smooth animations with motion preferences</li>
                  <li>Theme-aware styling</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Live Example */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Live Example
          </h4>
          <Card className="p-6">
            <ModalDemo />
          </Card>
        </div>

        {/* Code Example */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Code Example
          </h4>
          <Card className="p-6 bg-[var(--color-surface)]">
            <Code inline={false} syntax="plain">{`function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>
              Confirm
            </Button>
          </>
        }
      >
        <p>Are you sure you want to proceed?</p>
      </Modal>
    </>
  );
}`}</Code>
          </Card>
        </div>
        </section>
        )}

      {/* CollapsibleCodeBlock Component */}
      {selectedOrganism === 'CollapsibleCodeBlock' && (
        <section className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
            CollapsibleCodeBlock
          </h3>
          <Card className="p-6">
            <p className="text-[var(--color-text-primary)] mb-4">
              A reusable code block component with syntax highlighting, smooth expand/collapse animations, and copy functionality. Perfect for documentation and code examples.
            </p>
            <div className="space-y-4">
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Key Features:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Smooth spring animation with cubic-bezier easing</li>
                  <li>Theme-aware syntax highlighting (light/dark mode)</li>
                  <li>Copy to clipboard functionality</li>
                  <li>Preview mode showing first 3 lines when collapsed</li>
                  <li>Gradient overlay for collapsed state</li>
                  <li>Supports both string and tokenized code input</li>
                  <li>Respects motion preferences</li>
                  <li>Fully accessible with ARIA attributes</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Live Example */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Live Example
          </h4>
          <Card className="p-6">
            <CollapsibleCodeBlock
              id="live-example"
              title="TypeScript Component Example"
              code={[
                { text: 'import', type: 'keyword' },
                { text: ' { ', type: 'plain' },
                { text: 'useState', type: 'className' },
                { text: ' } ', type: 'plain' },
                { text: 'from', type: 'keyword' },
                { text: ' ', type: 'plain' },
                { text: "'react'", type: 'string' },
                { text: ';', type: 'punctuation' },
                { text: '\n\n', type: 'plain' },
                { text: 'interface', type: 'keyword' },
                { text: ' ', type: 'plain' },
                { text: 'ButtonProps', type: 'className' },
                { text: ' {', type: 'punctuation' },
                { text: '\n  ', type: 'plain' },
                { text: 'variant', type: 'property' },
                { text: '?: ', type: 'punctuation' },
                { text: "'primary'", type: 'string' },
                { text: ' | ', type: 'operator' },
                { text: "'secondary'", type: 'string' },
                { text: ';', type: 'punctuation' },
                { text: '\n  ', type: 'plain' },
                { text: 'onClick', type: 'property' },
                { text: '?: () => ', type: 'punctuation' },
                { text: 'void', type: 'keyword' },
                { text: ';', type: 'punctuation' },
                { text: '\n}', type: 'punctuation' },
                { text: '\n\n', type: 'plain' },
                { text: 'export', type: 'keyword' },
                { text: ' ', type: 'plain' },
                { text: 'function', type: 'keyword' },
                { text: ' ', type: 'plain' },
                { text: 'Button', type: 'function' },
                { text: '(', type: 'punctuation' },
                { text: '{ ', type: 'punctuation' },
                { text: 'variant', type: 'variable' },
                { text: ', ', type: 'punctuation' },
                { text: 'onClick', type: 'variable' },
                { text: ' }', type: 'punctuation' },
                { text: ': ', type: 'punctuation' },
                { text: 'ButtonProps', type: 'className' },
                { text: ') {', type: 'punctuation' },
                { text: '\n  ', type: 'plain' },
                { text: 'const', type: 'keyword' },
                { text: ' [', type: 'punctuation' },
                { text: 'isActive', type: 'variable' },
                { text: ', ', type: 'punctuation' },
                { text: 'setIsActive', type: 'variable' },
                { text: '] = ', type: 'punctuation' },
                { text: 'useState', type: 'function' },
                { text: '(', type: 'punctuation' },
                { text: 'false', type: 'boolean' },
                { text: ');', type: 'punctuation' },
                { text: '\n  ', type: 'plain' },
                { text: 'return', type: 'keyword' },
                { text: ' <', type: 'tag' },
                { text: 'button', type: 'tag' },
                { text: ' ', type: 'plain' },
                { text: 'onClick', type: 'attribute' },
                { text: '={', type: 'punctuation' },
                { text: 'onClick', type: 'variable' },
                { text: '}>', type: 'tag' },
                { text: 'Click', type: 'plain' },
                { text: '</button>', type: 'tag' },
                { text: ';', type: 'punctuation' },
                { text: '\n}', type: 'punctuation' },
              ]}
              showCopy={true}
            />
          </Card>
        </div>

        {/* CSS Styling Example */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            CSS Styling Example
          </h4>
          <Card className="p-6">
            <CollapsibleCodeBlock
              id="css-example"
              title="CSS Styling with Design Tokens"
              code={[
                { text: '.', type: 'punctuation' },
                { text: 'button', type: 'className' },
                { text: ' {', type: 'punctuation' },
                { text: '\n  ', type: 'plain' },
                { text: 'padding', type: 'property' },
                { text: ': ', type: 'punctuation' },
                { text: '12px 24px', type: 'plain' },
                { text: ';', type: 'punctuation' },
                { text: '\n  ', type: 'plain' },
                { text: 'background', type: 'property' },
                { text: ': ', type: 'punctuation' },
                { text: 'var(--color-primary)', type: 'function' },
                { text: ';', type: 'punctuation' },
                { text: '\n  ', type: 'plain' },
                { text: 'color', type: 'property' },
                { text: ': ', type: 'punctuation' },
                { text: 'var(--color-primary-foreground)', type: 'function' },
                { text: ';', type: 'punctuation' },
                { text: '\n  ', type: 'plain' },
                { text: 'border-radius', type: 'property' },
                { text: ': ', type: 'punctuation' },
                { text: '8px', type: 'plain' },
                { text: ';', type: 'punctuation' },
                { text: '\n  ', type: 'plain' },
                { text: 'transition', type: 'property' },
                { text: ': ', type: 'punctuation' },
                { text: 'all ', type: 'plain' },
                { text: '0.2s', type: 'plain' },
                { text: ' ease', type: 'plain' },
                { text: ';', type: 'punctuation' },
                { text: '\n}', type: 'punctuation' },
                { text: '\n\n', type: 'plain' },
                { text: '.', type: 'punctuation' },
                { text: 'button', type: 'className' },
                { text: ':', type: 'punctuation' },
                { text: 'hover', type: 'tag' },
                { text: ' {', type: 'punctuation' },
                { text: '\n  ', type: 'plain' },
                { text: 'transform', type: 'property' },
                { text: ': ', type: 'punctuation' },
                { text: 'scale(', type: 'function' },
                { text: '1.05', type: 'number' },
                { text: ')', type: 'punctuation' },
                { text: ';', type: 'punctuation' },
                { text: '\n  ', type: 'plain' },
                { text: 'box-shadow', type: 'property' },
                { text: ': ', type: 'punctuation' },
                { text: '0 4px 12px rgba(0, 0, 0, 0.1)', type: 'plain' },
                { text: ';', type: 'punctuation' },
                { text: '\n}', type: 'punctuation' },
              ]}
              showCopy={true}
            />
          </Card>
        </div>

        {/* Code Example */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Usage Example
          </h4>
          <Card className="p-6 bg-[var(--color-surface)]">
            <Code inline={false} syntax="plain">{`import { CollapsibleCodeBlock } from '@ecosystem/design-system';
import type { SyntaxToken } from '@ecosystem/design-system';

// With tokenized syntax highlighting
const codeTokens: SyntaxToken[] = [
  { text: 'const', type: 'keyword' },
  { text: ' example ', type: 'plain' },
  { text: '=', type: 'operator' },
  { text: ' "Hello"', type: 'string' },
];

<CollapsibleCodeBlock
  id="my-code"
  title="Example Code"
  code={codeTokens}
  showCopy={true}
/>

// With plain string
<CollapsibleCodeBlock
  id="simple-code"
  code="const example = 'Hello World';"
  showCopy={true}
  defaultCollapsed={false}
/>`}</Code>
          </Card>
        </div>

        {/* Props Reference */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Props Reference
          </h4>
          <Card className="p-6">
            <div className="space-y-4">
              <div className="p-4 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <Code syntax="plain">id: string</Code>
                <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                  Required. Unique identifier for the code block (used for animation control).
                </p>
              </div>
              <div className="p-4 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <Code syntax="plain">code: string | SyntaxToken[]</Code>
                <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                  Required. The code to display - can be a plain string or array of syntax tokens for highlighting.
                </p>
              </div>
              <div className="p-4 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <Code syntax="plain">title?: string</Code>
                <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                  Optional. Title/label displayed above the code block.
                </p>
              </div>
              <div className="p-4 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <Code syntax="plain">showCopy?: boolean</Code>
                <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                  Optional. Show/hide the copy button. Default: true.
                </p>
              </div>
              <div className="p-4 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <Code syntax="plain">defaultCollapsed?: boolean</Code>
                <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                  Optional. Initial collapsed state. Default: true.
                </p>
              </div>
              <div className="p-4 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <Code syntax="plain">language?: string</Code>
                <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                  Optional. Language identifier (e.g., 'typescript', 'css', 'html').
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* SyntaxToken Types */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            SyntaxToken Types
          </h4>
          <Card className="p-6">
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Available token types for syntax highlighting:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {['comment', 'keyword', 'function', 'string', 'number', 'boolean', 'operator', 'property', 'className', 'tag', 'attribute', 'variable', 'punctuation', 'plain'].map((type) => (
                <Code key={type} syntax="plain">
                  {type}
                </Code>
              ))}
            </div>
          </Card>
        </div>

        {/* Animation Details */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Animation Details
          </h4>
          <Card className="p-6">
            <p className="text-[var(--color-text-primary)] mb-4">
              The CollapsibleCodeBlock uses a smooth spring animation that respects user motion preferences.
            </p>
            <div className="space-y-4">
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Animation Properties:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><strong>Duration:</strong> 500ms</li>
                  <li><strong>Easing:</strong> cubic-bezier(0.34, 1.56, 0.64, 1) - Spring bounce</li>
                  <li><strong>Property:</strong> max-height transition</li>
                  <li><strong>Preview Height:</strong> 6.6rem (3 lines of code)</li>
                  <li><strong>Gradient Overlay:</strong> 1.5rem (h-6) from bottom</li>
                </ul>
              </div>
              <div className="mt-4 p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-muted)]">
                  <strong>Accessibility:</strong> The animation respects <Code syntax="plain">prefers-reduced-motion</Code> by skipping animations when users have this preference enabled.
                </p>
              </div>
            </div>
          </Card>
        </div>
        </section>
      )}
      </div>
    </div>
  );
}
