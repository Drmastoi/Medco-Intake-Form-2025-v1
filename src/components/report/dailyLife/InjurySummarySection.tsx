
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
      <Text style={dailyLifeStyles.title}>Summary of Accident</Text>
      
      {/* Section 5.1 - Accident History */}
      <AccidentInfoComponent formData={formData} />
    </View>
  );
};
