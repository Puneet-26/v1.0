'use client';

import type { FC, ReactNode } from 'react';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import AppHeader from '@/components/layout/header';
import AppSidebar from '@/components/layout/sidebar';
import { Toaster } from '@/components/ui/toaster';

interface AppShellProps {
  children: ReactNode;
}

const AppShell: FC<AppShellProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="relative min-h-screen">
          <AppSidebar />
          <SidebarInset>
            <AppHeader />
            <main className="p-4 sm:p-6 lg:p-8">
              {children}
            </main>
          </SidebarInset>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default AppShell;
