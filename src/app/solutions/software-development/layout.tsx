import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Software Development | Custom Applications & SaaS',
  description:
    'Custom software development, mobile apps, and SaaS platforms that streamline operations and drive innovation. Scalable solutions tailored to your business requirements.',
  keywords: [
    'Custom Software Development',
    'Mobile App Development',
    'SaaS Development',
    'Enterprise Software',
    'API Development',
    'Software Development Ghana',
  ],
  openGraph: {
    title: 'Software Development | ZERA',
    description:
      'Custom software development, mobile apps, and SaaS platforms that drive innovation and streamline operations.',
    url: `${SITE_URL}/solutions/software-development`,
    siteName: 'ZERA',
    type: 'website',
    images: [
      {
        url: '/images/og-zera-primary.png',
        width: 3000,
        height: 1575,
        alt: 'ZERA Software Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software Development | ZERA',
    description:
      'Custom software development, mobile apps, and SaaS platforms.',
    site: '@zerahq',
    creator: '@zerahq',
    images: ['/images/og-zera-primary.png'],
  },
  alternates: {
    canonical: `${SITE_URL}/solutions/software-development`,
  },
};

export default function SoftwareDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
