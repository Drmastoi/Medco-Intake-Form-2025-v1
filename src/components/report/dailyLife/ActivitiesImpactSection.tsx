
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
      {formData.impactOnDomestic === "1" && (
        <Text style={dailyLifeStyles.text}>• Domestic activities affected: {formatList(formData.domesticIssues)}</Text>
      )}
      {formData.impactOnSleep === "1" && (
        <Text style={dailyLifeStyles.text}>• Sleep disturbances: {formatList(formData.sleepIssues)}</Text>
      )}
      {formData.impactOnSports === "1" && formData.sportsActivities && (
        <Text style={dailyLifeStyles.text}>• Sports/leisure activities affected: {formData.sportsActivities}</Text>
      )}
      {formData.impactOnSocial === "1" && formData.socialDetails && (
        <Text style={dailyLifeStyles.text}>• Social life impact: {formData.socialDetails}</Text>
      )}
      {formData.impactOnDomestic !== "1" && formData.impactOnSleep !== "1" && 
       formData.impactOnSports !== "1" && formData.impactOnSocial !== "1" && (
        <Text style={dailyLifeStyles.text}>No significant impact on daily activities reported by the claimant.</Text>
      )}
    </View>
  );
};
