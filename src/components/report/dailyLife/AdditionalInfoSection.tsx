
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { FormSchema } from '@/schemas/intakeFormSchema';
import { dailyLifeStyles } from './dailyLifeStyles';

interface AdditionalInfoProps {
  formData: Partial<FormSchema>;
}

export const AdditionalInfoSection = ({ formData }: AdditionalInfoProps) => {
  if (!formData.additionalInfo) {
    return null;
  }
  
  return (
    <View style={dailyLifeStyles.section}>
      <Text style={dailyLifeStyles.subtitle}>Additional Information:</Text>
      <Text style={dailyLifeStyles.text}>• {formData.additionalInfo}</Text>
    </View>
  );
};
