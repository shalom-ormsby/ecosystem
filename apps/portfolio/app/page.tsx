'use client';

import NextLink from 'next/link';
import { Card, Link } from '@ecosystem/design-system/atoms';

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="pt-20 md:pt-32 pb-16 px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Shalom Ormsby
            </h1>
            <p className="text-xl md:text-2xl text-foreground opacity-70 mb-8">
              Product Designer & Creative Technologist
            </p>

            <p className="text-lg text-foreground opacity-80 leading-relaxed mb-4">
              Philosophy is meaningful when embodied.
            </p>
            <Link
              href="https://github.com/shalom-ormsby/ecosystem/blob/main/DESIGN-PHILOSOPHY.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              → Read my design philosophy
            </Link>
          </div>
        </section>

        {/* Navigation Sections */}
        <section className="pb-20 px-6">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Work */}
            <Card hoverEffect={false} className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 pb-3 border-b border-foreground/10">
                Work
              </h2>
              <nav className="space-y-3">
                <NextLink
                  href="/case-studies"
                  className="block px-2 py-1 -mx-2 -my-1 rounded transition-all duration-200 hover:bg-[var(--color-link-hover)] hover:text-[var(--color-link-hover-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2"
                >
                  → Portfolio (Case Studies)
                </NextLink>
                <Link
                  href="/resume.pdf"
                  className="block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  → Resume (PDF)
                </Link>
              </nav>
            </Card>

            {/* Play */}
            <Card hoverEffect={false} className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 pb-3 border-b border-foreground/10">
                Play
              </h2>
              <nav className="space-y-3">
                <Link
                  href="https://ecosystem-creative-powerup.vercel.app/"
                  className="block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  → Creative Sandbox
                </Link>
                <Link
                  href="https://shalomormsby.substack.com/"
                  className="block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  → Love Is the Way
                </Link>
                <NextLink
                  href="/poetry"
                  className="block px-2 py-1 -mx-2 -my-1 rounded transition-all duration-200 hover:bg-[var(--color-link-hover)] hover:text-[var(--color-link-hover-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2"
                >
                  → Poetry
                </NextLink>
                <NextLink
                  href="/art-in-space"
                  className="block px-2 py-1 -mx-2 -my-1 rounded transition-all duration-200 hover:bg-[var(--color-link-hover)] hover:text-[var(--color-link-hover-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2"
                >
                  → Art in Space
                </NextLink>
              </nav>
            </Card>

            {/* Tools */}
            <Card hoverEffect={false} className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 pb-3 border-b border-foreground/10">
                Tools
              </h2>
              <nav className="space-y-3">
                <NextLink
                  href="/studio"
                  className="block px-2 py-1 -mx-2 -my-1 rounded transition-all duration-200 hover:bg-[var(--color-link-hover)] hover:text-[var(--color-link-hover-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2"
                >
                  → Sage Design Studio
                </NextLink>
                <NextLink
                  href="/cosmograph"
                  className="block px-2 py-1 -mx-2 -my-1 rounded transition-all duration-200 hover:bg-[var(--color-link-hover)] hover:text-[var(--color-link-hover-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2"
                >
                  → Cosmograph (Explore Everything)
                </NextLink>
                <NextLink
                  href="/sage-stocks"
                  className="block px-2 py-1 -mx-2 -my-1 rounded transition-all duration-200 hover:bg-[var(--color-link-hover)] hover:text-[var(--color-link-hover-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2"
                >
                  → Sage Stocks
                </NextLink>
                <NextLink
                  href="/sageos"
                  className="block px-2 py-1 -mx-2 -my-1 rounded transition-all duration-200 hover:bg-[var(--color-link-hover)] hover:text-[var(--color-link-hover-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2"
                >
                  → SageOS
                </NextLink>
              </nav>
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
