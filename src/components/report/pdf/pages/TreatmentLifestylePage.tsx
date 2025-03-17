
import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { pageStyles } from '../styles/layoutStyles';
import { styles } from '../styles/pdfStyles';
import PDFFooter from '../components/PDFFooter';
import TreatmentSection from '../sections/TreatmentSection';
import LifestyleImpactSection from '../sections/LifestyleImpactSection';
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
    <Page size="A4" style={pageStyles.page}>
      <View style={pageStyles.content}>
        <Text style={styles.pageTitle}>
          TREATMENT, LIFESTYLE IMPACT, AND MEDICAL HISTORY
        </Text>
        
        <TreatmentSection reportData={reportData} />
        
        <LifestyleImpactSection reportData={reportData} />
        
        <MedicalHistorySection reportData={reportData} />
      </View>
      
      <PDFFooter 
        claimantName={claimantName} 
        pageText="Treatment & Lifestyle" 
        date={today} 
      />
    </Page>
  );
};

export default TreatmentLifestylePage;
