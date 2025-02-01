import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { formatDate } from '../../utils/dateUtils';

const styles = StyleSheet.create({
  section: {
    marginBottom: 15,
    fontFamily: 'Helvetica',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    lineHeight: 1.4,
    fontFamily: 'Helvetica',
  },
});

export const AccidentInfoSection = ({ formData }: { formData: any }) => (
  <View style={styles.section}>
    <Text style={styles.subtitle}>Accident Information</Text>
    <Text style={styles.text}>Date of Accident: {formatDate(formData.accidentDate)}</Text>
    <Text style={styles.text}>Time of Day: {
      formData.accidentTime === "1" ? "Morning" :
      formData.accidentTime === "2" ? "Afternoon" :
      formData.accidentTime === "3" ? "Evening" :
      formData.accidentTime === "4" ? "Night" : "Claimant has not specified time of accident"
    }</Text>
    <Text style={styles.text}>Position in Vehicle: {
      formData.vehiclePosition === "1" ? "Driver" :
      formData.vehiclePosition === "2" ? "Front Passenger" :
      formData.vehiclePosition === "3" ? "Back Passenger" : "Claimant has not specified position in vehicle"
    }</Text>
  </View>
);