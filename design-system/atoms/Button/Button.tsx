import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Button content
     */
    children: React.ReactNode;
    /**
     * Visual variant of the button
     * @default 'primary'
     */
    variant?: 'primary' | 'secondary' | 'ghost' | 'link';
    /**
     * Size of the button
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Shape of the button
     * @default 'rounded'
     */
    shape?: 'pill' | 'rounded';
    /**
     * Show loading spinner and disable button
     * @default false
     */
    loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = 'primary', size = 'md', shape = 'rounded', loading = false, children, className = '', disabled, ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";

        const shapes = {
            pill: "rounded-full",
            rounded: "rounded-lg"
        };

        const variants = {
            primary: "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:opacity-90 shadow-lg",
            secondary: "bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] hover:bg-[var(--color-hover)] border-2 border-[var(--color-border)]",
            ghost: "text-[var(--color-foreground)] hover:bg-[var(--color-hover)]",
            link: "text-[var(--color-primary)] hover:underline p-0 h-auto font-medium"
        };

        const sizes = {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-4 text-lg"
        };

        const spinnerSizes = {
            sm: "w-4 h-4",
            md: "w-5 h-5",
            lg: "w-6 h-6"
        };

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${shapes[shape]} ${variants[variant]} ${sizes[size]} ${className}`}
                disabled={disabled || loading}
                {...props}
            >
                {loading && (
                    <svg
                        className={`animate-spin ${spinnerSizes[size]}`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
