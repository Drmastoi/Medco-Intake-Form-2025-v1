
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { AccidentData } from '@/types/reportTypes';
import { styles } from './PDFStyles';
import { PDFRow } from './PDFRow';

interface AccidentInfoSectionProps {
  data: AccidentData;
}

/**
 * Displays the accident information section of the PDF report
 */
export const AccidentInfoSection: React.FC<AccidentInfoSectionProps> = ({ data }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.header}>Accident Information</Text>
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
