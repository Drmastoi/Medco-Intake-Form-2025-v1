
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { PersonalData } from '@/types/reportTypes';
import { styles } from './PDFStyles';
import { PDFRow } from './PDFRow';

interface PersonalInfoSectionProps {
  data: PersonalData;
}

/**
 * Displays the personal information section of the PDF report
 */
export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ data }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.header}>2. Personal Information</Text>
      <PDFRow label="Full Name" value={data.fullName} />
      <PDFRow label="Date of Birth" value={data.dateOfBirth} />
      <PDFRow label="Gender" value={data.gender} />
      <PDFRow label="Address" value={data.address} />
      <PDFRow label="Occupation" value={data.occupation} />
    </View>
  );
};
