
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
      {formData.injuries.neckPain === "Yes" && (
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.fieldLabel}>8.1 Neck Pain</Text>
          <Text style={styles.fieldValue}>
            The claimant reported neck pain following the accident. The pain started {formData.injuries.neckPainStart.toLowerCase()}. 
            The initial severity was {formData.injuries.neckPainInitialSeverity.toLowerCase()}. 
            {formData.injuries.neckPainCurrentSeverity === "Resolved" 
              ? ` The neck pain has now resolved after ${formData.injuries.neckPainResolveDays || "an unspecified number of"} days.` 
              : ` The current severity is ${formData.injuries.neckPainCurrentSeverity.toLowerCase()}.`}
          </Text>
        </View>
      )}
      
      {/* Shoulder Pain */}
      {formData.injuries.shoulderPain === "Yes" && (
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.fieldLabel}>8.2 Shoulder Pain</Text>
          <Text style={styles.fieldValue}>
            The claimant reported pain in the {formData.injuries.shoulderSide.toLowerCase()} shoulder. 
            The pain started {formData.injuries.shoulderPainStart.toLowerCase()}. 
            The initial severity was {formData.injuries.shoulderPainInitialSeverity.toLowerCase()}. 
            {formData.injuries.shoulderPainCurrentSeverity === "Resolved" 
              ? ` The shoulder pain has now resolved after ${formData.injuries.shoulderPainResolveDays || "an unspecified number of"} days.` 
              : ` The current severity is ${formData.injuries.shoulderPainCurrentSeverity.toLowerCase()}.`}
          </Text>
        </View>
      )}
      
      {/* Back Pain */}
      {formData.injuries.backPain === "Yes" && (
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.fieldLabel}>8.3 Back Pain</Text>
          <Text style={styles.fieldValue}>
            The claimant reported pain in the {formData.injuries.backLocation.toLowerCase()} back. 
            The pain started {formData.injuries.backPainStart.toLowerCase()}. 
            The initial severity was {formData.injuries.backPainInitialSeverity.toLowerCase()}. 
            {formData.injuries.backPainCurrentSeverity === "Resolved" 
              ? ` The back pain has now resolved after ${formData.injuries.backPainResolveDays || "an unspecified number of"} days.` 
              : ` The current severity is ${formData.injuries.backPainCurrentSeverity.toLowerCase()}.`}
          </Text>
        </View>
      )}
      
      {/* Headache */}
      {formData.injuries.headache === "Yes" && (
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.fieldLabel}>8.4 Headache</Text>
          <Text style={styles.fieldValue}>
            The claimant reported headaches following the accident. 
            The headaches started {formData.injuries.headacheStart.toLowerCase()}. 
            The initial severity was {formData.injuries.headacheInitialSeverity.toLowerCase()}. 
            {formData.injuries.headacheCurrentSeverity === "Resolved" 
              ? ` The headaches have now resolved after ${formData.injuries.headacheResolveDays || "an unspecified number of"} days.` 
              : ` The current severity is ${formData.injuries.headacheCurrentSeverity.toLowerCase()}.`}
            {formData.injuries.headachePastHistory && ` Additional information: ${formData.injuries.headachePastHistory}`}
          </Text>
        </View>
      )}
    </View>
  );
};
