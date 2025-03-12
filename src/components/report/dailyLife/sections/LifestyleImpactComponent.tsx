
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { FormSchema } from '@/schemas/intakeFormSchema';
import { dailyLifeStyles } from '../dailyLifeStyles';

interface LifestyleImpactProps {
  formData: Partial<FormSchema>;
}

export const LifestyleImpactComponent = ({ formData }: LifestyleImpactProps) => {
  return (
    <View style={dailyLifeStyles.section}>
      <Text style={dailyLifeStyles.subtitle}>8. Impact on Lifestyle</Text>
      
      {/* Work Impact */}
      <Text style={dailyLifeStyles.text}>
        {formData.impactOnWork === '1' ? 
          `The accident has impacted the claimant's ability to work. 
          ${formData.timeOffWork ? `Time off work: ${formData.timeOffWork}. ` : ''}
          ${formData.workRestrictions && formData.workRestrictions.length > 0 ? `Work restrictions: ${formData.workRestrictions.join(', ')}.` : ''}` : 
          'The accident has not impacted the claimant\'s ability to work.'}
      </Text>
      
      {/* Sleep Impact */}
      <Text style={dailyLifeStyles.text}>
        {formData.impactOnSleep === '1' ? 
          `The accident has impacted the claimant's sleep. 
          ${formData.sleepIssues && formData.sleepIssues.length > 0 ? `Sleep issues: ${formData.sleepIssues.join(', ')}.` : ''}` : 
          'The accident has not impacted the claimant\'s sleep.'}
      </Text>
      
      {/* Domestic Impact */}
      <Text style={dailyLifeStyles.text}>
        {formData.impactOnDomestic === '1' ? 
          `The accident has impacted the claimant's ability to perform domestic activities. 
          ${formData.domesticIssues && formData.domesticIssues.length > 0 ? `Domestic challenges: ${formData.domesticIssues.join(', ')}.` : ''}` : 
          'The accident has not impacted the claimant\'s ability to perform domestic activities.'}
      </Text>
      
      {/* Sports/Leisure Impact */}
      <Text style={dailyLifeStyles.text}>
        {formData.impactOnSports === '1' ? 
          `The accident has impacted the claimant's ability to participate in sports and leisure activities. 
          ${formData.sportsActivities ? `Affected activities: ${formData.sportsActivities}. ` : ''}
          ${formData.sportsDuration ? `Duration of impact: ${formData.sportsDuration}.` : ''}` : 
          'The accident has not impacted the claimant\'s ability to participate in sports and leisure activities.'}
      </Text>
      
      {/* Social Life Impact */}
      <Text style={dailyLifeStyles.text}>
        {formData.impactOnSocial === '1' ? 
          `The accident has impacted the claimant's social life. 
          ${formData.socialDetails ? `Details: ${formData.socialDetails}.` : ''}` : 
          'The accident has not impacted the claimant\'s social life.'}
      </Text>
    </View>
  );
};
