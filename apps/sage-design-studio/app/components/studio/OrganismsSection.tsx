'use client';

import { useState, useEffect } from 'react';
import { Card, Button, Header, SecondaryNav, TertiaryNav, Footer, Modal, ToastProvider, useToast } from '@ecosystem/design-system';

type OrganismType = 'PrimaryNav' | 'FirstStack' | 'SecondStack' | 'Footer' | 'Toast' | 'Modal';

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

      if (['PrimaryNav', 'FirstStack', 'SecondStack', 'Footer', 'Toast', 'Modal'].includes(organismName)) {
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
        onItemChange={(id) => setSelectedOrganism(id as OrganismType)}
      />

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
                  <li><code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">--font-header-logo</code> - Controls logo/brand font</li>
                  <li><code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">--font-header-nav</code> - Controls navigation link font</li>
                  <li>Define these CSS variables in your globals.css for ecosystem-wide control</li>
                  <li>Logo font applied via inline styles on the logo ReactNode</li>
                  <li>Nav font automatically applied by the Header component</li>
                </ul>
              </div>
              <div className="mt-4 p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-muted)]">
                  <strong>Single Source of Truth:</strong> Typography is controlled by CSS variables, not props. Change <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">--font-header-logo</code> and <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">--font-header-nav</code> in globals.css to update all Header instances across your ecosystem.
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
                  <li><code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">top-0</code> - Sticks to top of viewport</li>
                  <li><code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">z-50</code> - Highest layer for primary navigation</li>
                  <li><code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">h-16 lg:h-20</code> - Height: 64px mobile, 80px desktop</li>
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
                  <strong>Pattern:</strong> The SecondaryNav uses <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">top-16 lg:top-20</code> to position exactly below the Header's height (h-16 lg:h-20), creating a seamless stacked sticky navigation pattern.
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
                  <li><strong>Primary Nav:</strong> <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">top-0</code>, <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">z-50</code>, <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">h-16 lg:h-20</code></li>
                  <li><strong>1st Stacking Row:</strong> <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">top-16 lg:top-20</code>, <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">z-40</code>, <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">h-16</code></li>
                </ul>
              </div>
              <div className="mt-4 p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-muted)]">
                  <strong>Positioning Math:</strong> The 1st Stacking Row's <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">top</code> value equals the Primary Nav's height (64px mobile, 80px desktop).
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
                  <strong>Pattern:</strong> The TertiaryNav uses <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">top-32 lg:top-36</code> to position below both Header (64/80px) and SecondaryNav (64px), creating a triple-stack sticky navigation pattern.
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
                  <li><strong>Primary Nav:</strong> <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">top-0</code>, <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">z-50</code>, <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">h-16 lg:h-20</code></li>
                  <li><strong>1st Stacking Row:</strong> <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">top-16 lg:top-20</code>, <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">z-40</code>, <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">h-16</code></li>
                  <li><strong>2nd Stacking Row:</strong> <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">top-32 lg:top-36</code>, <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">z-30</code>, <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">h-14</code></li>
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
                  <strong>Positioning Math:</strong> The 2nd Stacking Row's <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">top</code> value equals Primary Nav height (64/80px) + 1st Stacking Row height (64px) = 128px mobile, 144px desktop.
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
            <pre className="text-sm text-[var(--color-text-secondary)] overflow-x-auto">
              <code>{`<Footer
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
/>`}</code>
            </pre>
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
                  <li><strong>Brand Section:</strong> <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">lg:col-span-4</code> - Takes 4 of 12 columns (33%)</li>
                  <li><strong>Navigation Sections:</strong> <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">lg:col-span-2</code> - Each takes 2 of 12 columns (16.6%)</li>
                  <li><strong>Social Links:</strong> <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">lg:col-span-2</code> - Takes remaining 2 columns (16.6%)</li>
                </ul>
              </div>
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Spacing (8px base units):</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">py-16 sm:py-20 lg:py-24</code> - Vertical padding: 128/160/192px (16/20/24 units)</li>
                  <li><code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">gap-12 lg:gap-8</code> - Column gaps: 96px mobile, 64px desktop (12/8 units)</li>
                  <li><code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">mb-6</code> - Logo margin: 48px (6 units)</li>
                  <li><code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">mb-4</code> - Section title margin: 32px (4 units)</li>
                  <li><code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">space-y-3</code> - Link spacing: 24px (3 units)</li>
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
                  <strong>Icon Integration:</strong> The GitHubIcon uses <code className="px-1 py-0.5 bg-[var(--color-background)] rounded text-[var(--color-primary)]">currentColor</code> to automatically adapt to light/dark modes and inherits the link's hover color.
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
            <pre className="text-sm text-[var(--color-text-secondary)] overflow-x-auto">
              <code>{`// Wrap your app with ToastProvider
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
}`}</code>
            </pre>
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
            <pre className="text-sm text-[var(--color-text-secondary)] overflow-x-auto">
              <code>{`function MyComponent() {
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
}`}</code>
            </pre>
          </Card>
        </div>
        </section>
      )}
    </div>
  );
}
