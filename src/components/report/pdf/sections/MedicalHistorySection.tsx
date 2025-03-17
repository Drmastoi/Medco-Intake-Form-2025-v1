
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { styles as pdfStyles } from '../styles/pdfStyles';
import { paperStyles } from '../styles/layoutStyles';

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
    <View style={paperStyles.section}>
      <Text style={pdfStyles.sectionTitle}>PAST MEDICAL HISTORY</Text>
      
      <View style={pdfStyles.contentBlock}>
        <Text style={pdfStyles.paragraph}>
          {hasExceptionalInjuries 
            ? 'The claimant has reported previous medical issues.'
            : 'The claimant has not reported any previous medical issues or conditions.'}
        </Text>
        
        {hasExceptionalInjuries && exceptionalInjuriesDetails && (
          <Text style={pdfStyles.paragraph}>{exceptionalInjuriesDetails}</Text>
        )}
        
        {/* Previous Headache History */}
        {headachePastHistory && (
          <>
            <Text style={pdfStyles.subheading}>Previous Headache Issues:</Text>
            <Text style={pdfStyles.paragraph}>{headachePastHistory}</Text>
          </>
        )}
        
        {/* Previous Anxiety History */}
        {anxietyPastHistory && (
          <>
            <Text style={pdfStyles.subheading}>Previous Anxiety Issues:</Text>
            <Text style={pdfStyles.paragraph}>{anxietyPastHistory}</Text>
          </>
        )}
      </View>
    </View>
  );
};

export default MedicalHistorySection;
