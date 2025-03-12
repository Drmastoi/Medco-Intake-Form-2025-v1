
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { styles } from './PDFStyles';

export const DeclarationSection = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>12. Declaration and Statement of Truth</Text>
      
      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>
          I, Dr. Sam Smith, confirm that I understand my duty to the court and have complied with that duty. I declare that I have made clear which facts and matters referred to in this report are within my own knowledge and which are not. Those that are within my own knowledge I confirm to be true.
        </Text>
      </View>
    </View>
  );
};
