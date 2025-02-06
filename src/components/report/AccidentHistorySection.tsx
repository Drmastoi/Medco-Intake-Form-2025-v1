
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  section: {
    marginBottom: 15,
  },
  paragraph: {
    fontSize: 10,
    lineHeight: 1.4,
    textAlign: 'justify',
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
      case "1": return "from behind";
      case "2": return "to the front";
      case "3": return "on the passenger side";
      case "4": return "on the driver's side";
      default: return "at an unspecified location";
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
      case "1": return "sustained mild damage";
      case "2": return "sustained moderate damage";
      case "3": return "was written off";
      default: return "sustained unspecified damage";
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
        {`On ${formatDate(formData.accidentDate)}, during the ${getTimeOfDay(formData.accidentTime)}, the claimant was involved in a road traffic accident while traveling in their ${getVehicleType(formData.claimantVehicle)} ${getVehicleLocation(formData.vehicleLocation)}. The collision occurred when another ${getVehicleType(formData.otherVehicle)} impacted the claimant's vehicle ${getImpactLocation(formData.impactLocation)}. As a consequence of the impact, the claimant's vehicle ${getDamageLevel(formData.vehicleDamage)}. The force of the collision was significant enough to cause injury to the claimant, who subsequently developed various symptoms. The circumstances of the accident suggest that the impact was unexpected and the claimant had no opportunity to brace for the collision.`}
      </Text>
    </View>
  );
};
