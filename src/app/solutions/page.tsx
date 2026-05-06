import { Metadata } from 'next';
import SolutionsContent from './SolutionsContent';

export const metadata: Metadata = {
  title: 'Operational Systems & Revenue Infrastructure | ZERA',
  description:
    'ZERA architects automated operational systems that replace manual bottlenecks with precision infrastructure. Commercial web architecture, search entity authority, CRM automation, and revenue routing - built for high-performance brands.',
};

export default function SolutionsPage() {
  return <SolutionsContent />;
}
