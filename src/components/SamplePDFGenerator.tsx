
import React, { useState } from 'react';
import { generateSampleReportData } from '@/utils/sampleReportData';
import PDFReport from '@/components/report/pdf/PDFReport';
import { Button } from '@/components/ui/button';
import { ReportData } from '@/types/reportTypes';
import { FileText } from 'lucide-react';

export function SamplePDFGenerator() {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);

  const handleGenerateSamplePDF = () => {
    const sampleData = generateSampleReportData();
    setReportData(sampleData);
    setIsReportOpen(true);
  };

  const handleCloseReport = () => {
    setIsReportOpen(false);
  };

  return (
    <div className="mt-8 text-center">
      <Button 
        onClick={handleGenerateSamplePDF}
        variant="outline"
      >
        <FileText className="mr-2 h-4 w-4" />
        View Sample Report
      </Button>
      
      {reportData && (
        <PDFReport
          reportData={reportData}
          isOpen={isReportOpen}
          onClose={handleCloseReport}
          isPreview={true}
        />
      )}
    </div>
  );
}
