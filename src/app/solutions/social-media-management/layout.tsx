import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Social Media Management | Strategic Brand Presence',
  description:
    'Strategic social media management that builds brand authority and drives engagement. Content creation, community management, and paid campaigns across all platforms.',
  keywords: [
    'Social Media Management',
    'Social Media Marketing',
    'Content Strategy',
    'Community Management',
    'Instagram Marketing',
    'LinkedIn Marketing',
    'Social Media Ghana',
  ],
  openGraph: {
    title: 'Social Media Management | ZERA',
    description:
      'Strategic social media management that builds brand authority and drives engagement across all platforms.',
    url: `${SITE_URL}/solutions/social-media-management`,
    siteName: 'ZERA',
    type: 'website',
    images: [
      {
        url: '/images/og-zera-primary.png',
        width: 3000,
        height: 1575,
        alt: 'ZERA Social Media Management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Social Media Management | ZERA',
    description:
      'Strategic social media management that builds brand authority and drives engagement.',
    site: '@zerahq',
    creator: '@zerahq',
    images: ['/images/og-zera-primary.png'],
  },
  alternates: {
    canonical: `${SITE_URL}/solutions/social-media-management`,
  },
};

export default function SocialMediaManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
