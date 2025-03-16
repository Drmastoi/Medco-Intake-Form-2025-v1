
import React from 'react';
import { Document } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { format } from 'date-fns';
import BasicInfoPage from '../pages/BasicInfoPage';
import InjuriesPage from '../pages/InjuriesPage';
import TreatmentLifestylePage from '../pages/TreatmentLifestylePage';
import DeclarationPage from '../pages/DeclarationPage';
import ExpertInfoPage from '../pages/ExpertInfoPage';

interface PDFDocumentContentProps {
  reportData: ReportData;
}

const PDFDocumentContent = ({ reportData }: PDFDocumentContentProps) => {
  // Ensure we have a valid date format
  const today = (() => {
    try {
      return format(new Date(), 'dd-MM-yyyy');
    } catch (error) {
      console.error("Error formatting date:", error);
      return new Date().toLocaleDateString();
    }
  })();
  
  // Safely get claimant name with fallback
  const claimantName = reportData?.personal?.fullName || 'Not specified';
  
  console.log("PDFDocumentContent rendering with data", { 
    claimantName,
    hasOtherData: !!reportData.other,
    hasLifestyle: !!(reportData.other?.lifestyle)
  });

  // Create a safe copy of the report data with all required properties
  const safeReportData = React.useMemo(() => {
    const data = { ...reportData };
    
    // Ensure all required objects exist to prevent runtime errors
    if (!data.prefilled) data.prefilled = {};
    if (!data.personal) data.personal = {};
    if (!data.accident) data.accident = {};
    if (!data.injuries) data.injuries = {
      neckPain: { hasInjury: false },
      shoulderPain: { hasInjury: false },
      backPain: { hasInjury: false },
      headache: { hasInjury: false }
    };
    
    // Ensure 'other' object and its children exist
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
  }, [reportData]);

  // Error boundary to prevent crashes
  try {
    return (
      <Document>
        <BasicInfoPage 
          reportData={safeReportData} 
          claimantName={claimantName} 
          today={today} 
        />

        <InjuriesPage 
          reportData={safeReportData} 
          claimantName={claimantName} 
          today={today} 
        />
        
        <TreatmentLifestylePage 
          reportData={safeReportData} 
          claimantName={claimantName} 
          today={today} 
        />
        
        <DeclarationPage 
          claimantName={claimantName} 
          today={today} 
        />
        
        <ExpertInfoPage 
          claimantName={claimantName} 
          today={today} 
        />
      </Document>
    );
  } catch (error) {
    console.error("Error generating PDF document:", error);
    
    // Return a minimal document if there's an error
    return (
      <Document>
        <BasicInfoPage 
          reportData={safeReportData} 
          claimantName={claimantName} 
          today={today} 
        />
      </Document>
    );
  }
};

export default PDFDocumentContent;
