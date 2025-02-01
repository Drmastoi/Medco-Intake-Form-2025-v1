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

export const AccidentHistorySection = ({ formData }: { formData: any }) => (
  <View style={styles.section}>
    <Text style={styles.text}>
      Date of Accident: {formData.accidentDate || "Not provided"}
    </Text>
    <Text style={styles.text}>
      Time of Day: {
        formData.accidentTime === "1" ? "Morning" :
        formData.accidentTime === "2" ? "Afternoon" :
        formData.accidentTime === "3" ? "Evening" :
        formData.accidentTime === "4" ? "Night" : "Not specified"
      }
    </Text>
    <Text style={styles.text}>
      Vehicle Position: {
        formData.vehiclePosition === "1" ? "Front impact" :
        formData.vehiclePosition === "2" ? "Side impact" :
        formData.vehiclePosition === "3" ? "Rear impact" : "Not specified"
      }
    </Text>
  </View>
);