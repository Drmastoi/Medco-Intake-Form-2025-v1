
import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { TreatmentSection } from '../sections/TreatmentSection';
import LifestyleImpactSection from '../sections/LifestyleImpactSection';
import { MedicalRecordsReviewSection } from '../sections/MedicalRecordsReviewSection';
import { MedicalHistorySection } from '../sections/MedicalHistorySection';
import PDFFooter from '../components/PDFFooter';
import { pdfStyles } from '../styles/pdfStyles';
import { colorScheme } from '../styles/colorScheme';

interface TreatmentLifestylePageProps {
  reportData: ReportData;
  claimantName: string;
  today: string;
}

const TreatmentLifestylePage: React.FC<TreatmentLifestylePageProps> = ({ 
  reportData, 
  claimantName, 
  today 
}) => {
  // Get treatment summary - ensure defaults for null values
  const treatment = reportData.other?.treatment || {
    hasTreatment: false,
    ongoing: false
  };
  const hasTreatment = treatment.hasTreatment || false;
  const treatmentOngoing = treatment.ongoing || false;
  
  // Get lifestyle impact summary with defaults for null values
  const lifestyle = reportData.other?.lifestyle || {
    impactOnWork: false,
    impactOnSleep: false,
    impactOnDomestic: false,
    impactOnSports: false,
    impactOnSocial: false
  };
  
  const hasLifestyleImpact = Boolean(lifestyle.impactOnWork || 
                              lifestyle.impactOnSleep || 
                              lifestyle.impactOnDomestic || 
                              lifestyle.impactOnSports || 
                              lifestyle.impactOnSocial);
  
  return (
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.header}>
        <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>
          Treatment, Lifestyle Impact and Medical History
        </Text>
      </View>
      
      {/* Summary box highlighting key treatment and lifestyle information */}
      <View style={{ 
        backgroundColor: colorScheme.altSectionBg, 
        margin: 10, 
        padding: 10, 
        borderRadius: 3,
        borderLeft: `4px solid ${colorScheme.accent}`
      }}>
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5, color: colorScheme.primary }}>
          Treatment & Impact Summary
        </Text>
        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
          <Text style={{ width: '50%', fontSize: 10, fontWeight: 'bold' }}>Treatment received:</Text>
          <Text style={{ width: '50%', fontSize: 10 }}>{hasTreatment ? 'Yes' : 'No'}</Text>
        </View>
        {hasTreatment && (
          <View style={{ flexDirection: 'row', marginBottom: 5 }}>
            <Text style={{ width: '50%', fontSize: 10, fontWeight: 'bold' }}>Treatment status:</Text>
            <Text style={{ width: '50%', fontSize: 10 }}>{treatmentOngoing ? 'Ongoing' : 'Completed'}</Text>
          </View>
        )}
        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
          <Text style={{ width: '50%', fontSize: 10, fontWeight: 'bold' }}>Daily life impact:</Text>
          <Text style={{ width: '50%', fontSize: 10 }}>{hasLifestyleImpact ? 'Yes' : 'No impact reported'}</Text>
        </View>
        {hasLifestyleImpact && (
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ width: '50%', fontSize: 10, fontWeight: 'bold' }}>Areas affected:</Text>
            <Text style={{ width: '50%', fontSize: 10 }}>
              {[
                lifestyle.impactOnWork ? "Work" : null,
                lifestyle.impactOnSleep ? "Sleep" : null,
                lifestyle.impactOnDomestic ? "Domestic activities" : null,
                lifestyle.impactOnSports ? "Sports/leisure" : null,
                lifestyle.impactOnSocial ? "Social life" : null
              ].filter(Boolean).join(", ")}
            </Text>
          </View>
        )}
      </View>
      
      {/* Two-column layout using the new styles */}
      <View style={pdfStyles.twoColumns}>
        <View style={[pdfStyles.section, pdfStyles.column]}>
          <TreatmentSection formData={reportData} styles={pdfStyles} />
        </View>
        
        <View style={[pdfStyles.section, pdfStyles.column]}>
          <LifestyleImpactSection formData={reportData} styles={pdfStyles} />
        </View>
      </View>
      
      {/* Medical Records Review Section */}
      <View style={pdfStyles.section}>
        <MedicalRecordsReviewSection styles={pdfStyles} />
      </View>
      
      <View style={pdfStyles.section}>
        <MedicalHistorySection formData={reportData} styles={pdfStyles} />
      </View>
      
      <PDFFooter pageNumber={3} claimantName={claimantName} today={today} />
    </Page>
  );
};

export default TreatmentLifestylePage;
