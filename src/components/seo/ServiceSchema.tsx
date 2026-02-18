import Script from 'next/script';

interface ServiceSchemaProps {
  serviceName: string;
  serviceType: string;
  description: string;
  offers: Array<{
    name: string;
    description?: string;
  }>;
}

/**
 * Service Schema Component for ZERA Product Pages
 * Generates JSON-LD structured data for service offerings
 */
export default function ServiceSchema({
  serviceName,
  serviceType,
  description,
  offers,
}: ServiceSchemaProps) {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceType,
    name: serviceName,
    description: description,
    provider: {
      '@type': 'Organization',
      name: 'ZERA',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Global',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: serviceName,
      itemListElement: offers.map((offer) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: offer.name,
          description: offer.description || '',
        },
      })),
    },
  };

  return (
    <Script
      id={`service-schema-${serviceName.toLowerCase().replace(/\s+/g, '-')}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(serviceSchema),
      }}
    />
  );
}
