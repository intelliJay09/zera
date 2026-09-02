import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';
import FooterWrapper from '@/components/layout/FooterWrapper';
import SmoothScroll from '@/components/SmoothScroll';
import CookieConsent from '@/components/CookieConsent';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import StructuredData from '@/components/seo/StructuredData';
import './globals.css';

const latoRegular = Lato({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-lato-regular',
  display: 'swap',
});

const latoBold = Lato({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-lato-bold',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://zerahq.com'),
  title: {
    default: 'Zera | Revenue, Realized.',
    template: '%s | Zera',
  },
  description:
    'Zera turns leads into closed deals and stops customers from quietly walking away, then proves it every month.',
  keywords: [
    'Revenue Infrastructure',
    'Revenue Operations',
    'Operational Systems',
    'Web Architecture',
    'SEO Ghana',
    'Lead Generation Systems',
    'Commercial Web Design',
    'Pipeline Automation',
    'CRM Integration',
    'Business Process Automation',
    'Zera Dynamics',
  ],
  authors: [{ name: 'Zera' }],
  creator: 'Zera Dynamics Ltd.',
  publisher: 'Zera Dynamics Ltd.',
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://zerahq.com',
    siteName: 'Zera',
    title: 'Zera | Revenue, Realized.',
    description:
      'Zera catches the revenue your business is already losing, the lead that goes unanswered, the customer who quietly stops buying, and proves it, every month, in real numbers.',
    images: [
      {
        url: '/images/og-zera-primary.png',
        width: 3000,
        height: 1575,
        alt: 'Zera | Revenue, Realized.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@zerahq',
    creator: '@zerahq',
    title: 'Zera | Revenue, Realized.',
    description:
      'Zera turns leads into closed deals and stops customers from quietly walking away, then proves it every month.',
    images: ['/images/og-zera-primary.png'],
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
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${latoRegular.variable} ${latoBold.variable}`}>
      {/* JSON-LD Structured Data for SEO */}
      <StructuredData />

      {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="lazyOnload"
        />
      )}
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      )}
      <body className="font-sans antialiased">
        <SmoothScroll />
        <HeaderWrapper />
        {children}
        <FooterWrapper />
        <CookieConsent />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
