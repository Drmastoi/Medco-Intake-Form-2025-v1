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
});

export const TreatmentDetailsSection = ({ formData }: { formData: any }) => (
  <View style={styles.section}>
    <Text style={styles.text}>
      {formData.hospitalAttendance === "1" ? 
        `The claimant attended ${formData.hospitalName || "hospital"} on ${formData.hospitalDate || "the date of accident"}.` :
        "The claimant did not attend hospital after the accident."}
    </Text>
    <Text style={styles.text}>
      {formData.gpAttendance === "1" ? 
        `The claimant visited their GP on ${formData.gpDate || "the specified date"}.` :
        "The claimant did not visit their GP after the accident."}
    </Text>
    <Text style={styles.text}>
      {formData.physiotherapy === "1" ? 
        `The claimant received physiotherapy treatment. Number of sessions: ${formData.physiotherapySessions || "not specified"}.` :
        "The claimant did not receive physiotherapy treatment."}
    </Text>
  </View>
);