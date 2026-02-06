import { Button, FaultyTerminal, Typewriter, Footer, Header } from '@thesage/ui';
import Link from 'next/link';
import { Github } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-black dark">
      <Header
        logo={<span className="text-xl font-bold tracking-tight">Sage Design Engine</span>}
        navAlignment="right"
        navLinks={[
          { label: 'Documentation', href: '/docs' },
          { label: 'Components', href: '/docs#components' },
          { label: 'Themes', href: '/docs#themes' },
        ]}
        actions={
          <Button
            variant="outline"
            size="sm"
            asChild
            className="gap-2"
          >
            <a
              href="https://github.com/shalomormsby/ecosystem"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4" />
              Star on GitHub
            </a>
          </Button>
        }
      />

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <FaultyTerminal tint="#ef4444" />
      </div>

      <div className="flex-1 flex items-center justify-center relative z-10 w-full px-6 pointer-events-none">
        <div className="max-w-xl w-full text-center pointer-events-auto">
          <div className="space-y-8">
            {/* Error Icon - 404 Text */}
            <div className="flex flex-col items-center justify-center select-none pt-[75px] md:pt-[100px]">
              <h1
                className="text-[12rem] leading-none font-black text-transparent"
                style={{
                  WebkitTextStroke: '4px var(--color-error)'
                }}
              >
                404
              </h1>
              <h2 className="text-4xl font-bold text-[var(--color-text-primary)] mt-[-20px] mb-8">
                Sorry, my bad.
              </h2>
            </div>

            {/* Typewriter Message Container */}
            <div className="bg-black border border-white/20 p-6 rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-sm relative z-20">
              <div
                className="min-h-[60px] flex items-center justify-center"
                style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
              >
                <Typewriter
                  text="I can't find the page you're looking for. Was it moved? Deleted? Did it ever exist in the first place?   ¯\_(ツ)_/¯"
                  speed={0.03}
                  loop={false}
                  cursor="_"
                  className="text-sm md:text-base text-[var(--color-text-primary)] leading-relaxed font-normal"
                  as="p"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-8 pb-12">
              <Button variant="default" size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/">
                  Go to Homepage
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/docs#getting-started">
                  Browse Components
                </Link>
              </Button>
            </div>

            <p className="text-sm text-[var(--color-text-muted)] pb-[75px] md:pb-[100px]">
              If this problem persists, please{' '}
              <a
                href="https://github.com/shalomormsby/ecosystem/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-primary)] hover:underline"
              >
                report an issue
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 w-full pointer-events-auto">
        <Footer
          className="bg-black/50 backdrop-blur-sm border-white/10"
          copyright="© 2026 Sage Design Engine. All rights reserved."
          sections={[
            {
              title: "Docs",
              links: [
                { label: "Getting Started", href: "/docs#getting-started" },
                { label: "Design Philosophy", href: "https://github.com/shalomormsby/ecosystem/blob/main/DESIGN-PHILOSOPHY.md", external: true },
                { label: "README.md", href: "https://github.com/shalomormsby/ecosystem/blob/main/README.md", external: true },
                { label: "AGENTS.md", href: "https://github.com/shalomormsby/ecosystem/blob/main/AGENTS.md", external: true }
              ]
            },
            {
              title: "Building Blocks",
              links: [
                { label: "Design Tokens", href: "/docs#foundations" },
                { label: "Components", href: "/docs#components" },
                { label: "Blocks", href: "/docs#blocks" },
              ]
            },
            {
              title: "Toolkit",
              links: [
                { label: "MCP Server", href: "/docs#mcp-server" },
                { label: "Hooks", href: "/docs#hooks" },
                { label: "Motion", href: "/docs#motion" },
                { label: "Charts", href: "/docs#charts" },
              ]
            }
          ]}
        />
      </div>
    </div>
  );
}
