
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { layoutStyles } from '../styles/layoutStyles';
import { textStyles } from '../styles/textStyles';
import { ReportData } from '@/types/reportTypes';
import PDFFooter from '../components/PDFFooter';
import { InstructionDetailsSection } from '../sections/InstructionDetailsSection';
import { AppointmentDetailsSection } from '../sections/AppointmentDetailsSection';
import { ClaimantDetailsSection } from '../sections/ClaimantDetailsSection';
import { AccidentDetailsSection } from '../sections/AccidentDetailsSection';

interface BasicInfoPageProps {
  reportData: ReportData;
  claimantName?: string;
  today?: string;
  reportType?: "claimant" | "expert";
}

const BasicInfoPage: React.FC<BasicInfoPageProps> = ({ 
  reportData,
  claimantName = "Not Specified",
  today = new Date().toLocaleDateString('en-GB'),
  reportType = "expert"
}) => {
  return (
    <View style={layoutStyles.page}>
      <View style={layoutStyles.pageContainer}>
        <Text style={textStyles.headerText}>
          Medical Legal Report
        </Text>
        
        <InstructionDetailsSection reportData={reportData} reportType={reportType} />
        
        <AppointmentDetailsSection reportData={reportData} reportType={reportType} />
        
        <ClaimantDetailsSection reportData={reportData} reportType={reportType} />
        
        <AccidentDetailsSection reportData={reportData} reportType={reportType} />
      </View>
      
      <PDFFooter 
        pageNumber={1} 
        claimantName={claimantName} 
        reportType={reportType}
      />
    </View>
  );
};

export default BasicInfoPage;
