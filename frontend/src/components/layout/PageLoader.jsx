import React from 'react';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-white animate-pulse">
            Collège<span className="text-blue-500">.</span>
          </span>
        </div>
        <div className="w-12 h-0.5 bg-zinc-800 rounded-full overflow-hidden">
          <div className="w-1/2 h-full bg-blue-500 rounded-full animate-loader"></div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
