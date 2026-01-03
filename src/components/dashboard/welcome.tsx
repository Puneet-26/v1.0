'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Leaf, BarChart3, PlusCircle } from 'lucide-react';

export default function Welcome() {
    const heroImage = getPlaceholderImage('hero-nature');

    return (
        <div className="space-y-8">
            <Card className="overflow-hidden shadow-lg">
                <div className="relative h-72 w-full">
                    {heroImage && (
                        <Image
                            src={heroImage.imageUrl}
                            alt={heroImage.description}
                            data-ai-hint={heroImage.imageHint}
                            fill
                            className="object-cover"
                            priority
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8">
                        <h1 className="text-5xl font-bold font-headline text-white drop-shadow-md">Welcome to EcoTrack</h1>
                        <p className="text-xl text-white/90 mt-2 max-w-2xl">Your journey to a smaller carbon footprint starts now. Let's make a difference, one week at a time.</p>
                    </div>
                </div>
                <CardContent className="p-8 bg-gray-50">
                    <p className="text-lg mb-6 text-gray-700">
                        It looks like you haven't logged any activity yet. Get started by calculating your first weekly carbon footprint.
                    </p>
                    <Button asChild size="lg">
                        <Link href="/log">
                            Log Your First Week
                            <ArrowRight className="ml-2" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-8 text-center">
                <Card>
                    <CardContent className="p-6">
                        <div className="mx-auto bg-secondary rounded-full p-4 w-fit mb-4">
                            <PlusCircle className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Log Your Activities</h3>
                        <p className="text-muted-foreground">Easily input your weekly transport, energy, and food habits.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="mx-auto bg-secondary rounded-full p-4 w-fit mb-4">
                             <Leaf className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Get Personalized Tips</h3>
                        <p className="text-muted-foreground">Receive AI-powered suggestions tailored to your lifestyle.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="mx-auto bg-secondary rounded-full p-4 w-fit mb-4">
                            <BarChart3 className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Track Your Progress</h3>
                        <p className="text-muted-foreground">Visualize your carbon footprint reduction over time with simple charts.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
