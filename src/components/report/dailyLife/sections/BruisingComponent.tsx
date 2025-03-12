
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { FormSchema } from '@/schemas/intakeFormSchema';
import { dailyLifeStyles } from '../dailyLifeStyles';

interface BruisingProps {
  formData: Partial<FormSchema>;
}

export const BruisingComponent = ({ formData }: BruisingProps) => {
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

  if (formData.hasBruising !== '1') {
    return null;
  }

  return (
    <View style={dailyLifeStyles.section}>
      <Text style={dailyLifeStyles.subtitle}>6.6 Bruising</Text>
      <Text style={dailyLifeStyles.text}>
        The claimant experienced bruising as a result of the accident.
        {formData.bruisingLocation ? ` The bruising was located at: ${formData.bruisingLocation}.` : ''}
        The initial severity was rated as {getSeverityText(formData.bruisingInitialSeverity)}.
        The current severity is {getSeverityText(formData.bruisingCurrentSeverity)}.
        {formData.bruisingCurrentSeverity === "4" && formData.bruisingResolveDays ? 
          ` The bruising resolved in ${formData.bruisingResolveDays} days.` : ''}
      </Text>
    </View>
  );
};
