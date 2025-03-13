
import React, { useState } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import ReportDocument from './ReportDocument';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { FileDown, Eye, X, Loader2 } from 'lucide-react';
import { ReportData } from '@/utils/pdfReportUtils';

interface PDFReportProps {
  reportData: ReportData;
  isOpen: boolean;
  onClose: () => void;
}

const PDFReport = ({ reportData, isOpen, onClose }: PDFReportProps) => {
  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (!isOpen) return null;

  // Handle any errors that might occur during PDF generation
  const handleError = (error: any) => {
    console.error("PDF generation error:", error);
    setHasError(true);
    toast({
      title: "Error Generating PDF",
      description: "There was a problem generating the PDF. Please try again.",
      variant: "destructive",
    });
  };

  const handlePreviewClick = () => {
    setIsLoading(true);
    setHasError(false);
    
    try {
      console.log("Rendering PDF with data:", reportData);
      setShowPreview(true);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`bg-white rounded-lg p-6 ${showPreview ? 'w-[90vw] h-[90vh]' : 'max-w-md w-full'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Generate PDF Report</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {hasError ? (
          <div className="p-4 mb-4 bg-red-50 text-red-700 rounded">
            <p className="font-semibold">Error generating PDF</p>
            <p className="text-sm">There was a problem creating your PDF report. Please try again or contact support.</p>
            <Button 
              variant="outline" 
              onClick={() => setHasError(false)}
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        ) : showPreview ? (
          <>
            <div className="h-[calc(100%-8rem)] mb-4">
              <PDFViewer width="100%" height="100%" className="border border-gray-200 rounded">
                <ReportDocument data={reportData} />
              </PDFViewer>
            </div>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowPreview(false)}
            >
              Close Preview
            </Button>
          </>
        ) : (
          <>
            <p className="mb-6 text-gray-700">Your report is ready. You can preview or download it.</p>
            
            <div className="space-y-4">
              <Button
                className="w-full bg-black hover:bg-gray-800 text-white"
                onClick={handlePreviewClick}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Preparing Preview...
                  </>
                ) : (
                  <>
                    <Eye className="mr-2 h-4 w-4" />
                    Preview Report
                  </>
                )}
              </Button>

              <PDFDownloadLink
                document={<ReportDocument data={reportData} />}
                fileName={`medical-report-${reportData.personal.fullName || 'unnamed'}.pdf`}
                className="w-full"
              >
                {({ blob, url, loading, error }) => (
                  <Button
                    className="w-full"
                    disabled={loading || error}
                    onClick={() => {
                      if (!loading && !error) {
                        toast({
                          title: "Report Downloaded",
                          description: "Your PDF report has been generated successfully.",
                        });
                      } else if (error) {
                        handleError(error);
                      }
                    }}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Preparing Document...
                      </>
                    ) : (
                      <>
                        <FileDown className="mr-2 h-4 w-4" />
                        Download Report
                      </>
                    )}
                  </Button>
                )}
              </PDFDownloadLink>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PDFReport;
