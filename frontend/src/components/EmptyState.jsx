import React from 'react';
import { Button } from '@/components/ui/button';

const EmptyState = ({ title, description, icon = "◎", actionLabel, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center animate-fade-in">
      <div className="text-8xl mb-8 text-zinc-100 dark:text-zinc-900 font-black select-none">{icon}</div>
      <h3 className="text-3xl font-black text-zinc-900 dark:text-zinc-100 mb-4 tracking-tighter">{title}</h3>
      <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mb-10 text-sm font-medium leading-relaxed">{description}</p>
      {actionLabel && (
        <Button 
          onClick={onAction}
          className="btn-primary-premium px-12 h-12 text-sm"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
