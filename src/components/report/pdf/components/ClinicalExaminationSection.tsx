
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { styles } from './PDFStyles';
import { ReportData } from '@/types/reportTypes';

interface ClinicalExaminationSectionProps {
  data?: ReportData;
}

export const ClinicalExaminationSection: React.FC<ClinicalExaminationSectionProps> = ({ data }) => {
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
          • Cervical Spine: {data?.injuries?.neckPain?.hasInjury 
            ? "Limited range of motion with tenderness on palpation." 
            : "No visible abnormalities. Range of motion was within normal limits. No tenderness on palpation."}
        </Text>
        
        <Text style={{...styles.summaryText, marginTop: 4}}>
          • Shoulder Examination: {data?.injuries?.shoulderPain?.hasInjury 
            ? `The ${data?.injuries?.shoulderPain?.side === "both" 
                ? "shoulders show" 
                : data?.injuries?.shoulderPain?.side + " shoulder shows"} limited range of movement with some discomfort.` 
            : "No visible deformity or muscle wasting. Full range of movement bilaterally. No impingement signs."}
        </Text>
        
        <Text style={{...styles.summaryText, marginTop: 4}}>
          • Lumbar Spine: {data?.injuries?.backPain?.hasInjury 
            ? `The ${data?.injuries?.backPain?.location || "lower"} back shows limited flexion and extension with discomfort.` 
            : "No visible abnormality. Normal lordotic curve. Full range of movement. No tenderness on palpation."}
        </Text>
        
        {data?.injuries?.headache?.hasInjury && (
          <Text style={{...styles.summaryText, marginTop: 4}}>
            • Neurological Examination: No focal neurological deficits detected. Cranial nerves intact.
          </Text>
        )}
        
        {data?.other?.bruising?.hasBruising && (
          <Text style={{...styles.summaryText, marginTop: 4}}>
            • Soft Tissue Injuries: {data?.other?.bruising?.location 
              ? `Evidence of bruising in the ${data?.other?.bruising?.location} area.` 
              : "Evidence of bruising visible during examination."}
          </Text>
        )}
      </View>
    </View>
  );
};
