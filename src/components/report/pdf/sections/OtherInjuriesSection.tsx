
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface OtherInjuriesSectionProps {
  formData: ReportData;
  styles: any;
}

export const OtherInjuriesSection = ({ formData, styles }: OtherInjuriesSectionProps) => {
  const { other } = formData;
  const { otherInjuries } = other;
  
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 10 - Other Injuries</Text>
      
      {otherInjuries.hasOtherInjury ? (
        <>
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Other Injury Present:</Text>
              <Text style={styles.fieldValue}>Yes</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Injury Type:</Text>
              <Text style={styles.fieldValue}>{otherInjuries.name || "Not specified"}</Text>
            </View>
          </View>
          
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>When Started:</Text>
              <Text style={styles.fieldValue}>{otherInjuries.start || "Not specified"}</Text>
            </View>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Initial Severity:</Text>
              <Text style={styles.fieldValue}>{otherInjuries.initialSeverity || "Not specified"}</Text>
            </View>
          </View>
          
          <View style={styles.fieldRow}>
            <View style={styles.fieldColumn}>
              <Text style={styles.fieldLabel}>Current Severity:</Text>
              <Text style={styles.fieldValue}>{otherInjuries.currentSeverity || "Not specified"}</Text>
            </View>
            {otherInjuries.currentSeverity === "Resolved" && (
              <View style={styles.fieldColumn}>
                <Text style={styles.fieldLabel}>Resolved After:</Text>
                <Text style={styles.fieldValue}>{otherInjuries.resolveDays || "Not specified"} days</Text>
              </View>
            )}
          </View>
        </>
      ) : (
        <Text style={styles.fieldValue}>No other injuries were reported following the accident.</Text>
      )}
      
      {/* Summary Text */}
      <Text style={styles.summaryText}>
        {otherInjuries.hasOtherInjury 
          ? `The claimant reported ${otherInjuries.name || "an unspecified injury"} following the accident, which started ${
              otherInjuries.start || "at an unspecified time"
            }. The initial severity was ${otherInjuries.initialSeverity?.toLowerCase() || "not specified"} and current severity is ${
              otherInjuries.currentSeverity === "Resolved" 
                ? `resolved after ${otherInjuries.resolveDays || "an unspecified number of"} days` 
                : (otherInjuries.currentSeverity?.toLowerCase() || "not specified")
            }.`
          : "The claimant did not report any other injuries following the accident."
        }
      </Text>
    </View>
  );
};
