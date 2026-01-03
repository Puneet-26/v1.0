'use client';

import { useFootprintData } from '@/lib/hooks/use-footprint-data';
import Welcome from '@/components/dashboard/welcome';
import SummaryCards from '@/components/dashboard/summary-cards';
import EmissionsChart from '@/components/dashboard/emissions-chart';
import TipsCard from '@/components/dashboard/tips-card';
import DashboardSkeleton from '@/components/dashboard/dashboard-skeleton';

export default function DashboardPage() {
    const { latestRecord, isLoaded } = useFootprintData();

    if (!isLoaded) {
        return <DashboardSkeleton />;
    }

    if (!latestRecord) {
        return <Welcome />;
    }

    return (
        <div className="container mx-auto">
            <div className="space-y-8">
                <SummaryCards emissions={latestRecord.emissions} date={latestRecord.date} />
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <EmissionsChart emissions={latestRecord.emissions} />
                    </div>
                    <TipsCard tips={latestRecord.tips} />
                </div>
            </div>
        </div>
    );
}
