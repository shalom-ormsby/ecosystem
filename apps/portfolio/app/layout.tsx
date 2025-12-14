import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CustomizerPanel } from '@shalom/design-system/features/customizer';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

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
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-background text-foreground antialiased`}>
        {children}
        <CustomizerPanel />
      </body>
    </html>
  );
}
