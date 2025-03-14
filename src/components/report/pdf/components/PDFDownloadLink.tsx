
import React from 'react';
import { PDFDownloadLink as ReactPDFDownloadLink } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import PDFDocumentContent from './PDFDocumentContent';
import { ReportData } from '@/types/reportTypes';

interface PDFDownloadLinkProps {
  reportData: ReportData;
  isLoading: boolean;
}

const PDFDownloadLink = ({ reportData, isLoading }: PDFDownloadLinkProps) => {
  return (
    <ReactPDFDownloadLink 
      document={<PDFDocumentContent reportData={reportData} />} 
      fileName="medical-report.pdf"
      className="hidden md:block"
    >
      {({ blob, url, loading, error }) => (
        <Button 
          variant="outline" 
          disabled={loading || error !== undefined || isLoading}
        >
          {loading ? 'Generating PDF...' : 'Download PDF'}
        </Button>
      )}
    </ReactPDFDownloadLink>
  );
};

export default PDFDownloadLink;
