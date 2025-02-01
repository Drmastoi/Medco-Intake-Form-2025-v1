import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  section: {
    marginBottom: 15,
  },
  heading: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subheading: {
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

const getImpactMechanism = (vehiclePosition: string) => {
  switch (vehiclePosition) {
    case "1": // Driver - assuming rear impact
      return "jolted forward and backward";
    case "2": // Front Passenger - assuming side impact
      return "jolted sideways";
    case "3": // Back Passenger - assuming collision
      return "jolted backwards and then forward";
    default:
      return "experienced impact";
  }
};

const getPrognosis = (severity: string) => {
  switch (severity) {
    case "1": return "3 MONTHS"; // Mild
    case "2": return "6 MONTHS"; // Moderate
    case "3": return "9 MONTHS"; // Severe
    default: return "6 MONTHS";
  }
};

const isWhiplashInjury = (injuryType: string) => {
  return ['neck', 'shoulder', 'back'].includes(injuryType.toLowerCase());
};

export const InjuriesAndSymptomsSection = ({ formData }: { formData: any }) => {
  const mechanism = getImpactMechanism(formData.vehiclePosition);

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Injuries/Symptoms and Present Position Reported by Claimant</Text>

      {formData.neckPain === "1" && (
        <View>
          <Text style={styles.subheading}>NECK PAIN</Text>
          <Text style={styles.text}>Classification: Whiplash injury</Text>
          <Text style={styles.text}>Causation/Mechanism: Due to motor vehicle collision and {mechanism}</Text>
          <Text style={styles.text}>Examination:</Text>
          <Text style={styles.text}>Palpation: {
            formData.neckPainCurrentSeverity === "1" ? "Mild" :
            formData.neckPainCurrentSeverity === "2" ? "Moderate" :
            formData.neckPainCurrentSeverity === "3" ? "Severe" : "Moderate"
          } tenderness in the para cervical muscles</Text>
          <Text style={styles.text}>Range of Motion: Flexion and extension limited due to pain</Text>
          <Text style={styles.text}>Neurological Assessment: normal</Text>
          <Text style={styles.text}>Treatment Recommendations:</Text>
          <Text style={styles.text}>Pain management: Over-the-counter pain medication and ice therapy recommended</Text>
          <Text style={styles.text}>Physiotherapy: Recommended - Number of sessions to be decided by the referred expert</Text>
          <Text style={styles.text}>Prognosis: From the date of accident: {getPrognosis(formData.neckPainCurrentSeverity)}</Text>
        </View>
      )}

      {formData.hasOtherInjury === "1" && (
        <View>
          <Text style={styles.subheading}>OTHER INJURY: {formData.injuryName}</Text>
          <Text style={styles.text}>Classification: {isWhiplashInjury(formData.injuryName) ? "Whiplash injury" : "Non-Whiplash injury"}</Text>
          <Text style={styles.text}>Causation/Mechanism: Due to sudden jolt and seat belt restriction</Text>
          <Text style={styles.text}>Examination:</Text>
          <Text style={styles.text}>Palpation: {
            formData.injuryCurrentSeverity === "1" ? "Mild" :
            formData.injuryCurrentSeverity === "2" ? "Moderate" :
            formData.injuryCurrentSeverity === "3" ? "Severe" : "Moderate"
          } tenderness in affected area</Text>
          <Text style={styles.text}>Range of Motion: Limited due to pain</Text>
          <Text style={styles.text}>Neurological Assessment: normal</Text>
          <Text style={styles.text}>Treatment Recommendations:</Text>
          <Text style={styles.text}>Pain management: Over-the-counter pain medication and ice therapy recommended</Text>
          <Text style={styles.text}>Physiotherapy: Recommended - Number of sessions to be decided by the referred expert</Text>
          <Text style={styles.text}>Prognosis: From the date of accident: {getPrognosis(formData.injuryCurrentSeverity)}</Text>
        </View>
      )}

      {formData.headache === "1" && (
        <View>
          <Text style={styles.subheading}>HEADACHE</Text>
          <Text style={styles.text}>Classification: Neck whiplash Associated injury</Text>
          <Text style={styles.text}>Causation: Due to psychological trauma</Text>
          <Text style={styles.text}>Past History: {formData.headachePastHistory || "There is no history of previous anxiety"}</Text>
          <Text style={styles.text}>Examination: Mental State and neurological examination and is normal</Text>
          <Text style={styles.text}>Clinical Features:</Text>
          <Text style={styles.text}>- Onset: {
            formData.headacheStart === "1" ? "Same day" :
            formData.headacheStart === "2" ? "Next day" :
            formData.headacheStart === "3" ? "Few days later" : "Not specified"
          }</Text>
          <Text style={styles.text}>- Initial Severity: {
            formData.headacheInitialSeverity === "1" ? "Mild" :
            formData.headacheInitialSeverity === "2" ? "Moderate" :
            formData.headacheInitialSeverity === "3" ? "Severe" : "Not specified"
          }</Text>
          <Text style={styles.text}>- Current Severity: {
            formData.headacheCurrentSeverity === "1" ? "Mild" :
            formData.headacheCurrentSeverity === "2" ? "Moderate" :
            formData.headacheCurrentSeverity === "3" ? "Severe" :
            formData.headacheCurrentSeverity === "4" ? "Resolved" : "Not specified"
          }</Text>
          <Text style={styles.text}>Treatment Recommendation: Self-Resolving condition. Take simple pain killers as and when required</Text>
          <Text style={styles.text}>Prognosis: From the date of accident: {getPrognosis(formData.headacheCurrentSeverity)}</Text>
        </View>
      )}

      {formData.travelAnxiety === "1" && (
        <View>
          <Text style={styles.subheading}>TRAVEL ANXIETY</Text>
          <Text style={styles.text}>Classification: Psychological trauma</Text>
          <Text style={styles.text}>Causation: Due to psychological trauma from the motor vehicle accident</Text>
          <Text style={styles.text}>Past History: {formData.anxietyPastHistory || "There is no history of previous anxiety"}</Text>
          <Text style={styles.text}>Examination: Mental State examination is normal</Text>
          <Text style={styles.text}>Clinical Features:</Text>
          <Text style={styles.text}>- Onset: {
            formData.anxietyStart === "1" ? "Same day" :
            formData.anxietyStart === "2" ? "Next day" :
            formData.anxietyStart === "3" ? "Few days later" : "Not specified"
          }</Text>
          <Text style={styles.text}>- Initial Severity: {
            formData.anxietyInitialSeverity === "1" ? "Mild" :
            formData.anxietyInitialSeverity === "2" ? "Moderate" :
            formData.anxietyInitialSeverity === "3" ? "Severe" : "Not specified"
          }</Text>
          <Text style={styles.text}>- Current Severity: {
            formData.anxietyCurrentSeverity === "1" ? "Mild" :
            formData.anxietyCurrentSeverity === "2" ? "Moderate" :
            formData.anxietyCurrentSeverity === "3" ? "Severe" :
            formData.anxietyCurrentSeverity === "4" ? "Resolved" : "Not specified"
          }</Text>
          {formData.currentlyDriving === "2" && (
            <Text style={styles.text}>- Patient has not returned to driving</Text>
          )}
          {formData.moreCautious === "1" && (
            <Text style={styles.text}>- Patient reports being more cautious while driving</Text>
          )}
          {formData.checkingMirrors === "1" && (
            <Text style={styles.text}>- Patient reports frequently checking mirrors and being hypervigilant</Text>
          )}
          {formData.preventedDriving === "1" && (
            <Text style={styles.text}>- Anxiety has prevented patient from driving for leisure and work</Text>
          )}
          <Text style={styles.text}>Treatment Recommendation: Self-Resolving condition</Text>
          <Text style={styles.text}>Prognosis: 3 months from the date of accident</Text>
        </View>
      )}
    </View>
  );
};