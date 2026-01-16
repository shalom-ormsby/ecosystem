import type { Metadata } from 'next';
import { ThemeProvider } from '@sds/ui';
import { ToastProvider } from '@sds/ui';
import { allFontVariables } from '../lib/fonts';
import { Analytics } from '@vercel/analytics/next';
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
      <body className="overflow-x-hidden">
        <ThemeProvider>
          <ToastProvider position="bottom-right">
            {children}
          </ToastProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
