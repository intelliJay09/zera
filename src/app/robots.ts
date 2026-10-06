import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * Robots.txt configuration for ZERA
 * Controls search engine crawler behavior
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/systems-audit/success',
          '/_next/',
          '/admin/',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
