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

export const InjuriesSection = ({ formData }: { formData: any }) => (
  <View style={styles.section}>
    <Text style={styles.subtitle}>Injuries Information</Text>
    
    {/* Neck Pain */}
    <Text style={styles.subtitle}>Neck Pain</Text>
    {formData.neckPain === "1" ? (
      <>
        <Text style={styles.text}>Onset: {
          formData.neckPainStart === "1" ? "Same day" :
          formData.neckPainStart === "2" ? "Next day" :
          formData.neckPainStart === "3" ? "Few days later" : "Claimant has not specified onset"
        }</Text>
        <Text style={styles.text}>Initial Severity: {
          formData.neckPainInitialSeverity === "1" ? "Mild" :
          formData.neckPainInitialSeverity === "2" ? "Moderate" :
          formData.neckPainInitialSeverity === "3" ? "Severe" : "Claimant has not specified initial severity"
        }</Text>
        <Text style={styles.text}>Current Severity: {
          formData.neckPainCurrentSeverity === "1" ? "Mild" :
          formData.neckPainCurrentSeverity === "2" ? "Moderate" :
          formData.neckPainCurrentSeverity === "3" ? "Severe" :
          formData.neckPainCurrentSeverity === "4" ? "Resolved" : "Claimant has not specified current severity"
        }</Text>
        {formData.neckPainCurrentSeverity === "4" && formData.neckPainResolveDays && (
          <Text style={styles.text}>Days to Resolve: {formData.neckPainResolveDays}</Text>
        )}
      </>
    ) : (
      <Text style={styles.text}>Claimant has not reported any symptoms related to neck pain</Text>
    )}

    {/* Shoulder Pain */}
    <Text style={styles.subtitle}>Shoulder Pain</Text>
    {formData.shoulderPain === "1" ? (
      <>
        <Text style={styles.text}>Side Affected: {
          formData.shoulderSide === "1" ? "Left" :
          formData.shoulderSide === "2" ? "Right" :
          formData.shoulderSide === "3" ? "Both" : "Claimant has not specified affected side"
        }</Text>
        <Text style={styles.text}>Initial Severity: {
          formData.shoulderPainInitialSeverity === "1" ? "Mild" :
          formData.shoulderPainInitialSeverity === "2" ? "Moderate" :
          formData.shoulderPainInitialSeverity === "3" ? "Severe" : "Claimant has not specified initial severity"
        }</Text>
        <Text style={styles.text}>Current Severity: {
          formData.shoulderPainCurrentSeverity === "1" ? "Mild" :
          formData.shoulderPainCurrentSeverity === "2" ? "Moderate" :
          formData.shoulderPainCurrentSeverity === "3" ? "Severe" :
          formData.shoulderPainCurrentSeverity === "4" ? "Resolved" : "Claimant has not specified current severity"
        }</Text>
        {formData.shoulderPainCurrentSeverity === "4" && formData.shoulderPainResolveDays && (
          <Text style={styles.text}>Days to Resolve: {formData.shoulderPainResolveDays}</Text>
        )}
      </>
    ) : (
      <Text style={styles.text}>Claimant has not reported any symptoms related to shoulder pain</Text>
    )}
  </View>
);