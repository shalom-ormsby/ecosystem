'use client';

import NextLink from 'next/link';
import { Card, Link, Header, Footer } from '@ecosystem/design-system';
import { ecosystemNavigation } from '../lib/navigation';

export default function Home() {
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
                <a
                  href="https://studio.shalomormsby.com"
                  className="block px-2 py-1 -mx-2 -my-1 rounded transition-all duration-200 hover:bg-[var(--color-link-hover)] hover:text-[var(--color-link-hover-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2"
                >
                  → Sage Design Studio
                </a>
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
      <Footer
        logo={<NextLink href="/">Shalom Ormsby</NextLink>}
        sections={[
          {
            title: 'Work',
            links: [
              { label: 'Portfolio (Case Studies)', href: '/case-studies' },
              { label: 'Resume', href: '/resume.pdf', external: true },
            ],
          },
          {
            title: 'Play',
            links: [
              { label: 'Creative Sandbox', href: 'https://ecosystem-creative-powerup.vercel.app/', external: true },
              { label: 'Love Is the Way', href: 'https://shalomormsby.substack.com/', external: true },
              { label: 'Poetry', href: '/poetry' },
              { label: 'Art in Space', href: '/art-in-space' },
            ],
          },
          {
            title: 'Tools',
            links: [
              { label: 'Sage Design Studio', href: 'https://studio.shalomormsby.com', external: true },
              { label: 'Cosmograph', href: '/cosmograph' },
              { label: 'Sage Stocks', href: '/sage-stocks' },
              { label: 'SageOS', href: '/sageos' },
            ],
          },
        ]}
        socialLinks={{
          github: 'https://github.com/shalom-ormsby',
          linkedin: 'https://www.linkedin.com/in/shalomormsby',
          email: 'shalom@shalomormsby.com',
        }}
        copyright={`© ${new Date().getFullYear()} Shalom Ormsby`}
      />
    </main>
  );
}
