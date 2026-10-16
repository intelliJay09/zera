import type { Metadata } from 'next';

// Design-direction prototypes. Private: never indexed, never linked from the site.
export const metadata: Metadata = {
  title: 'Design lab',
  robots: { index: false, follow: false },
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return children;
}
