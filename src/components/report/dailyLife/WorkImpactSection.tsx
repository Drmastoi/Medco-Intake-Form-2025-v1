
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { dailyLifeStyles as styles } from './dailyLifeStyles';
import { formatList } from './dailyLifeUtils';

interface WorkImpactProps {
  formData: any;
}

export const WorkImpactSection = ({ formData }: WorkImpactProps) => (
  <View style={styles.paragraph}>
    <Text style={styles.sectionTitle}>Impact on Work:</Text>
    {formData.daysOffWork > 0 && (
      <Text style={styles.bulletPoint}>• Total days off work: {formData.daysOffWork}</Text>
    )}
    {formData.daysLightDuties > 0 && (
      <Text style={styles.bulletPoint}>• Days on light duties: {formData.daysLightDuties}</Text>
    )}
    {formData.workDifficulties?.length > 0 && (
      <Text style={styles.bulletPoint}>• Specific work difficulties: {formatList(formData.workDifficulties, formData.otherWorkDifficulties)}</Text>
    )}
  </View>
);
