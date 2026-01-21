'use client';

import * as React from 'react';
import { ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { cn } from '../lib/utils';

// Format: { THEME_NAME: { cssVariable: string; value: string } }
const THEMES = {
    light: {
        '--color-chart-1': '12 76% 61%',
        '--color-chart-2': '173 58% 39%',
        '--color-chart-3': '197 37% 24%',
        '--color-chart-4': '43 74% 66%',
        '--color-chart-5': '27 87% 67%',
    },
    dark: {
        '--color-chart-1': '220 70% 50%',
        '--color-chart-2': '160 60% 45%',
        '--color-chart-3': '30 80% 55%',
        '--color-chart-4': '280 65% 60%',
        '--color-chart-5': '340 75% 55%',
    },
} as const;

export type ChartConfig = {
    [k in string]: {
        label?: React.ReactNode;
        icon?: React.ComponentType;
        color?: string;
        theme?: Record<keyof typeof THEMES, string>;
    }
};

type ChartContextProps = {
    config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
    const context = React.useContext(ChartContext);

    if (!context) {
        throw new Error('useChart must be used within a <ChartContainer />');
    }

    return context;
}

const ChartContainer = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<'div'> & {
        config: ChartConfig;
        children: React.ComponentProps<typeof ResponsiveContainer>['children'];
    }
>(({ id, className, children, config, ...props }, ref) => {
    const uniqueId = React.useId();
    const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`;

    return (
        <ChartContext.Provider value={{ config }}>
            <div
                data-chart={chartId}
                ref={ref}
                className={cn(
                    "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-[var(--color-text-secondary)] [&_.recharts-cartesian-grid_line]:stroke-[var(--color-border)]",
                    className
                )}
                {...props}
            >
                <ChartStyle id={chartId} config={config} />
                <ResponsiveContainer>
                    {children}
                </ResponsiveContainer>
            </div>
        </ChartContext.Provider>
    );
});
ChartContainer.displayName = 'ChartContainer';

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
    const colorConfig = Object.entries(config).filter(
        ([_, value]) => value.theme || value.color
    );

    if (!colorConfig.length) {
        return null;
    }

    return (
        <style dangerouslySetInnerHTML={{
            __html: `
        [data-chart=${id}] {
          ${colorConfig
                    .map(([key, item]) => {
                        const color = item.theme || item.color;
                        return color ? `--color-${key}: ${color};` : null;
                    })
                    .join('\n')}
        }
      `
        }} />
    );
};

// -- Tooltip --

const ChartTooltip = Tooltip;

const ChartTooltipContent = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<'div'> & {
        hideLabel?: boolean;
        hideIndicator?: boolean;
        indicator?: 'line' | 'dot' | 'dashed';
        nameKey?: string;
        labelKey?: string;
        active?: boolean;
        payload?: any[];
        label?: any;
        labelFormatter?: (label: any, payload: any[]) => React.ReactNode;
        config?: ChartConfig;
    }
>(({ active, payload, className, indicator = 'dot', hideLabel = false, hideIndicator = false, label, labelFormatter, config, nameKey, labelKey }, ref) => {
    const { config: configFromContext } = useChart();
    const chartConfig = config || configFromContext;

    const tooltipLabel = React.useMemo(() => {
        if (hideLabel || !payload || !payload.length) {
            return null
        }

        const [item] = payload
        const key = `${labelKey || item.dataKey || item.name || 'value'}`
        const itemConfig = getPayloadConfigFromPayload(chartConfig, item, key)
        const value =
            !labelKey && typeof label === "string"
                ? chartConfig[label as keyof typeof chartConfig]?.label || label
                : itemConfig?.label

        if (labelFormatter) {
            return (
                <div className={cn("font-medium")}>
                    {labelFormatter(value, payload)}
                </div>
            )
        }

        if (!value) {
            return null
        }

        return <div className={cn("font-medium")}>{value}</div>
    }, [
        label,
        labelFormatter,
        payload,
        hideLabel,
        labelKey,
        chartConfig,
    ])

    if (!active || !payload?.length) {
        return null;
    }

    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
        <div
            ref={ref}
            className={cn(
                'grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1.5 text-xs shadow-xl transition-all ease-in-out animate-in fade-in-0 zoom-in-95',
                className
            )}
        >
            {!nestLabel ? tooltipLabel : null}
            <div className="grid gap-1.5">
                {payload.map((item, index) => {
                    const key = `${nameKey || item.name || item.dataKey || "value"}`
                    const itemConfig = getPayloadConfigFromPayload(chartConfig, item, key)
                    const indicatorColor = colorToCssVariable(
                        item.payload.fill || item.color
                    )

                    return (
                        <div
                            key={item.dataKey || index}
                            className={cn(
                                "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                                indicator === "dot" && "items-center"
                            )}
                        >
                            {indicator && !hideIndicator && (
                                <div
                                    className={cn(
                                        "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                                        {
                                            "h-2.5 w-2.5": indicator === "dot",
                                            "w-1": indicator === "line",
                                            "w-0 border-[1.5px] border-dashed bg-transparent":
                                                indicator === "dashed",
                                            "my-0.5": nestLabel && indicator === "dashed",
                                        }
                                    )}
                                    style={
                                        {
                                            "--color-bg": indicatorColor,
                                            "--color-border": indicatorColor,
                                        } as React.CSSProperties
                                    }
                                />
                            )}
                            <div
                                className={cn(
                                    "flex flex-1 justify-between leading-none",
                                    nestLabel ? "items-end" : "items-center"
                                )}
                            >
                                <div className="grid gap-1.5">
                                    {nestLabel ? tooltipLabel : null}
                                    <span className="text-[var(--color-text-secondary)]">
                                        {itemConfig?.label || item.name}
                                    </span>
                                </div>
                                {item.value && (
                                    <span className="font-mono font-medium tabular-nums text-[var(--color-text-primary)]">
                                        {item.value.toLocaleString()}
                                    </span>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
});
ChartTooltipContent.displayName = 'ChartTooltipContent';

// -- Legend --

const ChartLegend = Legend;

const ChartLegendContent = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<'div'> & {
        hideIcon?: boolean;
        nameKey?: string;
        verticalAlign?: 'top' | 'bottom' | 'middle';
        payload?: any[];
    }
>(({ className, hideIcon = false, payload, verticalAlign = 'bottom', nameKey }, ref) => {
    const { config } = useChart();

    if (!payload?.length) {
        return null;
    }

    return (
        <div
            ref={ref}
            className={cn(
                'flex items-center justify-center gap-4',
                verticalAlign === 'top' ? 'pb-3' : 'pt-3',
                className
            )}
        >
            {payload.map((item) => {
                const key = `${nameKey || item.dataKey || "value"}`
                const itemConfig = getPayloadConfigFromPayload(config, item, key)
                const indicatorColor = colorToCssVariable(item.color)

                return (
                    <div
                        key={item.value}
                        className={cn(
                            "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
                        )}
                    >
                        {!hideIcon && (
                            <div
                                className="h-2 w-2 shrink-0 rounded-[2px]"
                                style={{ backgroundColor: indicatorColor }}
                            />
                        )}
                        <span className="text-sm text-[var(--color-text-primary)]">
                            {itemConfig?.label || item.value}
                        </span>
                    </div>
                )
            })}
        </div>
    );
});
ChartLegendContent.displayName = 'ChartLegendContent';

// Helper to extract config
function getPayloadConfigFromPayload(
    config: ChartConfig,
    payload: unknown,
    key: string
) {
    if (typeof payload !== "object" || payload === null) {
        return undefined
    }

    const payloadPayload =
        "payload" in payload &&
            typeof payload.payload === "object" &&
            payload.payload !== null
            ? payload.payload
            : undefined

    let configLabelKey: string = key

    if (
        key in payload &&
        typeof payload[key as keyof typeof payload] === "string"
    ) {
        configLabelKey = payload[key as keyof typeof payload] as string
    } else if (
        payloadPayload &&
        key in payloadPayload &&
        typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
    ) {
        configLabelKey = payloadPayload[
            key as keyof typeof payloadPayload
        ] as string
    }

    return configLabelKey in config
        ? config[configLabelKey]
        : config[key as keyof typeof config]
}

function colorToCssVariable(color: string | undefined): string {
    if (!color) return 'var(--color-primary)';
    // If it's a theme variable like `var(--color-...)` return it
    if (color.startsWith('var(--')) return color;
    // If we wanted to map theme keys to vars, we could do it here
    return color;
}

export {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
    ChartStyle,
};
