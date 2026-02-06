import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Slot } from '@radix-ui/react-slot';

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sage-interactive [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:translate-x-1',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground shadow',
                primary: 'bg-primary text-primary-foreground shadow', // Alias for default
                destructive: 'bg-destructive text-destructive-foreground shadow-sm',
                outline: 'border border-input bg-transparent shadow-sm hover:bg-primary hover:text-primary-foreground hover:border-primary',
                secondary: 'bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/5 dark:border-white/10 text-secondary-foreground shadow-sm hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground',
                ghost: 'hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-9 px-4 py-2',
                sm: 'h-8 rounded-md px-3 text-xs',
                lg: 'h-10 rounded-md px-8',
                icon: 'h-9 w-9',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = (
    {
        ref,
        className,
        variant,
        size,
        asChild = false,
        children,
        ...props
    }: ButtonProps & {
        ref?: React.Ref<HTMLButtonElement>;
    }
) => {
    const Comp = asChild ? Slot : "button"
    return (
        <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        >
            {asChild ? (
                children
            ) : (
                <span className="relative z-20 flex items-center justify-center gap-2">
                    {children}
                </span>
            )}
        </Comp>
    )
}

export { Button, buttonVariants };
