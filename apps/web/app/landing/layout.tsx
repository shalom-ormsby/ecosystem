import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sage — Make it Lovable',
  description: 'Components that feel alive. Themes with real personality. Motion your users control. Designed for humans. Fluent with AI.',
  keywords: [
    'design system',
    'design tokens',
    'ui components',
    'react components',
    'tailwind css',
    'typescript',
    'accessibility',
    'wcag',
    'theming',
    'design patterns',
    'ui library',
    'component library',
  ],
  authors: [{ name: 'Sage Design Engine Team' }],
  creator: 'Sage Design Engine',
  publisher: 'Sage Design Engine',
  openGraph: {
    title: 'Sage — Make it Lovable',
    description: 'Components that feel alive. Themes with real personality. Motion your users control. Designed for humans. Fluent with AI.',
    url: 'https://thesage.dev',
    siteName: 'Sage',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sage — Make it Lovable',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sage — Make it Lovable',
    description: 'Components that feel alive. Themes with real personality. Motion your users control. Designed for humans. Fluent with AI.',
    images: ['/og-image.png'],
    creator: '@sageui',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
