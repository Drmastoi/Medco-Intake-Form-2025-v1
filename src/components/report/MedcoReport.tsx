import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';
import { PersonalDetailsSection } from './PersonalDetailsSection';
import { SummaryOfInjuriesSection } from './SummaryOfInjuriesSection';
import { PreviousMedicalHistorySection } from './PreviousMedicalHistorySection';
import { AccidentHistorySection } from './AccidentHistorySection';
import { TreatmentDetailsSection } from './TreatmentDetailsSection';
import { InjuriesAndSymptomsSection } from './InjuriesAndSymptomsSection';
import { DailyLifeImpactSection } from './DailyLifeImpactSection';

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
    {/* Page 1 */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>MEDCO MEDICAL REPORT</Text>
      <PersonalDetailsSection formData={formData} />
      <Text 
        style={styles.pageNumber} 
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} 
        fixed 
      />
    </Page>
    
    {/* Page 2 */}
    <Page size="A4" style={styles.page}>
      {/* Section 1: Summary of Injuries */}
      <SummaryOfInjuriesSection formData={formData} />
      
      {/* Section 2: Past Medical History */}
      <PreviousMedicalHistorySection formData={formData} />
      
      {/* Section 3: Previous Road Traffic Accident */}
      <Text style={styles.subtitle}>Previous Road Traffic Accident and Impact on Previous Injuries</Text>
      {formData.previousAccident === "1" && (
        <Text style={styles.text}>
          The claimant was involved in a previous road traffic accident on {formData.previousAccidentDate}. 
          {formData.previousAccidentRecovery === "1" 
            ? "They made a complete recovery from the previous incident."
            : "They had not fully recovered from the previous incident when this accident occurred."}
          {formData.previousInjuriesWorse === "1" && 
            "This current accident has exacerbated their previous injuries."}
        </Text>
      )}
      
      {/* Section 4: Exceptional Circumstances */}
      <Text style={styles.subtitle}>Exceptional Circumstances</Text>
      <Text style={styles.text}>
        The claimant has not claimed exceptional physical or psychological circumstances.
        Based on the history, symptoms, and examination, this assessment appears appropriate.
      </Text>
      
      {/* Section 5: History of the Incident */}
      <AccidentHistorySection formData={formData} />
      
      {/* Section 6: Treatment Details */}
      <TreatmentDetailsSection formData={formData} />
      
      {/* Section 7: Injuries and Symptoms */}
      <InjuriesAndSymptomsSection formData={formData} />
      
      {/* Sections 8-11: Daily Life Impact */}
      <DailyLifeImpactSection formData={formData} />
      
      <Text 
        style={styles.pageNumber} 
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} 
        fixed 
      />
    </Page>
  </Document>
);