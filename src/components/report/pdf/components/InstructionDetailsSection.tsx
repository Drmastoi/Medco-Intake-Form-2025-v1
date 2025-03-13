
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
          <View style={styles.cellContainer}>
            <Text style={styles.infoHeader}>3.1 Agency</Text>
            <Text style={styles.infoCell}>{data.instructingPartyName || "Sample Agency"} ({data.instructingPartyReference || "122222222"})</Text>
          </View>
          <View style={styles.cellContainer}>
            <Text style={styles.infoHeader}>3.2 Solicitor</Text>
            <Text style={styles.rightCell}>{data.solicitorName || "First Plus Law Firm"} ({data.solicitorReference || "55555555"})</Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <View style={styles.cellContainer}>
            <Text style={styles.infoHeader}>3.3 Medco Reference</Text>
            <Text style={styles.infoCell}>{data.medcoReference || "12345/7"}</Text>
          </View>
          <View style={styles.cellContainer}>
            <Text style={styles.infoHeader}>3.4 Review of Records</Text>
            <Text style={styles.rightCell}>A&E</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
