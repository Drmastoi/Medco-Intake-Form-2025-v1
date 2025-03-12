
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { styles } from './PDFStyles';

export const InjuriesAndSymptomsSection = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>8. Injuries and Symptoms</Text>
      
      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>
          The claimant has expressed the following symptoms since the accident. These have been examined and assessed based on their stated history and clinical examination.
        </Text>
      </View>
    </View>
  );
};
