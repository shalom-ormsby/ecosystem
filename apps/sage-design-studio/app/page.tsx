'use client';

import { useState } from 'react';
import { CustomizerPanel } from '@ecosystem/design-system';
import { StudioHero } from './components/studio/StudioHero';
import { SectionNav } from './components/studio/SectionNav';
import { OverviewSection } from './components/studio/OverviewSection';
import { TokensSection } from './components/studio/TokensSection';
import { ComponentsSection } from './components/studio/ComponentsSection';
import { ComingSoonSection } from './components/studio/ComingSoonSection';

type Section = 'overview' | 'tokens' | 'atoms' | 'molecules' | 'organisms' | 'templates';

export default function StudioPage() {
  const [activeSection, setActiveSection] = useState<Section>('overview');

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <StudioHero />
      <SectionNav activeSection={activeSection} onSectionChange={setActiveSection} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {activeSection === 'overview' && <OverviewSection />}
        {activeSection === 'tokens' && <TokensSection />}
        {activeSection === 'atoms' && <ComponentsSection />}
        {activeSection === 'molecules' && <ComingSoonSection title="Molecules" />}
        {activeSection === 'organisms' && <ComingSoonSection title="Organisms" />}
        {activeSection === 'templates' && <ComingSoonSection title="Templates" />}
      </div>

      <CustomizerPanel />
    </main>
  );
}
