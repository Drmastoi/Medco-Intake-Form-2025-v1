
import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { pdfStyles } from '../styles/pdfStyles';
import { textStyles } from '../styles/textStyles';
import { layoutStyles } from '../styles/layoutStyles';
import PDFFooter from '../components/PDFFooter';
import { AgreementSection } from '../sections/AgreementSection';
import { ConclusionSection } from '../sections/ConclusionSection';

interface DeclarationPageProps {
  claimantName: string;
  today: string;
  reportType: "claimant" | "expert";
}

const DeclarationPage = ({ claimantName, today, reportType }: DeclarationPageProps) => {
  return (
    <Page size="A4" style={layoutStyles.page}>
      <View style={layoutStyles.pageContainer}>
        <View style={pdfStyles.section}>
          <Text style={textStyles.headerText}>
            Declaration and Statement of Truth {reportType === "expert" ? "(Expert Copy)" : "(Claimant Copy)"}
          </Text>
          <Text style={textStyles.subHeaderText}>
            Report Date: {today}
          </Text>
        </View>
        
        <View style={layoutStyles.content}>
          <ConclusionSection />
          <AgreementSection reportType={reportType} />
        </View>
      </View>
      
      <PDFFooter 
        pageNumber={4} 
        claimantName={claimantName} 
        date={today} 
      />
    </Page>
  );
};

export default DeclarationPage;
