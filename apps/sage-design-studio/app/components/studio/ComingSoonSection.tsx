'use client';

import { Card } from '@ecosystem/design-system';

interface ComingSoonSectionProps {
  title: string;
}

export function ComingSoonSection({ title }: ComingSoonSectionProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="p-12 text-center max-w-2xl">
        <h2 className="text-3xl font-bold mb-4 text-[var(--color-text-primary)]">
          {title}
        </h2>
        <p className="text-lg text-[var(--color-text-secondary)] mb-6">
          Coming soon. This section is currently under development.
        </p>
        <p className="text-sm text-[var(--color-text-muted)]">
          Check back later or contribute to the design system on GitHub.
        </p>
      </Card>
    </div>
  );
}
