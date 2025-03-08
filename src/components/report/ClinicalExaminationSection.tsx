
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
    width: '100%',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    minHeight: 20,
    padding: 5,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 10,
  },
  cell: {
    flex: 1,
    fontSize: 10,
  },
  symptomList: {
    marginLeft: 10,
  }
});

const getTravelAnxietySymptomLabel = (id: string) => {
  const labels: { [key: string]: string } = {
    "cautious-driver": "Being a more cautious driver",
    "frequent-mirror-checking": "Looking in the mirror more frequently",
    "avoid-accident-road": "Avoiding the road where the accident happened",
    "avoid-passenger": "Avoiding being a passenger in a car",
    "avoid-driving": "Avoiding driving a car",
    "panic-attacks": "Getting panic attacks when in a car",
    "passenger-anxiety": "Anxiety when traveling as a passenger",
    "busy-road-anxiety": "Anxiety on busy roads or highways",
  };
  return labels[id] || id;
};

export const ClinicalExaminationSection = ({ formData }: { formData: any }) => (
  <View style={styles.section}>
    <Text style={styles.subtitle}>Clinical Examination</Text>
    
    {/* Neck Pain */}
    <Text style={styles.subtitle}>1. Neck Pain</Text>
    <Text style={styles.text}>Present: {formData.neckPain === "1" ? "Yes" : "No"}</Text>
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
        <Text style={styles.text}>Duration: {formData.neckPainResolveDays || "_______"} days</Text>
        <Text style={styles.text}>Associated Symptoms: {formData.neckAssociatedSymptoms || "_______"}</Text>
      </>
    )}

    {/* Shoulder Pain */}
    <Text style={styles.subtitle}>2. Shoulder Pain</Text>
    <Text style={styles.text}>Present: {formData.shoulderPain === "1" ? "Yes" : "No"}</Text>
    {formData.shoulderPain === "1" && (
      <>
        <Text style={styles.text}>Side Affected: {
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
        <Text style={styles.text}>Duration: {formData.shoulderPainResolveDays || "_______"} days</Text>
        <Text style={styles.text}>Movement Restriction: {formData.shoulderMovementRestriction || "_______"}</Text>
      </>
    )}

    {/* Back Pain */}
    <Text style={styles.subtitle}>3. Back Pain</Text>
    <Text style={styles.text}>Present: {formData.backPain === "1" ? "Yes" : "No"}</Text>
    {formData.backPain === "1" && (
      <>
        <Text style={styles.text}>Location: {
          formData.backLocation === "1" ? "Upper back" :
          formData.backLocation === "2" ? "Middle Back" :
          formData.backLocation === "3" ? "Lower Back" :
          formData.backLocation === "4" ? "All over back" : "_______"
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
        <Text style={styles.text}>Duration: {formData.backPainResolveDays || "_______"} days</Text>
        <Text style={styles.text}>Movement Restriction: {formData.backMovementRestriction || "_______"}</Text>
      </>
    )}

    {/* Psychological Impact */}
    <Text style={styles.subtitle}>4. Psychological Impact</Text>
    <Text style={styles.text}>Travel Anxiety: {formData.travelAnxiety === "1" ? "Present" : "Not Present"}</Text>
    {formData.travelAnxiety === "1" && (
      <>
        <Text style={styles.text}>Currently Driving: {formData.currentlyDriving === "1" ? "Yes" : "No"}</Text>
        <Text style={styles.text}>More Cautious: {formData.moreCautious === "1" ? "Yes" : "No"}</Text>
        <Text style={styles.text}>Checking Mirrors More: {formData.checkingMirrors === "1" ? "Yes" : "No"}</Text>
        <Text style={styles.text}>Prevented from Driving: {formData.preventedDriving === "1" ? "Yes" : "No"}</Text>
        <Text style={styles.text}>Duration of Anxiety: {formData.anxietyDuration || "_______"} days</Text>
        
        {formData.travelAnxietySymptoms && formData.travelAnxietySymptoms.length > 0 && (
          <>
            <Text style={styles.text}>Travel Anxiety Symptoms:</Text>
            <View style={styles.symptomList}>
              {formData.travelAnxietySymptoms.map((symptom: string, index: number) => (
                symptom !== 'other' ? (
                  <Text key={index} style={styles.text}>• {getTravelAnxietySymptomLabel(symptom)}</Text>
                ) : null
              ))}
              {formData.travelAnxietySymptoms.includes('other') && formData.otherTravelAnxietySymptom && (
                <Text style={styles.text}>• {formData.otherTravelAnxietySymptom}</Text>
              )}
            </View>
          </>
        )}
      </>
    )}
  </View>
);
