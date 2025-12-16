import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ children, className = '', hoverEffect = true, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={`
          bg-[var(--color-background)] rounded-2xl border border-[var(--color-glass-border)] p-6
          ${hoverEffect ? 'transition-all duration-300 hover:shadow-[var(--effect-shadow-lg)] hover:-translate-y-1' : ''}
          ${className}
        `}
                style={{
                    boxShadow: hoverEffect ? undefined : 'var(--effect-shadow-sm)'
                }}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';
