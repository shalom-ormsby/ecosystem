import type { Metadata } from 'next';
import { Nunito, Nunito_Sans } from 'next/font/google';
import { ThemeProvider } from '@ecosystem/design-system';
import './globals.css';

/**
 * Documentation Fonts
 *
 * Design System Documentation Best Practice:
 * Using separate fonts for documentation creates clear visual separation
 * between the documentation UI (meta-level) and the design system components
 * being showcased (examples). This is the approach used by major design systems
 * like Material Design, Atlassian Design System, and Shopify Polaris.
 *
 * Typography Hierarchy:
 * - Nunito Sans: Headings (h1-h6) - Professional, clean, less rounded
 * - Nunito: Body text - Warm, friendly, highly readable
 *
 * Benefits:
 * - Clear distinction between docs chrome and component examples
 * - Documentation optimized for readability
 * - Professional headings with friendly body text
 * - Component examples stand out visually
 * - Easier to document typography tokens without confusion
 */
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
    <html lang="en">
      <body className={`${nunito.variable} ${nunitoSans.variable}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
