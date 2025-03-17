
import React from 'react';
import { Page, View, Text, Image } from '@react-pdf/renderer';
import { ConclusionSection } from '../sections/ConclusionSection';
import PDFFooter from '../components/PDFFooter';
import { pdfStyles } from '../styles/pdfStyles';

interface DeclarationPageProps {
  claimantName: string;
  today: string;
}

const DeclarationPage: React.FC<DeclarationPageProps> = ({ 
  claimantName, 
  today 
}) => {
  return (
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.header}>
        <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>
          Conclusion and Expert Declaration
        </Text>
      </View>
      
      <View style={[pdfStyles.section, { minHeight: '80%' }]}>
        <ConclusionSection styles={pdfStyles} />
      </View>
      
      <PDFFooter pageNumber={4} claimantName={claimantName} today={today} />
    </Page>
  );
};

export default DeclarationPage;
