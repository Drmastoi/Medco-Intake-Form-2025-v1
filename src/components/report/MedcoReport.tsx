import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';
import { PersonalDetailsSection } from './PersonalDetailsSection';
import { SummaryOfInjuriesSection } from './SummaryOfInjuriesSection';
import { TreatmentDetailsSection } from './TreatmentDetailsSection';
import { ClinicalExaminationSection } from './ClinicalExaminationSection';
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
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.4,
    fontFamily: 'Helvetica',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 15,
  }
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
      <Text style={styles.subtitle}>Section 1: SUMMARY OF INJURIES</Text>
      <SummaryOfInjuriesSection formData={formData} />
      
      <Text style={styles.subtitle}>Exceptional Circumstances:</Text>
      <Text style={styles.text}>
        Claimant has not claimed exceptional physical or exceptional psychological circumstances. 
        I would agree considering history symptoms and examination.
      </Text>

      <Text style={styles.subtitle}>Past Medical History:</Text>
      <Text style={styles.text}>
        The claimant have Previous Medical conditions which are made worse because of this accident
      </Text>
      
      <Text style={styles.subtitle}>Section 2: History of the Incident</Text>
      <AccidentHistorySection formData={formData} />
      
      <Text style={styles.subtitle}>Section 3: Treatment after the Accident</Text>
      <TreatmentDetailsSection formData={formData} />
      
      <Text 
        style={styles.pageNumber} 
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} 
        fixed 
      />
    </Page>
    
    <Page size="A4" style={styles.page}>
      <Text style={styles.subtitle}>Section 4: Injuries/Symptoms and Present Position</Text>
      <InjuriesAndSymptomsSection formData={formData} />
      
      <Text style={styles.subtitle}>Section 5: Employment Position/Education</Text>
      <Text style={styles.text}>
        The claimant is employed as {formData.occupation || 'not specified'}, working 
        {formData.workType === "1" ? " full-time" : formData.workType === "2" ? " part-time" : ""}. 
        They took {formData.daysOffWork || '0'} days off work and {formData.daysLightDuties || '0'} 
        days of light duties following the accident.
      </Text>
      
      <Text style={styles.subtitle}>Section 6: Home Circumstances</Text>
      <Text style={styles.text}>
        The claimant resides with {
          formData.livingWith === "1" ? "their wife" :
          formData.livingWith === "2" ? "their husband" :
          formData.livingWith === "3" ? "their partner" :
          formData.livingWith === "4" ? "their parents" :
          formData.livingWith === "5" ? "alone" : "family"
        }. They have {formData.childrenCount || '0'} children at home. Their home environment 
        provides a supportive setting for recovery.
      </Text>
      
      <Text style={styles.subtitle}>Section 7: Effects on Daily Life</Text>
      <DailyLifeImpactSection formData={formData} />
      
      <Text style={styles.subtitle}>Section 8: Psychological Effects</Text>
      <Text style={styles.text}>
        Following the accident, the claimant has experienced psychological impacts. 
        {formData.travelAnxiety === "1" ? 
          `They report travel-related anxiety, which has affected their confidence while traveling. 
          ${formData.currentlyDriving === "1" ? 
            "They continue to drive but with increased caution and vigilance." : 
            "They have not yet returned to driving."} 
          ${formData.moreCautious === "1" ? "They are notably more cautious while traveling. " : ""}
          ${formData.checkingMirrors === "1" ? "They report checking mirrors more frequently. " : ""}
          ${formData.preventedDriving === "1" ? "The anxiety has prevented them from driving regularly. " : ""}` 
          : "No significant psychological effects have been reported."}
      </Text>
      
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
      <AdditionalInformationSection formData={formData} />
      <Text 
        style={styles.pageNumber} 
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} 
        fixed 
      />
    </Page>
  </Document>
);