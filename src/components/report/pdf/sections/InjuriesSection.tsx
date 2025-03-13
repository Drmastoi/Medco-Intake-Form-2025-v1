
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface InjuriesSectionProps {
  formData: ReportData;
  styles: any;
}

export const InjuriesSection = ({ formData, styles }: InjuriesSectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 8 - Injuries and Symptoms</Text>
      
      {/* Neck Pain */}
      {formData.injuries.neckPain.hasInjury && (
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.fieldLabel}>8.1 Neck Pain</Text>
          <Text style={styles.fieldValue}>
            The claimant reported neck pain following the accident. The pain started {formData.injuries.neckPain.painStart.toLowerCase()}. 
            The initial severity was {formData.injuries.neckPain.initialSeverity.toLowerCase()}. 
            {formData.injuries.neckPain.currentSeverity === "Resolved" 
              ? ` The neck pain has now resolved after ${formData.injuries.neckPain.resolveDays || "an unspecified number of"} days.` 
              : ` The current severity is ${formData.injuries.neckPain.currentSeverity.toLowerCase()}.`}
          </Text>
        </View>
      )}
      
      {/* Shoulder Pain */}
      {formData.injuries.shoulderPain.hasInjury && (
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.fieldLabel}>8.2 Shoulder Pain</Text>
          <Text style={styles.fieldValue}>
            The claimant reported pain in the {formData.injuries.shoulderPain.side.toLowerCase()} shoulder. 
            The pain started {formData.injuries.shoulderPain.painStart.toLowerCase()}. 
            The initial severity was {formData.injuries.shoulderPain.initialSeverity.toLowerCase()}. 
            {formData.injuries.shoulderPain.currentSeverity === "Resolved" 
              ? ` The shoulder pain has now resolved after ${formData.injuries.shoulderPain.resolveDays || "an unspecified number of"} days.` 
              : ` The current severity is ${formData.injuries.shoulderPain.currentSeverity.toLowerCase()}.`}
          </Text>
        </View>
      )}
      
      {/* Back Pain */}
      {formData.injuries.backPain.hasInjury && (
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.fieldLabel}>8.3 Back Pain</Text>
          <Text style={styles.fieldValue}>
            The claimant reported pain in the {formData.injuries.backPain.location.toLowerCase()} back. 
            The pain started {formData.injuries.backPain.painStart.toLowerCase()}. 
            The initial severity was {formData.injuries.backPain.initialSeverity.toLowerCase()}. 
            {formData.injuries.backPain.currentSeverity === "Resolved" 
              ? ` The back pain has now resolved after ${formData.injuries.backPain.resolveDays || "an unspecified number of"} days.` 
              : ` The current severity is ${formData.injuries.backPain.currentSeverity.toLowerCase()}.`}
          </Text>
        </View>
      )}
      
      {/* Headache */}
      {formData.injuries.headache.hasInjury && (
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.fieldLabel}>8.4 Headache</Text>
          <Text style={styles.fieldValue}>
            The claimant reported headaches following the accident. 
            The headaches started {formData.injuries.headache.start.toLowerCase()}. 
            The initial severity was {formData.injuries.headache.initialSeverity.toLowerCase()}. 
            {formData.injuries.headache.currentSeverity === "Resolved" 
              ? ` The headaches have now resolved after ${formData.injuries.headache.resolveDays || "an unspecified number of"} days.` 
              : ` The current severity is ${formData.injuries.headache.currentSeverity.toLowerCase()}.`}
            {formData.injuries.headache.pastHistory && ` Additional information: ${formData.injuries.headache.pastHistory}`}
          </Text>
        </View>
      )}
    </View>
  );
};
