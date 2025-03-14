
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface ErrorDisplayProps {
  errorMessage: string;
  onRetry: () => void;
}

const ErrorDisplay = ({ errorMessage, onRetry }: ErrorDisplayProps) => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col items-center text-red-500 p-8 max-w-md">
        <AlertTriangle className="h-10 w-10 mb-4" />
        <p className="mb-4 font-semibold text-center">{errorMessage}</p>
        <p className="text-sm text-muted-foreground mb-6 text-center">
          This could be due to the report size, browser limitations, or temporary resource constraints.
        </p>
        <div className="space-y-2">
          <Button 
            variant="outline" 
            onClick={onRetry}
            className="w-full"
          >
            Try Again
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-4">
            You can also try downloading the PDF directly if the preview fails
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
