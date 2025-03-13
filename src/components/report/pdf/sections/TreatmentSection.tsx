
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface TreatmentSectionProps {
  formData: ReportData;
  styles: any;
}

export const TreatmentSection = ({ formData, styles }: TreatmentSectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 13 - Treatment</Text>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>13.1 Hospital Attendance</Text>
        <Text style={styles.fieldValue}>
          {formData.treatment.hospitalAttendance === "Yes" 
            ? `The claimant attended ${formData.treatment.hospitalName || "hospital"} on ${formData.treatment.hospitalDate || "the date of the accident"}.`
            : "The claimant did not attend hospital following the accident."}
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>13.2 GP Attendance</Text>
        <Text style={styles.fieldValue}>
          {formData.treatment.gpAttendance === "Yes"
            ? `The claimant visited their GP on ${formData.treatment.gpDate || "a date after the accident"}.`
            : "The claimant did not visit their GP following the accident."}
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>13.3 Physiotherapy</Text>
        <Text style={styles.fieldValue}>
          {formData.treatment.physiotherapy === "Yes"
            ? `The claimant received physiotherapy treatment. Number of sessions: ${formData.treatment.physiotherapySessions || "not specified"}.`
            : "The claimant did not receive physiotherapy treatment."}
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>13.4 Medication</Text>
        <Text style={styles.fieldValue}>
          {formData.treatment.medication 
            ? `The claimant took the following medication: ${formData.treatment.medication}.`
            : "The claimant did not report taking any specific medication for their injuries."}
        </Text>
      </View>
    </View>
  );
};
