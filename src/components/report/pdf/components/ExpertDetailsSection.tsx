
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { PrefilledData } from '@/types/reportTypes';
import { styles } from './PDFStyles';

interface ExpertDetailsSectionProps {
  data: PrefilledData;
}

export const ExpertDetailsSection: React.FC<ExpertDetailsSectionProps> = ({ data }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Section 2 - Expert Details</Text>
      
      <View style={styles.infoTable}>
        <View style={styles.infoRow}>
          <View style={styles.cellContainer}>
            <Text style={styles.infoHeader}>2.1 Medical Expert</Text>
            <Text style={styles.infoCell}>Dr. Sam Smith, General Practice, Consultant</Text>
          </View>
          <View style={styles.cellContainer}>
            <Text style={styles.infoHeader}>2.2 Regulatory</Text>
            <Text style={styles.rightCell}>GMC - 1234567</Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <View style={styles.cellContainer}>
            <Text style={styles.infoHeader}>2.3 Medco Registration</Text>
            <Text style={styles.infoCell}>7788/5</Text>
          </View>
          <View style={styles.cellContainer}>
            <Text style={styles.rightCell}></Text>
          </View>
        </View>
      </View>
    </View>
  );
};
