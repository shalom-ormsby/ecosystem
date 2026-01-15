'use client';

import { useState, useEffect } from 'react';
import { generateBreadcrumbs, type BreadcrumbItem, type RouteConfig } from '@ecosystem/design-system';
import { ModeSwitcher } from './components/ModeSwitcher';
import { NavigationSidebar } from './components/NavigationSidebar';
import { SearchCommandPalette } from './components/SearchCommandPalette';
import { TableOfContents } from './components/TableOfContents';
import { OverviewSection } from './components/studio/OverviewSection';
import { ArchitectureSection } from './components/studio/ArchitectureSection';
import { AddingComponentsSection } from './components/studio/AddingComponentsSection';
import { CommonPatternsSection } from './components/studio/CommonPatternsSection';
import { ContributingSection } from './components/studio/ContributingSection';
import { TokensSection } from './components/studio/TokensSection';
import { ComponentsSection } from './components/studio/ComponentsSection';
import { MoleculesSection } from './components/studio/MoleculesSection';
import { OrganismsSection } from './components/studio/OrganismsSection';
import { HooksSection } from './components/studio/HooksSection';
import { TemplatesSection } from './components/studio/TemplatesSection';
import { MotionSections } from './components/studio/MotionSections';
import { McpSection } from './components/studio/McpSection';

type Section =
  | 'overview'
  | 'architecture'
  | 'adding-components'
  | 'common-patterns'
  | 'contributing'
  | 'mcp-server'
  | 'tokens'
  | 'actions'
  | 'forms'
  | 'navigation'
  | 'overlays'
  | 'feedback'
  | 'data-display'
  | 'layout'
  | 'patterns'
  | 'hooks'
  | 'templates'
  | 'motion';

// Route configuration for breadcrumb labels
const routeConfig: RouteConfig = {
  overview: { label: 'Overview' },
  architecture: { label: 'Architecture' },
  'adding-components': {
    label: 'Adding Components',
    children: {
      methodology: { label: 'Methodology' },
      modifying: { label: 'Modifying Components' },
      troubleshooting: { label: 'Troubleshooting' },
    }
  },
  'common-patterns': { label: 'Common Patterns' },
  contributing: { label: 'Contributing' },
  'mcp-server': { label: 'MCP Server' },
  tokens: {
    label: 'Design Tokens',
    children: {
      colors: { label: 'Colors' },
      typography: { label: 'Typography' },
      spacing: { label: 'Spacing' },
      syntax: { label: 'Syntax' },
      motion: { label: 'Motion' },
    }
  },
  // Functional Categories (formerly Atoms)
  actions: {
    label: 'Actions',
    children: {
      button: { label: 'Button' },
      toggle: { label: 'Toggle' },
      'toggle-group': { label: 'Toggle Group' },
    }
  },
  forms: {
    label: 'Forms',
    children: {
      checkbox: { label: 'Checkbox' },
      combobox: { label: 'Combobox' },
      form: { label: 'Form' },
      input: { label: 'Input' },
      'input-otp': { label: 'Input OTP' },
      label: { label: 'Label' },
      'radio-group': { label: 'Radio Group' },
      select: { label: 'Select' },
      slider: { label: 'Slider' },
      switch: { label: 'Switch' },
      textarea: { label: 'Textarea' },
      'theme-toggle': { label: 'Theme Toggle' }, // Moved from Molecules
    }
  },
  navigation: {
    label: 'Navigation',
    children: {
      breadcrumb: { label: 'Breadcrumb' },
      command: { label: 'Command' },
      menubar: { label: 'Menubar' },
      'navigation-menu': { label: 'Navigation Menu' },
      pagination: { label: 'Pagination' },
      tabs: { label: 'Tabs' },
    }
  },
  overlays: {
    label: 'Overlays',
    children: {
      'alert-dialog': { label: 'Alert Dialog' },
      'context-menu': { label: 'Context Menu' },
      dialog: { label: 'Dialog' },
      drawer: { label: 'Drawer' },
      'dropdown-menu': { label: 'Dropdown Menu' },
      'hover-card': { label: 'Hover Card' },
      popover: { label: 'Popover' },
      sheet: { label: 'Sheet' },
      tooltip: { label: 'Tooltip' },
    }
  },
  feedback: {
    label: 'Feedback',
    children: {
      alert: { label: 'Alert' },
      progress: { label: 'Progress' },
      skeleton: { label: 'Skeleton' },
      sonner: { label: 'Sonner' },
      toaster: { label: 'Toaster' },
    }
  },
  'data-display': {
    label: 'Data Display',
    children: {
      avatar: { label: 'Avatar' },
      badge: { label: 'Badge' },
      calendar: { label: 'Calendar' },
      card: { label: 'Card' },
      'data-table': { label: 'Data Table' },
      table: { label: 'Table' },
    }
  },
  layout: {
    label: 'Layout',
    children: {
      accordion: { label: 'Accordion' },
      'aspect-ratio': { label: 'Aspect Ratio' },
      carousel: { label: 'Carousel' },
      collapsible: { label: 'Collapsible' },
      'date-picker': { label: 'Date Picker' },
      resizable: { label: 'Resizable' },
      'scroll-area': { label: 'Scroll Area' },
      separator: { label: 'Separator' },
    }
  },
  patterns: {
    label: 'Patterns',
    children: {
      'page-layout': { label: 'Page Layout' },
      'primary-nav': { label: 'Primary Nav' },
      'secondary-nav': { label: 'Secondary Nav' },
      footer: { label: 'Footer' },
      customizer: { label: 'Customizer' },
      'collapsible-code-block': { label: 'Code Block' },
    }
  },
  hooks: { label: 'Hooks' },
  templates: { label: 'Templates' },
  motion: {
    label: 'Motion System',
    children: {
      'text-effects': { label: 'Text Effects' },
      scroll: { label: 'Scroll Animations' },
      loading: { label: 'Loading States' },
      interactive: { label: 'Interactive Effects' },
      transitions: { label: 'Transitions' },
      'cursor-effects': { label: 'Cursor Effects' },
    }
  },
};

