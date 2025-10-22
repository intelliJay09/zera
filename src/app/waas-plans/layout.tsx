import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WaaS Plans - Website as a Service | The Astra Flow',
  description:
    'Premium websites delivered as transparent monthly plans. Launch in 14 days with predictable costs and ongoing maintenance included.',
};

export default function WaaSPlansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
