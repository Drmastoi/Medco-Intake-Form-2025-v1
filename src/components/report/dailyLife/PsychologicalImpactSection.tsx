
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { dailyLifeStyles as styles } from './dailyLifeStyles';
import { formatTravelAnxietySymptoms, getPainSeverity, isLongTermPrognosis } from './dailyLifeUtils';

interface PsychologicalImpactProps {
  formData: any;
}

export const PsychologicalImpactSection = ({ formData }: PsychologicalImpactProps) => (
  <View style={styles.section}>
    <Text style={styles.subtitle}>Psychological Impacts:</Text>
    {formData.travelAnxiety === "1" && (
      <View>
        <Text style={styles.text}>• Travel Anxiety Present</Text>
        <Text style={styles.text}>  - Initial Severity: {getPainSeverity(formData.anxietyInitialSeverity)}</Text>
        <Text style={styles.text}>  - Current Severity: {getPainSeverity(formData.anxietyCurrentSeverity)}</Text>
        {formData.anxietyCurrentSeverity === "4" && (
          <Text style={styles.text}>  - Resolved after: {formData.anxietyResolveDays} days</Text>
        )}
        {formData.travelAnxietySymptoms && formData.travelAnxietySymptoms.length > 0 && (
          <Text style={styles.text}>  - Reported Symptoms: {formatTravelAnxietySymptoms(formData.travelAnxietySymptoms, formData.otherTravelAnxietySymptom)}</Text>
        )}
        {isLongTermPrognosis(formData.anxietyCurrentSeverity) && (
          <Text style={styles.conclusionText}>The claimant's prolonged prognosis is attributable to the absence of physiotherapy and the extent of their injuries.</Text>
        )}
      </View>
    )}
    {formData.travelAnxiety !== "1" && (
      <Text style={styles.text}>No travel anxiety reported by the claimant.</Text>
    )}
  </View>
);
