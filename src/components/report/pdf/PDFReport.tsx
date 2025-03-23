
import React from 'react';
import { ReportData } from '@/types/reportTypes';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ErrorDisplay from './components/ErrorDisplay';
import PDFDialogHeader from './components/PDFDialogHeader';
import PDFDialogActions from './components/PDFDialogActions';
import PDFLoadingIndicator from './components/PDFLoadingIndicator';
import PDFViewerContent from './components/PDFViewerContent';
import { usePDFLoading } from '@/hooks/usePDFLoading';

interface PDFReportProps {
  reportData: ReportData;
  isOpen: boolean;
  onClose: () => void;
  isPreview?: boolean;
}

// PDF Report Dialog Component
const PDFReport = ({ 
  reportData, 
  isOpen, 
  onClose, 
  isPreview = false 
}: PDFReportProps) => {
  const {
    loading,
    viewerReady,
    renderError,
    loadingProgress,
    tryAgain,
    handlePDFError
  } = usePDFLoading(isOpen);

  // Handle the close action
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-hidden">
        <PDFDialogHeader 
          isPreview={isPreview} 
          loading={loading} 
          renderError={renderError} 
        />
        
        <div className="flex flex-col items-center space-y-4 overflow-hidden">
          <PDFDialogActions
            isPreview={isPreview}
            viewerReady={viewerReady}
            loading={loading}
            renderError={renderError}
            reportData={reportData}
            onClose={handleClose}
          />
          
          <div className="w-full h-[70vh] border rounded">
            {loading && <PDFLoadingIndicator loadingProgress={loadingProgress} />}
            
            {renderError && <ErrorDisplay errorMessage={renderError} onRetry={tryAgain} />}
            
            {viewerReady && !renderError && <PDFViewerContent reportData={reportData} />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PDFReport;
