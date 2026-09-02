import { cn } from '@/lib/utils';

interface WordmarkProps {
  variant?: 'dark' | 'light';
  className?: string;
}

/**
 * The ZERA wordmark, set in the site's own Lato Regular (`font-sans`)
 * instead of the orphaned typeface baked into the old logo PNGs, so
 * tracking and weight are real, adjustable values instead of frozen pixels.
 * Regular weight matches the light stroke of the original mark; only
 * Regular (400) and Bold (700) are loaded, no true Light (300) exists yet.
 */
export default function Wordmark({ variant = 'dark', className }: WordmarkProps) {
  return (
    <span
      className={cn(
        'font-sans font-normal uppercase tracking-[0.15em] leading-none select-none',
        variant === 'light' ? 'text-white' : 'text-near-black',
        className
      )}
    >
      Zera
    </span>
  );
}
