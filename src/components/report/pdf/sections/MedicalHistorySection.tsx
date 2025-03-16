
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { layoutStyles } from '../styles/layoutStyles';
import { textStyles } from '../styles/textStyles';
import { colorScheme } from '../styles/colorScheme';

interface MedicalHistorySectionProps {
  medicalHistory: {
    exceptionalInjuries: boolean;
    exceptionalInjuriesDetails: string;
  };
}

const MedicalHistorySection: React.FC<MedicalHistorySectionProps> = ({ medicalHistory }) => {
  const hasExceptionalHistory = medicalHistory.exceptionalInjuries;

  return (
    <View style={[layoutStyles.section, { backgroundColor: colorScheme.altSectionBg }]}>
      <Text style={textStyles.sectionTitle}>Medical History</Text>

      <View style={[layoutStyles.section, { backgroundColor: colorScheme.altSectionBg }]}>
        <Text style={textStyles.subHeaderText}>Relevant Medical History</Text>
        
        {!hasExceptionalHistory ? (
          <Text style={textStyles.normalText}>
            The claimant reports no exceptional medical history that would affect recovery from the injuries sustained in this accident.
          </Text>
        ) : (
          <View>
            <Text style={textStyles.normalText}>
              The claimant reports the following exceptional medical history that may affect recovery from the injuries:
            </Text>
            <Text style={[textStyles.normalText, { marginTop: 8, fontStyle: 'italic' }]}>
              {medicalHistory.exceptionalInjuriesDetails || "Details not provided"}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default MedicalHistorySection;
