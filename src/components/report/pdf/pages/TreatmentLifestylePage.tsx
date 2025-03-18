
import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { layoutStyles } from '../styles/layoutStyles';
import { textStyles } from '../styles/textStyles';
import PDFFooter from '../components/PDFFooter';
import { TreatmentSection } from '../sections/TreatmentSection';
import { LifestyleImpactSection } from '../sections/LifestyleImpactSection';
import MedicalHistorySection from '../sections/MedicalHistorySection';

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
    <Page size="A4" style={layoutStyles.page}>
      <View style={{padding: 20, margin: 0}}>
        <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 15, textAlign: 'center'}}>
          TREATMENT, LIFESTYLE IMPACT, AND MEDICAL HISTORY
        </Text>
        
        <TreatmentSection reportData={reportData} />
        
        <LifestyleImpactSection reportData={reportData} />
        
        <MedicalHistorySection reportData={reportData} />
      </View>
      
      <PDFFooter 
        claimantName={claimantName} 
        pageLabel="Treatment & Lifestyle" 
        currentDate={today} 
      />
    </Page>
  );
};

export default TreatmentLifestylePage;
