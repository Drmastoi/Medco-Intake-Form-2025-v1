
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface LoadingIndicatorProps {
  loadingProgress: number;
}

const LoadingIndicator = ({ loadingProgress }: LoadingIndicatorProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="flex flex-col items-center w-full max-w-md">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-2"></div>
        <p className="mb-2">Loading PDF preview...</p>
        <Progress value={loadingProgress} className="w-full mb-1" />
        <p className="text-xs text-muted-foreground">This may take a few moments for large reports</p>
      </div>
    </div>
  );
};

export default LoadingIndicator;
