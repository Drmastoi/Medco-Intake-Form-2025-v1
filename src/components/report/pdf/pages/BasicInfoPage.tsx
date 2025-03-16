
import React from 'react';
import { Page, View, Text, Image } from '@react-pdf/renderer';
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
import { colorScheme } from '../styles/colorScheme';

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
      {/* Header with report type, claimant name and reference number */}
      <View style={[pdfStyles.header, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
        <View style={{ width: '20%' }}>
          {/* Logo placeholder - in production, replace with actual logo */}
          <Text style={{ color: 'white', fontWeight: 'bold' }}>MedLegal</Text>
        </View>
        <View style={{ width: '60%', textAlign: 'center' }}>
          <Text style={{color: 'white', fontSize: 16}}>
            Expert Medical Report
          </Text>
          <Text style={{color: 'white', fontSize: 10, marginTop: 4}}>
            {reportData.prefilled?.medcoReference || 'MED-2023-001'}
          </Text>
        </View>
        <View style={{ width: '20%', textAlign: 'right' }}>
          <Text style={{color: 'white', fontSize: 10}}>
            {today}
          </Text>
        </View>
      </View>
      
      {/* Summary box highlighting key information */}
      <View style={{ 
        backgroundColor: colorScheme.altSectionBg, 
        margin: 10, 
        padding: 10, 
        borderRadius: 3,
        borderLeft: `4px solid ${colorScheme.accent}`
      }}>
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5, color: colorScheme.primary }}>
          Report Summary
        </Text>
        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
          <Text style={{ width: '30%', fontSize: 10, fontWeight: 'bold' }}>Claimant:</Text>
          <Text style={{ width: '70%', fontSize: 10 }}>{reportData.personal?.fullName || 'Not specified'}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
          <Text style={{ width: '30%', fontSize: 10, fontWeight: 'bold' }}>Date of Accident:</Text>
          <Text style={{ width: '70%', fontSize: 10 }}>{reportData.accident?.accidentDate || 'Not specified'}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
          <Text style={{ width: '30%', fontSize: 10, fontWeight: 'bold' }}>Date of Examination:</Text>
          <Text style={{ width: '70%', fontSize: 10 }}>{reportData.prefilled?.dateOfExamination || 'Not specified'}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ width: '30%', fontSize: 10, fontWeight: 'bold' }}>Solicitor:</Text>
          <Text style={{ width: '70%', fontSize: 10 }}>{reportData.prefilled?.solicitorName || 'Not specified'}</Text>
        </View>
      </View>
      
      {/* Main content sections */}
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
