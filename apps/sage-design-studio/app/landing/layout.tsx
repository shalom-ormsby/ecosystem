import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sage UI - A Systematic Design Language',
  description: 'A four-layer design system that brings systematic thinking to your UI—from atomic tokens to production-ready templates. Build with purpose, design with system.',
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
  authors: [{ name: 'Sage UI Team' }],
  creator: 'Sage UI',
  publisher: 'Sage UI',
  openGraph: {
    title: 'Sage UI - A Systematic Design Language',
    description: 'Build with purpose, design with system. A four-layer design system from tokens to templates.',
    url: 'https://sage-ui.com',
    siteName: 'Sage UI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sage UI - Systematic Design Language',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sage UI - A Systematic Design Language',
    description: 'Build with purpose, design with system. A four-layer design system from tokens to templates.',
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
