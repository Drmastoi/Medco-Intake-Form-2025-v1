
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { styles } from './reportStyles';
import { PersonalInfoSection } from './PersonalInfoSection';
import { AccidentInfoSection } from './AccidentInfoSection';
import { InjuriesSection } from './InjuriesSection';
import { TreatmentDetailsSection } from './TreatmentDetailsSection';
import { DailyLifeImpactSection } from './DailyLifeImpactSection';
import { PreviousMedicalHistorySection } from './PreviousMedicalHistorySection';
import { ClinicalExaminationSection } from './ClinicalExaminationSection';
import { SummaryOfInjuriesSection } from './SummaryOfInjuriesSection';
import { CaseClassificationSection } from './CaseClassificationSection';
import { AdditionalInformationSection } from './AdditionalInformationSection';
import { DeclarationSection } from './DeclarationSection';
import { formatDate } from '../../utils/dateUtils';

// Create local styles extending the imported styles
const localStyles = StyleSheet.create({
  ...styles,
  signatureSection: {
    marginTop: 20,
    borderTop: 1,
    paddingTop: 10,
  },
  signatureText: {
    fontSize: 10,
    marginBottom: 4,
    fontFamily: 'Helvetica',
  },
});

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
      <Page size="A4" style={localStyles.page}>
        <Text style={localStyles.title}>MEDICAL REPORT</Text>
        <PersonalInfoSection formData={formData} />

        <Text style={localStyles.pageNumber} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} fixed />
        <Text style={localStyles.footer} fixed>Medical Report - {formData.fullName || 'Anonymous'}</Text>
      </Page>

      <Page size="A4" style={localStyles.page}>
        <AccidentInfoSection formData={formData} />
        <InjuriesSection formData={formData} />

        <Text style={localStyles.pageNumber} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} fixed />
        <Text style={localStyles.footer} fixed>Medical Report - {formData.fullName || 'Anonymous'}</Text>
      </Page>

      <Page size="A4" style={localStyles.page}>
        <TreatmentDetailsSection formData={formData} />
        <DailyLifeImpactSection formData={formData} />
        <PreviousMedicalHistorySection formData={formData} />

        <Text style={localStyles.pageNumber} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} fixed />
        <Text style={localStyles.footer} fixed>Medical Report - {formData.fullName || 'Anonymous'}</Text>
      </Page>

      <Page size="A4" style={localStyles.page}>
        <ClinicalExaminationSection formData={formData} />
        <SummaryOfInjuriesSection formData={formData} />

        <Text style={localStyles.pageNumber} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} fixed />
        <Text style={localStyles.footer} fixed>Medical Report - {formData.fullName || 'Anonymous'}</Text>
      </Page>

      <Page size="A4" style={localStyles.page}>
        <CaseClassificationSection formData={formData} />
        <AdditionalInformationSection formData={formData} />
        
        <DeclarationSection formData={formData} />
        
        {/* Claimant Signature Section */}
        <View style={localStyles.signatureSection}>
          <Text style={localStyles.signatureText}>Claimant Signature:</Text>
          {signature ? (
            <Text style={localStyles.signatureText}>{signature}</Text>
          ) : (
            <Text style={localStyles.signatureText}>________________________</Text>
          )}
          
          <Text style={localStyles.signatureText}>
            Date and Time: {signatureDate ? formatDate(signatureDate) + ' ' + new Date(signatureDate).toLocaleTimeString() : '_________________'}
          </Text>
          
          <Text style={localStyles.text}>
            Patient has confirmed agreement with the submission of this report.
          </Text>
        </View>

        <Text style={localStyles.pageNumber} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} fixed />
        <Text style={localStyles.footer} fixed>Medical Report - {formData.fullName || 'Anonymous'}</Text>
      </Page>
    </Document>
  );
};
