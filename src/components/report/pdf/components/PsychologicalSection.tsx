
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { TravelAnxietyData } from '@/types/reportTypes';
import { styles } from './PDFStyles';
import { PDFRow } from './PDFRow';

interface HeadacheData {
  hasInjury: boolean;
  start: string;
  initialSeverity: string;
  currentSeverity: string;
  resolveDays: string;
  pastHistory: string;
}

interface PsychologicalSectionProps {
  headache: HeadacheData;
  travelAnxiety: TravelAnxietyData;
}

/**
 * Displays the psychological assessment section of the PDF report
 */
export const PsychologicalSection: React.FC<PsychologicalSectionProps> = ({ 
  headache, 
  travelAnxiety 
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.header}>Psychological Assessment</Text>
      
      {/* Headache */}
      <Text style={styles.subheader}>Headache</Text>
      <PDFRow label="Reported Headaches" value={headache.hasInjury} />
      
      {headache.hasInjury && (
        <>
          <PDFRow label="Onset" value={headache.start} />
          <PDFRow label="Initial Severity" value={headache.initialSeverity} />
          <PDFRow label="Current Severity" value={headache.currentSeverity} />
          <PDFRow label="Expected Resolution" value={`${headache.resolveDays} days`} />
          <PDFRow label="Previous History" value={headache.pastHistory} />
        </>
      )}
      
      {/* Travel Anxiety */}
      <Text style={styles.subheader}>Travel Anxiety</Text>
      <PDFRow label="Reported Travel Anxiety" value={travelAnxiety.hasAnxiety} />
      
      {travelAnxiety.hasAnxiety && (
        <>
          <PDFRow 
            label="Symptoms" 
            value={travelAnxiety.symptoms?.length ? travelAnxiety.symptoms.join(", ") : "None specified"} 
          />
          <PDFRow label="Currently Driving" value={travelAnxiety.currentlyDriving} />
          <PDFRow label="Initial Severity" value={travelAnxiety.initialSeverity} />
          <PDFRow label="Current Severity" value={travelAnxiety.currentSeverity} />
          <PDFRow label="Expected Resolution" value={`${travelAnxiety.resolveDays} days`} />
          <PDFRow label="Duration" value={travelAnxiety.duration} />
        </>
      )}
    </View>
  );
};
