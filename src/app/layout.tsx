import type { Metadata } from 'next';
import { Montserrat, Playfair_Display } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import CookieConsent from '@/components/CookieConsent';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'The Astra Flow | WaaS Plans & Custom Digital Solutions',
    template: '%s | The Astra Flow',
  },
  description:
    'Flexible digital solutions for every business. Choose transparent WaaS website plans or bespoke custom services. Beautiful design, powerful results, accessible pricing.',
  keywords: [
    'digital marketing agency',
    'web development',
    'SEO services',
    'social media marketing',
    'branding design',
    'website as a service',
    'WaaS plans',
    'custom web solutions',
  ],
  authors: [{ name: 'The Astra Flow' }],
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon.png',
      },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'The Astra Flow',
    title: 'The Astra Flow | WaaS Plans & Custom Digital Solutions',
    description:
      'Flexible digital solutions for every business. Choose transparent WaaS website plans or bespoke custom services. Beautiful design, powerful results, accessible pricing.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@theastroflow',
    creator: '@theastroflow',
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
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <SmoothScroll />
        <HeaderWrapper />
        {children}
        <Footer />
        <CookieConsent />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
