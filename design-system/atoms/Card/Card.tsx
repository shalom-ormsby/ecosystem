import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export const Card = ({ children, className = '', hoverEffect = true }: CardProps) => {
    return (
        <div
            className={`
        bg-[var(--color-background)] rounded-2xl border border-[var(--color-glass-border)] p-6
        ${hoverEffect ? 'transition-all duration-300 hover:shadow-[var(--effect-shadow-lg)] hover:-translate-y-1' : ''}
        ${className}
      `}
            style={{
                boxShadow: hoverEffect ? undefined : 'var(--effect-shadow-sm)'
            }}
        >
            {children}
        </div>
    );
};
