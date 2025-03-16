
import React from 'react';
import { Text, View } from '@react-pdf/renderer';

interface WriterInfoSectionProps {
  styles: any;
}

export const WriterInfoSection = ({ styles }: WriterInfoSectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 11 - The Writer</Text>
      
      <View style={styles.fieldRow}>
        <View style={[styles.fieldColumn, { flex: 1 }]}>
          <Text style={styles.fieldValue}>
            I, Dr Awais Iqbal, am a medico-legal practitioner. Full details of my qualifications and experience
            entitling me to provide an expert opinion can be found on the last page of this medical report.
          </Text>
        </View>
      </View>
      
      <View style={[styles.fieldRow, { marginTop: 8 }]}>
        <View style={[styles.fieldColumn, { flex: 1 }]}>
          <Text style={styles.fieldValue}>
            This medical report is based on the following assessments:
          </Text>
        </View>
      </View>
      
      <View style={[styles.fieldRow, { marginLeft: 20, marginTop: 5 }]}>
        <View style={[styles.fieldColumn, { flex: 1 }]}>
          <Text style={styles.fieldValue}>i. Verbal information.</Text>
          <Text style={styles.fieldValue}>ii. Clinical examination.</Text>
          <Text style={styles.fieldValue}>iii. Written instructions from the instructing party.</Text>
          <Text style={styles.fieldValue}>iv. My own professional medical opinion.</Text>
        </View>
      </View>
    </View>
  );
};
