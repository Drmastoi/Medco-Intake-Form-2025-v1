
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { dailyLifeStyles as styles } from './dailyLifeStyles';
import { formatTravelAnxietySymptoms, getPainSeverity, isLongTermPrognosis } from './dailyLifeUtils';

interface PsychologicalImpactProps {
  formData: any;
}

export const PsychologicalImpactSection = ({ formData }: PsychologicalImpactProps) => (
  <View style={styles.paragraph}>
    <Text style={styles.sectionTitle}>Psychological Impacts:</Text>
    {formData.travelAnxiety === "1" && (
      <View>
        <Text style={styles.bulletPoint}>• Travel Anxiety Present</Text>
        <Text style={styles.bulletPoint}>  - Initial Severity: {getPainSeverity(formData.anxietyInitialSeverity)}</Text>
        <Text style={styles.bulletPoint}>  - Current Severity: {getPainSeverity(formData.anxietyCurrentSeverity)}</Text>
        {formData.anxietyCurrentSeverity === "4" && (
          <Text style={styles.bulletPoint}>  - Resolved after: {formData.anxietyResolveDays} days</Text>
        )}
        {formData.travelAnxietySymptoms && formData.travelAnxietySymptoms.length > 0 && (
          <Text style={styles.bulletPoint}>  - Reported Symptoms: {formatTravelAnxietySymptoms(formData.travelAnxietySymptoms, formData.otherTravelAnxietySymptom)}</Text>
        )}
        {isLongTermPrognosis(formData.anxietyCurrentSeverity) && (
          <Text style={styles.explanationText}>The claimant's prolonged prognosis is attributable to the absence of physiotherapy and the extent of their injuries.</Text>
        )}
      </View>
    )}
    {formData.travelAnxiety !== "1" && (
      <Text style={styles.text}>No travel anxiety reported by the claimant.</Text>
    )}
  </View>
);
