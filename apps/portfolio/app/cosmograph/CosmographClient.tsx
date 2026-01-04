'use client';

import NextLink from 'next/link';
import { Header, Breadcrumbs } from '@ecosystem/design-system';
import { ecosystemNavigation } from '@/lib/navigation';
import { NavigationFallback } from '@/components/cosmograph/NavigationFallback';
import type { Node } from '@/lib/content/types';

interface CosmographClientProps {
  nodes: Node[];
}

export function CosmographClient({ nodes }: CosmographClientProps) {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header
        logo={
          <NextLink href="/" className="font-header font-bold text-lg text-foreground">
            Shalom Ormsby
          </NextLink>
        }
        navLinks={ecosystemNavigation}
      />
      <div className="flex-grow">
        <div className="container mx-auto px-6 py-12">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Cosmograph' }
            ]}
            className="mb-8"
          />
          <NavigationFallback nodes={nodes} />
        </div>
      </div>
    </main>
  );
}
