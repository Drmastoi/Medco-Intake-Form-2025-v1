import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { PersonalDetailsSection } from './PersonalDetailsSection';
import { TreatmentDetailsSection } from './TreatmentDetailsSection';
import { ClinicalExaminationSection } from './ClinicalExaminationSection';
import { PreviousMedicalHistorySection } from './PreviousMedicalHistorySection';
import { DailyLifeImpactSection } from './DailyLifeImpactSection';
import { AdditionalInformationSection } from './AdditionalInformationSection';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
  },
});

export const MedcoReport = ({ formData }: { formData: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>MEDICAL REPORT</Text>
      <PersonalDetailsSection formData={formData} />
      <TreatmentDetailsSection formData={formData} />
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} fixed />
    </Page>
    <Page size="A4" style={styles.page}>
      <ClinicalExaminationSection formData={formData} />
      <PreviousMedicalHistorySection formData={formData} />
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} fixed />
    </Page>
    <Page size="A4" style={styles.page}>
      <DailyLifeImpactSection formData={formData} />
      <AdditionalInformationSection formData={formData} />
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} fixed />
    </Page>
  </Document>
);