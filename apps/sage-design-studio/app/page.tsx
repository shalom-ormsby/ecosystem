'use client';

import { useState, useEffect } from 'react';
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
  | 'templates';

export default function StudioPage() {
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [activeItemId, setActiveItemId] = useState<string>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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
    }

    // Scroll to top after navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex">
      {/* Sidebar + Content Layout */}
      <div className="flex flex-1">
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
        <main className="flex-1 min-h-screen flex">
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
          <div className="flex-1 flex">
            <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
              {activeSection === 'overview' && <OverviewSection />}
              {activeSection === 'architecture' && <ArchitectureSection />}
              {activeSection === 'adding-components' && <AddingComponentsSection />}
              {activeSection === 'common-patterns' && <CommonPatternsSection />}
              {activeSection === 'contributing' && <ContributingSection />}
              {activeSection === 'tokens' && <TokensSection activeItemId={activeItemId} />}
              {activeSection === 'atoms' && <ComponentsSection activeItemId={activeItemId} />}
              {activeSection === 'molecules' && <MoleculesSection activeItemId={activeItemId} />}
              {activeSection === 'organisms' && <OrganismsSection activeItemId={activeItemId} />}
              {activeSection === 'hooks' && <HooksSection activeItemId={activeItemId} />}
              {activeSection === 'templates' && <TemplatesSection />}
            </div>

            {/* Table of Contents */}
            <TableOfContents />
          </div>
        </main>
      </div>

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
