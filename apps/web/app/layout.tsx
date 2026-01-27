import type { Metadata } from 'next';
import { ThemeProvider, ToastProvider, CustomizerPanel, TooltipProvider } from '@thesage/ui';
import { allFontVariables } from '../lib/fonts';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sage UI',
  description: 'The Solopreneur\'s Development Stack. AI-Native components for velocity.',
  metadataBase: new URL('https://thesage.dev'),
  openGraph: {
    title: 'Sage UI',
    description: 'The Solopreneur\'s Development Stack. AI-Native components for velocity.',
    url: 'https://thesage.dev',
    siteName: 'Sage UI',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sage UI',
    description: 'The Solopreneur\'s Development Stack. AI-Native components for velocity.',
    creator: '@shalomormsby',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={allFontVariables} suppressHydrationWarning>
      <body className="overflow-x-hidden" suppressHydrationWarning>
        <ThemeProvider>
          <ToastProvider position="bottom-right">
            <TooltipProvider>
              {children}
              <CustomizerPanel />
            </TooltipProvider>
          </ToastProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
