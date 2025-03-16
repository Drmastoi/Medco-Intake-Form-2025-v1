
import { Text, View } from '@react-pdf/renderer';

interface AccidentDetailsSectionProps {
  formData: any;
  styles: any;
}

export const AccidentDetailsSection = ({ formData, styles }: AccidentDetailsSectionProps) => {
  // Helper functions to get readable text for form values
  const getTimeOfDayText = (time: string | undefined) => {
    if (!time) return "Not specified";
    const timeMap: Record<string, string> = {
      "1": "Morning",
      "2": "Afternoon",
      "3": "Evening",
      "4": "Night"
    };
    return timeMap[time] || "Not specified";
  };

  const getVehicleTypeText = (type: string | undefined) => {
    if (!type) return "Not specified";
    const typeMap: Record<string, string> = {
      "1": "Car",
      "2": "Van",
      "3": "Bus",
      "4": "Other"
    };
    return typeMap[type] || "Not specified";
  };

  const getVehiclePositionText = (position: string | undefined) => {
    if (!position) return "Not specified";
    const positionMap: Record<string, string> = {
      "1": "Right side seated Driver",
      "2": "Front Passenger",
      "3": "Back Passenger",
      "4": "Other"
    };
    return positionMap[position] || "Not specified";
  };

  const getVehicleLocationText = (location: string | undefined) => {
    if (!location) return "Not specified";
    const locationMap: Record<string, string> = {
      "1": "Main Road",
      "2": "Minor Road",
      "3": "Roundabout",
      "4": "Parked",
      "5": "Other"
    };
    return locationMap[location] || "Not specified";
  };

  const getImpactLocationText = (location: string | undefined) => {
    if (!location) return "unspecified location";
    const locationMap: Record<string, string> = {
      "1": "rear",
      "2": "front",
      "3": "passenger side",
      "4": "driver side"
    };
    return locationMap[location] || "unspecified location";
  };

  const getVehicleDamageText = (damage: string | undefined) => {
    if (!damage) return "unspecified damage";
    const damageMap: Record<string, string> = {
      "1": "minor damage",
      "2": "moderate damage",
      "3": "written off"
    };
    return damageMap[damage] || "unspecified damage";
  };

  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 5 - Accident/Incident Details</Text>
      
      <View style={styles.grayBackground}>
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5 }}>5.1 Road Traffic Accident (Vehicle)</Text>
      </View>
      
      <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Road Traffic Accident</Text>
      <View style={styles.grayBackground}>
        <View style={styles.rtaTable}>
          <View style={styles.rtaRow}>
            <Text style={styles.rtaLabel}>Time of Accident</Text>
            <Text style={styles.rtaValue}>
              {getTimeOfDayText(formData.accidentTime)}
            </Text>
          </View>
          
          <View style={styles.rtaRow}>
            <Text style={styles.rtaLabel}>Vehicle</Text>
            <Text style={styles.rtaValue}>
              {getVehicleTypeText(formData.claimantVehicle)}
            </Text>
          </View>
          
          <View style={styles.rtaRow}>
            <Text style={styles.rtaLabel}>Claimant's Position</Text>
            <Text style={styles.rtaValue}>
              {getVehiclePositionText(formData.claimantPosition)}
            </Text>
          </View>
          
          <View style={styles.rtaRow}>
            <Text style={styles.rtaLabel}>Vehicle Location</Text>
            <Text style={styles.rtaValue}>
              {getVehicleLocationText(formData.vehicleLocation)}
            </Text>
          </View>
          
          <View style={styles.rtaRow}>
            <Text style={styles.rtaLabel}>Speed</Text>
            <Text style={styles.rtaValue}>The vehicle was travelling forward at 20 MPH.</Text>
          </View>
          
          <View style={styles.rtaRow}>
            <Text style={styles.rtaLabel}>Third Party</Text>
            <Text style={styles.rtaValue}>
              {getVehicleTypeText(formData.otherVehicle)}
            </Text>
          </View>
          
          <View style={styles.rtaRow}>
            <Text style={styles.rtaLabel}>Description</Text>
            <Text style={styles.rtaValue}>The vehicle was struck at 10 MPH. The vehicle was struck by a Car.</Text>
          </View>
          
          <View style={styles.rtaRow}>
            <Text style={styles.rtaLabel}>Movement</Text>
            <Text style={styles.rtaValue}>The Claimant remembers being thrown forwards and backwards.</Text>
          </View>
          
          <View style={styles.rtaRow}>
            <Text style={styles.rtaLabel}>Damage</Text>
            <Text style={styles.rtaValue}>
              The Claimant's vehicle sustained a damage to the {getImpactLocationText(formData.impactLocation)}.
              The Claimant's vehicle status - {getVehicleDamageText(formData.vehicleDamage)}.
            </Text>
          </View>
          
          <View style={styles.rtaRow}>
            <Text style={styles.rtaLabel}>Safety</Text>
            <View>
              <Text style={styles.rtaValue}>Seat Belt: The Claimant was wearing a seat belt.</Text>
              <Text style={styles.rtaValue}>Head Rest: The vehicle was fitted with a Head rest.</Text>
              <Text style={styles.rtaValue}>Air Bags: Unable to recollect</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
