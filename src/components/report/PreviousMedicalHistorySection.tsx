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
  subsection: {
    marginTop: 8,
  },
});

export const PreviousMedicalHistorySection = ({ formData }: { formData: any }) => (
  <View style={styles.section}>
    <Text style={styles.subtitle}>Previous Medical History</Text>
    
    {/* Previous RTA */}
    <View style={styles.subsection}>
      <Text style={styles.subtitle}>1. Previous Road Traffic Accident</Text>
      <Text style={styles.text}>Previous RTA: {formData.previousAccident === "1" ? "Yes" : "No"}</Text>
      {formData.previousAccident === "1" && (
        <>
          <Text style={styles.text}>Date: {formData.previousAccidentDate ? formatDate(formData.previousAccidentDate) : "_______"}</Text>
          <Text style={styles.text}>Complete Recovery: {formData.previousAccidentRecovery === "1" ? "Yes" : "No"}</Text>
          <Text style={styles.text}>Duration of Recovery: {formData.previousAccidentRecoveryDuration || "_______"} days</Text>
          <Text style={styles.text}>Residual Symptoms: {formData.previousAccidentResidualSymptoms || "_______"}</Text>
        </>
      )}
    </View>

    {/* Previous Injuries Made Worse */}
    <View style={styles.subsection}>
      <Text style={styles.subtitle}>2. Impact on Previous Injuries</Text>
      <Text style={styles.text}>Previous Injuries Made Worse: {formData.previousInjuriesWorse === "1" ? "Yes" : "No"}</Text>
      {formData.previousInjuriesWorse === "1" && (
        <>
          <Text style={styles.text}>Details of Injuries: {formData.previousInjuriesDetails || "_______"}</Text>
          <Text style={styles.text}>Original Date of Injury: {formData.previousInjuriesDate ? formatDate(formData.previousInjuriesDate) : "_______"}</Text>
          <Text style={styles.text}>Treatment Received: {formData.previousInjuriesTreatment || "_______"}</Text>
        </>
      )}
    </View>

    {/* Previous Medical Conditions */}
    <View style={styles.subsection}>
      <Text style={styles.subtitle}>3. Pre-existing Medical Conditions</Text>
      <Text style={styles.text}>Conditions Made Worse: {formData.previousConditionWorse || "None reported"}</Text>
      {formData.previousConditionWorse && (
        <>
          <Text style={styles.text}>Details of Condition: {formData.previousConditionDetails || "_______"}</Text>
          <Text style={styles.text}>Duration of Condition: {formData.previousConditionDuration || "_______"}</Text>
          <Text style={styles.text}>Current Treatment: {formData.previousConditionTreatment || "_______"}</Text>
        </>
      )}
    </View>
  </View>
);