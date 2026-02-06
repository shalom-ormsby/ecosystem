import React from 'react';

export interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    active?: boolean;
    children?: React.ReactNode;
    icon?: React.ReactNode;
    variant?: 'pill' | 'minimal';
}

export const NavLink = (
    {
        ref,
        active = false,
        children,
        icon,
        variant = 'pill',
        className = '',
        ...props
    }: NavLinkProps & {
        ref?: React.Ref<HTMLAnchorElement>;
    }
) => {
    const variants = {
        pill: `px-3 py-2 rounded-lg
         ${active
                ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-hover)] hover:text-[var(--color-text-primary)]'}`,
        minimal: `relative pb-1 rounded-sm
           ${active
                ? 'text-[var(--color-text-primary)] font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--color-primary)] after:rounded-full'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]'}`
    };

    return (
        <a
            ref={ref}
            className={`
      group flex items-center gap-2 text-sm font-medium transition-all duration-200
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]
      cursor-pointer
      ${variants[variant]}
      ${className}
    `}
            aria-current={active ? 'page' : undefined}
            {...props}
        >
            {icon && (
                <span className={`w-4 h-4 transition-colors ${active ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)]'}`}>
                    {icon}
                </span>
            )}
            {children}
        </a>
    );
};
