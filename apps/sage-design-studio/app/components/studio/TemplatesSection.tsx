'use client';

import { useState, useEffect } from 'react';
import { Breadcrumbs, TertiaryNav, CollapsibleCodeBlock, Card, PageTemplate, type BreadcrumbItem } from '@ecosystem/design-system';

interface TemplatesSectionProps {
  breadcrumbs?: BreadcrumbItem[];
  activeItemId?: string;
  onItemChange?: (itemId: string) => void;
}

export function TemplatesSection({ breadcrumbs, activeItemId, onItemChange }: TemplatesSectionProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(activeItemId || 'templates-overview');

  // Sync selectedTemplate with activeItemId when it changes (from sidebar navigation)
  useEffect(() => {
    if (activeItemId && ['templates-overview', 'page-template'].includes(activeItemId)) {
      setSelectedTemplate(activeItemId);
    }
  }, [activeItemId]);

  const handleTemplateChange = (id: string) => {
    setSelectedTemplate(id);
    onItemChange?.(id);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-[var(--color-text-primary)]">
          Templates
        </h2>

        {/* Breadcrumbs - positioned after title, before description */}
        {breadcrumbs && breadcrumbs.length > 1 && (
          <div className="mb-4">
            <Breadcrumbs variant="subtle" items={breadcrumbs} />
          </div>
        )}

        <p className="text-lg text-[var(--color-text-secondary)] mb-2">
          <strong>Content Structure:</strong> Layouts that define how organisms and components fit together without specific content. They act as the "blueprint" or wireframe for a page.
        </p>
        <p className="text-base text-[var(--color-text-muted)]">
          Page-level layouts and structural blueprints for consistent experiences.
        </p>
      </div>

      {/* Template Navigation - Sticky wrapper matching TokensSection pattern */}
      <div className="sticky top-0 z-10 bg-[var(--color-background)] pb-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mb-4">
        <TertiaryNav
          items={[
            { id: 'templates-overview', label: 'Overview' },
            { id: 'page-template', label: 'Page Template' },
          ]}
          activeId={selectedTemplate}
          onItemChange={handleTemplateChange}
        />
      </div>

      {/* Template Content */}
      <div className="mt-4">
        {selectedTemplate === 'templates-overview' && <OverviewContent />}
        {selectedTemplate === 'page-template' && <PageTemplateContent />}
      </div>
    </div>
  );
}

