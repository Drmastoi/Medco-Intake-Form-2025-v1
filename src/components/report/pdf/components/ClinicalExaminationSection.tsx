
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { styles } from './PDFStyles';

export const ClinicalExaminationSection = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>11. Clinical Examination</Text>
      
      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>
          A thorough clinical examination was conducted to assess the current status of the claimant's injuries and overall physical condition.
        </Text>
      </View>
    </View>
  );
};
