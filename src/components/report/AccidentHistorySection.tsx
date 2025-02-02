import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  section: {
    marginBottom: 15,
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.4,
  },
  paragraph: {
    marginBottom: 10,
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

  const getVehicleType = (type: string) => {
    switch (type) {
      case "1": return "car";
      case "2": return "van";
      case "3": return "bus";
      case "4": return "other vehicle";
      default: return "unspecified vehicle";
    }
  };

  const getImpactLocation = (location: string) => {
    switch (location) {
      case "1": return "rear";
      case "2": return "front";
      case "3": return "passenger side";
      case "4": return "driver side";
      default: return "unspecified location";
    }
  };

  const getVehicleLocation = (location: string) => {
    switch (location) {
      case "1": return "on a main road";
      case "2": return "on a minor road";
      case "3": return "at a roundabout";
      default: return "at an unspecified location";
    }
  };

  const getDamageLevel = (damage: string) => {
    switch (damage) {
      case "1": return "mild damage";
      case "2": return "moderate damage";
      case "3": return "was written off";
      default: return "unspecified damage";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "an unspecified date";
    try {
      return format(new Date(dateString), "do MMMM yyyy");
    } catch {
      return dateString;
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.paragraph}>
        {`The incident occurred on ${formatDate(formData.accidentDate)} during the ${getTimeOfDay(formData.accidentTime)}. 
        The claimant was driving a ${getVehicleType(formData.claimantVehicle)} ${getVehicleLocation(formData.vehicleLocation)} 
        when their vehicle was impacted on the ${getImpactLocation(formData.impactLocation)}. 
        As a result of the collision, the claimant's vehicle sustained ${getDamageLevel(formData.vehicleDamage)}.`}
      </Text>

      <Text style={styles.paragraph}>
        {`The other vehicle involved in the incident was a ${getVehicleType(formData.otherVehicle)}. 
        This collision occurred ${getVehicleLocation(formData.vehicleLocation)}, resulting in 
        ${formData.vehicleDamage === "3" ? "the claimant's vehicle being written off" : 
        `${getDamageLevel(formData.vehicleDamage)} to the claimant's vehicle`}.`}
      </Text>
    </View>
  );
};