
import { Page, View, Text } from '@react-pdf/renderer';
import { pdfStyles } from './reportPdfStyles';
import { DailyLifeSection } from '../DailyLifeSection';
import { PageFooter } from './PageFooter';

interface DailyLifePageProps {
  formData: any;
}

export const DailyLifePage = ({ formData }: DailyLifePageProps) => {
  return (
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.sectionHeader}>Section 7 - Impact on Daily Life</Text>
      
      <View style={pdfStyles.subsection}>
        <DailyLifeSection formData={formData} />
      </View>

      <PageFooter name={formData.fullName} formData={formData} />
    </Page>
  );
};
