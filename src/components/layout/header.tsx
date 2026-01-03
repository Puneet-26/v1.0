'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, LayoutDashboard, PlusCircle, BarChart3, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/log', label: 'Log Activity', icon: PlusCircle },
  { href: '/progress', label: 'Progress', icon: BarChart3 },
];

export default function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-8 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
      <Link href="/" className="flex items-center gap-2">
        <Leaf className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold font-headline text-primary">EcoTrack</h1>
      </Link>
      <nav className="flex items-center gap-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/50 hover:text-accent-foreground',
              pathname === item.href
                ? 'bg-accent/80 text-accent-foreground'
                : 'text-muted-foreground'
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
