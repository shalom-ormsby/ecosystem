import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { ThemeProvider } from '@ecosystem/design-system';
import './globals.css';

/**
 * Documentation Font: Nunito
 *
 * Design System Documentation Best Practice:
 * Using a separate font for documentation creates clear visual separation
 * between the documentation UI (meta-level) and the design system components
 * being showcased (examples). This is the approach used by major design systems
 * like Material Design, Atlassian Design System, and Shopify Polaris.
 *
 * Benefits:
 * - Clear distinction between docs chrome and component examples
 * - Documentation optimized for readability
 * - Component examples stand out visually
 * - Easier to document typography tokens without confusion
 */
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
      <body className={nunito.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
