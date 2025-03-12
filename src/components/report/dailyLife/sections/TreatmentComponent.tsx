
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { FormSchema } from '@/schemas/intakeFormSchema';
import { dailyLifeStyles } from '../dailyLifeStyles';

interface TreatmentProps {
  formData: Partial<FormSchema>;
}

export const TreatmentComponent = ({ formData }: TreatmentProps) => {
  return (
    <View style={dailyLifeStyles.section}>
      <Text style={dailyLifeStyles.subtitle}>7. Treatment</Text>
      <Text style={dailyLifeStyles.text}>
        {formData.hasTreatment === '1' ? 
          `The claimant has received treatment for their injuries. 
          ${formData.treatmentType && formData.treatmentType.length > 0 ? `Types of treatment: ${formData.treatmentType.join(', ')}. ` : ''}
          ${formData.treatmentFrequency ? `Frequency: ${formData.treatmentFrequency}. ` : ''}
          ${formData.treatmentDuration ? `Duration: ${formData.treatmentDuration}. ` : ''}
          ${formData.ongoingTreatment === '1' ? 'The treatment is ongoing.' : 'The treatment has been completed.'}` : 
          'The claimant has not received any treatment for their injuries.'}
      </Text>
    </View>
  );
};
