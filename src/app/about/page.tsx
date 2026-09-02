import { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Zera builds and runs the systems that turn leads into revenue and keep customers from quietly leaving, proving results every month. Cloud-native operations from Accra, Ghana, working globally.',
};

export default function AboutPage() {
  return <AboutContent />;
}
