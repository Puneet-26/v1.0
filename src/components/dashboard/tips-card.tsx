import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

interface TipsCardProps {
    tips: string[];
}

export default function TipsCard({ tips }: TipsCardProps) {
    return (
        <Card className="bg-primary/5">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="text-primary" />
                    Personalized Reduction Tips
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {tips.map((tip, index) => (
                        <li key={index} className="flex gap-3">
                            <span className="text-primary font-bold">✓</span>
                            <p className="text-sm">{tip}</p>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
