import Link from 'next/link';

const DIRECTIONS = [
  {
    href: '/lab/blueprint',
    name: 'A: The Blueprint',
    line: 'The site is the drawing set for a revenue system, and it drafts itself as you scroll.',
  },
  {
    href: '/lab/statement',
    name: 'B: The Statement',
    line: 'Proved every month in real numbers: the home is Zera’s own running statement.',
  },
];

export default function LabIndex() {
  return (
    <main className="min-h-screen bg-near-black px-6 pt-40 pb-24 text-cream-200">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-copper-400">Rough prototypes, grey-box stage</p>
        <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-brand-header">Design directions</h1>
        <ul className="mt-12 space-y-10">
          {DIRECTIONS.map((d) => (
            <li key={d.href}>
              <Link href={d.href} className="group block">
                <span className="text-2xl font-bold uppercase tracking-brand-header text-copper-400 group-hover:text-copper-300">
                  {d.name}
                </span>
                <span className="mt-2 block text-lg text-cream-200/70">{d.line}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
