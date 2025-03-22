
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
    exceptionalInjuriesDetails: '',
    physiotherapyPreference: ''
  };
  
  const hasExceptionalInjuries = medicalHistory.exceptionalInjuries || false;
  const exceptionalInjuriesDetails = medicalHistory.exceptionalInjuriesDetails || '';
  const physiotherapyPreference = medicalHistory.physiotherapyPreference || '';
  
  // Access headache and anxiety history from their respective sections
  const anxietyPastHistory = reportData.travelAnxiety?.pastHistory || '';
  const headachePastHistory = reportData.injuries?.headache?.pastHistory || '';

  // Format the physiotherapy preference text
  const getPhysiotherapyText = () => {
    switch(physiotherapyPreference) {
      case '1':
        return 'The claimant indicates they would like to have physiotherapy if offered.';
      case '2':
        return 'The claimant indicates they do not want physiotherapy.';
      case '3':
        return 'The claimant is already receiving physiotherapy.';
      case '4':
        return 'The claimant has already recovered and does not need physiotherapy.';
      default:
        return '';
    }
  };

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
        
        {/* Physiotherapy Preference */}
        {physiotherapyPreference && (
          <Text style={{fontSize: 10, marginBottom: 8}}>{getPhysiotherapyText()}</Text>
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
