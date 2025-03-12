
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { styles } from './PDFStyles';

interface PDFRowProps {
  label: string;
  value: string | number | boolean | null | undefined;
}

/**
 * A reusable row component for PDF reports with a label and value
 */
export const PDFRow: React.FC<PDFRowProps> = ({ label, value }) => {
  // Handle boolean values
  const displayValue = typeof value === 'boolean' 
    ? (value ? "Yes" : "No") 
    : (value !== null && value !== undefined ? String(value) : "Not specified");
  
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{displayValue}</Text>
    </View>
  );
};
