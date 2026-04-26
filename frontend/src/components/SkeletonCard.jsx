import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonCard = () => {
  return (
    <Card className="border-zinc-800 bg-zinc-900 overflow-hidden">
      <CardHeader className="p-5 pb-0">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-3/4 bg-zinc-800" />
            <Skeleton className="h-3 w-1/4 bg-zinc-800" />
          </div>
          <Skeleton className="h-5 w-16 bg-zinc-800" />
        </div>
      </CardHeader>
      <CardContent className="p-5 space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Skeleton className="h-3 w-20 bg-zinc-800" />
            <Skeleton className="h-3 w-24 bg-zinc-800" />
          </div>
          <div className="flex justify-between items-center">
            <Skeleton className="h-3 w-20 bg-zinc-800" />
            <Skeleton className="h-3 w-16 bg-zinc-800" />
          </div>
          <div className="flex justify-between items-center">
            <Skeleton className="h-3 w-20 bg-zinc-800" />
            <Skeleton className="h-3 w-12 bg-zinc-800" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-5 w-12 bg-zinc-800" />
          <Skeleton className="h-5 w-12 bg-zinc-800" />
          <Skeleton className="h-5 w-12 bg-zinc-800" />
        </div>
        <Skeleton className="h-10 w-full bg-zinc-800 rounded-md" />
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
