import React, { useEffect, useState } from 'react';
import { History, Clock, RotateCcw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger,
  PopoverClose
} from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from 'react-router-dom';

const HistoryButton = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Load history from localStorage
    const saved = localStorage.getItem('college_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved).slice(0, 5)); // Keep last 5
      } catch (e) {
        console.error('Failed to parse history', e);
      }
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('college_history');
    setHistory([]);
  };

  return (
    <Popover>
      {/* 
          Removing Tooltip wrapper for now to resolve hydration error 
          caused by nested button triggers in Base UI components.
      */}
      <PopoverTrigger 
        className="inline-flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200 h-9 w-9 rounded-md border border-transparent outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <History className="h-5 w-5" />
      </PopoverTrigger>

      <PopoverContent align="end" className="w-80 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 p-0 shadow-2xl rounded-xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-950/50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-600 dark:text-blue-500" />
            <span className="text-sm font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tighter">Recent Activity</span>
          </div>
          <div className="flex items-center gap-1">
            {history.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearHistory}
                className="h-8 text-[10px] font-bold uppercase tracking-wider text-zinc-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 px-2"
              >
                Clear
              </Button>
            )}
            <PopoverClose className="h-8 w-8 flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-all">
              <X className="h-4 w-4" />
            </PopoverClose>
          </div>
        </div>

        <div className="max-h-[320px] overflow-y-auto py-2">
          {history.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <p className="text-xs text-zinc-400 italic">No recent activity tracked yet</p>
            </div>
          ) : (
            <div className="space-y-1 px-2">
              {history.map((item, idx) => (
                <Link 
                  key={idx}
                  to="/"
                  className="flex flex-col p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all group"
                >
                  <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.name || 'Search: ' + item.query}
                  </span>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1 font-medium">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 bg-zinc-50/50 dark:bg-zinc-950/30 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-relaxed font-medium">
            Your history is stored locally on this device and never uploaded to our servers.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default HistoryButton;
