
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { layoutStyles } from '../styles/layoutStyles';
import { textStyles } from '../styles/textStyles';
import { ReportData } from '@/types/reportTypes';
import PDFFooter from '../components/PDFFooter';
import { AgreementSection } from '../sections/AgreementSection';
import { ConclusionSection } from '../sections/ConclusionSection';

interface DeclarationPageProps {
  reportData: ReportData;
  claimantName?: string;
  today?: string;
  reportType?: "claimant" | "expert";
}

const DeclarationPage: React.FC<DeclarationPageProps> = ({ 
  reportData,
  claimantName = "Not Specified",
  today = new Date().toLocaleDateString('en-GB'),
  reportType = "expert" 
}) => {
  return (
    <View style={layoutStyles.page}>
      <View style={layoutStyles.pageContainer}>
        <Text style={textStyles.headerText}>
          Declaration and Professional Opinion
        </Text>
        
        <ConclusionSection reportData={reportData} />
        
        <AgreementSection reportData={reportData} />
      </View>
      
      <PDFFooter 
        pageNumber={4} 
        claimantName={claimantName} 
        reportType={reportType}
      />
    </View>
  );
};

export default DeclarationPage;
