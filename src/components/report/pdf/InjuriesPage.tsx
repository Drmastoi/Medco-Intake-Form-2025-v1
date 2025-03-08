
import { Page, View } from '@react-pdf/renderer';
import { pdfStyles } from './reportPdfStyles';
import { SummaryOfInjuriesTableSection } from '../sections/SummaryOfInjuriesTableSection';
import { AccidentDetailsSection } from '../sections/AccidentDetailsSection';
import { PageFooter } from './PageFooter';

interface InjuriesPageProps {
  formData: any;
}

export const InjuriesPage = ({ formData }: InjuriesPageProps) => {
  return (
    <Page size="A4" style={pdfStyles.page}>
      {/* Section 4: Summary of Injuries */}
      <SummaryOfInjuriesTableSection formData={formData} styles={pdfStyles} />
      
      {/* Section 5: Accident Details */}
      <AccidentDetailsSection formData={formData} styles={pdfStyles} />

      <PageFooter name={formData.fullName} formData={formData} />
    </Page>
  );
};
