
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
    const blob = await Promise.race([
      // @ts-ignore - Ignore type issue with react-pdf renderer
      pdf(pdfDoc).toBlob(),
      timeoutPromise
    ]) as Blob;
    
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
  
  // Ensure required objects exist with all required properties
  if (!data.prefilled) {
    data.prefilled = {
      solicitorName: "Not specified",
      solicitorReference: "Not specified",
      instructingPartyName: "Not specified",
      instructingPartyReference: "Not specified",
      examinationLocation: "Not specified",
      medcoReference: "Not specified",
      dateOfExamination: new Date().toISOString().split('T')[0],
      dateOfReport: new Date().toISOString().split('T')[0],
      timeSpentWithClaimant: "15",
      accompaniedBy: "Unaccompanied",
      expertName: "Dr. Sam Smith",
      expertSpecialty: "General Practice",
      expertTitle: "Consultant",
      gmcNumber: "1234567"
    };
  }
  
  if (!data.personal) {
    data.personal = {
      fullName: "Not specified",
      dateOfBirth: "Not specified",
      gender: "Not specified",
      address: "Not specified",
      occupation: "Not specified",
      workType: "Not specified",
      idType: "Not specified"
    };
  }
  
  if (!data.accident) {
    data.accident = {
      accidentDate: "Not specified",
      accidentTime: "Not specified",
      vehiclePosition: "Not specified",
      vehicleStatus: "Not specified",
      vehicleLocation: "Not specified",
      impactLocation: "Not specified",
      vehicleDamage: "Not specified",
      claimantPosition: "Not specified",
      claimantVehicle: "Not specified",
      otherVehicle: "Not specified",
      accidentSummary: "Not specified"
    };
  }
  
  if (!data.injuries) {
    data.injuries = {
      neckPain: {
        hasInjury: false,
        painStart: "Not specified",
        initialSeverity: "Not specified",
        currentSeverity: "Not specified",
        additionalInfo: "Not specified",
        hadPrior: false
      },
      shoulderPain: {
        hasInjury: false,
        side: "Not specified",
        painStart: "Not specified",
        initialSeverity: "Not specified",
        currentSeverity: "Not specified"
      },
      backPain: {
        hasInjury: false,
        location: "Not specified",
        painStart: "Not specified",
        initialSeverity: "Not specified",
        currentSeverity: "Not specified"
      },
      headache: {
        hasInjury: false,
        start: "Not specified",
        initialSeverity: "Not specified",
        currentSeverity: "Not specified",
        pastHistory: "Not specified"
      }
    };
  } else {
    // Ensure each injury has all required properties
    if (!data.injuries.neckPain || typeof data.injuries.neckPain !== 'object') {
      data.injuries.neckPain = {
        hasInjury: false,
        painStart: "Not specified",
        initialSeverity: "Not specified",
        currentSeverity: "Not specified",
        additionalInfo: "Not specified",
        hadPrior: false
      };
    } else if (data.injuries.neckPain.hasInjury) {
      // Ensure all required properties exist for active injuries
      data.injuries.neckPain = {
        ...data.injuries.neckPain,
        painStart: data.injuries.neckPain.painStart || "Not specified",
        initialSeverity: data.injuries.neckPain.initialSeverity || "Not specified",
        currentSeverity: data.injuries.neckPain.currentSeverity || "Not specified",
        additionalInfo: data.injuries.neckPain.additionalInfo || "Not specified",
        hadPrior: !!data.injuries.neckPain.hadPrior
      };
    }
    
    if (!data.injuries.shoulderPain || typeof data.injuries.shoulderPain !== 'object') {
      data.injuries.shoulderPain = {
        hasInjury: false,
        side: "Not specified",
        painStart: "Not specified",
        initialSeverity: "Not specified",
        currentSeverity: "Not specified"
      };
    } else if (data.injuries.shoulderPain.hasInjury) {
      data.injuries.shoulderPain = {
        ...data.injuries.shoulderPain,
        side: data.injuries.shoulderPain.side || "Not specified",
        painStart: data.injuries.shoulderPain.painStart || "Not specified",
        initialSeverity: data.injuries.shoulderPain.initialSeverity || "Not specified",
        currentSeverity: data.injuries.shoulderPain.currentSeverity || "Not specified"
      };
    }
    
    if (!data.injuries.backPain || typeof data.injuries.backPain !== 'object') {
      data.injuries.backPain = {
        hasInjury: false,
        location: "Not specified",
        painStart: "Not specified",
        initialSeverity: "Not specified",
        currentSeverity: "Not specified"
      };
    } else if (data.injuries.backPain.hasInjury) {
      data.injuries.backPain = {
        ...data.injuries.backPain,
        location: data.injuries.backPain.location || "Not specified",
        painStart: data.injuries.backPain.painStart || "Not specified",
        initialSeverity: data.injuries.backPain.initialSeverity || "Not specified",
        currentSeverity: data.injuries.backPain.currentSeverity || "Not specified"
      };
    }
    
    if (!data.injuries.headache || typeof data.injuries.headache !== 'object') {
      data.injuries.headache = {
        hasInjury: false,
        start: "Not specified",
        initialSeverity: "Not specified",
        currentSeverity: "Not specified",
        pastHistory: "Not specified"
      };
    } else if (data.injuries.headache.hasInjury) {
      data.injuries.headache = {
        ...data.injuries.headache,
        start: data.injuries.headache.start || "Not specified",
        initialSeverity: data.injuries.headache.initialSeverity || "Not specified",
        currentSeverity: data.injuries.headache.currentSeverity || "Not specified",
        pastHistory: data.injuries.headache.pastHistory || "Not specified"
      };
    }
  }
  
  // Ensure travelAnxiety exists
  if (!data.travelAnxiety) {
    data.travelAnxiety = {
      hasAnxiety: false,
      initialSeverity: "Not specified",
      currentSeverity: "Not specified",
      symptoms: [],
      duration: "Not specified",
      resolveDays: "Not specified",
      pastHistory: "Not specified",
      hasHistory: "Not specified",
      currentlyDriving: "Not specified"
    };
  }
  
  // Ensure other data exists
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
  } else {
    // Ensure all properties in 'other' exist
    if (!data.other.bruising) data.other.bruising = { hasBruising: false };
    if (!data.other.otherInjuries) data.other.otherInjuries = { hasOtherInjury: false };
    if (!data.other.treatment) data.other.treatment = { hasTreatment: false };
    if (!data.other.lifestyle) {
      data.other.lifestyle = {
        impactOnWork: false,
        impactOnSleep: false,
        impactOnDomestic: false,
        impactOnSports: false,
        impactOnSocial: false
      };
    }
    if (!data.other.medicalHistory) {
      data.other.medicalHistory = { exceptionalInjuries: false, exceptionalInjuriesDetails: "" };
    }
  }
  
  return data;
}
