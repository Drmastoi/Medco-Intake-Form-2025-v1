
import React from 'react';
import { Button } from '@/components/ui/button';
import { ReportData } from '@/types/reportTypes';
import { SendToDoctorDialog } from './SendToDoctorDialog';
import { Download } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocumentContent from './PDFDocumentContent';
import { formatFileName } from '@/utils/pdfGenerator';

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
  const fileName = formatFileName(reportData);
  
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex justify-end w-full space-x-2">
        {viewerReady && !loading && !renderError && (
          <>
            <PDFDownloadLink 
              document={<PDFDocumentContent reportData={reportData} />} 
              fileName={fileName}
              className="inline-flex"
            >
              {({ loading, error }) => (
                <Button 
                  variant="outline" 
                  disabled={loading || !!error}
                  className="flex items-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {loading ? 'Preparing...' : 'Download PDF'}
                </Button>
              )}
            </PDFDownloadLink>
            
            <SendToDoctorDialog reportData={reportData} />
          </>
        )}
        <Button variant="outline" onClick={onClose}>{closeButtonText}</Button>
      </div>
    </div>
  );
};

export default PDFDialogActions;
