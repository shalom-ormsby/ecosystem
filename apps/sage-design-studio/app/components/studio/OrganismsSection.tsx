'use client';

import { useState } from 'react';
import { Card, Button, Header, SecondaryNav, TertiaryNav } from '@ecosystem/design-system';

export function OrganismsSection() {
  const [selectedOrganism, setSelectedOrganism] = useState<'Header' | 'SecondaryNav' | 'TertiaryNav'>('Header');

  const organisms = [
    { id: 'Header', label: 'Header' },
    { id: 'SecondaryNav', label: 'SecondaryNav' },
    { id: 'TertiaryNav', label: 'TertiaryNav' },
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

      {/* Organism Selector using TertiaryNav */}
      <TertiaryNav
        items={organisms}
        activeId={selectedOrganism}
        onItemChange={(id) => setSelectedOrganism(id as 'Header' | 'SecondaryNav' | 'TertiaryNav')}
      />

      {/* Header Component */}
      {selectedOrganism === 'Header' && (
        <section className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
            Header
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
            </div>
          </Card>
        </div>

        {/* Code Example */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Code Example
          </h4>
          <Card className="p-6 bg-[var(--color-surface)]">
            <pre className="text-sm text-[var(--color-text-secondary)] overflow-x-auto">
              <code>{`<Header
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
/>`}</code>
            </pre>
          </Card>
        </div>
        </section>
      )}

      {/* SecondaryNav Component */}
      {selectedOrganism === 'SecondaryNav' && (
        <section className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
            SecondaryNav
          </h3>
          <Card className="p-6">
            <p className="text-[var(--color-text-primary)] mb-4">
              Secondary sticky navigation designed to sit below a primary sticky header. Commonly used for section/tab navigation within a page.
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
                  <strong>Pattern:</strong> The SecondaryNav uses <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">top-16 lg:top-20</code> to position exactly below the Header's height (h-16 lg:h-20), creating a seamless stacked sticky navigation pattern.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Code Example */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Code Example
          </h4>
          <Card className="p-6 bg-[var(--color-surface)]">
            <pre className="text-sm text-[var(--color-text-secondary)] overflow-x-auto">
              <code>{`const [activeSection, setActiveSection] = useState('overview');

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Details' },
  { id: 'settings', label: 'Settings' },
];

<SecondaryNav
  items={sections}
  activeId={activeSection}
  onItemChange={setActiveSection}
/>`}</code>
            </pre>
          </Card>
        </div>
        </section>
      )}

      {/* TertiaryNav Component */}
      {selectedOrganism === 'TertiaryNav' && (
        <section className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
            TertiaryNav
          </h3>
          <Card className="p-6">
            <p className="text-[var(--color-text-primary)] mb-4">
              Tertiary sticky navigation designed to sit below SecondaryNav in a three-level sticky stack. Commonly used for component selectors or sub-section navigation.
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
                  <strong>Pattern:</strong> The TertiaryNav uses <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">top-32 lg:top-36</code> to position below both Header (64/80px) and SecondaryNav (64px), creating a triple-stack sticky navigation pattern.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Code Example */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Code Example
          </h4>
          <Card className="p-6 bg-[var(--color-surface)]">
            <pre className="text-sm text-[var(--color-text-secondary)] overflow-x-auto">
              <code>{`const [activeComponent, setActiveComponent] = useState('button');

const components = [
  { id: 'button', label: 'Button' },
  { id: 'card', label: 'Card' },
  { id: 'link', label: 'Link' },
];

<TertiaryNav
  items={components}
  activeId={activeComponent}
  onItemChange={setActiveComponent}
/>`}</code>
            </pre>
          </Card>
        </div>
        </section>
      )}

      {/* Triple-Stack Pattern */}
      <section className="space-y-8 mt-12 pt-8 border-t border-[var(--color-border)]">
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
            Triple-Stack Sticky Navigation Pattern
          </h3>
          <Card className="p-6">
            <p className="text-[var(--color-text-primary)] mb-4">
              The triple-stack pattern combines Header, SecondaryNav, and TertiaryNav to create a comprehensive navigation hierarchy. Each level sticks at a precise position to form a seamless navigation experience.
            </p>
            <div className="space-y-4">
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Stack Configuration:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><strong>Header:</strong> <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">top-0</code>, <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">z-50</code>, <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">h-16 lg:h-20</code> (64px / 80px)</li>
                  <li><strong>SecondaryNav:</strong> <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">top-16 lg:top-20</code>, <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">z-40</code>, <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">h-16</code> (64px)</li>
                  <li><strong>TertiaryNav:</strong> <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">top-32 lg:top-36</code>, <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">z-30</code>, <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">h-14</code> (56px)</li>
                </ul>
              </div>
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Visual Hierarchy:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Each level has decreasing z-index for proper layering</li>
                  <li>Background opacity decreases from Header → SecondaryNav → TertiaryNav</li>
                  <li>Padding and text size decrease to show visual subordination</li>
                  <li>Border-bottom on all levels for clear separation</li>
                </ul>
              </div>
              <div className="mt-4 p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-muted)]">
                  <strong>Positioning Math:</strong> Each level's <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">top</code> value equals the sum of all previous heights. For example, TertiaryNav's <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">top-32</code> = Header's 64px + SecondaryNav's 64px = 128px.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Code Example */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Code Example
          </h4>
          <Card className="p-6 bg-[var(--color-surface)]">
            <pre className="text-sm text-[var(--color-text-secondary)] overflow-x-auto">
              <code>{`// Triple-stack sticky navigation
<Header sticky={true} glassOnScroll={true} {...headerProps} />
<SecondaryNav items={sections} activeId={activeSection} onItemChange={setActiveSection} />
<TertiaryNav items={components} activeId={activeComponent} onItemChange={setActiveComponent} />

// Positioning values:
// Header: top-0, z-50, h-16 lg:h-20
// SecondaryNav: top-16 lg:top-20, z-40, h-16
// TertiaryNav: top-32 lg:top-36, z-30, h-14`}</code>
            </pre>
          </Card>
        </div>
      </section>
    </div>
  );
}
