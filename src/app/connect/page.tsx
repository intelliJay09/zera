import { Metadata } from 'next';
import ConnectContent from './ConnectContent';

export const metadata: Metadata = {
  title: 'Connect with Jacqueline',
  description: 'Save contact information for Jacqueline F. Amoako, Principal Architect at ZERA Digital Growth Systems.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ConnectPage() {
  return <ConnectContent />;
}
