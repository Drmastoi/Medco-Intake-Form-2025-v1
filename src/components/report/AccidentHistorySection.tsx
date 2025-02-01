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
        the ${getPosition(formData.vehiclePosition)} of the vehicle. `}
      </Text>
    </View>
  );
};