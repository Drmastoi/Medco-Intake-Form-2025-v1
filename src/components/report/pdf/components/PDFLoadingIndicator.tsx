
import React from 'react';
import LoadingIndicator from './LoadingIndicator';

interface PDFLoadingIndicatorProps {
  loadingProgress: number;
}

const PDFLoadingIndicator = ({ loadingProgress }: PDFLoadingIndicatorProps) => {
  return <LoadingIndicator loadingProgress={loadingProgress} />;
};

export default PDFLoadingIndicator;
