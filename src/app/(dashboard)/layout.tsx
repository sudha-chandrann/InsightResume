'use client';

import React from 'react';
import NavBar from "./_components/Navbar";
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <NavBar currentPath={pathname} />
      <div className="pt-4 px-4 md:px-6 lg:px-8">
        {children}
      </div>

      {/* Page gradient effects */}
      <div className="fixed top-20 -left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-xl opacity-20 z-0"></div>
      <div className="fixed bottom-20 -right-20 w-80 h-80 bg-blue-600/20 rounded-full blur-xl opacity-20 z-0"></div>
    </div>
  );
}