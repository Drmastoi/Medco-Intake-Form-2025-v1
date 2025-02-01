import { Text, View, StyleSheet } from '@react-pdf/renderer';

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
  table: {
    display: 'flex',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    minHeight: 20,
    padding: 5,
  },
  tableCell: {
    flex: 1,
    padding: 3,
    fontSize: 10,
  },
});

export const ClinicalExaminationSection = ({ formData }: { formData: any }) => (
  <View style={styles.section}>
    <Text style={styles.subtitle}>Clinical Examination</Text>
    
    {/* Neck Pain */}
    <Text style={styles.text}>Neck Pain: {formData.neckPain === "1" ? "Present" : "Not Present"}</Text>
    {formData.neckPain === "1" && (
      <>
        <Text style={styles.text}>Onset: {
          formData.neckPainStart === "1" ? "Same day" :
          formData.neckPainStart === "2" ? "Next Day" :
          formData.neckPainStart === "3" ? "Few days Later" : "_______"
        }</Text>
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
        {formData.neckPainCurrentSeverity === "4" && (
          <Text style={styles.text}>Days to Resolution: {formData.neckPainResolveDays || "_______"}</Text>
        )}
      </>
    )}

    {/* Back Pain */}
    <Text style={styles.text}>Back Pain: {formData.backPain === "1" ? "Present" : "Not Present"}</Text>
    {formData.backPain === "1" && (
      <>
        <Text style={styles.text}>Location: {
          formData.backLocation === "1" ? "Upper back" :
          formData.backLocation === "2" ? "Middle Back" :
          formData.backLocation === "3" ? "Lower Back" :
          formData.backLocation === "4" ? "All over back" : "_______"
        }</Text>
        <Text style={styles.text}>Onset: {
          formData.backPainStart === "1" ? "Same day" :
          formData.backPainStart === "2" ? "Next Day" :
          formData.backPainStart === "3" ? "Few days Later" : "_______"
        }</Text>
        <Text style={styles.text}>Initial Severity: {
          formData.backPainInitialSeverity === "1" ? "Mild" :
          formData.backPainInitialSeverity === "2" ? "Moderate" :
          formData.backPainInitialSeverity === "3" ? "Severe" : "_______"
        }</Text>
        <Text style={styles.text}>Current Severity: {
          formData.backPainCurrentSeverity === "1" ? "Mild" :
          formData.backPainCurrentSeverity === "2" ? "Moderate" :
          formData.backPainCurrentSeverity === "3" ? "Severe" :
          formData.backPainCurrentSeverity === "4" ? "Resolved" : "_______"
        }</Text>
      </>
    )}

    {/* Shoulder Pain */}
    <Text style={styles.text}>Shoulder Pain: {formData.shoulderPain === "1" ? "Present" : "Not Present"}</Text>
    {formData.shoulderPain === "1" && (
      <>
        <Text style={styles.text}>Side: {
          formData.shoulderSide === "1" ? "Left" :
          formData.shoulderSide === "2" ? "Right" :
          formData.shoulderSide === "3" ? "Both" : "_______"
        }</Text>
        <Text style={styles.text}>Initial Severity: {
          formData.shoulderPainInitialSeverity === "1" ? "Mild" :
          formData.shoulderPainInitialSeverity === "2" ? "Moderate" :
          formData.shoulderPainInitialSeverity === "3" ? "Severe" : "_______"
        }</Text>
        <Text style={styles.text}>Current Severity: {
          formData.shoulderPainCurrentSeverity === "1" ? "Mild" :
          formData.shoulderPainCurrentSeverity === "2" ? "Moderate" :
          formData.shoulderPainCurrentSeverity === "3" ? "Severe" :
          formData.shoulderPainCurrentSeverity === "4" ? "Resolved" : "_______"
        }</Text>
      </>
    )}

    {/* Headache */}
    <Text style={styles.text}>Headache: {formData.headache === "1" ? "Present" : "Not Present"}</Text>
    {formData.headache === "1" && (
      <>
        <Text style={styles.text}>Onset: {
          formData.headacheStart === "1" ? "Same day" :
          formData.headacheStart === "2" ? "Next Day" :
          formData.headacheStart === "3" ? "Few days Later" : "_______"
        }</Text>
        <Text style={styles.text}>Initial Severity: {
          formData.headacheInitialSeverity === "1" ? "Mild" :
          formData.headacheInitialSeverity === "2" ? "Moderate" :
          formData.headacheInitialSeverity === "3" ? "Severe" : "_______"
        }</Text>
        <Text style={styles.text}>Current Severity: {
          formData.headacheCurrentSeverity === "1" ? "Mild" :
          formData.headacheCurrentSeverity === "2" ? "Moderate" :
          formData.headacheCurrentSeverity === "3" ? "Severe" :
          formData.headacheCurrentSeverity === "4" ? "Resolved" : "_______"
        }</Text>
        <Text style={styles.text}>Past Medical History: {formData.headachePastHistory || "_______"}</Text>
      </>
    )}

    {/* Travel Anxiety */}
    <Text style={styles.text}>Travel Anxiety: {formData.travelAnxiety === "1" ? "Present" : "Not Present"}</Text>
    {formData.travelAnxiety === "1" && (
      <>
        <Text style={styles.text}>Currently Driving: {formData.currentlyDriving === "1" ? "Yes" : "No"}</Text>
        <Text style={styles.text}>More Cautious: {formData.moreCautious === "1" ? "Yes" : "No"}</Text>
        <Text style={styles.text}>Checking Mirrors: {formData.checkingMirrors === "1" ? "Yes" : "No"}</Text>
        <Text style={styles.text}>Prevented from Driving: {formData.preventedDriving === "1" ? "Yes" : "No"}</Text>
      </>
    )}

    {/* Bruising and Scarring */}
    <Text style={styles.text}>Bruising/Scarring: {formData.hasBruising === "1" ? "Present" : "Not Present"}</Text>
    {formData.hasBruising === "1" && (
      <>
        <Text style={styles.text}>Location: {formData.bruisingLocation || "_______"}</Text>
        <Text style={styles.text}>Noticed: {
          formData.bruisingNoticed === "1" ? "Same day" :
          formData.bruisingNoticed === "2" ? "Next Day" :
          formData.bruisingNoticed === "3" ? "Few days Later" : "_______"
        }</Text>
        <Text style={styles.text}>Visible Scar: {formData.hasVisibleScar === "1" ? "Yes" : "No"}</Text>
      </>
    )}
  </View>
);