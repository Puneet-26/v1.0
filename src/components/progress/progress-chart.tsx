'use client';

import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { format } from 'date-fns';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartConfig,
} from '@/components/ui/chart';
import type { FootprintRecord } from '@/lib/types';

interface ProgressChartProps {
    data: FootprintRecord[];
}

const chartConfig = {
    total: {
        label: 'Total CO₂e',
        color: 'hsl(var(--primary))',
    },
} satisfies ChartConfig;

export default function ProgressChart({ data }: ProgressChartProps) {
    const chartData = data
        .map(record => ({
            date: format(new Date(record.date), 'MMM d'),
            total: record.emissions.total,
        }))
        .reverse(); // To show chronologically

    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
                <XAxis
                    dataKey="date"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    fontSize={12}
                />
                <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    fontSize={12}
                    tickFormatter={(value) => `${value} kg`}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                    dataKey="total"
                    fill="var(--color-total)"
                    radius={4}
                />
            </BarChart>
        </ChartContainer>
    );
}
