
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { layoutStyles } from '../styles/layoutStyles';
import { textStyles } from '../styles/textStyles';
import { ReportData } from '@/types/reportTypes';
import PDFFooter from '../components/PDFFooter';
import ExpertDetailsSection from '../sections/ExpertDetailsSection';
import ExpertCVSection from '../sections/ExpertCVSection';

interface ExpertInfoPageProps {
  reportData: ReportData;
  claimantName?: string;
  today?: string;
}

const ExpertInfoPage: React.FC<ExpertInfoPageProps> = ({ 
  reportData,
  claimantName = "Not Specified",
  today = new Date().toLocaleDateString('en-GB')
}) => {
  return (
    <View style={layoutStyles.page}>
      <View style={layoutStyles.pageContainer}>
        <Text style={textStyles.headerText}>
          Expert Information
        </Text>
        
        <ExpertDetailsSection expertData={reportData.prefilled} />
        
        <ExpertCVSection expertData={reportData.prefilled} />
      </View>
      
      <PDFFooter 
        pageNumber={5} 
        claimantName={claimantName} 
        reportType="expert"
      />
    </View>
  );
};

export default ExpertInfoPage;
