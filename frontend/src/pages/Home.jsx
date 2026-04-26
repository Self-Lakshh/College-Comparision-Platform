import React from 'react';
import { useColleges } from '../hooks/useColleges';
import CollegeCard from '../components/CollegeCard';
import FilterBar from '../components/FilterBar';
import SkeletonCard from '../components/SkeletonCard';
import EmptyState from '../components/EmptyState';
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
    <main className="max-w-6xl mx-auto px-6 pt-24 pb-32">
      {/* Hero Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500 mb-4 block">
            India's College Comparison Platform
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-100 tracking-tight mb-4">
            Find the right college.<br />No noise.
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Unbiased data and side-by-side comparisons to help you make the most important decision of your academic life.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <FilterBar onFilterChange={updateFilters} initialFilters={filters} />

      {/* Results Meta */}
      <div className="flex items-center justify-between py-6">
        <span className="text-xs font-medium text-zinc-500">
          {loading ? 'Searching...' : `${pagination.total} colleges found`}
        </span>
      </div>

      {/* College Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="flex items-center justify-center gap-2 mt-12">
          {Array.from({ length: pagination.pages }).map((_, i) => (
            <Button
              key={i + 1}
              variant={pagination.page === i + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => changePage(i + 1)}
              className={`w-9 h-9 p-0 ${
                pagination.page === i + 1 
                  ? 'bg-blue-600 hover:bg-blue-500 border-none' 
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-100'
              }`}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;
