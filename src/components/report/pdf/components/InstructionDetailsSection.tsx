
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { PrefilledData } from '@/types/reportTypes';
import { styles } from './PDFStyles';

interface InstructionDetailsSectionProps {
  data: PrefilledData;
}

export const InstructionDetailsSection: React.FC<InstructionDetailsSectionProps> = ({ data }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Section 3 - Instruction Details</Text>
      
      <View style={styles.infoTable}>
        <View style={styles.infoRow}>
          <View style={{ width: '50%' }}>
            <Text style={styles.infoHeader}>3.1 Agency</Text>
            <Text style={styles.infoCell}>Sample Agency (122222222)</Text>
          </View>
          <View style={{ width: '50%' }}>
            <Text style={styles.infoHeader}>3.2 Solicitor</Text>
            <Text style={styles.rightCell}>First Plus Law Firm (55555555)</Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <View style={{ width: '50%' }}>
            <Text style={styles.infoHeader}>3.3 Medco Reference</Text>
            <Text style={styles.infoCell}>12345/7</Text>
          </View>
          <View style={{ width: '50%' }}>
            <Text style={styles.infoHeader}>3.4 Review of Records</Text>
            <Text style={styles.rightCell}>A&E</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
