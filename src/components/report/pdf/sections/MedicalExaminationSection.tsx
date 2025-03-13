
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface MedicalExaminationSectionProps {
  formData: ReportData;
  styles: any;
}

export const MedicalExaminationSection = ({ formData, styles }: MedicalExaminationSectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 10 - Medical Examination</Text>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>10.1 General Observations</Text>
        <Text style={styles.fieldValue}>
          The claimant presented on time for the examination. Their demeanor was appropriate throughout the consultation.
          The claimant was able to provide a clear history of the accident and the resulting injuries.
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>10.2 Physical Examination</Text>
        <Text style={styles.fieldValue}>
          On examination, the claimant's general appearance was normal. Vital signs were within normal limits.
          {formData.injuries.neckPain === "Yes" && " Examination of the neck revealed tenderness and limited range of motion."}
          {formData.injuries.shoulderPain === "Yes" && ` Examination of the ${formData.injuries.shoulderSide.toLowerCase()} shoulder showed tenderness and limited range of motion.`}
          {formData.injuries.backPain === "Yes" && ` Examination of the ${formData.injuries.backLocation.toLowerCase()} back demonstrated tenderness and limited range of motion.`}
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>10.3 Neurological Examination</Text>
        <Text style={styles.fieldValue}>
          Neurological examination revealed no abnormalities. Reflexes, sensation, and motor functions were normal in all limbs.
        </Text>
      </View>
    </View>
  );
};
