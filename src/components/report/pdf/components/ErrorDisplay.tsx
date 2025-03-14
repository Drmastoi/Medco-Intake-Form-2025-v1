
import React from 'react';
import { Button } from '@/components/ui/button';

interface ErrorDisplayProps {
  errorMessage: string;
  onRetry: () => void;
}

const ErrorDisplay = ({ errorMessage, onRetry }: ErrorDisplayProps) => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col items-center text-red-500 p-4">
        <p className="mb-4">{errorMessage}</p>
        <p className="text-sm text-muted-foreground mb-4">
          This could be due to the report size or temporary resource constraints.
        </p>
        <Button 
          variant="outline" 
          onClick={onRetry}
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default ErrorDisplay;
