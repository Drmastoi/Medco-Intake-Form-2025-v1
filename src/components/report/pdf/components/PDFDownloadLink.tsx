
import React from 'react';
import { PDFDownloadLink as ReactPDFDownloadLink } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import PDFDocumentContent from './PDFDocumentContent';
import { ReportData } from '@/types/reportTypes';
import { useToast } from '@/components/ui/use-toast';

interface PDFDownloadLinkProps {
  reportData: ReportData;
  isLoading: boolean;
}

const PDFDownloadLink = ({ reportData, isLoading }: PDFDownloadLinkProps) => {
  const { toast } = useToast();

  const handleDownloadStart = () => {
    toast({
      title: "Generating PDF",
      description: "Your PDF is being generated and will download shortly...",
    });
  };

  return (
    <ReactPDFDownloadLink 
      document={<PDFDocumentContent reportData={reportData} />} 
      fileName={`medical-report-${reportData.prefilled?.medcoReference || 'report'}.pdf`}
      className="hidden md:block"
      onClick={handleDownloadStart}
    >
      {({ blob, url, loading, error }) => (
        <Button 
          variant="outline" 
          disabled={loading || error !== undefined || isLoading}
          className="flex items-center"
        >
          <Download className="h-4 w-4 mr-2" />
          {loading ? 'Generating PDF...' : error ? 'Try Download Again' : 'Download PDF'}
        </Button>
      )}
    </ReactPDFDownloadLink>
  );
};

export default PDFDownloadLink;
