import type { Metadata } from 'next';
import './globals.css';
import AppShell from '@/components/layout/app-shell';

export const metadata: Metadata = {
  title: 'EcoTrack',
  description: 'Track and reduce your carbon footprint',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="h-full font-body antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
