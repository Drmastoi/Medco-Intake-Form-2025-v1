
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';
import { getOnsetText } from '@/utils/injuryTextUtils';

interface SummaryOfInjuriesTableSectionProps {
  formData: ReportData;
  styles: any;
}

export const SummaryOfInjuriesTableSection = ({ formData, styles }: SummaryOfInjuriesTableSectionProps) => {
  // Determine which injuries are present based on formData
  const hasNeckPain = formData.injuries.neckPain.hasInjury;
  const hasShoulderPain = formData.injuries.shoulderPain.hasInjury;
  const hasBackPain = formData.injuries.backPain.hasInjury;
  const hasHeadache = formData.injuries.headache.hasInjury;
  const hasTravelAnxiety = formData.travelAnxiety.hasAnxiety;
  const hasBruising = formData.other?.bruising?.hasBruising;
  
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 6 - Summary of Injuries</Text>
      
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { width: '30%' }]}>Injury</Text>
          <Text style={[styles.tableHeaderCell, { width: '15%' }]}>Classification</Text>
          <Text style={[styles.tableHeaderCell, { width: '15%' }]}>Onset</Text>
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>Initial Severity</Text>
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>Recovery/Prognosis</Text>
        </View>
        
        {hasNeckPain && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: '30%' }]}>Neck Pain</Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>WAD II</Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>{getOnsetText(formData.injuries.neckPain.painStart)}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{formData.injuries.neckPain.initialSeverity}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>
              {formData.injuries.neckPain.currentSeverity === "Resolved" 
                ? `${formData.injuries.neckPain.resolveDays || "unknown"} days` 
                : formData.injuries.neckPain.currentSeverity}
            </Text>
          </View>
        )}
        
        {hasShoulderPain && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: '30%' }]}>Shoulder Pain ({formData.injuries.shoulderPain.side})</Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>WAD II</Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>{getOnsetText(formData.injuries.shoulderPain.painStart)}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{formData.injuries.shoulderPain.initialSeverity}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>
              {formData.injuries.shoulderPain.currentSeverity === "Resolved" 
                ? `${formData.injuries.shoulderPain.resolveDays || "unknown"} days` 
                : formData.injuries.shoulderPain.currentSeverity}
            </Text>
          </View>
        )}
        
        {hasBackPain && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: '30%' }]}>Back Pain ({formData.injuries.backPain.location})</Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>WAD II</Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>{getOnsetText(formData.injuries.backPain.painStart)}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{formData.injuries.backPain.initialSeverity}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>
              {formData.injuries.backPain.currentSeverity === "Resolved" 
                ? `${formData.injuries.backPain.resolveDays || "unknown"} days` 
                : formData.injuries.backPain.currentSeverity}
            </Text>
          </View>
        )}
        
        {hasHeadache && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: '30%' }]}>Headache</Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>WAD II</Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>{getOnsetText(formData.injuries.headache.start)}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{formData.injuries.headache.initialSeverity}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>
              {formData.injuries.headache.currentSeverity === "Resolved" 
                ? `${formData.injuries.headache.resolveDays || "unknown"} days` 
                : formData.injuries.headache.currentSeverity}
            </Text>
          </View>
        )}
        
        {hasTravelAnxiety && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: '30%' }]}>Travel Anxiety</Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>Psychological</Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>Immediate</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{formData.travelAnxiety.initialSeverity}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>
              {formData.travelAnxiety.currentSeverity === "Resolved" 
                ? `${formData.travelAnxiety.resolveDays || "unknown"} days` 
                : formData.travelAnxiety.currentSeverity}
            </Text>
          </View>
        )}
        
        {hasBruising && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: '30%' }]}>Bruising</Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>Physical</Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>Immediate</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{formData.other?.bruising?.initialSeverity || "Mild"}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>
              {formData.other?.bruising?.resolveDays ? `${formData.other.bruising.resolveDays} days` : "Unknown"}
            </Text>
          </View>
        )}
      </View>
      
      <View style={{ marginTop: 10 }}>
        <Text style={styles.summaryText}>
          Based on the examination and information provided by the claimant, the injuries are consistent with the accident as described.
          The injuries presented are typical of those sustained in this type of road traffic accident.
        </Text>
      </View>
    </View>
  );
};
