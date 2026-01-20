import type { Metadata } from 'next';
import { ThemeProvider, ToastProvider, CustomizerPanel } from '@sds/ui';
import { allFontVariables } from '../lib/fonts';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sage Studio',
  description: 'The Solopreneur\'s Development Stack. AI-Native components for velocity.',
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
            <CustomizerPanel />
          </ToastProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
