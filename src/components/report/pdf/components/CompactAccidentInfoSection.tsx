
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
      case "1": return "morning";
      case "2": return "afternoon";
      case "3": return "evening";
      case "4": return "night";
      default: return "unspecified time";
    }
  };

  const getPosition = (position: string): string => {
    switch (position) {
      case "1": return "driver";
      case "2": return "front passenger";
      case "3": return "back passenger";
      case "4": return "other position";
      default: return "unspecified position";
    }
  };

  const getVehicleType = (type: string): string => {
    switch (type) {
      case "1": return "car";
      case "2": return "van";
      case "3": return "bus";
      case "4": return "other vehicle";
      default: return "unspecified vehicle";
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

  return (
    <View style={styles.section}>
      <Text style={styles.compactSectionTitle}>Section 5 - Accident Details</Text>
      
      <View style={styles.summaryBox}>
        {data.accidentSummary ? (
          <Text style={styles.summaryText}>{data.accidentSummary}</Text>
        ) : (
          <Text style={styles.summaryText}>
            The incident occurred on {data.accidentDate} during the {getTimeOfDay(data.accidentTime)}. 
            {data.claimantPosition ? ` The claimant was the ${getPosition(data.claimantPosition)} of ` : ' The claimant was in '}
            {data.claimantVehicle ? `a ${getVehicleType(data.claimantVehicle)}` : 'the vehicle'}.
            {data.impactLocation ? ` The impact occurred at the ${getImpactLocation(data.impactLocation)} of the vehicle.` : ''}
          </Text>
        )}
      </View>
      
      <View style={styles.infoTable}>
        <View style={styles.infoRow}>
          <View style={styles.cellContainer}>
            <Text style={styles.infoHeader}>5.1 Date and Time</Text>
            <Text style={styles.infoCell}>
              Date: {data.accidentDate}{'\n'}
              Time: {getTimeOfDay(data.accidentTime)}
            </Text>
          </View>
          <View style={styles.cellContainer}>
            <Text style={styles.infoHeader}>5.2 Vehicle Details</Text>
            <Text style={styles.rightCell}>
              Position: {data.vehiclePosition || 'Not specified'}{'\n'}
              Status: {data.vehicleStatus || 'Not specified'}
            </Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <View style={styles.cellContainer}>
            <Text style={styles.infoHeader}>5.3 Impact Details</Text>
            <Text style={styles.infoCell}>
              Location: {data.impactLocation ? getImpactLocation(data.impactLocation) : 'Not specified'}{'\n'}
              Damage: {data.vehicleDamage || 'Not specified'}
            </Text>
          </View>
          <View style={styles.cellContainer}>
            <Text style={styles.infoHeader}>5.4 Claimant Position</Text>
            <Text style={styles.rightCell}>
              {data.claimantPosition ? getPosition(data.claimantPosition) : 'Not specified'}{'\n'}
              Vehicle: {data.claimantVehicle ? getVehicleType(data.claimantVehicle) : 'Not specified'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
