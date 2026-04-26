import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { History, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useCompare } from '../../context/CompareContext';
import ThemeToggle from './ThemeToggle';
import HistoryButton from './HistoryButton';

const Header = () => {
  const { selected } = useCompare();
  const location = useLocation();
  const isComparePage = location.pathname === '/compare';

  return (
    <header className="header-premium flex items-center">
      <div className="max-w-6xl mx-auto px-6 w-full flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight hover:opacity-80 transition-opacity"
        >
          Collège<span className="text-blue-500">.</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-1.5 md:gap-3">
          <div className="flex items-center border-r border-zinc-200 dark:border-zinc-800 pr-1.5 md:pr-3 mr-1.5 md:mr-3">
            {/* History Button */}
            <HistoryButton />

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Compare Button */}
          {!isComparePage && selected.length > 0 && (
            <div className="animate-in slide-in-from-right-2 fade-in duration-300">
              <Link to="/compare">
                <Button 
                  size="sm" 
                  className="gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-premium transition-all duration-200 h-9"
                >
                  <LayoutGrid className="h-4 w-4" />
                  <span className="hidden sm:inline">Compare</span>
                  <Badge 
                    variant="secondary" 
                    className="bg-white/20 text-white hover:bg-white/30 px-1.5 h-5 min-w-[20px] justify-center rounded-full"
                  >
                    {selected.length}
                  </Badge>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
