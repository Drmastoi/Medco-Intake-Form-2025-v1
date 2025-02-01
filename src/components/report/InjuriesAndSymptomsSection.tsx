import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  section: {
    marginBottom: 15,
    fontFamily: 'Helvetica',
  },
  heading: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },
  subheading: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.4,
    fontFamily: 'Helvetica',
  },
});

const getOnsetText = (onset: string) => {
  switch (onset) {
    case "1": return "Same day";
    case "2": return "Next Day";
    case "3": return "Few days Later";
    default: return "Not specified";
  }
};

const getSeverityText = (severity: string) => {
  switch (severity) {
    case "1": return "Mild";
    case "2": return "Moderate";
    case "3": return "Severe";
    case "4": return "Resolved";
    default: return "Not specified";
  }
};

const getImpactMechanism = (vehiclePosition: string) => {
  switch (vehiclePosition) {
    case "1": return "jolted forward and backward";
    case "2": return "jolted sideways";
    case "3": return "jolted backwards and then forward";
    default: return "experienced impact";
  }
};

const getPrognosis = (severity: string) => {
  switch (severity) {
    case "1": return "3 MONTHS";
    case "2": return "6 MONTHS";
    case "3": return "9 MONTHS";
    default: return "6 MONTHS";
  }
};

export const InjuriesAndSymptomsSection = ({ formData }: { formData: any }) => {
  const mechanism = getImpactMechanism(formData.vehiclePosition);

  return (
    <View style={styles.section}>
      {formData.neckPain === "1" && (
        <View>
          <Text style={styles.subheading}>NECK PAIN</Text>
          <Text style={styles.text}>Onset: {getOnsetText(formData.neckPainStart)}</Text>
          <Text style={styles.text}>Initial Severity: {getSeverityText(formData.neckPainInitialSeverity)}</Text>
          <Text style={styles.text}>Current Severity: {getSeverityText(formData.neckPainCurrentSeverity)}</Text>
          <Text style={styles.text}>Classification: Whiplash injury</Text>
          <Text style={styles.text}>Causation/Mechanism: Due to motor vehicle collision and {mechanism}</Text>
          <Text style={styles.text}>Examination:</Text>
          <Text style={styles.text}>Palpation: {getSeverityText(formData.neckPainCurrentSeverity)} tenderness in the para cervical muscles</Text>
          <Text style={styles.text}>Range of Motion: Flexion and extension limited due to pain</Text>
          <Text style={styles.text}>Neurological Assessment: normal</Text>
          <Text style={styles.text}>Treatment Recommendations:</Text>
          <Text style={styles.text}>Pain management: Over-the-counter pain medication and ice therapy recommended</Text>
          <Text style={styles.text}>Physiotherapy: Recommended - Number of sessions to be decided by the referred expert</Text>
          <Text style={styles.text}>Prognosis: From the date of accident: {getPrognosis(formData.neckPainCurrentSeverity)}</Text>
        </View>
      )}

      {formData.shoulderPain === "1" && (
        <View>
          <Text style={styles.subheading}>SHOULDER PAIN</Text>
          <Text style={styles.text}>Onset: {getOnsetText(formData.shoulderPainStart)}</Text>
          <Text style={styles.text}>Initial Severity: {getSeverityText(formData.shoulderPainInitialSeverity)}</Text>
          <Text style={styles.text}>Current Severity: {getSeverityText(formData.shoulderPainCurrentSeverity)}</Text>
          <Text style={styles.text}>Classification: Whiplash injury</Text>
          <Text style={styles.text}>Causation/Mechanism: Due to motor vehicle collision and {mechanism}</Text>
          <Text style={styles.text}>Examination:</Text>
          <Text style={styles.text}>Palpation: {getSeverityText(formData.shoulderPainCurrentSeverity)} tenderness in affected area</Text>
          <Text style={styles.text}>Range of Motion: Limited due to pain</Text>
          <Text style={styles.text}>Neurological Assessment: normal</Text>
          <Text style={styles.text}>Treatment Recommendations:</Text>
          <Text style={styles.text}>Pain management: Over-the-counter pain medication and ice therapy recommended</Text>
          <Text style={styles.text}>Physiotherapy: Recommended - Number of sessions to be decided by the referred expert</Text>
          <Text style={styles.text}>Prognosis: From the date of accident: {getPrognosis(formData.shoulderPainCurrentSeverity)}</Text>
        </View>
      )}

      {formData.backPain === "1" && (
        <View>
          <Text style={styles.subheading}>BACK PAIN</Text>
          <Text style={styles.text}>Onset: {getOnsetText(formData.backPainStart)}</Text>
          <Text style={styles.text}>Initial Severity: {getSeverityText(formData.backPainInitialSeverity)}</Text>
          <Text style={styles.text}>Current Severity: {getSeverityText(formData.backPainCurrentSeverity)}</Text>
          <Text style={styles.text}>Classification: Whiplash injury</Text>
          <Text style={styles.text}>Causation/Mechanism: Due to motor vehicle collision and {mechanism}</Text>
          <Text style={styles.text}>Examination:</Text>
          <Text style={styles.text}>Palpation: {getSeverityText(formData.backPainCurrentSeverity)} tenderness in affected area</Text>
          <Text style={styles.text}>Range of Motion: Limited due to pain</Text>
          <Text style={styles.text}>Neurological Assessment: normal</Text>
          <Text style={styles.text}>Treatment Recommendations:</Text>
          <Text style={styles.text}>Pain management: Over-the-counter pain medication and ice therapy recommended</Text>
          <Text style={styles.text}>Physiotherapy: Recommended - Number of sessions to be decided by the referred expert</Text>
          <Text style={styles.text}>Prognosis: From the date of accident: {getPrognosis(formData.backPainCurrentSeverity)}</Text>
        </View>
      )}

      {formData.headache === "1" && (
        <View>
          <Text style={styles.subheading}>HEADACHE</Text>
          <Text style={styles.text}>Onset: {getOnsetText(formData.headacheStart)}</Text>
          <Text style={styles.text}>Initial Severity: {getSeverityText(formData.headacheInitialSeverity)}</Text>
          <Text style={styles.text}>Current Severity: {getSeverityText(formData.headacheCurrentSeverity)}</Text>
          <Text style={styles.text}>Classification: Neck whiplash Associated injury</Text>
          <Text style={styles.text}>Causation: Due to psychological trauma</Text>
          <Text style={styles.text}>Past History: {formData.headachePastHistory || "No history of previous headaches"}</Text>
          <Text style={styles.text}>Examination: Mental State and neurological examination and is normal</Text>
          <Text style={styles.text}>Treatment Recommendation: Self-Resolving condition. Take simple pain killers as and when required</Text>
          <Text style={styles.text}>Prognosis: From the date of accident: {getPrognosis(formData.headacheCurrentSeverity)}</Text>
        </View>
      )}

      {formData.travelAnxiety === "1" && (
        <View>
          <Text style={styles.subheading}>TRAVEL ANXIETY</Text>
          <Text style={styles.text}>Onset: {getOnsetText(formData.anxietyStart)}</Text>
          <Text style={styles.text}>Initial Severity: {getSeverityText(formData.anxietyInitialSeverity)}</Text>
          <Text style={styles.text}>Current Severity: {getSeverityText(formData.anxietyCurrentSeverity)}</Text>
          <Text style={styles.text}>Classification: Psychological trauma</Text>
          <Text style={styles.text}>Causation: Due to psychological trauma from the motor vehicle accident</Text>
          <Text style={styles.text}>Past History: {formData.anxietyPastHistory || "No history of previous anxiety"}</Text>
          <Text style={styles.text}>Examination: Mental State examination is normal</Text>
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
          <Text style={styles.text}>Prognosis: From the date of accident: {getPrognosis(formData.anxietyCurrentSeverity)}</Text>
        </View>
      )}
    </View>
  );
};
