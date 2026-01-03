import ActivityForm from "@/components/log/activity-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function LogPage() {
  return (
    <div className="container mx-auto max-w-2xl">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-3xl">Log Your Weekly Activity</CardTitle>
                <CardDescription>
                    Fill in your activities for the past week to calculate your carbon footprint and get personalized tips.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ActivityForm />
            </CardContent>
        </Card>
    </div>
  );
}
