import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import CompareBar from '../components/CompareBar';
import PageLoader from '../components/layout/PageLoader';
import { Toaster } from '@/components/ui/sonner';

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-blue-500/20 selection:text-blue-600 transition-colors duration-200">
      <Header />
      
      <main className="pt-14 pb-20">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>

      <CompareBar />

      {/* Global Toast Notifications */}
      <Toaster 
        position="bottom-right" 
        expand={false}
        richColors 
        theme="system"
        toastOptions={{
          className: 'rounded-md border-zinc-200 dark:border-zinc-800 shadow-lg font-medium',
        }}
      />
    </div>
  );
};

export default RootLayout;
