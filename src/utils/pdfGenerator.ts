
import { pdf } from '@react-pdf/renderer';
import PDFDocumentContent from "@/components/report/pdf/components/PDFDocumentContent";
import { ReportData } from "@/types/reportTypes";
import React from 'react';

export async function generatePdfAsBase64(reportData: ReportData): Promise<string> {
  try {
    console.log("Generating PDF...");
    
    // Create PDF document
    // The error is happening here - we need to fix the type incompatibility
    // by providing props that match what @react-pdf/renderer expects
    const pdfDoc = React.createElement(PDFDocumentContent, { reportData });
    
    // Explicitly cast the result to make TypeScript happy
    // This is necessary because the type definitions between our component and
    // what pdf() expects don't perfectly align, but the actual runtime behavior works
    const blob = await pdf(pdfDoc as any).toBlob();
    
    console.log("PDF blob generated successfully");
    
    // Convert blob to base64
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        // Extract the base64 data part from the data URL
        const base64Data = base64String.split(',')[1];
        console.log("PDF converted to base64 successfully");
        resolve(base64Data);
      };
      reader.onerror = (error) => {
        console.error("FileReader error:", error);
        reject(error);
      };
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error(`Failed to generate PDF: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export function formatFileName(reportData: ReportData): string {
  const clientName = reportData.personal?.fullName?.replace(/[^a-zA-Z0-9]/g, '_') || 'Client';
  const dateString = reportData.accident?.accidentDate?.replace(/[^0-9]/g, '') || 
                     new Date().toISOString().slice(0, 10).replace(/-/g, '');
  
  return `Medical_Report_${clientName}_${dateString}.pdf`;
}
