
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface OtherInjuriesSectionProps {
  formData: ReportData;
  styles: any;
}

export const OtherInjuriesSection = ({ formData, styles }: OtherInjuriesSectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 12 - Other Injuries</Text>
      
      {formData.injuries.otherInjuries && formData.injuries.otherInjuries.length > 0 ? (
        <>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.fieldLabel}>12.1 Additional Injuries</Text>
            {formData.injuries.otherInjuries.map((injury, index) => (
              <Text key={index} style={styles.fieldValue}>
                • {injury.description || "Unspecified injury"} - 
                Initial severity: {injury.initialSeverity || "Not specified"}, 
                Current severity: {injury.currentSeverity || "Not specified"}
                {injury.resolvedAfter ? `, Resolved after: ${injury.resolvedAfter} days` : ""}
              </Text>
            ))}
          </View>
        </>
      ) : (
        <Text style={styles.fieldValue}>No other significant injuries were reported by the claimant.</Text>
      )}
      
      {formData.injuries.exceptionalInjuries === "Yes" && formData.injuries.exceptionalInjuriesDetails && (
        <View style={{ marginBottom: 10, marginTop: 10 }}>
          <Text style={styles.fieldLabel}>12.2 Exceptional Circumstances</Text>
          <Text style={styles.fieldValue}>{formData.injuries.exceptionalInjuriesDetails}</Text>
        </View>
      )}
    </View>
  );
};
