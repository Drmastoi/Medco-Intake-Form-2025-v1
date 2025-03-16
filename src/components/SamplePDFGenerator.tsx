
import React, { useState } from 'react';
import { generateSampleReportData } from '@/utils/sampleReportData';
import PDFReport from '@/components/report/pdf/PDFReport';
import { Button } from '@/components/ui/button';
import { ReportData } from '@/types/reportTypes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SamplePDFGenerator: React.FC = () => {
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
    <Card className="w-full max-w-lg mx-auto mt-8">
      <CardHeader>
        <CardTitle>Sample PDF Report Generator</CardTitle>
        <CardDescription>
          Generate a sample medical report PDF using test data
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <Button 
          onClick={handleGenerateSamplePDF}
          size="lg"
          className="w-full"
        >
          Generate Sample PDF
        </Button>
        
        {reportData && (
          <PDFReport
            reportData={reportData}
            isOpen={isReportOpen}
            onClose={handleCloseReport}
            isPreview={true}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default SamplePDFGenerator;
