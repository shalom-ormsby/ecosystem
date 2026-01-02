'use client';

import { useState, useEffect } from 'react';
import { Card, Button, Header, SecondaryNav, TertiaryNav, Footer, Modal, ToastProvider, useToast, CollapsibleCodeBlock, Code, CustomizerPanel } from '@ecosystem/design-system';
import type { SyntaxToken } from '@ecosystem/design-system';

type OrganismType = 'PrimaryNav' | 'SecondaryNav' | 'TertiaryNav' | 'FirstStack' | 'SecondStack' | 'Footer' | 'Toast' | 'Modal' | 'CollapsibleCodeBlock' | 'Customizer';

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

      if (['PrimaryNav', 'SecondaryNav', 'TertiaryNav', 'FirstStack', 'SecondStack', 'Footer', 'Toast', 'Modal', 'CollapsibleCodeBlock', 'Customizer'].includes(organismName)) {
        setSelectedOrganism(organismName);
      }
    }
  }, [activeItemId]);

  const organisms = [
    { id: 'PrimaryNav', label: 'Primary Nav' },
    { id: 'SecondaryNav', label: 'Secondary Nav' },
    { id: 'TertiaryNav', label: 'Tertiary Nav' },
    { id: 'FirstStack', label: '1st Stacking Row' },
    { id: 'SecondStack', label: '2nd Stacking Row' },
    { id: 'Footer', label: 'Footer' },
    { id: 'Toast', label: 'Toast' },
    { id: 'Modal', label: 'Modal' },
    { id: 'CollapsibleCodeBlock', label: 'Code Block' },
    { id: 'Customizer', label: 'Customizer' },
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
            <CollapsibleCodeBlock id="org-usage-1" code={`<Header
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
/>`} defaultCollapsed={false} showCopy={true} />
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

      {/* Secondary Nav Component */}
      {selectedOrganism === 'SecondaryNav' && (
        <section className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
            Secondary Nav
          </h3>
          <Card className="p-6">
            <p className="text-[var(--color-text-primary)] mb-4">
              Tab-style navigation component designed to stack below a primary header. Used for section/tab navigation within a page, with sticky positioning that keeps it visible during scroll.
            </p>
            <div className="space-y-4">
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Key Features:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Sticky positioning that automatically stacks below Header component</li>
                  <li>Glass morphism effect with backdrop blur for modern aesthetic</li>
                  <li>Active state highlighting with primary color background</li>
                  <li>Horizontal scrollable on mobile for responsive design</li>
                  <li>Tab-style buttons with smooth transitions</li>
                  <li>Keyboard accessible with focus indicators and aria-current</li>
                  <li>Theme-aware colors using CSS custom properties</li>
                  <li>Z-index coordination (z-40) to sit below Header (z-50)</li>
                </ul>
              </div>
              <div className="mt-4 p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-muted)]">
                  <strong>Sticky Positioning:</strong> Uses <Code syntax="plain">top-16 lg:top-20</Code> to position exactly below the Header's height (h-16 lg:h-20), creating a seamless double-stack navigation pattern. Content scrolls underneath both the Header and SecondaryNav.
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
                { id: 'features', label: 'Features' },
                { id: 'pricing', label: 'Pricing' },
                { id: 'docs', label: 'Documentation' },
                { id: 'support', label: 'Support' },
              ]}
              activeId="features"
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
            <CollapsibleCodeBlock id="secondary-nav-usage" code={`import { SecondaryNav } from '@ecosystem/design-system';
import { useState } from 'react';

function MyPage() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'docs', label: 'Documentation' },
  ];

  return (
    <>
      {/* Primary Header would be here */}
      <SecondaryNav
        items={sections}
        activeId={activeSection}
        onItemChange={setActiveSection}
      />
      {/* Page content scrolls below both headers */}
      <main>
        {/* Content based on activeSection */}
      </main>
    </>
  );
}`} defaultCollapsed={false} showCopy={true} />
          </Card>
        </div>

        {/* Scrolling Behavior */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Sticky Header & Scrolling Behavior
          </h4>
          <Card className="p-6">
            <p className="text-[var(--color-text-primary)] mb-4">
              The SecondaryNav uses sticky positioning to remain visible at the top of the viewport while content scrolls underneath it. It automatically positions itself below the primary header.
            </p>
            <div className="space-y-4">
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>How It Works:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><strong>Sticky Position:</strong> <Code syntax="plain">position: sticky</Code> keeps it visible during scroll</li>
                  <li><strong>Top Offset:</strong> <Code syntax="plain">top-16 lg:top-20</Code> positions it below Header (64px mobile, 80px desktop)</li>
                  <li><strong>Z-Index:</strong> <Code syntax="plain">z-40</Code> ensures it sits above page content but below Header (z-50)</li>
                  <li><strong>Glass Effect:</strong> <Code syntax="plain">backdrop-blur-xl</Code> creates semi-transparent glass morphism</li>
                  <li><strong>Content Flow:</strong> Page content scrolls normally, passing under both headers</li>
                </ul>
              </div>
              <div className="mt-4 p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-muted)]">
                  <strong>Visual Stack:</strong> When scrolling, the visual hierarchy is: Header (top, z-50) → SecondaryNav (middle, z-40) → Page Content (bottom, z-auto). The glass morphism effect on SecondaryNav allows you to see content blurred underneath it as it scrolls.
                </p>
              </div>
            </div>
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
                <Code syntax="plain">items: SecondaryNavItem[]</Code>
                <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                  Required. Array of navigation items with <Code syntax="plain">id</Code> and <Code syntax="plain">label</Code> properties.
                </p>
              </div>
              <div className="p-4 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <Code syntax="plain">activeId: string</Code>
                <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                  Required. The ID of the currently active item.
                </p>
              </div>
              <div className="p-4 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <Code syntax="plain">onItemChange: (id: string) =&gt; void</Code>
                <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                  Required. Callback function called when a navigation item is clicked.
                </p>
              </div>
              <div className="p-4 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <Code syntax="plain">className?: string</Code>
                <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                  Optional. Additional CSS classes for customization.
                </p>
              </div>
            </div>
          </Card>
        </div>
        </section>
      )}

      {/* Tertiary Nav Component */}
      {selectedOrganism === 'TertiaryNav' && (
        <section className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
            Tertiary Nav
          </h3>
          <Card className="p-6">
            <p className="text-[var(--color-text-primary)] mb-4">
              Third-level navigation component designed to stack below SecondaryNav in a triple-stack pattern. Perfect for component selectors, sub-section navigation, or filtering options within a page section.
            </p>
            <div className="space-y-4">
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Key Features:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Triple-stack sticky positioning below both Header and SecondaryNav</li>
                  <li>Lighter background for clear visual hierarchy and depth perception</li>
                  <li>Smaller text and padding to show visual subordination</li>
                  <li>Horizontal scrollable on all screen sizes for many options</li>
                  <li>Active state with primary color background and border styling</li>
                  <li>Keyboard accessible with focus indicators and aria-current</li>
                  <li>Theme-aware colors using CSS custom properties</li>
                  <li>Z-index coordination (z-30) to sit below SecondaryNav (z-40) and Header (z-50)</li>
                </ul>
              </div>
              <div className="mt-4 p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-muted)]">
                  <strong>Triple-Stack Math:</strong> Uses <Code syntax="plain">top-32 lg:top-36</Code> to position below Header (64/80px) + SecondaryNav (64px) = 128px mobile, 144px desktop. This creates a seamless triple-stack where all three navigation levels remain visible during scroll.
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
          <p className="text-sm text-[var(--color-text-secondary)] mb-3">
            See this component in action on the <strong>Components &gt; Atoms</strong> page, where it provides navigation between Button, Card, Code, Link, and other atom components.
          </p>
          <Card className="p-0 overflow-hidden bg-[var(--color-background)]">
            <TertiaryNav
              items={[
                { id: 'button', label: 'Button' },
                { id: 'card', label: 'Card' },
                { id: 'code', label: 'Code' },
                { id: 'link', label: 'Link' },
                { id: 'badge', label: 'Badge' },
                { id: 'avatar', label: 'Avatar' },
                { id: 'spinner', label: 'Spinner' },
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
            <CollapsibleCodeBlock id="tertiary-nav-usage" code={`import { TertiaryNav } from '@ecosystem/design-system';
import { useState } from 'react';

function ComponentSelector() {
  const [activeComponent, setActiveComponent] = useState('button');

  const components = [
    { id: 'button', label: 'Button' },
    { id: 'card', label: 'Card' },
    { id: 'code', label: 'Code' },
    { id: 'link', label: 'Link' },
    { id: 'badge', label: 'Badge' },
  ];

  return (
    <>
      {/* Header and SecondaryNav would be above */}
      <TertiaryNav
        items={components}
        activeId={activeComponent}
        onItemChange={setActiveComponent}
      />
      {/* Component display area */}
      <main>
        {activeComponent === 'button' && <ButtonDocs />}
        {activeComponent === 'card' && <CardDocs />}
        {/* ... other components */}
      </main>
    </>
  );
}`} defaultCollapsed={false} showCopy={true} />
          </Card>
        </div>

        {/* Triple-Stack Behavior */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Triple-Stack Sticky Behavior
          </h4>
          <Card className="p-6">
            <p className="text-[var(--color-text-primary)] mb-4">
              TertiaryNav creates a three-level sticky navigation hierarchy. All three levels remain visible at the top of the viewport as content scrolls underneath them.
            </p>
            <div className="space-y-4">
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Complete Stack Configuration:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><strong>Header (Primary Nav):</strong> <Code syntax="plain">top-0</Code>, <Code syntax="plain">z-50</Code>, <Code syntax="plain">h-16 lg:h-20</Code> (64/80px)</li>
                  <li><strong>SecondaryNav:</strong> <Code syntax="plain">top-16 lg:top-20</Code>, <Code syntax="plain">z-40</Code>, <Code syntax="plain">h-16</Code> (64px)</li>
                  <li><strong>TertiaryNav:</strong> <Code syntax="plain">top-32 lg:top-36</Code>, <Code syntax="plain">z-30</Code>, <Code syntax="plain">h-14</Code> (56px)</li>
                </ul>
              </div>
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Scrolling Behavior:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Page content scrolls normally underneath all three navigation levels</li>
                  <li>Each nav layer has decreasing z-index for proper stacking order</li>
                  <li>Glass morphism effects show content blurred through the layers</li>
                  <li>Total sticky header height: 184px mobile (46rem), 200px desktop (50rem)</li>
                </ul>
              </div>
              <div className="mt-4 p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-muted)]">
                  <strong>Visual Hierarchy:</strong> Background opacity and padding decrease from Header → SecondaryNav → TertiaryNav, creating clear visual subordination. The lighter background on TertiaryNav (<Code syntax="plain">bg-background/95</Code> vs SecondaryNav's <Code syntax="plain">bg-surface/80</Code>) helps differentiate the levels.
                </p>
              </div>
            </div>
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
                <Code syntax="plain">items: TertiaryNavItem[]</Code>
                <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                  Required. Array of navigation items with <Code syntax="plain">id</Code> and <Code syntax="plain">label</Code> properties.
                </p>
              </div>
              <div className="p-4 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <Code syntax="plain">activeId: string</Code>
                <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                  Required. The ID of the currently active item.
                </p>
              </div>
              <div className="p-4 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <Code syntax="plain">onItemChange: (id: string) =&gt; void</Code>
                <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                  Required. Callback function called when a navigation item is clicked.
                </p>
              </div>
              <div className="p-4 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <Code syntax="plain">className?: string</Code>
                <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                  Optional. Additional CSS classes for customization.
                </p>
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
            <CollapsibleCodeBlock id="org-usage-2" code={`const [activeSection, setActiveSection] = useState('overview');

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Details' },
  { id: 'settings', label: 'Settings' },
];

<SecondaryNav
  items={sections}
  activeId={activeSection}
  onItemChange={setActiveSection}
/>`} defaultCollapsed={false} showCopy={true} />
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
            <CollapsibleCodeBlock id="org-usage-3" code={`const [activeComponent, setActiveComponent] = useState('button');

const components = [
  { id: 'button', label: 'Button' },
  { id: 'card', label: 'Card' },
  { id: 'link', label: 'Link' },
];

<TertiaryNav
  items={components}
  activeId={activeComponent}
  onItemChange={setActiveComponent}
/>`} defaultCollapsed={false} showCopy={true} />
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
            <CollapsibleCodeBlock id="org-usage-4" code={`<Footer
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
/>`} defaultCollapsed={false} showCopy={true} />
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
            <CollapsibleCodeBlock id="org-usage-5" code={`// Wrap your app with ToastProvider
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
}`} defaultCollapsed={false} showCopy={true} />
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
            <CollapsibleCodeBlock id="org-usage-6" code={`function MyComponent() {
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
}`} defaultCollapsed={false} showCopy={true} />
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

        {/* Live Example - Auto-Parsed */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Live Example - Automatic Syntax Highlighting
          </h4>
          <p className="text-sm text-[var(--color-text-secondary)] mb-3">
            Just pass a plain code string - the parser automatically applies multi-color syntax highlighting!
          </p>
          <Card className="p-6">
            <CollapsibleCodeBlock
              id="live-example"
              title="TypeScript Component Example"
              code={`import { useState } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export function Button({ variant, onClick }: ButtonProps) {
  const [isActive, setIsActive] = useState(false);
  return <button onClick={onClick}>Click</button>;
}`}
              showCopy={true}
            />
          </Card>
        </div>

        {/* JSX/React Example */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            JSX/React Example
          </h4>
          <Card className="p-6">
            <CollapsibleCodeBlock
              id="jsx-example"
              title="React Component with Hooks"
              code={`function Counter() {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="counter">
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`}
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
            <CollapsibleCodeBlock
              id="org-collapsible-usage"
              code={`import { CollapsibleCodeBlock, parseCode } from '@ecosystem/design-system';

// ✨ NEW: Automatic syntax highlighting - just pass a string!
<CollapsibleCodeBlock
  id="my-code"
  title="React Component"
  code={\`const greeting = "Hello World";
console.log(greeting);\`}
  showCopy={true}
/>

// Advanced: Use parseCode utility directly
const tokens = parseCode('const example = 42;');
<CollapsibleCodeBlock
  id="parsed-code"
  code={tokens}
/>

// Manual tokenization (for custom control)
import type { SyntaxToken } from '@ecosystem/design-system';

const customTokens: SyntaxToken[] = [
  { text: 'const', type: 'keyword' },
  { text: ' example ', type: 'plain' },
  { text: '=', type: 'operator' },
  { text: ' "Hello"', type: 'string' },
];

<CollapsibleCodeBlock
  id="manual-tokens"
  code={customTokens}
/>`}
              defaultCollapsed={false}
              showCopy={true}
            />
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

      {/* Customizer Component */}
      {selectedOrganism === 'Customizer' && (
        <section className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
            Customizer
          </h3>
          <Card className="p-6">
            <p className="text-[var(--color-text-primary)] mb-4">
              A floating panel that lets users experiment with themes, motion, and preferences in real-time. Available in two modes: full-featured customizer or lightweight theme switcher.
            </p>
            <div className="space-y-4">
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Key Features:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Two modes: full (all controls) and lightweight (light/dark mode only)</li>
                  <li>Live theme switching between Studio, Sage, and Volt themes (full mode)</li>
                  <li>Light/dark mode toggle (both modes)</li>
                  <li>Motion scale control with instant feedback (full mode)</li>
                  <li>X-Ray mode for debugging component boundaries (full mode)</li>
                  <li>All preferences persist to localStorage</li>
                  <li>Floating button with collapsible panel</li>
                  <li>Glass morphism effect with backdrop blur</li>
                  <li>Theme-aware colors using CSS custom properties</li>
                </ul>
              </div>
              <div className="mt-4 p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-muted)]">
                  <strong>Usage Recommendation:</strong> Use the full mode for design system documentation and demos. Use the lightweight mode for production applications where you only want to offer light/dark mode switching.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Live Example - Full Mode */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Live Example - Full Mode
          </h4>
          <p className="text-sm text-[var(--color-text-secondary)] mb-3">
            This is the full-featured customizer you see on this page! Look for the floating ⚙ button in the bottom right corner.
          </p>
          <Card className="p-6">
            <p className="text-sm text-[var(--color-text-secondary)]">
              The Customizer is already active on this page. Click the floating button in the bottom right to open it and see all available controls.
            </p>
          </Card>
        </div>

        {/* Code Example - Full Mode */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Code Example - Full Mode
          </h4>
          <Card className="p-6 bg-[var(--color-surface)]">
            <CollapsibleCodeBlock id="customizer-full-usage" code={`import { CustomizerPanel } from '@ecosystem/design-system';

// Full-featured customizer (default)
export function MyApp() {
  return (
    <>
      {/* Your app content */}
      <CustomizerPanel mode="full" />
    </>
  );
}

// Or omit the mode prop - defaults to "full"
export function MyApp() {
  return (
    <>
      {/* Your app content */}
      <CustomizerPanel />
    </>
  );
}`} defaultCollapsed={false} showCopy={true} />
          </Card>
        </div>

        {/* Code Example - Lightweight Mode */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Code Example - Lightweight Mode
          </h4>
          <Card className="p-6 bg-[var(--color-surface)]">
            <CollapsibleCodeBlock id="customizer-lightweight-usage" code={`import { CustomizerPanel } from '@ecosystem/design-system';

// Lightweight mode - just light/dark switching
export function MyApp() {
  return (
    <>
      {/* Your app content */}
      <CustomizerPanel mode="lightweight" />
    </>
  );
}`} defaultCollapsed={false} showCopy={true} />
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
                <Code syntax="plain">mode?: &quot;full&quot; | &quot;lightweight&quot;</Code>
                <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                  Optional. Determines which controls are shown:
                </p>
                <ul className="text-sm text-[var(--color-text-secondary)] mt-2 space-y-1 list-disc list-inside ml-4">
                  <li><strong>&quot;full&quot; (default):</strong> Shows theme selector, light/dark mode, motion control, and X-ray mode</li>
                  <li><strong>&quot;lightweight&quot;:</strong> Shows only light/dark mode toggle</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Mode Comparison */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Mode Comparison
          </h4>
          <Card className="p-6">
            <div className="space-y-4">
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Full Mode Includes:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Motion intensity slider (0-10 scale)</li>
                  <li>Theme selector (Studio, Sage, Volt)</li>
                  <li>Typography preview for selected theme</li>
                  <li>Light/dark mode toggle</li>
                  <li>X-Ray mode toggle for debugging</li>
                </ul>
              </div>
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Lightweight Mode Includes:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Light/dark mode toggle only</li>
                  <li>Smaller, more compact panel</li>
                  <li>Different icon (🌓 instead of ⚙️)</li>
                  <li>Perfect for production apps</li>
                </ul>
              </div>
              <div className="mt-4 p-3 bg-[var(--color-surface)] rounded border border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-muted)]">
                  <strong>Design Decision:</strong> The lightweight mode is perfect when you want to offer users the ability to switch between light and dark themes without exposing all design system controls.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Integration Notes */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Integration Notes
          </h4>
          <Card className="p-6">
            <p className="text-[var(--color-text-primary)] mb-4">
              The Customizer requires the ThemeProvider to be present in your app tree.
            </p>
            <div className="space-y-4">
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Requirements:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Must be wrapped by <Code syntax="plain">ThemeProvider</Code></li>
                  <li>Uses Zustand stores for theme and customizer state</li>
                  <li>Automatically persists preferences to localStorage</li>
                  <li>Fixed positioning (bottom-right corner)</li>
                  <li>High z-index (z-50) to stay above content</li>
                </ul>
              </div>
              <CollapsibleCodeBlock id="customizer-integration" code={`import { ThemeProvider } from '@ecosystem/design-system/providers';
import { CustomizerPanel } from '@ecosystem/design-system';

export default function App({ children }) {
  return (
    <ThemeProvider defaultTheme="studio" defaultMode="light">
      {children}
      <CustomizerPanel mode="full" />
    </ThemeProvider>
  );
}`} defaultCollapsed={false} showCopy={true} />
            </div>
          </Card>
        </div>
        </section>
      )}
      </div>
    </div>
  );
}
