
import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { ClaimantDetailsSection } from '../sections/ClaimantDetailsSection';
import { ExpertDetailsSection } from '../sections/ExpertDetailsSection';
import { WriterInfoSection } from '../sections/WriterInfoSection';
import { InstructionDetailsSection } from '../sections/InstructionDetailsSection';
import { AppointmentDetailsSection } from '../sections/AppointmentDetailsSection';
import { AccidentDetailsSection } from '../sections/AccidentDetailsSection';
import { SummaryOfInjuriesTableSection } from '../../sections/SummaryOfInjuriesTableSection';
import { StatementOfInstructionSection } from '../../sections/StatementOfInstructionSection';
import PDFFooter from '../components/PDFFooter';
import { pdfStyles } from '../styles/pdfStyles';

interface BasicInfoPageProps {
  reportData: ReportData;
  claimantName: string;
  today: string;
}

const BasicInfoPage: React.FC<BasicInfoPageProps> = ({ 
  reportData, 
  claimantName, 
  today 
}) => {
  return (
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.header}>
        <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>
          Expert Medical Report
        </Text>
      </View>
      
      <View style={pdfStyles.section}>
        <ClaimantDetailsSection formData={reportData} styles={pdfStyles} />
      </View>
      
      <View style={pdfStyles.section}>
        <ExpertDetailsSection styles={pdfStyles} formData={reportData} />
      </View>

      <View style={pdfStyles.section}>
        <WriterInfoSection styles={pdfStyles} />
      </View>
      
      <View style={pdfStyles.section}>
        <InstructionDetailsSection formData={reportData} styles={pdfStyles} />
      </View>
      
      <View style={pdfStyles.section}>
        <AppointmentDetailsSection formData={reportData} styles={pdfStyles} />
      </View>
      
      <View style={pdfStyles.section}>
        <AccidentDetailsSection formData={reportData} styles={pdfStyles} />
      </View>
      
      <View style={pdfStyles.section}>
        <SummaryOfInjuriesTableSection formData={reportData} styles={pdfStyles} />
      </View>
      
      <View style={pdfStyles.section}>
        <StatementOfInstructionSection styles={pdfStyles} formData={reportData} />
      </View>
      
      <PDFFooter pageNumber={1} claimantName={claimantName} today={today} />
    </Page>
  );
};

export default BasicInfoPage;
