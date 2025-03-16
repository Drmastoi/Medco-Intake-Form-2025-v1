
import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { layoutStyles } from '../styles/layoutStyles';
import { textStyles } from '../styles/textStyles';
import { pdfStyles } from '../styles/pdfStyles';
import InstructionDetailsSection from '../sections/InstructionDetailsSection';
import AppointmentDetailsSection from '../sections/AppointmentDetailsSection';
import ClaimantDetailsSection from '../sections/ClaimantDetailsSection';
import AccidentDetailsSection from '../sections/AccidentDetailsSection';
import PDFFooter from '../components/PDFFooter';

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
          <Text style={textStyles.headerText}>Medical Assessment Report</Text>
          <Text style={textStyles.subHeaderText}>
            {reportType === "expert" ? "Expert Medical Report" : "Personal Injury Questionnaire Summary"}
          </Text>
        </View>

        <View style={pdfStyles.content}>
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
