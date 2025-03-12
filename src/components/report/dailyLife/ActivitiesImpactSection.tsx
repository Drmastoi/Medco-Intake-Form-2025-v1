
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { dailyLifeStyles as styles } from './dailyLifeStyles';
import { formatList } from './dailyLifeUtils';

interface ActivitiesImpactProps {
  formData: any;
}

export const ActivitiesImpactSection = ({ formData }: ActivitiesImpactProps) => (
  <View style={styles.section}>
    <Text style={styles.subtitle}>Impact on Daily Activities:</Text>
    {formData.effectOnDomesticLiving === "1" && (
      <Text style={styles.text}>• Domestic activities affected: {formatList(formData.domesticEffects, formData.otherDomesticEffects)}</Text>
    )}
    {formData.sleepDisturbance === "1" && (
      <Text style={styles.text}>• Sleep disturbances: {formatList(formData.sleepDisturbances, formData.otherSleepDisturbances)}</Text>
    )}
  </View>
);
