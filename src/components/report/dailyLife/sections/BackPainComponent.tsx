
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { FormSchema } from '@/schemas/intakeFormSchema';
import { dailyLifeStyles } from '../dailyLifeStyles';

interface BackPainComponentProps {
  formData: Partial<FormSchema>;
}

export const BackPainComponent = ({ formData }: BackPainComponentProps) => {
  // Helper function to convert severity codes to readable text
  const getSeverityText = (code: string | undefined) => {
    switch(code) {
      case '1': return 'mild';
      case '2': return 'moderate';
      case '3': return 'severe';
      default: return 'unknown';
    }
  };

  // Helper function to get back location text
  const getBackLocationText = (location: string | undefined) => {
    switch(location) {
      case '1': return 'upper back';
      case '2': return 'mid back';
      case '3': return 'lower back';
      default: return 'back';
    }
  };

  // Early return if no back pain reported
  if (formData.backPain !== '1') {
    return null;
  }

  // Safe check for string comparisons
  const currentSeverity = formData.backPainCurrentSeverity || '';
  const isResolved = currentSeverity === '4';

  return (
    <View style={dailyLifeStyles.section}>
      <Text style={dailyLifeStyles.subtitle}>6.3 Back Pain</Text>
      <Text style={dailyLifeStyles.text}>
        The claimant experienced pain in the {getBackLocationText(formData.backLocation)} following the accident.
        The pain initially started {formData.backPainStart === '1' ? 'on the same day as the accident' : 
          formData.backPainStart === '2' ? 'the day after the accident' : 
          formData.backPainStart === '3' ? 'within a week of the accident' : 'at some point after the accident'}.
      </Text>

      <Text style={dailyLifeStyles.text}>
        The initial severity of the pain was {getSeverityText(formData.backPainInitialSeverity)}.
        {isResolved ? 
          ` The back pain has now resolved after approximately ${formData.backPainResolveDays || 'an unknown number of'} days.` : 
          ` The current severity of the pain is ${getSeverityText(formData.backPainCurrentSeverity)}.`}
      </Text>
    </View>
  );
};
