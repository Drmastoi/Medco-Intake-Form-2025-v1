
import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { pdfStyles } from '../styles/pdfStyles';
import { textStyles } from '../styles/textStyles';
import { layoutStyles } from '../styles/layoutStyles';
import { ReportData } from '@/types/reportTypes';
import PDFFooter from '../components/PDFFooter';
import { TreatmentSection } from '../sections/TreatmentSection';
import { LifestyleImpactSection } from '../sections/LifestyleImpactSection';
import { MedicalHistorySection } from '../sections/MedicalHistorySection';
import { OtherInjuriesSection } from '../sections/OtherInjuriesSection';
import { BruisingSection } from '../sections/BruisingSection';

interface TreatmentLifestylePageProps {
  reportData: ReportData;
  claimantName: string;
  today: string;
  reportType: "claimant" | "expert";
}

const TreatmentLifestylePage = ({ reportData, claimantName, today, reportType }: TreatmentLifestylePageProps) => {
  return (
    <Page size="A4" style={layoutStyles.page}>
      <View style={layoutStyles.pageContainer}>
        <View style={pdfStyles.section}>
          <Text style={textStyles.headerText}>
            Treatment and Lifestyle Impact {reportType === "expert" ? "(Expert Copy)" : "(Claimant Copy)"}
          </Text>
          <Text style={textStyles.subHeaderText}>
            Report Date: {today}
          </Text>
        </View>
        
        <View style={layoutStyles.content}>
          <BruisingSection 
            bruisingData={reportData.other.bruising}
          />

          <OtherInjuriesSection 
            otherInjuriesData={reportData.other.otherInjuries}
          />
          
          <TreatmentSection 
            treatmentData={reportData.other.treatment}
          />
          
          <LifestyleImpactSection 
            lifestyleData={reportData.other.lifestyle}
          />
          
          <MedicalHistorySection 
            medicalHistoryData={reportData.other.medicalHistory}
          />
        </View>
      </View>
      
      <PDFFooter 
        pageNumber={3} 
        claimantName={claimantName} 
        date={today} 
      />
    </Page>
  );
};

export default TreatmentLifestylePage;
