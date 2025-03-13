
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { FormSchema } from '@/schemas/intakeFormSchema';
import { dailyLifeStyles } from '../dailyLifeStyles';

interface ShoulderPainComponentProps {
  formData: Partial<FormSchema>;
}

export const ShoulderPainComponent = ({ formData }: ShoulderPainComponentProps) => {
  // Helper function to convert severity codes to readable text
  const getSeverityText = (code: string | undefined) => {
    switch(code) {
      case '1': return 'mild';
      case '2': return 'moderate';
      case '3': return 'severe';
      case '4': return 'resolved';
      default: return 'unknown';
    }
  };

  // Helper function to get shoulder side text
  const getShoulderSideText = (side: string | undefined) => {
    switch(side) {
      case '1': return 'right shoulder';
      case '2': return 'left shoulder';
      case '3': return 'both shoulders';
      default: return 'shoulder(s)';
    }
  };

  // Early return if no shoulder pain reported
  if (formData.shoulderPain !== '1') {
    return null;
  }

  return (
    <View style={dailyLifeStyles.section}>
      <Text style={dailyLifeStyles.subtitle}>6.2 Shoulder Pain</Text>
      <Text style={dailyLifeStyles.text}>
        The claimant experienced pain in the {getShoulderSideText(formData.shoulderSide)} following the accident.
        The pain initially started {formData.shoulderPainStart === '1' ? 'on the same day as the accident' : 
          formData.shoulderPainStart === '2' ? 'the day after the accident' : 
          formData.shoulderPainStart === '3' ? 'within a week of the accident' : 'at some point after the accident'}.
      </Text>

      <Text style={dailyLifeStyles.text}>
        The initial severity of the pain was {getSeverityText(formData.shoulderPainInitialSeverity)}.
        {formData.shoulderPainCurrentSeverity === '4' ? 
          ` The shoulder pain has now resolved after approximately ${formData.shoulderPainResolveDays || 'an unknown number of'} days.` : 
          ` The current severity of the pain is ${getSeverityText(formData.shoulderPainCurrentSeverity)}.`}
      </Text>
      
      {/* Prior shoulder pain history is not available in current schema */}
    </View>
  );
};
