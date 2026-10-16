import { Metadata } from 'next';
import ContactPageContent from './ContactPageContent';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Initiate a secure inquiry with Zera Dynamics. Locate our HQ coordinates or request urgent systems support. Operating globally from Accra.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  // No Suspense boundary: nothing here reads search params, and a boundary made the
  // static HTML paint a "LOADING..." fallback before the page.
  return <ContactPageContent />;
}
