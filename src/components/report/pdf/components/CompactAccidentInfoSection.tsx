
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { styles } from './PDFStyles';
import { PDFRow } from './PDFRow';

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
  const getTimeOfDay = (time: string) => {
    switch(time) {
      case "Morning": return "Morning";
      case "Afternoon": return "Afternoon";
      case "Evening": return "Evening";
      case "Night": return "Night";
      default: return time; // Return the text if it's already converted
    }
  };

  // Helper to check if a value exists and is not empty
  const hasValue = (value: string | undefined): boolean => {
    return !!value && value.trim() !== "" && value !== "Not specified";
  };

  // Format vehicle position
  const getVehiclePosition = (position: string) => {
    return position === "driver" ? "Driver" : 
           position === "frontPassenger" ? "Front Passenger" : 
           position === "rearPassenger" ? "Rear Passenger" : position;
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>6. Accident Information</Text>
      <Text style={styles.accidentSubtitle}>6.1 Road Traffic Accident (Vehicle)</Text>
      
      <View style={styles.accidentTable}>
        <View style={styles.accidentRow}>
          <View style={styles.accidentCell}>
            <Text style={styles.accidentLabel}>Date of Accident:</Text>
            <Text style={styles.accidentValue}>{data.accidentDate}</Text>
          </View>
          <View style={styles.accidentCell}>
            <Text style={styles.accidentLabel}>Time of Day:</Text>
            <Text style={styles.accidentValue}>{getTimeOfDay(data.accidentTime)}</Text>
          </View>
        </View>
        
        <View style={styles.accidentRow}>
          <View style={styles.accidentCell}>
            <Text style={styles.accidentLabel}>Claimant Position:</Text>
            <Text style={styles.accidentValue}>{getVehiclePosition(data.vehiclePosition)}</Text>
          </View>
          {hasValue(data.vehicleStatus) && (
            <View style={styles.accidentCell}>
              <Text style={styles.accidentLabel}>Vehicle Status:</Text>
              <Text style={styles.accidentValue}>{data.vehicleStatus}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
