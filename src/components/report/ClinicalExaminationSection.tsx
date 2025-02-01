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

export const ClinicalExaminationSection = ({ formData }: { formData: any }) => (
  <View style={styles.section}>
    <Text style={styles.subtitle}>Clinical Examination</Text>
    <Text style={styles.text}>Neck Pain: {formData.neckPain === "1" ? "Yes" : "No"}</Text>
    {formData.neckPain === "1" && (
      <>
        <Text style={styles.text}>Initial Severity: {
          formData.neckPainInitialSeverity === "1" ? "Mild" :
          formData.neckPainInitialSeverity === "2" ? "Moderate" :
          formData.neckPainInitialSeverity === "3" ? "Severe" : "_______"
        }</Text>
        <Text style={styles.text}>Current Severity: {
          formData.neckPainCurrentSeverity === "1" ? "Mild" :
          formData.neckPainCurrentSeverity === "2" ? "Moderate" :
          formData.neckPainCurrentSeverity === "3" ? "Severe" :
          formData.neckPainCurrentSeverity === "4" ? "Resolved" : "_______"
        }</Text>
      </>
    )}
  </View>
);