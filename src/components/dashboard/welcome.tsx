import Image from 'next/image';
import Link from 'next/link';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function Welcome() {
    const heroImage = getPlaceholderImage('hero-nature');

    return (
        <Card className="overflow-hidden">
            <div className="relative h-60 w-full">
                {heroImage && (
                    <Image
                        src={heroImage.imageUrl}
                        alt={heroImage.description}
                        data-ai-hint={heroImage.imageHint}
                        fill
                        className="object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                    <h1 className="text-4xl font-bold font-headline text-white">Welcome to EcoTrack</h1>
                    <p className="text-lg text-white/90 mt-2">Your journey to a smaller carbon footprint starts here.</p>
                </div>
            </div>
            <CardContent className="p-6">
                <p className="text-lg mb-4">
                    It looks like you haven&apos;t logged any activity yet. Get started by calculating your first weekly carbon footprint.
                </p>
                <Button asChild size="lg">
                    <Link href="/log">
                        Log Your First Week
                        <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}
