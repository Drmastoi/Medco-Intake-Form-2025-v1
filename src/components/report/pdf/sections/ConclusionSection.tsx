
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface ConclusionSectionProps {
  formData: ReportData;
  styles: any;
}

export const ConclusionSection = ({ formData, styles }: ConclusionSectionProps) => {
  // Calculate time for the longest injury to resolve
  const getMaxRecoveryTime = () => {
    const recoveryTimes = [];
    
    if (formData.injuries.neckPain.hasInjury && formData.injuries.neckPain.currentSeverity === "Resolved" && formData.injuries.neckPain.resolveDays) {
      recoveryTimes.push(parseInt(formData.injuries.neckPain.resolveDays));
    }
    
    if (formData.injuries.shoulderPain.hasInjury && formData.injuries.shoulderPain.currentSeverity === "Resolved" && formData.injuries.shoulderPain.resolveDays) {
      recoveryTimes.push(parseInt(formData.injuries.shoulderPain.resolveDays));
    }
    
    if (formData.injuries.backPain.hasInjury && formData.injuries.backPain.currentSeverity === "Resolved" && formData.injuries.backPain.resolveDays) {
      recoveryTimes.push(parseInt(formData.injuries.backPain.resolveDays));
    }
    
    if (formData.injuries.headache.hasInjury && formData.injuries.headache.currentSeverity === "Resolved" && formData.injuries.headache.resolveDays) {
      recoveryTimes.push(parseInt(formData.injuries.headache.resolveDays));
    }
    
    if (formData.travelAnxiety.hasAnxiety && formData.travelAnxiety.currentSeverity === "Resolved" && formData.travelAnxiety.resolveDays) {
      recoveryTimes.push(parseInt(formData.travelAnxiety.resolveDays));
    }
    
    if (recoveryTimes.length === 0) return "unknown duration";
    return Math.max(...recoveryTimes) + " days";
  };
  
  // Determine if all injuries are resolved
  const allInjuriesResolved = () => {
    if (formData.injuries.neckPain.hasInjury && formData.injuries.neckPain.currentSeverity !== "Resolved") return false;
    if (formData.injuries.shoulderPain.hasInjury && formData.injuries.shoulderPain.currentSeverity !== "Resolved") return false;
    if (formData.injuries.backPain.hasInjury && formData.injuries.backPain.currentSeverity !== "Resolved") return false;
    if (formData.injuries.headache.hasInjury && formData.injuries.headache.currentSeverity !== "Resolved") return false;
    if (formData.travelAnxiety.hasAnxiety && formData.travelAnxiety.currentSeverity !== "Resolved") return false;
    
    return true;
  };
  
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 16 - Conclusion</Text>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>16.1 Assessment Summary</Text>
        <Text style={styles.fieldValue}>
          Based on my examination and the information provided by the claimant, I believe that the injuries described are consistent with the mechanism of the accident as described. The injuries are in keeping with those typically seen in this type of road traffic accident.
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>16.2 Recovery Status</Text>
        <Text style={styles.fieldValue}>
          {allInjuriesResolved() 
            ? `The claimant appears to have made a full recovery from all injuries sustained in the accident within a period of ${getMaxRecoveryTime()}.`
            : "The claimant has not yet made a full recovery from all injuries sustained in the accident."}
        </Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.fieldLabel}>16.3 Prognosis</Text>
        <Text style={styles.fieldValue}>
          {allInjuriesResolved() 
            ? "No further treatment is recommended as the claimant has made a full recovery."
            : "I would recommend ongoing monitoring by the claimant's GP. If symptoms persist beyond 6 months from the date of the accident, a reassessment may be warranted."}
        </Text>
      </View>
    </View>
  );
};
