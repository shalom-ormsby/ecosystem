import React from 'react';

export interface FilterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
    count?: number;
    children: React.ReactNode;
    /**
     * Shape of the button
     * @default 'pill'
     */
    shape?: 'pill' | 'rounded';
}

export const FilterButton = (
    {
        ref,
        active = false,
        count,
        children,
        shape = 'pill',
        className = '',
        ...props
    }: FilterButtonProps & {
        ref?: React.Ref<HTMLButtonElement>;
    }
) => {
    const shapes = {
        pill: "rounded-full",
        rounded: "rounded-lg"
    };

    return (
        <button
            ref={ref}
            className={`
      flex items-center gap-2 px-4 py-2 ${shapes[shape]} text-sm font-medium transition-all duration-200
      border
      ${active
                    ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-[var(--effect-shadow-sm)]'
                    : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-background)]'
                }
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      ${className}
    `}
            aria-pressed={active}
            {...props}
        >
            <span>{children}</span>
            {count !== undefined && (
                <span
                    className={`
          flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-xs font-bold
          ${active
                            ? 'bg-[var(--color-background)] text-[var(--color-primary)]'
                            : 'bg-[var(--color-border)] text-[var(--color-text-secondary)]'
                        }
        `}
                >
                    {count}
                </span>
            )}
        </button>
    );
};
