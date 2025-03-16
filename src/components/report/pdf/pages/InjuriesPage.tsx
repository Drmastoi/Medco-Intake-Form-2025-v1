
import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { pdfStyles } from '../styles/pdfStyles';
import { textStyles } from '../styles/textStyles';
import { layoutStyles } from '../styles/layoutStyles';
import { ReportData } from '@/types/reportTypes';
import PDFFooter from '../components/PDFFooter';
import { InjuriesSection } from '../sections/InjuriesSection';
import { TravelAnxietySection } from '../sections/TravelAnxietySection';

interface InjuriesPageProps {
  reportData: ReportData;
  claimantName: string;
  today: string;
  reportType: "claimant" | "expert";
}

const InjuriesPage = ({ reportData, claimantName, today, reportType }: InjuriesPageProps) => {
  return (
    <Page size="A4" style={layoutStyles.page}>
      <View style={layoutStyles.pageContainer}>
        <View style={pdfStyles.section}>
          <Text style={textStyles.headerText}>
            Injuries and Symptoms {reportType === "expert" ? "(Expert Copy)" : "(Claimant Copy)"}
          </Text>
          <Text style={textStyles.subHeaderText}>
            Report Date: {today}
          </Text>
        </View>
        
        <View style={layoutStyles.content}>
          <InjuriesSection 
            injuries={reportData.injuries}
            reportType={reportType}
          />
          
          <TravelAnxietySection 
            reportData={reportData}
            reportType={reportType}
          />
        </View>
      </View>
      
      <PDFFooter 
        pageNumber={2} 
        claimantName={claimantName} 
        date={today} 
      />
    </Page>
  );
};

export default InjuriesPage;
