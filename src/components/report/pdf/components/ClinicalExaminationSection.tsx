
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { styles } from './PDFStyles';

export const ClinicalExaminationSection = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Section 11 - Clinical Examination</Text>
      
      <View style={styles.contentSection}>
        <Text style={styles.summaryText}>
          A thorough clinical examination was conducted to assess the current status of the claimant's injuries and overall physical condition.
        </Text>
        
        <Text style={{...styles.summaryText, marginTop: 6, fontFamily: 'Helvetica-Bold'}}>
          Examination Findings:
        </Text>
        
        <Text style={{...styles.summaryText, marginTop: 4}}>
          • General Appearance: The claimant appeared well, was coherent and could give a clear history.
        </Text>
        
        <Text style={{...styles.summaryText, marginTop: 4}}>
          • Cervical Spine: No visible abnormalities. Range of motion was within normal limits. No tenderness on palpation.
        </Text>
        
        <Text style={{...styles.summaryText, marginTop: 4}}>
          • Shoulder Examination: No visible deformity or muscle wasting. Full range of movement bilaterally. No impingement signs.
        </Text>
        
        <Text style={{...styles.summaryText, marginTop: 4}}>
          • Lumbar Spine: No visible abnormality. Normal lordotic curve. Full range of movement. No tenderness on palpation.
        </Text>
      </View>
    </View>
  );
};
