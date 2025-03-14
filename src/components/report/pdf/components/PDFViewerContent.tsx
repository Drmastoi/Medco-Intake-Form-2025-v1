
import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import PDFDocumentContent from './PDFDocumentContent';
import { ReportData } from '@/types/reportTypes';

interface PDFViewerContentProps {
  reportData: ReportData;
}

const PDFViewerContent = ({ reportData }: PDFViewerContentProps) => {
  return (
    <div className="h-full w-full">
      <PDFViewer className="w-full h-full" showToolbar={false}>
        <PDFDocumentContent reportData={reportData} />
      </PDFViewer>
    </div>
  );
};

export default PDFViewerContent;
