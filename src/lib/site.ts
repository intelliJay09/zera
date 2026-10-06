// The site's one public origin, used for canonicals, the sitemap, structured data and
// links in emails. It must be the host the site is served from (www), because the bare
// domain redirects there and a canonical that redirects splits search signals.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (!siteUrl) {
  throw new Error('NEXT_PUBLIC_SITE_URL is not set');
}

export const SITE_URL = siteUrl.replace(/\/+$/, '');
