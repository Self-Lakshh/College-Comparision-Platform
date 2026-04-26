import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
      className={`relative overflow-hidden border-zinc-800 bg-zinc-900 transition-all duration-200 animate-fade-in ${
        selected ? 'ring-1 ring-blue-500 bg-blue-950/10 border-blue-900' : 'hover:border-zinc-700'
      }`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <CardHeader className="p-5 pb-0">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h3 className="text-base font-semibold text-zinc-100 leading-tight">
              {college.name}
            </h3>
            {college.nirfRank && (
              <span className="text-xs text-zinc-500 font-medium">
                NIRF #{college.nirfRank}
              </span>
            )}
          </div>
          <Badge variant="outline" className="bg-zinc-800 border-zinc-700 text-zinc-400 font-normal shrink-0">
            {college.type}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-4">
        {/* Stats Grid */}
        <div className="space-y-2">
          <StatRow icon="📍" label="Location" value={college.location.display || `${college.location.city}, ${college.location.state}`} />
          <StatRow icon="💰" label="Annual Fees" value={formatFeeShort(college.fees.annual)} isMono />
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-between group cursor-default">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <span className="text-xs">⭐</span>
                    <span className="text-xs font-medium uppercase tracking-wider">Rating</span>
                  </div>
                  <span className="text-sm font-semibold text-zinc-100">
                    {formatRating(college.rating.overall)}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-zinc-800 border-zinc-700 text-zinc-100">
                <p className="text-xs">Based on {college.rating.reviewCount.toLocaleString()} reviews</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {college.naacGrade && (
            <StatRow icon="🎓" label="NAAC Grade" value={college.naacGrade} />
          )}
        </div>

        {/* Courses Badges */}
        <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-6">
          {college.courses.slice(0, 3).map((course) => (
            <Badge key={course} variant="secondary" className="text-[10px] bg-zinc-800 text-zinc-400 border-none px-1.5 py-0">
              {course}
            </Badge>
          ))}
          {college.courses.length > 3 && (
            <span className="text-[10px] text-zinc-500 font-medium">+{college.courses.length - 3}</span>
          )}
        </div>

        <Button 
          variant={selected ? "secondary" : "default"} 
          className={`w-full text-xs h-9 transition-colors ${
            selected 
              ? 'bg-blue-950/40 text-blue-400 border border-blue-800 hover:bg-blue-950/60' 
              : 'bg-blue-600 hover:bg-blue-500 text-white border-none'
          }`}
          onClick={handleToggleCompare}
        >
          {selected ? 'Added to Compare' : '+ Add to Compare'}
        </Button>
      </CardContent>
    </Card>
  );
};

const StatRow = ({ icon, label, value, isMono = false }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2 text-zinc-500">
      <span className="text-xs">{icon}</span>
      <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
    </div>
    <span className={`text-sm font-medium text-zinc-100 ${isMono ? 'font-mono' : ''}`}>
      {value}
    </span>
  </div>
);

export default CollegeCard;
