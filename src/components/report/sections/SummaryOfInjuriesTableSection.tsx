
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface SummaryOfInjuriesTableSectionProps {
  formData: ReportData;
  styles: any;
}

export const SummaryOfInjuriesTableSection = ({ formData, styles }: SummaryOfInjuriesTableSectionProps) => {
  // Determine which injuries are present based on formData
  const hasNeckPain = formData.injuries.neckPain === "Yes";
  const hasShoulderPain = formData.injuries.shoulderPain === "Yes";
  const hasBackPain = formData.injuries.backPain === "Yes";
  const hasHeadache = formData.injuries.headache === "Yes";
  const hasTravelAnxiety = formData.injuries.travelAnxiety === "Yes";
  const hasBruising = formData.injuries.bruising === "Yes";
  
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
            <Text style={[styles.tableCell, { width: '15%' }]}>{formData.injuries.neckPainStart}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{formData.injuries.neckPainInitialSeverity}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>
              {formData.injuries.neckPainCurrentSeverity === "Resolved" 
                ? `${formData.injuries.neckPainResolveDays || "unknown"} days` 
                : formData.injuries.neckPainCurrentSeverity}
            </Text>
          </View>
        )}
        
        {hasShoulderPain && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: '30%' }]}>Shoulder Pain ({formData.injuries.shoulderSide})</Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>WAD II</Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>{formData.injuries.shoulderPainStart}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{formData.injuries.shoulderPainInitialSeverity}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>
              {formData.injuries.shoulderPainCurrentSeverity === "Resolved" 
                ? `${formData.injuries.shoulderPainResolveDays || "unknown"} days` 
                : formData.injuries.shoulderPainCurrentSeverity}
            </Text>
          </View>
        )}
        
        {hasBackPain && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: '30%' }]}>Back Pain ({formData.injuries.backLocation})</Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>WAD II</Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>{formData.injuries.backPainStart}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{formData.injuries.backPainInitialSeverity}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>
              {formData.injuries.backPainCurrentSeverity === "Resolved" 
                ? `${formData.injuries.backPainResolveDays || "unknown"} days` 
                : formData.injuries.backPainCurrentSeverity}
            </Text>
          </View>
        )}
        
        {hasHeadache && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: '30%' }]}>Headache</Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>WAD II</Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>{formData.injuries.headacheStart}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{formData.injuries.headacheInitialSeverity}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>
              {formData.injuries.headacheCurrentSeverity === "Resolved" 
                ? `${formData.injuries.headacheResolveDays || "unknown"} days` 
                : formData.injuries.headacheCurrentSeverity}
            </Text>
          </View>
        )}
        
        {hasTravelAnxiety && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: '30%' }]}>Travel Anxiety</Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>Psychological</Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>Immediate</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{formData.injuries.anxietyInitialSeverity}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>
              {formData.injuries.anxietyCurrentSeverity === "Resolved" 
                ? `${formData.injuries.anxietyResolveDays || "unknown"} days` 
                : formData.injuries.anxietyCurrentSeverity}
            </Text>
          </View>
        )}
        
        {hasBruising && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: '30%' }]}>Bruising</Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>Physical</Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>Immediate</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{formData.injuries.bruisingInitialSeverity || "Mild"}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>
              {formData.injuries.bruisingDuration ? `${formData.injuries.bruisingDuration} days` : "Unknown"}
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
