
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { InjuriesData } from '@/types/reportTypes';
import { styles } from './PDFStyles';
import { PDFRow } from './PDFRow';

interface InjurySectionProps {
  data: InjuriesData;
}

/**
 * Displays the injury assessment section of the PDF report
 */
export const InjurySection: React.FC<InjurySectionProps> = ({ data }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.header}>Injury Assessment</Text>
      
      {/* Neck Pain */}
      <Text style={styles.subheader}>3. Neck Pain</Text>
      <PDFRow label="Reported Neck Pain" value={data.neckPain.hasInjury} />
      
      {data.neckPain.hasInjury && (
        <>
          <PDFRow label="Onset" value={data.neckPain.painStart} />
          <PDFRow label="Initial Severity" value={data.neckPain.initialSeverity} />
          <PDFRow label="Current Severity" value={data.neckPain.currentSeverity} />
          <PDFRow label="Expected Resolution" value={`${data.neckPain.resolveDays} days`} />
          <PDFRow label="Prior History" value={data.neckPain.hadPrior} />
          <PDFRow label="Additional Information" value={data.neckPain.additionalInfo} />
        </>
      )}
      
      {/* Shoulder Pain */}
      <Text style={styles.subheader}>4. Shoulder Pain</Text>
      <PDFRow label="Reported Shoulder Pain" value={data.shoulderPain.hasInjury} />
      
      {data.shoulderPain.hasInjury && (
        <>
          <PDFRow label="Affected Side" value={data.shoulderPain.side} />
          <PDFRow label="Onset" value={data.shoulderPain.painStart} />
          <PDFRow label="Initial Severity" value={data.shoulderPain.initialSeverity} />
          <PDFRow label="Current Severity" value={data.shoulderPain.currentSeverity} />
          <PDFRow label="Expected Resolution" value={`${data.shoulderPain.resolveDays} days`} />
        </>
      )}
      
      {/* Back Pain */}
      <Text style={styles.subheader}>5. Back Pain</Text>
      <PDFRow label="Reported Back Pain" value={data.backPain.hasInjury} />
      
      {data.backPain.hasInjury && (
        <>
          <PDFRow label="Location" value={data.backPain.location} />
          <PDFRow label="Onset" value={data.backPain.painStart} />
          <PDFRow label="Initial Severity" value={data.backPain.initialSeverity} />
          <PDFRow label="Current Severity" value={data.backPain.currentSeverity} />
          <PDFRow label="Expected Resolution" value={`${data.backPain.resolveDays} days`} />
        </>
      )}
    </View>
  );
};
