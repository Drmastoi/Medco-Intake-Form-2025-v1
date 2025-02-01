import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';
import { PersonalDetailsSection } from './PersonalDetailsSection';
import { SummaryOfInjuriesSection } from './SummaryOfInjuriesSection';
import { TreatmentDetailsSection } from './TreatmentDetailsSection';
import { ClinicalExaminationSection } from './ClinicalExaminationSection';
import { PreviousMedicalHistorySection } from './PreviousMedicalHistorySection';
import { DailyLifeImpactSection } from './DailyLifeImpactSection';
import { AdditionalInformationSection } from './AdditionalInformationSection';
import { AccidentHistorySection } from './AccidentHistorySection';
import { InjuriesAndSymptomsSection } from './InjuriesAndSymptomsSection';
import { MedicalRecordsSection } from './MedicalRecordsSection';
import { CaseClassificationSection } from './CaseClassificationSection';
import { DeclarationSection } from './DeclarationSection';

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
      <Text style={styles.title}>MEDCO MEDICAL REPORT</Text>
      <PersonalDetailsSection formData={formData} />
      <Text 
        style={styles.pageNumber} 
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} 
        fixed 
      />
    </Page>
    
    <Page size="A4" style={styles.page}>
      <SummaryOfInjuriesSection formData={formData} />
      <AccidentHistorySection formData={formData} />
      <TreatmentDetailsSection formData={formData} />
      <InjuriesAndSymptomsSection formData={formData} />
      <Text 
        style={styles.pageNumber} 
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} 
        fixed 
      />
    </Page>
    
    <Page size="A4" style={styles.page}>
      <ClinicalExaminationSection formData={formData} />
      <PreviousMedicalHistorySection formData={formData} />
      <DailyLifeImpactSection formData={formData} />
      <AdditionalInformationSection formData={formData} />
      <Text 
        style={styles.pageNumber} 
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} 
        fixed 
      />
    </Page>

    <Page size="A4" style={styles.page}>
      <MedicalRecordsSection />
      <CaseClassificationSection />
      <DeclarationSection />
      <Text 
        style={styles.pageNumber} 
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} 
        fixed 
      />
    </Page>
  </Document>
);