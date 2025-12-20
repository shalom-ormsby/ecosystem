'use client';

import Link from 'next/link';
import { Card } from '@ecosystem/design-system/atoms';

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
              Philosophy is only meaningful when embodied. This ecosystem demonstrates
              human-centered design through architecture and experience, not mere description.
            </p>
            <Link
              href="https://github.com/shalom-ormsby/ecosystem/blob/main/DESIGN-PHILOSOPHY.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              → Read the full philosophy
            </Link>
          </div>
        </section>

        {/* Navigation Sections */}
        <section className="pb-20 px-6">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Work */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 pb-3 border-b border-foreground/10">
                Work
              </h2>
              <nav className="space-y-3">
                <Link
                  href="/case-studies"
                  className="block text-foreground hover:text-primary transition-colors"
                >
                  → Portfolio (Case Studies)
                </Link>
                <a
                  href="/resume.pdf"
                  className="block text-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  → Resume (PDF)
                </a>
              </nav>
            </Card>

            {/* Play */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 pb-3 border-b border-foreground/10">
                Play
              </h2>
              <nav className="space-y-3">
                <a
                  href="https://ecosystem-creative-powerup.vercel.app/"
                  className="block text-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  → Creative Sandbox
                </a>
                <a
                  href="https://loveistheway.substack.com"
                  className="block text-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  → Love Is the Way (Substack)
                </a>
                <Link
                  href="/poetry"
                  className="block text-foreground hover:text-primary transition-colors"
                >
                  → Poetry
                </Link>
                <Link
                  href="/art-in-space"
                  className="block text-foreground hover:text-primary transition-colors"
                >
                  → Art in Space
                </Link>
              </nav>
            </Card>

            {/* Tools */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 pb-3 border-b border-foreground/10">
                Tools
              </h2>
              <nav className="space-y-3">
                <Link
                  href="/design-system"
                  className="block text-foreground hover:text-primary transition-colors"
                >
                  → Design System
                </Link>
                <Link
                  href="/sage-stocks"
                  className="block text-foreground hover:text-primary transition-colors"
                >
                  → Sage Stocks
                </Link>
                <Link
                  href="/sageos"
                  className="block text-foreground hover:text-primary transition-colors"
                >
                  → SageOS
                </Link>
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
