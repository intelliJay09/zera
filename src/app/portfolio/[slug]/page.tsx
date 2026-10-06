import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CASE_STUDIES, getCaseStudy } from '@/data/case-studies';
import CaseStudyClient from './CaseStudyClient';
import { SITE_URL } from '@/lib/site';

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return {
      title: 'Case Study Not Found',
      description: 'The case study you are looking for does not exist.',
    };
  }

  const url = `${SITE_URL}/portfolio/${study.slug}`;

  return {
    title: study.seoTitle,
    description: study.seoDescription,
    keywords: study.keywords,
    openGraph: {
      title: `${study.seoTitle} | ZERA`,
      description: study.seoDescription,
      url,
      siteName: 'ZERA',
      type: 'article',
      publishedTime: study.published,
      modifiedTime: study.updated,
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
      title: `${study.seoTitle} | ZERA`,
      description: study.seoDescription,
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

  const url = `${SITE_URL}/portfolio/${study.slug}`;
  const zera = { '@id': `${SITE_URL}/#organization` };
  const client = {
    '@type': 'Organization',
    name: study.client,
    ...(study.clientUrl && { url: study.clientUrl }),
    address: { '@type': 'PostalAddress', addressLocality: study.location },
  };

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: study.headline,
        description: study.summary,
        image: `${SITE_URL}${study.hero.src}`,
        datePublished: study.published,
        dateModified: study.updated,
        author: zera,
        publisher: zera,
        mainEntityOfPage: { '@id': url },
        about: client,
        mentions: [
          {
            '@type': 'Service',
            name: study.service.name,
            url: `${SITE_URL}${study.service.href}`,
            provider: zera,
          },
          ...(study.event
            ? [
                {
                  '@type': 'Event',
                  name: study.event.name,
                  startDate: study.event.startDate,
                  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
                  location: { '@type': 'Place', name: study.event.location },
                  organizer: { '@type': 'Person', name: study.client },
                },
              ]
            : []),
        ],
        keywords: study.keywords.join(', '),
      },
      {
        '@type': 'WebPage',
        '@id': url,
        url,
        name: `${study.seoTitle} | Zera`,
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Case studies', item: `${SITE_URL}/portfolio` },
          { '@type': 'ListItem', position: 3, name: study.client, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: study.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <CaseStudyClient study={study} otherStudies={otherStudies} />
    </>
  );
}
