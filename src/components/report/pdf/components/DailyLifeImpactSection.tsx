
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { styles } from './PDFStyles';

export const DailyLifeImpactSection = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Section 10 - Impact on Daily Life</Text>
      
      <View style={styles.contentSection}>
        <Text style={{...styles.summaryText, fontFamily: 'Helvetica-Bold', marginBottom: 4}}>
          Work Impact:
        </Text>
        <Text style={styles.summaryText}>
          The claimant reported taking 14 days off work following the accident. Upon return to work, they experienced difficulty with prolonged sitting and carrying out normal duties for approximately 4 weeks.
        </Text>
        
        <Text style={{...styles.summaryText, fontFamily: 'Helvetica-Bold', marginTop: 8, marginBottom: 4}}>
          Domestic Activities:
        </Text>
        <Text style={styles.summaryText}>
          The claimant reported difficulty with household chores including cleaning, vacuuming, and lifting heavy items for approximately 6 weeks following the accident. They required assistance from family members during this period.
        </Text>
        
        <Text style={{...styles.summaryText, fontFamily: 'Helvetica-Bold', marginTop: 8, marginBottom: 4}}>
          Sleep:
        </Text>
        <Text style={styles.summaryText}>
          The claimant experienced disrupted sleep due to pain for approximately 5 weeks. They reported waking during the night and difficulty finding a comfortable position.
        </Text>
        
        <Text style={{...styles.summaryText, fontFamily: 'Helvetica-Bold', marginTop: 8, marginBottom: 4}}>
          Recreational Activities:
        </Text>
        <Text style={styles.summaryText}>
          The claimant was unable to participate in their regular exercise routine, including gym attendance and swimming, for approximately 8 weeks following the accident. They have now resumed all activities but occasionally experience mild discomfort.
        </Text>
      </View>
    </View>
  );
};
