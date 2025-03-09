
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { dailyLifeStyles as styles } from './dailyLifeStyles';

interface AdditionalInfoProps {
  formData: any;
}

export const AdditionalInfoSection = ({ formData }: AdditionalInfoProps) => (
  formData.additionalInformation === "1" ? (
    <View style={styles.paragraph}>
      <Text style={styles.sectionTitle}>Additional Information:</Text>
      <Text style={styles.bulletPoint}>• {formData.additionalInformationDetails}</Text>
    </View>
  ) : null
);
