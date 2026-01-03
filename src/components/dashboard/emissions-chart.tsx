
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
    transport: { label: 'Transport', color: 'hsl(var(--chart-1))' },
    electricity: { label: 'Electricity', color: 'hsl(var(--chart-2))' },
    heating: { label: 'Heating', color: 'hsl(var(--chart-3))' },
    food: { label: 'Food', color: 'hsl(var(--chart-4))' },
    waste: { label: 'Waste', color: 'hsl(var(--chart-5))' },
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
                            label={({
                                cx,
                                cy,
                                midAngle,
                                outerRadius,
                                percent,
                                name,
                                textAnchor
                            }) => {
                                const percentage = Math.round((percent || 0) * 100);
                                if (percentage < 5) return null;
                                
                                const RADIAN = Math.PI / 180;
                                const x = cx + (outerRadius + 10) * Math.cos(-midAngle * RADIAN);
                                const y = cy + (outerRadius + 10) * Math.sin(-midAngle * RADIAN);

                                return (
                                    <text
                                        x={x}
                                        y={y}
                                        fill="hsl(var(--foreground))"
                                        textAnchor={textAnchor}
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
