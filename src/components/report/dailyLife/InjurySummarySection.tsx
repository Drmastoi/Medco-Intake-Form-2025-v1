
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { FormSchema } from '@/schemas/intakeFormSchema';
import { dailyLifeStyles } from './dailyLifeStyles';
import { AccidentInfoComponent } from './sections/AccidentInfoComponent';

interface InjurySummaryProps {
  formData: Partial<FormSchema>;
}

export const InjurySummarySection = ({ formData }: InjurySummaryProps) => {
  return (
    <View style={dailyLifeStyles.section}>
      <Text style={dailyLifeStyles.title}>5.1 Accident Information</Text>
      <AccidentInfoComponent formData={formData} />
      
      {/* Display accident summary if available */}
      {formData.accidentSummary && (
        <View style={{ marginTop: 10 }}>
          <Text style={dailyLifeStyles.subtitle}>Accident Information Summary:</Text>
          <Text style={dailyLifeStyles.text}>{formData.accidentSummary}</Text>
        </View>
      )}
    </View>
  );
};
