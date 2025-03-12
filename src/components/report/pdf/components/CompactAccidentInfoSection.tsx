
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { styles } from './PDFStyles';
import { PDFRow } from './PDFRow';

interface AccidentData {
  accidentDate: string;
  accidentTime: string;
  vehiclePosition: string;
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

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>6. Accident Information</Text>
      <Text style={styles.accidentSubtitle}>6.1 Road Traffic Accident (Vehicle)</Text>
      
      <View style={styles.accidentTable}>
        <View style={styles.accidentRow}>
          <Text style={styles.accidentLabel}>Time of Accident:</Text>
          <Text style={styles.accidentValue}>{data.accidentDate} - {getTimeOfDay(data.accidentTime)}</Text>
        </View>
        
        <View style={styles.accidentRow}>
          <Text style={styles.accidentLabel}>Vehicle:</Text>
          <Text style={styles.accidentValue}>The claimant was in a van</Text>
        </View>
        
        <View style={styles.accidentRow}>
          <Text style={styles.accidentLabel}>Claimant's Position:</Text>
          <Text style={styles.accidentValue}>{getVehiclePosition(data.vehiclePosition)}</Text>
        </View>
        
        <View style={styles.accidentRow}>
          <Text style={styles.accidentLabel}>Location:</Text>
          <Text style={styles.accidentValue}>Minor road</Text>
        </View>
        
        <View style={styles.accidentRow}>
          <Text style={styles.accidentLabel}>Speed:</Text>
          <Text style={styles.accidentValue}>Moving moderately</Text>
        </View>
        
        <View style={styles.accidentRow}>
          <Text style={styles.accidentLabel}>Third Party:</Text>
          <Text style={styles.accidentValue}>A van</Text>
        </View>
        
        <View style={styles.accidentRow}>
          <Text style={styles.accidentLabel}>Description:</Text>
          <Text style={styles.accidentValue}>Hit in the front</Text>
        </View>
        
        <View style={styles.accidentRow}>
          <Text style={styles.accidentLabel}>Movement:</Text>
          <Text style={styles.accidentValue}>Forward and backward</Text>
        </View>
        
        <View style={styles.accidentRow}>
          <Text style={styles.accidentLabel}>Damage:</Text>
          <Text style={styles.accidentValue}>Moderate damage</Text>
        </View>
        
        <View style={styles.accidentRow}>
          <Text style={styles.accidentLabel}>Safety:</Text>
          <Text style={styles.accidentValue}>Wearing a seatbelt</Text>
        </View>
      </View>
    </View>
  );
};
