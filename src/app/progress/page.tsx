'use client';

import { useFootprintData } from '@/lib/hooks/use-footprint-data';
import ProgressChart from '@/components/progress/progress-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BarChart3 } from 'lucide-react';

export default function ProgressPage() {
    const { records, isLoaded } = useFootprintData();

    if (!isLoaded) {
        return (
            <div className="space-y-8">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-[400px] w-full" />
            </div>
        );
    }

    if (records.length < 2) {
        return (
            <Card className="text-center">
                <CardHeader>
                    <div className="mx-auto bg-secondary rounded-full p-3 w-fit">
                        <BarChart3 className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>Track Your Progress Over Time</CardTitle>
                    <CardDescription>
                        Log your activity for at least two weeks to see your progress chart here.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/log">Log Your Activity</Link>
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold font-headline">Your Progress</h2>
            <Card>
                <CardHeader>
                    <CardTitle>Footprint Over Time</CardTitle>
                    <CardDescription>Your weekly carbon footprint history (in kg CO₂e).</CardDescription>
                </CardHeader>
                <CardContent>
                    <ProgressChart data={records} />
                </CardContent>
            </Card>
        </div>
    );
}
