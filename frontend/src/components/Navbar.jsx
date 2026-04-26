import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCompare } from '../context/CompareContext';

const Navbar = () => {
  const { selected } = useCompare();
  const location = useLocation();
  const isComparePage = location.pathname === '/compare';

  return (
    <nav className="fixed top-0 left-0 right-0 h-14 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md z-50">
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-zinc-100 tracking-tight">
          Collège<span className="text-blue-500">.</span>
        </Link>

        {!isComparePage && selected.length > 0 && (
          <div className="flex items-center gap-4 animate-fade-in">
            <Link to="/compare">
              <Button variant="outline" size="sm" className="gap-2 border-zinc-700 bg-zinc-900 hover:bg-zinc-800">
                Compare
                <Badge variant="secondary" className="bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 px-1.5 h-5 min-w-[20px] justify-center">
                  {selected.length}
                </Badge>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
