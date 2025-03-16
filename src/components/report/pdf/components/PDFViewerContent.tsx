
import React from 'react';
import { PDFViewer, StyleSheet } from '@react-pdf/renderer';
import PDFDocumentContent from './PDFDocumentContent';
import { ReportData } from '@/types/reportTypes';

interface PDFViewerContentProps {
  reportData: ReportData;
}

const PDFViewerContent = ({ reportData }: PDFViewerContentProps) => {
  const containerStyle = StyleSheet.create({
    viewer: {
      width: '100%',
      height: '100%',
      border: 'none'
    }
  });

  // Determine if this is a claimant or expert report
  const reportType = reportData.meta?.reportType || "expert";

  return (
    <PDFViewer style={containerStyle.viewer}>
      <PDFDocumentContent 
        reportData={reportData}
        reportType={reportType as "claimant" | "expert"}
      />
    </PDFViewer>
  );
};

export default PDFViewerContent;
