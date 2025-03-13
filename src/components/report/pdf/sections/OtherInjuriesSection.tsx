
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface OtherInjuriesSectionProps {
  formData: ReportData;
  styles: any;
}

export const OtherInjuriesSection = ({ formData, styles }: OtherInjuriesSectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 12 - Other Injuries Details</Text>
      
      {formData.other?.otherInjuries?.hasOtherInjury ? (
        <>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.fieldLabel}>12.1 Additional Injuries</Text>
            <Text style={styles.fieldValue}>
              • {formData.other.otherInjuries.name || "Unspecified injury"} - 
              Initial severity: {formData.other.otherInjuries.initialSeverity || "Not specified"}, 
              Current severity: {formData.other.otherInjuries.currentSeverity || "Not specified"}
              {formData.other.otherInjuries.resolveDays ? `, Resolved after: ${formData.other.otherInjuries.resolveDays} days` : ""}
            </Text>
          </View>
        </>
      ) : (
        <Text style={styles.fieldValue}>No other significant injuries were reported by the claimant.</Text>
      )}
      
      {formData.other?.medicalHistory?.exceptionalInjuries && formData.other.medicalHistory.exceptionalInjuriesDetails && (
        <View style={{ marginBottom: 10, marginTop: 10 }}>
          <Text style={styles.fieldLabel}>12.2 Exceptional Circumstances</Text>
          <Text style={styles.fieldValue}>{formData.other.medicalHistory.exceptionalInjuriesDetails}</Text>
        </View>
      )}
    </View>
  );
};
