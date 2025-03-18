
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { styles } from '../styles/textStyles';
import { layoutStyles } from '../styles/layoutStyles';

interface MedicalHistorySectionProps {
  reportData: ReportData;
}

const MedicalHistorySection: React.FC<MedicalHistorySectionProps> = ({ reportData }) => {
  // Safely access properties to avoid errors
  const medicalHistory = reportData.other?.medicalHistory || {};
  const hasExceptionalInjuries = medicalHistory.exceptionalInjuries || false;
  const exceptionalInjuriesDetails = medicalHistory.exceptionalInjuriesDetails || '';
  
  // Access headache and anxiety history from their respective sections
  const anxietyPastHistory = reportData.travelAnxiety?.pastHistory || '';
  const headachePastHistory = reportData.injuries?.headache?.pastHistory || '';

  return (
    <View style={layoutStyles.section}>
      <Text style={styles.sectionTitle}>PAST MEDICAL HISTORY</Text>
      
      <View style={styles.contentBlock}>
        <Text style={styles.paragraph}>
          {hasExceptionalInjuries 
            ? 'The claimant has reported previous medical issues.'
            : 'The claimant has not reported any previous medical issues or conditions.'}
        </Text>
        
        {hasExceptionalInjuries && exceptionalInjuriesDetails && (
          <Text style={styles.paragraph}>{exceptionalInjuriesDetails}</Text>
        )}
        
        {/* Previous Headache History */}
        {headachePastHistory && (
          <>
            <Text style={styles.subheading}>Previous Headache Issues:</Text>
            <Text style={styles.paragraph}>{headachePastHistory}</Text>
          </>
        )}
        
        {/* Previous Anxiety History */}
        {anxietyPastHistory && (
          <>
            <Text style={styles.subheading}>Previous Anxiety Issues:</Text>
            <Text style={styles.paragraph}>{anxietyPastHistory}</Text>
          </>
        )}
      </View>
    </View>
  );
};

export default MedicalHistorySection;
