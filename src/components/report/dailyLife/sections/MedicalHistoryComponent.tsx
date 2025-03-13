
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { FormSchema } from '@/schemas/intakeFormSchema';
import { dailyLifeStyles } from '../dailyLifeStyles';

interface MedicalHistoryProps {
  formData: Partial<FormSchema>;
}

export const MedicalHistoryComponent = ({ formData }: MedicalHistoryProps) => {
  // Helper function to format date
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'unspecified date';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (e) {
      return 'unspecified date';
    }
  };

  return (
    <View style={dailyLifeStyles.section}>
      <Text style={dailyLifeStyles.subtitle}>9. Past Medical History</Text>
      <Text style={dailyLifeStyles.text}>
        {formData.previousAccident === '1' ? 
          `The claimant reports having been involved in a previous road traffic accident
          ${formData.previousAccidentDate ? `on ${formatDate(formData.previousAccidentDate)}` : ''}.
          ${formData.previousAccidentRecovery === '1' ? 
            'They report having made a complete recovery from that accident. ' : 
            formData.previousAccidentRecovery === '2' ? 
            'They report that they had not made a complete recovery from that accident. ' : ''}
          ${formData.previousInjuriesWorse === '1' ? 
            'The claimant reports that the current accident has made their previous injuries worse. ' : 
            formData.previousInjuriesWorse === '2' ? 
            'The claimant reports that the current accident has not made their previous injuries worse. ' : ''}` : 
          'The claimant reports no previous road traffic accidents. '}
        
        ${formData.previousConditionWorse ? 
          `The claimant reports having previous medical conditions that have been made worse by this accident: ${formData.previousConditionWorse}. ` : 
          'The claimant has not reported any pre-existing medical conditions that have been exacerbated by this accident. '}
        
        ${formData.exceptionalInjuries === '1' && formData.exceptionalInjuriesDetails ? 
          `The claimant reports having exceptionally severe physical or psychological injuries: ${formData.exceptionalInjuriesDetails}. ` : 
          formData.exceptionalInjuries === '1' ? 
          'The claimant reports having exceptionally severe physical or psychological injuries. ' : 
          'The claimant does not report any exceptionally severe physical or psychological injuries. '}
        
        ${formData.additionalInformation === '1' && formData.additionalInformationDetails ? 
          `Additional information provided by the claimant: ${formData.additionalInformationDetails}.` : ''}
      </Text>
    </View>
  );
};
