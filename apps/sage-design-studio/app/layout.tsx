import type { Metadata } from 'next';
import { Nunito, Nunito_Sans, Outfit, Manrope, Lora, Instrument_Sans, Space_Grotesk, Fira_Code } from 'next/font/google';
import { ThemeProvider } from '@ecosystem/design-system';
import './globals.css';

/**
 * Font Loading Strategy
 *
 * This app loads TWO sets of fonts:
 * 1. Documentation fonts (Nunito/Nunito Sans) - For the docs UI itself
 * 2. Design system theme fonts - For showing actual theme examples
 *
 * Documentation Fonts (applied to body):
 * - Nunito Sans: Headings (h1-h6)
 * - Nunito: Body text
 *
 * Design System Theme Fonts (CSS variables for examples):
 * - Studio: Outfit (heading) + Manrope (body)
 * - Sage: Lora (heading) + Instrument Sans (body)
 * - Volt: Space Grotesk (unified)
 */

// Documentation Fonts
const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  display: 'swap',
  weight: ['300', '400', '600', '700', '800'],
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
  weight: ['300', '400', '600', '700'],
});

// Studio Theme Fonts
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-studio-heading',
  display: 'swap',
  weight: ['300', '400', '600', '700', '800'],
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-studio-body',
  display: 'swap',
  weight: ['300', '400', '600', '700', '800'],
});

// Sage Theme Fonts
const lora = Lora({
  subsets: ['latin'],
  variable: '--font-sage-heading',
  display: 'swap',
  weight: ['400', '600', '700'],
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-sage-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// Instrument Sans also as --font-sage-sans for consistency with portfolio
const instrumentSansSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-sage-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// Volt Theme Fonts
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-volt-heading',
  display: 'swap',
  weight: ['300', '400', '600', '700'],
});

// Monospace (all themes)
const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Sage Design Studio',
  description: 'The heart of the ecosystem. Explore the design system, brand guidelines, and resources that power the entire ecosystem.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`
      ${nunito.variable} ${nunitoSans.variable}
      ${outfit.variable} ${manrope.variable}
      ${lora.variable} ${instrumentSans.variable} ${instrumentSansSans.variable}
      ${spaceGrotesk.variable} ${firaCode.variable}
    `}>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
