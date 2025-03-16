
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { formatSeverity } from '../pdf/utils/formatUtils';

interface SummaryOfInjuriesTableSectionProps {
  formData: ReportData;
  styles: any;
}

export const SummaryOfInjuriesTableSection = ({ formData, styles }: SummaryOfInjuriesTableSectionProps) => {
  // Helper function to get exact prognosis based on severity
  const getExactPrognosis = (severity: string, resolveDays?: string) => {
    if (severity === "Resolved") {
      return `Resolved in ${resolveDays || "unknown"} days`;
    } else if (severity === "Mild") {
      return "3 months from date of accident";
    } else if (severity === "Moderate") {
      return "6 months from date of accident";
    } else if (severity === "Severe") {
      return "9 months from date of accident";
    } else {
      return "Not specified";
    }
  };
  
  // Helper function to get onset description
  const getOnsetDescription = (painStart?: string) => {
    switch (painStart) {
      case "1": return "Same day";
      case "2": return "Next day";
      case "3": return "Few days later";
      default: return "Not specified";
    }
  };
  
  // Create array of injuries for the table
  const injuries = [
    formData.injuries.neckPain.hasInjury && {
      name: "Neck Pain",
      onset: getOnsetDescription(formData.injuries.neckPain.painStart),
      initialSeverity: formatSeverity(formData.injuries.neckPain.initialSeverity),
      currentSeverity: formatSeverity(formData.injuries.neckPain.currentSeverity),
      prognosis: getExactPrognosis(
        formData.injuries.neckPain.currentSeverity,
        formData.injuries.neckPain.resolveDays
      ),
      classification: "Whiplash"
    },
    formData.injuries.backPain.hasInjury && {
      name: "Back Pain",
      onset: getOnsetDescription(formData.injuries.backPain.painStart),
      initialSeverity: formatSeverity(formData.injuries.backPain.initialSeverity),
      currentSeverity: formatSeverity(formData.injuries.backPain.currentSeverity),
      prognosis: getExactPrognosis(
        formData.injuries.backPain.currentSeverity,
        formData.injuries.backPain.resolveDays
      ),
      classification: "Whiplash"
    },
    formData.injuries.shoulderPain.hasInjury && {
      name: `Shoulder Pain (${formData.injuries.shoulderPain.side})`,
      onset: getOnsetDescription(formData.injuries.shoulderPain.painStart),
      initialSeverity: formatSeverity(formData.injuries.shoulderPain.initialSeverity),
      currentSeverity: formatSeverity(formData.injuries.shoulderPain.currentSeverity),
      prognosis: getExactPrognosis(
        formData.injuries.shoulderPain.currentSeverity,
        formData.injuries.shoulderPain.resolveDays
      ),
      classification: "Whiplash"
    },
    formData.injuries.headache.hasInjury && {
      name: "Headache",
      onset: getOnsetDescription(formData.injuries.headache.start),
      initialSeverity: formatSeverity(formData.injuries.headache.initialSeverity),
      currentSeverity: formatSeverity(formData.injuries.headache.currentSeverity),
      prognosis: getExactPrognosis(
        formData.injuries.headache.currentSeverity,
        formData.injuries.headache.resolveDays
      ),
      classification: "Whiplash Associated"
    },
    formData.travelAnxiety.hasAnxiety && {
      name: "Travel Anxiety",
      onset: getOnsetDescription(formData.travelAnxiety.start),
      initialSeverity: formatSeverity(formData.travelAnxiety.initialSeverity),
      currentSeverity: formatSeverity(formData.travelAnxiety.currentSeverity),
      prognosis: getExactPrognosis(
        formData.travelAnxiety.currentSeverity,
        formData.travelAnxiety.resolveDays
      ),
      classification: "Psychological"
    },
    formData.other.bruising.hasBruising && {
      name: "Bruising",
      onset: getOnsetDescription(formData.other.bruising.noticed),
      initialSeverity: formatSeverity(formData.other.bruising.initialSeverity),
      currentSeverity: formatSeverity(formData.other.bruising.currentSeverity),
      prognosis: getExactPrognosis(
        formData.other.bruising.currentSeverity,
        formData.other.bruising.resolveDays
      ),
      classification: "Non-whiplash"
    },
    formData.other.otherInjuries.hasOtherInjury && {
      name: formData.other.otherInjuries.name || "Other Injury",
      onset: getOnsetDescription(formData.other.otherInjuries.start),
      initialSeverity: formatSeverity(formData.other.otherInjuries.initialSeverity),
      currentSeverity: formatSeverity(formData.other.otherInjuries.currentSeverity),
      prognosis: getExactPrognosis(
        formData.other.otherInjuries.currentSeverity,
        formData.other.otherInjuries.resolveDays
      ),
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
              <View style={[styles.cell, { width: '20%' }]}>
                <Text style={{ fontSize: 8 }}>Injury</Text>
              </View>
              <View style={[styles.cell, { width: '15%' }]}>
                <Text style={{ fontSize: 8 }}>Onset</Text>
              </View>
              <View style={[styles.cell, { width: '15%' }]}>
                <Text style={{ fontSize: 8 }}>Initial Severity</Text>
              </View>
              <View style={[styles.cell, { width: '15%' }]}>
                <Text style={{ fontSize: 8 }}>Current Severity</Text>
              </View>
              <View style={[styles.cell, { width: '20%' }]}>
                <Text style={{ fontSize: 8 }}>Prognosis</Text>
              </View>
              <View style={[styles.cell, { width: '15%' }]}>
                <Text style={{ fontSize: 8 }}>Classification</Text>
              </View>
            </View>
            
            {injuries.map((injury, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={[styles.cell, { width: '20%' }]}>
                  <Text style={{ fontSize: 8 }}>{injury.name}</Text>
                </View>
                <View style={[styles.cell, { width: '15%' }]}>
                  <Text style={{ fontSize: 8 }}>{injury.onset}</Text>
                </View>
                <View style={[styles.cell, { width: '15%' }]}>
                  <Text style={{ fontSize: 8 }}>{injury.initialSeverity}</Text>
                </View>
                <View style={[styles.cell, { width: '15%' }]}>
                  <Text style={{ fontSize: 8 }}>{injury.currentSeverity}</Text>
                </View>
                <View style={[styles.cell, { width: '20%' }]}>
                  <Text style={{ fontSize: 8 }}>{injury.prognosis}</Text>
                </View>
                <View style={[styles.cell, { width: '15%' }]}>
                  <Text style={{ fontSize: 8 }}>{injury.classification}</Text>
                </View>
              </View>
            ))}
          </View>
          
          <View style={{ marginTop: 6 }}>
            <Text style={{ ...styles.fieldValue, fontSize: 8 }}>
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
