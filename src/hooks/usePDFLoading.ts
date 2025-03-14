
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface UsePDFLoadingResult {
  loading: boolean;
  viewerReady: boolean;
  renderError: string | null;
  loadingProgress: number;
  retryCount: number;
  tryAgain: () => void;
  handlePDFError: () => void;
}

export const usePDFLoading = (isOpen: boolean): UsePDFLoadingResult => {
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

  // Error boundary for PDF viewer
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      // Only handle PDF renderer errors
      if (event.message && (
        event.message.includes("PDF") || 
        event.message.includes("render") ||
        event.message.includes("blob")
      )) {
        handlePDFError();
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

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

  const handlePDFError = () => {
    console.error("PDF rendering error detected");
    setRenderError("Failed to load PDF preview. Please try again.");
    setLoading(false);
    
    toast({
      title: "PDF Error",
      description: "There was a problem rendering the PDF. Please try the download option instead.",
      variant: "destructive"
    });
  };

  return {
    loading,
    viewerReady,
    renderError,
    loadingProgress,
    retryCount,
    tryAgain,
    handlePDFError
  };
};
