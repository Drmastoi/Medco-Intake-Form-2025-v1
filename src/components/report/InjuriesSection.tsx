
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
      <Text style={styles.text}>Claimant has not reported any injuries related to neck pain.</Text>
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
      <Text style={styles.text}>Claimant has not reported any injuries related to shoulder pain.</Text>
    )}

    {/* Back Pain */}
    <Text style={styles.subtitle}>Back Pain</Text>
    {formData.backPain === "1" ? (
      <>
        <Text style={styles.text}>Area Affected: {
          formData.backLocation === "1" ? "Upper" :
          formData.backLocation === "2" ? "Mid" :
          formData.backLocation === "3" ? "Lower" : "Claimant has not specified affected area"
        }</Text>
        <Text style={styles.text}>Initial Severity: {
          formData.backPainInitialSeverity === "1" ? "Mild" :
          formData.backPainInitialSeverity === "2" ? "Moderate" :
          formData.backPainInitialSeverity === "3" ? "Severe" : "Claimant has not specified initial severity"
        }</Text>
        <Text style={styles.text}>Current Severity: {
          formData.backPainCurrentSeverity === "1" ? "Mild" :
          formData.backPainCurrentSeverity === "2" ? "Moderate" :
          formData.backPainCurrentSeverity === "3" ? "Severe" :
          formData.backPainCurrentSeverity === "4" ? "Resolved" : "Claimant has not specified current severity"
        }</Text>
        {formData.backPainCurrentSeverity === "4" && formData.backPainResolveDays && (
          <Text style={styles.text}>Days to Resolve: {formData.backPainResolveDays}</Text>
        )}
      </>
    ) : (
      <Text style={styles.text}>Claimant has not reported any injuries related to back pain.</Text>
    )}

    {/* Headache */}
    <Text style={styles.subtitle}>Headache</Text>
    {formData.headache === "1" ? (
      <>
        <Text style={styles.text}>Onset: {
          formData.headacheStart === "1" ? "Same day" :
          formData.headacheStart === "2" ? "Next day" :
          formData.headacheStart === "3" ? "Few days later" : "Claimant has not specified onset"
        }</Text>
        <Text style={styles.text}>Initial Severity: {
          formData.headacheInitialSeverity === "1" ? "Mild" :
          formData.headacheInitialSeverity === "2" ? "Moderate" :
          formData.headacheInitialSeverity === "3" ? "Severe" : "Claimant has not specified initial severity"
        }</Text>
        <Text style={styles.text}>Current Severity: {
          formData.headacheCurrentSeverity === "1" ? "Mild" :
          formData.headacheCurrentSeverity === "2" ? "Moderate" :
          formData.headacheCurrentSeverity === "3" ? "Severe" :
          formData.headacheCurrentSeverity === "4" ? "Resolved" : "Claimant has not specified current severity"
        }</Text>
        {formData.headacheCurrentSeverity === "4" && formData.headacheResolveDays && (
          <Text style={styles.text}>Days to Resolve: {formData.headacheResolveDays}</Text>
        )}
      </>
    ) : (
      <Text style={styles.text}>Claimant has not reported any injuries related to headache.</Text>
    )}
    
    {/* Travel Anxiety */}
    <Text style={styles.subtitle}>Travel Anxiety</Text>
    {formData.travelAnxiety === "1" ? (
      <>
        <Text style={styles.text}>Initial Severity: {
          formData.anxietyInitialSeverity === "1" ? "Mild" :
          formData.anxietyInitialSeverity === "2" ? "Moderate" :
          formData.anxietyInitialSeverity === "3" ? "Severe" : "Claimant has not specified initial severity"
        }</Text>
        <Text style={styles.text}>Current Severity: {
          formData.anxietyCurrentSeverity === "1" ? "Mild" :
          formData.anxietyCurrentSeverity === "2" ? "Moderate" :
          formData.anxietyCurrentSeverity === "3" ? "Severe" :
          formData.anxietyCurrentSeverity === "4" ? "Resolved" : "Claimant has not specified current severity"
        }</Text>
        {formData.anxietyCurrentSeverity === "4" && formData.anxietyResolveDays && (
          <Text style={styles.text}>Days to Resolve: {formData.anxietyResolveDays}</Text>
        )}
        {formData.travelAnxietySymptoms && formData.travelAnxietySymptoms.length > 0 && (
          <Text style={styles.text}>Symptoms: {formData.travelAnxietySymptoms.join(", ")}</Text>
        )}
      </>
    ) : (
      <Text style={styles.text}>Claimant has not reported any issues related to travel anxiety.</Text>
    )}
    
    {/* Bruising */}
    <Text style={styles.subtitle}>Bruising</Text>
    {formData.hasBruising === "1" ? (
      <>
        <Text style={styles.text}>Location: {formData.bruisingLocation || "Not specified"}</Text>
        <Text style={styles.text}>Onset: {
          formData.bruisingNoticed === "1" ? "Same day" :
          formData.bruisingNoticed === "2" ? "Next day" :
          formData.bruisingNoticed === "3" ? "Few days later" : "Not specified"
        }</Text>
        <Text style={styles.text}>Initial Severity: {
          formData.bruisingInitialSeverity === "1" ? "Mild" :
          formData.bruisingInitialSeverity === "2" ? "Moderate" :
          formData.bruisingInitialSeverity === "3" ? "Severe" : "Not specified"
        }</Text>
        <Text style={styles.text}>Current Severity: {
          formData.bruisingCurrentSeverity === "1" ? "Mild" :
          formData.bruisingCurrentSeverity === "2" ? "Moderate" :
          formData.bruisingCurrentSeverity === "3" ? "Severe" :
          formData.bruisingCurrentSeverity === "4" ? "Resolved" : "Not specified"
        }</Text>
        {formData.bruisingCurrentSeverity === "4" && formData.bruisingResolveDays && (
          <Text style={styles.text}>Days to Resolve: {formData.bruisingResolveDays}</Text>
        )}
        <Text style={styles.text}>Visible Scar: {formData.hasVisibleScar === "1" ? "Yes" : "No"}</Text>
        <Text style={styles.text}>Mechanism: Direct impact during collision</Text>
      </>
    ) : (
      <Text style={styles.text}>Claimant has not reported any issues related to bruising or scarring.</Text>
    )}
  </View>
);
