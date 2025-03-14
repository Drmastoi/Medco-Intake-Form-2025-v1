
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
  
  // Helper function to convert severity to prognosis in months
  const getPrognosisMonths = (severity: string, resolveDays?: string) => {
    if (severity === "Resolved" && resolveDays) {
      return `${resolveDays} days`;
    } else if (severity === "Mild") {
      return "3 months";
    } else if (severity === "Moderate") {
      return "6 months";
    } else if (severity === "Severe") {
      return "9 months";
    }
    return "Unknown";
  };

  // Helper function to get treatment recommendation
  const getTreatmentRecommendation = (injuryType: string, severity: string) => {
    if (severity === "Resolved") {
      return "None - Resolved";
    } else if (injuryType === "Headache") {
      return "Pain killers as and when required";
    } else if (injuryType === "Travel Anxiety") {
      return "Self-help strategies, Reassurance";
    } else if (injuryType === "Bruising") {
      return "Self-resolving, Pain management";
    } else {
      return "Physiotherapy, Pain management";
    }
  };
  
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 6 - Summary of Injuries</Text>
      
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { width: '30%' }]}>Injury</Text>
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>Classification</Text>
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>Current Status</Text>
          <Text style={[styles.tableHeaderCell, { width: '30%' }]}>Treatment</Text>
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>Prognosis</Text>
        </View>
        
        {hasNeckPain && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: '30%' }]}>Neck Pain</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>Whiplash</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{formData.injuries.neckPain.currentSeverity}</Text>
            <Text style={[styles.tableCell, { width: '30%' }]}>{getTreatmentRecommendation("Neck", formData.injuries.neckPain.currentSeverity)}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{getPrognosisMonths(formData.injuries.neckPain.currentSeverity, formData.injuries.neckPain.resolveDays)}</Text>
          </View>
        )}
        
        {hasShoulderPain && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: '30%' }]}>Shoulder Pain ({formData.injuries.shoulderPain.side})</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>Whiplash</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{formData.injuries.shoulderPain.currentSeverity}</Text>
            <Text style={[styles.tableCell, { width: '30%' }]}>{getTreatmentRecommendation("Shoulder", formData.injuries.shoulderPain.currentSeverity)}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{getPrognosisMonths(formData.injuries.shoulderPain.currentSeverity, formData.injuries.shoulderPain.resolveDays)}</Text>
          </View>
        )}
        
        {hasBackPain && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: '30%' }]}>Back Pain ({formData.injuries.backPain.location})</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>Whiplash</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{formData.injuries.backPain.currentSeverity}</Text>
            <Text style={[styles.tableCell, { width: '30%' }]}>{getTreatmentRecommendation("Back", formData.injuries.backPain.currentSeverity)}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{getPrognosisMonths(formData.injuries.backPain.currentSeverity, formData.injuries.backPain.resolveDays)}</Text>
          </View>
        )}
        
        {hasHeadache && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: '30%' }]}>Headache</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>Whiplash</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{formData.injuries.headache.currentSeverity}</Text>
            <Text style={[styles.tableCell, { width: '30%' }]}>Pain killers as and when required</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{getPrognosisMonths(formData.injuries.headache.currentSeverity, formData.injuries.headache.resolveDays)}</Text>
          </View>
        )}
        
        {hasTravelAnxiety && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: '30%' }]}>Travel Anxiety</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>Psychological</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{formData.travelAnxiety.currentSeverity}</Text>
            <Text style={[styles.tableCell, { width: '30%' }]}>{getTreatmentRecommendation("Travel Anxiety", formData.travelAnxiety.currentSeverity)}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{getPrognosisMonths(formData.travelAnxiety.currentSeverity, formData.travelAnxiety.resolveDays)}</Text>
          </View>
        )}
        
        {hasBruising && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: '30%' }]}>Bruising</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>Physical</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{formData.other?.bruising?.currentSeverity || "Resolved"}</Text>
            <Text style={[styles.tableCell, { width: '30%' }]}>{getTreatmentRecommendation("Bruising", formData.other?.bruising?.currentSeverity || "Resolved")}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>
              {formData.other?.bruising?.resolveDays ? `${formData.other.bruising.resolveDays} days` : "2-3 weeks"}
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
