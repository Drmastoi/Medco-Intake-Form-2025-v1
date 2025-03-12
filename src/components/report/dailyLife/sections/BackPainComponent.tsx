
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { FormSchema } from '@/schemas/intakeFormSchema';
import { dailyLifeStyles } from '../dailyLifeStyles';

interface BackPainProps {
  formData: Partial<FormSchema>;
}

export const BackPainComponent = ({ formData }: BackPainProps) => {
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

  // Helper function to get back location text
  const getBackLocationText = (location: string | undefined) => {
    switch(location) {
      case '1': return 'upper';
      case '2': return 'middle';
      case '3': return 'lower';
      case '4': return 'entire';
      default: return '';
    }
  };

  if (formData.backPain !== '1') {
    return null;
  }

  return (
    <View style={dailyLifeStyles.section}>
      <Text style={dailyLifeStyles.subtitle}>6.3 Back Pain</Text>
      <Text style={dailyLifeStyles.text}>
        The claimant suffered from {getBackLocationText(formData.backLocation)} back pain after the accident. 
        It started {formData.backPainStart === "1" ? "on the same day" : 
                  formData.backPainStart === "2" ? "on the next day" : 
                  "a few days later"}, 
        with initial severity rated as {getSeverityText(formData.backPainInitialSeverity)}. 
        The current severity is {getSeverityText(formData.backPainCurrentSeverity)}.
        {formData.backPainCurrentSeverity === "4" && formData.backPainResolveDays ? 
          ` The back pain resolved in ${formData.backPainResolveDays} days.` : ''}
      </Text>
    </View>
  );
};
