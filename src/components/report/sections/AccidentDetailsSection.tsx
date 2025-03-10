
import { Text, View } from '@react-pdf/renderer';

interface AccidentDetailsSectionProps {
  formData: any;
  styles: any;
}

export const AccidentDetailsSection = ({ formData, styles }: AccidentDetailsSectionProps) => {
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
              {formData.accidentTime === "1" ? "Morning" :
               formData.accidentTime === "2" ? "Afternoon" :
               formData.accidentTime === "3" ? "Evening" :
               formData.accidentTime === "4" ? "Night" : "Not specified"}
            </Text>
          </View>
          
          <View style={styles.rtaRow}>
            <Text style={styles.rtaLabel}>Vehicle</Text>
            <Text style={styles.rtaValue}>
              {formData.claimantVehicle === "1" ? "Car" :
               formData.claimantVehicle === "2" ? "Van" :
               formData.claimantVehicle === "3" ? "Bus" : 
               formData.claimantVehicle === "4" ? "Other" : "Not specified"}
            </Text>
          </View>
          
          <View style={styles.rtaRow}>
            <Text style={styles.rtaLabel}>Claimant's Position</Text>
            <Text style={styles.rtaValue}>
              {formData.claimantPosition === "1" ? "Right side seated Driver" : 
               formData.claimantPosition === "2" ? "Front Passenger" : 
               formData.claimantPosition === "3" ? "Back Passenger" :
               formData.claimantPosition === "4" ? "Other" : "Not specified"}
            </Text>
          </View>
          
          <View style={styles.rtaRow}>
            <Text style={styles.rtaLabel}>Vehicle Location</Text>
            <Text style={styles.rtaValue}>
              {formData.vehicleLocation === "1" ? "Main Road" :
               formData.vehicleLocation === "2" ? "Minor Road" :
               formData.vehicleLocation === "3" ? "Roundabout" :
               formData.vehicleLocation === "4" ? "Parked" :
               formData.vehicleLocation === "5" ? "Other" : "Not specified"}
            </Text>
          </View>
          
          <View style={styles.rtaRow}>
            <Text style={styles.rtaLabel}>Speed</Text>
            <Text style={styles.rtaValue}>The vehicle was travelling forward at 20 MPH.</Text>
          </View>
          
          <View style={styles.rtaRow}>
            <Text style={styles.rtaLabel}>Third Party</Text>
            <Text style={styles.rtaValue}>
              {formData.otherVehicle === "1" ? "Car" :
               formData.otherVehicle === "2" ? "Van" :
               formData.otherVehicle === "3" ? "Bus" : 
               formData.otherVehicle === "4" ? "Other" : "Not specified"}
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
              The Claimant's vehicle sustained a damage to the 
              {formData.impactLocation === "1" ? " rear" :
               formData.impactLocation === "2" ? " front" :
               formData.impactLocation === "3" ? " passenger side" :
               formData.impactLocation === "4" ? " driver side" : " unspecified location"}.
              The Claimant's vehicle status - 
              {formData.vehicleDamage === "3" ? "written off" :
               formData.vehicleDamage === "1" ? "minor damage" :
               formData.vehicleDamage === "2" ? "moderate damage" : "unspecified damage"}.
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
