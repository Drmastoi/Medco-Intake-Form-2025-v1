
import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { layoutStyles } from '../styles/layoutStyles';
import { textStyles } from '../styles/textStyles';
import { pdfStyles } from '../styles/pdfStyles';
import InjuriesSection from '../sections/InjuriesSection';
import TravelAnxietySection from '../sections/TravelAnxietySection';
import PDFFooter from '../components/PDFFooter';

export interface InjuriesPageProps {
  reportData: ReportData;
  claimantName: string;
  today: string;
  reportType?: "claimant" | "expert";
}

const InjuriesPage = ({ reportData, claimantName, today, reportType = "expert" }: InjuriesPageProps) => {
  return (
    <Page size="A4" style={pdfStyles.page}>
      <View style={layoutStyles.pageContainer}>
        <View style={pdfStyles.header}>
          <Text style={textStyles.headerText}>Injuries and Symptoms</Text>
          <Text style={textStyles.subHeaderText}>
            {reportType === "expert" ? "Expert Medical Assessment" : "Reported Injuries and Symptoms"}
          </Text>
        </View>

        <View style={pdfStyles.content}>
          <View style={pdfStyles.section}>
            <InjuriesSection reportData={reportData} reportType={reportType} />
            
            {reportData.travelAnxiety?.hasAnxiety && (
              <TravelAnxietySection reportData={reportData} reportType={reportType} />
            )}
          </View>
        </View>
      </View>
      <PDFFooter pageNumber={2} claimantName={claimantName} date={today} />
    </Page>
  );
};

export default InjuriesPage;
