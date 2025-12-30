'use client';

import NextLink from 'next/link';
import { Header, Card, Link } from '@ecosystem/design-system/atoms';
import { ecosystemNavigation } from '@/lib/navigation';

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header
        logo={
          <NextLink href="/" className="font-bold text-lg text-foreground">
            Shalom Ormsby
          </NextLink>
        }
        navLinks={ecosystemNavigation}
      />
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 md:pt-40 pb-16 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Case Studies
            </h1>
            <p className="text-xl text-foreground opacity-70">
              Portfolio of Product Design & Creative Technology Work
            </p>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="pb-20 px-6">
          <div className="max-w-3xl mx-auto">
            <Card hoverEffect={false} className="p-12 text-center">
              <div className="space-y-4">
                <div className="text-6xl mb-6">🚧</div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Coming Soon
                </h2>
                <p className="text-lg text-foreground opacity-80">
                  Detailed case studies showcasing product design process, research, and outcomes are currently being prepared.
                </p>
                <p className="text-base text-foreground opacity-60 pt-4">
                  In the meantime, feel free to explore the{' '}
                  <Link variant="inline" href="/cosmograph">
                    Cosmograph
                  </Link>
                  {' '}or{' '}
                  <Link variant="inline" href="https://studio.shalomormsby.com">
                    Sage Design Studio
                  </Link>
                  .
                </p>
              </div>
            </Card>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-foreground/10 py-8 px-6 mt-auto">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-foreground opacity-60 text-sm">
              © {new Date().getFullYear()} Shalom Ormsby
            </p>
            <nav className="flex gap-6">
              <a
                href="mailto:shalom@shalomormsby.com"
                className="text-foreground hover:text-primary transition-colors text-sm"
              >
                Email
              </a>
              <a
                href="https://github.com/shalom-ormsby"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors text-sm"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/shalomormsby"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors text-sm"
              >
                LinkedIn
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  );
}
