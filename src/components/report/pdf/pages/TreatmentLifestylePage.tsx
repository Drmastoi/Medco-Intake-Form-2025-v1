
import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { TreatmentSection } from '../sections/TreatmentSection';
import LifestyleImpactSection from '../sections/LifestyleImpactSection';
import { MedicalRecordsReviewSection } from '../sections/MedicalRecordsReviewSection';
import { MedicalHistorySection } from '../sections/MedicalHistorySection';
import { ConclusionSection } from '../sections/ConclusionSection';
import PDFFooter from '../components/PDFFooter';
import { pdfStyles } from '../styles/pdfStyles';

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
  return (
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.header}>
        <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>
          Treatment, Lifestyle Impact and Medical History
        </Text>
      </View>
      
      {/* Section 9 - Treatment */}
      <View style={pdfStyles.section}>
        <TreatmentSection formData={reportData} styles={pdfStyles} />
      </View>
      
      {/* Section 10 - Lifestyle Impact */}
      <View style={pdfStyles.section}>
        <LifestyleImpactSection formData={reportData} />
      </View>
      
      {/* Medical Records Review Section */}
      <View style={pdfStyles.section}>
        <MedicalRecordsReviewSection styles={pdfStyles} />
      </View>
      
      <View style={pdfStyles.section}>
        <MedicalHistorySection formData={reportData} styles={pdfStyles} />
      </View>
      
      <View style={pdfStyles.section}>
        <ConclusionSection formData={reportData} styles={pdfStyles} />
      </View>
      
      <PDFFooter pageNumber={3} claimantName={claimantName} today={today} />
    </Page>
  );
};

export default TreatmentLifestylePage;
