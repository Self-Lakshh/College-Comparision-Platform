import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { History, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useCompare } from '../../context/CompareContext';
import ThemeToggle from './ThemeToggle';
import HistoryButton from './HistoryButton';
import Container from './Container'; // Ensure this is imported correctly

/**
 * Global Navigation Header
 */
const Header = () => {
  const { selected } = useCompare();
  const location = useLocation();
  const isComparePage = location.pathname === '/compare';

  return (
    <header className="header-premium fixed top-0 left-0 right-0 h-14 z-[100] flex items-center">
      <Container className="flex items-center justify-between w-full">
        {/* Logo at Left */}
        <Link 
          to="/" 
          className="flex items-center gap-2 hover:scale-[0.98] transition-all group"
        >
          <div className="relative h-8 w-8 flex items-center justify-center overflow-hidden rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
            <img 
              src="/logo-light.png" 
              alt="Logo" 
              className="h-full w-full object-cover dark:hidden" 
            />
            <img 
              src="/logo-dark.png" 
              alt="Logo" 
              className="h-full w-full object-cover hidden dark:block" 
            />
          </div>
          <span className="text-xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter">
            Collège<span className="text-emerald-500">.</span>
          </span>
        </Link>

        {/* Actions at Right */}
        <div className="flex items-center gap-2 md:gap-4 ml-auto">
          <div className="flex items-center gap-1 border-r border-zinc-200 dark:border-zinc-800 pr-2 md:pr-4">
            <HistoryButton />
            <ThemeToggle />
          </div>

          {/* Compare Button */}
          {!isComparePage && selected.length > 0 && (
            <div className="animate-in slide-in-from-right-2 fade-in duration-300">
              <Link to="/compare">
                <Button 
                  size="sm" 
                  className="btn-primary-premium gap-2 h-9 px-4"
                >
                  <LayoutGrid className="h-4 w-4" />
                  <span className="hidden sm:inline font-bold">Compare</span>
                  <div className="bg-white/20 text-white px-1.5 h-5 min-w-[20px] flex items-center justify-center rounded-full text-[10px] font-bold">
                    {selected.length}
                  </div>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
