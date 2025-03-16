
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { layoutStyles } from '../styles/layoutStyles';
import { textStyles } from '../styles/textStyles';
import { ReportData } from '@/types/reportTypes';
import PDFFooter from '../components/PDFFooter';
import { TreatmentSection } from '../sections/TreatmentSection';
import { BruisingSection } from '../sections/BruisingSection';
import { OtherInjuriesSection } from '../sections/OtherInjuriesSection';
import { LifestyleImpactSection } from '../sections/LifestyleImpactSection';
import { MedicalHistorySection } from '../sections/MedicalHistorySection';
import { TravelAnxietySection } from '../sections/TravelAnxietySection';

interface TreatmentLifestylePageProps {
  reportData: ReportData;
  claimantName?: string;
  today?: string;
  reportType?: "claimant" | "expert";
}

const TreatmentLifestylePage: React.FC<TreatmentLifestylePageProps> = ({ 
  reportData,
  claimantName = "Not Specified",
  today = new Date().toLocaleDateString('en-GB'),
  reportType = "expert"
}) => {
  return (
    <View style={layoutStyles.page}>
      <View style={layoutStyles.pageContainer}>
        <Text style={textStyles.headerText}>
          Treatment and Impact on Daily Life
        </Text>
        
        <TreatmentSection treatmentData={reportData.other.treatment} reportType={reportType} />
        
        <BruisingSection bruisingData={reportData.other.bruising} reportType={reportType} />
        
        <OtherInjuriesSection otherInjuriesData={reportData.other.otherInjuries} reportType={reportType} />
        
        <TravelAnxietySection anxietyData={reportData.travelAnxiety} reportType={reportType} />
        
        <LifestyleImpactSection lifestyleData={reportData.other.lifestyle} reportType={reportType} />
        
        <MedicalHistorySection medicalHistoryData={reportData.other.medicalHistory} reportType={reportType} />
      </View>
      
      <PDFFooter 
        pageNumber={3} 
        claimantName={claimantName} 
        reportType={reportType}
      />
    </View>
  );
};

export default TreatmentLifestylePage;
