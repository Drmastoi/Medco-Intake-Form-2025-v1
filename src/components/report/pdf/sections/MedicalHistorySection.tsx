
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { textStyles } from '../styles/textStyles';
import { layoutStyles } from '../styles/layoutStyles';

interface MedicalHistorySectionProps {
  reportData: ReportData;
}

const MedicalHistorySection: React.FC<MedicalHistorySectionProps> = ({ reportData }) => {
  // Safely access properties to avoid errors
  const medicalHistory = reportData.other?.medicalHistory || {
    exceptionalInjuries: false,
    exceptionalInjuriesDetails: ''
  };
  
  const hasExceptionalInjuries = medicalHistory.exceptionalInjuries || false;
  const exceptionalInjuriesDetails = medicalHistory.exceptionalInjuriesDetails || '';
  
  // Access headache and anxiety history from their respective sections
  const anxietyPastHistory = reportData.travelAnxiety?.pastHistory || '';
  const headachePastHistory = reportData.injuries?.headache?.pastHistory || '';

  return (
    <View style={layoutStyles.section}>
      <Text style={textStyles.sectionHeader}>PAST MEDICAL HISTORY</Text>
      
      <View style={{margin: 5, padding: 5}}>
        <Text style={{fontSize: 10, marginBottom: 8}}>
          {hasExceptionalInjuries 
            ? 'The claimant has reported previous medical issues.'
            : 'The claimant has not reported any previous medical issues or conditions.'}
        </Text>
        
        {hasExceptionalInjuries && exceptionalInjuriesDetails && (
          <Text style={{fontSize: 10, marginBottom: 8}}>{exceptionalInjuriesDetails}</Text>
        )}
        
        {/* Previous Headache History */}
        {headachePastHistory && (
          <>
            <Text style={{fontSize: 11, fontWeight: 'bold', marginBottom: 5}}>Previous Headache Issues:</Text>
            <Text style={{fontSize: 10, marginBottom: 8}}>{headachePastHistory}</Text>
          </>
        )}
        
        {/* Previous Anxiety History */}
        {anxietyPastHistory && (
          <>
            <Text style={{fontSize: 11, fontWeight: 'bold', marginBottom: 5}}>Previous Anxiety Issues:</Text>
            <Text style={{fontSize: 10, marginBottom: 8}}>{anxietyPastHistory}</Text>
          </>
        )}
      </View>
    </View>
  );
};

export default MedicalHistorySection;
