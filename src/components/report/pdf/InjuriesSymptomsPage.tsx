
import { Page } from '@react-pdf/renderer';
import { pdfStyles } from './reportPdfStyles';
import { InjuriesSymptomsSection } from '../sections/InjuriesSymptomsSection';
import { PageFooter } from './PageFooter';

interface InjuriesSymptomsPageProps {
  formData: any;
}

export const InjuriesSymptomsPage = ({ formData }: InjuriesSymptomsPageProps) => {
  return (
    <Page size="A4" style={pdfStyles.page}>
      {/* Section 7: Injuries / Symptoms */}
      <InjuriesSymptomsSection formData={formData} styles={pdfStyles} />

      <PageFooter name={formData.fullName} formData={formData} />
    </Page>
  );
};
