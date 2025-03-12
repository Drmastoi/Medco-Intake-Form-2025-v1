
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`bg-white rounded-lg p-6 ${showPreview ? 'w-[90vw] h-[90vh]' : 'max-w-md w-full'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Generate PDF Report</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {showPreview ? (
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
                onClick={() => setShowPreview(true)}
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview Report
              </Button>

              <PDFDownloadLink
                document={<ReportDocument data={reportData} />}
                fileName={`medical-report-${reportData.personal.fullName || 'unnamed'}.pdf`}
                className="w-full"
              >
                {({ blob, url, loading, error }) => (
                  <Button
                    className="w-full"
                    disabled={loading}
                    onClick={() => {
                      if (!loading && !error) {
                        toast({
                          title: "Report Downloaded",
                          description: "Your PDF report has been generated successfully.",
                        });
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