export default function StudioPage() {
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [activeItemId, setActiveItemId] = useState<string>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  // Initialize from URL hash on mount
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Remove '#'
    if (!hash) return;

    const [section, itemId] = hash.split('/');
    const validSections: Section[] = [
      'overview', 'architecture', 'adding-components', 'common-patterns',
      'contributing', 'mcp-server', 'tokens', 'actions', 'forms', 'navigation',
      'overlays', 'feedback', 'data-display', 'layout', 'patterns',
      'hooks', 'templates', 'motion'
    ];

    if (validSections.includes(section as Section)) {
      setActiveSection(section as Section);
      setActiveItemId(itemId || section);
    }
  }, []);

  // Sync state to URL hash whenever navigation changes
  useEffect(() => {
    const hash = activeItemId && activeItemId !== activeSection
      ? `#${activeSection}/${activeItemId}`
      : `#${activeSection}`;

    if (window.location.hash !== hash) {
      window.history.replaceState(null, '', hash);
    }
  }, [activeSection, activeItemId]);

  // Listen for hash changes (back/forward button, direct links)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) {
        setActiveSection('overview');
        setActiveItemId('overview');
        return;
      }

      const [section, itemId] = hash.split('/');
      const validSections: Section[] = [
        'overview', 'architecture', 'adding-components', 'common-patterns',
        'contributing', 'mcp-server', 'tokens', 'actions', 'forms', 'navigation',
        'overlays', 'feedback', 'data-display', 'layout', 'patterns',
        'hooks', 'templates', 'motion'
      ];

      if (validSections.includes(section as Section)) {
        setActiveSection(section as Section);
        setActiveItemId(itemId || section);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Open/close search with Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Generate breadcrumbs from active section/item (syncs with state, not hash events)
  useEffect(() => {
    const hash = activeItemId && activeItemId !== activeSection
      ? `#${activeSection}/${activeItemId}`
      : `#${activeSection}`;
    setBreadcrumbs(generateBreadcrumbs(hash, routeConfig));
  }, [activeSection, activeItemId]);

  // Handle navigation from search results
  const handleSearchNavigate = (path: string) => {
    // Basic navigation
    if (path === 'overview') {
      setActiveSection('overview');
      setActiveItemId('overview');
      return;
    }

    // Split path to find section and item
    const parts = path.split('-');
    const potentialSection = parts[0] as Section;

    // Check if first part matches a known top-level section
    const validSections: Section[] = [
      'overview', 'architecture', 'adding-components', 'common-patterns',
      'contributing', 'mcp-server', 'tokens', 'actions', 'forms', 'navigation',
      'overlays', 'feedback', 'data-display', 'layout', 'patterns',
      'hooks', 'templates', 'motion'
    ];

    if (validSections.includes(potentialSection)) {
      setActiveSection(potentialSection);
      // Remaining parts form the item ID
      const itemId = parts.slice(1).join('-');
      setActiveItemId(itemId || potentialSection);
    } else {
      // Fallback/Legacy handling
      if (path.startsWith('adding-components')) {
        setActiveSection('adding-components');
        const itemId = path.replace('adding-components-', '');
        setActiveItemId(itemId);
      } else if (path.startsWith('tokens')) {
        setActiveSection('tokens');
        const itemId = path.replace('tokens-', '');
        setActiveItemId(itemId);
      } else if (path.startsWith('atoms') || path.startsWith('molecules')) {
        // Redirect legacy atoms/molecules searches to new structure if possible, 
        // or just defaulting to Actions or Forms? 
        // For now, simpler to just map known prefixes if they exist in search index.
        // But search index likely needs updating too. 
        // Let's assume search returns 'actions-button'.
      }
    }

    // Scroll to top after navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isComponentSection = (section: Section) =>
    ['actions', 'forms', 'navigation', 'overlays', 'feedback', 'data-display', 'layout'].includes(section);

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex">
      {/* Sidebar + Content Layout */}
      <NavigationSidebar
        activeSection={activeSection}
        activeItemId={activeItemId}
        onNavigate={(section, itemId) => {
          setActiveSection(section as Section);
          setActiveItemId(itemId || section);
          setSidebarOpen(false); // Close sidebar on mobile after navigation
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSearchOpen={() => setSearchOpen(true)}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <main className="flex-1 min-h-screen flex flex-col lg:ml-[280px] min-w-0 w-full max-w-[100vw]">
        {/* Mobile Menu Button - Floating */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed top-4 left-4 z-30 p-2 text-[var(--color-text-primary)] bg-[var(--color-surface)] hover:bg-[var(--color-hover)] border border-[var(--color-border)] rounded-lg transition-colors shadow-lg"
          aria-label="Toggle sidebar"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Content Area */}
        <div className="flex-1 flex flex-row min-w-0 w-full">
          <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto min-w-0">
            {activeSection === 'overview' && <OverviewSection />}
            {activeSection === 'architecture' && <ArchitectureSection breadcrumbs={breadcrumbs} />}
            {activeSection === 'adding-components' && (
              <AddingComponentsSection
                breadcrumbs={breadcrumbs}
                activeItemId={activeItemId}
              />
            )}
            {activeSection === 'common-patterns' && <CommonPatternsSection breadcrumbs={breadcrumbs} />}
            {activeSection === 'contributing' && <ContributingSection breadcrumbs={breadcrumbs} />}
            {activeSection === 'mcp-server' && <McpSection breadcrumbs={breadcrumbs} />}
            {activeSection === 'tokens' && (
              <TokensSection
                activeItemId={activeItemId}
                breadcrumbs={breadcrumbs}
                onItemChange={(itemId) => setActiveItemId(itemId)}
              />
            )}

            {/* Functional Component Sections */}
            {isComponentSection(activeSection) && (
              <ComponentsSection
                activeItemId={activeItemId}
                category={activeSection}
                breadcrumbs={breadcrumbs}
                onItemChange={(itemId) => {
                  setActiveItemId(itemId);
                  window.history.replaceState(null, '', `#${activeSection}/${itemId}`);
                }}
              />
            )}

            {/* Renamed Organisms -> Patterns */}
            {activeSection === 'patterns' && (
              <OrganismsSection
                activeItemId={activeItemId}
                breadcrumbs={breadcrumbs}
                onItemChange={(itemId) => setActiveItemId(itemId)}
              />
            )}

            {activeSection === 'hooks' && (
              <HooksSection
                activeItemId={activeItemId}
                breadcrumbs={breadcrumbs}
                onItemChange={(itemId) => setActiveItemId(itemId)}
              />
            )}
            {activeSection === 'templates' && (
              <TemplatesSection
                activeItemId={activeItemId}
                breadcrumbs={breadcrumbs}
                onItemChange={(itemId) => setActiveItemId(itemId)}
              />
            )}
            {activeSection === 'motion' && (
              <MotionSections
                activeItemId={activeItemId}
                breadcrumbs={breadcrumbs}
                onItemChange={(itemId) => setActiveItemId(itemId)}
              />
            )}
          </div>

          {/* Table of Contents - Hidden on mobile */}
          <TableOfContents />
        </div>
      </main>

      <ModeSwitcher />

      {/* Search Modal - Rendered at page level */}
      <SearchCommandPalette
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={handleSearchNavigate}
      />
    </div>
  );
}
