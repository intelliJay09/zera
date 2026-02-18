import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-medium text-base transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 w-fit rounded-none uppercase',
  {
    variants: {
      variant: {
        primary:
          'bg-copper-600 text-white shadow-lg shadow-copper-500/10 hover:bg-copper-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-copper-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-4',
        secondary:
          'border-2 border-copper-500 text-copper-600 hover:bg-copper-50 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-4',
        ghost:
          'relative text-copper-600 hover:text-copper-700 after:absolute after:bottom-0 after:left-[25%] after:right-[25%] after:h-[1px] after:bg-copper-500 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2',
      },
      size: {
        default: 'px-6 sm:px-10 py-4 min-h-[52px]',
        sm: 'px-6 sm:px-8 py-3.5 min-h-[44px]',
        lg: 'px-8 sm:px-12 py-4 sm:py-5 min-h-[52px] sm:min-h-[56px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
