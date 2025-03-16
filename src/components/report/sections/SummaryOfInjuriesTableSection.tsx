
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { formatSeverity } from '../pdf/utils/formatUtils';

interface SummaryOfInjuriesTableSectionProps {
  formData: ReportData;
  styles: any;
}

export const SummaryOfInjuriesTableSection = ({ formData, styles }: SummaryOfInjuriesTableSectionProps) => {
  // Create array of injuries for the table
  const injuries = [
    formData.injuries.neckPain.hasInjury && {
      name: "Neck Pain",
      initialSeverity: formatSeverity(formData.injuries.neckPain.initialSeverity),
      currentSeverity: formatSeverity(formData.injuries.neckPain.currentSeverity),
      prognosis: formatSeverity(formData.injuries.neckPain.currentSeverity) === "Resolved" ? 
        "Resolved" : "6-9 months from accident",
      classification: "Whiplash"
    },
    formData.injuries.backPain.hasInjury && {
      name: "Back Pain",
      initialSeverity: formatSeverity(formData.injuries.backPain.initialSeverity),
      currentSeverity: formatSeverity(formData.injuries.backPain.currentSeverity),
      prognosis: formatSeverity(formData.injuries.backPain.currentSeverity) === "Resolved" ? 
        "Resolved" : "9-12 months from accident",
      classification: "Whiplash"
    },
    formData.injuries.shoulderPain.hasInjury && {
      name: `Shoulder Pain (${formData.injuries.shoulderPain.side})`,
      initialSeverity: formatSeverity(formData.injuries.shoulderPain.initialSeverity),
      currentSeverity: formatSeverity(formData.injuries.shoulderPain.currentSeverity),
      prognosis: formatSeverity(formData.injuries.shoulderPain.currentSeverity) === "Resolved" ? 
        "Resolved" : "6-9 months from accident",
      classification: "Whiplash"
    },
    formData.injuries.headache.hasInjury && {
      name: "Headache",
      initialSeverity: formatSeverity(formData.injuries.headache.initialSeverity),
      currentSeverity: formatSeverity(formData.injuries.headache.currentSeverity),
      prognosis: formatSeverity(formData.injuries.headache.currentSeverity) === "Resolved" ? 
        "Resolved" : "3-6 months from accident",
      classification: "Whiplash Associated"
    },
    formData.travelAnxiety.hasAnxiety && {
      name: "Travel Anxiety",
      initialSeverity: formatSeverity(formData.travelAnxiety.initialSeverity),
      currentSeverity: formatSeverity(formData.travelAnxiety.currentSeverity),
      prognosis: formatSeverity(formData.travelAnxiety.currentSeverity) === "Resolved" ? 
        "Resolved" : "6-9 months from accident",
      classification: "Psychological"
    },
    formData.other.bruising.hasBruising && {
      name: "Bruising",
      initialSeverity: formatSeverity(formData.other.bruising.initialSeverity),
      currentSeverity: formatSeverity(formData.other.bruising.currentSeverity),
      prognosis: formatSeverity(formData.other.bruising.currentSeverity) === "Resolved" ? 
        "Resolved" : "2-4 weeks from accident",
      classification: "Non-whiplash"
    },
    formData.other.otherInjuries.hasOtherInjury && {
      name: formData.other.otherInjuries.name || "Other Injury",
      initialSeverity: formatSeverity(formData.other.otherInjuries.initialSeverity),
      currentSeverity: formatSeverity(formData.other.otherInjuries.currentSeverity),
      prognosis: formatSeverity(formData.other.otherInjuries.currentSeverity) === "Resolved" ? 
        "Resolved" : "Varies based on injury type",
      classification: "Non-whiplash"
    }
  ].filter(Boolean);

  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 7 - Summary of Injuries</Text>
      
      {injuries.length > 0 ? (
        <>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <View style={[styles.cell, { width: '25%' }]}>
                <Text>Injury</Text>
              </View>
              <View style={[styles.cell, { width: '15%' }]}>
                <Text>Initial Severity</Text>
              </View>
              <View style={[styles.cell, { width: '15%' }]}>
                <Text>Current Severity</Text>
              </View>
              <View style={[styles.cell, { width: '25%' }]}>
                <Text>Prognosis</Text>
              </View>
              <View style={[styles.cell, { width: '20%' }]}>
                <Text>Classification</Text>
              </View>
            </View>
            
            {injuries.map((injury, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={[styles.cell, { width: '25%' }]}>
                  <Text>{injury.name}</Text>
                </View>
                <View style={[styles.cell, { width: '15%' }]}>
                  <Text>{injury.initialSeverity}</Text>
                </View>
                <View style={[styles.cell, { width: '15%' }]}>
                  <Text>{injury.currentSeverity}</Text>
                </View>
                <View style={[styles.cell, { width: '25%' }]}>
                  <Text>{injury.prognosis}</Text>
                </View>
                <View style={[styles.cell, { width: '20%' }]}>
                  <Text>{injury.classification}</Text>
                </View>
              </View>
            ))}
          </View>
          
          <View style={{ marginTop: 10 }}>
            <Text style={styles.fieldValue}>
              The prognosis periods are given from the date of the accident and represent my professional opinion on the
              expected recovery timeline based on the severity of the injuries and the claimant's presentation at the time of
              examination.
            </Text>
          </View>
        </>
      ) : (
        <Text style={styles.fieldValue}>No injuries were reported by the claimant.</Text>
      )}
    </View>
  );
};
