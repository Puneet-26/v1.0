'use client';

import { usePathname } from 'next/navigation';
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Home, BarChart3, PlusCircle, Leaf } from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/log', label: 'Log Activity', icon: PlusCircle },
  { href: '/progress', label: 'Progress', icon: BarChart3 },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar side="left" collapsible="icon">
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label, side: 'right' }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
