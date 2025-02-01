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
      case "1": return "driver";
      case "2": return "front passenger";
      case "3": return "back passenger";
      default: return "unspecified position";
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.subtitle}>History of the Incident in Question</Text>
      <Text style={styles.text}>
        {`The claimant was involved in a road traffic accident on ${formatDate(formData.accidentDate)}. 
        The incident occurred during the ${getTimeOfDay(formData.accidentTime)} when the claimant was 
        the ${getPosition(formData.vehiclePosition)} of the vehicle.`}
      </Text>
      
      <Text style={styles.text}>
        {`The claimant was traveling in a ${formData.vehicleType || 'car'}. 
        At the time of the accident, the vehicle was ${formData.vehicleMovement || 'moving'} on a 
        ${formData.roadType || 'main road'}. The impact to the claimant's vehicle was from the 
        ${formData.impactLocation || 'rear'}.`}
      </Text>
      
      <Text style={styles.text}>
        {`The other vehicle involved was a ${formData.otherVehicleType || 'car'}. 
        During the collision, the claimant was jolted ${formData.joltDirection || 'forward'}. 
        ${formData.airbagsDeployed ? 'The airbags were deployed.' : 'The airbags did not deploy.'}`}
      </Text>
      
      <Text style={styles.text}>
        {`The claimant was wearing a seatbelt at the time of the accident, and the vehicle was equipped 
        with a fitted headrest. ${formData.exitAssistance ? 'The claimant required assistance to exit the vehicle.' 
        : 'The claimant was able to exit the vehicle without assistance.'}`}
      </Text>
    </View>
  );
};