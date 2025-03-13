
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { FormSchema } from '@/schemas/intakeFormSchema';
import { dailyLifeStyles } from '../dailyLifeStyles';

interface MedicalHistoryProps {
  formData: Partial<FormSchema>;
}

export const MedicalHistoryComponent = ({ formData }: MedicalHistoryProps) => {
  return (
    <View style={dailyLifeStyles.section}>
      <Text style={dailyLifeStyles.subtitle}>9. Past Medical History</Text>
      <Text style={dailyLifeStyles.text}>
        {formData.exceptionalInjuries === '1' && formData.exceptionalInjuriesDetails ? 
          `The claimant reports having exceptionally severe physical or psychological injuries: ${formData.exceptionalInjuriesDetails}. ` : 
          formData.exceptionalInjuries === '1' ? 
          'The claimant reports having exceptionally severe physical or psychological injuries. ' : 
          'The claimant does not report any exceptionally severe physical or psychological injuries. '}
        
        {formData.additionalInfo ? 
          `Additional information provided by the claimant: ${formData.additionalInfo}.` : ''}
      </Text>
    </View>
  );
};
