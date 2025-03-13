
import { Text, View } from '@react-pdf/renderer';
import { ReportData } from '@/types/reportTypes';

interface BruisingSectionProps {
  formData: ReportData;
  styles: any;
}

export const BruisingSection = ({ formData, styles }: BruisingSectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.sectionHeader}>Section 11 - Bruising Details</Text>
      
      {formData.other?.bruising?.hasBruising ? (
        <>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.fieldLabel}>11.1 Location and Severity</Text>
            <Text style={styles.fieldValue}>
              The claimant reported bruising following the accident. 
              {formData.other?.bruising?.location && ` The bruising was located at ${formData.other.bruising.location}.`}
              {formData.other?.bruising?.initialSeverity && ` Initial severity was ${formData.other.bruising.initialSeverity.toLowerCase()}.`}
            </Text>
          </View>
          
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.fieldLabel}>11.2 Duration</Text>
            <Text style={styles.fieldValue}>
              {formData.other?.bruising?.resolveDays 
                ? `The bruising lasted approximately ${formData.other.bruising.resolveDays} days.` 
                : "The duration of the bruising was not specified."}
            </Text>
          </View>
        </>
      ) : (
        <Text style={styles.fieldValue}>The claimant did not report any significant bruising following the accident.</Text>
      )}
    </View>
  );
};
