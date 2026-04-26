import React from 'react';
import { useColleges } from '../hooks/useColleges';
import CollegeCard from '../components/CollegeCard';
import FilterBar from '../components/FilterBar';
import SkeletonCard from '../components/SkeletonCard';
import EmptyState from '../components/EmptyState';
import Container from '../components/layout/Container';
import { Button } from '@/components/ui/button';

const Home = () => {
  const { 
    colleges, 
    pagination, 
    loading, 
    error, 
    filters, 
    updateFilters, 
    changePage 
  } = useColleges({
    sort: 'rating_desc'
  });

  const handleReset = () => {
    updateFilters({
      search: '',
      state: '',
      type: '',
      minRating: '',
      sort: 'rating_desc'
    });
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-900 py-16 md:py-28 transition-colors duration-300">
        <Container>
          <div className="max-w-3xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-500 mb-6 block">
              India's Premier Comparison Engine
            </span>
            <h1 className="text-4xl md:text-7xl font-bold text-zinc-900 dark:text-white tracking-tighter mb-8 leading-[1.1]">
              Find the right college.<br />
              <span className="text-zinc-400 dark:text-zinc-600">Make the right move.</span>
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl font-medium">
              Access unbiased data and objective side-by-side comparisons to navigate the most critical decision of your academic career.
            </p>
          </div>
        </Container>
      </section>

      {/* Filter Bar */}
      <FilterBar onFilterChange={updateFilters} initialFilters={filters} />
      
      <Container className="py-12">
        {/* Results Meta */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em]">
            {loading ? 'Analyzing Institution Data...' : `${pagination.total} Institutions Available`}
          </h2>
        </div>

        {/* College Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          ) : error ? (
            <div className="col-span-full py-12 text-center text-red-400 border border-red-900/30 bg-red-950/10 rounded-lg">
              {error}
            </div>
          ) : colleges.length === 0 ? (
            <div className="col-span-full">
              <EmptyState 
                title="No colleges found" 
                description="We couldn't find any colleges matching your filters. Try adjusting your search or clearing filters."
                actionLabel="Clear all filters"
                onAction={handleReset}
              />
            </div>
          ) : (
            colleges.map((college, index) => (
              <CollegeCard key={college._id} college={college} index={index} />
            ))
          )}
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-16">
            <Button
              variant="ghost"
              disabled={pagination.page === 1}
              onClick={() => changePage(pagination.page - 1)}
              className="text-zinc-400 hover:text-zinc-100"
            >
              Previous
            </Button>
            
            <div className="flex items-center gap-1 px-4">
              <span className="text-sm font-bold text-zinc-100">{pagination.page}</span>
              <span className="text-sm text-zinc-600">/</span>
              <span className="text-sm text-zinc-500">{pagination.pages}</span>
            </div>

            <Button
              variant="ghost"
              disabled={pagination.page === pagination.pages}
              onClick={() => changePage(pagination.page + 1)}
              className="text-zinc-400 hover:text-zinc-100"
            >
              Next
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Home;
