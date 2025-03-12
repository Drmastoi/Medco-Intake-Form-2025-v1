
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { FormSchema } from '@/schemas/intakeFormSchema';
import { dailyLifeStyles } from '../dailyLifeStyles';

interface TravelAnxietyProps {
  formData: Partial<FormSchema>;
}

export const TravelAnxietyComponent = ({ formData }: TravelAnxietyProps) => {
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

  if (formData.travelAnxiety !== '1') {
    return null;
  }

  return (
    <View style={dailyLifeStyles.section}>
      <Text style={dailyLifeStyles.subtitle}>6.5 Travel Anxiety</Text>
      <Text style={dailyLifeStyles.text}>
        The claimant developed travel anxiety after the accident.
        {formData.travelAnxietySymptoms && formData.travelAnxietySymptoms.length > 0 ? 
          ` Symptoms include: ${formData.travelAnxietySymptoms.join(', ')}.` : ''}
        The initial severity was rated as {getSeverityText(formData.anxietyInitialSeverity)}.
        The current severity is {getSeverityText(formData.anxietyCurrentSeverity)}.
        {formData.anxietyCurrentSeverity === "4" && formData.anxietyResolveDays ? 
          ` The anxiety resolved in ${formData.anxietyResolveDays} days.` : ''}
        {formData.hasAnxietyHistory === "yes" ? 
          ' The claimant had previous history of anxiety before the accident.' : 
          ' The claimant did not have previous history of anxiety before the accident.'}
      </Text>
    </View>
  );
};
