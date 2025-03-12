
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { FormSchema } from '@/schemas/intakeFormSchema';
import { dailyLifeStyles } from './dailyLifeStyles';
import { formatList } from './dailyLifeUtils';

interface ActivitiesImpactProps {
  formData: Partial<FormSchema>;
}

export const ActivitiesImpactSection = ({ formData }: ActivitiesImpactProps) => {
  return (
    <View style={dailyLifeStyles.section}>
      <Text style={dailyLifeStyles.subtitle}>Impact on Daily Activities:</Text>
      {formData.effectOnDomesticLiving === "1" && (
        <Text style={dailyLifeStyles.text}>• Domestic activities affected: {formatList(formData.domesticEffects, formData.otherDomesticEffects)}</Text>
      )}
      {formData.sleepDisturbance === "1" && (
        <Text style={dailyLifeStyles.text}>• Sleep disturbances: {formatList(formData.sleepDisturbances, formData.otherSleepDisturbances)}</Text>
      )}
      {formData.effectOnSportsActivities === "1" && formData.sportsActivitiesAffected && (
        <Text style={dailyLifeStyles.text}>• Sports/leisure activities affected: {formData.sportsActivitiesAffected}</Text>
      )}
      {formData.effectOnSocialLife === "1" && formData.socialLifeDetails && (
        <Text style={dailyLifeStyles.text}>• Social life impact: {formData.socialLifeDetails}</Text>
      )}
      {formData.effectOnDomesticLiving !== "1" && formData.sleepDisturbance !== "1" && 
       formData.effectOnSportsActivities !== "1" && formData.effectOnSocialLife !== "1" && (
        <Text style={dailyLifeStyles.text}>No significant impact on daily activities reported by the claimant.</Text>
      )}
    </View>
  );
};
