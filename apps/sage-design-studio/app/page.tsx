'use client';

import { useState } from 'react';
import { ModeSwitcher } from './components/ModeSwitcher';
import { NavigationSidebar } from './components/NavigationSidebar';
import { SearchCommandPalette } from './components/SearchCommandPalette';
import { TableOfContents } from './components/TableOfContents';
import { OverviewSection } from './components/studio/OverviewSection';
import { TokensSection } from './components/studio/TokensSection';
import { ComponentsSection } from './components/studio/ComponentsSection';
import { MoleculesSection } from './components/studio/MoleculesSection';
import { OrganismsSection } from './components/studio/OrganismsSection';
import { HooksSection } from './components/studio/HooksSection';
import { TemplatesSection } from './components/studio/TemplatesSection';

type Section = 'overview' | 'tokens' | 'atoms' | 'molecules' | 'organisms' | 'hooks' | 'templates';

export default function StudioPage() {
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [activeItemId, setActiveItemId] = useState<string>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Main Content */}
        <main className="flex-1 min-h-screen flex flex-col">
          {/* Top Bar with Search and Mobile Menu */}
          <div className="sticky top-0 z-30 bg-[var(--color-background)] border-b border-[var(--color-border)]">
            <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-[var(--color-hover)] rounded-lg transition-colors"
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

              <SearchCommandPalette onNavigate={handleSearchNavigate} />
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex">
            <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
              {activeSection === 'overview' && <OverviewSection />}
              {activeSection === 'tokens' && <TokensSection />}
              {activeSection === 'atoms' && <ComponentsSection />}
              {activeSection === 'molecules' && <MoleculesSection />}
              {activeSection === 'organisms' && <OrganismsSection />}
              {activeSection === 'hooks' && <HooksSection />}
              {activeSection === 'templates' && <TemplatesSection />}
            </div>

            {/* Table of Contents - Placeholder for now */}
            <TableOfContents />
          </div>
        </main>
      </div>

      <ModeSwitcher />
    </div>
  );
}
