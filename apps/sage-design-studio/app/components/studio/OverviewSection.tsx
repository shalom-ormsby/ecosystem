'use client';

import { Card } from '@ecosystem/design-system';

export function OverviewSection() {
  const features = [
    {
      title: 'Design Tokens',
      description: 'Single source of truth for colors, typography, spacing, and motion across all three themes.',
      icon: '🎨',
    },
    {
      title: 'Customizer',
      description: 'User Control & Freedom embodied. Switch themes, adjust motion intensity, and personalize your experience.',
      icon: '⚙️',
    },
    {
      title: 'Motion System',
      description: 'Respects user preferences and system settings. Zero animations when disabled—accessibility first.',
      icon: '✨',
    },
    {
      title: 'Open Source',
      description: 'Fully transparent and open. Explore the code, learn from the patterns, and use in your projects.',
      icon: '🌍',
    },
  ];

  const themes = [
    {
      name: 'Studio',
      personality: 'Professional, balanced, modern',
      fonts: 'Geist Sans, Geist Mono',
    },
    {
      name: 'Sage',
      personality: 'Calm, organic, thoughtful',
      fonts: 'Lora (serif), Instrument Sans',
    },
    {
      name: 'Volt',
      personality: 'Bold, electric, energetic',
      fonts: 'Space Grotesk',
    },
  ];

  return (
    <div className="space-y-16">
      {/* Philosophy */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-[var(--color-text-primary)]">
          Philosophy
        </h2>
        <Card className="p-8">
          <p className="text-lg text-[var(--color-text-primary)] leading-relaxed mb-4">
            Most design systems optimize for consistency and efficiency. Those matter here too.
            But they're not the point.
          </p>
          <p className="text-lg text-[var(--color-text-primary)] leading-relaxed">
            This design system exists to encode <strong>human-centered principles</strong> into
            reusable building blocks—so that every app in the ecosystem inherits not just visual
            consistency, but <em>philosophical</em> consistency. When you use these components,
            you're not just shipping pixels. You're shipping values.
          </p>
        </Card>
      </section>

      {/* Three Themes */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-[var(--color-text-primary)]">
          Three Themes, Infinite Expressions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {themes.map((theme) => (
            <Card key={theme.name} className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-[var(--color-text-primary)]">
                {theme.name}
              </h3>
              <p className="text-[var(--color-text-secondary)] mb-3">
                {theme.personality}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">
                Fonts: {theme.fonts}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Key Features */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-[var(--color-text-primary)]">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="p-6">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-[var(--color-text-primary)]">
                {feature.title}
              </h3>
              <p className="text-[var(--color-text-secondary)]">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-[var(--color-text-primary)]">
          Tech Stack
        </h2>
        <Card className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {['React 18', 'TypeScript', 'Framer Motion', 'Zustand', 'Tailwind CSS', 'tsup'].map((tech) => (
              <div key={tech} className="text-center">
                <p className="text-lg font-medium text-[var(--color-text-primary)]">
                  {tech}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
