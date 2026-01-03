import type { EmissionData } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Car, Zap, Beef } from 'lucide-react';
import { format } from 'date-fns';

interface SummaryCardsProps {
    emissions: EmissionData;
    date: string;
}

const StatCard = ({ title, value, icon: Icon }: { title: string, value: string, icon: React.ElementType }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">kg CO₂e this week</p>
        </CardContent>
    </Card>
);

export default function SummaryCards({ emissions, date }: SummaryCardsProps) {
    const formattedDate = format(new Date(date), "MMMM do, yyyy");

    return (
        <div>
            <div className="mb-4">
                <h2 className="text-3xl font-bold font-headline">Your Weekly Summary</h2>
                <p className="text-muted-foreground">For the week ending {formattedDate}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Footprint" value={emissions.total.toLocaleString()} icon={Leaf} />
                <StatCard title="Transport" value={emissions.transport.toLocaleString()} icon={Car} />
                <StatCard title="Electricity" value={emissions.electricity.toLocaleString()} icon={Zap} />
                <StatCard title="Food" value={emissions.food.toLocaleString()} icon={Beef} />
            </div>
        </div>
    );
}
