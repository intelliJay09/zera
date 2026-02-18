import { Metadata } from 'next';
import { Suspense } from 'react';
import ContactPageContent from './ContactPageContent';

export const metadata: Metadata = {
  title: 'Contact The Directorate',
  description:
    'Initiate a secure inquiry with Zera Dynamics. Locate our HQ coordinates or request urgent systems support. Operating globally from Accra.',
};

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-near-black pt-32 pb-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h1 className="font-display text-4xl font-bold uppercase text-white sm:text-5xl mb-6 tracking-brand-header">
              LOADING...
            </h1>
          </div>
        </main>
      }
    >
      <ContactPageContent />
    </Suspense>
  );
}
