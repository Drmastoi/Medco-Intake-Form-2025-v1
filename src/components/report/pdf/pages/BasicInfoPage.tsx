
import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { pdfStyles } from '../styles/pdfStyles';
import { textStyles } from '../styles/textStyles';
import { layoutStyles } from '../styles/layoutStyles';
import { ReportData } from '@/types/reportTypes';
import PDFFooter from '../components/PDFFooter';
import { InstructionDetailsSection } from '../sections/InstructionDetailsSection';
import { AppointmentDetailsSection } from '../sections/AppointmentDetailsSection';
import { ClaimantDetailsSection } from '../sections/ClaimantDetailsSection';
import { AccidentDetailsSection } from '../sections/AccidentDetailsSection';

interface BasicInfoPageProps {
  reportData: ReportData;
  claimantName: string;
  today: string;
  reportType: "claimant" | "expert";
}

const BasicInfoPage = ({ reportData, claimantName, today, reportType }: BasicInfoPageProps) => {
  return (
    <Page size="A4" style={layoutStyles.page}>
      <View style={layoutStyles.pageContainer}>
        <View style={pdfStyles.section}>
          <Text style={textStyles.headerText}>
            Medico-Legal Report {reportType === "expert" ? "(Expert Copy)" : "(Claimant Copy)"}
          </Text>
          <Text style={textStyles.subHeaderText}>
            Report Date: {today}
          </Text>
        </View>
        
        <View style={layoutStyles.content}>
          <InstructionDetailsSection 
            prefilled={reportData.prefilled} 
          />
          
          <AppointmentDetailsSection 
            prefilled={reportData.prefilled} 
          />
          
          <ClaimantDetailsSection 
            personal={reportData.personal} 
          />
          
          <AccidentDetailsSection 
            accident={reportData.accident} 
          />
        </View>
      </View>
      
      <PDFFooter 
        pageNumber={1} 
        claimantName={claimantName} 
        date={today} 
      />
    </Page>
  );
};

export default BasicInfoPage;
