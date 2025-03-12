
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { FormSchema } from '@/schemas/intakeFormSchema';
import { dailyLifeStyles } from './dailyLifeStyles';
import { formatTravelAnxietySymptoms, getPainSeverity, isLongTermPrognosis } from './dailyLifeUtils';

interface PsychologicalImpactProps {
  formData: Partial<FormSchema>;
}

export const PsychologicalImpactSection = ({ formData }: PsychologicalImpactProps) => {
  return (
    <View style={dailyLifeStyles.section}>
      <Text style={dailyLifeStyles.subtitle}>Psychological Impacts:</Text>
      {formData.travelAnxiety === "1" ? (
        <View>
          <Text style={dailyLifeStyles.text}>• Travel Anxiety Present</Text>
          <Text style={dailyLifeStyles.text}>  - Initial Severity: {getPainSeverity(formData.anxietyInitialSeverity)}</Text>
          <Text style={dailyLifeStyles.text}>  - Current Severity: {getPainSeverity(formData.anxietyCurrentSeverity)}</Text>
          {formData.anxietyCurrentSeverity === "4" && (
            <Text style={dailyLifeStyles.text}>  - Resolved after: {formData.anxietyResolveDays} days</Text>
          )}
          {formData.travelAnxietySymptoms && formData.travelAnxietySymptoms.length > 0 && (
            <Text style={dailyLifeStyles.text}>  - Reported Symptoms: {formatTravelAnxietySymptoms(formData.travelAnxietySymptoms, formData.otherTravelAnxietySymptom)}</Text>
          )}
          {isLongTermPrognosis(formData.anxietyCurrentSeverity) && (
            <Text style={dailyLifeStyles.conclusionText}>The claimant's prolonged prognosis is attributable to the absence of physiotherapy and the extent of their injuries.</Text>
          )}
        </View>
      ) : (
        <Text style={dailyLifeStyles.text}>No travel anxiety reported by the claimant.</Text>
      )}
    </View>
  );
};
