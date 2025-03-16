
import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { layoutStyles } from '../styles/layoutStyles';
import { textStyles } from '../styles/textStyles';
import { pdfStyles } from '../styles/pdfStyles';
import PDFFooter from '../components/PDFFooter';
import { InstructionDetailsSection } from '../sections/InstructionDetailsSection';
import { AppointmentDetailsSection } from '../sections/AppointmentDetailsSection';
import { ClaimantDetailsSection } from '../sections/ClaimantDetailsSection';
import { AccidentDetailsSection } from '../sections/AccidentDetailsSection';

export interface BasicInfoPageProps {
  reportData: ReportData;
  claimantName: string;
  today: string;
  reportType?: "claimant" | "expert";
}

const BasicInfoPage = ({ reportData, claimantName, today, reportType = "expert" }: BasicInfoPageProps) => {
  return (
    <Page size="A4" style={pdfStyles.page}>
      <View style={layoutStyles.pageContainer}>
        <View style={pdfStyles.header}>
          <Text style={textStyles.headerText}>Medical Legal Report</Text>
          <Text style={textStyles.subHeaderText}>
            {reportType === "expert" ? "Medico-Legal Expert Report" : "Claimant Report"}
          </Text>
        </View>

        <View style={layoutStyles.content}>
          <View style={pdfStyles.section}>
            <InstructionDetailsSection reportData={reportData} />
            <AppointmentDetailsSection reportData={reportData} />
            <ClaimantDetailsSection reportData={reportData} />
            <AccidentDetailsSection reportData={reportData} />
          </View>
        </View>
      </View>
      <PDFFooter pageNumber={1} claimantName={claimantName} date={today} />
    </Page>
  );
};

export default BasicInfoPage;
