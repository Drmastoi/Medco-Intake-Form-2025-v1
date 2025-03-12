
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { OtherData } from '@/types/reportTypes';
import { styles } from './PDFStyles';
import { PDFRow } from './PDFRow';

interface MedicalHistorySectionProps {
  data: OtherData;
}

/**
 * Displays the medical history section of the PDF report
 */
export const MedicalHistorySection: React.FC<MedicalHistorySectionProps> = ({ data }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.header}>Medical History</Text>
      <PDFRow label="Exceptional Injuries" value={data.medicalHistory.exceptionalInjuries} />
      {data.medicalHistory.exceptionalInjuries && (
        <PDFRow label="Details" value={data.medicalHistory.exceptionalInjuriesDetails} />
      )}
    </View>
  );
};
