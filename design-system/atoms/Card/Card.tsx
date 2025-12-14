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
        bg-white rounded-2xl border border-neutral-200 p-6
        ${hoverEffect ? 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-neutral-300' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
};
