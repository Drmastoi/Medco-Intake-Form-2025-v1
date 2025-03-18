
import React from 'react';
import { Page, View, Text, Image } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { ClaimantDetailsSection } from '../sections/ClaimantDetailsSection';
import { ExpertDetailsSection } from '../sections/ExpertDetailsSection';
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
  // Create more compact styles for the first page
  const compactStyles = {
    ...pdfStyles,
    section: {
      ...pdfStyles.section,
      marginBottom: 8, // Reduce margin between sections
      padding: 6, // Reduce padding inside sections
    },
    subsection: {
      ...pdfStyles.subsection,
      marginBottom: 8, // Reduce margin between subsections
    },
    fieldRow: {
      ...pdfStyles.fieldRow,
      marginBottom: 3, // Reduce margin between rows
    }
  };

  return (
    <Page size="A4" style={pdfStyles.page}>
      {/* Header with report type, claimant name and reference number */}
      <View style={[pdfStyles.header, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
        <View style={{ width: '20%' }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>{claimantName}</Text>
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
        margin: 8, 
        padding: 8, 
        borderRadius: 3,
        borderLeft: `4px solid ${colorScheme.accent}`
      }}>
        <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 4, color: colorScheme.primary }}>
          Report Summary
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <View style={{ width: '50%', flexDirection: 'row', marginBottom: 2 }}>
            <Text style={{ width: '40%', fontSize: 8, fontWeight: 'bold' }}>Claimant:</Text>
            <Text style={{ width: '60%', fontSize: 8 }}>{reportData.personal?.fullName || 'Not specified'}</Text>
          </View>
          <View style={{ width: '50%', flexDirection: 'row', marginBottom: 2 }}>
            <Text style={{ width: '40%', fontSize: 8, fontWeight: 'bold' }}>Date of Accident:</Text>
            <Text style={{ width: '60%', fontSize: 8 }}>{reportData.accident?.accidentDate || 'Not specified'}</Text>
          </View>
          <View style={{ width: '50%', flexDirection: 'row', marginBottom: 2 }}>
            <Text style={{ width: '40%', fontSize: 8, fontWeight: 'bold' }}>Date of Examination:</Text>
            <Text style={{ width: '60%', fontSize: 8 }}>{reportData.prefilled?.dateOfExamination || 'Not specified'}</Text>
          </View>
          <View style={{ width: '50%', flexDirection: 'row', marginBottom: 2 }}>
            <Text style={{ width: '40%', fontSize: 8, fontWeight: 'bold' }}>Solicitor:</Text>
            <Text style={{ width: '60%', fontSize: 8 }}>{reportData.prefilled?.solicitorName || 'Not specified'}</Text>
          </View>
        </View>
      </View>
      
      {/* Main content sections - using compactStyles */}
      <View style={compactStyles.section}>
        <ClaimantDetailsSection formData={reportData} styles={compactStyles} />
      </View>
      
      <View style={compactStyles.section}>
        <ExpertDetailsSection formData={reportData} styles={compactStyles} />
      </View>
      
      <View style={compactStyles.section}>
        <InstructionDetailsSection formData={reportData} styles={compactStyles} />
      </View>
      
      <View style={compactStyles.section}>
        <AppointmentDetailsSection formData={reportData} styles={compactStyles} />
      </View>
      
      <View style={compactStyles.section}>
        <AccidentDetailsSection formData={reportData} styles={compactStyles} />
      </View>
      
      <View style={compactStyles.section}>
        <SummaryOfInjuriesTableSection formData={reportData} styles={compactStyles} />
      </View>
      
      <PDFFooter 
        claimantName={claimantName} 
        pageLabel="Page 1" 
        currentDate={today} 
      />
    </Page>
  );
};

export default BasicInfoPage;
