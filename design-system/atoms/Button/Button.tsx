import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = ({ variant = 'primary', size = 'md', children, className = '', ...props }: ButtonProps) => {
    const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 active:scale-95";

    const variants = {
        primary: "bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20",
        secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200",
        ghost: "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
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
