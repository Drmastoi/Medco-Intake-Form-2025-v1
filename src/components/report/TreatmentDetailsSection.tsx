
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  section: {
    marginBottom: 10,
  },
  text: {
    fontSize: 9,
    marginBottom: 3,
    lineHeight: 1.3,
    textAlign: 'justify',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  }
});

export const TreatmentDetailsSection = ({ formData }: { formData: any }) => (
  <View style={styles.section}>
    <View style={styles.content}>
      <Text style={styles.text}>
        {formData.hospitalAttendance === "1" ? 
          `The claimant attended ${formData.hospitalName || "hospital"} on ${formData.hospitalDate || "the date of accident"}. ` :
          "The claimant did not attend hospital after the accident. "}
        {formData.gpAttendance === "1" ? 
          `The claimant visited their GP on ${formData.gpDate || "the specified date"}. ` :
          "The claimant did not visit their GP after the accident. "}
        {formData.physiotherapy === "1" ? 
          `The claimant received physiotherapy treatment. Number of sessions: ${formData.physiotherapySessions || "not specified"}. ` :
          "The claimant did not receive physiotherapy treatment. "}
      </Text>

      <Text style={styles.text}>
        {formData.bruising === "1" ? 
          `The claimant experienced bruising following the accident. ${
            formData.bruisingLocation ? `Location: ${formData.bruisingLocation}. ` : ''
          }${
            formData.bruisingDuration ? `Duration: ${formData.bruisingDuration} days. ` : ''
          }` :
          "The claimant did not experience any bruising from the accident. "}
        {formData.bruisingNotes && `Additional notes on bruising: ${formData.bruisingNotes}`}
      </Text>
    </View>
  </View>
);
