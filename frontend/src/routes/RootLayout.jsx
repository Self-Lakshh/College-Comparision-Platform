import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import CompareBar from '../components/CompareBar';
import PageLoader from '../components/layout/PageLoader';
import { Toaster } from '@/components/ui/sonner';

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-blue-500/30 selection:text-blue-200 transition-colors duration-300">
      <Header />
      
      <main className="pt-14 pb-20">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>

      <CompareBar />

      {/* Global Toast Notifications */}
      <Toaster 
        position="top-right" 
        theme="dark" 
        richColors 
        toastOptions={{
          className: 'bg-zinc-900 border-zinc-800 text-zinc-100',
        }}
      />
    </div>
  );
};

export default RootLayout;
