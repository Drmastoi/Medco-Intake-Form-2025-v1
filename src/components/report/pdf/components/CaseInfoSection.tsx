
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { PrefilledData } from '@/types/reportTypes';
import { styles } from './PDFStyles';
import { PDFRow } from './PDFRow';

interface CaseInfoSectionProps {
  data: PrefilledData;
}

/**
 * Displays the case information section of the PDF report
 */
export const CaseInfoSection: React.FC<CaseInfoSectionProps> = ({ data }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.header}>1. Prefilled Details</Text>
      <PDFRow label="Solicitor" value={data.solicitorName} />
      <PDFRow label="Solicitor Reference" value={data.solicitorReference} />
      <PDFRow label="Instructing Party" value={data.instructingPartyName} />
      <PDFRow label="Instructing Reference" value={data.instructingPartyReference} />
      <PDFRow label="MedCo Reference" value={data.medcoReference} />
      <PDFRow label="Examination Date" value={data.dateOfExamination} />
      <PDFRow label="Report Date" value={data.dateOfReport} />
      <PDFRow label="Time Spent with Claimant" value={`${data.timeSpentWithClaimant} minutes`} />
    </View>
  );
};
