
import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { pdfStyles } from '../styles/pdfStyles';
import { textStyles } from '../styles/textStyles';
import { layoutStyles } from '../styles/layoutStyles';
import PDFFooter from '../components/PDFFooter';
import { ReportData } from '@/types/reportTypes';

interface ExpertInfoPageProps {
  reportData: ReportData;
  claimantName: string;
  today: string;
}

const ExpertInfoPage = ({ reportData, claimantName, today }: ExpertInfoPageProps) => {
  return (
    <Page size="A4" style={layoutStyles.page}>
      <View style={layoutStyles.pageContainer}>
        <View style={pdfStyles.section}>
          <Text style={textStyles.headerText}>
            Expert Information
          </Text>
          <Text style={textStyles.subHeaderText}>
            Report Date: {today}
          </Text>
        </View>
        
        <View style={layoutStyles.content}>
          <View style={layoutStyles.sectionContainer}>
            <Text style={textStyles.sectionTitle}>Expert Details</Text>
            <View style={layoutStyles.row}>
              <View style={layoutStyles.column}>
                <Text style={textStyles.fieldLabel}>Expert Name:</Text>
                <Text style={textStyles.fieldValue}>{reportData.prefilled.expertName}</Text>
              </View>
              <View style={layoutStyles.column}>
                <Text style={textStyles.fieldLabel}>Specialty:</Text>
                <Text style={textStyles.fieldValue}>{reportData.prefilled.expertSpecialty}</Text>
              </View>
            </View>
            <View style={layoutStyles.row}>
              <View style={layoutStyles.column}>
                <Text style={textStyles.fieldLabel}>GMC Registration Number:</Text>
                <Text style={textStyles.fieldValue}>{reportData.prefilled.gmcNumber}</Text>
              </View>
              <View style={layoutStyles.column}>
                <Text style={textStyles.fieldLabel}>Title:</Text>
                <Text style={textStyles.fieldValue}>{reportData.prefilled.expertTitle}</Text>
              </View>
            </View>
          </View>
          
          <View style={layoutStyles.sectionContainer}>
            <Text style={textStyles.sectionTitle}>Qualifications and Experience</Text>
            <Text style={textStyles.regularText}>
              I am a {reportData.prefilled.expertSpecialty} with extensive experience in assessing 
              and treating patients with soft tissue injuries following road traffic accidents. I am
              registered with the General Medical Council (GMC) and adhere to their guidelines for
              providing medico-legal reports.
            </Text>
          </View>
          
          <View style={layoutStyles.sectionContainer}>
            <Text style={textStyles.sectionTitle}>Declaration of Independence</Text>
            <Text style={textStyles.regularText}>
              I confirm that I am independent of the parties involved in this case. I have no
              conflict of interest in providing this report, and I understand my primary duty is
              to the court rather than to the party who instructed me.
            </Text>
          </View>
        </View>
      </View>
      
      <PDFFooter 
        pageNumber={5} 
        claimantName={claimantName}
        date={today}
      />
    </Page>
  );
};

export default ExpertInfoPage;
