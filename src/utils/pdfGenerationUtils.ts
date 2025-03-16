
import { pdf } from '@react-pdf/renderer';
import PDFDocumentContent from "@/components/report/pdf/components/PDFDocumentContent";
import { ReportData } from "@/types/reportTypes";
import React from 'react';

// Generate PDF and convert to base64
export const generatePdfAsBase64 = async (reportData: ReportData) => {
  try {
    console.log("Starting PDF generation");
    
    // Create a safe copy of the report data to prevent errors
    const safeReportData = ensureSafeReportData(reportData);
    
    // Create PDF document
    const pdfDoc = React.createElement(PDFDocumentContent, { reportData: safeReportData });
    
    // Add a timeout to detect if PDF generation is taking too long
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("PDF generation timed out")), 30000);
    });
    
    // Generate the PDF blob with a timeout
    // @ts-ignore - Ignore type issue with react-pdf renderer
    const blob = await Promise.race([
      pdf(pdfDoc).toBlob(),
      timeoutPromise
    ]);
    
    console.log("PDF blob generated successfully");
    
    // Convert blob to base64
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const base64String = reader.result as string;
          // Extract the base64 data part from the data URL
          const base64Data = base64String.split(',')[1];
          console.log("PDF converted to base64 successfully");
          resolve(base64Data);
        } catch (error) {
          console.error("Error processing FileReader result:", error);
          reject(error);
        }
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
};

// Ensure all required properties exist in the report data
function ensureSafeReportData(reportData: ReportData): ReportData {
  const data = { ...reportData };
  
  // Ensure required objects exist
  if (!data.prefilled) data.prefilled = {};
  if (!data.personal) data.personal = {};
  if (!data.accident) data.accident = {};
  if (!data.injuries) {
    data.injuries = {
      neckPain: { hasInjury: false },
      shoulderPain: { hasInjury: false },
      backPain: { hasInjury: false },
      headache: { hasInjury: false }
    };
  }
  
  // Ensure 'other' object exists
  if (!data.other) {
    data.other = {
      bruising: { hasBruising: false },
      otherInjuries: { hasOtherInjury: false },
      treatment: { hasTreatment: false },
      lifestyle: {
        impactOnWork: false,
        impactOnSleep: false,
        impactOnDomestic: false,
        impactOnSports: false,
        impactOnSocial: false
      },
      medicalHistory: { exceptionalInjuries: false, exceptionalInjuriesDetails: "" }
    };
  }
  
  // Ensure travelAnxiety exists
  if (!data.travelAnxiety) {
    data.travelAnxiety = {
      hasAnxiety: false,
      initialSeverity: '',
      currentSeverity: '',
      symptoms: [],
      duration: '',
      resolveDays: '',
      pastHistory: '',
      hasHistory: '',
      currentlyDriving: ''
    };
  }
  
  return data;
}
