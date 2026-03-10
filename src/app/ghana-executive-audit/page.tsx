import { Metadata } from 'next';
import GhanaAuditContent from './GhanaAuditContent';

export const metadata: Metadata = {
  title: 'The 2026 Ghana Executive Audit — Free Download | ZERA',
  description:
    "Three documented infrastructure failures are destroying up to 40% of ad spend across Accra's mid-market operators. Download the free audit and discover your exact revenue leak.",
  robots: 'noindex, nofollow',
};

export default function GhanaExecutiveAuditPage() {
  return <GhanaAuditContent />;
}
