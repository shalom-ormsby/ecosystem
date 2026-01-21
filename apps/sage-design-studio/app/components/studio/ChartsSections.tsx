'use client';

import { useState, useEffect } from 'react';
import { Breadcrumbs, type BreadcrumbItemLegacy } from '@sage/ui';
import { Card } from '@sage/ui';
import {
    Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, XAxis, YAxis, Label,
    ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig
} from '@sage/charts';

type ChartsTab = 'overview' | 'area-chart' | 'bar-chart' | 'line-chart' | 'pie-chart';

interface ChartsSectionsProps {
    activeItemId?: string;
    breadcrumbs?: BreadcrumbItemLegacy[];
    onItemChange?: (itemId: string) => void;
}

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--primary))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--secondary))",
    },
} satisfies ChartConfig;

export function ChartsSections({ activeItemId, breadcrumbs, onItemChange }: ChartsSectionsProps) {
    const [activeTab, setActiveTab] = useState<ChartsTab>('overview');

    useEffect(() => {
        if (activeItemId) {
            setActiveTab(activeItemId as ChartsTab);
        }
    }, [activeItemId]);

    return (
        <div className="w-full min-w-0">
            <div className="mb-8">
                {breadcrumbs && breadcrumbs.length > 1 && (
                    <div className="mb-4">
                        <Breadcrumbs variant="subtle" items={breadcrumbs} />
                    </div>
                )}
            </div>

            <div className="mt-4">
                {activeTab === 'overview' && (
                    <section className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold mb-4 text-[var(--color-text-primary)]">Charts</h1>
                            <p className="text-lg text-[var(--color-text-secondary)] mb-8">
                                Beautiful, responsive, and composable charts built with Recharts and styled with Tailwind CSS.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <Card className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">Area Chart</h3>
                                    <p className="text-sm text-[var(--color-text-secondary)]">Stacked, gradient, and percent area charts.</p>
                                </Card>
                                <Card className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">Bar Chart</h3>
                                    <p className="text-sm text-[var(--color-text-secondary)]">Vertical, horizontal, stacked, and grouped bar charts.</p>
                                </Card>
                                <Card className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">Line Chart</h3>
                                    <p className="text-sm text-[var(--color-text-secondary)]">Multi-axis, step, and smooth line charts.</p>
                                </Card>
                                <Card className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">Pie Chart</h3>
                                    <p className="text-sm text-[var(--color-text-secondary)]">Pie and donut charts with center content.</p>
                                </Card>
                            </div>
                        </div>
                    </section>
                )}

                {/* --- BAR CHART --- */}
                {activeTab === 'bar-chart' && (
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Bar Chart</h2>
                        <Card className="p-6">
                            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                                <BarChart data={chartData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <ChartLegend content={<ChartLegendContent />} />
                                    <Bar dataKey="desktop" fill="var(--color-chart-1)" radius={4} />
                                    <Bar dataKey="mobile" fill="var(--color-chart-2)" radius={4} />
                                </BarChart>
                            </ChartContainer>
                        </Card>
                    </section>
                )}

                {/* --- LINE CHART --- */}
                {activeTab === 'line-chart' && (
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Line Chart</h2>
                        <Card className="p-6">
                            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                                <LineChart
                                    data={chartData}
                                    margin={{
                                        left: 12,
                                        right: 12,
                                    }}
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent hideLabel />}
                                    />
                                    <Line
                                        dataKey="desktop"
                                        type="natural"
                                        stroke="var(--color-chart-1)"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ChartContainer>
                        </Card>
                    </section>
                )}

                {/* --- AREA CHART --- */}
                {activeTab === 'area-chart' && (
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Area Chart</h2>
                        <Card className="p-6">
                            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                                <AreaChart
                                    data={chartData}
                                    margin={{
                                        left: 12,
                                        right: 12,
                                    }}
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                    <defs>
                                        <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0.1} />
                                        </linearGradient>
                                        <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--color-chart-2)" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="var(--color-chart-2)" stopOpacity={0.1} />
                                        </linearGradient>
                                    </defs>
                                    <Area
                                        dataKey="mobile"
                                        type="natural"
                                        fill="url(#fillMobile)"
                                        fillOpacity={0.4}
                                        stroke="var(--color-chart-2)"
                                        stackId="a"
                                    />
                                    <Area
                                        dataKey="desktop"
                                        type="natural"
                                        fill="url(#fillDesktop)"
                                        fillOpacity={0.4}
                                        stroke="var(--color-chart-1)"
                                        stackId="a"
                                    />
                                </AreaChart>
                            </ChartContainer>
                        </Card>
                    </section>
                )}

                {/* --- PIE CHART --- */}
                {activeTab === 'pie-chart' && (
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Pie Chart</h2>
                        <Card className="flex flex-col p-6">
                            <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px] w-full">
                                <PieChart>
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                    <Pie
                                        data={chartData}
                                        dataKey="desktop"
                                        nameKey="month"
                                        innerRadius={60}
                                        strokeWidth={5}
                                    >
                                        <Label
                                            content={({ viewBox }) => {
                                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                    return (
                                                        <text
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            textAnchor="middle"
                                                            dominantBaseline="middle"
                                                        >
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={viewBox.cy}
                                                                className="fill-foreground text-3xl font-bold"
                                                            >
                                                                {chartData.reduce((acc, curr) => acc + curr.desktop, 0).toLocaleString()}
                                                            </tspan>
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={(viewBox.cy || 0) + 24}
                                                                className="fill-muted-foreground"
                                                            >
                                                                Visitors
                                                            </tspan>
                                                        </text>
                                                    )
                                                }
                                            }}
                                        />
                                    </Pie>
                                </PieChart>
                            </ChartContainer>
                        </Card>
                    </section>
                )}
            </div>
        </div>
    );
}
