import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CASE_STUDIES, getCaseStudy } from '@/data/case-studies';
import CaseStudyClient from './CaseStudyClient';

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zerahq.com';

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return {
      title: 'Case Study Not Found',
      description: 'The case study you are looking for does not exist.',
    };
  }

  const url = `${baseUrl}/portfolio/${study.slug}`;
  const title = `${study.client} Case Study`;

  return {
    title,
    description: study.summary,
    keywords: study.keywords,
    openGraph: {
      title: `${title} | ZERA`,
      description: study.summary,
      url,
      siteName: 'ZERA',
      type: 'article',
      images: [
        {
          url: study.hero.src,
          width: study.hero.width,
          height: study.hero.height,
          alt: study.hero.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ZERA`,
      description: study.summary,
      site: '@zerahq',
      creator: '@zerahq',
      images: [study.hero.src],
    },
    alternates: {
      canonical: url,
    },
  };
}

export async function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({
    slug: study.slug,
  }));
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  const otherStudies = CASE_STUDIES.filter((s) => s.slug !== study.slug);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.headline,
    description: study.summary,
    image: `${baseUrl}${study.hero.src}`,
    about: {
      '@type': 'Organization',
      name: study.client,
      url: study.liveUrl.href,
    },
    author: {
      '@type': 'Organization',
      name: 'Zera',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Zera Dynamics Ltd.',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/favicon-maskable-512.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/portfolio/${study.slug}`,
    },
    keywords: study.keywords.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <CaseStudyClient study={study} otherStudies={otherStudies} />
    </>
  );
}
