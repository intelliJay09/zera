import { Metadata } from 'next';
import SolutionsContent from './SolutionsContent';

export const metadata: Metadata = {
  title: 'Digital Marketing Solutions - Strategic Services | The Astra Flow',
  description:
    'Comprehensive digital marketing solutions that drive measurable results. From SEO and social media to web development and branding - strategic partnerships built for growth.',
};

export default function SolutionsPage() {
  return <SolutionsContent />;
}
