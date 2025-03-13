
import { Text, View } from '@react-pdf/renderer';
import { InjuriesTable } from './InjuriesTable';
import { InjuryTableRow } from './InjuryTableRow';
import { ExceptionalCircumstancesTable } from './ExceptionalCircumstancesTable';
import { 
  getInjuryClassification, 
  getPrognosis, 
  getTreatmentRecommendation 
} from '../utils/injuryClassification';

interface SummaryOfInjuriesTableSectionProps {
  formData: any;
  styles: any;
}

// Helper function to determine severity text from level
const getSeverityText = (level?: string) => {
  switch(level) {
    case "1": return "Mild";
    case "2": return "Moderate";
    case "3": return "Severe";
    case "4": return "Resolved";
    default: return "Unknown";
  }
};

export const SummaryOfInjuriesTableSection = ({ formData, styles }: SummaryOfInjuriesTableSectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 5 - Summary of Injuries</Text>
      
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>Injury</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Current Status</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>Classification</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Treatment</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Prognosis</Text>
        </View>
        
        {/* Neck Injury */}
        {formData.injuries.neckPain.hasInjury && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>Neck Pain</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {formData.injuries.neckPain.currentSeverity}
            </Text>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>
              {getInjuryClassification("Neck")}
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {getTreatmentRecommendation(formData.injuries.neckPain.currentSeverity, "Neck")}
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {formData.injuries.neckPain.currentSeverity === "Resolved" 
                ? `${formData.injuries.neckPain.resolveDays || "Unknown"} Days` 
                : getPrognosis(formData.injuries.neckPain.currentSeverity)}
            </Text>
          </View>
        )}
        
        {/* Shoulder Injury */}
        {formData.injuries.shoulderPain.hasInjury && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>
              Shoulder Pain ({formData.injuries.shoulderPain.side === "right" ? "Right" : 
                formData.injuries.shoulderPain.side === "left" ? "Left" : "Both"})
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {formData.injuries.shoulderPain.currentSeverity}
            </Text>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>
              {getInjuryClassification("Shoulder")}
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {getTreatmentRecommendation(formData.injuries.shoulderPain.currentSeverity, "Shoulder")}
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {formData.injuries.shoulderPain.currentSeverity === "Resolved" 
                ? `${formData.injuries.shoulderPain.resolveDays || "Unknown"} Days` 
                : getPrognosis(formData.injuries.shoulderPain.currentSeverity)}
            </Text>
          </View>
        )}
        
        {/* Back Injury */}
        {formData.injuries.backPain.hasInjury && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>
              Back Pain ({formData.injuries.backPain.location === "1" ? "Upper" : 
                formData.injuries.backPain.location === "2" ? "Middle" : 
                formData.injuries.backPain.location === "3" ? "Lower" : "Full"})
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {formData.injuries.backPain.currentSeverity}
            </Text>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>
              {getInjuryClassification("Back", formData.injuries.backPain.location)}
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {getTreatmentRecommendation(formData.injuries.backPain.currentSeverity, "Back")}
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {formData.injuries.backPain.currentSeverity === "Resolved" 
                ? `${formData.injuries.backPain.resolveDays || "Unknown"} Days` 
                : getPrognosis(formData.injuries.backPain.currentSeverity)}
            </Text>
          </View>
        )}
        
        {/* Headache */}
        {formData.injuries.headache.hasInjury && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>Headaches</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {formData.injuries.headache.currentSeverity}
            </Text>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>
              {getInjuryClassification("Headache")}
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {getTreatmentRecommendation(formData.injuries.headache.currentSeverity, "Headache")}
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {formData.injuries.headache.currentSeverity === "Resolved" 
                ? `${formData.injuries.headache.resolveDays || "Unknown"} Days` 
                : getPrognosis(formData.injuries.headache.currentSeverity)}
            </Text>
          </View>
        )}
        
        {/* Anxiety */}
        {formData.injuries.travelAnxiety?.hasInjury && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>Travel Anxiety</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {formData.injuries.travelAnxiety.currentSeverity}
            </Text>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>
              {getInjuryClassification("Anxiety")}
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {getTreatmentRecommendation(formData.injuries.travelAnxiety.currentSeverity, "Anxiety")}
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {formData.injuries.travelAnxiety.currentSeverity === "Resolved" 
                ? `${formData.injuries.travelAnxiety.duration || "Unknown"} Days` 
                : getPrognosis(formData.injuries.travelAnxiety.currentSeverity)}
            </Text>
          </View>
        )}
        
        {/* Bruising */}
        {formData.bruising?.hasBruising && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>Bruising/Scarring</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {formData.bruising.currentSeverity || getSeverityText(formData.bruising.severityLevel)}
            </Text>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>
              {getInjuryClassification("Other")}
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {getTreatmentRecommendation(formData.bruising.currentSeverity || formData.bruising.severityLevel, "Other")}
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {(formData.bruising.currentSeverity === "Resolved" || formData.bruising.severityLevel === "4") 
                ? `${formData.bruising.resolveDays || "Unknown"} Days` 
                : getPrognosis(formData.bruising.currentSeverity || formData.bruising.severityLevel)}
            </Text>
          </View>
        )}
        
        {/* Other Injury */}
        {formData.otherInjuries?.hasOtherInjury && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>
              {formData.otherInjuries.injuryName || "Other Injury"}
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {formData.otherInjuries.currentSeverity || getSeverityText(formData.otherInjuries.severityLevel)}
            </Text>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>
              {getInjuryClassification("Other")}
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {getTreatmentRecommendation(formData.otherInjuries.currentSeverity || formData.otherInjuries.severityLevel, "Other")}
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {(formData.otherInjuries.currentSeverity === "Resolved" || formData.otherInjuries.severityLevel === "4") 
                ? `${formData.otherInjuries.resolveDays || "Unknown"} Days` 
                : getPrognosis(formData.otherInjuries.currentSeverity || formData.otherInjuries.severityLevel)}
            </Text>
          </View>
        )}
      </View>
      
      {/* Add a note if no injuries reported */}
      {!formData.injuries.neckPain?.hasInjury && 
       !formData.injuries.shoulderPain?.hasInjury && 
       !formData.injuries.backPain?.hasInjury && 
       !formData.injuries.headache?.hasInjury && 
       !formData.injuries.travelAnxiety?.hasInjury && 
       !formData.bruising?.hasBruising && 
       !formData.otherInjuries?.hasOtherInjury && (
        <Text style={styles.summaryText}>No injuries reported by the claimant.</Text>
      )}
    </View>
  );
};
