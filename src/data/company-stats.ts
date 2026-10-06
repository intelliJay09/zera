// Company-wide figures, shown on the homepage and /solutions. Edit them here only.

export interface CompanyStat {
  number: string;
  suffix: string;
  label: string;
}

export const COMPANY_STATS: CompanyStat[] = [
  { number: '150', suffix: '+', label: 'Businesses Transformed' },
  { number: '4.2', suffix: 'x', label: 'Average ROI' },
  { number: '92', suffix: '%', label: 'Client Retention' },
  { number: '5', suffix: '★', label: 'Client Rating' },
];
