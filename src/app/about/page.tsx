import { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About The Directorate',
  description:
    'We are not creatives. We are Revenue Architects. Learn about the Zera doctrine, our cloud-native operations in Ghana, and our engineering philosophy.',
};

export default function AboutPage() {
  return <AboutContent />;
}
