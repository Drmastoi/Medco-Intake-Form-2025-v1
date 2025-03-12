
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { styles } from './PDFStyles';

export const TreatmentSection = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>9. Treatment Details</Text>
      
      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>
          The claimant has undergone the following treatments since the accident occurred, and their effectiveness has been assessed.
        </Text>
      </View>
    </View>
  );
};
