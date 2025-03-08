
import { Page } from '@react-pdf/renderer';
import { pdfStyles } from './reportPdfStyles';
import { ExaminationSection } from '../sections/ExaminationSection';
import { PageFooter } from './PageFooter';

interface ExaminationPageProps {
  formData: any;
}

export const ExaminationPage = ({ formData }: ExaminationPageProps) => {
  return (
    <Page size="A4" style={pdfStyles.page}>
      {/* Section 8: Examination */}
      <ExaminationSection formData={formData} styles={pdfStyles} />

      <PageFooter name={formData.fullName} formData={formData} />
    </Page>
  );
};
