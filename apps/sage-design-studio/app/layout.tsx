import type { Metadata } from 'next';
import { ThemeProvider } from '@ecosystem/design-system';
import { allFontVariables } from '../lib/fonts';
import './globals.css';

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
    <html lang="en" className={allFontVariables}>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
