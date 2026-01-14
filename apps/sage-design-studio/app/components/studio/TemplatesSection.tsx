'use client';

import { useState, useEffect } from 'react';
import { Breadcrumbs, TertiaryNav, CollapsibleCodeBlock, Card, PageTemplate, Footer, Brand, type BreadcrumbItem } from '@ecosystem/design-system';
import { ExternalLink, Layout, Ruler, Type, LayoutGrid, Scale, Sparkles, ArrowDown, Lightbulb } from 'lucide-react';

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
    <div className="space-y-8 w-full min-w-0">
      <div className="mb-8">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 1 && (
          <div className="mb-4">
            <Breadcrumbs variant="subtle" items={breadcrumbs} />
          </div>
        )}
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
  const [activeSection, setActiveSection] = useState('overview');

  const basicUsageCode = `import {PageTemplate, Brand, Footer} from '@ecosystem/design-system';

      function MyPage() {
  return (
      <PageTemplate
        header={{
          logo: <Brand href="/">Brand Name</Brand>,
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
        footer={
          <Footer
            logo={<Brand>Brand Name</Brand>}
            sections={[...]}
            copyright="© 2026 Company"
          />
        }
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
              <span className="mr-2 mt-1"><Ruler className="w-4 h-4 text-[var(--color-primary)]" /></span>
              <span><strong>Structured Spacing:</strong> 48-96px between major sections for clear visual hierarchy</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1"><Type className="w-4 h-4 text-[var(--color-primary)]" /></span>
              <span><strong>Typography Hierarchy:</strong> 36-48px titles, 18px subtitles, consistent ratios</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1"><LayoutGrid className="w-4 h-4 text-[var(--color-primary)]" /></span>
              <span><strong>Grid-Based Alignment:</strong> 12-column Tailwind grid with consistent content widths</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1"><Scale className="w-4 h-4 text-[var(--color-primary)]" /></span>
              <span><strong>Generous Whitespace:</strong> Breathing room for content to shine</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1"><Sparkles className="w-4 h-4 text-[var(--color-primary)]" /></span>
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

        <Card className="relative overflow-hidden border-2 border-[var(--color-border)] bg-[var(--color-surface)]">
          {/* Abstract "Screenshot" Placeholder */}
          <div className="h-[400px] flex flex-col opacity-50 blur-[2px] select-none pointer-events-none" aria-hidden="true">
            {/* Fake Header */}
            <div className="h-16 border-b border-[var(--color-border)] bg-[var(--color-background)] flex items-center px-8 gap-8">
              <div className="w-8 h-8 rounded-full bg-[var(--color-border)]"></div>
              <div className="flex gap-4">
                <div className="w-20 h-4 rounded bg-[var(--color-border)]"></div>
                <div className="w-20 h-4 rounded bg-[var(--color-border)]"></div>
                <div className="w-20 h-4 rounded bg-[var(--color-border)]"></div>
              </div>
            </div>
            {/* Fake Content */}
            <div className="flex-1 p-8 grid grid-cols-12 gap-8">
              <div className="col-span-3 h-full rounded border border-[var(--color-border)] bg-[var(--color-background)]"></div>
              <div className="col-span-9 space-y-4">
                <div className="w-3/4 h-12 rounded bg-[var(--color-border)] mb-8"></div>
                <div className="space-y-2">
                  <div className="w-full h-4 rounded bg-[var(--color-border)]"></div>
                  <div className="w-full h-4 rounded bg-[var(--color-border)]"></div>
                  <div className="w-2/3 h-4 rounded bg-[var(--color-border)]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[var(--color-background)]/60 backdrop-blur-sm">
            <div className="max-w-md space-y-6 p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl">
              <div className="flex justify-center mb-2">
                <Layout className="w-12 h-12 text-[var(--color-primary)]" strokeWidth={1.5} />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                  Experience the Live Interaction
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  The page template features complex sticky positioning and responsive behaviors that are best experienced in a full browser window.
                </p>
              </div>

              <a
                href="https://www.shalomormsby.com/cosmograph"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-medium hover:opacity-90 transition-opacity"
              >
                <span>Open Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </Card>

        <p className="text-sm text-[var(--color-text-muted)] mt-3 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-yellow-500" />
          The live demo opens in a new tab to demonstrate full sticky scrolling and mobile responsiveness.
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
            <div className="ml-4"><ArrowDown className="w-3 h-3" /></div>
            <div>2. Title + Subtitle (Swiss Grid spacing: 48-96px vertical)</div>
            <div className="ml-4"><ArrowDown className="w-3 h-3" /></div>
            <div>3. Breadcrumbs (static, below title)</div>
            <div className="ml-4"><ArrowDown className="w-3 h-3" /></div>
            <div>4. Secondary Nav (z-40, always sticky)</div>
            <div className="ml-4"><ArrowDown className="w-3 h-3" /></div>
            <div>5. Main Content (flex-1, fills space)</div>
            <div className="ml-4"><ArrowDown className="w-3 h-3" /></div>
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
