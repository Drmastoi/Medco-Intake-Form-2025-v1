
import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { layoutStyles } from '../styles/layoutStyles';
import { textStyles } from '../styles/textStyles';
import { pdfStyles } from '../styles/pdfStyles';
import BruisingSection from '../sections/BruisingSection';
import OtherInjuriesSection from '../sections/OtherInjuriesSection';
import TreatmentSection from '../sections/TreatmentSection';
import LifestyleImpactSection from '../sections/LifestyleImpactSection';
import MedicalHistorySection from '../sections/MedicalHistorySection';
import PDFFooter from '../components/PDFFooter';

export interface TreatmentLifestylePageProps {
  reportData: ReportData;
  claimantName: string;
  today: string;
  reportType?: "claimant" | "expert";
}

const TreatmentLifestylePage = ({ reportData, claimantName, today, reportType = "expert" }: TreatmentLifestylePageProps) => {
  return (
    <Page size="A4" style={pdfStyles.page}>
      <View style={layoutStyles.pageContainer}>
        <View style={pdfStyles.header}>
          <Text style={textStyles.headerText}>Treatment and Lifestyle Impact</Text>
          <Text style={textStyles.subHeaderText}>
            {reportType === "expert" ? "Medical Assessment and Analysis" : "Treatment and Daily Life Impact"}
          </Text>
        </View>

        <View style={pdfStyles.content}>
          <View style={pdfStyles.section}>
            {reportData.other?.bruising?.hasBruising && (
              <BruisingSection reportData={reportData} reportType={reportType} />
            )}
            
            {reportData.other?.otherInjuries?.hasOtherInjury && (
              <OtherInjuriesSection reportData={reportData} reportType={reportType} />
            )}
            
            {reportData.other?.treatment?.hasTreatment && (
              <TreatmentSection reportData={reportData} reportType={reportType} />
            )}
            
            <LifestyleImpactSection reportData={reportData} reportType={reportType} />
            
            <MedicalHistorySection reportData={reportData} reportType={reportType} />
          </View>
        </View>
      </View>
      <PDFFooter pageNumber={3} claimantName={claimantName} date={today} />
    </Page>
  );
};

export default TreatmentLifestylePage;
