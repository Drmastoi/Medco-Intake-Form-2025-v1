
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { reportStyles } from './reportStyles';
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

const styles = {
  ...reportStyles,
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
};

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
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>MEDICAL REPORT</Text>
        <PersonalInfoSection formData={formData} />

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} fixed />
        <Text style={styles.footer} fixed>Medical Report - {formData.fullName || 'Anonymous'}</Text>
      </Page>

      <Page size="A4" style={styles.page}>
        <AccidentInfoSection formData={formData} />
        <InjuriesSection formData={formData} />

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} fixed />
        <Text style={styles.footer} fixed>Medical Report - {formData.fullName || 'Anonymous'}</Text>
      </Page>

      <Page size="A4" style={styles.page}>
        <TreatmentDetailsSection formData={formData} />
        <DailyLifeImpactSection formData={formData} />
        <PreviousMedicalHistorySection formData={formData} />

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} fixed />
        <Text style={styles.footer} fixed>Medical Report - {formData.fullName || 'Anonymous'}</Text>
      </Page>

      <Page size="A4" style={styles.page}>
        <ClinicalExaminationSection formData={formData} />
        <SummaryOfInjuriesSection formData={formData} />

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} fixed />
        <Text style={styles.footer} fixed>Medical Report - {formData.fullName || 'Anonymous'}</Text>
      </Page>

      <Page size="A4" style={styles.page}>
        <CaseClassificationSection formData={formData} />
        <AdditionalInformationSection formData={formData} />
        
        <DeclarationSection formData={formData} />
        
        {/* Claimant Signature Section */}
        <View style={styles.signatureSection}>
          <Text style={styles.signatureText}>Claimant Signature:</Text>
          {signature ? (
            <Text style={styles.signatureText}>{signature}</Text>
          ) : (
            <Text style={styles.signatureText}>________________________</Text>
          )}
          
          <Text style={styles.signatureText}>
            Date and Time: {signatureDate ? formatDate(signatureDate) + ' ' + new Date(signatureDate).toLocaleTimeString() : '_________________'}
          </Text>
          
          <Text style={styles.text} style={{marginTop: 10}}>
            Patient has confirmed agreement with the submission of this report.
          </Text>
        </View>

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} fixed />
        <Text style={styles.footer} fixed>Medical Report - {formData.fullName || 'Anonymous'}</Text>
      </Page>
    </Document>
  );
};
