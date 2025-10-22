import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            'flex h-14 w-full appearance-none bg-white/60 backdrop-blur-sm px-5 py-4 pr-12 text-base text-near-black font-light tracking-wide',
            'border border-cream-300/50 focus:border-copper-500/50',
            'transition-all duration-300 ease-out',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-500/20 focus-visible:ring-offset-0',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'hover:border-copper-500/30',
            'cursor-pointer',
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-near-black/40 pointer-events-none"
          strokeWidth={1.5}
        />
      </div>
    );
  }
);
Select.displayName = 'Select';

export { Select };
