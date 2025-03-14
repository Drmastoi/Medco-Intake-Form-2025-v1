
import React, { useState, useEffect } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import PDFDocumentContent from './components/PDFDocumentContent';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorDisplay from './components/ErrorDisplay';
import PDFDownloadLink from './components/PDFDownloadLink';

interface PDFReportProps {
  reportData: ReportData;
  isOpen: boolean;
  onClose: () => void;
  isPreview?: boolean;
}

// PDF Report Dialog Component
const PDFReport = ({ reportData, isOpen, onClose, isPreview = false }: PDFReportProps) => {
  const [loading, setLoading] = useState(true);
  const [viewerReady, setViewerReady] = useState(false);
  const [renderError, setRenderError] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Reset loading state when dialog opens/closes
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setRenderError(null);
      setLoadingProgress(0);
      
      // Progressive loading indicator
      const progressInterval = setInterval(() => {
        setLoadingProgress(current => {
          if (current >= 90) {
            clearInterval(progressInterval);
            return current;
          }
          return current + 10;
        });
      }, 500);
      
      // Small delay to ensure state update and rendering cycle
      const timer = setTimeout(() => {
        setViewerReady(true);
      }, 500);
      
      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    } else {
      setViewerReady(false);
      setLoadingProgress(0);
    }
  }, [isOpen]);

  // Add an event listener to detect when the PDF is loaded
  useEffect(() => {
    if (viewerReady) {
      // Using a timeout as a fallback since the PDFViewer doesn't have a direct onLoad prop
      const loadingTimeout = setTimeout(() => {
        setLoading(false);
        setLoadingProgress(100);
      }, 6000); // Give 6 seconds for the PDF to load, increased from 3 seconds

      return () => clearTimeout(loadingTimeout);
    }
  }, [viewerReady]);

  // Add an error handler for the PDF viewer
  useEffect(() => {
    const handleError = () => {
      if (viewerReady && loading) {
        // If we've been loading for more than 8 seconds, show an error
        const timer = setTimeout(() => {
          if (loading) {
            setRenderError("Failed to load PDF preview. Please try again.");
            setLoading(false);
          }
        }, 8000); // Increased from 5 seconds
        
        return () => clearTimeout(timer);
      }
    };
    
    handleError();
  }, [viewerReady, loading]);

  const tryAgain = () => {
    setLoading(true);
    setRenderError(null);
    setLoadingProgress(0);
    setViewerReady(false);
    
    // Progressive loading indicator
    const progressInterval = setInterval(() => {
      setLoadingProgress(current => {
        if (current >= 90) {
          clearInterval(progressInterval);
          return current;
        }
        return current + 10;
      });
    }, 500);
    
    setTimeout(() => {
      setViewerReady(true);
      clearInterval(progressInterval);
    }, 1000);
  };

  const dialogTitle = isPreview ? "Preview Medical Report" : "Expert Medical Report";
  const closeButtonText = isPreview ? "Close Preview" : "Close";

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>
            {loading ? "Preparing your report..." : renderError || "Your medical report is ready."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4 overflow-hidden">
          <div className="flex justify-end w-full space-x-2">
            {!isPreview && viewerReady && !loading && !renderError && (
              <PDFDownloadLink reportData={reportData} isLoading={loading} />
            )}
            <Button variant="outline" onClick={onClose}>{closeButtonText}</Button>
          </div>
          
          <div className="w-full h-[70vh] border rounded">
            {loading && <LoadingIndicator loadingProgress={loadingProgress} />}
            
            {renderError && <ErrorDisplay errorMessage={renderError} onRetry={tryAgain} />}
            
            {viewerReady && !renderError && (
              <PDFViewer 
                className="w-full h-full" 
                showToolbar={false}
              >
                <PDFDocumentContent reportData={reportData} />
              </PDFViewer>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PDFReport;
