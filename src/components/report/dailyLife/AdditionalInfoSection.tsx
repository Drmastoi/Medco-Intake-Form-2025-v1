
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { dailyLifeStyles as styles } from './dailyLifeStyles';

interface AdditionalInfoProps {
  formData: any;
}

export const AdditionalInfoSection = ({ formData }: AdditionalInfoProps) => (
  formData.additionalInformation === "1" ? (
    <View style={styles.section}>
      <Text style={styles.subtitle}>Additional Information:</Text>
      <Text style={styles.text}>• {formData.additionalInformationDetails}</Text>
    </View>
  ) : null
);
