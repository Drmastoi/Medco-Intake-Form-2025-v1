
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { FormSchema } from '@/schemas/intakeFormSchema';
import { dailyLifeStyles } from '../dailyLifeStyles';

interface MedicalHistoryComponentProps {
  formData: Partial<FormSchema>;
}

export const MedicalHistoryComponent = ({ formData }: MedicalHistoryComponentProps) => {
  // Check if the patient has exceptional injuries
  const hasExceptionalInjuries = formData.exceptionalInjuries === '1';

  return (
    <View style={dailyLifeStyles.section}>
      <Text style={dailyLifeStyles.subtitle}>10. Past Medical History</Text>
      
      {/* Medical conditions section */}
      <Text style={dailyLifeStyles.text}>
        {hasExceptionalInjuries
          ? `The claimant reports a history of relevant medical conditions: ${formData.exceptionalInjuriesDetails || 'details not provided'}.`
          : 'The claimant denies any history of relevant medical conditions that would affect the current injuries.'}
      </Text>
      
      {/* Previous accident history - this field seems to be missing from the schema,
          so we'll provide a generic statement */}
      <Text style={dailyLifeStyles.text}>
        The claimant denies any history of previous accidents or injuries to the same areas affected in the current incident.
      </Text>
      
      {/* Additional information section */}
      {formData.additionalInfo && (
        <Text style={dailyLifeStyles.text}>
          Additional information: {formData.additionalInfo}
        </Text>
      )}
    </View>
  );
};
