
import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { layoutStyles } from '../styles/layoutStyles';
import { textStyles } from '../styles/textStyles';
import { pdfStyles } from '../styles/pdfStyles';
import AgreementSection from '../sections/AgreementSection';
import ConclusionSection from '../sections/ConclusionSection';
import PDFFooter from '../components/PDFFooter';

export interface DeclarationPageProps {
  claimantName: string;
  today: string;
  reportType?: "claimant" | "expert";
}

const DeclarationPage = ({ claimantName, today, reportType = "expert" }: DeclarationPageProps) => {
  return (
    <Page size="A4" style={pdfStyles.page}>
      <View style={layoutStyles.pageContainer}>
        <View style={pdfStyles.header}>
          <Text style={textStyles.headerText}>Declaration and Agreement</Text>
          <Text style={textStyles.subHeaderText}>
            {reportType === "expert" ? "Medical Expert Declaration" : "Claimant Declaration"}
          </Text>
        </View>

        <View style={layoutStyles.content}>
          <View style={pdfStyles.section}>
            <ConclusionSection reportType={reportType} />
            <AgreementSection claimantName={claimantName} today={today} reportType={reportType} />
          </View>
        </View>
      </View>
      <PDFFooter pageNumber={4} claimantName={claimantName} date={today} />
    </Page>
  );
};

export default DeclarationPage;
