
import React from 'react';
import { Button } from '@/components/ui/button';
import PDFDownloadLink from './PDFDownloadLink';
import { ReportData } from '@/types/reportTypes';

interface PDFDialogActionsProps {
  isPreview: boolean;
  viewerReady: boolean;
  loading: boolean;
  renderError: string | null;
  reportData: ReportData;
  onClose: () => void;
}

const PDFDialogActions = ({
  isPreview,
  viewerReady,
  loading,
  renderError,
  reportData,
  onClose
}: PDFDialogActionsProps) => {
  const closeButtonText = isPreview ? "Close Preview" : "Close";
  
  return (
    <div className="flex justify-end w-full space-x-2">
      {!isPreview && viewerReady && !loading && !renderError && (
        <PDFDownloadLink reportData={reportData} isLoading={loading} />
      )}
      <Button variant="outline" onClick={onClose}>{closeButtonText}</Button>
    </div>
  );
};

export default PDFDialogActions;