function OverviewContent() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-[var(--color-text-primary)]">
          What are Templates?
        </h3>
        <p className="text-[var(--color-text-secondary)] mb-4">
          Templates sit at the top of the atomic design hierarchy, composing organisms, molecules, and atoms
          into complete page layouts. They provide opinionated structure and best practices for common page patterns.
        </p>
        <ul className="list-disc list-inside space-y-2 text-[var(--color-text-secondary)]">
          <li>Compose multiple organisms into coherent page structures</li>
          <li>Enforce consistent spacing and layout principles</li>
          <li>Provide sensible defaults while allowing customization</li>
          <li>Demonstrate Swiss Grid Design principles in practice</li>
        </ul>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-[var(--color-text-primary)]">
          Available Templates
        </h3>
        <div className="space-y-4">
          <div className="border-l-4 border-[var(--color-primary)] pl-4">
            <h4 className="font-semibold text-[var(--color-text-primary)]">Page Template</h4>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Swiss Grid-based page layout with header, title, breadcrumbs, and content area.
              Perfect for blog posts, documentation, and standard app pages.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function PageTemplateContent() {
  const basicUsageCode = `import { PageTemplate } from '@ecosystem/design-system';

function MyPage() {
  return (
    <PageTemplate
      header={{
        logo: <Link href="/">Brand</Link>,
        navLinks: [
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
        ],
        sticky: true,
      }}
      title="Welcome to Our Platform"
      subtitle="Build amazing experiences with our design system"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Platform' },
      ]}
    >
      <article>Your content here</article>
    </PageTemplate>
  );
}`;

  const withSecondaryNavCode = `<PageTemplate
  header={{ /* ... */ }}
  title="Documentation"
  breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Docs' }]}
  secondaryNav={{
    items: [
      { id: 'getting-started', label: 'Getting Started' },
      { id: 'components', label: 'Components' },
      { id: 'api', label: 'API Reference' },
    ],
    activeId: 'getting-started',
    onItemChange: (id) => navigate(id),
  }}
>
  <section>Documentation content</section>
</PageTemplate>`;

  const variantsCode = `// Standard width (1280px) - default
<PageTemplate variant="standard" {...props}>

// Wide width (1440px) - for dashboards
<PageTemplate variant="wide" {...props}>

// Narrow width (896px) - for reading-focused pages
<PageTemplate variant="narrow" {...props}>`;

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section>
        <h3 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
          Page Template
        </h3>
        <p className="text-lg text-[var(--color-text-secondary)] mb-6">
          An opinionated page layout template based on Swiss Grid Design principles. Provides structured,
          clean layouts with sensible defaults for standard pages.
        </p>

        <Card className="p-6 bg-[var(--color-surface)]">
          <h4 className="font-semibold mb-3 text-[var(--color-text-primary)]">Swiss Grid Design Principles</h4>
          <ul className="space-y-2 text-[var(--color-text-secondary)]">
            <li className="flex items-start">
              <span className="mr-2">📐</span>
              <span><strong>Structured Spacing:</strong> 48-96px between major sections for clear visual hierarchy</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">📏</span>
              <span><strong>Typography Hierarchy:</strong> 36-48px titles, 18px subtitles, consistent ratios</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">📊</span>
              <span><strong>Grid-Based Alignment:</strong> 12-column Tailwind grid with consistent content widths</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">⚖️</span>
              <span><strong>Generous Whitespace:</strong> Breathing room for content to shine</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✨</span>
              <span><strong>Minimal Aesthetic:</strong> Functional, clean design without unnecessary decoration</span>
            </li>
          </ul>
        </Card>
      </section>

      {/* Live Preview */}
      <section>
        <h4 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">Live Preview</h4>
        <p className="text-[var(--color-text-secondary)] mb-4">
          Interactive example showing the PageTemplate structure with all elements. Scroll within the preview to see sticky behavior.
        </p>

        <Card className="p-0 overflow-hidden border-2 border-[var(--color-border)]">
          <div className="h-[600px] overflow-auto bg-[var(--color-background)]">
            <div style={{ transform: 'scale(0.75)', transformOrigin: 'top left', width: '133.33%', height: '133.33%' }}>
              <PageTemplate
                header={{
                  logo: <span className="font-bold">Logo</span>,
                  navLinks: [
                    { label: 'Home', href: '#' },
                    { label: 'About', href: '#' },
                    { label: 'Services', href: '#' },
                    { label: 'Contact', href: '#' },
                  ],
                  sticky: true,
                }}
                title="Example Page Title"
                subtitle="This is a descriptive subtitle that provides context about the page content"
                breadcrumbs={[
                  { label: 'Home', href: '#' },
                  { label: 'Category', href: '#' },
                  { label: 'Current Page' },
                ]}
                showCustomizer={false}
              >
                <div className="space-y-8">
                  <section>
                    <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
                      Lorem Ipsum Dolor Sit Amet
                    </h2>
                    <p className="text-[var(--color-text-secondary)] mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p className="text-[var(--color-text-secondary)]">
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
                      Structured Content Section
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="p-4">
                        <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Feature One</h3>
                        <p className="text-sm text-[var(--color-text-secondary)]">
                          Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                      </Card>
                      <Card className="p-4">
                        <h3 className="font-semibold mb-2 text-[var(--color-text-primary)]">Feature Two</h3>
                        <p className="text-sm text-[var(--color-text-secondary)]">
                          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.
                        </p>
                      </Card>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
                      Additional Content
                    </h2>
                    <p className="text-[var(--color-text-secondary)] mb-4">
                      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                      totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-[var(--color-text-secondary)]">
                      <li>Nemo enim ipsam voluptatem quia voluptas sit aspernatur</li>
                      <li>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet</li>
                      <li>Consectetur, adipisci velit, sed quia non numquam eius modi tempora</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
                      Final Section
                    </h2>
                    <p className="text-[var(--color-text-secondary)]">
                      At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
                      quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia
                      deserunt mollitia animi, id est laborum et dolorum fuga.
                    </p>
                  </section>
                </div>
              </PageTemplate>
            </div>
          </div>
        </Card>

        <p className="text-sm text-[var(--color-text-muted)] mt-3">
          💡 Scroll within the preview to see the header's sticky behavior and Swiss Grid spacing in action.
        </p>
      </section>

      {/* Basic Usage */}
      <section>
        <h4 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">Basic Usage</h4>
        <CollapsibleCodeBlock
          id="page-template-basic"
          code={basicUsageCode}
          language="tsx"
          defaultCollapsed={false}
          showCopy
        />
      </section>

      {/* With Secondary Nav */}
      <section>
        <h4 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">With Secondary Navigation</h4>
        <p className="text-[var(--color-text-secondary)] mb-4">
          Add always-sticky secondary navigation for section/tab switching within your page.
        </p>
        <CollapsibleCodeBlock
          id="page-template-secondary-nav"
          code={withSecondaryNavCode}
          language="tsx"
          defaultCollapsed={false}
          showCopy
        />
      </section>

      {/* Variants */}
      <section>
        <h4 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">Content Width Variants</h4>
        <p className="text-[var(--color-text-secondary)] mb-4">
          Choose the right content width for your use case:
        </p>
        <CollapsibleCodeBlock
          id="page-template-variants"
          code={variantsCode}
          language="tsx"
          defaultCollapsed={false}
          showCopy
        />
      </section>

      {/* Props */}
      <section>
        <h4 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">Props</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-[var(--color-border)]">
            <thead className="bg-[var(--color-surface)]">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-[var(--color-text-primary)]">Prop</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-[var(--color-text-primary)]">Type</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-[var(--color-text-primary)]">Default</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-[var(--color-text-primary)]">Description</th>
              </tr>
            </thead>
            <tbody className="text-sm text-[var(--color-text-secondary)]">
              <tr className="border-t border-[var(--color-border)]">
                <td className="px-4 py-2 font-mono">header</td>
                <td className="px-4 py-2">HeaderConfig</td>
                <td className="px-4 py-2">required</td>
                <td className="px-4 py-2">Header configuration (logo, navLinks, actions, sticky)</td>
              </tr>
              <tr className="border-t border-[var(--color-border)]">
                <td className="px-4 py-2 font-mono">title</td>
                <td className="px-4 py-2">string</td>
                <td className="px-4 py-2">required</td>
                <td className="px-4 py-2">Page title</td>
              </tr>
              <tr className="border-t border-[var(--color-border)]">
                <td className="px-4 py-2 font-mono">subtitle</td>
                <td className="px-4 py-2">string</td>
                <td className="px-4 py-2">undefined</td>
                <td className="px-4 py-2">Optional page subtitle</td>
              </tr>
              <tr className="border-t border-[var(--color-border)]">
                <td className="px-4 py-2 font-mono">breadcrumbs</td>
                <td className="px-4 py-2">BreadcrumbItem[]</td>
                <td className="px-4 py-2">required</td>
                <td className="px-4 py-2">Breadcrumb navigation items</td>
              </tr>
              <tr className="border-t border-[var(--color-border)]">
                <td className="px-4 py-2 font-mono">secondaryNav</td>
                <td className="px-4 py-2">SecondaryNavConfig</td>
                <td className="px-4 py-2">undefined</td>
                <td className="px-4 py-2">Optional secondary navigation</td>
              </tr>
              <tr className="border-t border-[var(--color-border)]">
                <td className="px-4 py-2 font-mono">showCustomizer</td>
                <td className="px-4 py-2">boolean</td>
                <td className="px-4 py-2">true</td>
                <td className="px-4 py-2">Show customizer panel</td>
              </tr>
              <tr className="border-t border-[var(--color-border)]">
                <td className="px-4 py-2 font-mono">variant</td>
                <td className="px-4 py-2">'standard' | 'wide' | 'narrow'</td>
                <td className="px-4 py-2">'standard'</td>
                <td className="px-4 py-2">Content width variant</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Layout Structure */}
      <section>
        <h4 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">Layout Structure</h4>
        <Card className="p-6 bg-[var(--color-surface)] font-mono text-sm">
          <div className="space-y-1 text-[var(--color-text-secondary)]">
            <div>1. Header (z-50, sticky if enabled)</div>
            <div className="ml-4">↓</div>
            <div>2. Title + Subtitle (Swiss Grid spacing: 48-96px vertical)</div>
            <div className="ml-4">↓</div>
            <div>3. Breadcrumbs (static, below title)</div>
            <div className="ml-4">↓</div>
            <div>4. Secondary Nav (z-40, always sticky)</div>
            <div className="ml-4">↓</div>
            <div>5. Main Content (flex-1, fills space)</div>
            <div className="ml-4">↓</div>
            <div>6. Footer (optional)</div>
            <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
              <div>+ Customizer (sticky overlay, bottom-right)</div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
