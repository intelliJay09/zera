import { Metadata } from 'next';
import BookSessionContent from './BookSessionContent';
import { SITE_URL } from '@/lib/site';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Revenue Systems Audit',
  description:
    'Book a 60-minute executive diagnostic. We audit your revenue operations and hand you a clear roadmap to fix what\'s leaking.',
  alternates: {
    canonical: `${SITE_URL}/systems-audit`,
  },
};

// No Suspense boundary here: nothing on this page reads search params, and a boundary
// made the static HTML paint a "LOADING..." fallback before swapping the hero in.
export default function BookSessionPage() {
  return <BookSessionContent />;
}
