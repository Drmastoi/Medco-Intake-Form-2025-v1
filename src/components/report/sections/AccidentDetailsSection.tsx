
import { Text, View } from '@react-pdf/renderer';

interface AccidentDetailsSectionProps {
  formData: any;
  styles: any;
}

export const AccidentDetailsSection = ({ formData, styles }: AccidentDetailsSectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 7 - Accident/Incident Details</Text>
      
      <View style={styles.grayBackground}>
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5 }}>7.1 Road Traffic Accident (Vehicle)</Text>
      </View>
      
      <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Road Traffic Accident</Text>
      <View style={styles.grayBackground}>
        <View style={styles.fieldRow}>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Time of Accident:</Text>
            <Text style={styles.text}>
              {formData.accidentTime === "1" ? "Morning" :
               formData.accidentTime === "2" ? "Afternoon" :
               formData.accidentTime === "3" ? "Evening" :
               formData.accidentTime === "4" ? "Night" : "Not specified"}
            </Text>
          </View>
        </View>
        
        <View style={styles.fieldRow}>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Claimant's vehicle:</Text>
            <Text style={styles.text}>
              {formData.claimantVehicle === "1" ? "Car" :
               formData.claimantVehicle === "2" ? "Van" :
               formData.claimantVehicle === "3" ? "Bus" : 
               formData.claimantVehicle === "4" ? "Other" : "Not specified"}
            </Text>
          </View>
        </View>
        
        <View style={styles.fieldRow}>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Claimant's Position:</Text>
            <Text style={styles.text}>
              {formData.claimantPosition === "1" ? "Driver" : 
               formData.claimantPosition === "2" ? "Front Passenger" : 
               formData.claimantPosition === "3" ? "Back Passenger" :
               formData.claimantPosition === "4" ? "Other" : "Not specified"}
            </Text>
          </View>
        </View>
        
        <View style={styles.fieldRow}>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Vehicle Location:</Text>
            <Text style={styles.text}>
              {formData.vehicleLocation === "1" ? "Main Road" :
               formData.vehicleLocation === "2" ? "Minor Road" :
               formData.vehicleLocation === "3" ? "Roundabout" :
               formData.vehicleLocation === "4" ? "Parked" :
               formData.vehicleLocation === "5" ? "Other" : "Not specified"}
            </Text>
          </View>
        </View>
        
        <View style={styles.fieldRow}>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Third Party vehicle type:</Text>
            <Text style={styles.text}>
              {formData.otherVehicle === "1" ? "Car" :
               formData.otherVehicle === "2" ? "Van" :
               formData.otherVehicle === "3" ? "Bus" : 
               formData.otherVehicle === "4" ? "Other" : "Not specified"}
            </Text>
          </View>
        </View>
        
        <View style={styles.fieldRow}>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Description:</Text>
            <Text style={styles.text}>
              Movement: The Claimant remembers being thrown forwards and backwards.
            </Text>
          </View>
        </View>
        
        <View style={styles.fieldRow}>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Damage:</Text>
            <Text style={styles.text}>
              The Claimant's vehicle sustained a damage to the 
              {formData.impactLocation === "1" ? " rear" :
               formData.impactLocation === "2" ? " front" :
               formData.impactLocation === "3" ? " passenger side" :
               formData.impactLocation === "4" ? " driver side" : " unspecified location"}.
              The Claimant's vehicle status - 
              {formData.vehicleDamage === "1" ? "minor damage" :
               formData.vehicleDamage === "2" ? "moderate damage" :
               formData.vehicleDamage === "3" ? "written off" : "unspecified damage"}.
            </Text>
          </View>
        </View>
        
        <View style={styles.fieldRow}>
          <View style={styles.fieldColumn}>
            <Text style={styles.fieldLabel}>Safety:</Text>
            <Text style={styles.text}>
              Seat Belt: The Claimant was wearing a seat belt.{"\n"}
              Head Rest: The vehicle was fitted with a Head rest.{"\n"}
              Air Bags: Unable to recollect
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
