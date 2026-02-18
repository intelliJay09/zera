import { Metadata } from 'next';
import GrowthSystemContent from './GrowthSystemContent';

export const metadata: Metadata = {
  title: 'The Growth System | Automated Lead Acquisition & CRM Pipelines',
  description:
    'Automate your customer acquisition. We install the "Lead Capture Engine" that connects traffic to revenue. Speed-to-lead automation for high-velocity teams.',
  keywords: [
    'lead generation systems',
    'CRM automation',
    'marketing automation',
    'customer acquisition',
    'revenue operations',
    'sales pipeline automation',
    'conversion rate optimization',
  ],
  openGraph: {
    title: 'The Growth System | Automate Revenue',
    description:
      'Traffic without capture is waste. Install the machinery that brings customers to you.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://zerahq.com'}/products/growth-system`,
    type: 'website',
    images: [
      {
        url: '/images/og-zera-sovereign.png',
        width: 3000,
        height: 1575,
        alt: 'The Growth System - Automated Lead Acquisition & CRM Pipelines',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Growth System | Automate Revenue',
    description:
      'Traffic without capture is waste. Install the machinery that brings customers to you.',
    images: ['/images/og-zera-sovereign.png'],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://zerahq.com'}/products/growth-system`,
  },
};

export default function GrowthSystemPage() {
  return <GrowthSystemContent />;
}
