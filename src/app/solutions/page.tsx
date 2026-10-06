import { Metadata } from 'next';
import SolutionsContent from './SolutionsContent';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Operational Systems & Revenue Infrastructure',
  description:
    'ZERA architects automated operational systems that replace manual bottlenecks with precision infrastructure. Commercial web architecture, search entity authority, CRM automation, and revenue routing - built for high-performance brands.',
  alternates: {
    canonical: `${SITE_URL}/solutions`,
  },
};

export default function SolutionsPage() {
  return <SolutionsContent />;
}
