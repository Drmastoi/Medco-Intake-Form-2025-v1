
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { styles } from './PDFStyles';

interface DeclarationSectionProps {
  reportDate: string;
}

/**
 * Displays the declaration section of the PDF report
 */
export const DeclarationSection: React.FC<DeclarationSectionProps> = ({ reportDate }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.header}>Declaration</Text>
      <View style={{ marginTop: 10, marginBottom: 10 }}>
        <Text>
          I confirm that the information contained in this report is true to the best of my knowledge and belief.
          I understand that if I have knowingly provided false information, I may be liable for prosecution.
        </Text>
      </View>
      <View style={{ marginTop: 40 }}>
        <Text>Signature: ___________________________</Text>
        <Text style={{ marginTop: 10 }}>Date: {reportDate}</Text>
      </View>
    </View>
  );
};
