
import { pdf } from '@react-pdf/renderer';
import PDFDocumentContent from "@/components/report/pdf/components/PDFDocumentContent";
import { ReportData } from "@/types/reportTypes";
import React from 'react';

// Generate PDF and convert to base64
export const generatePdfAsBase64 = async (reportData: ReportData) => {
  try {
    // Create PDF document
    const pdfDoc = React.createElement(PDFDocumentContent, { reportData });
    const blob = await pdf(pdfDoc).toBlob();
    
    // Convert blob to base64
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        // Extract the base64 data part from the data URL
        const base64Data = base64String.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};
