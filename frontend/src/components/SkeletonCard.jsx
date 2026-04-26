import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonCard = () => {
  return (
    <Card className="card-premium h-full flex flex-col overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
      <CardHeader className="p-5 pb-0">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-2.5 flex-1">
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-3 w-1/3" />
          </div>
          <Skeleton className="h-6 w-16 rounded-md" />
        </div>
      </CardHeader>
      <CardContent className="p-5 space-y-6 flex-1">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="flex justify-between items-center">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-28" />
          </div>
        </div>
        <div className="flex gap-1.5 pt-2">
          <Skeleton className="h-5 w-14 rounded-md" />
          <Skeleton className="h-5 w-14 rounded-md" />
          <Skeleton className="h-5 w-14 rounded-md" />
        </div>
        <div className="mt-auto pt-2">
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
