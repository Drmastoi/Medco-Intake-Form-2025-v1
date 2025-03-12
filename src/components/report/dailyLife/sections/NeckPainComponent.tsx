
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { FormSchema } from '@/schemas/intakeFormSchema';
import { dailyLifeStyles } from '../dailyLifeStyles';

interface NeckPainProps {
  formData: Partial<FormSchema>;
}

export const NeckPainComponent = ({ formData }: NeckPainProps) => {
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

  if (formData.neckPain !== '1') {
    return null;
  }

  return (
    <View style={dailyLifeStyles.section}>
      <Text style={dailyLifeStyles.subtitle}>6.1 Neck Pain</Text>
      <Text style={dailyLifeStyles.text}>
        The claimant suffered from neck pain after the accident. 
        It started {formData.neckPainStart === "1" ? "on the same day" : 
                  formData.neckPainStart === "2" ? "on the next day" : 
                  "a few days later"}, 
        with initial severity rated as {getSeverityText(formData.neckPainInitialSeverity)}. 
        The current severity is {getSeverityText(formData.neckPainCurrentSeverity)}.
        {formData.neckPainCurrentSeverity === "4" && formData.neckPainResolveDays ? 
          ` The neck pain resolved in ${formData.neckPainResolveDays} days.` : ''}
        {formData.hadPriorNeckPain === "1" ? 
          ` The claimant had previous history of neck pain before the accident.${
            formData.accidentNeckPainPercentage && formData.priorNeckPainPercentage ? 
            ` ${formData.accidentNeckPainPercentage}% of current pain is due to this accident and ${formData.priorNeckPainPercentage}% is due to previous condition.` : ''
          }` : 
          ' The claimant did not have previous history of neck pain before the accident.'}
      </Text>
    </View>
  );
};
