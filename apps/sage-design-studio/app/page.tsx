'use client';

import { useState } from 'react';
import NextLink from 'next/link';
import { Header } from '@ecosystem/design-system';
import { ModeSwitcher } from './components/ModeSwitcher';
import { StudioHero } from './components/studio/StudioHero';
import { SectionNav } from './components/studio/SectionNav';
import { OverviewSection } from './components/studio/OverviewSection';
import { TokensSection } from './components/studio/TokensSection';
import { ComponentsSection } from './components/studio/ComponentsSection';
import { MoleculesSection } from './components/studio/MoleculesSection';
import { OrganismsSection } from './components/studio/OrganismsSection';
import { TemplatesSection } from './components/studio/TemplatesSection';
import { ecosystemNavigation } from '../lib/navigation';

type Section = 'overview' | 'tokens' | 'atoms' | 'molecules' | 'organisms' | 'templates';

export default function StudioPage() {
  const [activeSection, setActiveSection] = useState<Section>('overview');

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <Header
        logo={
          <a href="https://www.shalomormsby.com" className="font-bold text-lg text-[var(--color-text-primary)]">
            Shalom Ormsby
          </a>
        }
        navLinks={ecosystemNavigation}
      />
      <StudioHero />
      <SectionNav activeSection={activeSection} onSectionChange={setActiveSection} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {activeSection === 'overview' && <OverviewSection />}
        {activeSection === 'tokens' && <TokensSection />}
        {activeSection === 'atoms' && <ComponentsSection />}
        {activeSection === 'molecules' && <MoleculesSection />}
        {activeSection === 'organisms' && <OrganismsSection />}
        {activeSection === 'templates' && <TemplatesSection />}
      </div>

      <ModeSwitcher />
    </main>
  );
}
