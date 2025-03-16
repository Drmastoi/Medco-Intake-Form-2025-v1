
import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { ExpertCVSection } from '../sections/ExpertCVSection';
import PDFFooter from '../components/PDFFooter';
import { pdfStyles } from '../styles/pdfStyles';

interface ExpertInfoPageProps {
  claimantName: string;
  today: string;
}

const ExpertInfoPage: React.FC<ExpertInfoPageProps> = ({ 
  claimantName, 
  today 
}) => {
  return (
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.header}>
        <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>
          Expert Information
        </Text>
      </View>
      
      <View style={pdfStyles.section}>
        <ExpertCVSection styles={pdfStyles} />
      </View>
      
      <PDFFooter pageNumber={5} claimantName={claimantName} today={today} />
    </Page>
  );
};

export default ExpertInfoPage;
