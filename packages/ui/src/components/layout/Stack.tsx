import React from 'react';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Content to arrange
     */
    children: React.ReactNode;
    /**
     * Direction of flow
     * @default 'column'
     */
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    /**
     * Spacing between items (scale: 0-12, or px values)
     * Maps to Tailwind gap utility (e.g. 4 -> gap-4)
     * @default 4
     */
    gap?: number;
    /**
     * Alignment on the cross axis (align-items)
     */
    align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
    /**
     * Distribution on the main axis (justify-content)
     */
    justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
    /**
     * Whether to allow wrapping (for row layouts)
     */
    wrap?: boolean;
    /**
     * HTML element to render as
     * @default 'div'
     */
    as?: any;
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
    ({
        children,
        direction = 'column',
        gap = 4,
        align = 'stretch',
        justify = 'start',
        wrap = false,
        as: Component = 'div',
        className = '',
        ...props
    }, ref) => {

        const styles = {
            direction: {
                row: 'flex-row',
                column: 'flex-col',
                'row-reverse': 'flex-row-reverse',
                'column-reverse': 'flex-col-reverse',
            },
            align: {
                start: 'items-start',
                end: 'items-end',
                center: 'items-center',
                baseline: 'items-baseline',
                stretch: 'items-stretch',
            },
            justify: {
                start: 'justify-start',
                end: 'justify-end',
                center: 'justify-center',
                between: 'justify-between',
                around: 'justify-around',
                evenly: 'justify-evenly',
            }
        };

        return (
            <Component
                ref={ref}
                className={`flex ${styles.direction[direction]} ${styles.align[align]} ${styles.justify[justify]} ${wrap ? 'flex-wrap' : 'flex-nowrap'
                    } gap-${gap} ${className}`}
                {...props}
            >
                {children}
            </Component>
        );
    }
);

Stack.displayName = 'Stack';
