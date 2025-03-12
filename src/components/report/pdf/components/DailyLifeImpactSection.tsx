
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { styles } from './PDFStyles';

export const DailyLifeImpactSection = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>10. Impact on Daily Life</Text>
      
      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>
          The injuries sustained have affected various aspects of the claimant's daily life, including work, domestic duties, and recreational activities.
        </Text>
      </View>
    </View>
  );
};
