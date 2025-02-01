import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { formatDate } from '../../utils/dateUtils';

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

export const AccidentHistorySection = ({ formData }: { formData: any }) => {
  const getTimeOfDay = (time: string) => {
    switch (time) {
      case "1": return "morning";
      case "2": return "afternoon";
      case "3": return "evening";
      case "4": return "night";
      default: return "unspecified time";
    }
  };

  const getPosition = (position: string) => {
    switch (position) {
      case "1": return "driving the vehicle";
      case "2": return "seated in the front passenger seat";
      case "3": return "seated in the back of the vehicle";
      default: return "in an unspecified position";
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.subtitle}>History of the Incident in Question</Text>
      <Text style={styles.text}>
        {`On ${formatDate(formData.accidentDate)}, during the ${getTimeOfDay(formData.accidentTime)}, 
        the claimant was involved in a road traffic incident while ${getPosition(formData.vehiclePosition)}. 
        At the time of the incident, they were traveling in a ${formData.vehicleType || 'vehicle'} on a 
        ${formData.roadType || 'road'} when their vehicle was struck from the 
        ${formData.impactLocation || 'rear'} by a ${formData.otherVehicleType || 'vehicle'}.`}
      </Text>
      
      <Text style={styles.text}>
        {`The impact caused the claimant to be jolted ${formData.joltDirection || 'forward and backward'}. 
        ${formData.airbagsDeployed ? 'The airbags were deployed during the collision.' : 'The airbags did not deploy during the collision.'} 
        The claimant was wearing a seatbelt and the vehicle was equipped with a fitted headrest at the time of the incident.`}
      </Text>
      
      <Text style={styles.text}>
        {`Following the collision, ${formData.exitAssistance === "1" ? 
          'the claimant required assistance to exit the vehicle due to their injuries.' : 
          'the claimant was able to exit the vehicle independently.'}`}
      </Text>
    </View>
  );
};