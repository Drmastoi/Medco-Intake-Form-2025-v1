
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
