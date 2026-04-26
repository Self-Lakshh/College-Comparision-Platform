import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCompare } from '../context/CompareContext';
import CompareTable from '../components/CompareTable';
import EmptyState from '../components/EmptyState';
import Container from '../components/layout/Container';

const Compare = () => {
  const { selected, clearAll } = useCompare();
  const navigate = useNavigate();

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <section className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-900 py-16 md:py-24 transition-colors duration-300">
        <Container>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="group p-0 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-transparent mb-8 h-auto font-bold text-xs uppercase tracking-widest"
          >
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Discovery
          </Button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tighter">
                Comparison Report
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 font-bold text-sm">
                Analyzing {selected.length} Selected Institutions
              </p>
            </div>

            {selected.length > 0 && (
              <Button 
                variant="ghost" 
                onClick={clearAll}
                className="text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 gap-2 h-11 px-4 rounded-lg font-bold"
              >
                <Trash2 className="h-4 w-4" />
                Clear Selection
              </Button>
            )}
          </div>
        </Container>
      </section>

      <Container className="py-12">
        {selected.length < 2 ? (
          <div className="card-premium p-12">
            <EmptyState 
              title="Add more colleges" 
              description="You need at least 2 colleges for a side-by-side comparison. Go back and select your favorites."
              actionLabel="Return to browse"
              onAction={() => navigate('/')}
            />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="card-premium overflow-hidden">
              <CompareTable colleges={selected} />
            </div>
            
            <div className="card-premium p-8 bg-blue-50/30 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30 flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="h-12 w-12 rounded-2xl bg-blue-600/10 flex items-center justify-center shrink-0 shadow-sm border border-blue-200 dark:border-blue-900/50">
                <Info className="h-6 w-6 text-blue-600 dark:text-blue-500" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Comparison Intelligence</h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-3xl font-medium">
                  Winners are highlighted in <span className="text-emerald-600 dark:text-emerald-400 font-bold">emerald</span>. 
                  Our system evaluates metrics like Fees (lower is better), Rankings (lower is better), and Ratings (higher is better) to help you find the best value.
                </p>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Compare;
