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
          bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-6
          ${hoverEffect ? 'transition-all duration-300 hover:shadow-[var(--effect-shadow-lg)] hover:-translate-y-1 hover:border-[var(--color-primary)]' : ''}
          ${className}
        `}
                style={{
                    boxShadow: hoverEffect ? 'var(--effect-shadow-sm)' : 'var(--effect-shadow-sm)'
                }}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';
