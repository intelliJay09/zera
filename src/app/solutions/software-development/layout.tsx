import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zerahq.com';

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
    url: `${baseUrl}/solutions/software-development`,
    siteName: 'ZERA',
    type: 'website',
    images: [
      {
        url: '/images/og-zera-sovereign.png',
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
    images: ['/images/og-zera-sovereign.png'],
  },
  alternates: {
    canonical: `${baseUrl}/solutions/software-development`,
  },
};

export default function SoftwareDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
