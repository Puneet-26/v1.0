'use client';

import { Pie, PieChart, Cell } from 'recharts';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
    type ChartConfig,
} from '@/components/ui/chart';
import type { EmissionData } from '@/lib/types';

interface EmissionsChartProps {
    emissions: EmissionData;
}

const chartConfig = {
    transport: { label: 'Transport', color: '#609966' },
    electricity: { label: 'Electricity', color: '#9DC08B' },
    heating: { label: 'Heating', color: '#EDF1D6' },
    food: { label: 'Food', color: '#FFC436' },
    waste: { label: 'Waste', color: '#F29727' },
} satisfies ChartConfig;


export default function EmissionsChart({ emissions }: EmissionsChartProps) {
    const chartData = Object.entries(emissions)
        .filter(([key]) => key in chartConfig)
        .map(([key, value]) => ({
            name: key,
            value,
            fill: chartConfig[key as keyof typeof chartConfig].color,
        })).filter(d => d.value > 0);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Emissions Breakdown</CardTitle>
                <CardDescription>Here&apos;s where your carbon emissions come from this week.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius="60%"
                            strokeWidth={5}
                            labelLine={false}
                            label={({ name, percent, cornerRadius, tooltipPayload, ...props }) => {
                                const percentage = Math.round((percent || 0) * 100);
                                if (percentage < 5) return null;
                                return (
                                    <text
                                        {...props}
                                        x={props.cx + (props.outerRadius + 10) * Math.cos(-props.midAngle * (Math.PI / 180))}
                                        y={props.cy + (props.outerRadius + 10) * Math.sin(-props.midAngle * (Math.PI / 180))}
                                        fill="hsl(var(--foreground))"
                                        textAnchor={props.textAnchor}
                                        dominantBaseline="central"
                                        className="text-xs"
                                    >
                                        {`${chartConfig[name as keyof typeof chartConfig].label} (${percentage}%)`}
                                    </text>
                                );
                            }}
                        >
                            {chartData.map((entry) => (
                                <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <ChartLegend content={<ChartLegendContent />} />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
