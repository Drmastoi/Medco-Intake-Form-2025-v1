
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { FormSchema } from '@/schemas/intakeFormSchema';
import { dailyLifeStyles } from '../dailyLifeStyles';

interface ShoulderPainProps {
  formData: Partial<FormSchema>;
}

export const ShoulderPainComponent = ({ formData }: ShoulderPainProps) => {
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
      case '1': return 'right';
      case '2': return 'left';
      case '3': return 'both';
      default: return '';
    }
  };

  if (formData.shoulderPain !== '1') {
    return null;
  }

  return (
    <View style={dailyLifeStyles.section}>
      <Text style={dailyLifeStyles.subtitle}>6.2 Shoulder Pain</Text>
      <Text style={dailyLifeStyles.text}>
        The claimant suffered from {getShoulderSideText(formData.shoulderSide)} shoulder pain after the accident. 
        It started {formData.shoulderPainStart === "1" ? "on the same day" : 
                  formData.shoulderPainStart === "2" ? "on the next day" : 
                  "a few days later"}, 
        with initial severity rated as {getSeverityText(formData.shoulderPainInitialSeverity)}. 
        The current severity is {getSeverityText(formData.shoulderPainCurrentSeverity)}.
        {formData.shoulderPainCurrentSeverity === "4" && formData.shoulderPainResolveDays ? 
          ` The shoulder pain resolved in ${formData.shoulderPainResolveDays} days.` : ''}
        {formData.hadPriorShoulderPain === "1" ? 
          ' The claimant had previous history of shoulder pain before the accident.' : 
          ' The claimant did not have previous history of shoulder pain before the accident.'}
      </Text>
    </View>
  );
};
