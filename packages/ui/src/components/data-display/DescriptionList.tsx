import React from 'react';

export interface DescriptionListItem {
    label: string | React.ReactNode;
    value: string | React.ReactNode;
}

export interface DescriptionListProps {
    items: DescriptionListItem[];
    /**
     * Layout direction
     * @default 'row' (side-by-side labels/values in a grid)
     */
    direction?: 'row' | 'column';
    className?: string;
}

export const DescriptionList: React.FC<DescriptionListProps> = ({
    items,
    direction = 'row',
    className = ''
}) => {
    return (
        <dl className={`
            grid gap-x-4 gap-y-4
            ${direction === 'row' ? 'grid-cols-2 sm:grid-cols-[auto_1fr]' : 'grid-cols-1'}
            ${className}
        `}>
            {items.map((item, index) => (
                <div key={index} className="contents">
                    <dt className="text-sm font-medium text-[var(--color-text-secondary)]">
                        {item.label}
                    </dt>
                    <dd className="text-sm text-[var(--color-text-primary)] font-medium">
                        {item.value}
                    </dd>
                </div>
            ))}
        </dl>
    );
};
