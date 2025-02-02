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
  boldLabel: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.4,
    fontWeight: 'bold',
    display: 'flex'  // Changed from 'inline' to 'flex'
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

const getPrognosis = (severity: string, resolveDays: string | undefined) => {
  if (severity === "4" && resolveDays) {
    return `${resolveDays} DAYS`;
  }
  
  switch (severity) {
    case "1": return "3 MONTHS";
    case "2": return "6 MONTHS";
    case "3": return "9 MONTHS";
    default: return "6 MONTHS";
  }
};

const getTreatmentRecommendation = (severity: string) => {
  if (severity === "4") {
    return "Pain killers if required";
  }
  return "Pain management: Over-the-counter pain medication and ice therapy recommended\nPhysiotherapy: Recommended - Number of sessions to be decided by the referred expert";
};

export const InjuriesAndSymptomsSection = ({ formData }: { formData: any }) => {
  const mechanism = getImpactMechanism(formData.vehiclePosition);
  const whiplashMechanism = `Due to motor vehicle collision and ${mechanism}`;
  const nonWhiplashMechanism = "It is classified as non-whiplash injury and falls with in subsection 1.3 of the civil liability act 2018. The mechanism of the injury is due to impact with steering wheel/ seat belt / console.";

  return (
    <View style={styles.section}>
      {formData.neckPain === "1" && (
        <View>
          <Text style={styles.subtitle}>NECK PAIN</Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Onset: </Text>
            {getOnsetText(formData.neckPainStart)}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Initial Severity: </Text>
            {getSeverityText(formData.neckPainInitialSeverity)}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Current Severity: </Text>
            {getSeverityText(formData.neckPainCurrentSeverity)}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Classification: </Text>
            Whiplash injury
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Causation/Mechanism: </Text>
            {whiplashMechanism}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Examination:</Text>
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Palpation: </Text>
            {getSeverityText(formData.neckPainCurrentSeverity)} tenderness in the para cervical muscles
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Range of Motion: </Text>
            Flexion and extension limited due to pain
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Neurological Assessment: </Text>
            normal
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Treatment Recommendations:</Text>
          </Text>
          <Text style={styles.text}>{getTreatmentRecommendation(formData.neckPainCurrentSeverity)}</Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Prognosis: </Text>
            From the date of accident: {getPrognosis(formData.neckPainCurrentSeverity, formData.neckPainResolveDays)}
          </Text>
        </View>
      )}

      {formData.shoulderPain === "1" && (
        <View>
          <Text style={styles.subtitle}>SHOULDER PAIN</Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Onset: </Text>
            {getOnsetText(formData.shoulderPainStart)}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Initial Severity: </Text>
            {getSeverityText(formData.shoulderPainInitialSeverity)}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Current Severity: </Text>
            {getSeverityText(formData.shoulderPainCurrentSeverity)}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Classification: </Text>
            Whiplash injury
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Causation/Mechanism: </Text>
            {whiplashMechanism}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Examination:</Text>
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Palpation: </Text>
            {getSeverityText(formData.shoulderPainCurrentSeverity)} tenderness in affected area
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Range of Motion: </Text>
            Limited due to pain
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Neurological Assessment: </Text>
            normal
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Treatment Recommendations:</Text>
          </Text>
          <Text style={styles.text}>{getTreatmentRecommendation(formData.shoulderPainCurrentSeverity)}</Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Prognosis: </Text>
            From the date of accident: {getPrognosis(formData.shoulderPainCurrentSeverity, formData.shoulderPainResolveDays)}
          </Text>
        </View>
      )}

      {formData.backPain === "1" && (
        <View>
          <Text style={styles.subtitle}>BACK PAIN</Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Onset: </Text>
            {getOnsetText(formData.backPainStart)}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Initial Severity: </Text>
            {getSeverityText(formData.backPainInitialSeverity)}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Current Severity: </Text>
            {getSeverityText(formData.backPainCurrentSeverity)}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Classification: </Text>
            Whiplash injury
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Causation/Mechanism: </Text>
            {whiplashMechanism}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Examination:</Text>
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Palpation: </Text>
            {getSeverityText(formData.backPainCurrentSeverity)} tenderness in affected area
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Range of Motion: </Text>
            Limited due to pain
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Neurological Assessment: </Text>
            normal
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Treatment Recommendations:</Text>
          </Text>
          <Text style={styles.text}>{getTreatmentRecommendation(formData.backPainCurrentSeverity)}</Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Prognosis: </Text>
            From the date of accident: {getPrognosis(formData.backPainCurrentSeverity, formData.backPainResolveDays)}
          </Text>
        </View>
      )}

      {formData.headache === "1" && (
        <View>
          <Text style={styles.subtitle}>HEADACHE</Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Onset: </Text>
            {getOnsetText(formData.headacheStart)}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Initial Severity: </Text>
            {getSeverityText(formData.headacheInitialSeverity)}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Current Severity: </Text>
            {getSeverityText(formData.headacheCurrentSeverity)}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Classification: </Text>
            Non-whiplash injury
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Causation/Mechanism: </Text>
            {nonWhiplashMechanism}
          </Text>
          <Text style={styles.text}>Past History: {formData.headachePastHistory || "No history of previous headaches"}</Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Examination: </Text>
            Mental State and neurological examination and is normal
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Treatment Recommendations: </Text>
            Self-Resolving condition. Take simple pain killers as and when required
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Prognosis: </Text>
            From the date of accident: {getPrognosis(formData.headacheCurrentSeverity, formData.headacheResolveDays)}
          </Text>
        </View>
      )}

      {formData.travelAnxiety === "1" && (
        <View>
          <Text style={styles.subtitle}>TRAVEL ANXIETY</Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Onset: </Text>
            {getOnsetText(formData.anxietyStart)}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Initial Severity: </Text>
            {getSeverityText(formData.anxietyInitialSeverity)}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Current Severity: </Text>
            {getSeverityText(formData.anxietyCurrentSeverity)}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Classification: </Text>
            Non-whiplash injury
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Causation/Mechanism: </Text>
            {nonWhiplashMechanism}
          </Text>
          <Text style={styles.text}>Past History: {formData.anxietyPastHistory || "No history of previous anxiety"}</Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Examination: </Text>
            Mental State examination is normal
          </Text>
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
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Treatment Recommendations: </Text>
            Self-Resolving condition
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldLabel}>Prognosis: </Text>
            From the date of accident: {getPrognosis(formData.anxietyCurrentSeverity, formData.anxietyResolveDays)}
          </Text>
        </View>
      )}
    </View>
  );
};