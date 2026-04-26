import React from 'react';
import { Link } from 'react-router-dom';
import { X, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCompare } from '../context/CompareContext';
import { logCompareSession } from '../utils/api';
import Container from './layout/Container';

const CompareBar = () => {
  const { selected, removeCollege, clearAll, MAX_COMPARE } = useCompare();

  const handleCompareClick = () => {
    if (selected.length >= 2) {
      logCompareSession(selected.map(c => c._id)).catch(console.error);
    }
  };

  if (selected.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md z-40 animate-in slide-in-from-bottom duration-300 shadow-2xl">
      <Container className="py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] hidden md:inline">
              Selection:
            </span>
            <div className="flex items-center gap-2">
              {selected.map((college) => (
                <Badge 
                  key={college._id} 
                  className="rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 pl-3 pr-1.5 py-1.5 gap-2 flex-shrink-0 animate-in fade-in zoom-in-95 duration-200 transition-colors"
                >
                  <span className="text-xs truncate max-w-[140px] font-bold">{college.name}</span>
                  <button 
                    onClick={() => removeCollege(college._id)}
                    className="bg-white dark:bg-zinc-800 hover:text-red-500 p-0.5 rounded-full transition-colors shadow-sm"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAll}
              className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 hidden sm:flex h-10 px-4 rounded-lg font-bold"
            >
              Clear
            </Button>
            
            <Link to="/compare" onClick={handleCompareClick}>
              <Button 
                disabled={selected.length < 2}
                className="bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white gap-2 font-bold h-10 px-6 rounded-lg btn-primary-glow disabled:opacity-50 disabled:shadow-none"
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="hidden sm:inline">Compare</span>
                <span>{selected.length}</span>
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CompareBar;
