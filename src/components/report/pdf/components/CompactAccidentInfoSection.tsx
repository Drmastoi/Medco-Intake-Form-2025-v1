
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { styles } from './PDFStyles';

interface AccidentData {
  accidentDate: string;
  accidentTime: string;
  vehiclePosition: string;
  vehicleStatus?: string;
  vehicleLocation?: string;
  impactLocation?: string;
  vehicleDamage?: string;
  claimantPosition?: string;
  claimantVehicle?: string;
  otherVehicle?: string;
  accidentSummary?: string;
}

export const CompactAccidentInfoSection = ({ data }: { data: AccidentData }) => {
  // Convert accidentTime codes to readable text
  const getTimeOfDay = (code: string) => {
    switch (code) {
      case "1": return "Morning";
      case "2": return "Afternoon";
      case "3": return "Evening";
      case "4": return "Night";
      default: return "Unknown";
    }
  };

  // Convert vehicle position codes to readable text
  const getVehiclePosition = (code: string) => {
    switch (code) {
      case "1": return "Driver";
      case "2": return "Front Passenger";
      case "3": return "Rear Passenger";
      default: return "Unknown";
    }
  };

  // Convert vehicle type codes to readable text
  const getVehicleType = (code: string | undefined) => {
    switch (code) {
      case "1": return "car";
      case "2": return "van";
      case "3": return "bus";
      case "4": return "motorcycle";
      default: return "vehicle";
    }
  };

  // Convert impact location codes to readable text
  const getImpactLocation = (code: string | undefined) => {
    switch (code) {
      case "1": return "from behind";
      case "2": return "from the front";
      case "3": return "on the passenger side";
      case "4": return "on the driver side";
      default: return "in an unspecified location";
    }
  };

  // Convert damage severity codes to readable text
  const getDamageSeverity = (code: string | undefined) => {
    switch (code) {
      case "1": return "minor damage";
      case "2": return "moderate damage";
      case "3": return "severe damage (written off)";
      default: return "unspecified damage";
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Section 6 - Accident Information</Text>
      
      <View style={styles.accidentTable}>
        <View style={styles.accidentRow}>
          <Text style={styles.accidentLabel}>Date and Time:</Text>
          <Text style={styles.accidentValue}>{data.accidentDate} - {getTimeOfDay(data.accidentTime)}</Text>
        </View>
        
        <View style={styles.accidentRow}>
          <Text style={styles.accidentLabel}>Vehicle:</Text>
          <Text style={styles.accidentValue}>The claimant was in a {getVehicleType(data.claimantVehicle)}</Text>
        </View>
        
        <View style={styles.accidentRow}>
          <Text style={styles.accidentLabel}>Claimant's Position:</Text>
          <Text style={styles.accidentValue}>{getVehiclePosition(data.vehiclePosition)}</Text>
        </View>
        
        <View style={styles.accidentRow}>
          <Text style={styles.accidentLabel}>Impact Description:</Text>
          <Text style={styles.accidentValue}>The vehicle was hit {getImpactLocation(data.impactLocation)}</Text>
        </View>
        
        <View style={styles.accidentRow}>
          <Text style={styles.accidentLabel}>Third Party:</Text>
          <Text style={styles.accidentValue}>A {getVehicleType(data.otherVehicle)}</Text>
        </View>
        
        <View style={styles.accidentRow}>
          <Text style={styles.accidentLabel}>Damage:</Text>
          <Text style={styles.accidentValue}>{getDamageSeverity(data.vehicleDamage)}</Text>
        </View>
        
        <View style={styles.accidentRow}>
          <Text style={styles.accidentLabel}>Safety:</Text>
          <Text style={styles.accidentValue}>Wearing a seatbelt</Text>
        </View>
      </View>
      
      {data.accidentSummary && (
        <View style={{marginTop: 5, backgroundColor: '#f5f5f5', padding: 6}}>
          <Text style={{fontSize: 9, fontFamily: 'Helvetica-Bold', marginBottom: 2}}>
            Accident Summary:
          </Text>
          <Text style={{fontSize: 9, fontFamily: 'Helvetica'}}>
            {data.accidentSummary}
          </Text>
        </View>
      )}
    </View>
  );
};
