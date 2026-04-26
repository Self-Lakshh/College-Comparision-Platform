import React from 'react';
import { MapPin, Star, Plus, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useCompare } from '../context/CompareContext';
import { formatFeeShort, formatRating } from '../utils/format';

const CollegeCard = ({ college, index }) => {
  const { addCollege, removeCollege, isSelected } = useCompare();
  const selected = isSelected(college._id);

  const handleToggleCompare = () => {
    if (selected) {
      removeCollege(college._id);
    } else {
      addCollege(college);
    }
  };

  return (
    <Card 
      className={`card-premium h-full flex flex-col group overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both ${
        selected ? 'ring-2 ring-blue-500/50 border-blue-500 dark:border-blue-600' : ''
      }`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* College Body */}
      <div className="p-5 flex-1 space-y-6">
        <div className="flex justify-between items-start gap-3">
          <div className="space-y-1.5 flex-1">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight line-clamp-2">
              {college.name}
            </h3>
            <div className="flex items-center text-zinc-500 dark:text-zinc-400 text-[11px] gap-1.5 font-medium">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{college.location.city}, {college.location.state}</span>
            </div>
          </div>
          <div className="badge-premium shrink-0">
            {college.type}
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-amber-500/10 dark:bg-amber-500/20 p-1.5 rounded-md">
              <Star className="h-4 w-4 text-amber-600 dark:text-amber-500 fill-amber-600 dark:fill-amber-500" />
            </div>
            <div>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">{formatRating(college.rating.overall)}</span>
              <span className="text-zinc-500 text-[10px] ml-1 font-medium">/ 5.0</span>
            </div>
          </div>
          
          {college.nirfRank && (
            <div className="flex items-center gap-2 border-l border-zinc-200 dark:border-zinc-800 pl-4">
              <span className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">NIRF</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100 font-mono">#{college.nirfRank}</span>
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="space-y-1">
          <div className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">Annual Fees</div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-mono tracking-tighter">
            ₹{college.fees.annual.toLocaleString()}
          </div>
        </div>

        {/* Courses Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {college.courses.slice(0, 3).map((course) => (
            <div key={course} className="badge-premium text-[10px] bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              {course}
            </div>
          ))}
          {college.courses.length > 3 && (
            <span className="text-[10px] text-zinc-400 font-bold self-center">+{college.courses.length - 3} more</span>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <CardFooter className="p-5 pt-0 mt-auto bg-transparent border-none">
        <Button 
          variant={selected ? "outline" : "default"} 
          className={`w-full text-xs h-11 transition-all duration-300 rounded-md font-bold ${
            selected 
              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/50 hover:bg-blue-100 dark:hover:bg-blue-900/30' 
              : 'btn-primary-premium'
          }`}
          onClick={handleToggleCompare}
        >
          {selected ? (
            <span className="flex items-center gap-2"><Check className="h-4 w-4" /> Selected</span>
          ) : (
            <span className="flex items-center gap-2"><Plus className="h-4 w-4" /> Add to Compare</span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CollegeCard;
