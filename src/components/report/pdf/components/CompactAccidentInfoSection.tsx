
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { AccidentData } from '@/types/reportTypes';
import { styles } from './PDFStyles';

interface CompactAccidentInfoSectionProps {
  data: AccidentData;
}

/**
 * A compact version of the accident information section for page 1
 */
export const CompactAccidentInfoSection: React.FC<CompactAccidentInfoSectionProps> = ({ data }) => {
  
  // Helper functions for data formatting
  const getTimeOfDay = (time: string): string => {
    switch (time) {
      case "1": return "Morning";
      case "2": return "Afternoon";
      case "3": return "Evening";
      case "4": return "Night";
      default: return "Not specified";
    }
  };

  const getPosition = (position: string): string => {
    switch (position) {
      case "1": return "Right side seated Driver";
      case "2": return "Front Passenger";
      case "3": return "Back Passenger";
      case "4": return "Other position";
      default: return "Not specified";
    }
  };

  const getVehicleType = (type: string): string => {
    switch (type) {
      case "1": return "Car";
      case "2": return "Van";
      case "3": return "Bus";
      case "4": return "Other vehicle";
      default: return "Car";
    }
  };

  const getVehicleLocation = (location: string): string => {
    switch (location) {
      case "1": return "Main Road";
      case "2": return "Minor Road";
      case "3": return "Roundabout";
      case "4": return "Parked";
      case "5": return "Other location";
      default: return "Not specified";
    }
  };

  const getImpactLocation = (location: string): string => {
    switch (location) {
      case "1": return "rear";
      case "2": return "front";
      case "3": return "passenger side";
      case "4": return "driver side";
      default: return "unspecified location";
    }
  };

  const getVehicleStatus = (status: string): string => {
    switch (status) {
      case "1": return "stationary";
      case "2": return "moving slowly";
      case "3": return "moving moderately";
      case "4": return "moving at speed";
      default: return "unspecified motion state";
    }
  };

  const getVehicleDamage = (damage: string): string => {
    switch (damage) {
      case "1": return "minor damage";
      case "2": return "moderate damage";
      case "3": return "written off";
      default: return "unspecified damage";
    }
  };

  // Format the vehicle type for display
  const vehicleType = getVehicleType(data.claimantVehicle || "1");
  const otherVehicleType = getVehicleType(data.otherVehicle || "1");

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Section 7 - Accident/Incident Details</Text>
      
      <Text style={styles.accidentSubtitle}>7.1 Road Traffic Accident (Vehicle)</Text>
      
      <View style={styles.accidentGrayBox}>
        <Text style={styles.accidentSectionHeader}>Road Traffic Accident</Text>
      </View>
      
      <View style={styles.accidentTable}>
        <View style={styles.accidentRow}>
          <Text style={styles.accidentLabel}>Time of Accident</Text>
          <Text style={styles.accidentValue}>{getTimeOfDay(data.accidentTime)}</Text>
        </View>
        
        <View style={styles.accidentRow}>
          <Text style={styles.accidentLabel}>Vehicle</Text>
          <Text style={styles.accidentValue}>{vehicleType}</Text>
        </View>
        
        <View style={styles.accidentRow}>
          <Text style={styles.accidentLabel}>Claimant's Position</Text>
          <Text style={styles.accidentValue}>{data.claimantPosition ? getPosition(data.claimantPosition) : "Not specified"}</Text>
        </View>
        
        <View style={styles.accidentRow}>
          <Text style={styles.accidentLabel}>Vehicle Location</Text>
          <Text style={styles.accidentValue}>{data.vehicleLocation ? getVehicleLocation(data.vehicleLocation) : "Not specified"}</Text>
        </View>
        
        <View style={styles.accidentRow}>
          <Text style={styles.accidentLabel}>Speed</Text>
          <Text style={styles.accidentValue}>The vehicle was travelling forward at 20 MPH.</Text>
        </View>
        
        <View style={styles.accidentRow}>
          <Text style={styles.accidentLabel}>Third Party</Text>
          <Text style={styles.accidentValue}>{otherVehicleType}</Text>
        </View>
        
        <View style={styles.accidentRow}>
          <Text style={styles.accidentLabel}>Description</Text>
          <Text style={styles.accidentValue}>The vehicle was struck at 10 MPH. The vehicle was struck by a {otherVehicleType}.</Text>
        </View>
        
        <View style={styles.accidentRow}>
          <Text style={styles.accidentLabel}>Movement</Text>
          <Text style={styles.accidentValue}>The Claimant remembers being thrown forwards and backwards.</Text>
        </View>
        
        <View style={styles.accidentRow}>
          <Text style={styles.accidentLabel}>Damage</Text>
          <Text style={styles.accidentValue}>
            The Claimant's vehicle sustained a damage to the {data.impactLocation ? getImpactLocation(data.impactLocation) : "unspecified location"}.
            The Claimant's vehicle status - {data.vehicleDamage ? getVehicleDamage(data.vehicleDamage) : "unspecified damage"}.
          </Text>
        </View>
        
        <View style={styles.accidentRow}>
          <Text style={styles.accidentLabel}>Safety</Text>
          <View>
            <Text style={styles.accidentValue}>Seat Belt: The Claimant was wearing a seat belt.</Text>
            <Text style={styles.accidentValue}>Head Rest: The vehicle was fitted with a Head rest.</Text>
            <Text style={styles.accidentValue}>Air Bags: Unable to recollect</Text>
          </View>
        </View>
      </View>
      
      {data.accidentSummary && (
        <View style={styles.summaryBox}>
          <Text style={styles.summaryText}>{data.accidentSummary}</Text>
        </View>
      )}
    </View>
  );
};
