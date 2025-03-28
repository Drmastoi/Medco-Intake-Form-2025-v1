
import React from 'react';
import { Button } from '@/components/ui/button';
import PDFDownloadLink from './PDFDownloadLink';
import { ReportData } from '@/types/reportTypes';
import { SendToDoctorDialog } from './SendToDoctorDialog';

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
    <div className="flex flex-col w-full gap-2">
      <div className="flex justify-end w-full space-x-2">
        {viewerReady && !loading && !renderError && (
          <>
            <PDFDownloadLink reportData={reportData} isLoading={loading} />
            <SendToDoctorDialog reportData={reportData} />
          </>
        )}
        <Button variant="outline" onClick={onClose}>{closeButtonText}</Button>
      </div>
    </div>
  );
};

export default PDFDialogActions;
