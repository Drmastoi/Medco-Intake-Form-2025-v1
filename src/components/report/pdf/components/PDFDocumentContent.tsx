
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
  const today = format(new Date(), 'dd-MM-yyyy');
  const claimantName = reportData.personal?.fullName || 'Not specified';
  
  console.log("PDFDocumentContent rendering with lifestyle data:", 
    JSON.stringify(reportData.other?.lifestyle, null, 2));

  // Ensure lifestyle data exists
  if (!reportData.other) {
    console.error("Missing 'other' object in reportData");
    reportData.other = {
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
  } else if (!reportData.other.lifestyle) {
    console.error("Missing 'lifestyle' object in reportData.other");
    reportData.other.lifestyle = {
      impactOnWork: false,
      impactOnSleep: false,
      impactOnDomestic: false,
      impactOnSports: false,
      impactOnSocial: false
    };
  }

  // Ensure travelAnxiety has all required properties
  if (!reportData.travelAnxiety) {
    reportData.travelAnxiety = {
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

  return (
    <Document>
      {/* First Page - Basic Information */}
      <BasicInfoPage 
        reportData={reportData} 
        claimantName={claimantName} 
        today={today} 
      />

      {/* Second Page - Injuries */}
      <InjuriesPage 
        reportData={reportData} 
        claimantName={claimantName} 
        today={today} 
      />
      
      {/* Third Page - Treatment, Lifestyle Impact, Medical History */}
      <TreatmentLifestylePage 
        reportData={reportData} 
        claimantName={claimantName} 
        today={today} 
      />
      
      {/* Fourth Page - Declaration and Agreement */}
      <DeclarationPage 
        claimantName={claimantName} 
        today={today} 
      />
      
      {/* Fifth Page - Expert CV */}
      <ExpertInfoPage 
        claimantName={claimantName} 
        today={today} 
      />
    </Document>
  );
};

export default PDFDocumentContent;
