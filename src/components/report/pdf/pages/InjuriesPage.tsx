
import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { InjuriesSection } from '../sections/InjuriesSection';
import PDFFooter from '../components/PDFFooter';
import { pdfStyles } from '../styles/pdfStyles';

interface InjuriesPageProps {
  reportData: ReportData;
  claimantName: string;
  today: string;
}

const InjuriesPage: React.FC<InjuriesPageProps> = ({ 
  reportData, 
  claimantName, 
  today 
}) => {
  return (
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.header}>
        <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>
          Injuries
        </Text>
      </View>
      
      <View style={pdfStyles.section}>
        <InjuriesSection formData={reportData} styles={pdfStyles} />
      </View>
      
      <PDFFooter pageNumber={2} claimantName={claimantName} today={today} />
    </Page>
  );
};

export default InjuriesPage;
