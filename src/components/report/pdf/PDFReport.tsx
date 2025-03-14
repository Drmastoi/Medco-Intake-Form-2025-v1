
import React, { useState, useEffect } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import PDFDocumentContent from './components/PDFDocumentContent';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorDisplay from './components/ErrorDisplay';
import PDFDownloadLink from './components/PDFDownloadLink';
import { useToast } from '@/components/ui/use-toast';

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
  const [retryCount, setRetryCount] = useState(0);
  const { toast } = useToast();

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
      }, 800); // Increased from 500ms for more stable initialization
      
      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    } else {
      setViewerReady(false);
      setLoadingProgress(0);
      setRetryCount(0);
    }
  }, [isOpen]);

  // Add an event listener to detect when the PDF is loaded
  useEffect(() => {
    if (viewerReady) {
      const loadingTimeout = setTimeout(() => {
        console.log("PDF loading completed or timed out");
        setLoading(false);
        setLoadingProgress(100);
      }, 8000); // Increased timeout from 6s to 8s

      return () => clearTimeout(loadingTimeout);
    }
  }, [viewerReady]);

  // Add an error handler for the PDF viewer
  useEffect(() => {
    if (viewerReady && loading) {
      // If we've been loading for too long, show an error
      const timer = setTimeout(() => {
        if (loading) {
          console.log("PDF rendering timed out, showing error");
          setRenderError("Failed to load PDF preview. Please try again.");
          setLoading(false);
          
          // Show a toast for better feedback
          toast({
            title: "PDF Preview Failed",
            description: "The report couldn't be loaded. Please try again.",
            variant: "destructive"
          });
        }
      }, 10000); // Increased from 8s to 10s
      
      return () => clearTimeout(timer);
    }
  }, [viewerReady, loading, toast]);

  const tryAgain = () => {
    console.log("Retrying PDF generation, attempt:", retryCount + 1);
    setLoading(true);
    setRenderError(null);
    setLoadingProgress(0);
    setViewerReady(false);
    setRetryCount(prev => prev + 1);
    
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
    
    // Add a small delay before trying again to allow cleanup
    setTimeout(() => {
      setViewerReady(true);
      
      // Show a toast for user feedback
      toast({
        title: "Retrying",
        description: "Attempting to generate PDF preview again...",
      });
    }, 1500); // Increased delay for better stability
    
    clearInterval(progressInterval);
  };

  const handlePDFError = (error: Error) => {
    console.error("PDF rendering error:", error);
    setRenderError("Failed to load PDF preview. Please try again.");
    setLoading(false);
    
    toast({
      title: "PDF Error",
      description: "There was a problem rendering the PDF. Please try again.",
      variant: "destructive"
    });
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
              <div className="h-full w-full">
                <PDFViewer 
                  className="w-full h-full" 
                  showToolbar={false}
                  onError={handlePDFError}
                >
                  <PDFDocumentContent reportData={reportData} />
                </PDFViewer>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PDFReport;
