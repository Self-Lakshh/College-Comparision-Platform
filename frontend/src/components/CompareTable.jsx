import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { formatFee, formatRating } from '../utils/format';

const CompareTable = ({ colleges }) => {
  // logic to determine best values
  const getBestValue = (field, value, allColleges) => {
    const values = allColleges.map(c => {
      if (field === 'fees') return c.fees.annual;
      if (field === 'rating') return c.rating.overall;
      if (field === 'nirf') return c.nirfRank || 999;
      if (field === 'naac') {
        const grades = { 'A++': 5, 'A+': 4, 'A': 3, 'B++': 2, 'B+': 1, 'B': 0, 'C': -1, null: -2 };
        return grades[c.naacGrade] || -3;
      }
      return null;
    });

    if (field === 'fees') return value === Math.min(...values);
    if (field === 'rating') return value === Math.max(...values);
    if (field === 'nirf') return value === Math.min(...values) && value !== 999;
    if (field === 'naac') {
      const grades = { 'A++': 5, 'A+': 4, 'A': 3, 'B++': 2, 'B+': 1, 'B': 0, 'C': -1, null: -2 };
      const currentGradeVal = grades[value] || -3;
      return currentGradeVal === Math.max(...values);
    }
    return false;
  };

  const rows = [
    { label: 'Location', key: 'location', render: (c) => c.location.display || `${c.location.city}, ${c.location.state}` },
    { label: 'Established', key: 'established', render: (c) => c.established || 'N/A' },
    { label: 'Annual Fees', key: 'fees', render: (c) => (
      <span className={getBestValue('fees', c.fees.annual, colleges) ? 'text-emerald-400 font-bold' : ''}>
        {formatFee(c.fees.annual)}
      </span>
    )},
    { label: 'Overall Rating', key: 'rating', render: (c) => (
      <span className={getBestValue('rating', c.rating.overall, colleges) ? 'text-emerald-400 font-bold' : ''}>
        {formatRating(c.rating.overall)}
      </span>
    )},
    { label: 'NAAC Grade', key: 'naac', render: (c) => (
      <span className={getBestValue('naac', c.naacGrade, colleges) ? 'text-emerald-400 font-bold' : ''}>
        {c.naacGrade || 'N/A'}
      </span>
    )},
    { label: 'NIRF Rank', key: 'nirf', render: (c) => (
      <span className={getBestValue('nirf', c.nirfRank, colleges) ? 'text-emerald-400 font-bold' : ''}>
        {c.nirfRank ? `#${c.nirfRank}` : 'Unranked'}
      </span>
    )},
    { label: 'Courses', key: 'courses', render: (c) => (
      <div className="flex flex-wrap gap-1 max-w-[200px]">
        {c.courses.map(course => (
          <Badge key={course} variant="outline" className="text-[10px] py-0 border-zinc-800 text-zinc-400">
            {course}
          </Badge>
        ))}
      </div>
    )},
  ];

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border border-zinc-800 bg-zinc-900">
      <div className="min-w-max">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="p-6 bg-zinc-950/50 text-zinc-500 text-xs font-medium uppercase tracking-widest sticky left-0 z-20 min-w-[200px]">
                Features
              </th>
              {colleges.map((college) => (
                <th key={college._id} className="p-6 min-w-[300px] border-l border-zinc-800">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-zinc-100 whitespace-normal">
                      {college.name}
                    </h3>
                    <Badge variant="secondary" className="bg-blue-600/10 text-blue-400 border-none px-2 py-0">
                      {college.type}
                    </Badge>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className="border-b border-zinc-800 group hover:bg-zinc-800/30 transition-colors">
                <td className="p-6 bg-zinc-950/50 text-zinc-500 text-sm font-medium sticky left-0 z-10 border-r border-zinc-800">
                  {row.label}
                </td>
                {colleges.map((college) => (
                  <td key={college._id} className="p-6 text-zinc-300 text-sm border-l border-zinc-800">
                    {row.render(college)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ScrollBar orientation="horizontal" className="bg-zinc-800" />
    </ScrollArea>
  );
};

export default CompareTable;
