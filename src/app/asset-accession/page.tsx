import { Metadata } from 'next';
import AssetAccessionContent from './AssetAccessionContent';

export const metadata: Metadata = {
  title: 'Asset Accession Protocol',
  description:
    'Secure client onboarding portal. Submit your brand assets, digital credentials, and business information to initiate the 180-day build cycle.',
  robots: { index: false, follow: false },
};

export default function AssetAccessionPage() {
  return <AssetAccessionContent />;
}
