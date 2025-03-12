
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { styles } from './PDFStyles';

interface InjuryData {
  hasInjury: boolean;
  name: string;
  currentStatus: string;
  prognosis: string;
  classification: string;
}

interface InjuriesData {
  neckPain: string;
  shoulderPain: string;
  shoulderSide: string;
  backPain: string;
  backLocation: string;
  headache: string;
  travelAnxiety: string;
  hasBruising: string;
  hasVisibleScar: string;
}

export const SummaryOfInjuriesSection = ({ data }: { data: InjuriesData }) => {
  // Function to determine if an injury is present
  const hasInjury = (value: string) => value === "1";
  
  // Create injury table data
  const injuryTableData: InjuryData[] = [];
  
  if (hasInjury(data.neckPain)) {
    injuryTableData.push({
      hasInjury: true,
      name: "Neck Pain",
      currentStatus: "Ongoing",
      prognosis: "Expected to resolve within 6-12 months",
      classification: "Whiplash"
    });
  }
  
  if (hasInjury(data.shoulderPain)) {
    const side = data.shoulderSide === "1" ? "Right" : 
                 data.shoulderSide === "2" ? "Left" : 
                 data.shoulderSide === "3" ? "Both" : "Unknown";
                 
    injuryTableData.push({
      hasInjury: true,
      name: `Shoulder Pain (${side})`,
      currentStatus: "Improving",
      prognosis: "Expected to resolve within 3-6 months",
      classification: "Whiplash Associated Disorder"
    });
  }
  
  if (hasInjury(data.backPain)) {
    const location = data.backLocation === "1" ? "Upper back" :
                     data.backLocation === "2" ? "Mid back" :
                     data.backLocation === "3" ? "Lower back" : "Unknown";
                     
    injuryTableData.push({
      hasInjury: true,
      name: `Back Pain (${location})`,
      currentStatus: "Ongoing",
      prognosis: "Expected to resolve within 6-12 months",
      classification: "Whiplash Associated Disorder"
    });
  }
  
  if (hasInjury(data.headache)) {
    injuryTableData.push({
      hasInjury: true,
      name: "Headache",
      currentStatus: "Intermittent",
      prognosis: "Expected to resolve within 3-6 months",
      classification: "Whiplash Associated Disorder"
    });
  }
  
  if (hasInjury(data.travelAnxiety)) {
    injuryTableData.push({
      hasInjury: true,
      name: "Travel Anxiety",
      currentStatus: "Ongoing",
      prognosis: "Likely to improve with time and confidence building",
      classification: "Psychological"
    });
  }
  
  if (hasInjury(data.hasBruising)) {
    injuryTableData.push({
      hasInjury: true,
      name: "Bruising" + (hasInjury(data.hasVisibleScar) ? " with scarring" : ""),
      currentStatus: hasInjury(data.hasVisibleScar) ? "Visible scarring remains" : "Resolved",
      prognosis: hasInjury(data.hasVisibleScar) ? "Permanent scarring likely" : "Fully resolved",
      classification: "Soft Tissue"
    });
  }
  
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>7. Summary of Injuries</Text>
      
      {injuryTableData.length > 0 ? (
        <View style={styles.injuryTable}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <View style={styles.tableHeaderCell1}>
              <Text style={styles.tableHeaderText}>No.</Text>
            </View>
            <View style={styles.tableHeaderCell2}>
              <Text style={styles.tableHeaderText}>Injury</Text>
            </View>
            <View style={styles.tableHeaderCell3}>
              <Text style={styles.tableHeaderText}>Current Status</Text>
            </View>
            <View style={styles.tableHeaderCell4}>
              <Text style={styles.tableHeaderText}>Prognosis</Text>
            </View>
            <View style={styles.tableHeaderCell5}>
              <Text style={styles.tableHeaderText}>Classification</Text>
            </View>
          </View>
          
          {/* Table Rows */}
          {injuryTableData.map((injury, index) => (
            <View key={`injury-${index}`} style={styles.tableRow}>
              <View style={styles.tableCell1}>
                <Text style={styles.tableCellText}>{index + 1}</Text>
              </View>
              <View style={styles.tableCell2}>
                <Text style={styles.tableCellText}>{injury.name}</Text>
              </View>
              <View style={styles.tableCell3}>
                <Text style={styles.tableCellText}>{injury.currentStatus}</Text>
              </View>
              <View style={styles.tableCell4}>
                <Text style={styles.tableCellText}>{injury.prognosis}</Text>
              </View>
              <View style={styles.tableCell5}>
                <Text style={styles.tableCellText}>{injury.classification}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.summaryBox}>
          <Text style={styles.summaryText}>No injuries reported</Text>
        </View>
      )}
    </View>
  );
};
