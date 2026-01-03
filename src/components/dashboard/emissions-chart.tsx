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
} from '@/components/ui/chart';
import type { EmissionData } from '@/lib/types';

interface EmissionsChartProps {
    emissions: EmissionData;
}

export default function EmissionsChart({ emissions }: EmissionsChartProps) {
    const chartData = [
        { category: 'Transport', value: emissions.transport, fill: 'var(--color-transport)' },
        { category: 'Electricity', value: emissions.electricity, fill: 'var(--color-electricity)' },
        { category: 'Food', value: emissions.food, fill: 'var(--color-food)' },
    ].filter(d => d.value > 0);

    const chartConfig = {
        transport: { label: 'Transport', color: 'hsl(var(--chart-1))' },
        electricity: { label: 'Electricity', color: 'hsl(var(--chart-2))' },
        food: { label: 'Food', color: 'hsl(var(--chart-4))' },
    };

    const totalEmissions = emissions.total;

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
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="category"
                            innerRadius="60%"
                            strokeWidth={5}
                        >
                            {chartData.map((entry) => (
                                <Cell key={`cell-${entry.category}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <ChartLegend content={<ChartLegendContent nameKey="category" />} />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
