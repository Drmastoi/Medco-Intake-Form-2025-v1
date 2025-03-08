
import { Document } from '@react-pdf/renderer';
import { FirstPage } from './pdf/FirstPage';
import { InjuriesPage } from './pdf/InjuriesPage';
import { MedicalHistoryPage } from './pdf/MedicalHistoryPage';
import { InjuriesSymptomsPage } from './pdf/InjuriesSymptomsPage';
import { ExaminationPage } from './pdf/ExaminationPage';

export const MedcoReport = ({ 
  formData,
  signature,
  signatureDate
}: { 
  formData: any;
  signature?: string;
  signatureDate?: string;
}) => {
  return (
    <Document>
      <FirstPage formData={formData} />
      <InjuriesPage formData={formData} />
      <MedicalHistoryPage formData={formData} />
      <InjuriesSymptomsPage formData={formData} />
      <ExaminationPage formData={formData} />
    </Document>
  );
};
