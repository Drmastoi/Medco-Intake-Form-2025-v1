
import { Page } from '@react-pdf/renderer';
import { pdfStyles } from './reportPdfStyles';
import { PastMedicalHistorySection } from '../sections/PastMedicalHistorySection';
import { PageFooter } from './PageFooter';

interface MedicalHistoryPageProps {
  formData: any;
}

export const MedicalHistoryPage = ({ formData }: MedicalHistoryPageProps) => {
  return (
    <Page size="A4" style={pdfStyles.page}>
      {/* Section 6: Past Medical History */}
      <PastMedicalHistorySection formData={formData} styles={pdfStyles} />

      <PageFooter name={formData.fullName} formData={formData} />
    </Page>
  );
};
