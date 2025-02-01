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

export const TreatmentDetailsSection = ({ formData }: { formData: any }) => {
  const getSceneOfAccidentTreatment = () => {
    if (formData.sceneOfAccidentTreatment === "1") {
      return `The claimant received treatment at the scene: ${formData.sceneOfAccidentTreatmentDetails || 'details not provided'}.`;
    }
    return "The claimant did not receive any treatment at the scene of the accident.";
  };

  const getWalkInGPDetails = () => {
    if (formData.wentToWalkInGP === "1") {
      return `The claimant attended a Walk-in clinic/GP ${formData.daysBeforeGPVisit || 'some'} days after the accident.`;
    }
    return "The claimant did not attend a Walk-in clinic/GP.";
  };

  const getCurrentTreatment = () => {
    const treatments = {
      "1": "Paracetamol",
      "2": "Ibuprofen/Naproxen",
      "3": "Codeine",
      "4": "Other prescribed medicines"
    };
    return treatments[formData.currentTreatment as keyof typeof treatments] || "No specific medication";
  };

  return (
    <View style={styles.section}>
      <Text style={styles.subtitle}>Treatment after the Accident</Text>
      
      <Text style={styles.text}>
        {getSceneOfAccidentTreatment()}
      </Text>
      
      <Text style={styles.text}>
        {getWalkInGPDetails()}
      </Text>
      
      <Text style={styles.text}>
        {`The claimant was advised on ${getCurrentTreatment()}, rest, and exercises.`}
      </Text>
      
      <Text style={styles.text}>
        {`Number of Physiotherapy Sessions received so far: ${formData.physiotherapySessions || '0'}`}
      </Text>
    </View>
  );
};