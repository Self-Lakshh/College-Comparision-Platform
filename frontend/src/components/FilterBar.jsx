import React, { useEffect, useState } from 'react';
import { Search, SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Container from './layout/Container';
import { useDebounce } from '../hooks/useDebounce';
import { fetchStates } from '../utils/api';

const FilterBar = ({ onFilterChange, initialFilters }) => {
  const [localSearch, setLocalSearch] = useState(initialFilters.search || '');
  const debouncedSearch = useDebounce(localSearch, 400);
  const [states, setStates] = useState([]);
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  useEffect(() => {
    const loadStates = async () => {
      try {
        const data = await fetchStates();
        setStates(data);
      } catch (err) {
        console.error('Failed to load states', err);
      }
    };
    loadStates();
  }, []);

  useEffect(() => {
    onFilterChange({ search: debouncedSearch });
  }, [debouncedSearch, onFilterChange]);

  useEffect(() => {
    let count = 0;
    if (initialFilters.state) count++;
    if (initialFilters.type) count++;
    if (initialFilters.sort !== 'rating_desc') count++;
    setActiveFilterCount(count);
  }, [initialFilters]);

  const handleReset = () => {
    setLocalSearch('');
    onFilterChange({
      search: '',
      state: '',
      type: '',
      sort: 'rating_desc'
    });
  };

  const FilterControls = ({ mobile = false }) => (
    <div className={`flex ${mobile ? 'flex-col space-y-6' : 'filter-bar-group flex-row items-center gap-3 w-full'}`}>
      <div className={`relative ${mobile ? 'w-full' : 'w-[320px]'}`}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
        <Input
          placeholder="Search institutions, courses..."
          className="input-premium pl-10 h-10 text-sm"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>

      <Select 
        value={initialFilters.state || 'all'} 
        onValueChange={(val) => onFilterChange({ state: val === 'all' ? '' : val })}
      >
        <SelectTrigger className={`${mobile ? 'w-full' : 'w-44'} input-premium h-10 text-sm font-medium`}>
          <SelectValue placeholder="All Locations" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-lg rounded-md p-1">
          <SelectItem value="all" className="rounded-sm font-medium">All Locations</SelectItem>
          {states.map(state => (
            <SelectItem key={state} value={state} className="rounded-sm font-medium">{state}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select 
        value={initialFilters.type || 'all'} 
        onValueChange={(val) => onFilterChange({ type: val === 'all' ? '' : val })}
      >
        <SelectTrigger className={`${mobile ? 'w-full' : 'w-44'} input-premium h-10 text-sm font-medium`}>
          <SelectValue placeholder="Institution Type" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-lg rounded-md p-1">
          <SelectItem value="all" className="rounded-sm font-medium">All Types</SelectItem>
          <SelectItem value="Public" className="rounded-sm font-medium">Public</SelectItem>
          <SelectItem value="Private" className="rounded-sm font-medium">Private</SelectItem>
          <SelectItem value="Deemed" className="rounded-sm font-medium">Deemed</SelectItem>
          <SelectItem value="Autonomous" className="rounded-sm font-medium">Autonomous</SelectItem>
        </SelectContent>
      </Select>

      <Select 
        value={initialFilters.sort} 
        onValueChange={(val) => onFilterChange({ sort: val })}
      >
        <SelectTrigger className={`${mobile ? 'w-full' : 'w-44'} input-premium h-10 text-sm font-medium`}>
          <SelectValue placeholder="Sort results" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-lg rounded-md p-1">
          <SelectItem value="rating_desc" className="rounded-sm font-medium">Highest Rated</SelectItem>
          <SelectItem value="fees_asc" className="rounded-sm font-medium">Fees: Low to High</SelectItem>
          <SelectItem value="fees_desc" className="rounded-sm font-medium">Fees: High to Low</SelectItem>
          <SelectItem value="nirf_asc" className="rounded-sm font-medium">NIRF Rank</SelectItem>
          <SelectItem value="name_asc" className="rounded-sm font-medium">Name A-Z</SelectItem>
        </SelectContent>
      </Select>

      {(activeFilterCount > 0 || localSearch) && !mobile && (
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleReset}
          className="text-zinc-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md font-bold transition-all px-3"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      )}
    </div>
  );

  return (
    <div className="sticky top-14 z-30 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 transition-all duration-300">
      <Container className="py-4">
        {/* Desktop View */}
        <div className="hidden lg:block">
          <FilterControls />
        </div>

        {/* Mobile View */}
        <div className="lg:hidden flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
            <Input
              placeholder="Search..."
              className="input-premium pl-10 h-10 text-sm"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="h-10 border-zinc-200 dark:border-zinc-800 rounded-md gap-2 font-bold px-4">
                <SlidersHorizontal className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                {activeFilterCount > 0 && (
                  <Badge className="bg-blue-600 text-white h-5 w-5 p-0 flex items-center justify-center rounded-full text-[10px]">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[70vh] bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 rounded-t-3xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter uppercase">Filter Results</h3>
                  <p className="text-xs font-medium text-zinc-500">Refine by location, type, or rank.</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleReset}
                  className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 font-bold gap-2 rounded-md"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
              <FilterControls mobile />
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </div>
  );
};

export default FilterBar;
