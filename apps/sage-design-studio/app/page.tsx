'use client';

import { useState } from 'react';
import NextLink from 'next/link';
import { Header } from '@ecosystem/design-system';
import { ModeSwitcher } from './components/ModeSwitcher';
import { StudioHero } from './components/studio/StudioHero';
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
import { ecosystemNavigation } from '../lib/navigation';

type Section = 'overview' | 'tokens' | 'atoms' | 'molecules' | 'organisms' | 'hooks' | 'templates';

export default function StudioPage() {
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handle navigation from search results
  const handleSearchNavigate = (path: string) => {
    // Parse path to determine section (e.g., 'atoms-button' -> 'atoms')
    if (path === 'overview') {
      setActiveSection('overview');
    } else if (path.startsWith('tokens')) {
      setActiveSection('tokens');
    } else if (path.startsWith('atoms')) {
      setActiveSection('atoms');
    } else if (path.startsWith('molecules')) {
      setActiveSection('molecules');
    } else if (path.startsWith('organisms')) {
      setActiveSection('organisms');
    } else if (path.startsWith('hooks')) {
      setActiveSection('hooks');
    } else if (path.startsWith('templates')) {
      setActiveSection('templates');
    } else if (path.startsWith('utilities')) {
      setActiveSection('hooks'); // Utilities shown in Hooks section for now
    }

    // Scroll to top after navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Header
        logo={
          <a href="https://www.shalomormsby.com" className="font-bold text-lg text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-header-logo)' }}>
            Shalom Ormsby
          </a>
        }
        navLinks={ecosystemNavigation}
      />
      <StudioHero />

      {/* Search Bar with Hamburger Menu */}
      <div className="sticky top-0 z-40 bg-[var(--color-background)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
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

      {/* Sidebar + Content Layout */}
      <div className="flex">
        <NavigationSidebar
          activeSection={activeSection}
          onNavigate={(section) => {
            setActiveSection(section as Section);
            setSidebarOpen(false); // Close sidebar on mobile after navigation
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex gap-8">
              {/* Content Area */}
              <div className="flex-1 min-w-0">
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
          </div>
        </main>
      </div>

      <ModeSwitcher />
    </div>
  );
}
