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

type Section =
  | 'overview'
  | 'architecture'
  | 'adding-components'
  | 'common-patterns'
  | 'contributing'
  | 'tokens'
  | 'atoms'
  | 'molecules'
  | 'organisms'
  | 'hooks'
  | 'templates'
  | 'motion';

// Route configuration for breadcrumb labels
const routeConfig: RouteConfig = {
  overview: { label: 'Overview' },
  architecture: { label: 'Architecture' },
  'adding-components': { label: 'Adding Components' },
  'common-patterns': { label: 'Common Patterns' },
  contributing: { label: 'Contributing' },
  tokens: {
    label: 'Design Tokens',
    children: {
      colors: { label: 'Colors' },
      typography: { label: 'Typography' },
      spacing: { label: 'Spacing' },
      shadows: { label: 'Shadows' },
      borders: { label: 'Borders' },
    }
  },
  atoms: {
    label: 'Components',
    children: {
      button: { label: 'Button' },
      card: { label: 'Card' },
      code: { label: 'Code' },
      link: { label: 'Link' },
      badge: { label: 'Badge' },
      avatar: { label: 'Avatar' },
      spinner: { label: 'Spinner' },
      'progress-bar': { label: 'Progress Bar' },
      switch: { label: 'Switch' },
    }
  },
  molecules: {
    label: 'Molecules',
    children: {
      breadcrumbs: { label: 'Breadcrumbs' },
      dropdown: { label: 'Dropdown' },
      tooltip: { label: 'Tooltip' },
      'theme-toggle': { label: 'Theme Toggle' },
      'theme-switcher': { label: 'Theme Switcher' },
      'form-field': { label: 'Form Field' },
      'search-bar': { label: 'Search Bar' },
      'radio-group': { label: 'Radio Group' },
      'checkbox-group': { label: 'Checkbox Group' },
    }
  },
  organisms: {
    label: 'Organisms',
    children: {
      'primary-nav': { label: 'Primary Nav' },
      'secondary-nav': { label: 'Secondary Nav' },
      'tertiary-nav': { label: 'Tertiary Nav' },
      'first-stack': { label: '1st Stacking Row' },
      'second-stack': { label: '2nd Stacking Row' },
      footer: { label: 'Footer' },
      toast: { label: 'Toast' },
      modal: { label: 'Modal' },
      'collapsible-code-block': { label: 'Collapsible Code Block' },
      customizer: { label: 'Customizer' },
      'page-layout': { label: 'Page Layout' },
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
      'contributing', 'tokens', 'atoms', 'molecules', 'organisms',
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
        'contributing', 'tokens', 'atoms', 'molecules', 'organisms',
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
    // Parse path to determine section and item (e.g., 'atoms-button' -> section='atoms', item='button')
    if (path === 'overview') {
      setActiveSection('overview');
      setActiveItemId('overview');
    } else if (path.startsWith('tokens')) {
      setActiveSection('tokens');
      // Extract specific token item (e.g., 'tokens-colors' -> 'colors')
      const itemId = path.replace('tokens-', '');
      setActiveItemId(itemId);
    } else if (path.startsWith('atoms')) {
      setActiveSection('atoms');
      const itemId = path.replace('atoms-', '');
      setActiveItemId(itemId);
    } else if (path.startsWith('molecules')) {
      setActiveSection('molecules');
      const itemId = path.replace('molecules-', '');
      setActiveItemId(itemId);
    } else if (path.startsWith('organisms')) {
      setActiveSection('organisms');
      const itemId = path.replace('organisms-', '');
      setActiveItemId(itemId);
    } else if (path.startsWith('hooks')) {
      setActiveSection('hooks');
      const itemId = path.replace('hooks-', '');
      setActiveItemId(itemId);
    } else if (path.startsWith('templates')) {
      setActiveSection('templates');
      setActiveItemId('templates-overview');
    } else if (path.startsWith('utilities')) {
      setActiveSection('hooks'); // Utilities shown in Hooks section for now
      const itemId = path.replace('utilities-', '');
      setActiveItemId(itemId);
    } else if (path.startsWith('motion-') || ['text-effects', 'scroll', 'loading', 'interactive', 'transitions', 'cursor-effects'].includes(path)) {
      setActiveSection('motion');
      setActiveItemId(path);
    }

    // Scroll to top after navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
            {activeSection === 'adding-components' && <AddingComponentsSection breadcrumbs={breadcrumbs} />}
            {activeSection === 'common-patterns' && <CommonPatternsSection breadcrumbs={breadcrumbs} />}
            {activeSection === 'contributing' && <ContributingSection breadcrumbs={breadcrumbs} />}
            {activeSection === 'tokens' && (
              <TokensSection
                activeItemId={activeItemId}
                breadcrumbs={breadcrumbs}
                onItemChange={(itemId) => setActiveItemId(itemId)}
              />
            )}
            {activeSection === 'atoms' && (
              <ComponentsSection
                activeItemId={activeItemId}
                breadcrumbs={breadcrumbs}
                onItemChange={(itemId) => setActiveItemId(itemId)}
              />
            )}
            {activeSection === 'molecules' && (
              <MoleculesSection
                activeItemId={activeItemId}
                breadcrumbs={breadcrumbs}
                onItemChange={(itemId) => setActiveItemId(itemId)}
              />
            )}
            {activeSection === 'organisms' && (
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
