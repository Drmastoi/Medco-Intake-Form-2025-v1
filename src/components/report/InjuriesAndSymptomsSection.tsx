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

      {formData.shoulderPain === "1" && (
        <View>
          <Text style={styles.subheading}>SHOULDER PAIN</Text>
          <Text style={styles.text}>Classification: Whiplash injury</Text>
          <Text style={styles.text}>Side Affected: {
            formData.shoulderSide === "1" ? "Left" :
            formData.shoulderSide === "2" ? "Right" :
            formData.shoulderSide === "3" ? "Both" : "Unspecified"
          } shoulder</Text>
          <Text style={styles.text}>Causation/Mechanism: Due to motor vehicle collision and {mechanism}</Text>
          <Text style={styles.text}>Examination:</Text>
          <Text style={styles.text}>Palpation: {
            formData.shoulderPainCurrentSeverity === "1" ? "Mild" :
            formData.shoulderPainCurrentSeverity === "2" ? "Moderate" :
            formData.shoulderPainCurrentSeverity === "3" ? "Severe" : "Moderate"
          } tenderness in the shoulder region</Text>
          <Text style={styles.text}>Range of Motion: Limited due to pain</Text>
          <Text style={styles.text}>Treatment Recommendations:</Text>
          <Text style={styles.text}>Pain management: Over-the-counter pain medication and ice therapy recommended</Text>
          <Text style={styles.text}>Physiotherapy: Recommended - Number of sessions to be decided by the referred expert</Text>
          <Text style={styles.text}>Prognosis: From the date of accident: {getPrognosis(formData.shoulderPainCurrentSeverity)}</Text>
        </View>
      )}

      {formData.backPain === "1" && (
        <View>
          <Text style={styles.subheading}>BACK PAIN</Text>
          <Text style={styles.text}>Classification: Whiplash injury</Text>
          <Text style={styles.text}>Location: {
            formData.backLocation === "1" ? "Upper back" :
            formData.backLocation === "2" ? "Middle Back" :
            formData.backLocation === "3" ? "Lower Back" :
            formData.backLocation === "4" ? "All over back" : "Back"
          }</Text>
          <Text style={styles.text}>Causation/Mechanism: Due to motor vehicle collision and {mechanism}</Text>
          <Text style={styles.text}>Examination:</Text>
          <Text style={styles.text}>Palpation: {
            formData.backPainCurrentSeverity === "1" ? "Mild" :
            formData.backPainCurrentSeverity === "2" ? "Moderate" :
            formData.backPainCurrentSeverity === "3" ? "Severe" : "Moderate"
          } tenderness in the affected region</Text>
          <Text style={styles.text}>Range of Motion: Limited due to pain</Text>
          <Text style={styles.text}>Treatment Recommendations:</Text>
          <Text style={styles.text}>Pain management: Over-the-counter pain medication and ice therapy recommended</Text>
          <Text style={styles.text}>Physiotherapy: Recommended - Number of sessions to be decided by the referred expert</Text>
          <Text style={styles.text}>Prognosis: From the date of accident: {getPrognosis(formData.backPainCurrentSeverity)}</Text>
        </View>
      )}
    </View>
  );
};