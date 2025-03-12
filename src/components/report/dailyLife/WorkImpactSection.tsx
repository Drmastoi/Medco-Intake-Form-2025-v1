
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { FormSchema } from '@/schemas/intakeFormSchema';
import { dailyLifeStyles } from './dailyLifeStyles';
import { formatList } from './dailyLifeUtils';

interface WorkImpactProps {
  formData: Partial<FormSchema>;
}

export const WorkImpactSection = ({ formData }: WorkImpactProps) => {
  return (
    <View style={dailyLifeStyles.section}>
      <Text style={dailyLifeStyles.subtitle}>Impact on Work:</Text>
      {formData.daysOffWork > 0 && (
        <Text style={dailyLifeStyles.text}>• Total days off work: {formData.daysOffWork}</Text>
      )}
      {formData.daysLightDuties > 0 && (
        <Text style={dailyLifeStyles.text}>• Days on light duties: {formData.daysLightDuties}</Text>
      )}
      {formData.workDifficulties?.length > 0 && (
        <Text style={dailyLifeStyles.text}>• Specific work difficulties: {formatList(formData.workDifficulties, formData.otherWorkDifficulties)}</Text>
      )}
      {!formData.daysOffWork && !formData.daysLightDuties && (!formData.workDifficulties || formData.workDifficulties.length === 0) && (
        <Text style={dailyLifeStyles.text}>No significant impact on work reported by the claimant.</Text>
      )}
    </View>
  );
};
