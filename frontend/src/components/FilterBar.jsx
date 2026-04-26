import React, { useEffect, useState } from 'react';
import { Search, ListFilter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
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
    // calculate active filters (excluding search as it's handled by debounce)
    let count = 0;
    if (initialFilters.state) count++;
    if (initialFilters.type) count++;
    if (initialFilters.sort !== 'rating_desc') count++;
    if (initialFilters.minRating) count++;
    setActiveFilterCount(count);
  }, [initialFilters]);

  const handleReset = () => {
    setLocalSearch('');
    onFilterChange({
      search: '',
      state: '',
      type: '',
      minRating: '',
      sort: 'rating_desc'
    });
  };

  const FilterControls = ({ mobile = false }) => (
    <div className={`flex ${mobile ? 'flex-col space-y-4 pt-6' : 'flex-row flex-wrap gap-2 items-center'}`}>
      <div className={`relative ${mobile ? 'w-full' : 'w-64'}`}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
        <Input
          placeholder="Search colleges..."
          className="pl-9 bg-zinc-900 border-zinc-800 text-zinc-100 h-10 placeholder:text-zinc-600 focus:ring-blue-500"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>

      <Select 
        value={initialFilters.state || 'all'} 
        onValueChange={(val) => onFilterChange({ state: val === 'all' ? '' : val })}
      >
        <SelectTrigger className={`${mobile ? 'w-full' : 'w-40'} bg-zinc-900 border-zinc-800 text-zinc-300 h-10`}>
          <SelectValue placeholder="All States" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300">
          <SelectItem value="all">All States</SelectItem>
          {states.map(state => (
            <SelectItem key={state} value={state}>{state}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select 
        value={initialFilters.type || 'all'} 
        onValueChange={(val) => onFilterChange({ type: val === 'all' ? '' : val })}
      >
        <SelectTrigger className={`${mobile ? 'w-full' : 'w-40'} bg-zinc-900 border-zinc-800 text-zinc-300 h-10`}>
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300">
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="Public">Public</SelectItem>
          <SelectItem value="Private">Private</SelectItem>
          <SelectItem value="Deemed">Deemed</SelectItem>
          <SelectItem value="Autonomous">Autonomous</SelectItem>
        </SelectContent>
      </Select>

      <Select 
        value={initialFilters.sort} 
        onValueChange={(val) => onFilterChange({ sort: val })}
      >
        <SelectTrigger className={`${mobile ? 'w-full' : 'w-40'} bg-zinc-900 border-zinc-800 text-zinc-300 h-10`}>
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300">
          <SelectItem value="rating_desc">Highest Rated</SelectItem>
          <SelectItem value="fees_asc">Fees: Low to High</SelectItem>
          <SelectItem value="fees_desc">Fees: High to Low</SelectItem>
          <SelectItem value="nirf_asc">NIRF Rank</SelectItem>
          <SelectItem value="name_asc">Name A-Z</SelectItem>
        </SelectContent>
      </Select>

      {(activeFilterCount > 0 || localSearch) && (
        <Button 
          variant="ghost" 
          onClick={handleReset}
          className="h-10 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 px-3 gap-2"
        >
          <X className="h-4 w-4" />
          Reset
        </Button>
      )}
    </div>
  );

  return (
    <div className="py-6 border-b border-zinc-900">
      {/* Desktop filters */}
      <div className="hidden lg:block">
        <FilterControls />
      </div>

      {/* Mobile filters */}
      <div className="lg:hidden flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Search..."
            className="pl-9 bg-zinc-900 border-zinc-800 text-zinc-100 h-10"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="bg-zinc-900 border-zinc-800 text-zinc-300 gap-2 h-10">
              <ListFilter className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge className="bg-blue-600 text-white h-5 w-5 p-0 justify-center rounded-full text-[10px]">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-zinc-950 border-zinc-800 text-zinc-100 w-[280px]">
            <SheetHeader>
              <SheetTitle className="text-zinc-100">Filters</SheetTitle>
            </SheetHeader>
            <FilterControls mobile />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default FilterBar;
