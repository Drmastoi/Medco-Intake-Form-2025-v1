
import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReportDocument from './ReportDocument';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { FileDown, Loader2 } from 'lucide-react';
import { ReportData } from '@/utils/pdfReportUtils';

interface PDFReportProps {
  reportData: ReportData;
  isOpen: boolean;
  onClose: () => void;
}

const PDFReport = ({ reportData, isOpen, onClose }: PDFReportProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Generate PDF Report</h2>
        <p className="mb-6 text-gray-700">Your report is ready to be downloaded.</p>
        
        <div className="space-y-4">
          <PDFDownloadLink
            document={<ReportDocument data={reportData} />}
            fileName={`medical-report-${reportData.personal.fullName || 'unnamed'}.pdf`}
            className="w-full"
          >
            {({ blob, url, loading, error }) => (
              <Button
                className="w-full bg-black hover:bg-gray-800 text-white"
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
      </div>
    </div>
  );
};

export default PDFReport;
