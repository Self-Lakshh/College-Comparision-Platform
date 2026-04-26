import React from 'react';
import { Button } from '@/components/ui/button';

const EmptyState = ({ title, description, icon = "◎", actionLabel, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center animate-fade-in">
      <div className="text-7xl mb-8 text-zinc-200 dark:text-zinc-800 font-bold">{icon}</div>
      <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">{title}</h3>
      <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mb-10 text-sm leading-relaxed">{description}</p>
      {actionLabel && (
        <Button 
          onClick={onAction}
          className="bg-blue-600 hover:bg-blue-500 text-white px-10 h-11 rounded-lg font-bold shadow-premium"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
