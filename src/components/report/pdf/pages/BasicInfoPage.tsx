
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { layoutStyles } from '../styles/layoutStyles';
import { textStyles } from '../styles/textStyles';
import { colorScheme } from '../styles/colorScheme';
import InstructionDetailsSection from '../sections/InstructionDetailsSection';
import AppointmentDetailsSection from '../sections/AppointmentDetailsSection';
import ClaimantDetailsSection from '../sections/ClaimantDetailsSection';
import AccidentDetailsSection from '../sections/AccidentDetailsSection';
import PDFFooter from '../components/PDFFooter';

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
          Medical Report - {reportData?.personal?.fullName || "Not Specified"}
        </Text>
        
        <Text style={textStyles.subHeaderText}>
          Date of Report: {reportData?.prefilled?.dateOfReport || today}
        </Text>
        
        <InstructionDetailsSection
          reportData={reportData}
        />
        
        <AppointmentDetailsSection
          reportData={reportData}
        />
        
        <ClaimantDetailsSection
          reportData={reportData}
        />
        
        <AccidentDetailsSection
          reportData={reportData}
        />
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
