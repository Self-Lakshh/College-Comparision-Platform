import React from 'react';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center z-[100] animate-in fade-in duration-300">
      <div className="flex flex-col items-center gap-6">
        {/* Logo Animation */}
        <div className="relative">
          <div className="h-20 w-20 flex items-center justify-center overflow-hidden rounded-2xl shadow-xl animate-pulse-logo">
            <img 
              src="/logo-light.png" 
              alt="Logo" 
              className="h-full w-full object-cover dark:hidden" 
            />
            <img 
              src="/logo-dark.png" 
              alt="Logo" 
              className="h-full w-full object-cover hidden dark:block" 
            />
          </div>
          <div className="absolute inset-0 h-20 w-20 border-4 border-emerald-500/10 border-t-emerald-500 rounded-2xl animate-spin-slow"></div>
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter">
            Collège<span className="text-emerald-500">.</span>
          </h2>
          <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.3em] animate-pulse">
            Initializing Comparison Engine
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
