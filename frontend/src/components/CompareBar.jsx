import React from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCompare } from '../context/CompareContext';
import { logCompareSession } from '../utils/api';

const CompareBar = () => {
  const { selected, removeCollege, clearAll, MAX_COMPARE } = useCompare();

  const handleCompareClick = () => {
    if (selected.length >= 2) {
      logCompareSession(selected.map(c => c._id)).catch(console.error);
    }
  };

  if (selected.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-md z-40 animate-slide-up py-4">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mr-2 hidden sm:inline">
            Comparing:
          </span>
          {selected.map((college) => (
            <Badge 
              key={college._id} 
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700 pl-3 pr-1 py-1 gap-1 flex-shrink-0 animate-fade-in"
            >
              <span className="text-xs truncate max-w-[120px]">{college.name}</span>
              <button 
                onClick={() => removeCollege(college._id)}
                className="hover:text-red-400 p-0.5 rounded-full transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {selected.length < MAX_COMPARE && (
            <div className="text-xs text-zinc-600 font-medium px-2 hidden sm:block">
              Add {MAX_COMPARE - selected.length} more to compare
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAll}
            className="text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 hidden sm:flex"
          >
            Clear all
          </Button>
          
          <Link to="/compare" onClick={handleCompareClick}>
            <Button 
              disabled={selected.length < 2}
              className="bg-blue-600 hover:bg-blue-500 text-white gap-2 font-semibold h-10 px-6 disabled:bg-zinc-800 disabled:text-zinc-600"
            >
              Compare {selected.length}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompareBar;
