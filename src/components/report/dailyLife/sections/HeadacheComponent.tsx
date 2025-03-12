
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { FormSchema } from '@/schemas/intakeFormSchema';
import { dailyLifeStyles } from '../dailyLifeStyles';

interface HeadacheProps {
  formData: Partial<FormSchema>;
}

export const HeadacheComponent = ({ formData }: HeadacheProps) => {
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

  if (formData.headache !== '1') {
    return null;
  }

  return (
    <View style={dailyLifeStyles.section}>
      <Text style={dailyLifeStyles.subtitle}>6.4 Headache</Text>
      <Text style={dailyLifeStyles.text}>
        The claimant suffered from headaches after the accident. 
        They started {formData.headacheStart === "1" ? "on the same day" : 
                  formData.headacheStart === "2" ? "on the next day" : 
                  "a few days later"}, 
        with initial severity rated as {getSeverityText(formData.headacheInitialSeverity)}. 
        The current severity is {getSeverityText(formData.headacheCurrentSeverity)}.
        {formData.headacheCurrentSeverity === "4" && formData.headacheResolveDays ? 
          ` The headaches resolved in ${formData.headacheResolveDays} days.` : ''}
        {formData.headachePastHistory ? ` Past history: ${formData.headachePastHistory}.` : ''}
      </Text>
    </View>
  );
};
