'use client';

import { Card, Button, Header } from '@ecosystem/design-system';

export function OrganismsSection() {
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

      {/* Header Component */}
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
                  <li>Sticky positioning with optional glass morphism effect on scroll</li>
                  <li>Responsive mobile menu with hamburger toggle</li>
                  <li>Full-screen mobile overlay navigation</li>
                  <li>Respects motion preferences (prefers-reduced-motion)</li>
                  <li>Keyboard accessible with focus indicators</li>
                  <li>Theme-aware colors using CSS custom properties</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Live Preview */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Live Preview
          </h4>
          <Card className="p-0 overflow-hidden">
            <div className="relative bg-[var(--color-background)] min-h-[400px]">
              <Header
                sticky={false}
                glassOnScroll={false}
                logo={
                  <a href="#" className="font-semibold text-lg text-[var(--color-text-primary)]">
                    Brand
                  </a>
                }
                navLinks={[
                  { label: 'Features', href: '#features' },
                  { label: 'Pricing', href: '#pricing' },
                  { label: 'About', href: '#about' },
                  { label: 'Contact', href: '#contact' },
                ]}
                actions={
                  <>
                    <a
                      href="#signin"
                      className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      Sign In
                    </a>
                    <Button variant="primary" size="sm">
                      Get Started
                    </Button>
                  </>
                }
              />
              <div className="pt-20 px-8 pb-8">
                <div className="max-w-3xl mx-auto text-center">
                  <h1 className="text-3xl font-bold mb-4 text-[var(--color-text-primary)]">
                    Header Preview
                  </h1>
                  <p className="text-[var(--color-text-secondary)]">
                    This is a demo of the Header component. On mobile devices, click the hamburger menu to see the full-screen navigation overlay.
                  </p>
                </div>
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
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
  ]}
  actions={
    <>
      <a href="#signin">Sign In</a>
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
    </div>
  );
}
