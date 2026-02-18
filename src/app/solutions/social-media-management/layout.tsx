import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zerahq.com';

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
    url: `${baseUrl}/solutions/social-media-management`,
    siteName: 'ZERA',
    type: 'website',
    images: [
      {
        url: '/images/og-zera-sovereign.png',
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
    images: ['/images/og-zera-sovereign.png'],
  },
  alternates: {
    canonical: `${baseUrl}/solutions/social-media-management`,
  },
};

export default function SocialMediaManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
