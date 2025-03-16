
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
  paragraph: {
    marginBottom: 10,
  },
});

export const AccidentInfoSection = ({ formData }: { formData: any }) => {
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

  const getRoadLocation = (location: string) => {
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

  return (
    <View style={styles.section}>
      <Text style={styles.subtitle}>Accident Information</Text>
      
      <View style={styles.paragraph}>
        <Text style={styles.text}>
          The incident occurred on {formatDate(formData.accidentDate)} during the {getTimeOfDay(formData.accidentTime)}. 
          The claimant was driving a {getVehicleType(formData.claimantVehicle)} {getRoadLocation(formData.vehicleLocation)} 
          when their vehicle was impacted on the {getImpactLocation(formData.impactLocation)}. 
          As a result of the collision, the claimant's vehicle sustained {getDamageLevel(formData.vehicleDamage)}.
        </Text>
      </View>

      <View style={styles.paragraph}>
        <Text style={styles.text}>
          The other vehicle involved in the incident was a {getVehicleType(formData.otherVehicle)}. 
          This collision occurred {getRoadLocation(formData.vehicleLocation)}, resulting in 
          {formData.vehicleDamage === "3" ? " the claimant's vehicle being written off" : 
           ` ${getDamageLevel(formData.vehicleDamage)} to the claimant's vehicle`}.
        </Text>
      </View>
    </View>
  );
};
