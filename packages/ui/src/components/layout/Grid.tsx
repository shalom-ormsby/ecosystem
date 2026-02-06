import React from 'react';

type ResponsiveValue<T> = T | { base?: T; sm?: T; md?: T; lg?: T; xl?: T };

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    /**
     * Number of columns. Supports responsive object.
     * @example columns={3} or columns={{ base: 1, md: 3 }}
     */
    columns?: ResponsiveValue<number>;
    /**
     * Gap between items. Supports responsive object.
     * Maps to Tailwind gap scale.
     */
    gap?: ResponsiveValue<number>;
    /**
     * HTML element to render as
     */
    as?: any;
}

const mapResponsive = (prop: ResponsiveValue<number>, prefix: string, mapFunc: (v: number) => string) => {
    if (typeof prop === 'number') {
        return mapFunc(prop);
    }
    const classes = [];
    if (prop.base) classes.push(mapFunc(prop.base));
    if (prop.sm) classes.push(`sm:${mapFunc(prop.sm)}`);
    if (prop.md) classes.push(`md:${mapFunc(prop.md)}`);
    if (prop.lg) classes.push(`lg:${mapFunc(prop.lg)}`);
    if (prop.xl) classes.push(`xl:${mapFunc(prop.xl)}`);
    return classes.join(' ');
};

export const Grid = (
    {
        ref,
        children,
        columns = 1,
        gap = 4,
        as: Component = 'div',
        className = '',
        ...props
    }: GridProps & {
        ref?: React.Ref<HTMLDivElement>;
    }
) => {

    // Safe mapping for Tailwind scanner
    const getColClass = (n: number) => {
        const map: Record<number, string> = {
            1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4',
            5: 'grid-cols-5', 6: 'grid-cols-6', 7: 'grid-cols-7', 8: 'grid-cols-8',
            9: 'grid-cols-9', 10: 'grid-cols-10', 11: 'grid-cols-11', 12: 'grid-cols-12'
        };
        return map[n] || 'grid-cols-1';
    };

    const getGapClass = (n: number) => `gap-${n}`;

    const colClasses = mapResponsive(columns, 'grid-cols', getColClass);
    const gapClasses = mapResponsive(gap, 'gap', getGapClass);

    return (
        <Component
            ref={ref}
            className={`grid ${colClasses} ${gapClasses} ${className}`}
            {...props}
        >
            {children}
        </Component>
    );
};

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    colSpan?: ResponsiveValue<number>;
    rowSpan?: ResponsiveValue<number>;
    colStart?: ResponsiveValue<number>;
    as?: any;
}

export const GridItem = (
    {
        ref,
        children,
        colSpan,
        rowSpan,
        colStart,
        as: Component = 'div',
        className = '',
        ...props
    }: GridItemProps & {
        ref?: React.Ref<HTMLDivElement>;
    }
) => {

    const getSpanClass = (n: number) => {
        const map: Record<number, string> = {
            1: 'col-span-1', 2: 'col-span-2', 3: 'col-span-3', 4: 'col-span-4',
            5: 'col-span-5', 6: 'col-span-6', 7: 'col-span-7', 8: 'col-span-8',
            9: 'col-span-9', 10: 'col-span-10', 11: 'col-span-11', 12: 'col-span-12'
        };
        return map[n] || '';
    };

    const getRowSpanClass = (n: number) => {
        const map: Record<number, string> = {
            1: 'row-span-1', 2: 'row-span-2', 3: 'row-span-3', 4: 'row-span-4',
            5: 'row-span-5', 6: 'row-span-6'
        };
        return map[n] || '';
    };

    const getColStartClass = (n: number) => `col-start-${n}`;

    const classes = [
        colSpan ? mapResponsive(colSpan, 'col-span', getSpanClass) : '',
        rowSpan ? mapResponsive(rowSpan, 'row-span', getRowSpanClass) : '',
        colStart ? mapResponsive(colStart, 'col-start', getColStartClass) : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <Component ref={ref} className={classes} {...props}>
            {children}
        </Component>
    );
};
