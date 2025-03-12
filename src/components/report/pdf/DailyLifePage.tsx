
import { Page, View, Text } from '@react-pdf/renderer';
import { pdfStyles } from './reportPdfStyles';
import { AccidentHistorySection } from '../AccidentHistorySection';
import { PageFooter } from './PageFooter';
import { DailyLifeSection } from '../DailyLifeSection';

interface DailyLifePageProps {
  formData: any;
}

export const DailyLifePage = ({ formData }: DailyLifePageProps) => {
  return (
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.sectionHeader}>Section 5 - Accident Details</Text>
      
      <View style={pdfStyles.subsection}>
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>5.1 Accident Information</Text>
        <AccidentHistorySection formData={formData} />
      </View>

      <View style={pdfStyles.subsection}>
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Section 6 - Daily Life Impact & Expert Assessment</Text>
        <DailyLifeSection formData={formData} />
      </View>

      <PageFooter name={formData.fullName} formData={formData} />
    </Page>
  );
};
