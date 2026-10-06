import { Metadata } from 'next';
import HomeContent from './HomeContent';
import { SITE_URL } from '@/lib/site';

// Server entry for the homepage, so it can declare its own canonical. The canonical
// cannot live in the root layout, or every page without one would inherit it.
export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL,
  },
};

export default function HomePage() {
  return <HomeContent />;
}
