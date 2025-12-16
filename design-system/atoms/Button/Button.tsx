import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = ({ variant = 'primary', size = 'md', children, className = '', ...props }: ButtonProps) => {
    const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 active:scale-95";

    const variants = {
        primary: "bg-[var(--color-primary)] text-white hover:opacity-90 shadow-lg",
        secondary: "bg-[var(--color-background-secondary)] text-[var(--color-foreground)] hover:opacity-80",
        ghost: "text-[var(--color-foreground)] opacity-60 hover:opacity-100 hover:bg-[var(--color-background-secondary)]"
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
