import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  section: {
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    lineHeight: 1.4,
  },
});

export const PreviousMedicalHistorySection = ({ formData }: { formData: any }) => (
  <View style={styles.section}>
    <Text style={styles.subtitle}>Previous Medical History</Text>
    <Text style={styles.text}>Previous Road Traffic Accident: {formData.previousAccident === "1" ? "Yes" : "No"}</Text>
    {formData.previousAccident === "1" && (
      <Text style={styles.text}>Date: {formData.previousAccidentDate || "_______"}</Text>
    )}
    <Text style={styles.text}>Complete Recovery from Previous Accident: {formData.previousAccidentRecovery === "1" ? "Yes" : "No"}</Text>
    <Text style={styles.text}>Previous Injuries Made Worse: {formData.previousInjuriesWorse === "1" ? "Yes" : "No"}</Text>
    <Text style={styles.text}>Previous Medical Condition Made Worse: {formData.previousConditionWorse || "_______"}</Text>
  </View>
);