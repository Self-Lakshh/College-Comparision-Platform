import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCompare } from '../context/CompareContext';
import CompareTable from '../components/CompareTable';
import EmptyState from '../components/EmptyState';

const Compare = () => {
  const { selected, clearAll } = useCompare();
  const navigate = useNavigate();

  return (
    <main className="max-w-6xl mx-auto px-6 pt-24 pb-32">
      <div className="mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-100 transition-colors mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to browsing
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">
              Compare Colleges
            </h1>
            <p className="text-zinc-400 mt-1">
              Analyzing {selected.length} colleges side-by-side
            </p>
          </div>

          {selected.length > 0 && (
            <Button 
              variant="ghost" 
              onClick={clearAll}
              className="text-zinc-500 hover:text-red-400 hover:bg-red-950/20 gap-2 h-10 -ml-3 md:ml-0"
            >
              <Trash2 className="h-4 w-4" />
              Clear comparison
            </Button>
          )}
        </div>
      </div>

      {selected.length < 2 ? (
        <div className="border border-zinc-800 bg-zinc-900 rounded-xl overflow-hidden">
          <EmptyState 
            title="Not enough colleges" 
            description="You need at least 2 colleges to start a comparison. Go back and add some more."
            actionLabel="Browse colleges"
            onAction={() => navigate('/')}
          />
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <CompareTable colleges={selected} />
          
          <div className="p-6 border border-zinc-800 bg-zinc-900 rounded-xl">
            <h4 className="text-sm font-semibold text-zinc-100 mb-2">Pro Tip</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We highlight the best values in <span className="text-emerald-400 font-semibold">green</span> for each category. 
              Lower is better for Fees and NIRF Rank. Higher is better for Rating and NAAC Grade.
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default Compare;
