import Script from 'next/script';
import { SITE_URL } from '@/lib/site';

/**
 * JSON-LD Structured Data for ZERA
 * Implements Organization and ServiceAreaBusiness schemas for SEO
 */

export function OrganizationSchema() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    // Stable id so other pages' structured data can point at this one entity
    '@id': `${SITE_URL}/#organization`,
    name: 'Zera Dynamics Ltd.',
    alternateName: 'Zera',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon-maskable-512.png`,
    sameAs: [
      'https://www.linkedin.com/company/zerahq',
      'https://www.instagram.com/zera.systems',
      'https://twitter.com/zerahq',
      'https://www.wikidata.org/wiki/Q138331978',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+233246492873',
      contactType: 'customer service',
      areaServed: ['GH', 'US', 'GB', 'NG'],
      availableLanguage: 'English',
    },
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema),
      }}
    />
  );
}

export function ServiceAreaBusinessSchema() {
  const serviceAreaSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Zera',
    image: `${SITE_URL}/images/office-render.jpg`,
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Accra',
      addressRegion: 'Greater Accra',
      addressCountry: 'GH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 5.6037,
      longitude: -0.187,
    },
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 5.6037,
        longitude: -0.187,
      },
      geoRadius: '5000',
    },
    telephone: '+233246492873',
    email: 'hello@zerahq.com',
    url: SITE_URL,
    areaServed: [
      {
        '@type': 'Country',
        name: 'Ghana',
      },
      {
        '@type': 'Country',
        name: 'Nigeria',
      },
      {
        '@type': 'Country',
        name: 'United States',
      },
      {
        '@type': 'Country',
        name: 'United Kingdom',
      },
    ],
    serviceType: [
      'Commercial Web Architecture',
      'Search Engine Optimization',
      'Automated Lead Generation',
      'Customer Retention Systems',
      'CRM Integration',
    ],
  };

  return (
    <Script
      id="service-area-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(serviceAreaSchema),
      }}
    />
  );
}

/**
 * Combined structured data component
 * Use this in the root layout to inject both schemas
 */
export default function StructuredData() {
  return (
    <>
      <OrganizationSchema />
      <ServiceAreaBusinessSchema />
    </>
  );
}
