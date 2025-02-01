import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { formatDate } from '../../utils/dateUtils';

const styles = StyleSheet.create({
  section: {
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.4,
  },
});

export const PreviousMedicalHistorySection = ({ formData }: { formData: any }) => (
  <View style={styles.section}>
    <Text style={styles.subtitle}>Previous Medical History</Text>
    
    <Text style={styles.text}>Previous Road Traffic Accident: {formData.previousAccident === "1" ? "Yes" : "No"}</Text>
    {formData.previousAccident === "1" && (
      <>
        <Text style={styles.text}>Date: {formData.previousAccidentDate ? formatDate(formData.previousAccidentDate) : "_______"}</Text>
        <Text style={styles.text}>Complete Recovery: {formData.previousAccidentRecovery === "1" ? "Yes" : "No"}</Text>
      </>
    )}
    
    <Text style={styles.text}>Previous Injuries Made Worse: {formData.previousInjuriesWorse === "1" ? "Yes" : "No"}</Text>
    
    <Text style={styles.text}>Previous Medical Conditions Made Worse: {formData.previousConditionWorse || "None reported"}</Text>
  </View>
);