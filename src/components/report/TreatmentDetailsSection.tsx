
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  section: {
    marginBottom: 15,
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.4,
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
  },
  column: {
    flex: 1,
    minWidth: '45%',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 7,
  }
});

export const TreatmentDetailsSection = ({ formData }: { formData: any }) => {
  // Get treatment related data
  const sceneOfAccidentTreatment = formData.sceneOfAccidentTreatment === "1";
  const wentToAE = formData.wentToAE === "1";
  const wentToGP = formData.wentToWalkInGP === "1";
  const physiotherapySessions = formData.physiotherapySessions;
  
  // Function to get readable text for current treatment
  const getCurrentTreatmentText = (treatment: string | undefined) => {
    switch (treatment) {
      case "1": return "Paracetamol";
      case "2": return "Ibuprofen/Naproxen";
      case "3": return "Codeine";
      case "4": return "other prescribed medicines";
      default: return "unspecified medication";
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Treatment Details</Text>
      <View style={styles.grid}>
        <View style={styles.column}>
          {/* Scene of accident treatment */}
          <Text style={styles.text}>
            {sceneOfAccidentTreatment ? 
              `The claimant received treatment at the scene of the accident.` :
              "The claimant did not receive treatment at the scene of the accident."}
            {sceneOfAccidentTreatment && formData.sceneOfAccidentTreatmentTypes && formData.sceneOfAccidentTreatmentTypes.length > 0 && 
              ` This included ${formData.sceneOfAccidentTreatmentTypes.join(", ")}.`}
          </Text>
          
          {/* Hospital attendance */}
          <Text style={styles.text}>
            {wentToAE ? 
              `The claimant attended ${formData.hospitalName || "hospital"} after the accident.` :
              "The claimant did not attend hospital after the accident."}
            {wentToAE && formData.hospitalTreatment && formData.hospitalTreatment.length > 0 && 
              ` Hospital treatment included ${formData.hospitalTreatment.join(", ")}.`}
          </Text>
        </View>
        
        <View style={styles.column}>
          {/* GP attendance */}
          <Text style={styles.text}>
            {wentToGP ? 
              `The claimant visited their GP ${formData.daysBeforeGPVisit || "some"} days after the accident.` :
              "The claimant did not visit their GP after the accident."}
            {wentToGP && formData.currentTreatment && 
              ` Current treatment consists of ${getCurrentTreatmentText(formData.currentTreatment)}.`}
          </Text>
          
          {/* Physiotherapy */}
          <Text style={styles.text}>
            {physiotherapySessions && parseInt(physiotherapySessions) > 0 ? 
              `The claimant received physiotherapy treatment. Number of sessions: ${physiotherapySessions}.` :
              "The claimant did not receive physiotherapy treatment."}
          </Text>
        </View>
      </View>
    </View>
  );
};
