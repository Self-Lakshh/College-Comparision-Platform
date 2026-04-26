import React from 'react';
import { Button } from '@/components/ui/button';

const EmptyState = ({ title, description, icon = "◎", actionLabel, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-fade-in">
      <div className="text-6xl mb-6 text-zinc-800">{icon}</div>
      <h3 className="text-xl font-semibold text-zinc-100 mb-2">{title}</h3>
      <p className="text-zinc-500 max-w-sm mb-8">{description}</p>
      {actionLabel && (
        <Button 
          onClick={onAction}
          className="bg-blue-600 hover:bg-blue-500 text-white px-8"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
