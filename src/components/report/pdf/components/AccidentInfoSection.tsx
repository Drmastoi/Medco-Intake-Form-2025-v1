
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { AccidentData } from '@/types/reportTypes';
import { styles } from './PDFStyles';
import { PDFRow } from './PDFRow';

interface AccidentInfoSectionProps {
  data: AccidentData;
}

const getTimeOfDay = (time: string): string => {
  switch (time) {
    case "1": return "morning";
    case "2": return "afternoon";
    case "3": return "evening";
    case "4": return "night";
    default: return "unspecified time";
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

const getDamageLevel = (damage: string): string => {
  switch (damage) {
    case "1": return "mild damage";
    case "2": return "moderate damage";
    case "3": return "was written off";
    default: return "unspecified damage";
  }
};

const getPosition = (position: string): string => {
  switch (position) {
    case "1": return "the driver";
    case "2": return "a front passenger";
    case "3": return "a back passenger";
    case "4": return "in another position";
    default: return "in an unspecified position";
  }
};

/**
 * Displays the accident information section of the PDF report
 */
export const AccidentInfoSection: React.FC<AccidentInfoSectionProps> = ({ data }) => {
  // Generate the dynamic summary text
  const summaryText = `The incident occurred on ${data.accidentDate} during the ${getTimeOfDay(data.accidentTime)}. 
    ${data.claimantPosition ? `The claimant was ${getPosition(data.claimantPosition)} of ` : 'The claimant was in '}
    ${data.claimantVehicle ? `a ${getVehicleType(data.claimantVehicle)}` : 'the vehicle'}.
    ${data.impactLocation ? `The impact occurred at the ${getImpactLocation(data.impactLocation)} of the vehicle` : ''}.
    ${data.vehicleDamage ? `The vehicle sustained ${getDamageLevel(data.vehicleDamage)}` : ''}.
    ${data.otherVehicle ? `The other vehicle involved was a ${getVehicleType(data.otherVehicle)}` : ''}.`;

  return (
    <View style={styles.section}>
      <Text style={styles.header}>3. Accident Details</Text>
      
      {/* Dynamic Summary */}
      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>{summaryText}</Text>
      </View>

      {/* Detailed Information */}
      <PDFRow label="Accident Date" value={data.accidentDate} />
      <PDFRow label="Time of Day" value={data.accidentTime} />
      <PDFRow label="Vehicle Position" value={data.vehiclePosition} />
      {data.vehicleStatus && <PDFRow label="Vehicle Status" value={data.vehicleStatus} />}
      {data.vehicleLocation && <PDFRow label="Vehicle Location" value={data.vehicleLocation} />}
      {data.impactLocation && <PDFRow label="Impact Location" value={data.impactLocation} />}
      {data.vehicleDamage && <PDFRow label="Vehicle Damage" value={data.vehicleDamage} />}
      {data.claimantPosition && <PDFRow label="Claimant Position" value={data.claimantPosition} />}
      {data.claimantVehicle && <PDFRow label="Claimant Vehicle" value={data.claimantVehicle} />}
      {data.otherVehicle && <PDFRow label="Other Vehicle" value={data.otherVehicle} />}
    </View>
  );
};
