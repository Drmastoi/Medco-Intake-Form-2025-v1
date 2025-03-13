
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { FormSchema } from '@/schemas/intakeFormSchema';
import { dailyLifeStyles } from '../dailyLifeStyles';

interface OtherInjuriesProps {
  formData: Partial<FormSchema>;
}

export const OtherInjuriesComponent = ({ formData }: OtherInjuriesProps) => {
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

  if (formData.hasOtherInjury !== '1') {
    return null;
  }

  return (
    <View style={dailyLifeStyles.section}>
      <Text style={dailyLifeStyles.subtitle}>6.7 Other Injuries</Text>
      <Text style={dailyLifeStyles.text}>
        The claimant experienced {formData.injuryName || 'other injuries'} as a result of the accident.
        {formData.injuryName ? ` Details: ${formData.injuryName}.` : ''}
        The initial severity was rated as {getSeverityText(formData.injuryInitialSeverity)}.
        The current severity is {getSeverityText(formData.injuryCurrentSeverity)}.
        {formData.injuryCurrentSeverity === "4" && formData.injuryResolveDays ? 
          ` These injuries resolved in ${formData.injuryResolveDays} days.` : ''}
      </Text>
    </View>
  );
};
