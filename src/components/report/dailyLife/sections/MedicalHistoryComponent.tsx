
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
  const previousAccident = formData.previousAccident === '1';
  const previousConditionWorse = formData.previousConditionWorse;
  const additionalInfo = formData.additionalInformationDetails;

  return (
    <View style={dailyLifeStyles.section}>
      <Text style={dailyLifeStyles.subtitle}>10. Past Medical History</Text>
      
      {/* Previous RTA Section */}
      <Text style={dailyLifeStyles.subheading}>10.1 Previous Road Traffic Accidents</Text>
      <Text style={dailyLifeStyles.text}>
        {previousAccident
          ? `The claimant reports a history of previous road traffic accident${formData.previousAccidentDate ? ' on ' + formData.previousAccidentDate : ''}. `
            + `${formData.previousAccidentRecovery === '1' 
                ? 'The claimant made a complete recovery from the previous accident. ' 
                : 'The claimant did not make a complete recovery from the previous accident. '}`
            + `${formData.previousInjuriesWorse === '1'
                ? 'The current accident has worsened injuries from the previous accident.'
                : 'The current accident has not worsened injuries from the previous accident.'}`
          : 'The claimant denies any history of previous road traffic accidents.'}
      </Text>
      
      {/* Medical conditions section */}
      <Text style={dailyLifeStyles.subheading}>10.2 Pre-existing Medical Conditions</Text>
      <Text style={dailyLifeStyles.text}>
        {previousConditionWorse
          ? `The claimant reports pre-existing medical conditions that have been worsened by this accident: ${previousConditionWorse}.`
          : 'The claimant denies any pre-existing medical conditions that have been worsened by this accident.'}
      </Text>
      
      {/* Exceptional Injuries section */}
      <Text style={dailyLifeStyles.subheading}>10.3 Exceptional Circumstances</Text>
      <Text style={dailyLifeStyles.text}>
        {hasExceptionalInjuries
          ? `The claimant reports exceptionally severe physical or psychological injuries: ${formData.exceptionalInjuriesDetails || 'details not provided'}.`
          : 'The claimant denies any exceptionally severe physical or psychological injuries.'}
      </Text>
      
      {/* Additional information section */}
      {additionalInfo && (
        <>
          <Text style={dailyLifeStyles.subheading}>10.4 Additional Information</Text>
          <Text style={dailyLifeStyles.text}>
            {additionalInfo}
          </Text>
        </>
      )}
    </View>
  );
};
