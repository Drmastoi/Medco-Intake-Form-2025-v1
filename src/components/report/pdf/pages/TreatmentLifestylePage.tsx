
import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { layoutStyles } from '../styles/layoutStyles';
import { textStyles } from '../styles/textStyles';
import { pdfStyles } from '../styles/pdfStyles';
import PDFFooter from '../components/PDFFooter';
import BruisingSection from '../sections/BruisingSection';
import OtherInjuriesSection from '../sections/OtherInjuriesSection';
import TreatmentSection from '../sections/TreatmentSection';
import LifestyleImpactSection from '../sections/LifestyleImpactSection';

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
            {reportType === "expert" ? "Expert Assessment" : "Claimant Report"}
          </Text>
        </View>

        <View style={layoutStyles.content}>
          <View style={pdfStyles.section}>
            <BruisingSection 
              reportData={reportData} 
              reportType={reportType} 
            />
            
            <OtherInjuriesSection 
              reportData={reportData} 
              reportType={reportType} 
            />
            
            <TreatmentSection 
              reportData={reportData} 
              reportType={reportType} 
            />
            
            <LifestyleImpactSection 
              reportData={reportData} 
              reportType={reportType} 
            />
          </View>
        </View>
      </View>
      <PDFFooter pageNumber={3} claimantName={claimantName} date={today} />
    </Page>
  );
};

export default TreatmentLifestylePage;
