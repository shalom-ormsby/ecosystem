import type { Metadata } from 'next';
import { CustomizerPanel } from '@shalom/design-system/features/customizer';
import { ThemeProvider } from '@shalom/design-system';
import { allFontVariables } from '../lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shalom Ormsby | Product Design Leader',
  description: 'Human-centered design proven through experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={allFontVariables} suppressHydrationWarning>
      <body className="font-sans bg-background text-foreground antialiased" suppressHydrationWarning>
        <ThemeProvider>
          {children}
          <CustomizerPanel />
        </ThemeProvider>
      </body>
    </html>
  );
}
